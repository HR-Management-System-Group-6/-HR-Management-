


// =====================================
// GLOBAL VARIABLES
// =====================================

let pendingNewEmployee = null;


// =====================================
// HANDLE LOGIN
// =====================================

async function handleLogin() {

    const emailInput =
        document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();


    const passwordInput =
        document
            .getElementById("password")
            .value
            .trim();


    const selectedAccount =
        document.querySelector(
            'input[name="account"]:checked'
        );


    if (!selectedAccount) {

        alert(
            "Please select account type."
        );

        return;

    }


    const selectedRoleInput =
        selectedAccount.value;


    // =====================================
    // VALIDATION
    // =====================================

    if (
        !emailInput ||
        !passwordInput
    ) {

        alert(
            "Please enter email and password"
        );

        return;

    }


    // =====================================
    // EMPLOYEE LOGIN
    // =====================================

    if (
        selectedRoleInput ===
        "Employee"
    ) {

        let employees = [];


        try {

            employees =
                JSON.parse(
                    localStorage.getItem(
                        "employees"
                    ) || "[]"
                );

        } catch (error) {

            console.error(
                "Employees data error:",
                error
            );

            alert(
                "Unable to read employee data."
            );

            return;

        }


        // =====================================
        // FIND EMPLOYEE
        // =====================================

        const matchedEmployee =
            employees.find(
                employee => {

                    return (

                        employee.email &&

                        employee.email
                            .toLowerCase() ===
                            emailInput &&

                        employee.password ===
                            passwordInput &&

                        employee.role &&

                        employee.role
                            .toLowerCase() ===
                            "employee"

                    );

                }
            );


        // =====================================
        // EMPLOYEE FOUND
        // =====================================

        if (matchedEmployee) {


            // =====================================
            // BLOCKED EMPLOYEE
            // =====================================

            const employeeStatus =
                String(
                    matchedEmployee.status ||
                    ""
                )
                    .trim()
                    .toLowerCase();


            if (
                employeeStatus ===
                "blocked"
            ) {

                showAlert(
                    "Your account has been blocked. Please contact HR.",
                    "error"
                );

                return;

            }


            // =====================================
            // NEW EMPLOYEE
            // =====================================

            const isNewEmployee =
                employeeStatus ===
                "new";


            if (isNewEmployee) {

                pendingNewEmployee =
                    matchedEmployee;


                showChangePasswordModal();

                return;

            }


            // =====================================
            // NORMAL EMPLOYEE
            // =====================================

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(
                    matchedEmployee
                )
            );


            showAlert(
                "تم تسجيل دخول الموظف بنجاح!",
                "success"
            );


            window.location.href =
                window.location.href = "dashBoard.html";


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

    // =====================================
    // FIXED HR ACCOUNT
    // =====================================

    const fixedHR = {
        id: 1,
        name: "Eyad Mansur",
        email: "hr@gmail.com",
        password: "Ey@dmansur2003",
        role: "HR",
        status: "Active"
    };


    // =====================================
    // CHECK HR LOGIN
    // =====================================

    if (
        emailInput === fixedHR.email.toLowerCase() &&
        passwordInput === fixedHR.password
    ) {

        // Save logged in HR
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(fixedHR)
        );


        // Save HR account
        localStorage.setItem(
            "hrUser",
            JSON.stringify(fixedHR)
        );


            showAlert(
        "تم تسجيل دخول HR بنجاح!",
        "success"
    );


        // Redirect to dashboard
        window.location.href =
            window.location.href = "dashBoard.html";

        return;
    }


    // =====================================
    // HR LOGIN FAILED
    // =====================================

    showAlert(
    "HR email or password is incorrect.",
    "error"
);

    return;
}

    // =====================================
    // INVALID ROLE
    // =====================================

    alert(
        "Invalid account type."
    );

}


// =====================================
// CHANGE PASSWORD MODAL
// =====================================

