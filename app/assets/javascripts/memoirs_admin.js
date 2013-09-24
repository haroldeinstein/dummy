//= require_tree ./admin/memoir

function emptyPostHTML() {
  var html = '';
  html += '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" class="memoir">';
  html += '<tr>';
  html += '<td valign="middle">';
  html += '<div id="modal">';
  html += '<div class="post clearfix">';
  html += '<div class="image">';
  html += '<img src="">';
  html += '</div>';
  html += '<div class="captions empty">';
  html += '<p class="caption"></p>';
  html += '</div></div></div>';
  html += '</td>';
  html += '</tr>';
  html += '</table>';

  return html;
}

function showEmptyPost() {
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
});
