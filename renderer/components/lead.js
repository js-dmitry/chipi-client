import Element from './element.js';
import { appendQuery, loadResults } from '../actions/search.js';

export default class Lead extends Element {
    render(html) {
        const {type} = this.attributes;

        return html`<span class="chipi-lead chipi-lead-${type.value}">${type.value}</span>`;
    }
}

customElements.define('chipi-lead', Lead);
