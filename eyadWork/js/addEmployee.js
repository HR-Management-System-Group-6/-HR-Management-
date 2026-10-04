function displayAddEmployee() {

    let content = document.getElementById("content");

    content.innerHTML = `
        <section class="content">



            <div class="title-row">

                <div>
                    <h1>Add Employee</h1>


                </div>



            </div>


            <!-- ================= FORM AREA ================= -->

            <div class="employee-area">




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

                                        <option value="Finance">
                                            Finance
                                        </option>

                                        <option value="Accounting">
                                            Accounting
                                        </option>

                                        <option value="Sales">
                                            Sales
                                        </option>

                                        <option value="Internal Audit">
                                            Internal Audit
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

                        <!-- ROW 4 - PERSONAL INFORMATION -->

<div class="form-row">

    <div class="form-group">

        <label>
            Date of Birth <span>*</span>
        </label>

        <div class="input-icon">

            <input
                type="date"
                id="employeeDateOfBirth"
                required
            >

            <i class="bi bi-calendar3"></i>

        </div>

    </div>


    <div class="form-group">

        <label>
            Gender <span>*</span>
        </label>

        <div class="select-wrapper">

            <select id="employeeGender" required>

                <option value="">
                    Select gender
                </option>

                <option value="Male">
                    Male
                </option>

                <option value="Female">
                    Female
                </option>

            </select>

            <i class="bi bi-chevron-down"></i>

        </div>

    </div>

</div>


                <!-- ROW 5 - ADDRESS & SALARY -->

                <div class="form-row">

                    <div class="form-group">

                        <label>
                            Address <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="employeeAddress"
                            placeholder="Enter employee address"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Salary <span>*</span>
                        </label>

                        <input
                            type="number"
                            id="employeeSalary"
                            placeholder="Enter salary"
                            min="0"
                            step="0.01"
                            required
                        >

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
                                    value="New"
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
        const joiningDate =
            document.getElementById("employeeJoiningDate").value;

        const dateOfBirth =
            document.getElementById("employeeDateOfBirth").value;

        const gender =
            document.getElementById("employeeGender").value;

        const address =
            document.getElementById("employeeAddress").value.trim();

        const salary =
            document.getElementById("employeeSalary").value;

        const status =
            document.getElementById("employeeStatus").value;

        const password =
            document.getElementById("password").value;


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
                !dateOfBirth ||
                !gender ||
                !address ||
                !salary ||
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

            dateOfBirth: dateOfBirth,

            gender: gender,

            address: address,

            salary: Number(salary),

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



}