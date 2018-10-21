/**
 * Webian Tasks - Database.
 *
 * Stores tasks.
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
var Database = {
  _db: null,

  /**
   * Start the tasks database.
   *
   * @returns {Promise} Resolves on successful completion
   */
  start: function() {
    return new Promise((resolve, reject) => {
      // Create or open the database.
      this._db = new PouchDB('tasks');
      this._db.info().then((function (info) {
        // If database is empty, create some example tasks
        if (info.doc_count == 0) {
          console.log('Populating database with example tasks...');
          this.populate().then(function() {
            resolve();
          });
        } else {
          console.log('Database loaded.');
          resolve();
        }
      }).bind(this));
    });
  },

  /**
   * Get a list of tasks.
   *
   * @returns {Promise} Resolves with a list of PouchDB document objects.
   */
  getTasks: function() {
    return new Promise((resolve, reject) => {
      this._db.allDocs({include_docs: true, descending: true}, (function(err, doc) {
        resolve(doc.rows);
      }).bind(this));
    });
  },

  /**
   * Populate the database with some default tasks.
   *
   * @returns {Promise} Resolves on successful completion.
   */
  populate: function() {
    return new Promise((resolve, reject) => {
      // Get a list of default tasks from a static JSON file
      fetch('/defaults/tasks.json').then((function(response) {
        if (!response.ok) {
          console.error('Bad network response while fetching default tasks');
          reject();
          return;
        }
        response.json().then((function(tasks) {
          // Bulk write the list of default task objects
          this._db.bulkDocs(tasks).then(function() {
            resolve();
          });
        }).bind(this));
      }).bind(this))
      .catch(function(error) {
        console.error('Failed to fetch default tasks: ' + error.message);
        reject();
      });
    });
  }
};
