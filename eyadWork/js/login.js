

        async function handleLogin() {
            const emailInput = document.getElementById("email").value.trim();
            const passwordInput = document.getElementById("password").value.trim();
            const selectedRoleInput = document.querySelector('input[name="account"]:checked').value;

            if (!emailInput || !passwordInput) {
                alert(" please enter password or email ");
                return;
            }

            try {
                const response = await fetch('../data/user.json');
                const users = await response.json();

                const matchedUser = users.find(user => 
                    user.email === emailInput && 
                    user.password === passwordInput && 
                    user.role === selectedRoleInput
                );

                if (matchedUser) {
                    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
                    
                    alert("تم تسجيل الدخول بنجاح!");
                    
                    if (matchedUser.role === "HR") {
                        window.location.href = "hr-dashboard.html";
                    } else {
                        window.location.href = "employee-dashboard.html";
                    }
                } else {
                    alert("email or password or role is wrong");
                }
            } catch (error) {
                console.error(error);
               
            }
        }