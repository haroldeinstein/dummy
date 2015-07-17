$(document).ready(function() {

  $('#videos-list').on('click', 'a', function(e) {
    if ($(window).width() <= 400) return;
    e.preventDefault();
    var id = $(this).attr('data-vimeoid');
    var url = "//player.vimeo.com/video/"+id;
    var iframe = $('<iframe id="vimeo-player" src="' + url + '" width="100%" height="100%" frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    $('#video-player').html(iframe);
  });

  var $bio = $('#bio-container');
  $('.director-name.has-bio').bind('mouseenter', function() {
    $bio.css('opacity', 1);
  });

  $('.director-name.has-bio').bind('mouseleave', function() {
    $bio.css('opacity', 0);
  });

});
