// =====================================
// Global Variables
// =====================================

let pendingNewEmployee = null;


// =====================================
// HANDLE LOGIN
// =====================================

async function handleLogin() {

    const emailInput = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const passwordInput = document
        .getElementById("password")
        .value
        .trim();

    const selectedRoleInput =
        document.querySelector('input[name="account"]:checked').value;


    // =====================================
    // VALIDATION
    // =====================================

    if (!emailInput || !passwordInput) {

        alert("Please enter email and password");
        return;

    }


    // =====================================
    // EMPLOYEE LOGIN
    // =====================================

    if (selectedRoleInput === "Employee") {

        // Get employees from localStorage
        const employees = JSON.parse(
            localStorage.getItem("employees")
        ) || [];


        // Search employee
        const matchedEmployee = employees.find(employee => {

            return (
                employee.email &&
                employee.email.toLowerCase() === emailInput &&
                employee.password === passwordInput &&
                employee.role &&
                employee.role.toLowerCase() === "employee"
            );

        });


        // =====================================
        // EMPLOYEE FOUND
        // =====================================

        if (matchedEmployee) {

            // Check if this is a NEW employee
            const isNewEmployee =
                matchedEmployee.status &&
                matchedEmployee.status.toLowerCase() === "new";


            // =====================================
            // NEW EMPLOYEE
            // =====================================

            if (isNewEmployee) {

                // Save employee temporarily
                pendingNewEmployee = matchedEmployee;

                // Show change password modal
                showChangePasswordModal();

                return;
            }


            // =====================================
            // OLD EMPLOYEE
            // =====================================

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(matchedEmployee)
            );


            alert("تم تسجيل دخول الموظف بنجاح!");


            // Go to dashboard
            window.location.href =
                "../../eyadWork/html/dashBoard.html";

            return;
        }


        // =====================================
        // EMPLOYEE NOT FOUND
        // =====================================

        alert(
            "Employee not found. Please check your email and password."
        );

        return;
    }


    // =====================================
    // HR LOGIN
    // =====================================

    if (selectedRoleInput === "HR") {

        try {

            // HR users come from JSON
            const response =
                await fetch("../data/user.json");

            const users =
                await response.json();


            const matchedUser = users.find(user => {

                return (
                    user.email &&
                    user.email.toLowerCase() === emailInput &&
                    user.password === passwordInput &&
                    user.role &&
                    user.role.toLowerCase() === "hr"
                );

            });


            // =====================================
            // HR FOUND
            // =====================================

            if (matchedUser) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(matchedUser)
                );


                alert("تم تسجيل دخول HR بنجاح!");


                window.location.href =
                    "../../eyadWork/html/dashBoard.html";

                return;
            }


            // =====================================
            // HR NOT FOUND
            // =====================================

            alert(
                "HR email or password is incorrect."
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "حدث خطأ أثناء قراءة بيانات HR."
            );

        }

        return;
    }


    // =====================================
    // INVALID ROLE
    // =====================================

    alert("Invalid account type.");

}



// =====================================
// SHOW CHANGE PASSWORD MODAL
// =====================================

function showChangePasswordModal() {

    // Remove any old/empty modal
    const existingModal =
        document.getElementById("changePasswordModal");

    if (existingModal) {
        existingModal.remove();
    }


    // Create modal
    const modal =
        document.createElement("div");

    modal.id = "changePasswordModal";

    modal.className = "password-modal";


    modal.innerHTML = `

        <div class="password-modal-overlay"></div>

        <div class="password-modal-card">

            <div class="password-modal-icon">
                <i class="fa-solid fa-lock"></i>
            </div>

            <div class="password-modal-content">

                <span class="password-modal-label">
                    FIRST LOGIN
                </span>

                <h2>
                    Change your password
                </h2>

                <p>
                    For security reasons, you need to
                    change your temporary password before
                    continuing to your workspace.
                </p>

            </div>


            <form
                id="changePasswordForm"
                class="change-password-form"
            >

                <div class="modal-input-group">

                    <label for="newPassword">
                        New Password
                    </label>

                    <div class="modal-input-wrapper">

                        <i class="fa-solid fa-lock"></i>

                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Enter your new password"
                            minlength="6"
                            required
                        >

                        <button
                            type="button"
                            class="modal-password-toggle"
                            onclick="toggleNewPassword()"
                        >
                            <i
                                id="newPasswordIcon"
                                class="fa-regular fa-eye"
                            ></i>
                        </button>

                    </div>

                </div>


                <div class="modal-input-group">

                    <label for="confirmPassword">
                        Confirm Password
                    </label>

                    <div class="modal-input-wrapper">

                        <i class="fa-solid fa-shield-halved"></i>

                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your new password"
                            minlength="6"
                            required
                        >

                        <button
                            type="button"
                            class="modal-password-toggle"
                            onclick="toggleConfirmPassword()"
                        >
                            <i
                                id="confirmPasswordIcon"
                                class="fa-regular fa-eye"
                            ></i>
                        </button>

                    </div>

                </div>


                <div
                    id="passwordError"
                    class="password-error"
                ></div>


                <button
                    type="submit"
                    class="change-password-btn"
                >

                    <span>
                        Update Password
                    </span>

                    <i class="fa-solid fa-arrow-right"></i>

                </button>


                <div class="password-security-note">

                    <i class="fa-solid fa-circle-check"></i>

                    <span>
                        Your password will be securely updated.
                    </span>

                </div>

            </form>

        </div>
    `;


    document.body.appendChild(modal);


    // Show modal
    requestAnimationFrame(() => {

        modal.classList.add("show");

    });


    // Form submit
    document
        .getElementById("changePasswordForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                updateEmployeePassword();

            }
        );


    // Focus
    setTimeout(() => {

        document
            .getElementById("newPassword")
            ?.focus();

    }, 300);
}



