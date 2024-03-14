<?php
require 'vendor/autoload.php'; // Include Composer's autoloader

use MongoDB\Client as MongoDBClient;

// MongoDB URI
$uri = "mongodb://localhost:27017";
$databaseName = "userdata";
$collection = "users"; // Collection name where user data is stored

// Connect to MongoDB
$mongoClient = new MongoDBClient($uri);
$db = $mongoClient->$databaselog;

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Search for user in MongoDB
    $user = $db->$collection->findOne(['email' => $email, 'password' => $password]);

    // Check if user exists
    if ($user) {
        echo "Login successful";
        // Redirect to dashboard or any other page
        // header("Location: dashboard.php");
        // exit();
    } else {
        echo "Invalid email or password";
    }
}
?>
