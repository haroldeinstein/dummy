function NewsEntryManager() {
  this.videos = new NewsCollection();

  this.videos.fetch()
}

NewsEntryManager.prototype = {
  addVideo: function(video, opts) {
    var manager = this;
    this.videos.add(video);
    $('#save-button').removeClass('disabled').addClass('active');
    if (opts && opts.success) opts.success(video);
  },

  removeVideo: function(video, opts) {
    if (!video) {
      alert('Something went wrong');
      return;
    }

    var manager = this;
    if (video.id) {
      video.set('delete', '1');
    } else {
      manager.videos.remove(video);
    }
    $('#save-button').removeClass('disabled').addClass('active');
    if (opts.success) opts.success();
  },

  updateSort: function(sort) {
    var ids = sort.match(/(\d+)/g);
    $('#save-button').removeClass('disabled').addClass('active');
    for (var i = 0; i < ids.length; i++) {
      var video = this.videos.where({vimeo_id: parseInt(ids[i])})[0];
      video.set('sort_index', i);
    }
  },

  save: function(opts) {
    var videos = this.videos.toJSON();
    var data = {
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
      news: videos
    };

    $.ajax({
      url: '/api/admin/news',
      data: data,
      type: 'PUT',
      success: function(response, status, xhr) {
        if (opts && opts.success) opts.success();
        $('#save-button').removeClass('active').addClass('disabled');
      },
      error: function(response) {
      }
    });
  }
}
