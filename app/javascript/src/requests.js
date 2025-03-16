import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export var indexTasks = function () {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: function (response) {
      $("#tasks").empty();
      response.tasks.map(function(task) {
        $("#tasks").append("<div class='row mb-3 p-2 border rounded task-list'>" + 
          "<input class='form-check-input form-check-input-checked-color-dark col-1 mt-2 ms-2' name='completed' type='checkbox' value = '' data-id='" + task.id + "' " + (task.completed ? "checked" : "") + ">" +
          "<div class='col-8 task pt-1 ms-5 ps-5' data-id='" + task.id + "'>" +
            task.content +
          "</div>" + 
          "<button class = 'btn btn-dark btn-sm remove col-2' data-id = '" + task.id + "'>remove</button>"
        )
      });
    },
    error: function (reqest, error) {
      console.log(error)
    }
  }

  $.ajax(request);
};

export var postTask = function (content) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: function (response) {
      indexTasks();
    },
    error: function (response, error) {
      console.log(error);
    }
  }

  $.ajax(request);
};

export var deleteTask = function (id) {
  var request = {
    type: 'DELETE',
    url: 'api/tasks/' + id + '?api_key=1',
    success: function (response) {
      indexTasks();
    },
    error: function (request, error) {
      console.log(error);
    }
  }

  $.ajax(request);
};

export var taskActive = function (id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/' + id + '/mark_active?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request)
}

export var taskComplete = function (id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/' + id + '/mark_complete?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request)
}