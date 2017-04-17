$(document).ready(function(){
    $("#feedback_button").click(function(){
        if($('#form').css('left')=='0px'){
            $("#feedback-form").slideToggle(800);
            $('#form').animate({left:'-270px'},  500);
        }else{
            $('#form').animate({left:'0'},  500);
            $("#feedback-form").slideToggle(300);
        }
    });
});