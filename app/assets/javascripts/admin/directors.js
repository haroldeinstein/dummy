function VideoManager() {
  this.videos = [];

  this.init();
}

$(document).ready(function() {
  var v = new VideoManager();

  $.ajax({
    url: 'http://vimeo.com/api/v2/haroldeinstein/videos.json',
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: function(response, status, xhr) {
      v.videos = response;
    },
    error: function(response, status, xhr) {

    }
  });
});
