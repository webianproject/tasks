/**
 * Webian Tasks - Main front end script.
 *
 * © Ben Francis 2018
 *
 * This file is part of Webian Tasks.
 * Webian Tasks is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Webian Tasks is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Webian Tasks.  If not, see <http://www.gnu.org/licenses/>.
 */
var Tasks = {
  _db: null,

  /**
   * Start the tasks app.
   */
  start: function() {
    this.tasksElement = document.getElementById('tasks');
    // Start the tasks database
    Database.start()
    // Get a list of tasks
    .then(function(){
      return Database.getTasks();
    })
    // Show the list of tasks
    .then((function(tasks) {
      this.showTasks(tasks).bind(this);
    }).bind(this));
  },

  /**
   * Show the task list.
   *
   * @param {Array} tasks An array of PouchDB document objects representing tasks.
   */
  showTasks: function(tasks) {
    this.tasksElement.innerHTML = '';
    tasks.forEach(function(taskObject) {
      var taskElement = document.createElement('webian-task');
      taskElement.summary = taskObject.doc.summary;
      this.tasksElement.appendChild(taskElement);
    }, this);
  }
};

/**
  * Start app on page load.
  */
window.addEventListener('load', function tasks_onLoad() {
  window.removeEventListener('load', tasks_onLoad);
  Tasks.start();
});