function showChangePasswordModal() {

    const existingModal =
        document.getElementById(
            "changePasswordModal"
        );


    if (existingModal) {

        existingModal.remove();

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "changePasswordModal";


    modal.className =
        "password-modal";


    modal.innerHTML = `

        <div
            class="password-modal-overlay"
        ></div>


        <div
            class="password-modal-card"
        >

            <div
                class="password-modal-icon"
            >
                <i class="fa-solid fa-lock"></i>
            </div>


            <div
                class="password-modal-content"
            >

                <span
                    class="password-modal-label"
                >
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

                <div
                    class="modal-input-group"
                >

                    <label
                        for="newPassword"
                    >
                        New Password
                    </label>


                    <div
                        class="modal-input-wrapper"
                    >

                        <i
                            class="fa-solid fa-lock"
                        ></i>


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


                <div
                    class="modal-input-group"
                >

                    <label
                        for="confirmPassword"
                    >
                        Confirm Password
                    </label>


                    <div
                        class="modal-input-wrapper"
                    >

                        <i
                            class="fa-solid fa-shield-halved"
                        ></i>


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

                    <i
                        class="fa-solid fa-arrow-right"
                    ></i>

                </button>


                <div
                    class="password-security-note"
                >

                    <i
                        class="fa-solid fa-circle-check"
                    ></i>

                    <span>
                        Your password will be securely updated.
                    </span>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    requestAnimationFrame(
        () => {

            modal.classList.add(
                "show"
            );

        }
    );


    document
        .getElementById(
            "changePasswordForm"
        )
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                updateEmployeePassword();

            }
        );


    setTimeout(
        () => {

            document
                .getElementById(
                    "newPassword"
                )
                ?.focus();

        },
        300
    );

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
            .getElementById(
                "newPassword"
            )
            .value
            .trim();


    const confirmPassword =
        document
            .getElementById(
                "confirmPassword"
            )
            .value
            .trim();


    const errorElement =
        document.getElementById(
            "passwordError"
        );


    errorElement.textContent =
        "";


    // =====================================
    // VALIDATION
    // =====================================

    if (
        !newPassword ||
        !confirmPassword
    ) {

        showPasswordError(
            "Please enter and confirm your new password."
        );

        return;

    }


    if (
        newPassword.length < 6
    ) {

        showPasswordError(
            "Password must contain at least 6 characters."
        );

        return;

    }


    if (
        newPassword !==
        confirmPassword
    ) {

        showPasswordError(
            "Passwords do not match."
        );

        return;

    }


    if (
        newPassword ===
        pendingNewEmployee.password
    ) {

        showPasswordError(
            "New password must be different from your temporary password."
        );

        return;

    }


    // =====================================
    // GET EMPLOYEES
    // =====================================

    let employees =
        JSON.parse(
            localStorage.getItem(
                "employees"
            ) || "[]"
        );


    // =====================================
    // FIND EMPLOYEE
    // =====================================

    const employeeIndex =
        employees.findIndex(
            employee => {

                return (

                    employee.email &&

                    pendingNewEmployee.email &&

                    employee.email
                        .toLowerCase() ===
                        pendingNewEmployee.email
                            .toLowerCase()

                );

            }
        );


    if (
        employeeIndex ===
        -1
    ) {

        showPasswordError(
            "Employee data could not be found."
        );

        return;

    }


    // =====================================
    // UPDATE
    // =====================================

    employees[
        employeeIndex
    ].password =
        newPassword;


    employees[
        employeeIndex
    ].status =
        "Old";


    // =====================================
    // SAVE
    // =====================================

    localStorage.setItem(
        "employees",
        JSON.stringify(
            employees
        )
    );


    const updatedEmployee =
        employees[
            employeeIndex
        ];


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(
            updatedEmployee
        )
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

        <div
            class="password-success"
        >

            <div
                class="success-icon"
            >
                <i
                    class="fa-solid fa-check"
                ></i>
            </div>


            <h2>
                Password updated!
            </h2>


            <p>
                Your password has been changed successfully.
                You can now access your workspace.
            </p>


            <div
                class="success-loading"
            >

                <span></span>

                Redirecting to your workspace...

            </div>

        </div>

    `;


    setTimeout(
        () => {

            window.location.href =
                window.location.href = "dashBoard.html";

        },
        1500
    );

}


// =====================================
// PASSWORD ERROR
// =====================================

function showPasswordError(
    message
) {

    const errorElement =
        document.getElementById(
            "passwordError"
        );


    if (!errorElement) {
        return;
    }


    errorElement.textContent =
        message;


    errorElement.classList.remove(
        "shake"
    );


    void errorElement.offsetWidth;


    errorElement.classList.add(
        "shake"
    );

}


// =====================================
// TOGGLE NEW PASSWORD
// =====================================

function toggleNewPassword() {

    const input =
        document.getElementById(
            "newPassword"
        );


    const icon =
        document.getElementById(
            "newPasswordIcon"
        );


    if (
        input.type ===
        "password"
    ) {

        input.type =
            "text";


        icon.className =
            "fa-regular fa-eye-slash";

    } else {

        input.type =
            "password";


        icon.className =
            "fa-regular fa-eye";

    }

}


// =====================================
// TOGGLE CONFIRM PASSWORD
// =====================================

function toggleConfirmPassword() {

    const input =
        document.getElementById(
            "confirmPassword"
        );


    const icon =
        document.getElementById(
            "confirmPasswordIcon"
        );


    if (
        input.type ===
        "password"
    ) {

        input.type =
            "text";


        icon.className =
            "fa-regular fa-eye-slash";

    } else {

        input.type =
            "password";


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

        client_id:
            GOOGLE_CLIENT_ID,

        callback:
            handleGoogleLogin

    });


    google.accounts.id.renderButton(

        document.getElementById(
            "google-login"
        ),

        {

            theme:
                "outline",

            size:
                "large",

            text:
                "continue_with",

            shape:
                "rectangular",

            logo_alignment:
                "left",

            width:
                270

        }

    );

}




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


// =====================================
// CUSTOM ALERT
// =====================================

function showAlert(message, type = "success") {

    // Remove existing alert
    const oldAlert = document.querySelector(".custom-alert");

    if (oldAlert) {
        oldAlert.remove();
    }

    const alertBox = document.createElement("div");

    alertBox.className = `custom-alert ${type}`;

    let icon = "fa-circle-check";

    if (type === "error") {
        icon = "fa-circle-exclamation";
    } else if (type === "warning") {
        icon = "fa-triangle-exclamation";
    }

    alertBox.innerHTML = `
        <div class="custom-alert-icon">
            <i class="fa-solid ${icon}"></i>
        </div>

        <div class="custom-alert-content">
            <strong>
                ${
                    type === "success"
                        ? "Success"
                        : type === "error"
                        ? "Error"
                        : "Warning"
                }
            </strong>

            <span>${message}</span>
        </div>

        <button
            class="custom-alert-close"
            onclick="closeAlert(this)"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    document.body.appendChild(alertBox);

    // Show animation
    requestAnimationFrame(() => {
        alertBox.classList.add("show");
    });

    // Auto close after 3 seconds
    setTimeout(() => {

        if (alertBox) {
            alertBox.classList.remove("show");

            setTimeout(() => {
                alertBox.remove();
            }, 300);
        }

    }, 3000);
}


// =====================================
// CLOSE ALERT
// =====================================

function closeAlert(button) {

    const alertBox = button.closest(".custom-alert");

    if (!alertBox) return;

    alertBox.classList.remove("show");

    setTimeout(() => {
        alertBox.remove();
    }, 300);
}