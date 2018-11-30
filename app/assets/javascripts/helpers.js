var Helpers = (function() {
  let toggleElementById = function(elementId) {
    let target = document.getElementById(elementId);
    target.classList.toggle("active");
  }

  return {
    toggleElementById: toggleElementById,
  }
})();