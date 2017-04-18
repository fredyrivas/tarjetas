


var gifNameFrom;
var gifNameTo;


/////////// gif animation ////////////

var allowsaving = false;
var nowSave = false;

var encoder = new GIFEncoder();
encoder.setRepeat(0); //0  -> loop del gif creado
encoder.setDelay(0); //cambio de frame del gif creado
encoder.setQuality(100);


var speedWhenCapturing = 60;
var normalSpeed = 4;
var gifSpeed = normalSpeed;

var backImgUrl = new Image();

var canvasAnim;


var coin,
    coinImage,
    canvas;


$(window).load(function () {

    initialGif();

    createCanvasGif();
});


//////////////////////////////////////////////////////////////////// GIF

/*======================================================================================*/


function initialGif() {

    // Get canvas
    canvas = document.getElementById("myCanvas");
    canvas.width = 400;
    canvas.height = 400;

    // Create sprite sheet
    coinImage = new Image();

    // Create sprite
    coin = sprite({
        gifcontext: canvas.getContext("2d"),
        bgcontext: canvas.getContext("2d"),
        decontext: canvas.getContext("2d"),
        paracontext: canvas.getContext("2d"),
        width: 2000,
        height: 400,
        image: coinImage,
        numberOfFrames: 5,
        ticksPerFrame: gifSpeed //2.5
    });
}


function gameLoop() {

    canvasAnim = window.requestAnimationFrame(gameLoop);

    coin.update();
    coin.render();
}


function sprite(options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.gifcontext = options.gifcontext;
    that.bgcontext = options.bgcontext;
    that.decontext = options.decontext;
    that.paracontext = options.paracontext;


    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range

            if (frameIndex == numberOfFrames - 1) {
                if (allowsaving) {
                    nowSave = true;
                    gifSpeed = speedWhenCapturing;
                }
            }


            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;

            } else {

                frameIndex = 0;
            }
        }
    };

    that.render = function () {

        // Clear the canvas
        that.gifcontext.clearRect(0, 0, that.width, that.height);

        // draw el fondo
        that.bgcontext.drawImage(backImgUrl, 0, 0, 400, 400);


        //si es color
        //that.bgcontext.fillStyle = backColorSelected;
        //that.bgcontext.fillRect(0, 0, 400, 400);


        // Draw the animation
        that.gifcontext.drawImage(
            that.image,
            (frameIndex * that.width / numberOfFrames),
            0,///top position wey
            that.width / numberOfFrames,
            that.height,
            0,///left position wey
            0,
            that.width / numberOfFrames,
            that.height);


        // draw tu nombre
        that.decontext.fillStyle = '#000000';
        that.decontext.font = 'bold italic 18px PT Sans';
        that.decontext.textAlign = 'left';

        that.decontext.save();
        that.decontext.rotate(8 * Math.PI / -180);
        that.decontext.fillText(gifNameFrom, 130, 130);
        that.decontext.restore();

        // draw el nombre de lo que viene siendo esa personita especial
        that.paracontext.fillStyle = '#000000';
        that.paracontext.font = 'bold italic 18px PT Sans';
        that.paracontext.textAlign = 'left';

        that.paracontext.save();
        that.paracontext.rotate(8 * Math.PI / -180);
        that.paracontext.fillText(gifNameTo, 100, 100);
        that.paracontext.restore();


    };

    return that;
}


function createCanvasGif() {

    gifNameFrom = 'FREDY';
    gifNameTo = 'NORMA';

    coinImage.src = 'images/test-sprite.png';
    coinImage.addEventListener("load", gameLoop);


    backImgUrl.src = 'images/tarjeta-ejemplo-11.png';

    //si es color
    //backColorSelected = '#ff0000';

}

