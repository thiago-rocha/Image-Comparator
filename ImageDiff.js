function ImageDiff() {
    this._canvas = document.createElement('canvas');
    this._canvasContext = this._canvas.getContext('2d');
}

ImageDiff.prototype._canvas = null;

ImageDiff.prototype._canvasContext = null;

ImageDiff.prototype.find = function(imgSrc1, imgSrc2) {
    var instance = this,
        image1 = new Image(),
        image2 = new Image(),
        imageLoaded = false;

    image1.onload = function() {

        if (imageLoaded) {
            instance._drawAbutImages(image1, image2);
            instance._scan(image1, image2);
        }

        imageLoaded = true;
    };

    image1.src = imgSrc1;

    image2.onload = function() {

        if (imageLoaded) {
            instance._drawAbutImages(image1, image2);
            instance._scan(image1, image2);
        }

        imageLoaded = true;
    };

    image2.src = imgSrc2;
};

ImageDiff.prototype._drawAbutImages = function(image1, image2) {
    var instance = this,
        canvas = instance._canvas,
        context = instance._canvasContext;

    canvas.width = image1.width;
    canvas.height = 2 * image1.height;
    context.drawImage(image1, 0, 0);
    context.drawImage(image2, 0, image1.height);

};

ImageDiff.prototype._scan = function(image1, image2) {
    var instance = this,
        context = instance._canvasContext,
        currentPosition,
        initialPosition,
        jump,
        abs = Math.abs,
        round = Math.round,
        size = image1.width * image1.height,
        imageData1 = context.getImageData(0, 0, image1.width, image1.height).data,
        imageData2 = context.getImageData(0, image1.height, image2.width, image2.height).data;

    context.fillStyle = 'rgb(255, 0, 0)';

    for (jump = size; jump > 1; jump = initialPosition) {
        initialPosition = round(jump / 2);
        for (currentPosition = initialPosition; currentPosition < size; currentPosition += jump) {
            if (abs(imageData1[currentPosition] - imageData2[currentPosition]) > 10) {
                return 1;
            }
        }
    }

    return 0;
};

exports.ImageDiff = function(is1, is2) {
    var qualquerCoisa = new ImageDiff();
    qualquerCoisa.find(s1, s2);
};