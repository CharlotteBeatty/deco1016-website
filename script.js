    const button = document.getElementById('go');
    button.addEventListener("click", (ev) => {
      const textField = document.getElementById("name");
      console.log(textField.value);
      localStorage.setItem('name', textField.value);
    });

  var constraints = {
    name: {
      // You need to pick a username too
      presence: true,
      // And it must be between 3 and 20 characters long
      length: {
        minimum: 3,
      },
      format: {
        // We don't allow anything that a-z and 0-9
        pattern: "[a-z ]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain letters"
      }
    },
    email: {
      // Email is required
      presence: true,
      // and must be an email (duh)
      email: true
    },
    username: {
      // You need to pick a username too
      presence: false,
      // And it must be between 3 and 20 characters long
      length: {
        minimum: 3,
        maximum: 20
      },
      format: {
        // We don't allow anything that a-z and 0-9
        pattern: "[a-z0-9]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    password: {
      // Password is also required
      presence: true,
      // And must be at least 5 characters long
      length: {
        minimum: 5
      }
    },
    country: {
      // You also need to input where you live
      presence: true,
      // And we restrict the countries supported to Sweden
      inclusion: {
        within: ["AU"],
        // The ^ prevents the field name from being prepended to the error
        message: "^Sorry, this service is currently for Australians only"
      }
    },

    };

  var form = document.querySelector("form");
  form.addEventListener("submit", function(ev) {
    handleFormSubmit(form);
  });

  var inputs = document.querySelectorAll("input, textarea, select");
  console.log(inputs);
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {
    var errors = validate(form, {});
    showErrors(form, errors || {});
    console.log(errors,form,input);
    if (!errors) {
      showSuccess();
    }
  }

  function showErrors(form, errors) {
    form.querySelectorAll("input[name], select[name]").forEach( function(input) {
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  function showErrorsForInput(input, errors) {
    var formGroup = closestParent(input.parentNode, "form-group")
      , messages = formGroup.querySelector(".messages");
    resetFormGroup(formGroup);
    if (errors) {
      formGroup.classList.add("has-error");
      errors.forEach(function(error) {
        addError(messages, error);
      });
    } else {
      formGroup.classList.add("has-success");
    }
  }

  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }

  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    alert("Success!");
  }