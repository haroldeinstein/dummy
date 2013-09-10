function VimeoManager() {
  this.videos = new VideosCollection();

  this.fetch();
}

VimeoManager.prototype = {
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
      },
      error: function(response, status, xhr) {

      }
    });
  }
};
