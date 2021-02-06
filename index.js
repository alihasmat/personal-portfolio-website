
//Mobile Menu
const menu = document.getElementsByClassName('hamburger-menu')[0];
const svgIcon = document.getElementsByClassName('icon')[0];
const mobileMenu = document.querySelector(".header__menu");

menu.addEventListener('click', () => {
    svgIcon.classList.remove('icon');
    svgIcon.classList.toggle('cross');
    svgIcon.classList.add('icon');

    if(svgIcon.classList.contains('cross')) {
        mobileMenu.style.display = "block";
        mobileMenu.classList.add('fade-in');
        mobileMenu.classList.remove('fade-out');
    }else {
        mobileMenu.classList.add('fade-out');
        mobileMenu.classList.remove('fade-in');
    }

});

//Slider

const slides = document.querySelectorAll('.carousel__item');
let slidePosition = 0;
const totalSlides = slides.length;

const rightBtn = document.getElementById('right_btn');
const leftBtn = document.getElementById('left_btn');

function hideAllSlides() {
    for(let slide of slides) {
        slide.classList.remove('carousel__active');
        slide.classList.add('carousel__hidden')
    }
}

function nextSlide() {

    hideAllSlides();

    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    
    slides[slidePosition].classList.add("carousel__active");

}

function prevSlide() {

    hideAllSlides();

    if(slidePosition === 0) {
        slidePosition = totalSlides - 1;
    }else {
        slidePosition--;
    }

    slides[slidePosition].classList.add('carousel__active');

}

function autoPlay() {
    nextSlide();
}

let timer = setInterval(autoPlay, 6000)

function resetTimer() {
    clearInterval(timer);
    timer=setInterval(autoPlay, 6000);
}

rightBtn.addEventListener('click', function() {
    nextSlide();
    resetTimer();
})
leftBtn.addEventListener('click', function() {
    prevSlide();
    resetTimer();
})


//typwriter effect animation
const typedText = document.querySelector('.profile__subheading__text');
const cursor = document.querySelector('.profile__subheading__cursor');

const textArray = ['Actor', 'Producer', 'Writer', 'Director'];
const typingDelay = 200;
const erasingDelay = 100;
const nexTextDelay = 2000;

let textArrayIndex = 0;
let charIndex = 0;


function type() {
    if(charIndex < textArray[textArrayIndex].length) {

        if(!cursor.classList.contains('profile__subheading__cursor')) {
            cursor.classList.add('profile__subheading__cursor');
        }

        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay)
    }else {
        cursor.classList.remove('profile__subheading__cursor');

        setTimeout(erase, nexTextDelay);
    }
}

function erase() {
    if(charIndex > 0) {

        if(!cursor.classList.contains('profile__subheading__cursor')) {
            cursor.classList.add('profile__subheading__cursor');
        }

        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex- 1);
        charIndex--;
        setTimeout(erase, erasingDelay)
    }else {

        cursor.classList.remove('profile__subheading__cursor');

        textArrayIndex++;
        if(textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(textArray.length) {
        setTimeout(type, nexTextDelay + 250)
    }
})


//Portfolio
let buttons = document.querySelectorAll('.portfolio__buttons button');
for(let button of buttons) {
    button.addEventListener('click', (e) => {
        const target = e.target;
        
        const buttonActive = document.querySelector('.portfolio__buttons__active');

        if(buttonActive) {
            buttonActive.classList.remove('portfolio__buttons__active');
        }
        target.classList.add('portfolio__buttons__active');

        let allContent = document.querySelectorAll('.portfolio__images__links');
        for(let content of allContent) {
            if(content.getAttribute("data-number") === button.getAttribute("data-number")) {
                content.style.display = "block";
            }else {
                content.style.display = "none";
            }
        }
    })
}

let all = document.querySelector('.portfolio__buttons__all');

all.addEventListener('click', () => {
    const allLinks = document.querySelectorAll('.portfolio__images__links');
    for( let i = 0; i < allLinks.length; i++) {
        allLinks[i].style.display = "block";
    }
})

//mobile menu links
let menuLinks = document.querySelectorAll('.header__menu__link');

menuLinks.forEach( link => {
    link.addEventListener('click', () => {
        document.querySelector('.cross').classList.remove('cross');
        document.querySelector('.header__menu').classList.remove('fade-in');
        document.querySelector('.header__menu').classList.add('fade-out');
    })
})


//navigation changes background basdd on height
const nav = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(window.scrollY > nav.offsetHeight + 550) {
        nav.style.background = '#000';
    }else {
        nav.style.background = 'transparent';
    }
});


//modal pop up images
const modal = document.querySelector('.modal');
const previews = document.querySelectorAll('.portfolio__images__search');
const allImgs = document.querySelectorAll('.portfolio__images__links img');
const modalImg = document.querySelector('.modal__img');
const modalTxt = document.querySelector('.modal__caption');

previews.forEach( preview => {
    preview.addEventListener('click', (e) => {
        modal.classList.add('open');
        modalImg.classList.add('open');
        
        const orginalSrc = preview.getAttribute('data-original');
        modalImg.src = `img/${orginalSrc}`;
        const altText = preview.getAttribute('data-alt');
        modalTxt.textContent = altText;

    })
});

modal.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal')) {
        modal.classList.remove('open');
        modalImg.classList.remove('open');
    }
})