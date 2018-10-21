/**
 * Webian Tasks - Main back end script.
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
 * along with Webian Home.  If not, see <http://www.gnu.org/licenses/>.
 */
var express = require('express');
var app = express();

// Serve JavaScript Libraries
app.use('/js/lib/pouchdb',
  express.static(__dirname + '/node_modules/pouchdb/dist'));
app.use('/js/lib/webcomponentsjs',
  express.static(__dirname + '/node_modules/@webcomponents/webcomponentsjs'));

// Serve all the other static HTML, CSS & JavaScript
app.use(express.static('static'));

// Start web server
app.listen(8080, function () {
  console.log('Listening on port 8080.');
});
