var environment = window.location.origin;

$(document).ready(function() {

    $.ajax({
        url: "http://localhost:3000/employees/",
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tableBody = $("#employeeTableBody");
            const employees = data; // Access the "employees" array

            employees.forEach(function(employee, index) {
                const row = $("<tr>");
                const profileImage = getProfileImage(employee.profile);
                row.html(`
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
                `);
                tableBody.append(row);
            });
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
});

function deleteEmployee(id) {
    console.log('index =>', id);
    $.ajax({
        url: "http://localhost:3000/employees/" + id,
        type: "DELETE",
        dataType: "json",
        success: function(data) {
            window.location.reload();
        },
        error: function(error) {
            console.error("Error deleting employee:", error);
        }
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
    // localStorage.removeItem('setEditId');
}