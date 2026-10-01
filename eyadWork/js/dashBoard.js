let username = document.getElementById("user");
let rolename = document.getElementById("role")
let avatar = document.querySelector(".user-avatar");
let user = localStorage.getItem("loggedInUser");
let role = localStorage.getItem("loggedInUser");

if (user) {
    user = JSON.parse(user);
    role = JSON.parse(role);

    username.textContent = user.name;
    rolename.textContent = user.role;

        let nameParts = user.name.trim().split(" ");

    let initials = nameParts
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");

    avatar.textContent = initials;
}