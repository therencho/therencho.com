(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

// Terminal typing animation — plays once on load, no repeat
function initializeTypingAnimations() {
    const typingLines = document.querySelectorAll('.typing-line');
    typingLines.forEach((line) => {
        const delay = parseInt(line.dataset.delay) || 0;
        line.style.setProperty('--delay', delay);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTypingAnimations();
});
