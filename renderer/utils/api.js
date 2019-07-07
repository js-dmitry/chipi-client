export function fetchResults(query) {
    return query ? api('sales-results') : api('suggestions');
}

export function fetchResult(id) {
    return api('result');
}

function api(path, logo = {}, delay = 500) {
    logo.state = 'searching';

    return fetch(`api/${path}.json?r=${Math.random()}`)
        .then(res => res.json())
        .catch(err => {
            logo.state = ':(';
            console.error(err);
        })
        .then(data => wait(data, delay))
        .then(data => {
            logo.state = ':p';
            return data;
        });
}

function wait(data, time) {
    return new Promise(resolve => setTimeout(() => resolve(data), time));
}
