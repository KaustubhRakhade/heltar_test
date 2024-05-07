const AUTO_DELAY = 4000; // time b/w auto slide change
const SCROLL_DELAY = 300; // time b/w 2 consecutive scrolls
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
        window.scrollTo(0, 1, {behavior: 'instant'});
        e.preventDefault();
        e.stopPropagation();
    }

  if (scrollActive && window.scrollY < 16) {

    scrollActive = false;
    if (e.deltaY > 0) {
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
    for (let i = currentFrame+1; i < elements.length; i++) {
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
        window.scrollTo(0, 1, {behavior: 'instant'});
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
    for (let i = currentFrame+1; i < elements.length; i++) {
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


window.addEventListener("touchmove", handleTouchMove, {passive: false});
window.addEventListener("touchstart", (e) => {
    lastTouch = e.touches[0].clientY;
});   
window.addEventListener("touchend", (e) => {
    lastTouch = -1;
});                