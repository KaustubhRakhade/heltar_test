
// Scroll between the 4 frames

const AUTO_DELAY = 4000; // time b/w auto slide change
let currentFrame = 0;

let frames = ["WORKFLOW", "MESSAGING", "ORDERS", "PAYMENTS"]

let scrollActive = true;
let pageScrollable = false;

const elements = document.querySelectorAll('#hero-images img');
const typingText = document.querySelector('#typingText');
const trustedByControl = document.querySelector('#trustedBy');

function goToFrame(i) {
    // typing text effect
    let text = frames[i];
    let textElement = typingText;
    let textIndex = 0;

    let wait = typingText.innerText.length * 50;

    let clearingInterval = setInterval(() => {
        if (typingText.innerText.length > 0) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        } else {
            clearInterval(clearingInterval);
        }
    }, 40);

        setTimeout(() => {

        let textInterval = setInterval(() => {
            if (textIndex < text.length) {
                // use slice
                textElement.innerHTML = text.slice(0, textIndex + 1);
                textIndex++;
            } else {
                clearInterval(textInterval);
            }
        }, 80);
    }, wait)


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

// scroll between reviews

let currentReview = 1; 

for (let i = 1; i <= 6; i++) {
    document.querySelector(`#r${i}`).addEventListener('click', () => {
        goToReview(i);
    })
}

let reviewInterval = setInterval(() => {
    if (currentReview < 6) {
        goToReview(currentReview + 1);
    } else {
        goToReview(1);
    }
}, 5000);

function goToReview(i) {
    document.querySelector('#reviewList').scrollTo({ left: (i - 1) * window.innerWidth, behavior: 'smooth' });
    for (let j = 1; j <= 6; j++) {
        if (j === i) { document.querySelector(`#r${j}`).classList.add('active'); }
        else { document.querySelector(`#r${j}`).classList.remove('active'); }
    }
}

function getCurrentReview() {
    currentReview = Math.round(document.querySelector('#reviewList').scrollLeft / window.innerWidth) + 1;
    for (let j = 1; j <= 6; j++) {
        if (j === currentReview) { document.querySelector(`#r${j}`).classList.add('active'); }
        else { document.querySelector(`#r${j}`).classList.remove('active'); }
    }
}
document.querySelector('#reviewList').addEventListener('scroll', () => {
    clearInterval(reviewInterval);
    reviewInterval = setInterval(() => {
        if (currentReview < 6) {
            goToReview(currentReview + 1);
        } else {
            goToReview(1);
        }
    }, 5000);
    getCurrentReview();
})
