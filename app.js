const delay = 4000; //milliseconds
let currentFrame = 0;

const elements = document.querySelectorAll('#hero-images img');
const heroControl = document.querySelector('#hero-headers-controls');
console.log(heroControl);


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
        setTimeout(() => { pageScrollable = true; }, 1000);
    } else {
        pageScrollable = false;
    }
}

var timeouts = []

for (let i = 0; i < elements.length; i++) {
  let t1 = setTimeout(() => {
    console.log(i);
    goToFrame(i);
  }, i * delay);
    timeouts.push(t1);
}

let scrollActive = true;
let pageScrollable = false;

let lastScroll = 0;
function handleWheel(e) {
    // if (window.scrollY === 0) { window.scrollTo(0, 1);}
    // let direction = window.scrollY > lastScroll ? 1 : -1;
    // lastScroll = window.scrollY;


    if (!pageScrollable) {
        window.scrollTo(0, 1, {behavior: 'instant'});
        e.preventDefault();
        e.stopPropagation();
    }

  if (scrollActive) {

    scrollActive = false;
    if (e.deltaY > 0) {
        currentFrame = Math.min(currentFrame + 1, elements.length - 1);
    }
    else {
        currentFrame = Math.max(currentFrame - 1, 0);
    }
    setTimeout(() => {
        scrollActive = true;
    }, 1000);
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];
    for (let i = currentFrame+1; i < elements.length; i++) {
        let t1 = setTimeout(() => {
            console.log(i);
            goToFrame(i);
        }, 1000 + (i - currentFrame) * delay);
        timeouts.push(t1);
    }
    goToFrame(currentFrame);
      
  }
}


let lastTouch = -1;
function handleTouchMove(e) {
    if (!pageScrollable) {
        window.scrollTo(0, 1, {behavior: 'instant'});
        e.preventDefault();
        e.stopPropagation();
    }

    if (lastTouch === -1) {
        lastTouch = e.touches[0].clientY;
        return;
    }

  if (scrollActive && window.scrollY < 2) {

    scrollActive = false;
    if (e.touches[0].clientY < lastTouch) {
        currentFrame = Math.min(currentFrame + 1, elements.length - 1);
    }
    else {
        currentFrame = Math.max(currentFrame - 1, 0);
    }
    setTimeout(() => {
        scrollActive = true;
    }, 1000);
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];
    for (let i = currentFrame+1; i < elements.length; i++) {
        let t1 = setTimeout(() => {
            console.log(i);
            goToFrame(i);
        }, 1000 + (i - currentFrame) * delay);
        timeouts.push(t1);
    }
    goToFrame(currentFrame);
      
  }

    lastTouch = e.touches[0].clientY;
}


hero.addEventListener("wheel", handleWheel);
window.addEventListener("touchmove", handleTouchMove, {passive: false});
window.addEventListener("touchstart", (e) => {
    lastTouch = e.touches[0].clientY;
});   
window.addEventListener("touchend", (e) => {
    lastTouch = -1;
});                