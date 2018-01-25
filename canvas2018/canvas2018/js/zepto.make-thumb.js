/*
 kairyou, 2013-08-01
 http://localhost:8080/leon/html5-make-thumb/index.html
 */

;
(function ($) {
    'use strict';
    // caches
    Zepto.support.filereader = !!(window.File && window.FileReader && window.FileList && window.Blob);
    var setting = {
        width: 0, // thumbnail width
        height: 0, //thumbnail height
        fill: true, // fill color when the image is smaller than thumbnails size.
        background: '#fff', // fill color鈥�
        type: 'image/png', // mime-type for thumbnail ('image/jpeg' | 'image/png')
        size: 'cover', // CSS3 background-size: contain | cover | auto
        mark: {}, // watermark
        // text watermark.
        // mark = {padding: 5, height: 18, text: 'test', color: '#000', font: '400 18px Arial'} // font: normal, bold, italic
        // bgColor: '#ccc' (background color); bgPadding: 5 (padding)
        // image watermark. (Note: cross-domain is not allowed)
        // mark = {padding: 5, src: 'mark.png', width: 34, height: 45};
        stretch: false,
        success: null,
        error: null
    };
    var $body = Zepto('body');
    var IMG_FILE = "image/pngimage/jpeg"; // var TEXT_FILE = /text.*/;
    Zepto.fn.makeThumb = function (options) {

        var opts = {};
        Zepto.extend(opts, setting, options);
        var $self = this;
        if (!Zepto.support.filereader) return;
        var size = opts.size;
        //alert(size)
        $self.change(function () {
            // $("#loading").show();
            var self = this;
            var files = self.files;
            var dataURL = '';
            console.log('loaded:', files);
            if (!files.length) return;

            var file = files[0];
            var fr = new FileReader();
            if (IMG_FILE.indexOf(file.type) != -1) {
                console.log(1)
                var $canvas = Zepto('<canvas></canvas>'),
                    canvas = $canvas[0],
                    context = canvas.getContext('2d');
                var image;
                var imageSize, targetSize;
                var targetH, targetW, tragetX, tragetY;
                var ratio;
                var callback = function (fEvt) {
                    dataURL = canvas.toDataURL(opts.type);
                    if (Zepto.isFunction(opts.success)) {
                        targetSize = { width: targetW, height: targetH };
                        opts.success.apply(self, [dataURL, targetSize, file, imageSize, fEvt]);
                    }
                    $canvas.remove();
                };
                var mpImg = new MegaPixImage(file);
                var drawImage = function (fEvt, exif) {
                    var orientation = exif.Orientation;
                    canvas.width = opts.width;
                    canvas.height = opts.height;
                    if (opts.background) {
                        context.fillStyle = opts.background;
                        context.fillRect(0, 0, opts.width, opts.height);
                    }
                    mpImg.render(canvas, { maxWidth: opts.width * 1.5, maxHeight: opts.height * 1.5, orientation: orientation });
                    return callback(fEvt);
                };
                fr.onerror = function (fEvt) {
                    if (Zepto.isFunction(opts.error)) opts.error.apply(self, [file, fEvt]);
                };
                fr.onload = function (fEvt) {
                    var target = fEvt.target;
                    var result = target.result;
                    image = new Image();
                    var exif;
                    image.onload = function () {
                        drawImage.apply(null, [fEvt, exif]);
                    };
                    var base64 = result.replace(/^.*?,/, '');
                    var binary = atob(base64);
                    var binaryData = new BinaryFile(binary);
                    exif = EXIF.readFromBinaryFile(binaryData);

                    image.src = result;
                };
                fr.readAsDataURL(file);
            } else {
                return;
            }


        });
    };

})(Zepto)