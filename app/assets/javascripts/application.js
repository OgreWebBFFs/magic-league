// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require_tree .
var token = $("meta[name='csrf-token']").attr("content");

var cardTemplate = function(card) {
    return `
      <div class="card-wrapper">
        <div class="wishlist-checkbox">
                <input class="toggle-wishlist" wish-list-id="${search('id', card.id, wishlist) === undefined ? -1 : search('id', card.id, wishlist).id}" data-id="${card.id}" id="checkbox-for-${card.id}" type="checkbox" ${search('id', card.id, wishlist) === undefined ? '' : 'checked' }>
                <label for="checkbox-for-${card.id}"></label>
            </div>
      <a class="card-grid-item" href="/cards/${card.id}">
        <img class="card" alt="${card.name}" title="${card.name}" src="${card.image_url}">
      </a>
      <div class="card-count-component">
        <span>
          <button type="button" class="remove-card btn" data-id="${card.id}"><i class="material-icons">indeterminate_check_box</i></button>
          <input type="number" id="${card.id}-count" data-id="${card.id}" class="browser-default" value="${cardCount(card.id)}", min="0">
          <button type="button" class="add-card btn" data-id="${card.id}"><i class="material-icons">add_box</i></button>
        </span>
      </div>
        `
  };

  var debounce = function(func, delay) {
    var inDebounce;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    }
  }

  var search = function(key, value, arr){
    return arr.find(function(item) {
      return item[key] == value
    });
  }

  var xhrRequest = function(url, type, success = function(){}, data = {}, error = function(){}) {
    $.ajax({
      url: url,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", token)
      },
      data: data,
      type: type,
      dataType: "json",
      error: error,
      success: success
    });
  };

