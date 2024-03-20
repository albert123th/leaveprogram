<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate username and password (dummy validation for demonstration)
    $username = $_POST['user'];
    $password = $_POST['password'];

    // Check if username and password are correct (dummy check)
    if ($username == "admin" && $password == "admin123") {
        // Redirect to applyleave.html page if login is successful
        header("Location: applyleave.html");
        exit();
    } else {
        // Display error message if login is unsuccessful
        echo "<script>alert('Invalid username or password');</script>";
    }
}
?>
