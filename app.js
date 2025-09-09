let title = document.querySelector('.title');
let quote = document.querySelector('.quote');
let dice = document.querySelector('.dice');
let divider = document.querySelector('.divider');

dice.addEventListener('click', changeQuote);

// Initial load
changeQuote();

function changeQuote() {
    // 1. Show loading state
    title.textContent = "Loading...";
    quote.textContent = "Fetching new advice...";
    dice.style.cursor = 'wait';
    dice.style.opacity = '0.6';

    // 2. Fetch new advice
    fetch(`https://api.adviceslip.com/advice?_=${Date.now()}`) // 👈 Prevents caching
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            // 3. On success: show new advice
            title.textContent = "Advice #" + data.slip.id;
            quote.textContent = `"${data.slip.advice}"`; // Added quotes for style
        })
        .catch(err => {
            // 4. On error: show error message
            console.error('Fetch error:', err);
            title.textContent = "Error #0";
            quote.textContent = "Failed to load. Try again!";
        })
        .finally(() => {
            // 5. Always reset dice state (success or error)
            dice.style.cursor = 'pointer';
            dice.style.opacity = '1';
        });
}

// Divider responsive logic
function updateDivider() {
    divider.src = window.innerWidth > 1000
        ? './images/pattern-divider-desktop.svg'
        : './images/pattern-divider-mobile.svg';
}

updateDivider();
window.addEventListener('resize', updateDivider);

