<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $phone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
    $subject = filter_var($data['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($data['message'], FILTER_SANITIZE_STRING);

    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo json_encode(["message" => "Please fill in all required fields."]);
        exit;
    }

    $to = "niponata1989@gmail.com"; // Replace with your email
    $email_subject = "New Contact Form Submission: " . $subject;
    $email_body = "Name: $name\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";

    $headers = "From: noreply@levshalev.co.il"; // Replace with your domain email

    if (mail($to, $email_subject, $email_body, $headers)) {
        // Webhook Logic
        $configFile = '../data/site_config.json';
        if (file_exists($configFile)) {
            $config = json_decode(file_get_contents($configFile), true);
            if (!empty($config['webhooks']['contactForm'])) {
                $webhookUrl = $config['webhooks']['contactForm'];
                $webhookData = [
                    'name' => $name,
                    'phone' => $phone,
                    'subject' => $subject,
                    'message' => $message,
                    'timestamp' => date('Y-m-d H:i:s')
                ];

                $ch = curl_init($webhookUrl);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
                curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_exec($ch);
                curl_close($ch);
            }
        }

        http_response_code(200);
        echo json_encode(["message" => "Email sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to send email."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
}
?>
