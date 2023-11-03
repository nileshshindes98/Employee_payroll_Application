var environment = window.location.origin;

const form = $("employeeForm");

const submitbtn = $("#submit");
const updatebtn = $("#update");
if (localStorage.getItem("setEditId")) {
    submitbtn.hide();
    updatebtn.show();
} else {
    submitbtn.show();
    updatebtn.hide();
}

const editId = localStorage.getItem('setEditId');

if (editId) {
    $.ajax({
        url: `http://localhost:3000/employees/` + editId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#name").val(data.name);
            $("#profile" + data.profile).prop("checked", true);
            $("#" + data.gender).prop("checked", true);
            const departmentCheckboxes = $(".department input[name='department']");
            departmentCheckboxes.each(function (index, checkbox) {
                if (data.departments.includes(checkbox.id)) {
                    checkbox.prop("checked", true);
                }
            });
            $("#salary").val(data.salary);
            $("#datePicker").val(data.startDate);
            $("#notes").val(data.notes);
        },
        error: function (error) {
            console.error("Failed to fetch employee data:", error);
        }
    });
}

function submitEditedEmployee() {

    let updatename = $("#name").val();
    // -----------profile-----------
    let profile = $("input[name='radioProfile']");
    let updateprofile;
    updateprofile = profile.filter(":checked").val();
    // -----------gender--------------

    let genderRadios = $("input[name='gender']");
    let updategen
    updategen = genderRadios.filter(":checked").val();
    // --------------------------department-------------------------

    let checkboxDepartmet = $("input[type='checkbox']");
    let updatedepart = [];
    checkboxDepartmet.each(function (index, checkbox) {
        if (checkbox.checked) {
            updatedepart.push(checkbox.id);
        }
    });
    // -----------------salary------------------ 

    let updatesalary = $("#salary").val();

    const updatedate = $("#datePicker").val();

    const updatenote = $("#notes").val();

    const updatedData = {

        name: updatename,
        profile: updateprofile,
        gender: updategen,
        departments: updatedepart,
        salary: updatesalary,
        startDate: updatedate,
        notes: updatenote

    }

    $.ajax({
        url: `http://localhost:3000/employees/${editId}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(updatedData),
    })
        .done(function (data) {
            if (data.ok) {
                window.location.replace(`${environment}/dashboard`);
            } else {
                console.error("Failed to update employee data.");
            }
        })
        .fail(function (error) {
            console.error("Error updating employee data:", error);
        });
}

$("form").on("submit", function (event) {
    event.preventDefault();
    let name = $("#name").val();
    // -----------------------------profile------------------------------------------------

    let profile = $("input[name='radioProfile']");
    let selectedValue = profile.filter(":checked").val();
    // -----------------------------------gender--------------------------------------------  

    let genderRadios = $("input[name='gender']");
    let selectedGender = genderRadios.filter(":checked").val();

    // --------------------------------department-------------------------------------------


    let checkboxDepartmet = $("input[type='checkbox']");
    let selectedDepart = [];
    checkboxDepartmet.each(function (index, checkbox) {
        if (checkbox.checked) {
            selectedDepart.push(checkbox.id);
        }
    });

    // -----------------------------------------salary------------------------------------------- 

    let selectSalary = $("#salary").val();
    const date = $("#datePicker").val();

    const notes = $("#notes").val();

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


    $.ajax({
        url: "http://localhost:3000/employees/",
        method: "POST",
        body: JSON.stringify(employeeData),
        headers: {
            "Content-Type": "application/json",
        }
    }).done(function (employeeData) {
        console.log(employeeData);
    });
});

$("#resetButton").on("click", function (event) {
    $("form").reset();
});

function redirectToDashboard() {
    window.location.replace(`${environment}/dashboard`);
    localStorage.removeItem('setEditId');
}