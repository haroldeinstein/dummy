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
  },

  emptyPostHTML: function() {
    var html = '';
    html += '<div class="post clearfix">';
    html += '<div class="image">';
    html += '<img src="">';
    html += '</div>';
    html += '<div class="captions">';
    html += '<p class="caption"></p>';
    html += '</div></div>';

    return html;
  }
};
