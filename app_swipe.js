// Scroll between the 4 frames

const AUTO_DELAY = 4000; // time b/w auto slide change
const SCROLL_DELAY = 400; // time b/w 2 consecutive scrolls
let currentFrame = 0;

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

var timeouts = []

for (let i = 0; i < elements.length; i++) {
    let t1 = setTimeout(() => {
        console.log(i);
        goToFrame(i);
    }, i * AUTO_DELAY);
    timeouts.push(t1);
}



function handleWheel(e) {


    if (!pageScrollable && window.scrollY < 16) {
        window.scrollTo(0, 1, { behavior: 'instant' });
        e.preventDefault();
        e.stopPropagation();
    }

    if (Math.abs(e.deltaY) < 30) { return }

    if (scrollActive && window.scrollY < 16) {

        scrollActive = false;
        // swipeActive = false;
        if (e.deltaY > 0) {
            currentFrame = Math.min(currentFrame + 1, elements.length - 1);
        }
        else {
            currentFrame = Math.max(currentFrame - 1, 0);
        }
        setTimeout(() => { scrollActive = true; }, SCROLL_DELAY);

        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];
        for (let i = currentFrame + 1; i < elements.length; i++) {
            let t1 = setTimeout(() => {
                console.log(i);
                goToFrame(i);
            }, 100 + (i - currentFrame) * AUTO_DELAY);
            timeouts.push(t1);
        }
        goToFrame(currentFrame);

    }
}


let lastTouch = -1;
function handleTouchMove(e) {
    if (!pageScrollable && window.scrollY < 16) {
        window.scrollTo(0, 1, { behavior: 'instant' });
        e.preventDefault();
        e.stopPropagation();
    }

    if (lastTouch === -1) {
        lastTouch = e.touches[0].clientY;
        return;
    }

    if (scrollActive && window.scrollY < 16) {

        scrollActive = false;
        if (e.touches[0].clientY < lastTouch) {
            currentFrame = Math.min(currentFrame + 1, elements.length - 1);
        }
        else {
            currentFrame = Math.max(currentFrame - 1, 0);
        }
        setTimeout(() => {
            scrollActive = true;
        }, SCROLL_DELAY);
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];
        for (let i = currentFrame + 1; i < elements.length; i++) {
            let t1 = setTimeout(() => {
                console.log(i);
                goToFrame(i);
            }, 100 + (i - currentFrame) * AUTO_DELAY);
            timeouts.push(t1);
        }
        goToFrame(currentFrame);

    }

    lastTouch = e.touches[0].clientY;
}


hero.addEventListener("wheel", handleWheel);
trustedByControl.addEventListener("wheel", (e) => {
    if (window.innerWidth > 800) handleWheel(e)
});


window.addEventListener("touchmove", handleTouchMove, { passive: false });
window.addEventListener("touchstart", (e) => {
    lastTouch = e.touches[0].clientY;
});
window.addEventListener("touchend", (e) => {
    lastTouch = -1;
});




// scrolling and text animates below it

const message = "MARKETING IS A KEY TO YOUR BUSINESS"
const messageContainer = document.querySelector('#message-container');
const stickyContent = document.querySelector('#stickyContent');
const tryNowBtn = document.querySelector('#tryNowBtn');
const scrollingText = document.querySelector('#scrollingText');

for (let i = 0; i < message.length; i++) {
    let span = document.createElement('span');
    span.innerText = message[i];
    messageContainer.appendChild(span);
}

window.addEventListener("scroll", () => {
    // top of the message container
    let top = scrollingText.getBoundingClientRect().top;
    let vh = window.innerHeight;

    if (top > vh / 2) {

    }

    if (top < (3 / 4) * vh) {

        // let progress = Math.min(1, (vh - top) / vh);
        let progress = Math.min(1, ((3 / 4) * vh - top) / ((3 / 4) * vh));
        stickyContent.style.opacity = progress;
        stickyContent.style.transform = `scale(${0.9 + 0.1 * progress})`;
        stickyContent.style.filter = `blur(${16 * (1 - progress)}px)`;
        tryNowBtn.classList.remove('active');
    }
    if (top < 0) {
        let progress = Math.min(1.05, -top / (1.8 * vh));
        for (let i = 0; i < messageContainer.children.length; i++) {
            if (i + 1 < progress * message.length) {
                messageContainer.children[i].style.color = '#34A9FF';
            }
            else {
                messageContainer.children[i].style.color = '#CCCCCC';
            }
        }

        if (progress > 1) {
            tryNowBtn.classList.add('active');
        }
        else {
            tryNowBtn.classList.remove('active');
        }
    }
})


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
}, { threshold: 0.5 });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => { observer.observe(el); })

