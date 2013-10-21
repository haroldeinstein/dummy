//= require_tree ./admin/contacts

function showEditHeadline($elem) {
  var text = $elem.text();
  var $input = $('<input type="text" id="edit-headline">');
  $input.val(text);
  $elem.replaceWith($input);

  var $save = $('<button class="btn active" id="save-headline">save</button>');
  var $cancel = $('<button class="btn neutral" id="cancel-headline">cancel</button>');
  $save.appendTo('body');
  $cancel.appendTo('body');

  var offsetTop = $input.offset().top;
  var offsetLeft = $input.offset().left + $input.outerWidth();
  var inputHeight = $input.outerHeight();
  var saveWidth = $save.outerWidth();
  var cancelWidth = $cancel.outerWidth();

  $save.css({
    'position' : 'absolute',
    'left' : offsetLeft - saveWidth,
    'top' : inputHeight + offsetTop
  });

  $cancel.css({
    'position' : 'absolute',
    'left' : offsetLeft - saveWidth - cancelWidth - 2,
    'top' : inputHeight + offsetTop
  });

  $('#save-headline').bind('click', function() {
    hideEditHeadline($input, true);
  });

  $('#cancel-headline').bind('click', function() {
    hideEditHeadline($input, false);
  });

}

function hideEditHeadline($input, save) {
  var headline = $input.val();

  if (save) {
    $.ajax({
      url: '/api/admin/headline',
      type: 'PUT',
      data: {
        authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
        headline: headline
      },
      success: function(response, status, xhr) {
        $('#save-headline').remove();
        $('#cancel-headline').remove();
        $input.replaceWith('<p class="contact-headline">' + headline + '</p>');
      }
    });
  } else {
    $('#save-headline').remove();
    $('#cancel-headline').remove();
    $input.replaceWith('<p class="contact-headline">' + headline + '</p>');
  }
}

function showEditAddress($elem) {
  var address = {};
  address.address = $elem.find('.address1').html();
  address.city = $elem.find('.city').html();
  address.state = $elem.find('.state').html();
  address.zip = $elem.find('.zip').html();
  address.phone = $elem.find('.phone').html();
  var $html = $(addressHTML(address));
  $html.appendTo("body").show();
  var $window = $(window);
  var $modal = $('#rep-modal-container');
  $modal.css({
    left: ($window.width() / 2) - ($modal.outerWidth() / 2),
    top: ($window.height() / 2) - ($modal.outerHeight() / 2)
  });

  $('#edit-address-form').bind('submit', function(e) {
    e.preventDefault();
    data = $(this).serialize();
    $.ajax({
      url: '/api/admin/address',
      type: 'PUT',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data: data,
      success: function(response, status, xhr) {
        hideEditAddress();
        html = '<span class="address1">' + response.address1 + '</span><br>';
        html += '<span class="city">' + response.city + '</span>, <span class="state">' + response.state + '</span> <span class="zip">' + response.zip + '</span><br>';
        html += 'phone <span class="phone">' + response.phone  + '</span>';

        $('.office-address').find('address').html(html);
      }
    });
    return false;
  });

  $('#save-address').bind('click', function() {
    $('#edit-address-form').submit();
  });

  $('#cancel-address').bind('click', function() {
    hideEditAddress();
  });
}

function hideEditAddress() {
  $("#rep-modal-container").remove();
}

function addressHTML(address) {
  var html = '';
  html += '<div id="rep-modal-container">';
  html += '<div id="rep-modal">';
  html += '<form id="edit-address-form" method="put" action="/api/admin/address">';
  html += '<input name="address[address1]" type="text" value="' + address.address + '">';
  html += '<input name="address[city]" type="text" value="' + address.city + '">';
  html += '<input name="address[state]" type="text" value="' + address.state + '">';
  html += '<input name="address[zip]" type="text" value="' + address.zip + '">';
  html += '<input name="address[phone]" type="text" value="' + address.phone + '">';
  html += '</form>';
  html += '<button class="btn neutral" id="cancel-address">cancel</button>';
  html += '<button class="btn active" id="save-address">save</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function showEditPerson($elem) {
  var person = {};
  person.title = $elem.find('.title').html();
  person.name = $elem.find('.name').html();
  person.email = $elem.find('.name').attr('data-email');
  var $html = $(personHTML(person));
  $html.appendTo("body").show();
  var $window = $(window);
  var $modal = $('#rep-modal-container');
  $modal.css({
    left: ($window.width() / 2) - ($modal.outerWidth() / 2),
    top: ($window.height() / 2) - ($modal.outerHeight() / 2)
  });

  $('#edit-person-form').bind('submit', function(e) {
    e.preventDefault();
    data = $(this).serialize();
    $.ajax({
      url: '/api/admin/person',
      type: 'PUT',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data: data,
      success: function(response, status, xhr) {
        hideEditAddress();
        html = '<p class="bold name" data-email="' + response.email + '">' + response.name + '</p>';
        html += '<p class="bold title">' + response.title + '</p>';

        $('.office-person').html(html);
      }
    });
    return false;
  });

  $('#save-person').bind('click', function() {
    $('#edit-person-form').submit();
  });

  $('#cancel-person').bind('click', function() {
    hideEditPerson();
  });
}

function hideEditPerson() {
  $("#rep-modal-container").remove();
}

function personHTML(person) {
  var html = '';
  html += '<div id="rep-modal-container">';
  html += '<div id="rep-modal">';
  html += '<form id="edit-person-form" method="put" action="/api/admin/person">';
  html += '<input name="person[name]" type="text" value="' + person.name + '">';
  html += '<input name="person[email]" type="text" value="' + person.email + '">';
  html += '<input name="person[title]" type="text" value="' + person.title + '">';
  html += '</form>';
  html += '<button class="btn neutral" id="cancel-person">cancel</button>';
  html += '<button class="btn active" id="save-person">save</button>';
  html += '</div>';
  html += '</div>';
  return html;
}


$(document).ready(function() {
  var manager = new RepManager();

  $('#reps').sortable({
    cursor: 'move',
    items: '.rep',
    stop: function(e, ui) {
      var sort = $('#reps').sortable("serialize", {
        key: "sort"
      });
      manager.updateSort(sort);
    }
  });

  $('#reps').on('click', '.rep',  function(e) {
    var $self = $(this);
    var location = $self.attr('data-location');
    manager.showModal(location);
  });

  $('#add-action').bind('click', function(e) {
    e.preventDefault();
    manager.showModal();
  });

  $('#save-button').bind('click', function(e) {
    if ($(this).hasClass('disabled')) return;
    manager.save();
  });

  $('#contact').on('click', '.contact-headline', function() {
    showEditHeadline($(this));
  });

  $('#contact').on('click', '.office-address', function() {
    showEditAddress($(this));
  });

  $('#contact').on('click', '.office-person', function() {
    showEditPerson($(this));
  });
});
