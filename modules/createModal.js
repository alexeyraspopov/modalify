import { lockFocus } from './lockFocus.js';
import { lockScroll } from './lockScroll.js';

export function createModal(id) {
  let element = null;
  let scrollLock = null;
  let focusLock = null;
  return {
    element,
    show() {},
    hide() {},
    dispose() {
      if (scrollLock != null) scrollLock.release();
      if (focusLock != null) focusLock.release();
    },
  };
}
