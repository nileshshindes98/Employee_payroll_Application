var environment = window.location.origin;

const form = document.getElementById("employeeForm");

// const resetButton = document.getElementById("resetButton");

const submitbtn = document.getElementById("submit");
const updatebtn = document.getElementById("update");
if (localStorage.getItem("setEditId")) {
    submitbtn.style.display = "none";
    updatebtn.style.display = "block";
} else {
    submitbtn.style.display = "block";
    updatebtn.style.display = "none";
}


// ---------------------------edit data------------------------------------------

const editId = localStorage.getItem('setEditId');

if (editId) {
    fetch(`http://localhost:3000/employees/${editId}`).then(res => res.json()).then(data => {
        document.getElementById("name").value = data.name;
        document.getElementById(`profile${data.profile}`).checked = true;
        document.getElementById(`${data.gender}`).checked = true;
        const departmentCheckboxes = document.querySelectorAll('.department input[name="department"]');
        departmentCheckboxes.forEach(checkbox => {
            if (data.departments.includes(checkbox.id)) {
                checkbox.checked = true;
            }
        });
        document.getElementById("salary").value = data.salary;
        document.getElementById("datePicker").value = data.startDate;
        document.getElementById("notes").value = data.notes;
    })
        .catch(error => {
            console.error("Failed to fetch employee data:", error);
        });
}

function submitEditedEmployee() {

    let updatename = document.getElementById("name").value;
    // -----------profile-----------
    let profile = document.getElementsByName("radioProfile")
    let updateprofile;
    for (let i = 0; i < profile.length; i++) {
        if (profile[i].checked) {
            updateprofile = profile[i].value;
            break;
        }
    }
    // -----------gender--------------

    let genderRadios = document.getElementsByName("gender");
    let updategen
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            updategen = genderRadios[i].value;
        }
    }
    // --------------------------department-------------------------

    let checkboxDepartmet = document.querySelectorAll('input[type="checkbox"]');
    let updatedepart = [];
    for (let i = 0; i < checkboxDepartmet.length; i++) {
        if (checkboxDepartmet[i].checked) {
            updatedepart.push(checkboxDepartmet[i].id);
        }
    }
    // -----------------salary------------------ 

    let updatesalary = document.getElementById("salary").value;

    const updatedate = document.getElementById("datePicker").value;

    const updatenote = document.getElementById("notes").value;

    const updatedData = {

        name: updatename,
        profile: updateprofile,
        gender: updategen,
        departments: updatedepart,
        salary: updatesalary,
        startDate: updatedate,
        notes: updatenote

    }

    fetch(`http://localhost:3000/employees/${editId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
        .then(response => {
            if (response.ok) {
                window.location.replace(`${environment}/dashboard`);
            } else {
                console.error("Failed to update employee data.");
            }
        })
        .catch(error => {
            console.error("Error updating employee data:", error);
        });
}




// -----------------------------------------formSubmit--------------------------------------

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    // -----------------------------profile------------------------------------------------

    let profile = document.getElementsByName("radioProfile")
    let selectedValue;
    for (let i = 0; i < profile.length; i++) {
        if (profile[i].checked) {
            selectedValue = profile[i].value;
            break;
        }
    }
    // -----------------------------------gender--------------------------------------------  

    let genderRadios = document.getElementsByName("gender");
    let selectedGender
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            selectedGender = genderRadios[i].value;
        }
    }

    // --------------------------------department-------------------------------------------


    let checkboxDepartmet = document.querySelectorAll('input[type="checkbox"]');
    let selectedDepart = [];
    for (let i = 0; i < checkboxDepartmet.length; i++) {
        if (checkboxDepartmet[i].checked) {
            selectedDepart.push(checkboxDepartmet[i].id);
        }
    }

    // -----------------------------------------salary------------------------------------------- 

    let selectSalary = document.getElementById("salary").value;

    // ---------------------------------------------date--------------------------------------------    

    // const day = document.getElementById("day").value;
    // const month = document.getElementById("month").value;
    // const year = document.getElementById("year").value;
    // const startDate = `${day} ${month} ${year}`;

    const date = document.getElementById("datePicker").value;

    const notes = document.getElementById("notes").value;

    const employeeData = {
        // id: ID++,
        name: name,
        profile: selectedValue,
        gender: selectedGender,
        departments: selectedDepart,
        salary: selectSalary,
        startDate: date,
        notes: notes
    };


    fetch("http://localhost:3000/employees/", {
        method: "POST",
        body: JSON.stringify(employeeData),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json()).then(data => {
        console.log(data);
    });




});



// --------------------------------------resetButton-----------------------------------------------------

resetButton.addEventListener("click", function (event) {
form.reset();
});

function redirectToDashboard() {
    window.location.replace(`${environment}/dashboard`);
    localStorage.removeItem('setEditId');
}