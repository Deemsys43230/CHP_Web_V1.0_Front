
$(".modal_trigger").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });

$(function(){

    // Calling Login Form
    $("#forgot_password").click(function(){
        $(".user_login").hide();
        $(".secret_question").hide();
        $(".reset_password").show();
        $(".header_title").text('Reset Password');
        return false;
    });

// Calling Register Form
$("#register_form").click(function(){
    $(".user_login").hide();
    $(".secret_question").hide();
    $(".user_register").show();
    $(".user_register1").hide();
    $(".header_title").text('Register');
    $("#pswd_info").hide();
    return false;
    });


// Calling Register Form
$("#register_form2").click(function(){
    $(".user_login").hide();
    $(".secret_question").hide();
    $(".user_register").hide();
    $(".user_register1").show();
    $(".header_title").text('Register');
    return false;
    });

// Going back to Social Forms
$(".back_btn").click(function(){
    $(".reset_password").hide();
    $(".user_register").hide();
    $(".secret_question").hide();
    $(".user_login").show();
    $(".header_title").text('Login');
    return false;
    });

// Going back to Forgot Password Forms
$(".back_btn_forgotPassword").click(function(){
    $(".reset_password").show();
    $(".user_register").hide();
    $(".secret_question").hide();
    $(".user_login").hide();
    $(".header_title").text('Reset Password');
    return false;
    });

// Going back to Social Forms
$(".back_btn_register").click(function(){
    $(".reset_password").hide();
    $(".user_register").show();
    $(".user_register1").hide();
    $(".secret_question").hide();
    $(".user_login").hide();
    $(".header_title").text('Login');
    return false;
    });

$(".modal_trigger").click(function(){
    $(".reset_password").hide();
    $(".user_register").hide();
    $(".secret_question").hide();
    $(".user_register1").hide();
    $(".user_login").show();
    $(".header_title").text('Login');
    return false;
    });
});

"use strict";
// Page Loader
$(window).load(function () {
    $('#loader').fadeOut();
    });

/*hidden header*/
var headerEle = function () {
    var $headerHeight = $('header').height();
    $('.hidden-header').css({ 'height' : 110  + "px" });
};

$(window).load(function () {
    headerEle();
    });

$(window).resize(function () {
    headerEle();
    });

/*Scroll*/
$(document).ready(function() {
    $('body').niceScroll({
        cursorcolor: "#424242",
        cursorwidth: "8px",
        cursorborder: "1px solid #424242",
        cursorborderradius: 0
    });  // The document page (body)
});

$(document).ready(function () {
    $('#pswd').keyup(function () {
        // set password variable
        var pswd = $('#pswd').val();
        if (pswd.length < 6) {
            $('#length').removeClass('valid').addClass('invalid');
        } else {
    $('#length').removeClass('invalid').addClass('valid');
    }
//validate letter
if (pswd.match(/[a-z]/)) {
    $('#letter').removeClass('invalid').addClass('valid');
    } else {
    $('#letter').removeClass('valid').addClass('invalid');
    }
//validate capital letter
if (pswd.match(/[A-Z]/)) {
    $('#capital').removeClass('invalid').addClass('valid');
    } else {
    $('#capital').removeClass('valid').addClass('invalid');
    }

//validate number
if (pswd.match(/\d/)) {
    $('#number').removeClass('invalid').addClass('valid');
    } else {
    $('#number').removeClass('valid').addClass('invalid');
    }

if (pswd.match(/\s/)) {
    $('#space').removeClass('valid').addClass('invalid');
    } else {
    $('#space').removeClass('invalid').addClass('valid');
    }

if (pswd.match(/[#?!@$%^&*-]/)) {
    $('#special').removeClass('invalid').addClass('valid');
    } else {
    $('#special').removeClass('valid').addClass('invalid');
    }

if ($('#pswd_info li.invalid').length == 0) {
    $('#pswd_info').fadeOut();
    } else {
    $('#pswd_info').fadeIn();
    }
});
$('#pswd').focus(function () {
    // set password variable
    var pswd = $('#pswd').val();
    if (pswd.length < 6) {
    $('#length').removeClass('valid').addClass('invalid');
    } else {
    $('#length').removeClass('invalid').addClass('valid');
    }
//validate letter
if (pswd.match(/[a-z]/)) {
    $('#letter').removeClass('invalid').addClass('valid');
    } else {
    $('#letter').removeClass('valid').addClass('invalid');
    }
//validate capital letter
if (pswd.match(/[A-Z]/)) {
    $('#capital').removeClass('invalid').addClass('valid');
    } else {
    $('#capital').removeClass('valid').addClass('invalid');
    }

//validate number
if (pswd.match(/\d/)) {
    $('#number').removeClass('invalid').addClass('valid');
    } else {
    $('#number').removeClass('valid').addClass('invalid');
    }

if (pswd.match(/\s/)) {
    $('#space').removeClass('valid').addClass('invalid');
    } else {
    $('#space').removeClass('invalid').addClass('valid');
    }

if (pswd.match(/[#?!@$%^&*-]/)) {
    $('#special').removeClass('invalid').addClass('valid');
    } else {
    $('#special').removeClass('valid').addClass('invalid');
    }

if ($('#pswd_info li.invalid').length == 0) {
    $('#pswd_info').fadeOut();
    } else {
    $('#pswd_info').fadeIn();
    }
});
$('#pswd').keyup(function () {
    }).focus(function () {
    $('#pswd_info').show();
    }).blur(function () {
    $('#pswd_info').hide();
    });

});