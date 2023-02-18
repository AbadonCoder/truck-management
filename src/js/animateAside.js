const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('#menu');

document.addEventListener('DOMContentLoaded', () => {
    btnMenu.addEventListener('click', translateAside);
});

function translateAside(e) {
    e.preventDefault();
    menu.classList.toggle('translate-x-full');
}