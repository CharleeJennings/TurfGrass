<?php
header('Access-Control-Allow-Origin: *');
session_start();
require_once 'class.user.php';
$user_home = new USER();

if(!$user_home->is_logged_in())
{
	$user_home->redirect('signin.php');
}

$stmt = $user_home->runQuery("SELECT * FROM tbl_users WHERE userID=:uid");
$stmt->execute(array(":uid"=>$_SESSION['userSession']));
$row = $stmt->fetch(PDO::FETCH_ASSOC);

$location = $row['userLocation'];
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Turfgrass Weather Console</title>
        <!-- Bootstrap Core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom CSS -->
        <link href="css/sb-admin.css" rel="stylesheet">
        <!-- Morris Charts CSS -->
        <link href="css/plugins/morris.css" rel="stylesheet">
        <!-- Custom Fonts -->
        <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    </head>

    <body>
        <div id="wrapper">
            <!-- Navigation -->
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="home.php">Turfgrass Weather Console</a> </div>
                <!-- Top Menu Items -->
                <ul class="nav navbar-right top-nav">
                    <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user" id="user-name"></i> <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li> <a href="#"><i class="fa fa-fw fa-user"></i> Profile</a> </li>
                            <li class="divider"></li>
                            <li> <a href="logout.php"><i class="fa fa-fw fa-power-off"></i> Log Out</a> </li>
                        </ul>
                    </li>
                </ul>
                <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav side-nav">
                        <li class="active"> <a href="home.php"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a> </li>
                        <li> <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i> Weeds<i class="fa fa-fw fa-caret-down"></i></a>
                            <ul id="demo" class="collapse">
                                <li> <a href="bluegrassSeedheadPage.php">Bluegrass Seedhead</a> </li>
                                <li> <a href="commonChickweedPage.php">Common Chickweed</a> </li>
                                <li> <a href="fieldSandburPage.php">Field Sandbur</a> </li>
                                <li> <a href="giantFoxtailPage.php">Giant Foxtail</a> </li>
                                <li> <a href="goosegrassPage.php">Goosegrass</a> </li>
                                <li> <a href="greenFoxtailPage.php">Green Foxtail</a> </li>
                                <li> <a href="henbitPage.php">Henbit</a> </li>
                                <li> <a href="smoothCrabgrassPage.php">Smooth Crabgrass</a> </li>
                                <li> <a href="tropicalSignalgrassPage.php">Tropical Signalgrass</a> </li>
                                <li> <a href="woolyCupgrassPage.php">Wooly Cupgrass</a> </li>
                                <li> <a href="yellowFoxtailPage.php">Yellow Foxtail</a> </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
            <div id="page-wrapper">
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header" id="location-name">
                            Weather <small>Overview</small>
                        </h1> </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12" id="weather-alert"> </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"> Daily Forecast and Current Conditions</h3> </div>
                                <div class="panel-body">
                                    <div class="col-xs-3">
                                        <div class="huge" id="forecast-summary"></div>
                                    </div>
                                    <div class="col-xs-9 ">
                                        <div class="huge" id="forecast-summary-minutely"></div>
                                        <div id="forecast-summary-hourly"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"> Weekly Forecast</h3> </div>
                                <div class="panel-body">
                                    <div class="panel panel-info col-md-2">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" id="day1"></h3></div>
                                        <div class="panel-body" id="forecast1"></div>
                                    </div>
                                    <div class="panel panel-info col-md-2">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" id="day2"></h3></div>
                                        <div class="panel-body" id="forecast2"></div>
                                    </div>
                                    <div class="panel panel-info col-md-2">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" id="day3"></h3></div>
                                        <div class="panel-body" id="forecast3"></div>
                                    </div>
                                    <div class="panel panel-info col-md-2">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" id="day4"></h3></div>
                                        <div class="panel-body" id="forecast4"></div>
                                    </div>
                                    <div class="panel panel-info col-md-2">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" id="day5"></h3></div>
                                        <div class="panel-body" id="forecast5"></div>
                                    </div>
                                    <div class="panel panel-info col-md-2">
                                        <div class="panel-heading">
                                            <h3 class="panel-title" id="day6"></h3></div>
                                        <div class="panel-body" id="forecast6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.row-->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Weekly Predictions</h3> </div>
                                <div class="panel-body">
                                    <div class="container-fluid">
                                        <div class="col-sm-4">
                                            <div class="panel panel-success">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title">Today's Heat Unit Gain</h3> </div>
                                                <h1 class="panel-body" id="daily-heat-unit"></h1> </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="panel panel-warning">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title">Avg. High/Low</h3> </div>
                                                <h1 class="panel-body" id="daily-high-low"> </h1> </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="panel panel-success">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title">End of Week Heat Unit Gain</h3> </div>
                                                <h1 class="panel-body" id="weekly-heat-unit"> </h1> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title"> Interactive Forecast Map</h3> </div>
                                <div class="panel-body" id='darksky-map'> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- /#page-wrapper -->
        </div>
        <!-- /#wrapper -->
        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <!-- Bootstrap Core JavaScript -->
        <script src="js/bootstrap.min.js"></script>
        <!-- Morris Charts JavaScript -->
        <script src="js/plugins/morris/raphael.min.js"></script>
        <script src="js/plugins/morris/morris.min.js"></script>
        <script src="js/plugins/morris/morris-data.js"></script>
        <!-- To use Geocoding from Google Maps V3 you need to link https://maps.googleapis.com/maps/api/js?sensor=false -->
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsxxLeyTkifethGupaHIOKbCYRCFG4lQk" type="text/javascript"></script>
        <!--Custom JS-->
        <script src="js/forecast.js"></script>
    </body>

    </html>
    <script>
        $(function () {
            // Get lat/lng from Google Maps
            var address = <?php echo json_encode($row['userLocation']); ?>;
            getLatitudeLongitude(showResult, address);
        });
    </script>
