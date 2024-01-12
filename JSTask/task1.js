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

  if (main) {
    const mutationobserver = new MutationObserver((data) => {
      data.forEach((mutation) => {
        console.log(mutation);
      });
    });

    mutationobserver.observe(main, {
      childList: true,
      subtree: true,
    });
  }
}

btn.appendChild(button);

// function rangeSlide(value) {
//   document.getElementById('rangeValue').innerHTML = value;
// }

// const slider = document.getElementById('electric_bill')
// const inputs = document.querySelector('[id="85w5nF28HCQZ8ew51rpU"]')
// if(inputs){
//     inputs.style.display = "none";
// }else{
//     inputs.style.display = "block";

// }

// function dispatchValue(){
//     inputs.value = slider.value
//     const InputEvent = new Event("input")
//     inputs.dispatchEvent(InputEvent)
//     console.log(InputEvent)

// }
// slider.addEventListener("input", dispatchValue)

// const elements = document.querySelectorAll('input[data-q ^= "A_"]')
// console.log(elements, ' ele founds');

// const divTag = document.createElement('div')
// elements.forEach(e => {
//   divTag.appendChild(e)
// })
// divTag.style.backgroundColor = "green"

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

// doing same width of boxes //

function waitElement(selector) {
  return new Promise((resolve, reject) => {
    let elm = document.querySelector(selector);
    if (elm) {
      resolve(elm);
    } else {
      new MutationObserver((obs, mutation) => {
        elm = document.querySelector(selector);
        if (elm) {
          mutation.disconnect();
          resolve(elm);
        }
      }).observe(document, { subtree: true, childList: true });
    }
  });
}

window.addEventListener("routeChangeEvent", () => {
  if (location.href.includes("dashboard")) {
    waitElement(".grid-stack .dashboard-widget-module-custom").then(() => {
      const gridStack = document.querySelector(".grid-stack ");
      const gridstack = gridStack.gridstack;
      const elms = Array.from(gridstack.getGridItems());
      const filtered = elms
        .filter((x) => x.getAttribute("gs-y") == 0)
        .reverse();
      filtered.forEach((stack, ind) => {
        stack.setAttribute("gs-w", 4);
        stack.setAttribute("gs-x", 4 * ind);
      });
    });
  }
});

// change bg color of header on scroll //

// const locationDashboard = document.querySelector("#location-dashboard");
// locationDashboard.addEventListener("scroll", () => {
//   const head = document.querySelector(".hl_header");
//   head.classList.toggle("sticky-nav", locationDashboard.scrollTop > 80);
// });

// this is second navbar change the color when i scroll //
const locationDash = document.querySelector("#location-dashboard");
locationDash.addEventListener("scroll", () => {
  const stickyHeader = document.querySelector(".sticky");
  stickyHeader.classList.toggle("stickyNav", locationDash.scrollTop > 90);
});

//    End this code     //
