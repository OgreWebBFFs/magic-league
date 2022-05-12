var AppLayout = (function() {

  // Exposed functions start here

  let timedAlertClose = function() {
    const alertID = "alert";
    let alert = document.getElementById(alertID);
    if (alert) {
      alert.classList.toggle("active");
    } 
  }

  return {
    timedAlertClose: timedAlertClose,
  }

})();