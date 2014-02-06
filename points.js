// US Points
function getPointsPlusInFood(servings, fat, protein, carbs, fiber) {
    protein = servings * protein;
    carbs   = servings * carbs;
    fat     = servings * fat;
    fiber   = servings * fiber;

    var points = (protein / 10.9375) + (carbs / 9.2105) + (fat / 3.8889) - (fiber / 12.5);
    return Math.round(points);
}

// UK Points
function getProPointsInFood(servings, fat, protein, carbs, fiber) {
    protein = servings * protein;
    carbs   = servings * carbs;
    fat     = servings * fat;
    fiber   = servings * fiber;

    // UK ProPoints handle fiber differently because their nutrition labels don't factor fiber into carbs
    var points = (protein / 10.9375) + (carbs / 9.2105) + (fat / 3.8889) + (fiber / 35);
    return Math.round(points);
}

function getDailyPoints(sex, age, weight, height){
    var points,
        minPoints = 26,
        maxPoints = 71,
        energyExpenditure,
        adjustedExpenditure;

    // convert measurements to metric (kilograms and meters)
    weight = weight * 0.45359237;
    height = height * 0.0254;

    // Calculate the amount of kCal the person is expected to expend
    if (sex == 'male') {
        energyExpenditure = 864 - (9.72 * age) + 1.12 * (14.2 * weight + 503 * height);
        minPoints = 29; // Is this hard minimum legit?
    } else if (sex == 'female') {
        energyExpenditure = 387 - (7.31 * age) + 1.14 * (10.9 * weight + 660.7 * height);
    }

    // Adjust for foods that have a value of 0 despite having coloric content
    adjustedExpenditure = 0.9 * energyExpenditure + 200;

    // Finally, figure out the daily target
    points = Math.max(adjustedExpenditure - 1000, 1000) / 35;
    points = Math.round(points) - 11;

    if (points < minPoints)
        return minPoints;

    if (points > maxPoints)
        return maxPoints;

    return points;
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

    var sex    = $('input[name=sex]:checked', '#getDailyPoints').val(),
        age    = parseInt($('input#age').val(),10),
        weight = parseInt($('input#weight').val(),10),
        height = parseInt($('input#height').val(),10),
        points = getDailyPoints(sex, age, weight, height);
    
    $('#result').html('<hr><strong>'+points+' Daily Allowance (+ 49 Weekly Allowance)</strong><br><hr>');
});
