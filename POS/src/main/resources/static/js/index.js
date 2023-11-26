function calcPay(e){

    console.log(e.value);
    const amount = e.value;
    const price = e.parentElement.previousElementSibling.innerText;
    
    e.parentElement.nextElementSibling.innerText = amount * price;

}