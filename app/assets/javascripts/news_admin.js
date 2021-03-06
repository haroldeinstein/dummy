//= require_tree ./admin/news/collections
//= require_tree ./admin/directors/models
//= require_tree ./admin/news/managers

function NewsManager() {
  this.vManager = {};
  this.neManager = {};
}

NewsManager.prototype = {
  displayVideos: function() {
    var $container = $('#video-options');
    var videos = this.vManager.videos.toJSON();
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      var $elem = $('<div class="video" id="'+ video.id +'"><a href="#" data-id="' + video.id + '"><img src="' + video.thumbnail_large + '"></a></div>');
      $container.append($elem);
    }

    this.updateSelectedVideos();
  },

  showVideos: function() {
    var manager = this;
    $('body').append('<div id="overlay"></div>');
    var $overlay = $('#overlay');
    $('#add-action').html('hide videos');
    setTimeout(function() {
      $('#video-options').addClass('open');
      $('#director').addClass('open');
      $('#overlay').addClass('open');
    }, 1);

    $overlay.bind('click', function() {
      manager.hideVideos();
    });
  },

  hideVideos: function() {
    $('#video-options').removeClass('open');
    $('#director').removeClass('open');
    $('#overlay').removeClass('open');
    $('#add-action').html('show videos');

    setTimeout(function() {
      $('#overlay').remove();
    }, 300);
  },

  showAuthPopup: function() {
    var $container = $('<div id="auth-container"></div>');
    $container.html('<a href="/auth/vimeo">authenticate</a>');

    $('body').append($container);
  },

  makeNameEditable: function($elem) {
    var manager = this;
    var id = $elem.attr('id').split('_')[1];
    var video = this.neManager.videos.where({vimeo_id: parseInt(id, 10)})[0];
    var title = video.get('title');
    var $input = $('<input class="edit-title" value=""></input>');
    $elem.replaceWith($input);

    $(document).bind('keydown', function(e) {
      if (e.keyCode === 13) {
        $input.trigger('blur');
      }
    });

    $input.val(title).focus().bind({
      blur: function(e) {
        var $self = $(this);
        html =  '<div style="position: relative;" class="video-title" id="p_'+ video.get('vimeo_id') +'">';
        html += '<h3 class="project">'+ video.get('title') +'</h3>';
        html += '<a href="#" class="reorder-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '<a href="#" class="remove-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '</div>';

        $self.replaceWith(html);
        $(document).unbind('keydown');
      },
      change: function(e) {
        video.set('title', $(this).val());
        $('#save-button').removeClass('disabled').addClass('active');
      }
    });
  },

  updateSelectedVideos: function() {
    var ids = this.neManager.videos.pluck('vimeo_id');

    for (var i = 0; i < ids.length; i++) {
      $('#'+ids[i]).addClass('selected');
    }
  }
};

$(document).ready(function() {
  var manager = new NewsManager();

  manager.vManager = new VimeoManager({
    onFetch: function() {
      manager.displayVideos();
    }
  });

  manager.neManager = new NewsEntryManager();

  $('#add-action').bind('click', function(e) {
    e.preventDefault();
    manager.showVideos();
  });

  $('#video-options').on('click', '.video a', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');

    if (manager.neManager.videos.where({vimeo_id: parseInt(id, 10)}).length > 0) {
      alert("That video is already selected");
      return;
    }

    if (manager.neManager.videos.length >= 11) {
      alert("You've added the maximum number of videos");
      return;
    }

    var video = new VideoModel(manager.vManager.videos.get(id).toJSON());

    video.set('vimeo_id', parseInt(id, 10));
    video.unset('id');

    manager.neManager.addVideo(video, {
      success: function(video) {
        html =  '<div style="position: relative;" class="video-title" id="p_'+ video.get('vimeo_id') +'">';
        html += '<h3 class="project">'+ video.get('title') +'</h3>';
        html += '<a href="#" class="reorder-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '<a href="#" class="remove-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '</div>';

        $('#videos-list').prepend(html);

        manager.updateSelectedVideos();
      }
    });
  });

  $('#videos-list-container').on('click', '.remove-video', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');
    var video = manager.neManager.videos.where({vimeo_id: parseInt(id, 10)})[0];
    manager.neManager.removeVideo(video, {
      success: function() {
        $self.parent('.video-title').remove();
        manager.updateSelectedVideos();
      }
    });
  });

  $('#videos-list').sortable({
    items: '.video-title',
    handle: '.reorder-video',
    cursor: 'move',
    axis: 'y',
    stop: function(e, ui) {
      var sort = $('#videos-list').sortable("serialize", {
        key: "sort"
      });
      manager.neManager.updateSort(sort);
    }
  });

  $('#videos-list').on('click', '.video-title h3', function(e) {
    manager.makeNameEditable($(this).parents('.video-title'));
  });

  $('#save-button').bind('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) return;
    manager.neManager.save();
  });

  if (!Bootstrap.has_auth) {
    manager.showAuthPopup();
  }
});
