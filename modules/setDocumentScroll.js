let isEnabled = true;

export function setDocumentScroll({ enabled }) {
  let target = document.documentElement;
  if (!enabled && isEnabled) {
    target.style.paddingRight = `${window.innerWidth - target.clientWidth}px`;
    target.classList.add('modalify-scroll-lock');
    isEnabled = false;
  } else if (enabled && !isEnabled) {
    target.style.paddingRight = 0;
    target.classList.remove('modalify-scroll-lock');
    isEnabled = true;
  }
  return isEnabled;
}
