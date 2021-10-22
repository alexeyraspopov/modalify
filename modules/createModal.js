import { setDocumentScroll } from './setDocumentScroll.js';
import { lockScroll } from './lockScroll.js';

let stack = [];

export function createModal() {
  let id = Math.random().toString(32).substr(2, 8);

  let focusLock = null;
  return {
    element: null,
    show() {
      stack.push(id);
      let wrapper = document.createElement('div');
      wrapper.classList.add('modalify-backdrop');
      let content = document.createElement('div');
      content.setAttribute('aria-modal', 'true');
      content.setAttribute('role', 'dialog');
      content.classList.add('modalify-content');
      wrapper.appendChild(content);
      setDocumentScroll({ enabled: false });
      focusLock = lockFocus(content);
      this.element = content;
      document.body.appendChild(wrapper);
    },
    dispose() {
      if (focusLock != null) focusLock.release();
      if (stack.indexOf(id) > -1) {
        stack.splice(stack.indexOf(id), 1);
      }
      setDocumentScroll({ enabled: stack.length === 0 });
    },
  };
}
