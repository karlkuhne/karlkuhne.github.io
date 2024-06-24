<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Include PHPMailer Autoloader
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'kkuhnemail@gmail.com'; // Your Gmail address
        $mail->Password = 'fuly tobk vjtv dpxe'; // Your App Password for PHPMailer
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable SSL/TLS encryption
        $mail->Port = 465; // SMTP port for SSL/TLS 
        // Optional debugging
        $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Change to SMTP::DEBUG_SERVER for verbose debug output

        // Recipients
        $mail->setFrom($email, $name); // Sender's email and name
        $mail->addAddress('karlkuhne@t-online.de', 'Recipient Name'); // Recipient's email and name

        // Content
        $mail->isHTML(false); // Set email format to plain text (change to true for HTML)
        $mail->Subject = 'Contact Form Submission from ' . $name;
        $mail->Body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";

        // Send email
        $mail->send();
        echo "Email successfully sent";
        // Optionally, redirect to a thank you page
        // header('Location: thank_you.html');
    } catch (Exception $e) {
        echo "Email sending failed. Error: {$mail->ErrorInfo}";
        // Optionally, log the error for debugging
        error_log("Email sending failed: " . $mail->ErrorInfo);
    }
}