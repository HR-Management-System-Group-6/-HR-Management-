function displayAddEmployee() {

    let content = document.getElementById("content");

    content.innerHTML = `
        <section class="content">

            <div class="page-label">
                HR WORKSPACE / EMPLOYEES / ADD EMPLOYEE
            </div>

            <div class="title-row">

                <div>
                    <h1>Add Employee</h1>

                    <p>
                        Create an employee account. The employee logs in with these details.
                    </p>
                </div>

                <button class="back-btn" type="button" onclick="displayEmployees()">
                    <i class="bi bi-arrow-left"></i>
                    Back to Employees
                </button>

            </div>


            <!-- ================= FORM AREA ================= -->

            <div class="employee-area">

                <!-- PROFILE PHOTO -->
                <div class="photo-section">

                    <h3>Profile photo</h3>

                    <div class="photo-card">

                        <div class="avatar-placeholder">

                            <i class="bi bi-person"></i>

                            <button class="plus-btn" type="button">
                                <i class="bi bi-plus"></i>
                            </button>

                        </div>

                        <button class="upload-btn" type="button">
                            <i class="bi bi-upload"></i>
                            Upload photo
                        </button>

                        <span class="photo-hint">
                            JPG or PNG image.
                        </span>

                    </div>

                </div>


                <!-- EMPLOYEE DETAILS -->

                <div class="details-section">

                    <div class="details-header">

                        <h3>Employee details</h3>

                        <span>
                            * Required fields
                        </span>

                    </div>


                    <form class="employee-form" id="employeeForm">

                        <!-- ROW 1 -->

                        <div class="form-row">

                            <div class="form-group">

                                <label>
                                    Full name <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="employeeName"
                                    placeholder="Enter full name"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label>
                                    Email address <span>*</span>
                                </label>

                                <input
                                    type="email"
                                    id="employeeEmail"
                                    placeholder="name@company.com"
                                    required
                                >

                            </div>

                        </div>


                        <!-- ROW 2 -->

                        <div class="form-row">

                            <div class="form-group">

                                <label>
                                    Phone number <span>*</span>
                                </label>

                                <input
                                    type="tel"
                                    id="employeePhone"
                                    placeholder="+00 000 000 0000"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label>
                                    Job title <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="employeeJob"
                                    placeholder="Enter job title"
                                    required
                                >

                            </div>

                        </div>


                        <!-- ROW 3 -->

                        <div class="form-row">

                            <div class="form-group">

                                <label>
                                    Department <span>*</span>
                                </label>

                                <div class="select-wrapper">

                                    <select id="employeeDepartment" required>

                                        <option value="">
                                            Select department
                                        </option>

                                        <option value="IT">
                                            IT
                                        </option>

                                        <option value="HR">
                                            HR
                                        </option>

                                        <option value="Finance">
                                            Finance
                                        </option>

                                        <option value="Marketing">
                                            Marketing
                                        </option>

                                    </select>

                                    <i class="bi bi-chevron-down"></i>

                                </div>

                            </div>


                            <div class="form-group">

                                <label>
                                    Joining date <span>*</span>
                                </label>

                                <div class="input-icon">

                                    <input
                                        type="date"
                                        id="employeeJoiningDate"
                                        required
                                    >

                                    <i class="bi bi-calendar3"></i>

                                </div>

                            </div>

                        </div>


                        <!-- ROW 4 -->

                        <div class="form-row">

                            <div class="form-group">

                                <label>
                                    Status
                                </label>

                                <input
                                    type="text"
                                    id="employeeStatus"
                                    value="Active"
                                    readonly
                                    class="status-active"
                                >

                            </div>


                            <div class="form-group">

                                <label>
                                    Initial password <span>*</span>
                                </label>

                                <div class="password-wrapper">

                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter initial password"
                                        required
                                    >

                                    <i
                                        class="bi bi-eye"
                                        id="togglePassword"
                                    ></i>

                                </div>

                                <small>
                                    At least 8 characters, one uppercase letter,
                                    one number and one special character.
                                </small>

                            </div>

                        </div>


                        <!-- BUTTONS -->

                        <div class="form-actions">

                            <button
                                type="button"
                                class="cancel-btn"
                                id="cancelEmployee"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                class="create-btn"
                            >
                                Create Employee
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </section>
    `;


    // ==========================================
    // CREATE EMPLOYEE
    // ==========================================

    const form = document.getElementById("employeeForm");

    form.addEventListener("submit", function (e) {

        e.preventDefault();


        // Get values
        const name = document.getElementById("employeeName").value.trim();
        const email = document.getElementById("employeeEmail").value.trim();
        const phone = document.getElementById("employeePhone").value.trim();
        const job = document.getElementById("employeeJob").value.trim();
        const department = document.getElementById("employeeDepartment").value;
        const joiningDate = document.getElementById("employeeJoiningDate").value;
        const status = document.getElementById("employeeStatus").value;
        const password = document.getElementById("password").value;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !name ||
            !email ||
            !phone ||
            !job ||
            !department ||
            !joiningDate ||
            !password
        ) {
            alert("Please fill in all required fields.");
            return;
        }


        // Password validation
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!passwordRegex.test(password)) {

            alert(
                "Password must be at least 8 characters and contain one uppercase letter, one number and one special character."
            );

            return;
        }


        // ==========================================
        // GET OLD EMPLOYEES
        // ==========================================

        let employees = JSON.parse(
            localStorage.getItem("employees")
        ) || [];


        // ==========================================
        // CHECK DUPLICATE EMAIL
        // ==========================================

        const emailExists = employees.some(
            employee =>
                employee.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {

            alert("An employee with this email already exists.");

            return;
        }


        // ==========================================
        // CREATE NEW EMPLOYEE
        // ==========================================

        const newEmployee = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            jobTitle: job,

            department: department,

            joiningDate: joiningDate,

            status: status,

            password: password,

            role: "employee"

        };


        // ==========================================
        // ADD NEW EMPLOYEE TO OLD EMPLOYEES
        // ==========================================

        employees.push(newEmployee);


        // ==========================================
        // SAVE ALL EMPLOYEES
        // ==========================================

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );


        // ==========================================
        // SUCCESS
        // ==========================================

        alert("Employee created successfully!");


        // Reset form
        form.reset();

        document.getElementById("employeeStatus").value = "Active";


        console.log("All Employees:", employees);

    });


    // ==========================================
    // SHOW / HIDE PASSWORD
    // ==========================================

    const togglePassword =
        document.getElementById("togglePassword");

    const passwordInput =
        document.getElementById("password");

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            this.classList.remove("bi-eye");

            this.classList.add("bi-eye-slash");

        } else {

            passwordInput.type = "password";

            this.classList.remove("bi-eye-slash");

            this.classList.add("bi-eye");

        }

    });


    // ==========================================
    // CANCEL BUTTON
    // ==========================================

    document
        .getElementById("cancelEmployee")
        .addEventListener("click", function () {

            form.reset();

            document.getElementById("employeeStatus").value = "Active";

        });

}