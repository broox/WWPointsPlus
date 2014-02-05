function getPointsPlusInFood(servings, fat, protein, carbs, fiber) {
    protein = servings * protein;
    carbs   = servings * carbs;
    fat     = servings * fat;
    fiber   = servings * (fiber > 4 ? 4 : fiber);

    var points = (protein / 10.9) + (carbs / 9.2) + (fat / 3.9) + (fiber / 35);
    return Math.round(points);
}

function getDailyPoints(sex, age, weight, height){
    var points;
    weight = parseInt(weight,10)*0.45359237;
    height = parseInt(height,10)*0.0254;

    if (sex == "male") {
        points=864-(9.72*age);
        points+=1.12*((14.2*weight)+(503*height));
        points=((points*0.9)+200)-1000;
        if(points<1000){ points=1000; }
        points =Math.round(points/35)-11;
        if(points<29){ points=29; }
        if(points>71){ points=71; }
    }

    if (sex == "female") {
        points=387-(7.31*age);
        points+=1.14*((10.9*weight)+(660.7*height));
        points=((points*0.9)+200)-1000;
        if(points<1000)points=1000;
        points=Math.round(points/35)-11;
        if(points<26)points=26;
        if(points>71)points=71;
    }
    return points;
}

function getGender() {
    var sizes = document.ww.sex;
        for (var i=0; i < sizes.length; i++) {
            if (sizes[i].checked === true) {
            return sizes[i].value;
        }
    }
}


$('form#getPointsInFood').submit(function(event) {
    event.preventDefault();

    var servings = parseInt($('#fullServings').val(),10) + parseInt($('#partialServings').val(),10),
        points = getPointsPlusInFood(servings,
                                     parseInt($('#fat').val(),10),
                                     parseInt($('#protein').val(),10),
                                     parseInt($('#carbs').val(),10),
                                     parseInt($('#fiber').val(),10));

    $('#result').html('<hr><strong>Points: '+points+'</strong><br><hr>');
});

$('form#getDailyPoints').submit(function(event) {
    event.preventDefault();

    var sex = getGender();
    var age = document.ww.age.value;
    var weight = document.ww.weight.value;
    var height = document.ww.height.value;
    
    var points = getDailyPoints(sex,age,weight,height);
    
    document.getElementById("result").innerHTML="<hr><strong>"+points+" Daily Allowance (+ 49 Weekly Allowance)</strong><br><hr>";
});
