import Detail from './detail.js';

export default class Lead extends Detail {
    get commands() {
        return [
            {
                text: 'Call in Dialpad',
                cmd: 'Enter'
            },
            {
                text: 'Send an Email',
                cmd: '⌘E'
            },
            {
                text: 'Set to Commit',
                cmd: '⌘M'
            },
            {
                text: 'Send to...',
                cmd: '⌘S'
            }
        ];
    }

    renderPreview(html) {
        return html`
            <div class="detail-preview preview">
                <div class="preview-avatar">
                    <div class="avatar"><img src="img/avatar/${this.model.from.avatar}.jpg" class="avatar-user" /></div>
                    <p class="lead"><span class="lead-${this.model.lead}">${this.model.lead}</span></p>
                </div>
                <div class="preview-info">
                    <div>
                        <p class="client-name">${this.model.from.user}</p>
                        <div class="company">
                            <img class="service" src="img/logo/linkedin.svg" />
                            <a href="https://www.linkedin.com/in/carlos-seguin-lozano/" target="_blank" class="preview-link">Manager at ${this.model.from.company}</a>
                            <img class="tick" src="img/icon/tick.svg" />
                        </div>
                        <div class="contact-detail">
                            <div class="contact-detail-label">${this.model.from.account}</div>
                            <img class="tick" src="img/icon/tick.svg" />
                        </div>
                        <div class="contact-detail">
                            <div class="contact-detail-label">${this.model.from.phone}</div>
                            <img class="tick" src="img/icon/tick.svg" />
                        </div>
                        <p class="comments">${this.model.comments}<br />last login ${this.model.login}</p>
                    </div>
                </div>

                <p class="task-label">Tasks:</p>
                <p class="task">Call back on Friday</p>

                <p class="activity-label">Last activity:</p>
                <div class="activity">
                    <div class="activity-entry">
                        <img src="img/icon/mail.svg" />
                        <div>
                            <a href="#" class="preview-link">Email: Xero global release ...</a>
                            <span>Opened: 3 days ago</span>
                        </div>
                    </div>
                    <div class="activity-entry">
                        <img src="img/icon/location.svg" />
                        <div>
                            <a href="#" class="preview-link">Visited: Bank reconciliation ...</a>
                            <span>central.xero.com</span>
                        </div>
                    </div>
                </div>

                <p class="stack-label">Tech stack:</p>
                <p class="stack">Stripe, Mailchimp</p>
            </div>
        `;
    }
}

customElements.define('chipi-detail-lead', Lead);
