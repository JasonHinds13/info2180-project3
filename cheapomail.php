<?php

$host = getenv('IP');
$username = getenv('C9_USER');
$password = '';
$dbname = 'cheapomail';

// For sessions
// session_start();
// $_SESSION["user"] = "this user";
// session_unset(); //remove all session variables
// session_destroy();

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     
     // user to be added
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $uname = $_POST["username"];
    $pword = $_POST["password"];

    // mail to be sent
    $senr = $_POST["sender"];
    $subj = $_POST["subject"];
    $recps = $_POST["recipients"];
    $body = $_POST["body"];
    
    if (isset($uname) && isset($pword) ){
        createUser($fname, $lname, $uname, $pword);
    }
    
    else if (isset($senr) && isset($recps) ){
        sendMail($senr, $recps, $subj, $body);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // user id to recieve mail
    $rcvr = $_GET["id"];
    
    if (isset($rcver)){
        getMail($rcvr);
    }
}

// functions to be used

function createUser($fname, $lname, $uname, $pword){
    
    $stmt = $conn->exec("INSERT INTO users(firstname, lastname, username, password) VALUES($fname, $lname, $uname, $pword)");
}

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

function sendMail($senr, $recp, $subj, $body){
    
    //get ids of sender and recipients
    $stmt = $conn->query("SELECT id FROM users WHERE username = $senr");
    $m = $stmt->fetch();
    $sid = $m["id"];
    
    //insert message for each recipient
    foreach($recps as $recp){
    
        $stmt2 = $conn->query("SELECT id FROM users WHERE username = $recp");
        $s = $stmt2->fetch();
        $rid = $s["id"];
    
        // query to be sent
        $q = "INSERT INTO messages(recipient_id, user_id, subject, body) VALUES($sid, $rid,$subj, $body)";
    
        $stmt3 = $conn->exec($q);
    }
}