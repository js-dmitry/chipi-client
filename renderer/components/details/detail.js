import Element from '../element.js';

export default class Detail extends Element {
    render(html) {
        const model = this.model;

        return html`
            <article class="detail">
                    ${this.renderPreview(html)}
                </div>

                <ul is="chipi-navlist" class="detail-actions" data-autofocus>
                    ${
                        this.commands.map(cmd => 
                            html`<li><button is="chipi-command" data-command="${cmd.cmd}" @click="${cmd.click}">${cmd.text}</button></li>`
                        )
                    }
                </ul>
            </article>
        `;
    }

    view(callback) {
        callback(document.getElementById('viewer'));
    }
}
