
// Scroll between the 4 frames

const AUTO_DELAY = 3600; // time b/w auto slide change
let currentFrame = 0;

let frames = ["WORKFLOWS", "MESSAGING", "ORDERS", "PAYMENTS"]

let scrollActive = true;
let pageScrollable = false;

const elements = document.querySelectorAll('#hero-images img');
const heroControl = document.querySelector('#hero-headers-controls');
const trustedByControl = document.querySelector('#trustedBy');

function goToFrame(i) {
    heroControl.style.marginTop = `${-i * 6}rem`;
    elements.forEach((el, j) => {
        if (j === i) {
            el.classList.remove('hidden')
            el.classList.add('visible')
        }
        else {
            el.classList.remove('visible')
            el.classList.add('hidden')
        }
    })

    if (i === elements.length - 1) {
        setTimeout(() => { pageScrollable = true; }, 500);
    } else {
        pageScrollable = false;
    }
}

//infinite gotoframe

function nextFrame() {
    currentFrame = (currentFrame + 1) % elements.length;
    goToFrame(currentFrame);
    setTimeout(() => { nextFrame(); }, AUTO_DELAY);
}

setTimeout(() => { nextFrame(); }, AUTO_DELAY);

let chatVisible = false;
const chatWindow = document.querySelector("#chatWindow")

function toggleChat() {
    chatVisible = !chatVisible;
    if (chatVisible) {
        chatWindow.classList.add('show');
    }
    else {
        chatWindow.classList.remove('show');
    }
}