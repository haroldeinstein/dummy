//= require_tree ./collections
//= require_tree ./models
//= require_tree ./managers

function VideoManager() {
  this.vManager = {};
  this.pManager = {};
  this.hasUserVideos = false;
  this.hasVimeoVideos = false
}

VideoManager.prototype = {
  displayVideos: function() {
    if (!(this.hasUserVideos && this.hasVimeoVideos)) return;

    var $container = $('#videos-container');
    var videos = this.vManager.videos.toJSON();
    for (var i = 0; i < 6; i++) {
      var video = videos[i];
      var $elem = $('<div class="video"><a href="#" data-id="' + video.id + '"><img src="' + video.thumbnail_large + '"></a></div>');
      $container.append($elem);
    }
  }
};


$(document).ready(function() {
  var manager = new VideoManager();

  manager.vManager = new VimeoManager({
    onReady: function() {
      manager.hasVimeoVideos = true;
      manager.displayVideos();
    }
  });

  manager.pManager = new ProjectManager({
    onReady: function() {
      manager.hasUserVideos = true;
      manager.displayVideos();
    }
  });

  $('#videos-container').on('click', '.video a', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');
    var video = _.clone(manager.vManager.videos.get(id));
    video.set('vimeo_id', id);
    video.unset('id');

    manager.pManager.addVideo(video);
  });
});
