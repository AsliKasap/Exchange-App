function createCurrencyElements(elements, root, inputName){
    for(let i =0; i< elements.length; i++){
      const currencyKeyDiv   = document.createElement("div");
      const currencyKeyInput = document.createElement("input");
      currencyKeyInput.setAttribute("type", "radio");
      currencyKeyInput.setAttribute("name", inputName);
      currencyKeyInput.setAttribute("id", inputName + elements[i]);
      currencyKeyInput.setAttribute("value", elements[i]);
      const currencyKeyLabel = document.createElement("label");
      currencyKeyLabel.setAttribute("for", inputName + elements[i]);
      currencyKeyLabel.textContent = elements[i];
      currencyKeyDiv.appendChild(currencyKeyInput);
      currencyKeyDiv.appendChild(currencyKeyLabel);
      root.appendChild(currencyKeyDiv);
    }
  }
  
//from
  const parentEl = document.querySelector("#currency-box-from");
  const fromInputName = "currency_from";
  // to
  const parentToEl = document.querySelector("#currency-box-to");
  const toInputName = "currency_to";
  const calculateButton = document.querySelector("#calculate-button");
  //Tıklandığında
  calculateButton.addEventListener("click", function(){
  const getBaseData = async function(fromTarget){
      const response= await fetch(`https://api.exchangeratesapi.io/latest?base=${fromTarget}`);
      const responseJson=await response.json();
      return responseJson.rates;
  }
     // kimden ceviriyourz
     const fromTarget = document.querySelector("input[name='currency_from']:checked").value;
     // kime ceviriyoruz
     const toTarget   = document.querySelector("input[name='currency_to']:checked").value;
     // amountu alalim
     const amount     = document.querySelector("input[name='amount']").value;
     
     const fromTarget1 = document.querySelector("input[name='currency_from']:checked");
     // kime ceviriyoruz
     const toTarget1   = document.querySelector("input[name='currency_to']:checked");

getBaseData(fromTarget,toTarget,amount).then((rates)=>{
 
  const resultForOne=rates[toTarget];
    //const currentCurrencyObject = data[fromTarget];
    //const resultForOne = currentCurrencyObject[toTarget];
    const result = amount * resultForOne;
    const currencyResult = document.querySelector("#currency-result");
   currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;
   if(fromTarget==toTarget){
    currencyResult.innerHTML = "Farklı bir seçim yapınız";
   }
   if(isNaN(amount)){
    currencyResult.innerHTML = "Sayı girmelisiniz.";

   } 
  
});
    
  
  });
  async function getData(){
      const response = await fetch( "https://api.exchangeratesapi.io/latest?base=USD");
      const responseJson= await response.json();
      const allCurrencies=Object.keys(responseJson.rates);
      console.log(allCurrencies);
   // asenkron işlem içerde biteceğinden çağırmaları içerde yaptık
      createCurrencyElements(allCurrencies, parentEl, fromInputName);
    createCurrencyElements(allCurrencies, parentToEl, toInputName);

}
  getData();
  
