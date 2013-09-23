//= require_tree ./admin/memoir

$(document).ready(function() {
  var slider = new Slidr();
  slider.$container = $('#main-container');
  slider.containerWidth = slider.$container.innerWidth() * 0.9;
  slider.resize();
  slider.init();

  $(window).bind('resize', function() {
    slider.resize();
  });

  $('#add-action').bind('click', function() {
    slider.showEmptyPost();
  });
});
