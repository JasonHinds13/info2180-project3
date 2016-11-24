/* global $ */

$(document).ready(function(){
    
    var link = 'cheapomail.php?getmail=true';
    
    $.ajax(link,{
       method: 'GET' 
    }).done(function(res){
        $("#mail").html(res);
    }).fail(function(){
        $("#mail").html("<p>Some Error Occured</p>");
    });
    
});