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
  },

  updateSort: function(sort) {
    console.log('here');
    sort += "&authenticity_token=" + $('meta').filter('[name="csrf-token"]').attr('content');
    sort += "&director_id=" + Bootstrap.director_id;
    $.ajax({
      url: '/api/admin/projects/sort',
      data: sort,
      type: 'POST'
    });
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
        html =  '<div style="position: relative;" class="video-title" id="p_'+ video.get('id') +'">';
        html += '<h4 class="project">'+ video.get('title') +'</h4>';
        html += '<a href="#" class="reorder-video" data-id="'+ video.get('id') +'">&#8645;</a>';
        html += '<a href="#" class="remove-video" data-id="'+ video.get('id') +'">X</a>';
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

  $('#videos-list').sortable({
    containment: 'parent',
    items: '.video-title',
    handle: '.reorder-video',
    start: function(e, ui) {
    },
    stop: function(e, ui) {
      var sort = $('#videos-list').sortable("serialize");
      manager.updateSort(sort);
    }
  });
});
