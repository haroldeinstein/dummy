//= require_tree ./collections
//= require_tree ./models
//= require_tree ./managers

function VideoManager() {
  this.vManager = {};
  this.pManager = {};
}

VideoManager.prototype = {
  displayVideos: function() {
    var $container = $('#video-player');
    var videos = this.vManager.videos.toJSON();
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      var $elem = $('<div class="video"><a href="#" data-id="' + video.id + '"><img src="' + video.thumbnail_large + '"></a></div>');
      $container.append($elem);
    }
  }
};

$(document).ready(function() {
  var manager = new VideoManager();

  manager.vManager = new VimeoManager();
  manager.pManager = new ProjectManager();

  $('#add-video').bind('click', function(e) {
    e.preventDefault();
    manager.displayVideos();
  });

  $('#videos-container').on('click', '.video a', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');
    var video = new VideoModel(manager.vManager.videos.get(id).toJSON());

    video.set('vimeo_id', id);
    video.unset('id');

    manager.pManager.addVideo(video, {
      success: function(video) {
        var html = '<div style="position: relative;" class="video-title">';
        html += '<h4 class="project">'+ video.get('title') +'</h4>';
        html += '<a href="#" class="remove-video" data-id="'+ video.get('id') +'"></a>';
        html += '</div>';

        $('#videos-list').append(html);
      }
    });
  });

  $('#videos-list-container').on('click', '.remove-video', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');
    var video = manager.pManager.videos.get(id);
    manager.pManager.removeVideo(video, {
      success: function() {
        $self.parent('.video-title').remove();
      }
    });
  });
});
