import Button from '../button.js';
import {replaceQuery, loadResults} from '../../actions/search.js';
import store from '../../store.js';

export default class Command extends Button {
    constructor() {
        super();
        this.addEventListener('click', () => {
            store.dispatch(replaceQuery(`${this.model.title} @`));
            store.dispatch(loadResults());
        })
    }

    render(html) {
        return html`
            <strong>${this.model.title}</strong><span class="chipi-command-tag">${this.model.description}</span>
        `;
    }
}

customElements.define('chipi-command-listitem', Command, {extends: 'button'});
