const FOCUSABLE_NODE = [
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
  '[tabindex]',
].join(',');

// TODO scope stacking
export function createFocusScope({ element }) {
  let previousActiveElement =
    document.activeElement != null && document.activeElement !== document.body
      ? document.activeElement
      : window.event != null
      ? window.event.target
      : null;

  let walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      return node.matches(FOCUSABLE_NODE) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });

  function handleKeyDown(event) {
    // TODO mobile form arrows
    if (event.key === 'Tab' && !(event.altKey || event.ctrlKey || event.metaKey)) {
      event.preventDefault();

      let nextActiveElement = event.shiftKey ? walker.previousNode() : walker.nextNode();

      if (nextActiveElement == null) {
        walker.currentNode = walker.root;
        nextActiveElement = event.shiftKey ? walker.lastChild() : walker.firstChild();
      }

      if (nextActiveElement != null) {
        nextActiveElement.focus();
      }
    }
  }

  function handleFocus(event) {
    let eventTarget = event.target;
    if (element.contains(eventTarget)) {
      walker.currentNode = eventTarget;
    } else {
      /* QUESTION what happens here? */
    }
  }

  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('focusin', handleFocus, true);

  // TODO per WCAG recommendation, the focus should be moved to the first element inside the target
  // unless content is large enough and focusing can trigger scrolling. In this case, `tabindex=-1`
  // must be applied to a static element at the top and that element needs to be focused
  // The question is, can the target itself be considered good enough for initial focus, given
  // it has aria labels?
  element.focus();

  return () => {
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('focusin', handleFocus, true);
    if (previousActiveElement != null) {
      previousActiveElement.focus();
    }
  };
}
