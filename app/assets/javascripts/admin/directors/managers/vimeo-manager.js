function VimeoManager() {
  this.videos = new VideosCollection();

  this.fetch();
  this.bindEvents();
}

VimeoManager.prototype = {
  displayVideos: function() {
    var $container = $('#videos-container');
    var videos = this.videos.toJSON();
    for (var i = 0; i < 6; i++) {
      var video = videos[i]
      var $elem = $('<div class="video"><a href="#" data-id="' + video.vimeo_id + '"><img src="' + video.thumbnail_large + '"></a></div>');
      $container.append($elem);
    }
  },

  prepareVideoData: function(v) {
    var obj = {
      title: v.title,
      video_url: v.url,
      vimeo_id: v.id,
      id: v.id,
      thumbnail_small: v.thumbnail_small,
      thumbnail_medium: v.thumbnail_medium,
      thumbnail_large: v.thumbnail_large
    }
    return obj;
  },

  fetch: function() {
    var manager = this;
    $.ajax({
      url: 'http://vimeo.com/api/v2/haroldeinstein/videos.json',
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(response, status, xhr) {
        for (var i = 0; i < response.length; i++) {
          var model = new VideoModel(manager.prepareVideoData(response[i]));
          manager.videos.add(model);
        }
        manager.displayVideos();
      },
      error: function(response, status, xhr) {

      }
    });
  },

  bindEvents: function() {
    var manager = this;
    var $container = $('#videos-container');

    $container.on('click', '.video a', function(e) {
      e.preventDefault();
      var $self = $(this);
      var id = $self.attr('data-id');
      var video = manager.videos.get(id);
      console.log(video);
    });
  }
};
