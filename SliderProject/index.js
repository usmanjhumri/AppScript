function error(...errs) {
  console.error("Survey Sunset:=>", ...errs);
}
function log(...msg) {
  if (devMode) {
    console.log("Survey Sunset:=>", ...msg);
  }
}

function initSwiperWithContent(slideContent = []) {
  const html = slideContent.map(slide);
  const swiperWrapper = document.querySelector(".show-slider .swiper-wrapper");
  if (swiperWrapper) {
    swiperWrapper.innerHTML = html.join("");

    const swiper = new Swiper(".swiper", {
      freeMode: true,
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  show_n_hide_slide_content(4);
}

// financialAnalysesOfAvgBill =  buildingInsight.solarPotential.financialAnalyses.find(e =>  e.monthlyBill.units >= +100);
// yearlySavings = (financialAnalysesOfAvgBill.financedPurchaseSavings.savings.savingsLifetime.units / 20);
// solarPanelConfig = buildingInsight.solarPotential.solarPanelConfigs[financialAnalysesOfAvgBill.panelConfigIndex];
// yearlyTressGrown = (0.5 * (buildingInsight.solarPotential.carbonOffsetFactorKgPerMwh * (solarPanelConfig.yearlyEnergyDckwh / 1000))) / 20;
  

function calculateMetrics({solarPotential}, avg_bill) {
  if (!res || !avg_bill) return console.error("Invalid Response or null...");
  moveSlide("next");

  const financialAnalysesOfAvgBill = solarPotential.financialAnalyses.find(
    (e) => e.monthlyBill.units >= +avg_bill
  );

  if(!financialAnalysesOfAvgBill){
    return error("")
  }

  const yearlySavings =
    financialAnalysesOfAvgBill.financedPurchaseSavings.savings.savingsLifetime
      .units / 20;
  const solarPanelConfig =
  solarPotential.solarPanelConfigs[financialAnalysesOfAvgBill.panelConfigIndex];
  const yearlyTressGrown =
    (0.5 *
      (solarPotential.carbonOffsetFactorKgPerMwh *
        (solarPanelConfig.yearlyEnergyDckwh / 1000))) /
    20;
  const { yearlyEnergyDckwh: kwMin, panelsCount: minPanels } =
    res.solarPanelConfig.find(
      (e) =>
        e.yearlyEnergyDckwh > Math.abs(solarPanelConfig.yearlyEnergyDckwh - 2)
    );
  const { yearlyEnergyDckwh: kwMax, panelsCount: maxPanels } =
    res.solarPanelConfig.find(
      (e) =>
        e.yearlyEnergyDckwh < Math.abs(solarPanelConfig.yearlyEnergyDckwh + 2)
    );

  function slide({ heading, val, desc }) {
    return `<div class="swiper-slide"><div class="mainBox"> <div class="p"> <p class="para">${heading}</p> </div> <div class="treesYear"> <h1 class="number">${val}</h1> <p>${desc}</p> </div> </div> </div>`;
  }
  const slideContent = [
    {
      heading: "Approximate Lifetime Savings",
      val: "$" + formatNumber(yearlySavings * 25),
      desc: "Over 25 years",
    },
    {
      heading: "Increase Home in Value",
      val: "4.1%",
      desc: "According to Zillow",
    },
    {
      heading: "Estimated Environmental Impact",
      val: formatNumber(yearlyTressGrown * 10),
      desc: "trees grown for ten years",
    },
    {
      heading: "Recomended System",
      val: `${kwMin / 1000} - ${kwMax / 1000} kW `,
      desc: `(${minPanels}-${maxPanels} panel)`,
    },
  ];

  initSwiperWithContent(slideContent)
    /*
  return {
    lifetimeSaving: yearlySavings * 25,
    treesGrown: yearlyTressGrown * 10,
    system: {
      kw: { min: kwMin / 1000, max: kwMax / 1000 },
      panels: { min: minPanels, max: maxPanels },
    },
  };
  */
}

function get(object, path, defaultValue) {
  if (!object) return defaultValue;
  const pathArray = Array.isArray(path) ? path : path.split(".");
  for (const key of pathArray) {
    if (object[key] === undefined) {
      return defaultValue;
    }
    object = object[key];
  }
  return object;
}
const electric_bill = getInput("electric_bill");
let devMode = false;
let isInit = false;
let lng, lat;
const GoogleMapApiKey = "AIzaSyDblCQQLZxhwuexKKcAMvlXhtXAw-KHTUc";
window.enableDevMode = () => (devMode = true);
window.disableDevMode = () => (devMode = false);
function hideCustomFields() {
  const elmToHide = ["my_electric_bill", "address", "roof_top"];
  elmToHide.forEach((sel) => {
    getInput(sel)?.closest(".form-field-container")?.classList.add("d-none");
  });
}
hideCustomFields();
function show_n_hide_slide_content(whichSlide = "all", action = "show") {
  const scope = whichSlide === "all" ? "*" : `:nth-child(${whichSlide})`;
  const slides = document.querySelectorAll(`.ghl-question-set > ${scope}`);
  const type = action === "show";
  slides.forEach((slide) => {
    const loader = slide.querySelector(".chat-loader");
    const slideContent = slide.querySelectorAll(".slide-content");
    slideContent.forEach((content) => {
      content
        .closest(".form-field-container")
        ?.classList.toggle("d-none", !type);
    });
    loader?.closest(".form-field-container")?.classList.toggle("d-none", type);
  });
}
show_n_hide_slide_content("all", "hide");
function getInput(selector) {
  let attributes = ["id", "data-q", "class"];
  let elm;
  for (const attribute of attributes) {
    elm = document.querySelector("[".concat(attribute, "='", selector) + "']");
    if (elm) {
      break;
    }
  }
  return elm;
}
function setAndDispatch(selector, value) {
  let elm = getInput(selector);
  if (elm) {
    elm.value = value;
    elm.dispatchEvent(new Event("input"));
    elm.dispatchEvent(new Event("change"));
  } else {
    log("Element not found: " + selector);
  }
}
{
  ["change", "input"].forEach((event) => {
    electric_bill?.addEventListener(event, () => {
      setAndDispatch("my_electric_bill", electric_bill.value);
    });
  });
}
function moveSlide(dir) {
  document
    .querySelector(dir !== "submit" ? ".ghl-footer-" + dir : ".ghl-submit-btn")
    ?.click();
}
function formatNumber(x) {
  const parts = (x || 0).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function calculateElevation(roofTopInMeters) {
  const roof_top_sqft = document.querySelector(".roof_top_sqft");
  const roofTop = roofTopInMeters * roofTopInMeters * 10.7639;
  roof_top_sqft.innerHTML = Math.round(roofTop).toString();
  setAndDispatch("roof_top", roofTop);
}
function dataLayerReq(lat, lng) {
  return new Promise((resolve, reject) => {
    const params = `location.latitude=${lat}&location.longitude=${lng}`;
    fetch(
      `https://solar.googleapis.com/v1/dataLayers:get?${params}&radiusMeters=100&view=FULL_LAYERS&requiredQuality=HIGH&pixelSizeMeters=0.5&key=${GoogleMapApiKey}`
    )
      .then((x) => x.json())
      .then(resolve)
      .catch(reject);
  });
}
function buildingInsightReq(lat, lng) {
  return new Promise((resolve, reject) => {
    const params = `location.latitude=${lat}&location.longitude=${lng}`;
    fetch(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}&requiredQuality=HIGH&key=${GoogleMapApiKey}`
    )
      .then((x) => x.json())
      .then(resolve)
      .catch(reject);
  });
}

window.buildingInsight = null;

function handleElevation(selectedPlace) {
  let elm_roof_top_sqft = document.querySelector(".roof_top_sqft");
  moveSlide("next");
  const location = selectedPlace.geometry?.location;
  if (location) {
    lat = location.lat();
    lng = location.lng();
    buildingInsightReq(lat, lng).then((res) => {
      log(res);
      const squareFeet = formatNumber(
        Math.round(get(res, "solarPotential.maxArrayAreaMeters2", 0) * 10.764)
      );
      if (elm_roof_top_sqft) {
        elm_roof_top_sqft.innerHTML = squareFeet;
        setAndDispatch("roof_top", squareFeet);
      }
      window.buildingInsight = res;
      show_n_hide_slide_content("2", "show");
    });
  } else {
    error("location not found.");
  }
}
function initialize() {
  isInit = true;
  let input = document.getElementsByName("address_input")[0];
  let autocomplete;
  (function pacSelectFirst(input) {
    let _addEventListener = input.addEventListener
      ? input.addEventListener
      : input.attachEvent;
    function addEventListenerWrapper(type, listener) {
      if (type == "keydown") {
        var orig_listener = listener;
        listener = function (event) {
          var suggestion_selected =
            document.querySelectorAll(".pac-item-selected").length > 0;
          if (event.which == 13 && !suggestion_selected) {
            let simulated_downarrow = new Event("keydown");
            event.keyCode = 40;
            event.which = 40;
            orig_listener.apply(input, [simulated_downarrow]);
          }
          orig_listener.apply(input, [event]);
        };
      }
      _addEventListener.apply(input, [type, listener]);
    }
    input.addEventListener = addEventListenerWrapper;
    input.attachEvent = addEventListenerWrapper;
    var autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "us" },
    });
    autocomplete.addListener("place_changed", function () {
      var selectedPlace = autocomplete.getPlace();
      setAndDispatch("address", input.value);
      handleFillFields(autocomplete);
      handleElevation(selectedPlace);
    });
  })(input);
  function handleFillFields(autocomplete) {
    let place = autocomplete.getPlace();
    setAndDispatch("city", place.name);
    try {
      setAndDispatch("cityLat", place.geometry.location.lat());
      setAndDispatch("cityLng", place.geometry.location.lng());
      postcode = "";
      address1 = "";
      for (const component of place.address_components) {
        log(component);
        const componentType = component.types[0];
        switch (componentType) {
          case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
          }
          case "route": {
            address1 += component.short_name;
            break;
          }
          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
          }
          case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
          }
          case "locality":
            try {
              setAndDispatch("city", component.long_name);
            } catch (err1) {
              console.log("locality error " + component.long_name);
            }
            break;
          case "administrative_area_level_1": {
            try {
              setAndDispatch("state", component.short_name);
            } catch (err1) {
              console.log("state error");
            }
            break;
          }
          case "country":
            try {
              setAndDispatch("country2", component.long_name);
            } catch (err1) {
              console.log("country error");
            }
            break;
        }
      }
      try {
        setAndDispatch("postal_code", postcode);
      } catch (err1) {
        log("postal code error");
      }
    } catch (err) {
      log(err);
    }
  }
}
