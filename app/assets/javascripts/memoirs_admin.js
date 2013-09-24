//= require_tree ./admin/memoir

function emptyPostHTML() {
  var html = '';
  html += '<div id="modal">';
  html += '<form accept-charset="UTF-8" action="/admin/the-special-ones" class="new_memoir" enctype="multipart/form-data" id="new_memoir" method="post">';
  html += '<h3>image</h3>';
  html += '<div id="new-image"></div>';
  html += '<h3>caption</h3>';
  html += '<textarea name="memoir[caption]" id="new-caption"></textarea>';
  html += '</form>'
  html += '</div>';

  return html;
}

function hideEmptyPost() {
  var $overlay = $('#overlay');
  $overlay.removeClass('open');
  $('#modal').remove();
  setTimeout(function() {
    $overlay.remove();
  }, 300);
  $('#save-button').removeClass('active').addClass('disabled');
}

function showEmptyPost() {
  var $window = $(window);
  var windowHeight = $window.height();
  var windowWidth = $window.width();
  var $post = $(this.emptyPostHTML());
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

  var $overlay = $('#overlay');
  $overlay.addClass('open');
  $overlay.bind('click', function() {
    hideEmptyPost();
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
}


$(document).ready(function() {
  var slider = new Slidr();
  slider.$container = $('#main-container');
  slider.containerWidth = slider.$container.innerWidth() * 0.9;
  slider.resize();
  slider.init();

  $(window).bind('resize', function() {
    slider.resize();
  });

  $('#add-action').bind('click', function() {
    showEmptyPost();
  });

  $('#save-button').bind('click', function(e) {
    if ($(this).hasClass('disabled')) return;
    $('#new_memoir').submit();
  });
});
