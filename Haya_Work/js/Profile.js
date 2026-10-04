function displayProfile() {
    let content = document.getElementById("content");
    

    let user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    let avatarContent = "";
    if (user.picture) {
        avatarContent = `<img src="${user.picture}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    } else {
        avatarContent = getInitials(user.name);
    }

    content.innerHTML = `
        <section class="content-area">
            <div class="page-header">
                <span class="page-label">YOUR ACCOUNT</span>
                <h1>My profile</h1>
                <p>Your personal and work information, in one place.</p>
            </div>

            <div id="profileViewContainer">
                <div class="contact-card profile-grid-card" style="padding: 30px;">
                    
                    <div class="profile-sidebar-box" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                        <div class="profile-avatar-lg" style="width: 100px; height: 100px; border-radius: 50%; background-color: #e0f2fe; color: #0369a1; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; overflow: hidden; margin-bottom: 15px;">
                            ${avatarContent}
                        </div>
                        <h2 class="profile-name">${user.name || "User"}</h2>
                        <span class="profile-role">${user.role || "Employee"}</span>
                        
                        <hr class="profile-divider" style="width: 100%; margin: 20px 0;">
                        
                        <span class="profile-dept">${user.department || "General"} Department</span>
                        <span class="profile-joined">Member since ${user.joiningDate || "2026"}</span>
                    </div>

                    <div class="profile-details-box">
                        <h3 class="section-title">Personal information</h3>
                        <p class="form-hint" style="margin-bottom: 25px;">The details linked to your account.</p>

                        <div class="profile-info-grid">
                            <div>
                                <span class="info-label">Username</span>
                                <strong class="info-value">${user.name || "-"}</strong>
                            </div>
                            <div>
                                <span class="info-label">Email address</span>
                                <strong class="info-value">${user.email || "-"}</strong>
                            </div>
                            <div>
                                <span class="info-label">Phone number</span>
                                <strong class="info-value">${user.phone || "Not specified"}</strong>
                            </div>
                            <div>
                                <span class="info-label">Position</span>
                                <strong class="info-value">${user.role || "-"}</strong>
                            </div>
                            <div>
                                <span class="info-label">Department</span>
                                <strong class="info-value">${user.department || "-"}</strong>
                            </div>
                            <div>
                                <span class="info-label">Joining date</span>
                                <strong class="info-value">${user.joiningDate || "-"}</strong>
                            </div>
                        </div>

                        <div class="profile-actions">
                            <button class="submit-btn" style="width: auto; margin-left: auto; display: inline-flex;" onclick="enableEditProfile()">
                                Edit Profile <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `;
}

function enableEditProfile() {
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    let avatarContent = "";
    if (user.picture) {
        avatarContent = `<img src="${user.picture}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    } else {
        avatarContent = getInitials(user.name);
    }

    const container = document.getElementById("profileViewContainer");
    container.innerHTML = `
        <form id="editProfileForm" onsubmit="saveProfileChanges(event)" class="contact-card profile-grid-card" style="padding: 30px;">
            
            <!-- Left Card: Avatar & Photo Update -->
            <div class="profile-sidebar-box" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="profile-avatar-lg" style="width: 100px; height: 100px; border-radius: 50%; background-color: #e0f2fe; color: #0369a1; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; overflow: hidden; margin-bottom: 15px;">
                    ${avatarContent}
                </div>
                <h2 class="profile-name">${user.name || "User"}</h2>
                <span class="profile-role">${user.role || "Employee"}</span>
                
                <input type="file" id="photoInput" accept="image/png, image/jpeg" hidden onchange="changeProfilePhoto(event)">

                <button type="button" class="map-open-btn" style="width: 100%; margin-top: 15px;" onclick="document.getElementById('photoInput').click()">
                    Change photo
                </button>
                <span class="photo-hint" style="margin-top: 5px; font-size: 12px; color: #666;">JPG or PNG 1MB max</span>
            </div>

            <!-- Right Card: Details (Phone editable, others read-only) -->
            <div class="profile-details-box">
                <h3 class="section-title">Edit profile</h3>
                <p class="form-hint" style="margin-bottom: 25px;">You can update your phone number below.</p>

                <div class="profile-info-grid">
                    <div>
                        <span class="info-label">Username</span>
                        <strong class="info-value" style="color: #4b5563;">${user.name || ''}</strong>
                    </div>
                    <div>
                        <span class="info-label">Email address</span>
                        <strong class="info-value" style="color: #4b5563;">${user.email || ''}</strong>
                    </div>
                    
                    <!-- الحقل الوحيد المسموح للموظف بتعديله -->
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label" style="display: block; margin-bottom: 5px; font-size: 13px; color: #374151;">Phone number</label>
                        <input type="text" id="editPhone" value="${user.phone || ''}" class="form-control" placeholder="Enter phone number" style="width: 100%;">
                    </div>

                    <div>
                        <span class="info-label">Position</span>
                        <strong class="info-value" style="color: #4b5563;">${user.role || ''}</strong>
                    </div>
                    <div>
                        <span class="info-label">Department</span>
                        <strong class="info-value" style="color: #4b5563;">${user.department || 'General'}</strong>
                    </div>
                    <div>
                        <span class="info-label">Joining date</span>
                        <strong class="info-value" style="color: #4b5563;">${user.joiningDate || '2026'}</strong>
                    </div>
                </div>

                <div class="profile-actions flex-end" style="margin-top: 35px; display: flex; justify-content: flex-end; gap: 10px;">
                    <button type="button" class="map-open-btn" onclick="displayProfile()">
                        Cancel
                    </button>
                    <button type="submit" class="submit-btn" style="width: auto; margin-top: 0;">
                        Save Changes <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </form>
    `;
}

function saveProfileChanges(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const updatedUser = {
        ...currentUser,
        phone: document.getElementById("editPhone").value.trim()
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));


    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeIndex = employees.findIndex(emp => {
        if (currentUser.id !== undefined && emp.id !== undefined) {
            return String(emp.id) === String(currentUser.id);
        }
        return emp.email === currentUser.email;
    });

    if (employeeIndex !== -1) {
        employees[employeeIndex].phone = updatedUser.phone;
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    displayProfile();
    alert("Phone number updated successfully!");
}

function getInitials(name) {
    if (!name) return "U";
    return name
        .split(" ")
        .map(n => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function changeProfilePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
        alert("Image must be less than 1MB");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
        user.picture = reader.result;

        localStorage.setItem("loggedInUser", JSON.stringify(user));

        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        const employeeIndex = employees.findIndex(emp => {
            if (user.id !== undefined && emp.id !== undefined) {
                return String(emp.id) === String(user.id);
            }
            return emp.email === user.email;
        });

        if (employeeIndex !== -1) {
            employees[employeeIndex].picture = reader.result;
            localStorage.setItem("employees", JSON.stringify(employees));
        }

        displayProfile();
    };

    reader.readAsDataURL(file);
}