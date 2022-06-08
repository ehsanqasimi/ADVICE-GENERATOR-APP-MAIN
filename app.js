let title = document.querySelector('.title');
let quote = document.querySelector('.quote');
let dice = document.querySelector('.dice');
let divider = document.querySelector('.divider');

dice.addEventListener('click', changeQuote)
changeQuote()
function changeQuote(){
    fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .then(data => {
        title.innerHTML = "Advice #" + data.slip.id
        quote.innerHTML = data.slip.advice
    })
}

window.addEventListener('resize' , ()=>{
    if(window.innerWidth > 1000){
        divider.src = "images/pattern-divider-desktop.svg"
    }
    else{
        divider.src = './images/pattern-divider-mobile.svg'
    }
})