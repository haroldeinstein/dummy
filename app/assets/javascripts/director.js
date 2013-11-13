$(document).ready(function() {
  $('#videos-list').on('click', 'a', function(e) {
    if ($(window).width() <= 320) return;
    e.preventDefault();
    var id = $(this).attr('data-vimeoid');
    var url = "//player.vimeo.com/video/"+id;
    var iframe = $('<iframe id="vimeo-player" src="' + url + '" width="100%" height="100%" frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    $('#video-player').html(iframe);
  });
});
