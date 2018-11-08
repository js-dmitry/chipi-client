import { parse } from '../utils/helpers.js';

export default function(app, result) {
    const { container, results } = app.data;

    results.classList.add('has-panel');
    result.classList.add('is-selected');
    result.blur();

    const panel = parse(`
    <chipi-panel class="app-panel" tabindex="0" size="3">
        <article class="result is-detail">
            <div class="result-service avatar">
                <img src="img/avatar/004.jpg" class="avatar-user">
                <img src="img/logo/slack.svg" class="avatar-service">
            </div>
            
            <ul is="chipi-navlist" class="result-actions" data-autofocus>
                <li><button is="chipi-command" data-command="Enter">Show in Slack</button></li>
                <li><button is="chipi-command" data-command="⌘C">Copy message</button></li>
                <li><button is="chipi-command" data-command="⌘S">Send to...</button></li>
            </ul>
            <div class="result-content">
                <p>Hey Carlos, was talking with Jing about you, no rush to be back to work, take a decent rest to recover fully before getting back to work 😀</p>
            </div>
        </article>
    </chipi-panel>
    `).firstElementChild;

    container.append(panel);

    panel.addEventListener('keydown', e => {
        if (e.code === 'ArrowLeft' || e.code === 'Escape') {
            panel.destroy().then(() => {
                results.classList.remove('has-panel');
                result.classList.remove('is-selected');
                result.focus();
            });
        }
    });

    panel.addEventListener('click', e => {
        if (e.target === panel) {
            panel.destroy().then(() => {
                results.classList.remove('is-background');
                result.classList.remove('is-selected');
                result.focus();
            });
        }
    });
}
