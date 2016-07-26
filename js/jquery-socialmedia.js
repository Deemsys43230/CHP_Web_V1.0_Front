$(document).ready(function() {
    var pageTitle = document.title; //HTML page title
    var pageUrl = location.href; //Location of the page


    //user hovers on the share button
    /*$('#share-wrapper li').hover(function() {
        var hoverEl = $(this); //get element

        //browsers with width > 699 get button slide effect
        if($(window).width() > 699) {
            if (hoverEl.hasClass('visible')){
                hoverEl.animate({"margin-left":"-117px"}, "fast").removeClass('visible');
            } else {
                hoverEl.animate({"margin-left":"0px"}, "fast").addClass('visible');
            }
        }
    });*/

    //user clicks on a share button
    $('.button-wrap').click(function(event) {
        var shareName = $(this).attr('class').split(' ')[0]; //get the first class name of clicked element
        switch (shareName) //switch to different links based on different social name
        {
            case 'facebook':
                var openLink = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent($("meta[property='og\\:url']").attr("content"));
                break;
            case 'twitter':
                var openLink = 'http://twitter.com/home?status=' + encodeURIComponent($("meta[property='og\\:title']").attr("content") + ' ' + pageUrl);
                break;
            case 'linkedin':
                var openLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($("meta[property='og\\:url']").attr("content")) + '&title=' + encodeURIComponent($("meta[property='og\\:title']").attr("content"))+"&summary="+encodeURIComponent($("meta[property='og\\:description']").attr("content"));
                break;
            case 'whatsapp':
                var openLink = 'whatsapp://send?text=Found this useful link for you -'+'\xa0' + encodeURIComponent(pageUrl) + '&amp;title=' + encodeURIComponent(pageTitle);
                break;
            case 'google':
                var openLink = 'https://plus.google.com/share?url=' + encodeURIComponent(pageUrl) + '&title=' + encodeURIComponent(pageTitle);
                break;
            case 'email':
                var openLink = 'mailto:?subject=' + pageTitle + '&body=Found this useful link for you : ' + pageUrl;
                break;
            case 'pinterest':
                var openLink = 'https://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Flocalhost%2Flearnterest_new%2Fnews_detail.html%23&media=http%3A%2F%2Flocalhost%2Flearnterest_new%2Fimg%2Fpic_1.jpg&h=400&w=800&description=Found this useful link for you - '+'\xa0' + encodeURIComponent(pageUrl) + '&amp;title=' + encodeURIComponent(pageTitle);
                break;

        }

        //Parameters for the Popup window
        winWidth 	= 650;
        winHeight	= 450;
        winLeft   	= ($(window).width()  - winWidth)  / 2,
            winTop    	= ($(window).height() - winHeight) / 2,
            winOptions   = 'width='  + winWidth  + ',height=' + winHeight + ',top='    + winTop    + ',left='   + winLeft;

        //open Popup window and redirect user to share website.
        window.open(openLink,'Share This Link',winOptions);
        return false;
    });
});