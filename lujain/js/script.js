// =====================================================
// EMPLOYEE DETAILS PAGE
// =====================================================


// Back To Employees

const backBtn = document.getElementById("backBtn");


if (backBtn) {

    backBtn.addEventListener("click", function () {

        window.location.href = "employees.html";

    });

}



// Edit Employee

const editBtn = document.getElementById("editBtn");


if (editBtn) {

    editBtn.addEventListener("click", function () {

        console.log("Edit Employee clicked");

    });

}



// View More Salary

const viewMore = document.getElementById("viewMore");


if (viewMore) {

    viewMore.addEventListener("click", function () {

        console.log("View more salary details");

    });

}



// =====================================================
// EMPLOYEES PAGE
// =====================================================


// Get all View buttons

const viewButtons = document.querySelectorAll(".view-btn");


viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        window.location.href = "employee-details.html";

    });

});



// =====================================================
// SEARCH
// =====================================================

const employeeSearch =
    document.getElementById("employeeSearch");


const employeeRows =
    document.querySelectorAll(".employee-row");


if (employeeSearch) {

    employeeSearch.addEventListener("input", function () {

        const searchValue =
            employeeSearch.value.toLowerCase();


        employeeRows.forEach(function (row) {

            const employeeName =
                row.dataset.name.toLowerCase();


            if (employeeName.includes(searchValue)) {

                row.style.display = "grid";

            } else {

                row.style.display = "none";

            }

        });

    });

}



// =====================================================
// DEPARTMENT FILTER
// =====================================================

const departmentFilter =
    document.getElementById("departmentFilter");


if (departmentFilter) {

    departmentFilter.addEventListener("change", filterEmployees);

}



// =====================================================
// STATUS FILTER
// =====================================================

const statusFilter =
    document.getElementById("statusFilter");


if (statusFilter) {

    statusFilter.addEventListener("change", filterEmployees);

}



// =====================================================
// FILTER FUNCTION
// =====================================================

function filterEmployees() {

    const selectedDepartment =
        departmentFilter
            ? departmentFilter.value
            : "all";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    employeeRows.forEach(function (row) {

        const employeeDepartment =
            row.dataset.department;


        const employeeStatus =
            row.dataset.status;


        const departmentMatches =
            selectedDepartment === "all" ||
            employeeDepartment === selectedDepartment;


        const statusMatches =
            selectedStatus === "all" ||
            employeeStatus === selectedStatus;


        if (departmentMatches && statusMatches) {

            row.style.display = "grid";

        } else {

            row.style.display = "none";

        }

    });

}
// ======================================================
// PAGE 3
// EMPLOYEES PAYROLL
// ======================================================


// ------------------------------------------------------
// Get Payroll Elements
// ------------------------------------------------------

const payrollSearch =
    document.getElementById("payrollSearch");


const payrollDepartment =
    document.getElementById("payrollDepartment");


const payrollStatus =
    document.getElementById("payrollStatus");


const payrollRows =
    document.querySelectorAll(".payroll-row");


const payrollViewButtons =
    document.querySelectorAll(".payroll-view");


const addEmployeeBtn =
    document.getElementById("addEmployeeBtn");



// ======================================================
// SEARCH
// ======================================================

if (payrollSearch) {

    payrollSearch.addEventListener("input", function () {

        filterPayrollEmployees();

    });

}



// ======================================================
// DEPARTMENT FILTER
// ======================================================

if (payrollDepartment) {

    payrollDepartment.addEventListener(
        "change",
        function () {

            filterPayrollEmployees();

        }
    );

}



// ======================================================
// STATUS FILTER
// ======================================================

if (payrollStatus) {

    payrollStatus.addEventListener(
        "change",
        function () {

            filterPayrollEmployees();

        }
    );

}



// ======================================================
// FILTER FUNCTION
// ======================================================

function filterPayrollEmployees() {


    // Search text

    const searchValue =
        payrollSearch
            ? payrollSearch.value.toLowerCase().trim()
            : "";


    // Department

    const departmentValue =
        payrollDepartment
            ? payrollDepartment.value
            : "all";


    // Status

    const statusValue =
        payrollStatus
            ? payrollStatus.value
            : "all";



    payrollRows.forEach(function (row) {


        const employeeName =
            row.dataset.name.toLowerCase();


        const employeeDepartment =
            row.dataset.department;


        const employeeStatus =
            row.dataset.status;



        // Search match

        const searchMatches =
            employeeName.includes(searchValue);



        // Department match

        const departmentMatches =
            departmentValue === "all" ||
            employeeDepartment === departmentValue;



        // Status match

        const statusMatches =
            statusValue === "all" ||
            employeeStatus === statusValue;



        // Show / Hide

        if (
            searchMatches &&
            departmentMatches &&
            statusMatches
        ) {

            row.style.display = "grid";

        } else {

            row.style.display = "none";

        }

    });

}



// ======================================================
// VIEW EMPLOYEE
// ======================================================

payrollViewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        window.location.href =
            "employee-details.html";

    });

});



// ======================================================
// ADD EMPLOYEE
// ======================================================

if (addEmployeeBtn) {

    addEmployeeBtn.addEventListener(
        "click",
        function () {

            console.log(
                "Add Employee clicked"
            );


            /*
                لما تعملوا صفحة Add Employee
                لاحقاً:

                window.location.href =
                "add-employee.html";
            */

        }
    );

}