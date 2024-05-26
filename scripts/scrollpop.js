const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
}, { threshold: 0.3 } );

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => { observer.observe(el); })

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