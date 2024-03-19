//variables
const bodyGlobal = document.querySelector('body');
const backgroundOne = document.querySelector('.background-1');
const btn = document.querySelector('.submit')
const form = document.querySelector('form')

const welcome = document.querySelector('.welcome');
const titleWelcome = document.querySelector('.welcome__title');
const textPWelcome = document.querySelector('.welcome__container-2');
const textDefWelcome = document.querySelector('.welcome__container-3');
const displayWelcome = document.querySelector('.welcome__display');
const aviso = document.querySelector('.btn-submit p');
const resultIMG = document.querySelector('.resultIMG');

const result = document.querySelector('.variables');
const listImg = document.querySelector('.container-option');
let resultImg = [];


eventListeners()
function eventListeners(){
    window.addEventListener('scroll', scrollHistory);
    listImg.addEventListener('click', addImg);
    form.addEventListener('submit', concat);
}

function scrollHistory(){
    const scrollPosition = window.innerHeight / 1; //pantalla completa


    scrollBackground(bodyGlobal, scrollPosition);
    scrollWelcome(welcome, scrollPosition);

}

function scrollWelcome(name, scrollPosition){    
    const nameHeight = name.clientHeight;
    const namePosition = name.getBoundingClientRect().top;
    if(scrollPosition > namePosition){
        titleWelcome.classList.add('active')
        titleWelcome.style.setProperty('--scroll-Title', (namePosition + 180) / nameHeight );
    }
    
    if((namePosition * -1) > 1000){
        displayWelcome.style.display = "none";
    }

    else if((namePosition * -1) > 600){
        displayWelcome.style.display = "block";
        textPWelcome.style.opacity = "0";
        textDefWelcome.classList.add('active');
        textDefWelcome.style.setProperty('--scroll-text-2', (namePosition + 150) / nameHeight );
    }

    else if((namePosition * -1) > 200){
        textPWelcome.style.opacity = "1";
        textPWelcome.classList.add('active');        
        textDefWelcome.classList.remove('active');
        textPWelcome.style.setProperty('--scroll-text', (namePosition + 150) / nameHeight );   
    }
    else{
        textPWelcome.classList.remove('active');
        textDefWelcome.classList.remove('active');
    }
}


function scrollBackground(name , scrollPosition){
    const nameHeight = name.clientHeight;
    const namePosition = name.getBoundingClientRect().top;

    if(scrollPosition > namePosition){
        name.style.setProperty('--animation', namePosition / nameHeight) 
        
        backgroundOne.style.opacity = 1 - (namePosition / nameHeight) * -8;
    }
}

//Agregar img

function addImg(e){
    
    if(e.target.classList.contains('card__checked')){
        const card = e.target.parentElement;

        leerCard(card)
        disabledBTN()
    }
}

function leerCard(card){
    console.log(card);

    const inf = {
        imag: card.querySelector('img').src,
        value: card.querySelector('input').value
    }

    const exist = resultImg.some( card => card.value === inf.value )
    
    if(exist){
        resultImg = resultImg.filter( card => card.value !== inf.value )
    }else{
        resultImg = [...resultImg, inf];
        if(resultImg.length > 2){
            console.log('error');
            const errorTres = document.querySelector('.error-3');
            errorTres.classList.add('view');
            btn.disabled = true;
            btn.classList.remove('true-btn');            
            aviso.classList.remove('ready');
            aviso.textContent = "Add only 2 values";

            setTimeout(() => {
                errorTres.classList.remove('view');
            }, 3000);
        }
    }    

    console.log(resultImg);

    addImgHTML();
}

function addImgHTML(){

    cleanHTML()

    resultImg.forEach( inf => {
        const li = document.createElement('li');
        li.classList = ('listImg');
        li.innerHTML = `
            <img src="${inf.imag}">
        `

        result.appendChild(li)
    } )
}

function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild)
    }
}

function disabledBTN(){
    if(resultImg.length == 2){
        btn.disabled = false;
        btn.classList.add('true-btn');
        aviso.classList.add('ready');
    }else if (resultImg.length == 1) {
        btn.disabled = false;
        aviso.classList.remove('ready');
        btn.classList.add('true-btn');
        aviso.textContent = "Required two values";
    }    
    else{
        btn.classList.remove('true-btn');
        btn.disabled = true;
        aviso.classList.remove('ready');
    }
}


function concat(e){
    e.preventDefault();
    console.log('form');

    if(resultImg.length == 2){


        if(Number(resultImg[0].value) + Number(resultImg[1].value) > 520){
            result.style.left = "35%";
            result.style.opacity= "0"

            setInterval(imgErr, 3000);

            setInterval(errorMax, 7000);

        }else{
            result.style.left = "35%";
            result.style.opacity= "0"
    
            setInterval(success, 3000);
            setInterval(successImg, 7000);
        }

    //setInterval(resetImg, 10000)

    }else if (resultImg.length == 1) {
        const error = document.querySelector('.error-4');
        error.classList.add('view');

        setTimeout(() => {
            error.classList.remove('view');
        }, 3000);
    }    
    else{

    }

}

function success(){
    resultIMG.classList.add('resultOpacity');
}

function imgErr(){
    resultIMG.src = "recursos/img/error-total.PNG";
    resultIMG.classList.add('resultOpacity');
}

function resetImg(){
    resultIMG = []
    resultIMG.classList.remove('resultOpacity');
}

function errorMax(){
    const errorSix = document.querySelector('.error-6');
    errorSix.classList.add('view');

    setTimeout(() => {
        errorSix.classList.remove('view');
    }, 3000);
}

function successImg(){
    const success = document.querySelector('.success');
    success.classList.add('view');

    setTimeout(() => {
        success.classList.remove('view');
    }, 3000);
}