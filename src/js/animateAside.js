const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('#menu');
const asideLink = document.querySelector('.active');
menu.classList.remove('translate-x-full');

document.addEventListener('DOMContentLoaded', () => {
    btnMenu.addEventListener('click', translateAside);
    
    // Change aside links color
    asideLinksColor(asideLink);
});

function translateAside(e) {
    e.preventDefault();
    menu.classList.toggle('translate-x-full');
}

function asideLinksColor(link) {
    link.classList.add('bg-blue-700', 'rounded-full', 'py-1', 'px-3');
}