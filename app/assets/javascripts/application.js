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
//= require helpers
//= require app_layout
//= require_tree .
  var token = $("meta[name='csrf-token']").attr("content");

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

