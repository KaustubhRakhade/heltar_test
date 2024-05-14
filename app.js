
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

/* 
    <div id="reviews">
        <h2>What our customers say</h2>
        <span>"Thank you for your trust in Crypt Land! We are grateful for your feedback and are committed to providing the best [products/services offered]. Read what our clients have to say about their experience with us.</span>

        <div id="reviewList">

                <div class="reviewListItem" id="review1">
                    <img src="" alt="review1">
                    <span>Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn`t used, which have also proved to be easy to use and reliable.</span>
                    <h4>John Doe</h4>
                    <div class="rating" style="width: 4.5rem;"></div>
                </div>

                <div class="reviewListItem" id="review2">
                    <img src="" alt="review1">
                    <span>Track connections in real time. See who your community being lead by and find the most active.</span>
                    <h4>John Doe</h4>
                    <div class="rating" style="width: 4.5rem;"></div>
                </div>

                <div class="reviewListItem" id="review3">
                    <img src="" alt="review1">
                    <span>Track connections in real time. See who your community being lead by and find the most active.</span>
                    <h4>John Doe</h4>
                    <div class="rating" style="width: 4.5rem;"></div>
                </div>

                <div class="reviewListItem" id="review4">
                    <img src="" alt="review1">
                    <span>Track connections in real time. See who your community being lead by and find the most active.</span>
                    <h4>John Doe</h4>
                    <div class="rating" style="width: 4.5rem;"></div>
                </div>

                <div class="reviewListItem" id="review5">
                    <img src="" alt="review1">
                    <span>Track connections in real time. See who your community being lead by and find the most active.</span>
                    <h4>John Doe</h4>
                    <div class="rating" style="width: 4.5rem;"></div>
                </div>

                <div class="reviewListItem" id="review6">
                    <img src="" alt="review1">
                    <span>Track connections in real time. See who your community being lead by and find the most active.</span>
                    <h4>John Doe</h4>
                    <div class="rating" style="width: 4.5rem;"></div>
                </div>   
        </div>

        <div id="reviewpages">
            <div id="r1"></div>
            <div id="r2"></div>
            <div id="r3"></div>
            <div id="r4"></div>
            <div id="r5"></div>
            <div id="r6"></div>
        </div>
    </div>

*/

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
