//= require_tree ./admin/memoir/collections
//= require_tree ./admin/memoir/models
//= require_tree ./admin/memoir/managers
//= require admin/memoir/slidr.js

function showEditDescription($elem) {
  var description = {};
  description.title = $elem.find('h2').html();
  description.description = $elem.find('.description').html();
  var $html = $(descriptionHTML(description));
  $html.appendTo("body").show();
  var $window = $(window);
  var $modal = $('#rep-modal-container');
  $modal.css({
    left: ($window.width() / 2) - ($modal.outerWidth() / 2),
    top: ($window.height() / 2) - ($modal.outerHeight() / 2)
  });

  $('#edit-description-form').bind('submit', function(e) {
    e.preventDefault();
    data = $(this).serialize();
    $.ajax({
      url: '/api/admin/description',
      type: 'PUT',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data: data,
      success: function(response, status, xhr) {
        hideEditDescription();
        html = '<h2>' + response.title + '</h2><br><br>';
        html += '<p class="description">' + response.description + '</p>';

        $('#description').html(html);
      }
    });
    return false;
  });

  $('#save-description').bind('click', function() {
    $('#edit-description-form').submit();
  });

  $('#cancel-description').bind('click', function() {
    hideEditDescription();
  });
}

function hideEditDescription() {
  $("#rep-modal-container").remove();
}

function descriptionHTML(description) {
  var html = '';
  html += '<div id="rep-modal-container">';
  html += '<div id="rep-modal">';
  html += '<form id="edit-description-form" method="put" action="/api/admin/description">';
  html += '<input name="description[title]" type="text" value="' + description.title + '">';
  html += '<textarea class="edit-description" name="description[description]" type="text" value="' + description.description + '">' + description.description + '</textarea>';
  html += '</form>';
  html += '<button class="btn neutral" id="cancel-description">cancel</button>';
  html += '<button class="btn active" id="save-description">save</button>';
  html += '</div>';
  html += '</div>';
  return html;
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

  var manager = new MemoirManager();

  $('#add-action').bind('click', function() {
    manager.showModal();
  });

  $('#save-button').bind('click', function(e) {
    if ($(this).hasClass('disabled')) return;
    $('#new_memoir').submit();
  });

  $('.post').bind('click', function() {
    var id = parseInt($(this).attr('data-id'), 10);
    manager.showModal(id);
  });

  $('#special-ones').on('click', '#description', function() {
    showEditDescription($(this));
  });
});
