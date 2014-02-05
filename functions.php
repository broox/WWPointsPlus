<?
$_POST['func']();

function getPointsPlus(){
	$s = $_POST['servings1'] + $_POST['servings2'];

	$w = $_POST['fat'] * $s;
	$x = $_POST['protein'] * $s;
	$y = $_POST['carbs'] * $s;
	$z = ($_POST['fiber'] > 4 ? 4 : $_POST['fiber']) * $s;
	
	$p = abs(round(($x/10.9)+($y/9.2)+($w/3.9)+($z/35)));

	echo "<hr><strong>Points: $p</strong><br><hr>";
}
?>
