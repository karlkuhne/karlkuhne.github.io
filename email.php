<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form inputs
    $name = filter_var(trim($_POST['nameInput']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['emailInput']), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST['messageInput']), FILTER_SANITIZE_STRING);

    // Prepare the data to be written
    $data = "Name: $name\nEmail: $email\nMessage: $message\n\n";

    // Write data to inbox.txt
    $file = 'inbox.txt';
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        echo "Thank you for your message, $name. We have received your message.";
    } else {
        echo "Sorry, there was an error saving your message. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
