
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
}, { threshold: 0.5 });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => { observer.observe(el); })



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