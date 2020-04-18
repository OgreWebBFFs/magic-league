var Helpers = (function() {

  let toggleElementById = function(elementId) {
    console.log('toggle fired');
    let target = document.getElementById(elementId);
    target.classList.toggle("active");
  }

  return {
    toggleElementById: toggleElementById,
  }
})();