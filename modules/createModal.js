import { setDocumentScroll } from './setDocumentScroll.js';

let stack = [];

export function createModal() {
  let id = Math.random().toString(32).substr(2, 8);
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
      this.element = content;
      document.body.appendChild(wrapper);
    },
    dispose() {
      if (stack.indexOf(id) > -1) {
        stack.splice(stack.indexOf(id), 1);
      }
      setDocumentScroll({ enabled: stack.length === 0 });
    },
  };
}
