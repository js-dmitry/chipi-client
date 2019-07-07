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
            ${this.model.title} ${this.model.description}
        `;
    }
}

customElements.define('chipi-command-listitem', Command, {extends: 'button'});
