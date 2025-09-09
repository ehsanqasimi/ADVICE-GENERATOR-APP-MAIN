let title = document.querySelector('.title');
let quote = document.querySelector('.quote');
let dice = document.querySelector('.dice');
let divider = document.querySelector('.divider');

// Add click event listener
dice.addEventListener('click', changeQuote);

// Initial load: fetch first quote
changeQuote();

function changeQuote() {
    // Prevent multiple rapid clicks
    dice.style.cursor = 'wait';
    dice.style.opacity = '0.7';

    fetch(`https://api.adviceslip.com/advice?_=${Date.now()}`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch advice');
            return res.json();
        })
        .then(data => {
            title.textContent = "Advice #" + data.slip.id;
            quote.textContent = data.slip.advice;

            // Reset cursor after success
            dice.style.cursor = 'pointer';
            dice.style.opacity = '1';
        })
        .catch(err => {
            console.error("Error fetching advice:", err);
            title.textContent = "Error #0";
            quote.textContent = "Oops! Something went wrong. Try again.";
            dice.style.cursor = 'pointer';
            dice.style.opacity = '1';
        });
}

// Handle responsive divider
function updateDivider() {
    if (window.innerWidth > 1000) {
        divider.src = './images/pattern-divider-desktop.svg';
    } else {
        divider.src = './images/pattern-divider-mobile.svg';
    }
}

// Run initially
updateDivider();

// Update on resize
window.addEventListener('resize', updateDivider);