// =====================================
// UPDATE EMPLOYEE PASSWORD
// =====================================

function updateEmployeePassword() {

    if (!pendingNewEmployee) {

        return;
    }


    const newPassword =
        document
            .getElementById("newPassword")
            .value
            .trim();

    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value
            .trim();

    const errorElement =
        document.getElementById("passwordError");


    // Clear old error
    errorElement.textContent = "";



    // =====================================
    // VALIDATION
    // =====================================

    if (!newPassword || !confirmPassword) {

        showPasswordError(
            "Please enter and confirm your new password."
        );

        return;
    }


    if (newPassword.length < 6) {

        showPasswordError(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        showPasswordError(
            "Passwords do not match."
        );

        return;
    }


    // Prevent using the same temporary password
    if (newPassword === pendingNewEmployee.password) {

        showPasswordError(
            "New password must be different from your temporary password."
        );

        return;
    }



    // =====================================
    // GET EMPLOYEES
    // =====================================

    const employees =
        JSON.parse(
            localStorage.getItem("employees")
        ) || [];


    // =====================================
    // FIND EMPLOYEE
    // =====================================

    const employeeIndex =
        employees.findIndex(employee => {

            return (
                employee.email &&
                pendingNewEmployee.email &&
                employee.email.toLowerCase() ===
                pendingNewEmployee.email.toLowerCase()
            );

        });


    if (employeeIndex === -1) {

        showPasswordError(
            "Employee data could not be found."
        );

        return;
    }



    // =====================================
    // UPDATE EMPLOYEE
    // =====================================

    employees[employeeIndex].password =
        newPassword;


    // Change status
    employees[employeeIndex].status =
        "Old";


    // =====================================
    // SAVE EMPLOYEES
    // =====================================

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    // =====================================
    // UPDATE LOGGED IN USER
    // =====================================

    const updatedEmployee =
        employees[employeeIndex];


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedEmployee)
    );


    // =====================================
    // SUCCESS
    // =====================================

    const modal =
        document.getElementById(
            "changePasswordModal"
        );


    const card =
        modal.querySelector(
            ".password-modal-card"
        );


    card.innerHTML = `

        <div class="password-success">

            <div class="success-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <h2>
                Password updated!
            </h2>

            <p>
                Your password has been changed successfully.
                You can now access your workspace.
            </p>

            <div class="success-loading">

                <span></span>
                Redirecting to your workspace...

            </div>

        </div>

    `;


    // Redirect
    setTimeout(() => {

        window.location.href =
            "../../eyadWork/html/dashBoard.html";

    }, 1500);
}



// =====================================
// SHOW PASSWORD ERROR
// =====================================

function showPasswordError(message) {

    const errorElement =
        document.getElementById("passwordError");

    errorElement.textContent = message;

    errorElement.classList.remove("shake");

    void errorElement.offsetWidth;

    errorElement.classList.add("shake");
}



// =====================================
// TOGGLE NEW PASSWORD
// =====================================

function toggleNewPassword() {

    const input =
        document.getElementById("newPassword");

    const icon =
        document.getElementById("newPasswordIcon");


    if (input.type === "password") {

        input.type = "text";

        icon.className =
            "fa-regular fa-eye-slash";

    } else {

        input.type = "password";

        icon.className =
            "fa-regular fa-eye";

    }
}



// =====================================
// TOGGLE CONFIRM PASSWORD
// =====================================

function toggleConfirmPassword() {

    const input =
        document.getElementById("confirmPassword");

    const icon =
        document.getElementById("confirmPasswordIcon");


    if (input.type === "password") {

        input.type = "text";

        icon.className =
            "fa-regular fa-eye-slash";

    } else {

        input.type = "password";

        icon.className =
            "fa-regular fa-eye";

    }
}



// =====================================
// GOOGLE LOGIN
// =====================================

const GOOGLE_CLIENT_ID =
    "313291642700-7iojaon2vp390g5ii57789n0bif4c47d.apps.googleusercontent.com";



function initializeGoogleLogin() {

    if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
    ) {

        setTimeout(
            initializeGoogleLogin,
            300
        );

        return;
    }


    google.accounts.id.initialize({

        client_id: GOOGLE_CLIENT_ID,

        callback: handleGoogleLogin

    });


    google.accounts.id.renderButton(

        document.getElementById(
            "google-login"
        ),

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
// HANDLE GOOGLE RESPONSE
// =====================================

function handleGoogleLogin(response) {

    try {

        const base64Url =
            response.credential
                .split(".")[1];


        const base64 =
            base64Url
                .replace(/-/g, "+")
                .replace(/_/g, "/");


        const payload =
            JSON.parse(
                atob(base64)
            );


        // Get selected account type
        const selectedRole =
            document.querySelector(
                'input[name="account"]:checked'
            ).value;


        // Create Google user
        const googleUser = {

            name:
                payload.name ||
                "Google User",

            email:
                payload.email,

            picture:
                payload.picture ||
                "",

            googleId:
                payload.sub,

            role:
                selectedRole,

            provider:
                "google"

        };


        // Save user
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(googleUser)
        );


        alert(
            "تم تسجيل الدخول باستخدام Google بنجاح!"
        );


        window.location.href =
            "../../eyadWork/html/dashBoard.html";


    }

    catch (error) {

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
// START GOOGLE LOGIN
// =====================================

window.addEventListener(
    "load",
    initializeGoogleLogin
);



// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
        "../../sara-work/html/index.html";
}