let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
let profileCount = profiles.length;

// Function to load profiles from Local Storage
function loadProfiles() {
    const profilesContainer = document.getElementById("profiles-container");
    profilesContainer.innerHTML = "";
    profiles.forEach((profile, index) => {
        createProfileCard(profile.name, profile.subject, profile.image, index + 1);
    });
}

// Handle Add Button Click
function handleAddButtonClick() {
    const id = prompt("Enter ID:");
    const password = prompt("Enter Password:");
    if (id === "Rajkumar" && password === "1") {
        document.getElementById("form-container").classList.remove("hidden");
        document.getElementById("add-button").classList.add("hidden");
    } else {
        alert("Incorrect ID or Password!");
    }
}

// Add Profile Card
function addProfileCard() {
    const nameInput = document.getElementById("name-input").value.trim();
    const subjectInput = document.getElementById("subject-input").value.trim();
    const imageInput = document.getElementById("image-input").files[0];

    if (!nameInput || !subjectInput || !imageInput) {
        alert("Please enter a name, subject, and select an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        profileCount++;
        const profile = { name: nameInput, subject: subjectInput, image: event.target.result };
        profiles.push(profile);
        localStorage.setItem("profiles", JSON.stringify(profiles));
        createProfileCard(nameInput, subjectInput, event.target.result, profileCount);

        // Reset form and hide it
        document.getElementById("name-input").value = "";
        document.getElementById("subject-input").value = "";
        document.getElementById("image-input").value = "";
        document.getElementById("form-container").classList.add("hidden");
        document.getElementById("add-button").classList.remove("hidden");

        alert("Profile Added Successfully!");
    };
    reader.readAsDataURL(imageInput);
}

// Function to create a profile card
function createProfileCard(name, subject, image, number) {
    const profilesContainer = document.getElementById("profiles-container");

    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Profile Image";

    const profileInfo = document.createElement("div");
    profileInfo.className = "profile-info";

    const nameElement = document.createElement("div");
    nameElement.className = "profile-name";
    nameElement.textContent = name;

    const subjectElement = document.createElement("div");
    subjectElement.className = "profile-subject";
    subjectElement.textContent = subject;

    const numberElement = document.createElement("div");
    numberElement.className = "profile-number";
    numberElement.textContent = number;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    // Triple Tap Implementation
    let tapCount = 0;
    profileInfo.addEventListener("click", function() {
        tapCount++;
        setTimeout(() => {
            if (tapCount === 2) {
                deleteButton.style.display = deleteButton.style.display === "none" ? "block" : "none";
                tapCount = 0; // Reset tap count
            } else {
                tapCount = 0; // Reset tap count after a delay if not a triple tap
            }
        }, 400); // Delay to count triple taps
    });

    // Click event to open zoology.html
    profileCard.addEventListener("click", function() {
        window.location.href = "zoology.html";
    });

    // Delete button functionality
    deleteButton.onclick = function() {
        const id = prompt("Enter ID to delete:");
        const password = prompt("Enter Password to delete:");
        if (id === "Rajkumar" && password === "1") {
            profiles = profiles.filter((_, index) => index !== number - 1);
            localStorage.setItem("profiles", JSON.stringify(profiles));
            loadProfiles();
            alert("Profile Deleted Successfully!");
        } else {
            alert("Incorrect ID or Password!");
        }
    };

    profileCard.appendChild(imgElement);
    profileInfo.appendChild(nameElement);
    profileInfo.appendChild(subjectElement);
    profileInfo.appendChild(numberElement);
    profileCard.appendChild(profileInfo);
    profileCard.appendChild(deleteButton);
    profilesContainer.appendChild(profileCard);
}

// Load profiles on page load
window.onload = loadProfiles;
