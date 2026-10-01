async function handleLogin() {
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const selectedRoleInput =
        document.querySelector('input[name="account"]:checked').value;

    if (!emailInput || !passwordInput) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch("../data/user.json");
        const users = await response.json();

        const matchedUser = users.find(user =>
            user.email === emailInput &&
            user.password === passwordInput &&
            user.role === selectedRoleInput
        );

        if (matchedUser) {

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(matchedUser)
            );

            alert("تم تسجيل الدخول بنجاح!");

            if (matchedUser.role === "HR") {
                window.location.href = "../../eyadWork/html/dashBoard.html";
            } else {
                window.location.href = "../../eyadWork/html/dashBoard.html";
            }

        } else {
            alert("email or password or role is wrong");
        }

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء قراءة بيانات المستخدمين");
    }
}


// =====================================
// Google Login
// =====================================

const GOOGLE_CLIENT_ID =
    "313291642700-7iojaon2vp390g5ii57789n0bif4c47d.apps.googleusercontent.com";


function initializeGoogleLogin() {

    // نتأكد أن Google Library تم تحميلها
    if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
    ) {
        setTimeout(initializeGoogleLogin, 300);
        return;
    }


    // Initialize Google
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,

        callback: handleGoogleLogin
    });


    // Create Google Button
    google.accounts.id.renderButton(
        document.getElementById("google-login"),

        {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 270
        }
    );
}


// =====================================
// Handle Google Response
// =====================================

function handleGoogleLogin(response) {

    try {

        /*
         Google returns a JWT token.

         JWT structure:

         HEADER.PAYLOAD.SIGNATURE

         We need the PAYLOAD.
        */

        const base64Url =
            response.credential.split(".")[1];


        const base64 =
            base64Url
                .replace(/-/g, "+")
                .replace(/_/g, "/");


        const payload =
            JSON.parse(atob(base64));


        // Get selected account type
        const selectedRole =
            document.querySelector(
                'input[name="account"]:checked'
            ).value;


        // Create user object
        const googleUser = {

            name: payload.name || "Google User",

            email: payload.email,

            picture: payload.picture || "",

            googleId: payload.sub,

            role: selectedRole,

            provider: "google"
        };


        // Save user in localStorage
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(googleUser)
        );


        alert("تم تسجيل الدخول باستخدام Google بنجاح!");


        // Redirect according to role
        if (selectedRole === "HR") {

            window.location.href =
                "../../eyadWork/html/dashBoard.html";

        } else {

            window.location.href =
                "../../eyadWork/html/dashBoard.html";
        }


    } catch (error) {

        console.error(
            "Google Login Error:",
            error
        );

        alert(
            "حدث خطأ أثناء تسجيل الدخول باستخدام Google."
        );
    }
}


// =====================================
// Start Google Login
// =====================================

window.addEventListener(
    "load",
    initializeGoogleLogin
);




function logout() {
    localStorage.removeItem("loggedInUser");

    window.location.href = "../../sara-work/html/index.html";
}