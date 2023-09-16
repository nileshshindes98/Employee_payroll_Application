var dataArray = [];
var classCss = ["first", "second", "third"]


function submit() {
    const name = $('#name').val();
    dataArray.push(name);

    $('#name').val(" ");
    console.log(dataArray);

    var display = []

    $.each(dataArray, function(index, value) {
        const cssClassIndex = index % classCss.length;
        
        display =`<span class="${classCss[cssClassIndex]}">${value}</span><br>`
    
    })
    $('#display').append(display);
}






// function submit(){
//     const name = $('#name').val();
//     const className = $('input[name="class"]:checked').val();

//     let sendData = {
//         "name": name,
//         "class": className
//     }

//     console.log(sendData);
//     dataArray.push(sendData);
  

//     let display = dataArray.map(i => `<span class="${i.class}">${i.name}</span><br>`);
//     $('#display').html(display);
// }