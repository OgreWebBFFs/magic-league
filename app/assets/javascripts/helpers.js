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

  let isOnList = (props) => {
    let listIds
    //The tradables data is structured a little different from 
    //other card lists, this adapts the card ids for this function
    if (props.checkingAgainstTradables) {
      listIds = props.list.map(item => item.card_id);
    } else {
      listIds = props.list.map(item => item.id);
    }

    return (listIds.find(item => item === props.card.id) != undefined);

  }

  return {
    toggleElementById: toggleElementById,
    isOnList: isOnList
  }
})();