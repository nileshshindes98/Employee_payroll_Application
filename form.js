var environment = window.location.origin;

const form = document.getElementById("employeeForm");
// const resetButton = document.getElementById("resetButton");

const editId = localStorage.getItem('setEditId');
if (editId) {
    fetch(`http://localhost:3000/employees/${editId}`).then(res => res.json()).then(data => {
        document.getElementById("name").value = data.name;
        document.getElementById(`profile${data.profile}`).checked = true;
        document.getElementById(`${data.gender}`).checked = true;
        // document.querySelectorAll('input[type="checkbox"]');
        document.getElementById("salary").value = data.salary;
        document.getElementById("datePicker").value = data.startDate;
        document.getElementById("notes").value = data.notes;
    });
};

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

// resetButton.addEventListener("click", function (event) {
// form.reset();
// });

function redirectToDashboard() {
    window.location.replace(`${environment}/dashboard`);
    localStorage.removeItem('setEditId');
}