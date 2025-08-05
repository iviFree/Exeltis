var showMenu = function (e) {
    $('#menuMobile').animate({ "right": '+=100%' });
    event.preventDefault();
}
var hideMenu = function (e) {
    $('#menuMobile').animate({ "right": '-=100%' });
    event.preventDefault();
}
var preventDefault = function (e) {
    event.preventDefault();
}
var closeModal= function(modalId) {
  $('#' + modalId).modal('hide');
}
$(document).ready(function() {
    $('#exitButton').click(function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
      closeModal('leavingModal');
    });
  });