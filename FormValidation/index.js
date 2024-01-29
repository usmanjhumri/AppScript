const showErrorMasg = (selector, errorMasg) => {
  document.getElementById(selector).innerHTML = errorMasg;
};

const handelSubmitBtn = (e) => {
  e.preventDefault();
  console.log("working");
  let first_name = document.contactForm.first_name.value;
  let last_name = document.contactForm.last_name.value;
  let email = document.contactForm.email.value;
  let phone_number = document.contactForm.phone_number.value;
  let password = document.contactForm.password.value;
  let confirm_password = document.contactForm.confirm_password.value;

  let emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/g;

  let namrRegex = /^[a-zA-Z\s]+$/;

  let phoneRegex = /^\+?[0-9\s()-]{6,20}$/gm;

  if (first_name == "") {
    showErrorMasg("first_name", "Please enter your first name");
  } else {
    if (namrRegex.test(first_name) === false) {
      showErrorMasg("first_name", "Please enter a valid name");
    } else {
      showErrorMasg("first_name", "");
    }
  }
  if (last_name == "") {
    showErrorMasg("last_name", "Please enter your last name");
  } else {
    if (namrRegex.test(last_name) === false) {
      showErrorMasg("last_name", "Please enter a valid name");
    } else {
      showErrorMasg("last_name", "");
    }
  }

  if (email == "") {
    showErrorMasg("email", "Please Enter your email");
  } else {
    if (emailRegex.test(email) === false) {
      showErrorMasg("email", "Please Enter your valid email");
    } else {
      showErrorMasg("email", "");
    }
  }

  if (phone_number == "") {
    showErrorMasg("phone_number", "Enter your phone number");
  } else {
    if (phoneRegex.test(phone_number) === false) {
      showErrorMasg("phone_number", "Enter a valid phone number");
    } else {
      showErrorMasg("phone_number", "");
    }
  }

  if (password === "") {
    showErrorMasg("password", "Please enter your password");
  } else {
    if (passwordRegex.test(password) === false) {
      showErrorMasg(
        "password",
        "password must at least one lowercase letter one uppercase one digit one special character"
      );
    }
  }

  if (confirm_password == "") {
    showErrorMasg("confirm_password", "Please enter your confirm password");
  } else {
    if (password != confirm_password) {
      showErrorMasg("confirm_password", "password not matched");
    } else {
      showErrorMasg("confirm_password", "");
    }
  }
};
