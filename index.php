<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
<title>Weight Watchers Calculator</title>
<style type="text/css">
	body { font-family:Verdana, Geneva, sans-serif; font-size: 10px; }
</style>
<script>
<!-- 

function getpointsplus(){
	$.post("functions.php", { func:"getPointsPlus",fat:document.getPoints.fat.value,protein:document.getPoints.protein.value,carbs:document.getPoints.carbs.value,fiber:document.getPoints.fiber.value,servings1:document.getPoints.servings1.value,servings2:document.getPoints.servings2.value },
	function(data){
		$('#result').html(data);
	});
	document.getPoints.fat.value='';
	document.getPoints.protein.value='';
	document.getPoints.carbs.value='';
	document.getPoints.fiber.value='';
}

-->
</script>
<script language="JavaScript" src="jquery-1.4.2.js"></script>
</head>
<body>
<div align="center">

  <img src="wwatchers.gif" width="276" height="175" />
  <div id="result"></div>
  
  <form name="getPoints" id="getPoints" method="post">
  <table width="220" border="0">
    <tr>
      <td><div align="right"><strong>Fat:</strong></div></td>
      <td><input name="fat" type="number" size="4"></td>
    </tr>
    <tr>
      <td><div align="right"><strong>Carbs:</strong></div></td>
      <td><input name="carbs" type="number" size="4"></td>
    </tr>
    <tr>
      <td><div align="right"><strong>Fiber:</strong></div></td>
      <td><input name="fiber" type="number" size="4"></td>
    </tr>
     <tr>
      <td><div align="right"><strong>Protein:</strong></div></td>
      <td><input name="protein" type="number" size="4"></td>
    </tr>
    <tr>
      <td><div align="right"><strong>Servings:</strong></div></td>
      <td>
        <select name="servings1">
          <option value="0">0</option>
          <option value="1" selected="selected">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <select name="servings2">
          <option value="0" selected="selected">0</option>
          <option value="0.125">1/8</option>
          <option value="0.25">1/4</option>
          <option value="0.50">1/2</option>
          <option value="0.75">3/4</option>
        </select>
      </td>
    </tr>
  </table>
  <input name="submit" type="button" value="Submit" onclick="getpointsplus()">
  </form>
	
    <br />
<br />
<br />
<a href="points.html">Get Daily Points Allowance</a>
</div>
</body>
</html>
