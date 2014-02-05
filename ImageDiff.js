function ImageDiff() {
    this._canvas = document.createElement('canvas');
    this._canvasContext = this._canvas.getContext('2d');
}

ImageDiff.prototype._canvas = null;

ImageDiff.prototype._canvasContext = null;

ImageDiff.prototype.find = function(imgSrc1, imgSrc2, threshold) {
    var instance = this,
        image1 = new Image(),
        image2 = new Image(),
        imageLoaded = false;

    image1.onload = function() {
        if (imageLoaded) {
            instance._drawAbutImages(image1, image2);
            instance._scan(image1, image2, threshold);
        }

        imageLoaded = true;
    };

    image1.src = imgSrc1;

    image2.onload = function() {
        if (imageLoaded) {
            instance._drawAbutImages(image1, image2);
            instance._scan(image1, image2, threshold);
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

ImageDiff.prototype._scan = function(image1, image2, threshold) {
    var instance = this,
        context = instance._canvasContext,

        currentPosition,
        diffCount = 0,
        size = image1.width * image1.height * 4,
        ts = Math.round(threshold * size * 0.25),
        imageData1 = context.getImageData(0, 0, image1.width, image1.height).data,
        imageData2 = context.getImageData(0, image1.height, image2.width, image2.height).data;

    for (currentPosition = 0; currentPosition < size; currentPosition += 4) {
        if ((imageData1[currentPosition] !== imageData2[currentPosition]) || (imageData1[currentPosition + 1] !== imageData2[currentPosition + 1]) || (imageData1[currentPosition + 2] !== imageData2[currentPosition + 2])) {
            diffCount++;
            //console.log('1');
            if (diffCount >= ts) {
                return 1;
            }
        }
    }
    //console.log('0');
    return 0;
};