<?php

$host = getenv('IP');
$username = getenv('C9_USER');
$password = '';
$dbname = 'cheapomail';

// For sessions
session_start();
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
    
    // login
    $logname = $_POST["logname"];
    $logpass = hash('sha256', $_POST["logpass"]);

    // mail to be sent
    $subj = $_POST["subject"];
    $recps = $_POST["recipients"];
    $body = $_POST["body"];
    
    //add a user
    if (isset($uname) && isset($pword) && isset($fname) && isset($lname)){
        $sql = "INSERT INTO users(firstname, lastname, username, password) VALUES('$fname', '$lname', '$uname', '$pword');";
        $stmt = $conn->query($sql);
        echo 'Successfully Added User';
    }
    
    //login
    if(isset($logname) && isset($logpass)){
        $sql = "SELECT * FROM users WHERE username = '$logname' AND password = '$logpass';";
        $stmt = $conn->query($sql);
        $res = $stmt->fetch();
        
        if($res != null){
            $_SESSION["username"] = $res["username"];
            $_SESSION["user_id"] = $res["id"];
            echo "User Found";
        }
        else{
            echo "No User Found";
        }
    }
    
    //send a message
    else if (isset($recps) && isset($subj) && isset($body)){
        
        //get id of sender
        $sid = $_SESSION["user_id"];
    
        $cdate = date("Y/m/d");
        
        $recps = explode(" ", $recp); //split strings by space
    
        //insert message for each recipient
        foreach($recps as $recp){
            
            //get id of receiver
            $stmt2 = $conn->query("SELECT id FROM users WHERE username = '$recps'");
            $s = $stmt2->fetch();
            $rid = $s["id"];
    
            // query to be sent
            $q = "INSERT INTO messages(recipient_id, user_id, subject, body, date_sent) VALUES('$rid', '$sid', '$subj', '$body', '$cdate');";
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
}