var AppLayout = (function() {
    let idedElementToggle = function(elementId) {
        var target = document.getElementById(elementId);
        target.classList.toggle("active");
    }

    let setMatchDateAndTime = function() {
        let date  = new Date();
        let today = date.toISOString().substr(0, 10);
        let hour = ('0' + date.getHours()).slice(-2);
        let min= ('0' + date.getMinutes()).slice(-2);
        let time = `${hour}:${min}`;
        document.getElementById('match-date').value = today;
        document.getElementById('match-time').value = time;
    }

    let logMatchOnClick = function() {
        idedElementToggle('match-logger-container');
        setMatchDateAndTime();
    }

    let addPlayerOption = function(name, id) {
        return `
            <option value="${id}">${name}</option>
        `;
    }

    let setupListeners = function() {
        $('.player-selector').on('change', function() {
            $('.winner-selector').empty();
            $('.player-selector option:selected').each(function(i, value) { 
                $('.winner-selector').append(addPlayerOption($(value).text(), $(value).val()))
            });
        });
    }

    return {
        idedElementToggle: idedElementToggle,
        logMatchOnClick: logMatchOnClick,
        setupListeners: setupListeners
    }
})();