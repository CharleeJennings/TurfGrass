<?php
session_start();
require_once 'class.user.php';

$reg_user = new USER();

if($reg_user->is_logged_in()!="")
{
	$reg_user->redirect('home.php');
}


if(isset($_POST['btn-signup']))
{
	$uname = trim($_POST['txtuname']);
	$email = trim($_POST['txtemail']);
	$upass = trim($_POST['txtpass']);
    $uloc = trim($_POST['txtloc']);
	$code = md5(uniqid(rand()));
	
	$stmt = $reg_user->runQuery("SELECT * FROM tbl_users WHERE userEmail=:email_id");
	$stmt->execute(array(":email_id"=>$email));
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	
	if($stmt->rowCount() > 0)
	{
		$msg = "
		      <div class='alert alert-error'>
				<button class='close' data-dismiss='alert'>&times;</button>
					<strong>Sorry!</strong> An account with that email already exists. Please try another one. If you've forgotten your password, click on \"Forgot my password\".
			  </div>
			  ";
	}
	else
	{
		if($reg_user->register($uname,$email,$upass,$uloc,$code))
		{			
			$id = $reg_user->lasdID();		
			$key = base64_encode($id);
			$id = $key;
			
			$message = "					
						Hello $uname,
						<br /><br />
						Welcome to GreensCast!<br/>
						To complete your registration, please clink the link below!
						<br /><br />
						<a href='http://greenscast.com/verify.php?id=$id&code=$code'>Confirm Registration</a>
						<br /><br />
						Thanks,<br />The greenscast Team";
						
			$subject = "Confirm Registration";
						
			$reg_user->send_mail($email,$message,$subject);	
			$msg = "
					<div class='alert alert-success'>
						<button class='close' data-dismiss='alert'>&times;</button>
						<strong>Success!</strong>  We've sent an email to $email.
                    Please click on the confirmation link in the email to create your account. 
			  		</div>
					";
		}
		else
		{
			echo "Error, Query could no execute...";
		}		
	}
}
?>
    <!DOCTYPE html>
    <html>

    <head>
        <title>Signup | GreensCast</title>
        <!-- Bootstrap -->
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
        <link href="assets/styles.css" rel="stylesheet" media="screen">
        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>

    <body id="login">
        <div class="container">
            <?php if(isset($msg)) echo $msg;  ?>
                <form class="form-signin" method="post">
                    <h2 class="form-signin-heading">Sign Up</h2>
                    <hr />
                    <input type="text" class="input-block-level" placeholder="Full Name" name="txtuname" required />
                    <input type="email" class="input-block-level" placeholder="Email address" name="txtemail" required />
                    <input type="password" class="input-block-level" placeholder="Password" name="txtpass" required />
                    <input type="text" class="input-block-level" placeholder="Enter your location or address" name="txtloc" required />
                    <hr />
                    <button class="btn btn-large btn-primary" type="submit" name="btn-signup">Sign Up</button> <a href="signin.php" style="float:right;" class="btn btn-large">Sign In</a> </form>
        </div>
        <!-- /container -->
        <script src="vendors/jquery-1.9.1.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
    </body>

    </html>