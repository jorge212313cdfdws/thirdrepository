window.onload = initialize;

function initialize() {
    var formSingup = document.getElementById("form-singup");
    formSingup.addEventListener("submit", validateFormSingup);
}

function validateFormSingup(event) {
    var formSingup = event.target;

    var username = formSingup["username"].value;

    if (!username || username == "") {
        event.preventDefault();
        document.getElementById("error-username-required").style.display = "block";
        console.log("* error: nombre de usuario obligatorio");
    } else {
        document.getElementById("error-username-required").style.display = "none";
    }

    var password = formSingup["password"].value;

    if (!password || password == "") {
        event.preventDefault();
        document.getElementById("error-password-required").style.display = "block";
        console.log("* error: contraseña obligatoria");
    } else {
        document.getElementById("error-password-required").style.display = "none";
    }

    // Corregir el acceso al valor del campo de confirmación de contraseña
    var passwordConfirm = formSingup["password-confirm"].value;

    if (!passwordConfirm || passwordConfirm == "") {
        event.preventDefault();
        document.getElementById("error-password-confirm-required").style.display = "block";
        console.log("* error: confirmar contraseña es obligatorio");
    } else {
        document.getElementById("error-password-confirm-required").style.display = "none";
    }

    if (password != "" && password != passwordConfirm) {
        event.preventDefault();
        document.getElementById("error-password-match-required").style.display = "block";
        console.log("* error: las contraseñas no coinciden");
    } else {
        document.getElementById("error-password-match-required").style.display = "none";
    }
}