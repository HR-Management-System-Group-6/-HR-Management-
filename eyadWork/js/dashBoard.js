let username = document.getElementById("user");
let rolename = document.getElementById("role");
let avatar = document.querySelector(".user-avatar");

let user = localStorage.getItem("loggedInUser");

// Get Add Employee sidebar item
let addEmployeeNav = document.getElementById("addEmployeeNav");

if (user) {

    // Convert stored JSON string to object
    user = JSON.parse(user);

    // Display username
    username.textContent = user.name;

    // Display role
    rolename.textContent = user.role;

    // ==============================
    // SHOW/HIDE ADD EMPLOYEE
    // ==============================

    if (user.role && user.role.toLowerCase() === "hr") {
        // HR can see Add Employee
        addEmployeeNav.style.display = "flex";
    } else {
        // Employee cannot see Add Employee
        addEmployeeNav.style.display = "none";
    }

    // ==============================
    // USER INITIALS
    // ==============================

    let nameParts = user.name.trim().split(" ");

    let initials = nameParts
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");

    avatar.textContent = initials;

} else {

    // If there is no logged-in user
    if (addEmployeeNav) {
        addEmployeeNav.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", function () {

    if (typeof displayDashboardHome === "function") {
        displayDashboardHome();
    }

});