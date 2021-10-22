export function lockScroll() {
  let target = document.documentElement;
  target.style.paddingRight = `${window.innerWidth - target.clientWidth}px`;
  target.classList.add('modalify-scroll-lock');
  return {
    release() {
      target.style.paddingRight = `0px`;
      target.classList.remove('modalify-scroll-lock');
    },
  };
}
