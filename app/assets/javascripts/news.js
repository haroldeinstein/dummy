$(document).ready(function() {
  $('#videos-list').on('click', 'a', function(e) {
    if ($(window).width() <= 320) return;
    e.preventDefault();
    var id = $(this).attr('data-vimeoid');
    var url = "//player.vimeo.com/video/"+id+"?autoplay=1";
    var iframe = '<iframe id="vimeo-player" src="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
    if ($('#vimeo-player').length === 0) {
      $('#video-player').html(iframe);
    } else {
      $('#vimeo-player').attr('src', url);
    }
  });
});
