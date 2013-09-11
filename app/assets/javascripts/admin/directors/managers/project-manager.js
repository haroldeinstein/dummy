function ProjectManager() {
  this.videos = new VideosCollection();

  this.videos.fetch({
    data: { director_id: Bootstrap.director_id }
  });
}

ProjectManager.prototype = {
  addVideo: function(video, opts) {
    var manager = this;
    var v = video.toJSON();
    v.director_id = Bootstrap.director_id;

    var data = {
      director_id: Bootstrap.director_id,
      project: v,
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
    };

    $.ajax({
      url: '/api/admin/projects',
      data: data,
      type: 'POST',
      success: function(response, status, xhr) {
        video.set(response);
        manager.videos.add(video);
        if (opts.success) opts.success(video);
      },
      error: function(response) {
        if (opts.error) opts.error();
      }
    });
  },

  removeVideo: function(video, opts) {
    var manager = this;
    var v = video.toJSON();

    var data = {
      director_id: Bootstrap.director_id,
      project_id: v.id,
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content')
    };

    $.ajax({
      url: '/api/admin/projects',
      data: data,
      type: 'DELETE',
      success: function(response, status, xhr) {
        manager.videos.remove(video);
        if (opts.success) opts.success();
      },
      error: function(response) {
        console.log*('error');
        if (opts.error) opts.error();
      }
    });
  },

  updateSort: function(sort) {
    sort += "&authenticity_token=" + $('meta').filter('[name="csrf-token"]').attr('content');
    sort += "&director_id=" + Bootstrap.director_id;
    $.ajax({
      url: '/api/admin/projects/sort',
      data: sort,
      type: 'POST'
    });
  },

  updateVideo: function(video, opts) {
      opts = opts || {};

      var data = {
        authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
        director_id: Bootstrap.director_id,
        project: video.toJSON()
      }

      $.ajax({
        url: '/api/admin/projects',
        data: data,
        type: 'PUT',
        success: function(response, status, xhr) {
          video.set(response);
          if (opts.success) opts.success();
        },
        error: function(response) {
          console.log*('error');
          if (opts.error) opts.error();
        }
      });
  }
}
