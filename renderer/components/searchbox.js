import Element from './element.js';
import { focus, key, submit } from '../utils/helpers.js';
import { replaceQuery, loadSuggestions, loadResults } from '../actions/search.js';

/**
 * Chipi searchbox, with flags and autocomplete
 */
export default class Searchbox extends Element {
    connectedCallback() {
        // wait for half a second and fetch the results
        setTimeout(() => {
            this.autocomplete = ':today';
            this.store.dispatch(replaceQuery(filter(':today')));
            this.store.dispatch(loadResults());
        }, 500);

        // make sure we are connected to the store
        this.store.subscribe(() => this.subscribe());

        this.update();
    }

    focus() {
        this.querySelector('.searchbox-input').focus();
    }

    subscribe() {
        const state = this.store.getState();

        if ('query' in state.search) {
            this.value = state.search.query;
        }

        if (state.action === 'RESULTS_LOADED') {
            this.focus();
        }
    }

    set autocomplete(value) {
        const em = this.querySelector('em');

        if (!value) {
            if (em) {
                em.remove();
            }
            return;
        }

        const word = this.currentWord;

        if (!word || !value.startsWith(word)) {
            return;
        }

        value = value.slice(word.length);

        if (em) {
            em.innerText = value;
        } else {
            this.querySelector('.searchbox-render').innerHTML += `<em>${value}</em>`;
        }
    }

    get autocomplete() {
        const em = this.querySelector('em');

        if (em) {
            return em.innerText;
        }
    }

    get currentWord() {
        const value = this.value;

        if (!value || value.endsWith(' ')) {
            return '';
        }

        if (!value.includes(' ')) {
            return value;
        }

        return value.split(' ').pop();
    }

    set value(value) {
        value = filter(value);
        this.querySelector('.searchbox-input').value = value;
        this.querySelector('.searchbox-render').innerHTML = value
            .split(' ')
            .map(word => {
                if (word.includes(':')) {
                    return `<strong>${word}</strong>`;
                }

                return word;
            })
            .join(' ');
    }

    get value() {
        const inpt = this.querySelector('.searchbox-input');
        return inpt.value;
    }

    render(html) {
        const { search, user } = this.store.getState();

        return html`
            <form
                class="searchbox"
                @submit="${
                    e => {
                        e.preventDefault();
                        this.autocomplete = false;
                        this.store.dispatch(loadResults());
                    }
                }"
            >
                <textarea
                    placeholder="Hi, ${user.name}. Either run the day or the day runs you."
                    class="searchbox-input js-focus"
                    .value="${search.query}"
                    name="q"
                    autofocus
                    autocomplete="off"
                    maxlength="140"
                    @keydown="${
                        key({
                            //Autocomplete
                            Tab: e => {
                                if (this.autocomplete) {
                                    this.value += this.autocomplete;
                                    this.autocomplete = false;
                                    e.preventDefault();
                                }
                            },

                            //Remove autocomplete/value
                            Escape: e => {
                                if (this.autocomplete) {
                                    this.autocomplete = false;
                                } else if (this.value) {
                                    this.value = '';
                                    this.store.dispatch(loadSuggestions());
                                }
                                e.preventDefault();
                            },

                            //Focus bottom element
                            ArrowDown: e => focus(e.target, 1),

                            //Focus top element
                            ArrowUp: e => focus(e.target, -1),
                            Enter: e => {
                                e.preventDefault();
                                submit(e.target.form);
                            }
                        })
                    }"
                    @input="${
                        e => {
                            // this.value = e.target.value;
                            this.autocomplete = 'design';
                            this.store.dispatch(replaceQuery(filter(e.target.value)));

                            // list the commands if the input was "/"
                            if (e.target.value === '/') {
                                this.store.dispatch(loadResults());
                            }
                        }
                    }"
                ></textarea>

                <pre class="searchbox-render">
${
                        search.query.split(' ').map(word => {
                            if (word.includes(':')) {
                                return html`
                                    <strong>${word}</strong>
                                `;
                            }

                            return word;
                        })
                    }</pre
                >

                <button type="submit" class="searchbox-submit"></button>
            </form>
        `;
    }
}

customElements.define('chipi-searchbox', Searchbox);

function filter(value) {
    return value.replace(/\s+/g, ' ').substr(0, 140);
}
