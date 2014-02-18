function ImageComparator() {
    this._canvas = document.createElement('canvas');
    this._canvasContext = this._canvas.getContext('2d');
}

ImageComparator.prototype._canvas = null;

ImageComparator.prototype._canvasContext = null;

ImageComparator.prototype.compare = function(imgSrc1, imgSrc2, threshold, callback) {
    var instance = this,
        image1 = new Image(),
        image2 = new Image(),
        imageLoaded = false,
        imageClass = 0;

    image1.onload = function() {
        image2.src = imgSrc2;
        imageLoaded = true;
    };

    image1.src = imgSrc1;

    image2.onload = function() {
        instance._drawAbutImages(image1, image2);
        imageClass = instance._scan(image1, image2, threshold);

        imageLoaded = true;

        callback.apply(window, [imageClass]);
    };
};

ImageComparator.prototype._drawAbutImages = function(image1, image2) {
    var instance = this,
        canvas = instance._canvas,
        context = instance._canvasContext;

    canvas.width = image1.width;
    canvas.height = 2 * image1.height;
    context.drawImage(image1, 0, 0);
    context.drawImage(image2, 0, image1.height);
};

ImageComparator.prototype._scan = function(image1, image2, threshold) {
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
            if (diffCount >= ts) {
                return 1;
            }
        }
    }
    return 0;
};

var imageComparator = new ImageComparator();
imageComparator.compare('file:///Users/thiagorocha/Projects/Image-Diff/images/export_import_1.png', 'file:///Users/thiagorocha/Projects/Image-Diff/images/export_import_2.png', 0.001, function(result) {
    console.log(result);
    phantom.exit();
});