let changePasswordToken = "";

$("document").ready(function() {
    setTimeout(() => {
        $("#username").val("");
        $("#password").val("");
    }, 200);
});

function showChangePasswordScreen() {
    $(".login-box").prepend(
        '<h2 class="title-login">Set a new password</h2><br/>' +
            '<input type="password" name="password" id="password" placeholder="•••••••••••••••••••••" class="login-input" /><br>' +
            '<input type="password" name="password_repeat" id="password_repeat" placeholder="•••••••••••••••••••••" class="login-input" /><br>' +
            '<button type="button" id="btn-change-password" class="btn-change-password" onclick="changePasswordSubmit()">Change</button>'
    );
}

function disableLoginButton(condition) {
    $(".btn-login").prop("disabled", condition);
}

function validateEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
    );
}

function validatePassword(password) {
    return /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(
        password
    );
}

function clean() {
    $(".error-bag").html("");
    $(".error-bag").append("<li>Incorrect Username and/or password</li>");
    disableLoginButton(false);
}

function disapearOldElements() {
    $(".image-user").animate(
        {
            opacity: 0.25,
            left: "+=50",
            height: "toggle"
        },
        2000,
        function() {
            $(".image-user").hide();
        }
    );
    $(".title-login").animate(
        {
            opacity: 0.25,
            right: "+=50",
            width: "toggle"
        },
        2000,
        function() {
            $(".title-login").hide();
        }
    );
}

function changePassword() {
    disapearOldElements();
    setTimeout(() => {
        $("#username").hide();
        $("#password").hide();
        $(".btn-login").hide();
        showChangePasswordScreen();
    }, 2200);
}

function doLogin(username, password) {
    $.ajax({
        method: "POST",
        url: "log-me-in",
        data: {
            username,
            password
        }
    }).done(function(response) {
        response = JSON.parse(response);
        if (response && response.status) {
            if (response.redirect) {
                changePasswordToken = response.change_token;
                return changePassword();
            } else {
                window.location.replace("/dashboard");
            }
        } else {
            clean();
        }
    });
}

$(".btn-login").click(function() {
    $(".error-bag").html("");
    disableLoginButton(true);
    if (!$("#username").val()) {
        $("#username").addClass("error");
        $(".error-bag").append("<li>Username can not be empty</li>");
        disableLoginButton(false);
        return;
    }
    if (!validateEmail($("#username").val())) {
        $("#username").addClass("error");
        $(".error-bag").append("<li>Please introduce a valid email</li>");
        disableLoginButton(false);
        return;
    }
    if (!$("#password").val()) {
        $("#password").addClass("error");
        $(".error-bag").append("<li>Password can not be empty</li>");
        disableLoginButton(false);
        return;
    }
    if (!validatePassword($("#password").val())) {
        $("#password").addClass("error");
        $(".error-bag").append("<li>Please introduce a strong password</li>");
        disableLoginButton(false);
        return;
    }
    // Form processing.
    doLogin($("#username").val(), $("#password").val());
});

function changePasswordSubmit() {
    if (!$("#password").val() || !$("#password_repeat").val()) {
        $(".error-bag").append(
            "<li>Password and/or Password Repeat can not be empty</li>"
        );
        return;
    }
    if (($("#password").val() === $("#password_repeat").val()) === false) {
        $(".error-bag").append("<li>Password and Repeat mismatch</li>");
        return;
    }
    if (!validatePassword($("#password").val())) {
        $("#password").addClass("error");
        $("#password_repeat").addClass("error");
        $(".error-bag").append("<li>Please introduce a strong password</li>");
        disableLoginButton(false);
        return;
    }
    $.ajax({
        method: "POST",
        url: "set-new-password",
        data: {
            password: $("#password").val(),
            token: changePasswordToken
        }
    }).done(function(response) {
        response = JSON.parse(response);
        if (response && response.status) {
            window.location.replace("/dashboard");
        } else {
            $("#password").addClass("error");
            $("#password_repeat").addClass("error");
            for (const error of response.errors) {
                $(".error-bag").append(`<li>${error}</li>`);
            }
            disableLoginButton(false);
            return;
        }
    });
}
