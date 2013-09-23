function Slidr() {
  this.$container = null;
  this.containerWidth = 0;
}

Slidr.prototype = {
  init: function() {

  },

  resize: function() {
    this.containerWidth = this.$container.innerWidth() * 0.9;
    $('#post-container').css('width', this.containerWidth * Bootstrap.postCount);
    $('.post').css('width', this.containerWidth);
  },

  showEmptyPost: function() {
    var $post = $(this.emptyPostHTML());
    var $uploader = $(".image-uploader").first().clone().removeClass('hide');
    var $container = $('#post-container');
    var newWidth = $container.outerWidth() + this.containerWidth;
    $container.css('width', newWidth);
    $('#post-container').prepend($post);
    $post.find('.image').append($uploader);
    $post.addClass('new').animate({'width': this.containerWidth}, 800);

    $post.find('.captions').bind('click', function(e) {
      $(this).replaceWith('<textarea class=""></textarea>');
    });

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
    html += '<div class="post clearfix">';
    html += '<div class="image">';
    html += '<img src="">';
    html += '</div>';
    html += '<div class="captions empty">';
    html += '<p class="caption"></p>';
    html += '</div></div>';

    return html;
  }
};
