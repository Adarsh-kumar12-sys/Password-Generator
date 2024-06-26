const inputSlider= document.querySelector("[data-lengthSlider]");

const lengthDisplay= document.querySelector("[data-lengthNumber]");//data-lengthNumber is nothing but attribute
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

const symbols= '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;

let checkCount=0;

setIndicator("#ccc");

handleSlider();
// let randomInt= generateSymbol();
// console.log(randomInt);
// this function sets password length
function handleSlider(){

        inputSlider.value=passwordLength;
        lengthDisplay.innerText= passwordLength;

        //handle slider color change on moving
        const min= inputSlider.min;
        const max= inputSlider.max;
        inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)) +"%100%"
}

function setIndicator(color){

    indicator.style.backgroundColor= color;
    //shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRandomInt(min,max){

   return Math.floor(Math.random()*(max-min))+min;

}
function generateRandomNumber(){


    return getRandomInt(0,9);
}

function generateLowerCase(){

    return String.fromCharCode(getRandomInt(97,123));
}
function generateUpperCase(){

    return String.fromCharCode(getRandomInt(65,91));
}
function generateSymbol(){

    const randNum= getRandomInt(0,symbols.length);
    return symbols.charAt(randNum);

}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMsg.innerText="copied";

    }
    catch(e){
        copyMsg.innerText("failed");

    }
    // to make copy wala span visible using css
    copyMsg.classList.add("active");

    setTimeout(()=>{
 
        copyMsg.classList.remove("active");
    },2000);

}

 inputSlider.addEventListener('input',(e)=>{

    console.log(e);
    passwordLength=e.target.value;
    console.log('Length is : '+passwordLength);
    handleSlider();
 })

 copyBtn.addEventListener('click',()=>{

    if(passwordDisplay.value){
        copyContent();
    }
 })

 function handleCheckBoxChange(){

    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){

            checkCount++;

        }
    });
    if(passwordLength<checkCount){

        passwordLength=checkCount;
        handleSlider();
    }
 }

 allCheckBox.forEach((checkbox)=>{

    checkbox.addEventListener('change',handleCheckBoxChange);
 });
 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

 generateBtn.addEventListener('click',()=>{

    //none of the checkbox are selected
    if(checkCount==0) return ;

    if(passwordLength<checkCount){

        passwordLength=checkCount;
        handleSlider();

    }

    //now creating a new password

    //remove old password

    password="";

    //now putting the password according to checkbox ticked
    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();

    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();

    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    //other easy way

    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);

    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);

    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    //compulsary addition ->now putting the password according to checkbox ticked
    for(let i=0; i<funcArr.length; i++){

        password+=funcArr[i]();
    }
    // remaining addition]

    for(let i=0; i<passwordLength-funcArr.length; i++){

        let randomIndex= getRandomInt(0,funcArr.length);

        password+=funcArr[randomIndex]();
    }

    //shuffle password
    password= shufflePassword(Array.from(password));

    //update on ui
    
    passwordDisplay.value=password;
    console.log("addition on UI is done");
    //calculation of strength

    calcStrength();


 });