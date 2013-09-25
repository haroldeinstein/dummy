$(document).ready(function() {
  $('#videos-list').on('click', 'a', function(e) {
    e.preventDefault();
    $('#wiredrive-player').attr('src', $(this).attr('data-videourl'));
  });
});
