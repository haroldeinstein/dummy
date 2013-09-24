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

  seekTo: function(index) {
    $('#post-container').animate({ 'left' : -this.containerWidth * index });
  },

  nextPost: function() {
    var test = $('.post').length - 1;
    this.idx++;
    if (this.idx > test) {
      this.idx = test;
      return;
    }

    this.seekTo(this.idx);
  },

  previousPost: function() {
    this.idx--;
    if (this.idx < 0) {
      this.idx = 0;
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
