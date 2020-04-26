var Helpers = (function () {

  let toggleElementById = (elementId, siblingsToClose) => {
    if (siblingsToClose) {
      unToggleSiblingElements(siblingsToClose);
    }
    let target = document.getElementById(elementId);
    target.classList.toggle("active");
  }

  let unToggleSiblingElements = (target) => {
    var siblingClass = document.querySelectorAll("." + target);
    for (var i = 0; i < siblingClass.length; i++) {
      siblingClass[i].classList.remove('active');
    }
  }

  return {
    toggleElementById: toggleElementById,
  }
})();