'use strict';

let assignmentClasses = [
    'slider__item--firstA',
    'slider__item--secondA',
    'slider__item--thirdA'
];
let feedbackClasses = [
    'slider__item--firstF',
    'slider__item--secondF',
    'slider__item--thirdF'
];

let assignmentNextBtn = document.querySelector('.assignment .slider__btn--next');
let assignmentPrevBtn = document.querySelector('.assignment .slider__btn--prev');
let feedbackNextBtn = document.querySelector('.feedback .slider__btn--next');
let feedbackPrevBtn = document.querySelector('.feedback .slider__btn--prev');
let galleryNextBtn = document.querySelector('.page-gallery__btn--next');
let galleryPrevBtn = document.querySelector('.page-gallery__btn--prev');

let feedbackInputFiedlds = document.querySelectorAll('input[name=feedback]');
let galleryInputFiedlds = document.querySelectorAll('input[name=gallery]');

let photoGallery = document.querySelector('.page-gallery');

let photoKeyframes = [{
        transform: 'translate(0px) rotate(26deg)'
    },
    {
        transform: 'translate(200px, 0px) rotate(20deg)'
    },
    {
        transform: 'rotate(0deg) translate(-400px, -15px) scale(1.3, 1.3)'
    }
];

let frameOptions = {
    duration: 1000,
    easing: 'ease-in'
};

function showModal(photo) {
    let animation = photo.animate(photoKeyframes, frameOptions);

    let clickHandlerNext = function () {
        switchInput(1, galleryInputFiedlds);
    }
    let clickHandlerPrev = function () {
        switchInput(-1, galleryInputFiedlds);
    }
    let clickHanlderGallery = function (evt) {
        if (evt.target === photoGallery) {
            galleryNextBtn.removeEventListener('click', clickHandlerNext);
            galleryPrevBtn.removeEventListener('click', clickHandlerPrev);

            photoGallery.classList.remove('start-state');
            photoGallery.style.backgroundColor = 'transparent';
            photo.classList.add('flowAnimation');
            photo.style.visibility = 'visible';
            galleryInputFiedlds[2].checked = true;

            photoGallery.classList.remove('page-gallery--active');
        }
    }

    setTimeout(function () {
        photo.style.zIndex = '3';
    }, 600);

    animation.addEventListener('finish', function () {
        photo.style.visibility = 'hidden';
        photo.style.zIndex = '1';
        photo.classList.remove('flowAnimation');

        photoGallery.classList.add('page-gallery--active');

        setTimeout(function () {
            photoGallery.classList.add('start-state');
            photoGallery.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }, 1);

        galleryNextBtn.addEventListener('click', clickHandlerNext);
        galleryPrevBtn.addEventListener('click', clickHandlerPrev);
        photoGallery.addEventListener('click', clickHanlderGallery);
    });
}

function switchInput(way, controls) {
    let currentIndexOfChecked = Array.from(controls).findIndex(function (elem) {
        return elem.checked;
    });

    if (currentIndexOfChecked + way === 3) {
        controls[0].checked = true;
    } else if (currentIndexOfChecked + way === -1) {
        controls[2].checked = true;
    } else {
        controls[currentIndexOfChecked + way].checked = true;
    }
}

function cyclicShift(array, way) {
    if (way) {
        array.unshift(array.pop());
    } else {
        array.push(array.shift());
    }
    return array;
}

function switchClasses(evt, way, cardClassList) {
    let container = evt.target.parentNode.previousElementSibling;
    let mainClasses = container.children[0].classList[0] + ' ' + container.children[0].classList[1];

    cyclicShift(cardClassList, way);

    for (let i = 0; i < cardClassList.length; i++) {
        if (way && (cardClassList[i] === 'slider__item--thirdA' || cardClassList[i] === 'slider__item--thirdF')) {
            container.children[i].className = mainClasses + ' ' + cardClassList[i] + ' hideRight';
        } else if (!way && (cardClassList[i] === 'slider__item--firstA' || cardClassList[i] === 'slider__item--firstF')) {
            container.children[i].className = mainClasses + ' ' + cardClassList[i] + ' hideLeft';
        } else {
            container.children[i].className = mainClasses + ' ' + cardClassList[i];
        }
    }
}

assignmentPrevBtn.addEventListener('click', function (evt) {
    switchClasses(evt, 0, assignmentClasses);
});

assignmentNextBtn.addEventListener('click', function (evt) {
    switchClasses(evt, 1, assignmentClasses);
});

feedbackPrevBtn.addEventListener('click', function (evt) {
    if (window.matchMedia('(max-width: 959px)').matches) {
        switchClasses(evt, 0, feedbackClasses);
    }
    switchInput(-1, feedbackInputFiedlds);
});

feedbackNextBtn.addEventListener('click', function (evt) {
    if (window.matchMedia('(max-width: 959px)').matches) {
        switchClasses(evt, 1, feedbackClasses);
    }
    switchInput(1, feedbackInputFiedlds);
});