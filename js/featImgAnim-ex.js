/* 
 * Deemsys Inc.
 */


function featInfoZoomIn(obj) {
    $('#'+obj).animate({
        "width": "100%",
        "background-color": "#fec51b"
    });
    $('#'+obj).css({"box-shadow": "none"});
    $('#'+obj+'h').animate({"color": "white"}, {duration: 700});
    $('#'+obj+'h').css({"font-weight": "bold", "text-align": "left"
    });
    $('#'+obj+'p').css({"display": "block"});
    $('#featImgDiv').css({"border": "4px #fec51b solid"});
//    if(obj=="feat1"||obj=="feat2"||obj=="feat3") {
//        $('#featImgDiv').css({"box-shadow":"5px 5px 8px silver", "border-right":"none", "border-left": "1px solid gold"});
//    }
//    else {
//        $('#featImgDiv').css({"box-shadow":"-5px 5px 8px silver", "border-left":"none", "border-right": "1px solid gold"});
//    }
}

function featInfoZoomOut(obj) {
    $('#'+obj+'h').css({"font-weight": "normal",
    "color": "grey", "font-size": "large", "text-align": "center"
    });
    $('#'+obj).animate({ "width": "55%",
        "background-color": "white",
    });
    $('#'+obj).css({"box-shadow": "5px 5px 5px #c0c0c0"});
    $('#'+obj+'p').css({"display": "none"});
    $('#featImgDiv').css({"border": "none"});
}

function startFeatAnim() {
    fAnim = setInterval(featImages, 4500);
}

function featImages() {
    var imgs = ['images/feat1.gif', 'images/feat2.gif', 'images/feat3.gif', 'images/feat4.gif', 'images/feat5.gif', 'images/feat6.gif'];
    var cImg = $("#featImage").attr('src');
    if(cImg == imgs[0]) {
        featInfoZoomOut('feat1');
        featInfoZoomIn('feat2');
        $('#featImage').attr("src", imgs[1]);
    }
    else if(cImg == imgs[1]) {
        featInfoZoomOut('feat2');
        featInfoZoomIn('feat3');
        $('#featImage').attr("src", imgs[2]);
    }
    else if(cImg == imgs[2]) {
        featInfoZoomOut('feat3');
        featInfoZoomIn('feat4');
        $('#featImage').attr("src", imgs[3]);
    }
    else if(cImg == imgs[3]) {
        featInfoZoomOut('feat4');
        featInfoZoomIn('feat5');
        $('#featImage').attr("src", imgs[4]);
    }
    else if(cImg == imgs[4]) {
        featInfoZoomOut('feat5');
        featInfoZoomIn('feat6');
        $('#featImage').attr("src", imgs[5]);
    }
    else if(cImg == imgs[5]) {
        featInfoZoomOut('feat6');
        featInfoZoomIn('feat1');
        $('#featImage').attr("src", imgs[0]);
    }
}

function zoomOutAll() {
    featInfoZoomOut('feat1');
    featInfoZoomOut('feat2');
    featInfoZoomOut('feat3');
    featInfoZoomOut('feat4');
    featInfoZoomOut('feat5');
    featInfoZoomOut('feat6');
}

$("#feat1").mouseenter(function() {
 
                     clearInterval(fAnim);
                     zoomOutAll(); 
                     $("#featImage").attr("src", "images/feat1.gif"); 
                     featInfoZoomIn("feat1");
})
        .mouseleave(function() {
            startFeatAnim();
});

$("#feat2").mouseenter(function() {
            clearInterval(fAnim); zoomOutAll(); 
            $("#featImage").attr("src", "images/feat2.gif"); 
            featInfoZoomIn("feat2");
})
        .mouseleave(function() {
            startFeatAnim();
});

$("#feat3").mouseenter(function() {
            clearInterval(fAnim); zoomOutAll(); 
            $("#featImage").attr("src", "images/feat3.gif"); 
            featInfoZoomIn("feat3");
})
        .mouseleave(function() {
            startFeatAnim();
});

$("#feat4").mouseenter(function() {
            clearInterval(fAnim); zoomOutAll(); 
            $("#featImage").attr("src", "images/feat4.gif"); 
            featInfoZoomIn("feat4");
})
        .mouseleave(function() {
            startFeatAnim();
});

$("#feat5").mouseenter(function() {
            clearInterval(fAnim); zoomOutAll(); 
            $("#featImage").attr("src", "images/feat5.gif"); 
            featInfoZoomIn("feat5");
})
        .mouseleave(function() {
            startFeatAnim();
});

$("#feat6").mouseenter(function() {
            clearInterval(fAnim); zoomOutAll(); 
            $("#featImage").attr("src", "images/feat6.gif");
            featInfoZoomIn("feat6");
})
        .mouseleave(function() {
            startFeatAnim();
});