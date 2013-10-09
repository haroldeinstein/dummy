function VimeoManager(opts) {
  this.videos = new NewsCollection();

  this.fetch(opts);
}

VimeoManager.prototype = {
  prepareVideoData: function(v) {
    v = v[0];
    var obj = {
      title: v.title,
      video_url: v.urls.url[0]._content,
      vimeo_id: v.id,
      id: v.id,
      thumbnail_small: v.thumbnails.thumbnail[0]._content,
      thumbnail_medium: v.thumbnails.thumbnail[1]._content,
      thumbnail_large: v.thumbnails.thumbnail[2]._content
    }
    return obj;
  },

  fetch: function(opts) {
    var manager = this;
    $.get('/api/admin/news', function(response) {
      for (var i = 0; i < response.length; i++) {
        var obj = manager.prepareVideoData(response[i]);
        var model = new VideoModel(obj);
        manager.videos.add(model);
      }
      opts.onFetch();
    });
  }
};
