
// Scroll between the 4 frames

const AUTO_DELAY = 5000; // time b/w auto slide change
let currentFrame = 0;

let frames = ["MESSAGES", "ORDERS", "PAYMENTS", "WORKFLOWS"]

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

let promiseInterval;
let currP = 0;
function setPromise(n) {

    // claer the interval

    clearInterval(promiseInterval);

    promiseInterval = setInterval(() => {

        setPromise((currP + 1) % 3);

    }, 5000);


    let ps = document.querySelectorAll('.promiseSliderItem');
    let pg = document.querySelectorAll('#pageControls div');

    if (currP === n) return;


    let dir = -1;
    if ((n - currP + 3) % 3 == 1) dir = 1;

    currP = n;

    for (let i = 0; i < 3; i++) {

        if (i === n) {
            pg[i].classList.add('active');
        }
        else {
            pg[i].classList.remove('active');
        }
    }


    card1 = document.querySelectorAll('.card1')[0];
    card2 = document.querySelectorAll('.card2')[0];
    card3 = document.querySelectorAll('.card3')[0];


    if (dir === -1) {
        card1.style.animation = 'card12 0.5s forwards';
        card1.classList.remove("card1");
        card1.classList.add("card2");

        card2.style.animation = 'card23 0.5s forwards';
        card2.classList.remove("card2");
        card2.classList.add("card3");

        card3.style.animation = 'card31 0.5s forwards';
        card3.classList.remove("card3");
        card3.classList.add("card1");

    } else {

        card1.style.animation = 'card13 0.5s forwards';
        card1.classList.remove("card1");
        card1.classList.add("card3");

        card2.style.animation = 'card21 0.5s forwards';
        card2.classList.remove("card2");
        card2.classList.add("card1");

        card3.style.animation = 'card32 0.5s forwards';
        card3.classList.remove("card3");
        card3.classList.add("card2");

    }

}




promiseInterval = setInterval(() => {
    setPromise((currP + 1) % 3);
}, 5000);


let currF = 1;
function setFeature(i) {
    i = Math.max(1, Math.min(6, i))
    console.log(i);
    currF = i;

    let btns = document.querySelectorAll('#featureDrawer input');

    btns.forEach((btn, j) => {
        if (j + 1 === i) { btn.classList.add('active'); }
        else { btn.classList.remove('active'); }
    })

    let features = document.querySelectorAll('#featureWindow .featureWindowItem');

    features.forEach((feature, j) => {
        if (j + 1 === i) { feature.classList.add('active'); }
        else { feature.classList.remove('active'); }
    })

    if (i === 1) { document.querySelector('#prevBtn').classList.add('disabled'); }
    else { document.querySelector('#prevBtn').classList.remove('disabled'); }

    if (i === 6) { document.querySelector('#nextBtn').classList.add('disabled'); }
    else { document.querySelector('#nextBtn').classList.remove('disabled'); }


    // scroll the button to middle
    let drawer = document.querySelector('#featureDrawer');
    let btn = btns[i - 1];
    let drawerWidth = drawer.clientWidth;
    let btnWidth = btn.clientWidth;
    let btnOffset = btn.offsetLeft - drawer.offsetLeft;
    let btnMiddle = btnOffset - drawerWidth / 2 + btnWidth / 2;
    drawer.scrollTo({ left: btnMiddle, behavior: 'smooth' });

}