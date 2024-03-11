/* eslint-disable no-undef */

document.addEventListener('turbolinks:before-visit', () => {
  if (document.querySelector('*[data-preserve-scroll=true]')) {
    Turbolinks.savedScrolls = {
      [window.location.href]: {
        document: document.documentElement.scrollTop,
        body: document.body.scrollTop,
      },
    };
  }
});

document.addEventListener('turbolinks:render', () => {
  const savedScroll = Turbolinks.savedScrolls?.[window.location.href];
  if (!savedScroll) { return; }

  delete Turbolinks.savedScrolls[window.location.href];

  window.requestAnimationFrame(() => {
    document.documentElement.scrollTop = savedScroll.document;
  });
});
