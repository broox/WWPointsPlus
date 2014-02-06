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

function showPointsForm() {
    $('#dailyAllowance').hide();
    $('#foodPoints').removeClass('hidden').show();
    $('.nav .food').addClass('active');
    $('.nav .allowance').removeClass('active');
    $('.navbar-collapse.in').collapse('hide');
}

function showDailyAllowanceForm() {
    $('#foodPoints').hide();
    $('#dailyAllowance').removeClass('hidden').show();
    $('.nav .food').removeClass('active');
    $('.nav .allowance').addClass('active');
    $('.navbar-collapse.in').collapse('hide');
}

$(document).ready(function() {
    var hashVal = window.location.hash.split("#")[1];
    if (hashVal == 'allowance')
        showDailyAllowanceForm();
    else
        showPointsForm();

    $('.nav .food a').click(function(event) {
        showPointsForm();
    });

    $('.nav .allowance a').click(function(event) {
        showDailyAllowanceForm();
    });

    $('form#getPointsInFood').submit(function(event) {
        event.preventDefault();

        var servings = parseInt($('select#fullServings').val(),10) + parseInt($('select#partialServings').val(),10),
            fat = parseInt($('input#fat').val(),10),
            protein = parseInt($('input#protein').val(),10),
            carbs = parseInt($('input#carbs').val(),10),
            fiber = parseInt($('input#fiber').val(),10),
            points = getPointsPlusInFood(servings, fat, protein, carbs, fiber);

        $('#pointsInFood .measures').html(fat+'g fat + '+carbs+'g carbs + '+fiber+'g fiber + '+protein+'g protein =');
        $('#pointsInFood .points').html(points+' points');

        if (points < 5)
            $('#pointsInFood').attr('class', 'alert alert-success');
        else if (points < 10)
            $('#pointsInFood').attr('class', 'alert alert-warning');
        else
            $('#pointsInFood').attr('class', 'alert alert-danger');

        $('form#getPointsInFood input').val('');
    });

    $('form#getDailyPoints').submit(function(event) {
        event.preventDefault();

        var sex    = $('select#sex').val(), //$('input[name=sex]:checked', '#getDailyPoints').val(),
            age    = parseInt($('input#age').val(),10),
            weight = parseInt($('input#weight').val(),10),
            height = parseInt($('input#height').val(),10),
            points = getDailyPoints(sex, age, weight, height);
        
        $('#pointsAllowed .daily').html('You get to use '+points+' points per day');
        $('#pointsAllowed .weekly').html('+ 49 extra per week!');
        $('#pointsAllowed').attr('class', 'alert alert-info');
        $('form#getDailyPoints input').val('');
    });
});
