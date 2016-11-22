<?php

$host = getenv('IP');
$username = getenv('C9_USER');
$password = '';
$dbname = 'cheapomail';

// For sessions
// session_start();
// $_SESSION["username"] = "this user";
// $_SESSION["user_id"] = "this";
// session_unset(); //remove all session variables
// session_destroy();

try{
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
}
catch(PDOException $e){
    echo $e;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     
     // user to be added
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $uname = $_POST["username"];
    $pword = hash('sha256', $_POST["password"]);

    // mail to be sent
    $senr = $_POST["sender"];
    $subj = $_POST["subject"];
    $recps = $_POST["recipients"];
    $body = $_POST["body"];
    
    //add a user
    if (isset($uname) && isset($pword) && isset($fname) && isset($lname)){
        $sql = "INSERT INTO users(firstname, lastname, username, password) VALUES('$fname', '$lname', '$uname', '$pword');";
        $stmt = $conn->query($sql);
        echo 'Successfully Added User';
    }
    
    //send a message
    else if (isset($senr) && isset($recps) && isset($subj) && isset($body)){
        
        //get id of sender
        $stmt = $conn->query("SELECT id FROM users WHERE username = $senr");
        $m = $stmt->fetch();
        $sid = $m["id"];
    
        $cdate = date("Y/m/d");
    
        //insert message for each recipient
        foreach($recps as $recp){
            
            //get id of receiver
            $stmt2 = $conn->query("SELECT id FROM users WHERE username = $recp");
            $s = $stmt2->fetch();
            $rid = $s["id"];
    
            // query to be sent
            $q = "INSERT INTO messages(recipient_id, user_id, subject, body, date_sent) VALUES('$sid', '$rid', '$subj', '$body', '$cdate');";
            $stmt3 = $conn->query($q);
        }
        
        echo 'Message Sent';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // user id to recieve mail
    //$rcvr = $_SESSION["user_id"];
    $rcvr = $_GET["id"]; //can get their username instead
    
    if (isset($rcver)){
        getMail($rcvr);
    }
}

// functions to be used

function getMail($rcvr){
    
    $stmt = $conn->query("SELECT * FROM messages WHERE recipient_id = $rcvr");
    $res = $stmt->fetchAll(PDO::ASSOC);
    
    foreach($res as $mail){
        $arr = array(
            "user_id" => $mail["user_id"],
            "subject" => $mail["subject"],
            "body" => $mail["body"]
            );
            
        header('Content-type: application/json');
        echo json_encode($arr);
    }
}