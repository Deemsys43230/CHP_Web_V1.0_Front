function startFeatAnim() {
    fAnim = setInterval(featImages, 2000);
}

function featImages() {
    var imgs = ['images/info/000.png', 'images/info/001.png', 'images/info/002.png', 
        'images/info/003.png', 'images/info/004.png', 'images/info/005.png', 'images/info/006.png'];
    var cImg = $("#featImage").attr('src');
    if(cImg == imgs[0]) {
        $('#featImage').attr("src", imgs[1]);
    }
    else if(cImg == imgs[1]) {
        $('#featImage').attr("src", imgs[2]);
    }
    else if(cImg == imgs[2]) {
        $('#featImage').attr("src", imgs[3]);
    }
    else if(cImg == imgs[3]) {
        $('#featImage').attr("src", imgs[4]);
    }
    else if(cImg == imgs[4]) {
        $('#featImage').attr("src", imgs[5]);
    }
    else if(cImg == imgs[5]) {
        $('#featImage').attr("src", imgs[6]);
    }
}
