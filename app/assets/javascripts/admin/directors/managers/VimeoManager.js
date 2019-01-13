function VimeoManager(opts) {
  this.videos = new VideosCollection();
  this.page = 1;
  this.fetch(opts);
  this.hasAllVideos = false;
}

VimeoManager.prototype = {
  prepareVideoData: function(video) {
    var videoId = parseInt(RegExp(/(\d+)$/).exec(video.link), 10)
    var pictures = video.pictures.sizes
    var obj = {
      title: video.name,
      video_url: video.link,
      vimeo_id: videoId,
      id: videoId,
      thumbnail_small: pictures[0].link,
      thumbnail_medium: pictures[1].link,
      thumbnail_large: pictures[pictures.length - 1].link
    }
    return obj;
  },

  fetch: function(opts) {
    var manager = this;
    var vimeoToken = Bootstrap.vimeoToken;

    $.ajax({
      url: 'https://api.vimeo.com/me/videos?fields=link,pictures.sizes,name&page=' + this.page,
      type: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + vimeoToken);
      },
      success: function (response) {
        var videos = response.data.map(function(video) {
          return manager.prepareVideoData(video);
        })
        videos.forEach(function(video) {
          var model = new VideoModel(video);
          manager.videos.add(model);
        })
        if (response.total === manager.videos.length) {
          manager.hasAllVideos = true;
        }
        opts.onFetch(videos);
      }
    });
  },

  fetchMoreVideos: function(callback) {
    if (this.hasAllVideos) {
      this.$elem.unbind('scroll.infinite');
      return;
    }

    this.page++;
    this.fetch({onFetch: callback});
  }

};
