<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Points Plus Allowance</title>
<script>
function calcScore(){
	sex = document.sex.value;
	age = parseInt(document.age.value,10);
    weight = parseInt(document.weight.value,10)*.45359237;
    height = parseInt(document.height.value,10)*.0254; 
    
    if(sex == "male"){
    	points=864-(9.72*age);
        points+=1.12*((14.2*weight)+(503*height));
        points=((points*.9)+200)-1000;
        if(points<1000){ points=1000; }
        points =Math.round(points/35)-11;
        if(points<29){ points=29; }
        if(points>71){ points=71; }
    }
	
	if(sex == "female"){
		points=387-(7.31*age);
		points+=1.14*((10.9*weight)+(660.7*height));
		points=((points*.9)+200)-1000;
		if(points<1000)points=1000;
		points=Math.round(points/35)-11;
		if(points<26)points=26;
		if(points>71)points=71;	
	}
	
	
}
</script>	
</head>

<body>



</body>
</html>
