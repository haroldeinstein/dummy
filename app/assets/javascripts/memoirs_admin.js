//= require_tree ./admin/memoir/collections
//= require_tree ./admin/memoir/models
//= require_tree ./admin/memoir/managers
//= require admin/memoir/slidr.js

$(document).ready(function() {
  var slider = new Slidr();
  slider.$container = $('#main-container');
  slider.containerWidth = slider.$container.innerWidth() * 0.9;
  slider.resize();
  slider.init();

  $(window).bind('resize', function() {
    slider.resize();
  });

  var manager = new MemoirManager();

  $('#add-action').bind('click', function() {
    manager.showModal();
  });

  $('#save-button').bind('click', function(e) {
    if ($(this).hasClass('disabled')) return;
    $('#new_memoir').submit();
  });

  $('.post').bind('click', function() {
    var id = parseInt($(this).attr('data-id'), 10);
    manager.showModal(id);
  });
});
