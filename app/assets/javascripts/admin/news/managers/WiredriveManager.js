function WiredriveManager(opts) {
  this.videos = new NewsCollection();

  this.fetch(opts);
}

WiredriveManager.prototype = {
  prepareVideoData: function(v) {
    var obj = {
      id: v.id,
      wiredrive_id: v.id,
      title: v.title,
      video_url: v.video_url,
      // video_url: v.video_url.match(/token=[a-zA-Z0-9]+/)[0].replace('token=', ''),
      thumbnail_small: v.thumbnail_small,
      thumbnail_medium: v.thumbnail_medium,
      thumbnail_large: v.thumbnail_large
    }
    return obj;
  },

  fetch: function(opts) {
    var manager = this;
    $.get('/api/admin/news', function(response) {
      for (var i = 0; i < response.length; i++) {
        var model = new VideoModel(manager.prepareVideoData(response[i]));
        manager.videos.add(model);
      }
      opts.onFetch();
    });
  }
};
