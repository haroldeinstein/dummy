$(document).ready(function() {
  $("#add-video").bind('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: 'http://vimeo.com/api/v2/haroldeinstein/videos.json',
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(response, status, xhr) {
        console.log(response);
      },
      error: function(response, status, xhr) {

      }
    });
  });
});
