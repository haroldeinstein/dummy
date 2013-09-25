function WiredriveManager(opts) {
  this.videos = new NewsCollection();

  this.fetch(opts);
}

WiredriveManager.prototype = {
  prepareVideoData: function(v) {
    var date = new Date(v.pubDate);
    var obj = {
      id: parseInt([date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()].join(''), 10),
      wiredrive_id: v.id,
      title: [v.credit, v.title].join('-'),
      video_url: v.enclosure.url,
      thumbnail_small: v.thumbnail[2].url,
      thumbnail_medium: v.thumbnail[0].url,
      thumbnail_large: v.thumbnail[3].url
    }
    return obj;
  },

  fetch: function(opts) {
    var manager = this;
    $.get('/api/admin/news', function(response) {
      var items = response.rss.channel.item;
      for (var i = 0; i < items.length; i++) {
        var obj = manager.prepareVideoData(items[i]);
        var model = new VideoModel(obj);
        manager.videos.add(model);
      }
      opts.onFetch();
    });
  }
};
