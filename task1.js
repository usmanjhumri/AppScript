const btn = document.getElementById("btn");

const button = document.createElement("button");
button.textContent = "Rows";
button.setAttribute("id", "colViewButton");
button.addEventListener("click", myFn);





function myFn() {
  const main = Array.from(document.getElementsByTagName("input"));

  main.forEach((ms) => {
    ms.classList.remove("us");
  });

  const inputchecked = main.filter((us) => us.checked);
  inputchecked.forEach((us) => {
    us.classList.add("us");
  });
  console.log(inputchecked);


  if(main){
    const mutationobserver = new MutationObserver((data) => {
        data.forEach((mutation) => {
          console.log(mutation);
        })
    })

    mutationobserver.observe(main, {
      childList:true,
      subtree:true
    })
  }

}

btn.appendChild(button);



function rangeSlide(value) {
  document.getElementById('rangeValue').innerHTML = value;
}

const slider = document.getElementById('electric_bill')
const inputs = document.querySelector('[id="85w5nF28HCQZ8ew51rpU"]')
if(inputs){
    inputs.style.display = "none";
}else{
    inputs.style.display = "block";

}


function dispatchValue(){
    inputs.value = slider.value
    const InputEvent = new Event("input")
    inputs.dispatchEvent(InputEvent)
    console.log(InputEvent)
    
}
slider.addEventListener("input", dispatchValue)

const elements = document.querySelectorAll('input[data-q ^= "A_"]')
console.log(elements, ' ele founds');

const divTag = document.createElement('div')
elements.forEach(e => {
  divTag.appendChild(e)
})
divTag.style.backgroundColor = "green"


// find location of URL
// let loc = "https://app.hexatechsolution.com/v2/location/Q6sATpsoSLCPFf5ErtoF/launchpad"


// let regix = /\/location\/([^/]+)/ 

// let locationmili =  loc.match(regix)

// if(locationmili){
//   let locationOk = locationmili[1]
//   console.log(locationOk, ' location Ok');
// }else{
//   console.log("location not found");
// }





