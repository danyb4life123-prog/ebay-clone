/* =========================
   HERO SLIDER
========================= */

const heroTrack = document.querySelector(".wrapper-holder");

const heroSlides = document.querySelectorAll(".hero-slide");

const dots = document.querySelectorAll(".dot");

const previousButton = document.getElementById("hero-prev");

const nextButton = document.getElementById("hero-next");

const pauseButton = document.getElementById("hero-pause");


let currentSlide = 0;

let isPaused = false;

let autoSlide;


/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    if (index < 0) {
        index = heroSlides.length - 1;
    }

    if (index >= heroSlides.length) {
        index = 0;
    }

    currentSlide = index;

    heroTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });
}


/* =========================
   NEXT
========================= */

function nextSlide() {

    showSlide(currentSlide + 1);

}


/* =========================
   PREVIOUS
========================= */

function previousSlide() {

    showSlide(currentSlide - 1);

}


/* =========================
   AUTO SLIDER
========================= */

function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(() => {

        if (!isPaused) {

            nextSlide();

        }

    }, 5000);

}


/* =========================
   PAUSE
========================= */

function togglePause() {

    isPaused = !isPaused;


    if (isPaused) {

        pauseButton.textContent = "▶";

    } else {

        pauseButton.textContent = "❚❚";

    }

}


/* =========================
   BUTTONS
========================= */

nextButton.addEventListener(
    "click",
    nextSlide
);


previousButton.addEventListener(
    "click",
    previousSlide
);


pauseButton.addEventListener(
    "click",
    togglePause
);


/* =========================
   DOTS
========================= */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slideNumber =
            Number(dot.dataset.slide);

        showSlide(slideNumber);

    });

});


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

    }

    if (event.key === "ArrowLeft") {

        previousSlide();

    }

});


/* START */

showSlide(0);

startAutoSlide();





/* =====================================================
   CART SYSTEM
===================================================== */

let cart =
    JSON.parse(localStorage.getItem("ebayCart")) || [];


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "ebayCart",
        JSON.stringify(cart)
    );

}


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image) {

    const existingItem =
        cart.find(item => item.name === name);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    saveCart();


    alert(name + " added to cart!");

}


/* =========================
   PRODUCT BUTTONS
========================= */

document.querySelectorAll(".product").forEach(product => {

    const button =
        product.querySelector(".add-cart");


    if (!button) return;


    button.addEventListener("click", () => {

        const name =
            product.dataset.name;


        const price =
            product.dataset.price;


        const image =
            product.querySelector("img").src;


        addToCart(
            name,
            price,
            image
        );

    });

});