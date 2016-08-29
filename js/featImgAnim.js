/* 
 * Deemsys Inc.
 */


function featInfoZoomIn(obj) {
    $('#'+obj).css({"fontSize": "17px", 
        "background-color": "#fec51b", 
        "box-shadow": "10px 10px 5px #888888"
    });
    $('#'+obj+'p').css({"display": "block"});
    $('#'+obj+'h').css({"font-weight": "bold",
    "text-decoration": "underline",
    "color": "white"
    });
}

function featInfoZoomOut(obj) {
    $('#'+obj).css({"fontSize": "15px", 
        "background-color": "white",
        "box-shadow": "none",
        "border": "none"
    });
    $('#'+obj+'p').css({"display": "none"});
    $('#'+obj+'h').css({"font-weight": "normal",
    "text-decoration": "none", "color": "grey", "font-size": "x-large"
    });
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