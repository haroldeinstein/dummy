function ProjectManager(opts) {
  this.videos = new VideosCollection();

  this.videos.fetch({
    data: { director_id: Bootstrap.director_id },
    success: function(response) { opts.onReady(); }
  });
}

ProjectManager.prototype = {
  addVideo: function(video) {
    var manager = this;
    var v = video.toJSON();
    v.director_id = Bootstrap.director_id;

    var data = {
      director_id: Bootstrap.director_id,
      project: v,
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
    }

    $.ajax({
      url: '/api/admin/projects',
      data: data,
      type: 'POST',
      success: function(response, status, xhr) {
        video.set(response);
        manager.videos.add(video);
      },
      error: function(response) {

      }
    });
  }
}
