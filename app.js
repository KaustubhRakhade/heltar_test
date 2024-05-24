
// Scroll between the 4 frames

const AUTO_DELAY = 5000; // time b/w auto slide change
let currentFrame = 0;

let frames = ["MESSAGES","ORDERS","PAYMENTS","WORKFLOWS"]

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
    }, 30);

        setTimeout(() => {

        let textInterval = setInterval(() => {
            if (textIndex < text.length) {
                // use slice
                textElement.innerHTML = text.slice(0, textIndex + 1);
                textIndex++;
            } else {
                clearInterval(textInterval);
            }
        }, 70);
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

// let currentReview = 1; 

// for (let i = 1; i <= 6; i++) {
//     document.querySelector(`#r${i}`).addEventListener('click', () => {
//         goToReview(i);
//     })
// }

// let reviewInterval = setInterval(() => {
//     if (currentReview < 6) {
//         goToReview(currentReview + 1);
//     } else {
//         goToReview(1);
//     }
// }, 5000);

// function goToReview(i) {
//     document.querySelector('#reviewList').scrollTo({ left: (i - 1) * window.innerWidth, behavior: 'smooth' });
//     for (let j = 1; j <= 6; j++) {
//         if (j === i) { document.querySelector(`#r${j}`).classList.add('active'); }
//         else { document.querySelector(`#r${j}`).classList.remove('active'); }
//     }
// }

// function getCurrentReview() {
//     currentReview = Math.round(document.querySelector('#reviewList').scrollLeft / window.innerWidth) + 1;
//     for (let j = 1; j <= 6; j++) {
//         if (j === currentReview) { document.querySelector(`#r${j}`).classList.add('active'); }
//         else { document.querySelector(`#r${j}`).classList.remove('active'); }
//     }
// }
// document.querySelector('#reviewList').addEventListener('scroll', () => {
//     clearInterval(reviewInterval);
//     reviewInterval = setInterval(() => {
//         if (currentReview < 6) {
//             goToReview(currentReview + 1);
//         } else {
//             goToReview(1);
//         }
//     }, 5000);
//     getCurrentReview();
// })



function setFeature(i) {
    let btns = document.querySelectorAll('#featureDrawer input');

    btns.forEach((btn, j) => {
        if (j+1 === i) { btn.classList.add('active'); }
        else { btn.classList.remove('active'); }
    })

    let features = document.querySelectorAll('#featureWindow .featureWindowItem');

    features.forEach((feature, j) => {
        if (j+1 === i) { feature.classList.add('active'); }
        else { feature.classList.remove('active'); }
    })


    // scroll the button to middle
    let drawer = document.querySelector('#featureDrawer');
    let btn = btns[i-1];
    let drawerWidth = drawer.clientWidth;
    let drawerScroll = drawer.scrollLeft;
    let btnWidth = btn.clientWidth;
    let btnOffset = btn.offsetLeft;
    let btnMiddle = btnOffset - drawerWidth/2 + btnWidth/2;
    drawer.scrollTo({left: btnMiddle, behavior: 'smooth'});
    
}




let blacksections = document.querySelectorAll('.blackBG');

// if a blacksection is in top 80px of the screen, make the navbar black
function checkBlackSections() {
    let isBlack = false;
    blacksections.forEach((section) => {
        let rect = section.getBoundingClientRect();
        if (rect.top < 80 && rect.bottom > 0) {
            isBlack = true;
        }
    })

    if (isBlack) {
        document.querySelector('#navbar-container').classList.add('black');
    } else {
        document.querySelector('#navbar-container').classList.remove('black');
    }
}

document.addEventListener('scroll', () => {
    checkBlackSections();
})