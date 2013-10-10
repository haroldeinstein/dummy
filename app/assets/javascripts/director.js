$(document).ready(function() {
  $('#videos-list').on('click', 'a', function(e) {
    if ($(window).width() <= 320) return;
    e.preventDefault();
    var id = $(this).attr('data-vimeoid');
    var url = "//player.vimeo.com/video/"+id;
    $('#vimeo-player').attr('src', url);
  });
});
