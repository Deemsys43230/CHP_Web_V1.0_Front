$(".modal_trigger").leanModal({top:200,overlay:.6,closeButton:".modal_close"}),$(function(){$("#forgot_password").click(function(){return $(".user_login").hide(),$(".secret_question").hide(),$(".reset_password").show(),$(".header_title").text("Reset Password"),!1}),$("#register_form").click(function(){return $(".user_login").hide(),$(".secret_question").hide(),$(".user_register").show(),$(".user_register1").hide(),$(".header_title").text("Register"),$("#pswd_info").hide(),!1}),$("#register_form2").click(function(){return $(".user_login").hide(),$(".secret_question").hide(),$(".user_register").hide(),$(".user_register1").show(),$(".header_title").text("Register"),!1}),$(".back_btn").click(function(){return $(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_login").show(),$(".header_title").text("Login"),!1}),$(".back_btn_forgotPassword").click(function(){return $(".reset_password").show(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_login").hide(),$(".header_title").text("Reset Password"),!1}),$(".back_btn_register").click(function(){return $(".reset_password").hide(),$(".user_register").show(),$(".user_register1").hide(),$(".secret_question").hide(),$(".user_login").hide(),$(".header_title").text("Login"),!1}),$(".modal_trigger").click(function(){return $(".reset_password").hide(),$(".user_register").hide(),$(".secret_question").hide(),$(".user_register1").hide(),$(".user_login").show(),$(".header_title").text("Login"),!1})}),$(window).load(function(){$("#loader").fadeOut()});var headerEle=function(){$("header").height();$(".hidden-header").css({height:"110px"})};$(window).load(function(){headerEle()}),$(window).resize(function(){headerEle()}),$(document).ready(function(){$("body").niceScroll()}),$(document).ready(function(){$("#pswd").keyup(function(){var a=$("#pswd").val();a.length<6?$("#length").removeClass("valid").addClass("invalid"):$("#length").removeClass("invalid").addClass("valid"),a.match(/[a-z]/)?$("#letter").removeClass("invalid").addClass("valid"):$("#letter").removeClass("valid").addClass("invalid"),a.match(/[A-Z]/)?$("#capital").removeClass("invalid").addClass("valid"):$("#capital").removeClass("valid").addClass("invalid"),a.match(/\d/)?$("#number").removeClass("invalid").addClass("valid"):$("#number").removeClass("valid").addClass("invalid"),a.match(/\s/)?$("#space").removeClass("valid").addClass("invalid"):$("#space").removeClass("invalid").addClass("valid"),a.match(/[#?!@$%^&*-]/)?$("#special").removeClass("invalid").addClass("valid"):$("#special").removeClass("valid").addClass("invalid"),0==$("#pswd_info li.invalid").length?$("#pswd_info").fadeOut():$("#pswd_info").fadeIn()}),$("#pswd").focus(function(){var a=$("#pswd").val();a.length<6?$("#length").removeClass("valid").addClass("invalid"):$("#length").removeClass("invalid").addClass("valid"),a.match(/[a-z]/)?$("#letter").removeClass("invalid").addClass("valid"):$("#letter").removeClass("valid").addClass("invalid"),a.match(/[A-Z]/)?$("#capital").removeClass("invalid").addClass("valid"):$("#capital").removeClass("valid").addClass("invalid"),a.match(/\d/)?$("#number").removeClass("invalid").addClass("valid"):$("#number").removeClass("valid").addClass("invalid"),a.match(/\s/)?$("#space").removeClass("valid").addClass("invalid"):$("#space").removeClass("invalid").addClass("valid"),a.match(/[#?!@$%^&*-]/)?$("#special").removeClass("invalid").addClass("valid"):$("#special").removeClass("valid").addClass("invalid"),0==$("#pswd_info li.invalid").length?$("#pswd_info").fadeOut():$("#pswd_info").fadeIn()}),$("#pswd").keyup(function(){}).focus(function(){$("#pswd_info").show()}).blur(function(){$("#pswd_info").hide()})});