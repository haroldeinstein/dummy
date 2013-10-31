function MemoirManager() {
  this.collection = new MemoirsCollection();
  this.collection.fetch();
  this.currentPost = null;
}

MemoirManager.prototype = {
  postHtml: function(post) {
    var html = '';
    html += '<div id="modal">';
    if (post) {
      html += '<form accept-charset="UTF-8" action="/admin/the-special-ones" class="new_memoir" enctype="multipart/form-data" id="new_memoir" method="post">';
      html += '<input type="hidden" name="_method" value="put">';
      html += '<input id="memoir-id" type="hidden" name="memoir_id" value="' + post.id + '">';
    } else {
      html += '<form accept-charset="UTF-8" action="/admin/the-special-ones" class="new_memoir" enctype="multipart/form-data" id="new_memoir" method="post">';
    }
    html += '<h3>image</h3>';
    html += '<div id="new-image">';
    if (post) {
      html += '<img src="' + post.image.url+ '">';
    } else {
      html += '<img src="">';
    }
    html += '</div>';
    html += '<h3>caption</h3>';
    html += '<textarea name="memoir[caption]" id="new-caption">';
    if (post)
      html += post.caption;
    html += '</textarea>';
    html += '</form>'
    if (post) {
      html += '<form action="/api/admin/memoirs" method="post">';
      html += '<input name="_method" type="hidden" value="delete" />';
      html += '<input type="hidden" name="authenticity_token" value="' + $('meta[name="csrf-token"]').attr('content') + '">';
      html += '<input type="hidden" name="memoir_id" value="' + post.id + '">'
      html += '<input type="submit" class="btn negative" value="delete post">';
      html += '</form>';
    }
    html += '</div>';

    return html;
  },

  hideModal: function() {
    var $overlay = $('#overlay');
    $overlay.removeClass('open');
    $('#modal').remove();
    setTimeout(function() {
      $overlay.remove();
    }, 300);
    $('#save-button').removeClass('active').addClass('disabled');
    this.currentPost = null;
  },

  showModal: function(id) {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var post = null;
    if (id) post = this.collection.get(id).toJSON();
    this.currentPost = post;
    var $post = $(this.postHtml(post));
    var $uploader = $('.form-data').clone();
    $uploader.removeClass('hide');
    $('body').append($post).append('<div id="overlay"></div>');
    $('#new-image').append($uploader);

    var postHeight = $post.outerHeight();
    var postWidth = $post.outerWidth();

    $post.hide();

    $post.css({
      top: (windowHeight / 2) - (postHeight / 2),
      left: (windowWidth / 2) - (postWidth / 2)
    });

    $post.show();

    var manager = this;
    var $overlay = $('#overlay');
    $overlay.addClass('open');
    $overlay.bind('click', function() {
      manager.hideModal();
    });

    $('textarea').bind('keydown', function() {
      $('#save-button').removeClass('disabled').addClass('active');
    });

    $post.find('input[type="file"]').bind('change', function(e) {
      var $self = $(this);
      var input = $self[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        var src = e.target.result;
        var $img = $('<img src="' + src + '" />');
        $self.hide();
        $('#new-image').append($img);
      };

      var src = reader.readAsDataURL(input.files[0]);

      $('#save-button').removeClass('disabled').addClass('active');
    });

    var id = $('#memoir-id').val();
  }
};
