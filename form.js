const form = document.getElementById("employeeForm");




form.addEventListener("submit",function(event){
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
         for (var i = 0; i < genderRadios.length; i++) {
            if (genderRadios[i].checked) {
                selectedGender = genderRadios[i].value;
            }
        }
    
    // let selectedGender = getSelectedGender();
    // if (selectedGender) {
    //     console.log("Selected gender: " + selectedGender);
    // } else {
    //     console.log("No gender selected.");
    // }

// --------------------------------department-------------------------------------------

   
    let checkboxDepartmet = document.querySelectorAll('input[type="checkbox"]');
   
    for (var i = 0; i < checkboxDepartmet.length; i++) {
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

    console.log("Name:", name);
    console.log("Profile:", selectedValue);
    console.log("Gender:", selectedGender);
    console.log("Departments:", selectedDepart);
    console.log("Salary:", selectSalary);
    console.log("Start Date:", startDate);
    console.log("Notes:", notes);
});

// if (radioElement && radioElement.checked) {
 
//     var selectedValue = radioElement.value;
//     console.log("Selected Value: " + selectedValue);
//   } else {
//     console.log("Radio option is not selected.");
// }