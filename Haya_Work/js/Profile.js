/* =========================================
   DISPLAY PROFILE PAGE (JavaScript نظيف بالكامل)
========================================= */
function displayProfile() {
    let content = document.getElementById("content");
    
    const user = JSON.parse(localStorage.getItem("currentUser")) || {
        name: "Lujain Okour",
        role: "Employee",
        email: "lujain.okour@company.com",
        phone: "+962 79 123 4567",
        department: "Engineering",
        joiningDate: "Jan 15, 2026"
    };

    content.innerHTML = `
        <section class="content-area">
            
            <div class="page-header">
                <span class="page-label">YOUR ACCOUNT</span>
                <h1>My profile</h1>
                <p>Your personal and work information, in one place.</p>
            </div>

            <!-- Profile View Container -->
            <div id="profileViewContainer">
                <div class="contact-card profile-grid-card" style="padding: 30px;">
                    
                    <!-- Left Card: Avatar & Basic Info -->
                    <div class="profile-sidebar-box">
                        <div class="profile-avatar-lg">
                            ${getInitials(user.name)}
                        </div>
                        <h2 class="profile-name">${user.name}</h2>
                        <span class="profile-role">${user.role}</span>
                        
                        <hr class="profile-divider">
                        
                        <span class="profile-dept">${user.department} Department</span>
                        <span class="profile-joined">Member since ${user.joiningDate}</span>
                    </div>

                    <!-- Right Card: Detailed Info -->
                    <div class="profile-details-box">
                        <h3 class="section-title">Personal information</h3>
                        <p class="form-hint" style="margin-bottom: 25px;">The details linked to your account.</p>

                        <div class="profile-info-grid">
                            <div>
                                <span class="info-label">Username</span>
                                <strong class="info-value">${user.name}</strong>
                            </div>
                            <div>
                                <span class="info-label">Email address</span>
                                <strong class="info-value">${user.email}</strong>
                            </div>
                            <div>
                                <span class="info-label">Phone number</span>
                                <strong class="info-value">${user.phone || "Not specified"}</strong>
                            </div>
                            <div>
                                <span class="info-label">Position</span>
                                <strong class="info-value">${user.role}</strong>
                            </div>
                            <div>
                                <span class="info-label">Department</span>
                                <strong class="info-value">${user.department}</strong>
                            </div>
                            <div>
                                <span class="info-label">Joining date</span>
                                <strong class="info-value">${user.joiningDate}</strong>
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

/* =========================================
   ENABLE EDIT MODE
========================================= */
function enableEditProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser")) || {
        name: "Lujain Okour",
        role: "Employee",
        email: "lujain.okour@company.com",
        phone: "+962 79 123 4567",
        department: "Engineering",
        joiningDate: "Jan 15, 2026"
    };

    const container = document.getElementById("profileViewContainer");
    container.innerHTML = `
        <form id="editProfileForm" onsubmit="saveProfileChanges(event)" class="contact-card profile-grid-card" style="padding: 30px;">
            
            <!-- Left Card: Avatar -->
            <div class="profile-sidebar-box">
                <div class="profile-avatar-lg">
                    ${getInitials(user.name)}
                </div>
                <h2 class="profile-name">${user.name}</h2>
                <span class="profile-role">${user.role}</span>
                
                <button type="button" class="map-open-btn" style="width: 100%;">
                    Change photo
                </button>
                <span class="photo-hint">JPG or PNG 1MB max</span>
            </div>

            <!-- Right Card: Editable Inputs -->
            <div class="profile-details-box">
                <h3 class="section-title">Edit profile</h3>
                <p class="form-hint" style="margin-bottom: 25px;">Update your information, then save your changes.</p>

                <div class="profile-form-grid">
                    <div class="form-group">
                        <label class="form-label">Username</label>
                        <input type="text" id="editName" value="${user.name}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email address</label>
                        <input type="email" id="editEmail" value="${user.email}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone number</label>
                        <input type="text" id="editPhone" value="${user.phone || ''}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Position</label>
                        <input type="text" id="editRole" value="${user.role}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <input type="text" id="editDept" value="${user.department}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Joining date</label>
                        <input type="text" id="editDate" value="${user.joiningDate}" class="form-control">
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

/* =========================================
   SAVE CHANGES
========================================= */
function saveProfileChanges(e) {
    e.preventDefault();

    const updatedUser = {
        name: document.getElementById("editName").value,
        email: document.getElementById("editEmail").value,
        phone: document.getElementById("editPhone").value,
        role: document.getElementById("editRole").value,
        department: document.getElementById("editDept").value,
        joiningDate: document.getElementById("editDate").value
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    displayProfile();
}

/* Helper function */
function getInitials(name) {
    if (!name) return "U";
    return name
        .split(" ")
        .map(n => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}