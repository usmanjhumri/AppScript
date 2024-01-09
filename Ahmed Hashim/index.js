// const slider = document.getElementById('electric_bill')
// const inputs = document.querySelector('[id="85w5nF28HCQZ8ew51rpU"]')

// function dispatchValue(){
//     inputs.value = slider.value
//     const InputEvent = new Event("input")
//     inputs.dispatchEvent(InputEvent)
//     console.log(InputEvent)

// }
// slider.addEventListener("input", dispatchValue)

const slider = document.getElementById("electric_bill");
const billOutputName = document.getElementById("billOutputName");
const billRangeProgress = document.getElementById("bill_range_progress");

function updateBillOutput(input) {
  const inputValue = parseInt(input.value, 10);
  const minValue = parseInt(input.min, 10);
  const maxValue = parseInt(input.max, 10);

  const percentage = ((inputValue - minValue) / (maxValue - minValue)) * 100;

  billOutputName.textContent = `$${inputValue}`;
  billRangeProgress.style.width = `${percentage}%`;
}

slider.addEventListener("input", function () {
  updateBillOutput(this);
});

oninput =
  "window.electricBillPer = ((electric_bill.value - electric_bill.min)/(electric_bill.max - electric_bill.min))*100;billOutputName.value = electric_bill.value; bill_range_progress.style.width= electricBillPer + '%'";


// Ahmad Hashim project code hide and show inputs //
  const dataQ = [
    "spouse_first_name",
    "spouse_last_name",
    "spouse_date_of_birth",
    "spouse_ssn",
  ];
  dataQ.forEach((item) => { 
         const targetedFields = document.querySelectorAll( 
           `input[data-q="${item}"]` 
         ); 
         targetedFields.forEach((inputs) => { 
           const findClosest = inputs.closest(".form-field-container"); 
             findClosest?.classList.add("d-none"); 
         }); 
           
       });
  const maritalStatusInputs = document.querySelectorAll(
    'input[data-q="marital_status"]'
  );
  
  maritalStatusInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const value = this.value;
  
      dataQ.forEach((item) => {
        const targetedFields = document.querySelectorAll(
          `input[data-q="${item}"]`
        );
        targetedFields.forEach((inputs) => {
          const findClosest = inputs.closest(".form-field-container");
          
            findClosest.classList.add("d-none");
              if (value === "Married") {
              findClosest?.classList.remove("d-none");
              console.log("Married selected");
            }
          
            
        });
      });
    });
  });

// End Ahmad Hashim project code hide and show inputs //


// Accordion js //
const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
    let header = item.querySelector("header");
    header.addEventListener("click", () =>{
        item.classList.toggle("open");

        let description = item.querySelector(".description");
        if(item.classList.contains("open")){
            description.style.height = `${description.scrollHeight}px`; //scrollHeight property returns the height of an element including padding , but excluding borders, scrollbar or margin
            item.querySelector("i").classList.replace("fa-plus", "fa-minus");
        }else{
            description.style.height = "0px";
            item.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
        removeOpen(index); //calling the funtion and also passing the index number of the clicked header
    })
})

function removeOpen(index1){
    accordionContent.forEach((item2, index2) => {
        if(index1 != index2){
            item2.classList.remove("open");

            let des = item2.querySelector(".description");
            des.style.height = "0px";
            item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
    })
}
// End Accordion js //


// send data to the next slide of ahmad hashim project //


const dataQ = [
  "spouse_first_name",
  "spouse_last_name",
  "spouse_date_of_birth",
  "spouse_ssn",
  "spouse_gender"
];
dataQ.forEach((item) => { 
       const targetedFields = document.querySelectorAll( 
         `input[data-q="${item}"]` 
       ); 
       targetedFields.forEach((inputs) => { 
         const findClosest = inputs.closest(".form-field-container"); 
           findClosest?.classList.add("d-none"); 
       }); 
         
     });
const maritalStatusInputs = document.querySelectorAll('input[data-q="marital_status"]');

maritalStatusInputs.forEach((input) => {
  input.addEventListener("change", function () {
    const value = this.value;

    dataQ.forEach((item) => {
      const targetedFields = document.querySelectorAll(
        `input[data-q="${item}"]`
      );
      targetedFields.forEach((inputs) => {
        const findClosest = inputs.closest(".form-field-container");
        
          findClosest.classList.add("d-none");
            if (value === "Married") {
            findClosest?.classList.remove("d-none");
            
          }
        
          
      });
    });
  });
});



const spouse = {
    spouse_first_name: "spouseName",
    spouse_date_of_birth: "spouseDob",
    spouse_ssn: "spouseSSN",
}
const taxDep = {
    dependent_first_name: "dependant-one-Name",
    dependent_gender: "dependant-one-Gender",
    dependent_date_of_birth: "dependant-one-Dob",
    dependent_ssn: "dependant-one-ssn",
}

let staticKeys = {
    first_name: "fname",
    date_of_birth: "dob",
    last_name: "lname",
    gender_name: "gender",
    marital_status: "status",
    "phone-number": "phone",
    "email-address": "email",
    address: "address",
    'dependents-taxes': "s",
    city: "city",
    state: "state",
    postal_code: "zipcode",
    estimated_houshold_income: "household-Income",
    monthly_yearly: "monthly-or-Yearly",
    "carriers-interested": "plan-Option",
    income_verification: "income-Verification",
    agree_with_consent: "consent-to-Enrollment",
    agree_with_authorization: "authorization-attestation",
    "give-permision": "permission",
    "medicare-Medicaid": "insurance",
    agree_with_acknowledgement: "acknowledgement"
};

function updateDependantData(sel, obj, mapWith) {
    let status = document.querySelector(`input[data-q="${sel}"]:checked`)?.value ?? "Single";
    const childKeys = Object.keys(obj);
    if (status.toLowerCase() === mapWith) {
        childKeys.forEach((k) => {
            const f = document.querySelector(`input[data-q="${k}"]`);
            const node = document.querySelector('.' + obj[k]);
            let val = "-"
            if (f) {
                val = f.value;
            }
            node.innerHTML = val;
        })
    } else {
        childKeys.forEach((x) => setAndDispatch(x, ''));
    }
    let d = document.querySelector(`[data-q="${staticKeys[sel]}"]`);
    if (d) d.innerHTML = status;
}

function showDataOnSlide() {
    try {
        updateDependantData("dependents-taxes", taxDep, 'yes');
        updateDependantData("marital_status", spouse, 'married');

        Object.keys(staticKeys).forEach(x => {
            let input = document.querySelector(`input[data-q="${x}"]:checked`);
            input ||= document.querySelector(`input[data-q="${x}"]`);
            let node = document.querySelector('.' + staticKeys[x]);
            if (node) {
                node.innerHTML = input.value ?? '-';
            }
        });

    } catch (e) {
        console.error(e);
    }
}

     
const DependentsTaxes = document.querySelectorAll(
  'input[data-q="dependents-taxes"]'
);

DependentsTaxes.forEach((input) => {
  input.addEventListener("change", function () {
    const value = this.value;

       const targetedFields = document.querySelectorAll(`.form-input, .form-select`); 
       targetedFields.forEach((inputs) => { 
         const findClosestofTexas = inputs.closest(".form-field-container"); 
           findClosestofTexas?.classList.add("d-none"); 
       });
      targetedFields.forEach((inputs) => {
        const findClosestofTexas = inputs.closest(".form-field-container");
        
          findClosestofTexas.classList.add("d-none");
            if (value === "Yes") {
            findClosestofTexas?.classList.remove("d-none");
            
          }
        
          
      });
      
   
  });
});

