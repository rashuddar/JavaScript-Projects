// chrome search--> exchange rates api--> https://www.exchangerate-api.com/
let api = `https://v6.exchangerate-api.com/v6/565d5f9562a720a2a59d632a/latest/USD`;
const fromDropDown = document.getElementById("from_currency_select");
const toDropDown = document.getElementById("to_currency_select");

//Create dropdown from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});


//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

// setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency =() =>{
    //create references
    const amount = document.querySelector('#amount').value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    // if amount input field is not empty
    if(amount.length !=0){
        // alert("Okay");
        fetch(api)
            .then(resp=> resp.json())
            .then(data => {
                // console.log(data)
                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount/fromExchangeRate)*toExchangeRate;
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
            });
    }else{
        alert("Please fill in the amount");
    }
};

document
    .querySelector('#convert-button')
    .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
