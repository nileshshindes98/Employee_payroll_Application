const form = document.getElementById("employeeForm");
const resetButton = document.getElementById("resetButton");


// -----------------------------------------formSubmit--------------------------------------

form.addEventListener("submit", function (event) {
    // console.log(form);
    event.preventDefault();
    let name = document.getElementById("name").value;
    // -----------------------------profile------------------------------------------------

    let profile = document.getElementsByName("radioProfile")
    let selectedValue;
    for (let i = 0; i < profile.length; i++) {
        // console.log(profile[i]);
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

    for (let i = 0; i < checkboxDepartmet.length; i++) {
        if (checkboxDepartmet[i].checked) {
            selectedDepart = checkboxDepartmet[i].id;
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
        name: name,
        profile: selectedValue,
        gender: selectedGender,
        departments: selectedDepart,
        salary: selectSalary,
        startDate: startDate,
        notes: notes
    };
    console.log(employeeData);
    $.ajax({

        type: "POST",
        url: "http://localhost:3000/employees",
        contentType: "application/json",
        data: JSON.stringify(employeeData),
        success: function (data) {
            console.log("Data saved successfully :", data);
        },
        error: function (error) {
            console.error("failed to save the data ", error);
        }
    });
});

// --------------------------------------resetButton-----------------------------------------------------

resetButton.addEventListener("click", function (event) {
    form.reset();
});

