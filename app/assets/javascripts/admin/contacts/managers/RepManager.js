function RepManager() {
  this.repLocations = new RepLocationsCollection();
  this.repLocations.fetch();
}

RepManager.prototype = {
  showModal: function(location, $elem) {
    var $body = $('body');
    if ($body.hasClass('has-modal')) return;

    $body.addClass('has-modal');

    var repLocation = location ? this.repLocations.where({"location" : location})[0].toJSON() : null;
    var modal = this.getModalHTML(repLocation);
    var $modal = $(modal);

    $body.append($modal);
    $modal.show();

    var modalHeight = $modal.outerHeight();
    var modalWidth = $modal.outerWidth();
    var offsetLeft = $elem.offset().left;
    var offsetTop = $elem.offset().top;

    $modal.hide();

    $modal.css({
      top : offsetTop,
      left : offsetLeft - modalWidth - 25
    });

    $modal.show();

    var manager = this;

    var proceed = function() {
      // validate
      $('#save-button').removeClass('disabled').addClass('active');
      var data = {
        location: $('#location').val(),
        reps: [
          {
            id: $('#rep-one-id').val() === "" ? null : $('#rep-one-id').val(),
            name: $('#rep-one-name').val(),
            email_address: $('#rep-one-email').val()
          },
          {
            id: $('#rep-two-id').val() === "" ? null : $('#rep-two-id').val(),
            name: $('#rep-two-name').val(),
            email_address: $('#rep-two-email').val()
          }
        ]
      };

      var success = function() {
        $elem.replaceWith($(manager.repTemplate(data)));
        $body.removeClass('has-modal');
        manager.hideModal();
      };

      if (location) manager.updateRepLocation(location, data, success);
      else manager.addRepLocation(data, success);

      $(document).unbind('keypress');
    }


    $('#cancel').bind('click', function() {
      manager.hideModal();
    });

    $('#delete').bind('click', function() {
      var loc = $('#hidden-location').val();
      var repLocation = manager.repLocations.where({"location": loc})[0];
      console.log(repLocation);
      repLocation.set('delete', true);
      manager.hideModal();
      $('.rep').filter('[data-location="'+repLocation.get("location")+'"]').remove();
      $('#save-button').removeClass('disabled').addClass('active');
    });

    $(document).bind('keypress', function(e) {
      if (e.keyCode === 13)
        proceed();
    });

    $('#add-rep').bind('click', function() {
      proceed();
    });
  },

  hideModal: function() {
    $('body').removeClass('has-modal');
    $('#rep-modal-container').remove();
  },

  addRepLocation: function(data, success) {
    var rep = new RepLocationModel(data);
    this.repLocations.add(rep);
    if (success) success();

    var html = "";
    html += '<div class="rep blank">';
    html += '<p class="location"></p>';
    html += '</div>';

    $("#reps").append($(html));
  },

  updateSort: function(sort) {
    var locations = sort.replace(/sort=/g, '').split('&');
    for (var i = 0; i < locations.length; i++) {
      var location = this.repLocations.where({"location": locations[i]})[0];
      location.set('sort_index', i);
    }
    $('#save-button').removeClass('disabled').addClass('active');
  },

  updateRepLocation: function(location, data, success) {
    repLocation = this.repLocations.where({"location":location})[0];
    repLocation.set(data);
    if (success) success();
  },

  removeRep: function(id, success) {
    var repModel = this.repLocations.get(id);
    this.repLocations.remove(repModel);
    if (success) success();
  },

  save: function(opts) {
    var locations = this.repLocations.toJSON();
    var data = {
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
    };

    var repLocations = [];

    for (var i = 0; i< locations.length; i++) {
      var location = locations[i];
      var reps = [];
      for (var j = 0; j < location.reps.length; j++) {
        var rep = location.reps[j];
        reps.push(rep);
      }
      location.reps = reps;
      repLocations.push(location);
    }

    data.rep_locations = repLocations;

    $.ajax({
      url: '/api/admin/reps',
      data: data,
      type: 'PUT',
      success: function(response, status, xhr) {
        $('#save-button').removeClass('active').addClass('disabled');
        if (opts && opts.success) opts.success();
      },
      error: function(response) {
      }
    });
  },

  getModalHTML: function(repLocation) {
    var html = "";
    html = '<div id="rep-modal-container">';
    html += '<div id="rep-modal">';

    if (repLocation)
      html += '<input type="hidden" id="hidden-location" value="' + repLocation.location + '">';

    html += '<input class="light" id="location" type="text" placeholder="location" value="';
    if (repLocation)
      html += repLocation.location;
    html += '" /><br>';

    // first rep
      html += '<input type="hidden" id="rep-one-id" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[0].id;
      html += '" />';

      html += '<input class="light no-margin" id="rep-one-name" type="text" placeholder="name" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[0].name;
      html += '" /><br>';

      html += '<input class="light" id="rep-one-email" type="text" placeholder="email" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[0].email_address;
      html += '" /><br>';

    // second rep
      html += '<input type="hidden" id="rep-two-id" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[1].id;
      html += '" />';

      html += '<input class="light no-margin" id="rep-two-name" type="text" placeholder="name" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[1].name;
      html += '" /><br>';

      html += '<input class="light" id="rep-two-email" type="text" placeholder="email" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[1].email_address;
      html += '" /><br>';

    html += '<button id="cancel" class="delete-location">&#x2715;</button>';
    if (repLocation) {
      html += '<button id="delete" class="btn negative" style="width: 48%;">delete</button>';
      html += '<button id="add-rep" class="btn positive" style="width: 48%;margin-left:8px;">update</button>';
    }
    else
      html += '<button id="add-rep" class="btn positive" style="width: 48%;margin-left:8px;">add</button>';

    html += '</div>';
    html += '</div>';

    return html;
  },

  repTemplate: function(data) {
    var html = '';
    html += '<div class="rep" data-id="' + data.id + '" data-location="' + data.location + '">';
    html += '<p class="location">';
    if (data.location) {
      html += data.location;
    }
    html += '</p>';

    html += '<p class="bold">';
    if (data.reps[0] && data.reps[0].name) {
      html += data.reps[0].name;
    }
    html += '</p>';

    html += '<p class="bold">';
    if (data.reps[1] && data.reps[1].name) {
      html += data.reps[1].name;
    }
    html += '</p>';

    html += '</div>';
    return html;
  }
}
