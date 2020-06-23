'use strict';

const BTN_CLASS = 'page-nav__toggle';
const desktopOffsetYCoords = [2475, 3590, 4440, 7125];
const mobileOffsetYCoords = [1065, 1600, 2095, 3285];
const tabletOffsetYCoords = [1679, 2441, 3196, 4910];

let targetElement = document.querySelector('.page-nav__menu');
let burgerBtn = document.querySelector('.' + BTN_CLASS);
let menuOverlay = document.querySelector('.page-nav__wrapper');
let menuTopOverlay = document.querySelector('.page-nav__top-wrapper');

let navButtons = document.querySelectorAll('.page-nav__item');

function closeMenu() {
    bodyScrollLock.enableBodyScroll(targetElement);
    burgerBtn.classList.remove(BTN_CLASS + '--opened');
    menuTopOverlay.style.backgroundColor = '#F1A613';
    menuOverlay.style.transform = 'translateX(-' + menuOverlay.offsetWidth + 'px)';
    menuOverlay.style.visibility = 'hidden';
}

function scrollToTop() {
    if (window.matchMedia("(min-width: 959px)").matches) {
        window.scrollTo(0, 0);
    } else {
        window.scrollTo(0, 0);
        closeMenu();
    }
}

function openMenu() {
    bodyScrollLock.disableBodyScroll(targetElement);
    burgerBtn.classList.add(BTN_CLASS + '--opened');
    menuTopOverlay.style.backgroundColor = '#282828';
    menuTopOverlay.style.transition = 'all 350ms';
    menuOverlay.style.visibility = 'visible';
    menuOverlay.style.transform = 'translateX(0px)';
}

function setScrollFunctions() {
    let coordsArray = mobileOffsetYCoords;

    if (window.matchMedia("(min-width: 560px)").matches && window.matchMedia("(max-width: 959px)").matches) {
        coordsArray = tabletOffsetYCoords;
    } else if (window.matchMedia("(min-width: 960px)").matches) {
        coordsArray = desktopOffsetYCoords;
    }

    navButtons.forEach(element => {
        element.onclick = function () {
            let indexOfElement = Array.from(navButtons).indexOf(element);
            window.scrollTo({
                top: coordsArray[indexOfElement],
                behavior: 'smooth'
            });
        }
    });

    navButtons.forEach(element => {
        element.addEventListener('click', function () {
            if (window.matchMedia("(max-width: 959px)").matches) {
                closeMenu();
            }
        })
    });
}

function burgerBtnHandler() {
    if (burgerBtn.classList.contains(BTN_CLASS + '--opened')) {
        closeMenu();
    } else {
        openMenu();
    }
};

function resizeHanlder() {
    if (window.matchMedia("(max-width: 569px)").matches) {
        burgerBtn.addEventListener('click', burgerBtnHandler);
        setScrollFunctions();
    } else if (window.matchMedia("(min-width: 560px)").matches && window.matchMedia("(max-width: 959px)").matches) {
        burgerBtn.addEventListener('click', burgerBtnHandler);
        setScrollFunctions();
        closeMenu();
    } else {
        menuOverlay.style.transform = 'translateX(0px)';
        menuOverlay.style.visibility = 'visible';

        burgerBtn.removeEventListener('click', burgerBtnHandler);
        setScrollFunctions();
    }
}

window.onload = function () {
    resizeHanlder();
}

window.onresize = function () {
    resizeHanlder();
}