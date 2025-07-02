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

var submit = document.getElementById("submit");
submit.addEventListener("click", function(e){
    e.preventDefault();
    var params = {

        from_name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_puwcrp8","template_1yrho9l",params).then
    (function(response) {
        console.log("SUCCESS!", response.status);
        alert("Your message has been sent!");
    })
       
})

// Typing Animation for Terminal Lines
function initializeTypingAnimations() {
    const typingLines = document.querySelectorAll('.typing-line');
    
    typingLines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || (index * 500);
        
        // Set CSS custom property for animation delay
        line.style.setProperty('--delay', delay);
        
        // Optional: Add a typewriter effect for text content
        setTimeout(() => {
            line.classList.add('typed');
        }, delay);
    });
}

// Project Image Loading Handler
function initializeProjectImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('.project-image img');
        
        if (img) {
            // Set initial state
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
            img.style.filter = 'brightness(0.6) blur(2px)';
            
            const revealImage = () => {
                img.style.transition = 'all 0.8s ease-out';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(0.85) contrast(1.1)';
            };
            
            // Staggered image reveal
            if (img.complete && img.naturalHeight !== 0) {
                setTimeout(revealImage, 200 + (index * 150));
            } else {
                img.onload = () => setTimeout(revealImage, 200 + (index * 150));
                img.onerror = () => {
                    console.warn(`Failed to load image: ${img.src}`);
                    img.style.opacity = '0.5';
                    img.style.filter = 'grayscale(1)';
                };
            }
        }
    });
}

// Initialize project images when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTypingAnimations();
    initializeProjectImages();
    
    // Re-run typing animations every 10 seconds for continuous effect
    setInterval(() => {
        const typingLines = document.querySelectorAll('.typing-line');
        typingLines.forEach(line => {
            line.style.animation = 'none';
            line.offsetHeight; // Trigger reflow
            line.style.animation = null;
        });
    }, 10000);
});
