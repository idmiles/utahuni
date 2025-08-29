<?php
if (isset($_POST['Email'])) {

	$error = false;
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "elias@utahuni.org";
    $email_subject = "Email Form Test";

    function problem($error)
    {
		echo '<div class="d-flex p-3 flex-column rounded bg-danger text-white align-text-center w-50 mx-auto">';
        echo 'We are very sorry, but there were error(s) found with the form you submitted.';
        echo 'These errors appear below.<span class="fw-bold">';
        echo $error;
        echo '</span>Please go back and fix these errors.';
		echo '</div><div class=" my-3 d-flex justify-content-center"><a class="btn btn-md btn-primary mx-auto" href="contact.html">Go Back</a></div>';
        $error = true;
    }

    // validation expected data exists
    if (
        !isset($_POST['First']) ||
        !isset($_POST['Last']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Message'])
    ) {
        problem('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $first = $_POST['First']; // required
    $last = $_POST['Last']; // required
    $email = $_POST['Email']; // required
    $message = $_POST['Message']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email)) {
        $error_message .= 'The Email address you entered does not appear to be valid.<br>';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if (!preg_match($string_exp, $first) && !preg_match($string_exp,$last)) {
        $error_message .= 'The Name you entered does not appear to be valid.<br>';
    }

    if (strlen($message) < 2) {
        $error_message .= 'The Message you entered do not appear to be valid.<br>';
    }

    $email_message = "From utahuni.org contact page:.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: " . clean_string($first);
    $email_message .= " " . clean_string($last) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Message: " . clean_string($message) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
	if(!$error)
	{
		mail($email_to, $email_subject, $email_message, $headers);
	}
?>

    <!-- include your success message below -->
<!DOCTYPE html>
<html>
<head>
<script src ="js/jquery-3.6.0.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/script.js"></script>
<!--Fonts-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
</head>
<body class="cover">
<div id="page-container">
<div id="content-wrap">
<!--Navbar-->
<nav class="navbar navbar-expand-lg bg-light mb-0 py-0">
  <div class="container-fluid w-100 py-3">
	<a class="navbar-brand" href="index.html">
		<img src="img/logo.png" width="100" height="100" alt="Utah Unicycle Club Logo">
	</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container-fluid collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link clink fw-bold p-2" href="about.html">About</a>
        </li>
		<li class="nav-item">
          <a class="nav-link clink fw-bold p-2" href="photos.html">Gallery</a>
        </li>
        <li class="nav-item">
          <a class="nav-link clink fw-bold p-2" href="calendar.html">Calendar</a>
        </li>
		<li class="nav-item">
          <a class="nav-link clink fw-bold activepage p-2" href="contact.html">Contact Us</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<!--Main body-->
<div class="container-fluid indexbody" style="height: 600;">
<?php

if (strlen($error_message) > 0) {
        problem($error_message);
    }else{
		echo'<div class="d-flex p-3 flex-column bg-lblue container w-50 rounded mx-auto align-text-center">Thank you! Your message has been sent successfully</div>';
	}

?>

</div>
<!--Footer-->
<footer class="container-fluid bg-black text-light row mx-0 px-0 my-0 py-4" style="height: 90px;">
	<div class="col">	
	<a href="index.html" class="icon"><p style="margin-top:10px;">Utah Unicycle Club</p></a>
	</div>
	<div class="col">
	<!--EMPTY-->
	</div>
	<div class="col d-flex justify-content-center">
		<a href="https://www.instagram.com/utahuni/">
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="mx-2 icon bi bi-instagram" viewBox="0 0 16 16">
		<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
		</svg>
		</a>
		<a href="https://discord.com/invite/jCGyGj9hzn">
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="mx-2 icon bi bi-discord" viewBox="0 0 16 16">
		<path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
		</svg>
		</a>
		<a href="contact.html">
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="mx-2 icon bi bi-envelope" viewBox="0 0 16 16">
		<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
		</svg>
		</a>
	</div>
</footer>
</div>
</div>
</body>
</html>
<?php
}
?>