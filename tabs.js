'use strict'

const DEFAULT_CLASSNAME = 'tab';

function Tabs(className = DEFAULT_CLASSNAME) {
    const onClick = function(e) {
        reset();

        e.target.classList.add(`${className}_selected`);

        const id = e.currentTarget.getAttribute('data-tab');
        document.getElementById(id).classList.add(`${className}_selected`);
    };

    const render = function () {
        const menuElements = document.querySelectorAll('[data-tab]');

        for (let i = 0; i < menuElements.length; i++) {
            menuElements[i].addEventListener('click', onClick, false);
        }
    };

    const reset = function () {
        const menuElements = document.querySelectorAll('[data-tab]');

        for (let i = 0; i < menuElements.length; i++) {
            menuElements[i].classList.remove(`.${className}_selected`);
            const id = menuElements[i].getAttribute('data-tab');
            document.getElementById(id).classList.remove(`${className}_selected`);
        }
    };

    render();
}
