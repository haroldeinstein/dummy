$(document).ready(function() {
  $('#videos-list').on('click', 'h3', function() {
    var id = $(this).attr('data-vimeoid');
    var url = "//player.vimeo.com/video/"+id;
    $('#vimeo-player').attr('src', url);
  });
});
