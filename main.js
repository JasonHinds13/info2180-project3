$(document).ready(function(){
    
    $("#form").on('submit', function(event){
        
        event.preventDefault();
        
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var uname = $("#uname").val();
        var pword = $("#pword").val();
        
        var params = 'firstname='+fname+'&lastname='+lname+'&username='+uname+'&password='+pword;
        
        var link = 'https://info2180-project3-jasonhinds13.c9users.io/cheapomail.php';
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                    if (this.status == 200) {
                        $("#status").text("Successfully Added");
                    }
                    else{
                        $("#status").text("Some Unknown Error Occured");
                    }
            }
        };
        
        xmlhttp.open("POST", link, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(params);
    });
    
});