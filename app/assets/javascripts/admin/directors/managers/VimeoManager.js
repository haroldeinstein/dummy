function VimeoManager(opts) {
  this.videos = new VideosCollection();
  this.index = 0;
  this.page = 1;
  this.fetch(opts);
}

VimeoManager.prototype = {
  prepareVideoData: function(v) {
    v = v[0];
    var obj = {
      title: v.title,
      video_url: v.urls.url[0]._content,
      director_id: Bootstrap.director_id,
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

    var $overlay = $('<div></div>');
    $overlay.css({
      position: "fixed",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      top: "0px",
      left: "0px",
      zIndex: "1000"
    });

    $('body').append($overlay);

    $.ajax({
      url: '/api/admin/vimeo',
      type: 'GET',
      data: {
        page: manager.page,
        index: manager.index
      },
      success: function(response, status, xhr) {
        $overlay.remove();
        for (var i = 0; i < response.length; i++) {
          var model = new VideoModel(manager.prepareVideoData(response[i]));
          manager.videos.add(model);
        }
        opts.onFetch();
      },
      error: function(response, status, xhr) {

      }
    });
  }
};
