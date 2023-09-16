
function addNumberBytwo() {

    let num = 0;
    const increment = 2
    

    let inputData = $('#number').val();
    num = parseInt(inputData);
    
    function startSum(){
        num *= increment;
        $('#displayData').html(num);
    }

     var startInterval = setInterval(startSum, 2000); 
}




function stopTimmer(){
   
    window.location.href = "/review.html";  
}
