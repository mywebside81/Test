let profileCount = 1;

window.onload = function() {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    savedProfiles.forEach((profile, index) => {
        profile.id = index + 1; // Assign a serial number
        addProfileToDOM(profile);
    });
    profileCount = savedProfiles.length + 1;
};

function authenticateUser() {
    const id = prompt("Enter ID:");
    const password = prompt("Enter Password:");

    if (id === "Rajkumar" && password === "1") {
        document.getElementById("addForm").style.display = "block";
    } else {
        alert("Invalid ID or Password!");
    }
}

function addProfile() {
    const name = document.getElementById("name").value;
    const className = document.getElementById("className").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const imageFile = document.getElementById("imageFile").files[0];

    if (!name || !className || !rollNumber || !phoneNumber || !imageFile) {
        alert("Please fill out all fields and upload an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function() {
        const imageUrl = reader.result;

        const profile = {
            id: profileCount,
            name,
            className,
            rollNumber,
            phoneNumber,
            imageUrl
        };

        const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
        savedProfiles.push(profile);
        localStorage.setItem("profiles", JSON.stringify(savedProfiles));

        addProfileToDOM(profile);
        profileCount++;

        // Reset the form
        document.getElementById("addForm").style.display = "none";
        document.getElementById("name").value = "";
        document.getElementById("className").value = "";
        document.getElementById("rollNumber").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("imageFile").value = "";
    };
    reader.readAsDataURL(imageFile);
}

function addProfileToDOM(profile) {
    const profileCardContainer = document.getElementById("profileCardContainer");
    const card = document.createElement("div");
    card.className = "profile-card collapsed";
    
    // Toggle the card between collapsed and expanded on click
    card.onclick = function() {
        card.classList.toggle("expanded");
        card.classList.toggle("collapsed");
    };

    const img = document.createElement("img");
    img.src = profile.imageUrl;
    img.alt = profile.name;

    const profileInfo = document.createElement("div");
    profileInfo.className = "profile-info";

    const basicInfo = document.createElement("div");
    basicInfo.className = "basic-info";
    basicInfo.innerHTML = `<div class="name">${profile.name}</div><div class="profile-number">${profile.id}</div>`;

    const details = document.createElement("div");
    details.className = "details";
    details.innerHTML = `<div>Class: ${profile.className}</div><div>Roll No: ${profile.rollNumber}</div><div>Phone: ${profile.phoneNumber}</div>`;

    profileInfo.appendChild(basicInfo);
    profileInfo.appendChild(details);

    card.appendChild(img);
    card.appendChild(profileInfo);
    profileCardContainer.appendChild(card);

    // Add double-click event to delete the profile
    card.addEventListener("dblclick", function() {
        const id = prompt("Enter ID:");
        const password = prompt("Enter Password:");

        if (id === "Rajkumar" && password === "1") {
            profileCardContainer.removeChild(card);
            deleteProfileFromStorage(profile.id);
            adjustSerialNumbers();
        } else {
            alert("Invalid ID or Password!");
        }
    });
}

function deleteProfileFromStorage(profileId) {
    let savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    savedProfiles = savedProfiles.filter(profile => profile.id !== profileId);
    localStorage.setItem("profiles", JSON.stringify(savedProfiles));
}

function adjustSerialNumbers() {
    const profileCardContainer = document.getElementById("profileCardContainer");
    profileCardContainer.innerHTML = ""; // Clear existing cards

    let savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    savedProfiles.forEach((profile, index) => {
        profile.id = index + 1; // Reassign serial numbers
        addProfileToDOM(profile);
    });

    profileCount = savedProfiles.length + 1;
    localStorage.setItem("profiles", JSON.stringify(savedProfiles)); // Update storage
}
