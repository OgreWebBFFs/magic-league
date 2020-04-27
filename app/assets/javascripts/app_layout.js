var AppLayout = (function() {
  let setMatchDateAndTime = function() {
    let date  = new Date();
    let today = date.toISOString().substr(0, 10);
    let hour = ('0' + date.getHours()).slice(-2);
    let min= ('0' + date.getMinutes()).slice(-2);
    let time = `${hour}:${min}`;
    document.getElementById('match-date').value = today;
    document.getElementById('match-time').value = time;
  }

  let initLogMatchSelectors = function(current_user_id) {
    $('.player-selector').val(current_user_id);
    setWinnerSelector();
  }

  let addPlayerOption = function(name, id) { //unsure if this should be expsoed after doing moving rest of js to files
    return `
      <option value="${id}">${name}</option>
    `;
  }

  let setWinnerSelector = function() {
    $('.winner-selector').empty();
    $('.player-selector option:selected').each(function(i, value) { 
      $('.winner-selector').append(addPlayerOption($(value).text(), $(value).val()));
    });
  }

  let logMatchOnClick = function(event) {
    event.preventDefault();
    Helpers.toggleElementById('match-logger');
    setMatchDateAndTime();
  }

  let handleWindowClick = function(event) {
    if (!event.target.matches('.drop-down-toggle')) {
      var dropdowns = document.querySelectorAll(".dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('active')) {
          openDropdown.classList.remove('active');
        }
      }
    }
  }  

  // Exposed functions start here

  let initialize = function(user_signed_in = false, current_user_id = null) {
    $('.nav_match-logger-btn').on('click', logMatchOnClick);

    window.addEventListener('click', handleWindowClick);
     
    if (user_signed_in) {
      $(document).off('change', '.player-selector');
      $(document).on('change', '.player-selector', setWinnerSelector);
      initLogMatchSelectors(current_user_id);
    }
  }

  let timedAlertClose = function() {
    const alertID = "alert";
    let alert = document.getElementById(alertID);
    if (alert) {
      alert.classList.toggle("active");
    } 
  }



  return {
    initialize: initialize,
    timedAlertClose: timedAlertClose,
  }

})();