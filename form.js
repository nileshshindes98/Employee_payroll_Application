const form = document.getElementById("employeeForm");
const resetButton = document.getElementById("resetButton");

// let ID;
// fetch('http://localhost:3000/employees').then(res => res.json()).then(data => {
//     console.log(data);
//     ID = data.length + 1;
// });


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

    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const startDate = `${day} ${month} ${year}`;

    const notes = document.getElementById("notes").value;

    const employeeData = {
        // id: ID++,
        name: name,
        profile: selectedValue,
        gender: selectedGender,
        departments: selectedDepart,
        salary: selectSalary,
        startDate: startDate,
        notes: notes
    };
    console.log(employeeData);

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

