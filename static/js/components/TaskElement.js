/**
 * Webian Tasks - Task Element.
 *
 * UI component representing an individual task.
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
class TaskElement extends HTMLElement {

  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
    this.summaryInput = document.createElement('input');
    this.summaryInput.setAttribute('type', 'text');
    this.summaryInput.setAttribute('class', 'task-summary');
    this.summaryInput.setAttribute('disabled', true);
    var summary = this.getAttribute('summary');
    this.summaryInput.value = summary;
    var style = document.createElement('style');

    // TODO: Figure how to remove selector duplication for cross-browser support
    style.textContent = `
      webian-task {
        display: block;
        height: 4rem;
        border-bottom: solid 1px #ccc;
      }
      :host {
        display: block;
        height: 4rem;
        border-bottom: solid 1px #ccc;
      }
      .task-summary {
        border: none;
        height: 3rem;
        width: calc(100% - 2rem);
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
      }
      .task-summary:disabled {
        color: #000;
        background-color: #fff;
      }
    `;

    shadow.appendChild(this.summaryInput);
    shadow.appendChild(style);
  }

  get summary() {
    return this.getAttribute('summary');
  }

  set summary(value) {
    this.setAttribute('summary', value);
  }

  /**
   * Specify which attributes to observe for changes.
   */
  static get observedAttributes() {
    return ['summary'];
  }

  /**
   * Listen for changes to attributes.
   */
  attributeChangedCallback(name, oldValue,  newValue) {
    switch(name) {
      case 'summary':
        this.summaryInput.value = newValue;
        break;
    }
  }
}

window.customElements.define('webian-task', TaskElement);
