import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
  taskActive,
  taskComplete
} from "./requests.js";

indexTasks(function (response) {
  var htmlString = response.tasks.map(function(task) {
    return "<div class='row mb-3 p-2 border rounded task-list'>" + 
      "<input class='form-check-input form-check-input-checked-color-dark col-1 mt-2 ms-2' name='completed' type='checkbox' value = '' data-id='" + task.id + "' " + (task.completed ? "checked" : "") + ">" +
      "<div class='col-8 task pt-1 ms-5 ps-5' data-id='" + task.id + "'>" +
        task.content +
      "</div>" + 
      "<button class = 'btn btn-dark btn-sm remove col-2' data-id = '" + task.id + "'>remove</button>"
  });

  $("#tasks").html(htmlString);
});

var allTasks = function () {
  $(".task-list").each(function (i, ele) {
    $(this).show();
  });
}

var activeTasks = function () {
  $(".task-list").each(function (i, ele) {
    if ($(this).find(".form-check-input").prop("checked")) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

var completeTasks = function () {
  $(".task-list").each(function (i, ele) {
    if ($(this).find(".form-check-input").prop("checked") !== true) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}



$(function() {
  $('#addTask').on('submit', function(event) {
    event.preventDefault();
    postTask($('#newToDo').val());
  });

  $(document).on('click', '.remove', function() {
    deleteTask($(this).data('id'));
  })

  $(document).on('change', '.form-check-input', function () {
    if (this.checked) {
      taskComplete($(this).data('id'));
    } else {
      taskActive($(this).data('id'));
    }
  });

  $('.toggle-all').on('click', function () {
    allTasks();
  })

  $('.toggle-active').on('click', function () {
    activeTasks();
  })

  $('.toggle-complete').on('click', function () {
    completeTasks();
  })

});
