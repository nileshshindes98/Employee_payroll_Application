var environment = window.location.origin;

document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:3000/employees/")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const tableBody = document.getElementById("employeeTableBody");
            const employees = data; // Access the "employees" array

            employees.forEach((employee, index) => {
                const row = document.createElement("tr");
                const profileImage = getProfileImage(employee.profile);
                row.innerHTML = `
                <td></td>
                <td><img src="${profileImage}" alt="Profile"></td>

                    <td>${employee.name}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.departments}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.startDate}</td>
                    <td class="actions">
                    <button onclick="editEmployee(${employee.id})"><img src="/assets/icons/create-black-18dp.svg" alt="edit"></button>
                    <button onclick="deleteEmployee(${employee.id})"><img src="/assets/icons/delete-black-18dp.svg" alt="Delete"></button>
                </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

function deleteEmployee(id) {
console.log('index =>', id);
fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE",
        // body: JSON.stringify(employeeData),
        // headers: {
        //     "Content-Type": "application/json",
        // }
    }).then(response => response.json()).then(data => {
        window.location.reload();
    });
}

function editEmployee(id) {
    window.location.replace(`${environment}/form`);
    localStorage.setItem('setEditId', id);
}

function getProfileImage(profileValue) {
    // Define the base path to the profile images
    const basePath = "/assets/profile-images/";

    // Define a mapping of profile values to image filenames
    const profileImageMap = {
        "1": "Ellipse -2.png",
        "2": "Ellipse -3.png",
        "3": "Ellipse -4.png",
        "4": "Ellipse -1.png",
        // Add more profile values and image filenames as needed
    };

    // Check if the profileValue exists in the mapping
    if (profileValue in profileImageMap) {
        const imageUrl = `${basePath}${profileImageMap[profileValue]}`;
        return imageUrl;
    } else {
        // If the profileValue is not found, return a default image URL
        const defaultImageUrl = `${basePath}default-profile-image.png`; // Update with your default image filename
        return defaultImageUrl;
    }
}

function createNewUser() {
    window.location.replace(`${environment}/form`);
    localStorage.removeItem('setEditId');
}