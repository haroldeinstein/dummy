function ProjectManager(opts) {
  this.videos = new VideosCollection();

  this.videos.fetch({success: function(response) {
    opts.onReady();
  }});
}

ProjectManager.prototype = {
  addVideo: function(video) {
    var v = video.toJSON();
    var data = {
      project: v,
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content')
    }

    $.ajax({
      url: '/api/admin/projects',
      data: data,
      type: 'POST',
      success: function(response, status, xhr) {
        console.log(response);
      },
      error: function(response) {

      }
    });
  }
}
