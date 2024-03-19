<?php
require 'vendor/autoload.php'; // Include Composer's autoloader

use MongoDB\Client as MongoDBClient;

// Connect to MongoDB
$mongoClient = new MongoDBClient('mongodb://localhost:27017');
$collection = $mongoClient->userdata->users;

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $number = $_POST['number'];

    // Insert data into MongoDB
    $insertOneResult = $collection->insertOne([
        'firstName' => $firstName,
        'lastName' => $lastName,
        'gender' => $gender,
        'email' => $email,
        'password' => $password,
        'number' => $number
    ]);

    // Check if insertion was successful
    if ($insertOneResult->getInsertedCount() == 1) {
        echo "User registered successfully";
    } else {
        echo "Error registering user";
    }
}
?>
