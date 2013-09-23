function Slidr() {
  this.$container = null;
  this.containerWidth = 0;
  this.idx = 0;
}

Slidr.prototype = {
  init: function() {
    this.bindEvents();
  },

  resize: function() {
    this.containerWidth = this.$container.innerWidth() * 0.9;
    $('#post-container').css('width', this.containerWidth * Bootstrap.postCount);
    $('.post').css('width', this.containerWidth);
  },

  showEmptyPost: function() {
    var $post = $(this.emptyPostHTML());
    var $uploader = $('.image-uploader').clone();
    $uploader.removeClass('hide');
    $post.find('.image').append($uploader);
    $('body').append($post);

    $post.find('input[type="file"]').bind('change', function(e) {
      var input = $(this)[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        var src = e.target.result;
        $post.find('.image img').attr('src', src);
      };

      var src = reader.readAsDataURL(input.files[0]);
    });
  },

  emptyPostHTML: function() {
    var html = '';
    html += '<div id="modal">';
    html += '<div class="post clearfix">';
    html += '<div class="image">';
    html += '<img src="">';
    html += '</div>';
    html += '<div class="captions empty">';
    html += '<p class="caption"></p>';
    html += '</div></div></div>';

    return html;
  },

  seekTo: function(index) {
    $('#post-container').animate({ 'left' : -this.containerWidth * index });
  },

  nextPost: function() {
    var test = $('.post').length - 1;
    this.idx++;
    if (this.idx > test) {
      this.idx = test;
      alert('last post');
      return;
    }

    this.seekTo(this.idx);
  },

  previousPost: function() {
    this.idx--;
    if (this.idx < 0) {
      this.idx = 0;
      alert('first post');
      return;
    }

    this.seekTo(this.idx);
  },

  bindEvents: function() {
    var slider = this;

    $('#next').bind('click', function() {
      slider.nextPost();
    });

    $('#previous').bind('click', function() {
      slider.previousPost();
    });
  }
};
