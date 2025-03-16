import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
  taskActive,
  taskComplete
} from "./requests.js";



var allTasks = function () {
  $(".task-list").each(function (i, ele) {
    $(this).show();
  });
};

var activeTasks = function () {
  $(".task-list").each(function (i, ele) {
    if ($(this).find(".form-check-input").prop("checked")) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
};

var completeTasks = function () {
  $(".task-list").each(function (i, ele) {
    if ($(this).find(".form-check-input").prop("checked") !== true) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
};

$(document).ready(function() {

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

  indexTasks();

});
