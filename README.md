ImageComparator
---
==========

Compare image pixel values with a threshold using phantomjs.

Getting Started
---
==========

Import the library:

	phantom.page.injectJs( 'ImageComparator.js');
	
Creat a instance of `ImageComparator`:
	
	var imageComparator = new ImageComparator();

Call function *compare* and pass two image to be compared a threshold and a callback function as argument.

	imageComparator.compare('file:///..fullpath../image1.png', 'file:///..fullpath../image2.png', 0.001, function(result) {
            console.log(result);
            phantom.exit();
        });
        
'result' are 0 if the difference is less than the threshold and 1 if the difference is greater than the threshold.