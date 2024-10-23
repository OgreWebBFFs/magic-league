/* eslint-disable no-undef */

// eslint-disable-next-line import/prefer-default-export
export function saveScrollPos() {
    const scrollPos = document.documentElement.scrollTop;
    sessionStorage.setItem(`scrollPos:${window.location.href}`, scrollPos);
}

// document.addEventListener('turbolinks:before-visit', () => {
//     if (document.querySelector('*[data-preserve-scroll=true]')) {
//         saveScrollPos();
//     }
// });

// document.addEventListener('turbolinks:load', () => {
//   const savedScroll = parseInt(sessionStorage.getItem(`scrollPos:${window.location.href}`), 10);
//   if (!savedScroll) { return; }

//   sessionStorage.removeItem(`scrollPos:${window.location.href}`);

//   window.requestAnimationFrame(() => {
//     document.documentElement.scrollTop = savedScroll;
//   });
// });
