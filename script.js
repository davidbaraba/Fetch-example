let fetchUrl = 'https://yesno.wtf/api';

let imgContent = document.getElementById('img-article');
let textContent = document.getElementById('text-content');
let input = document.querySelector('input');
let frontUnswerText = document.getElementById('frontUnswer-text');
let thinking = document.getElementById('thinking');

function showThinking(){
    thinking.classList.remove('hide');
}
function hideThinking(){
    thinking.classList.add('hide');
}

input.addEventListener('click', function(){
    this.classList.remove('error-input');
})

document.getElementById('askBtn').addEventListener('click', decide);

function decide(e){
    e.preventDefault();

    let inputValue = input.value;

    frontUnswerText.textContent = `The Question : ${inputValue}`;

    input.value = '';

    if(inputValue.length === 0){
        alert('Insert Text');
        imgContent.innerHTML = '';
        textContent.innerHTML = '';
        frontUnswerText.textContent = ``;
        input.classList.add('error-input')
        return;
    }

    showThinking();

    fetch(fetchUrl, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        }
    })
    .then(async (response) => {
        let result = await response.json();

        let img = document.createElement('img');
        img.setAttribute('src', result.image);
        imgContent.appendChild(img);

        textContent.textContent = result.answer;
        hideThinking();
    })

    imgContent.innerHTML = '';
}