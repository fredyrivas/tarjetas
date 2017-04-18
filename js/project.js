//$(document).foundation();


/*navigation*/

var currBoxWidth;
var currOverShare;
var prevOverShare;
var currBoxStrip;
var currBoxStripID;
var currWindowPos;
var prevWindowPos;
var currViewer;
var currGifBox;
var isViewerOpen = false;
var gifCustomStage = 0;
var currPersonalizarBtn;
var prevPersonalizarBtn;
var isColorBackground = false;
var backColorSelected;

var initialViewerHeight;

var navigationDevice = 'desktop';

var tarjetaGlobalNameClicked;


var currPortadaContainer;
var prevPortadaContainer;

var currPortada;

var lastScrollTop = 0;
var scrollDirection = true;

/*gif config*/

var gifColorSelected;
var gifNameFrom;
var gifNameTo;

var giphyURL;

var currHref;


/////////// gif animation ////////////

var allowsaving = false;
var nowSave = false;

var encoder = new GIFEncoder();
encoder.setRepeat(0); //0  -> loop del gif creado
encoder.setDelay(0); //cambio de frame del gif creado
encoder.setQuality(100);
//encoder.setFrameRate(10); //a que velocidad correra el gif creado


var speedWhenCapturing = 60;
var normalSpeed = 4;
var gifSpeed = normalSpeed;

var grabLimit = 5;  // Number of screenshots to take
var count = 0;

var backImgUrl = new Image();

var canvasAnim;


var coin,
    coinImage,
    canvas;


/*============================================*/


var navColors = new TimelineMax({paused: true});


navColors.insertMultiple([

    TweenMax.to($('#nav-colors span:nth-child(1)'), 1, {transformOrigin: "20px 0px", rotation: 360}),
    TweenMax.to($('#nav-colors span:nth-child(2)'), 1, {transformOrigin: "0px 20px", rotation: -360}),
    TweenMax.to($('#nav-colors span:nth-child(3)'), 1, {transformOrigin: "20px 0px", rotation: -360}),
    TweenMax.to($('#nav-colors span:nth-child(4)'), 1, {transformOrigin: "-20px 0px", rotation: 360}),

    TweenMax.to($('#nav-colors span:nth-child(1)'), 1, {top: -3, left: -5}),
    TweenMax.to($('#nav-colors span:nth-child(2)'), 1, {top: -3, right: -5}),
    TweenMax.to($('#nav-colors span:nth-child(3)'), 1, {bottom: -3, left: -5}),
    TweenMax.to($('#nav-colors span:nth-child(4)'), 1, {bottom: -3, right: -5})
]);


/*=====================================================================================*/


function showingMenu(on_off, time) {
    if (on_off) {
        TweenMax.to($('.site-menu'), time, {right: 0});
    } else {
        TweenMax.to($('.site-menu'), time, {right: -$('.site-menu').width()});
    }
}


/*=====================================================================================*/

$('#nav-bars').click(function () {

    registerAnalytics('menugeneral', 'click', 'openmenugeneral');


    $(this).toggleClass('open');

    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        navColors.timeScale(2);
        navColors.reverse();

        showingMenu(false, .5);
    }
    else if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        navColors.play();

        showingMenu(true, .5);
    }
});


$.each($('.nav-items li'), function () {
    $(this).mouseover(function () {
        TweenMax.to($(this).find('span'), .3, {width: '100%'});
        TweenMax.to($(this).find('p'), .3, {color: '#ffffff'});
    });

    $(this).mouseout(function () {
        TweenMax.to($(this).find('span'), .3, {width: 10});
        TweenMax.to($(this).find('p'), .3, {color: '#919191'});
    });
});


/*=====================================================================================*/

$(document).ready(function () {


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    }
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        navigationDevice = 'iphone';
    } else if (/Android/i.test(navigator.userAgent)) {
        navigationDevice = 'android';
    } else {
        navigationDevice = 'desktop';
    }


    /*================*/

    showingMenu(false, 0);

    /*================*/

    $('.home-slick').imagesLoaded()
        .progress(function (imgLoad, image) {

        })
        .always(function () {

            var newheigth = 0;

            if($(window).width() < 600){
                newheigth = $('.home-slick .destacado-mobile').height();
            }else{
                newheigth = $('.home-slick .destacado-desktop').height();
            }
            TweenMax.to($('.home-slick'), 1, {height:newheigth});
        });


    /*================*/

    var controller = new ScrollMagic.Controller();


    new ScrollMagic.Scene({
        triggerElement: ".color-line-div",
        triggerHook: 0
    })
        .setPin(".color-line-div")
        .setTween(".logo-felizzitaciones-top-left", .3, {left: 0})
        .addTo(controller);


    var stripanim = new ScrollMagic.Scene({
        triggerElement: ".color-line-div",
        triggerHook: 0
    })
        .setTween("#top", .3, {x: '+100', yoyo:true, repeat:3})
        .addTo(controller);


    stripanim.on("enter", function (event) {
        controller.removeScene(stripanim);
    });



    /*================*/


    var scrolltween = TweenMax.to($('.home-scroll-img'), .3, {y:'+10', yoyo:true, repeat:10});


    $('.home-scroll-img').mouseover(function () {
        scrolltween.pause();
    });

    $('.home-scroll-img').click(function () {
        TweenLite.to(window, 1, {
            scrollTo: $(window).height(),
            ease: Back.easeOut
        });
    });


    /*================*/

    TweenMax.delayedCall(0, showingPreloader, [false, .4]);

});


$(window).load(function () {

    currHref = window.location.href;




    $('.preloader-tarjetas').css('display', 'none');

    $('.home-slick').slick({
        dots: true,
        appendDots: $('.home-slick-dots')
    });




    $('.home-slick .slick-slide').click(function (e) {

        var id = '.' + $(e.currentTarget).data('category');
        var curpos = $(id).position();
        TweenLite.to(window, 1, {scrollTo: (curpos.top-$('.logo-felizzitaciones-top-left').height())-8, ease: Back.easeOut});


    });





    $('.box-strip-container').slick({
        slidesToShow: 5,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });



    $('.box-strip .strip-navigation .arrow-next').click(function (e) {

        $(e.currentTarget).parent().parent().find('.box-strip-container').slick("slickNext");
    });




    setMenuShareBtns();

    onwindowresize();


    $.each($('.personalizar-share-list ul li'), function () {
        $(this).bind('mouseover', function (e) {
            overColor(e);
        });
        $(this).bind('mouseout', function (e) {
            outColor(e);
        });


        $(this).bind('click', function (e) {

            var currTarjeta = $(e.currentTarget).parent().parent().parent().parent().parent().parent().find('.menu-gif-container').find('img').attr('src');

            switch ($(e.currentTarget).index()){
                case 0:
                    shareGal( currTarjeta );

                    registerAnalytics($(e.currentTarget).parent().parent().parent().parent().parent().parent().data('tarjeta-global-name'), 'click', 'sharefacebook');

                    break;
                case 1:
                    tweet(currTarjeta, 'izzi_mx');
                    registerAnalytics($(e.currentTarget).parent().parent().parent().parent().parent().parent().data('tarjeta-global-name'), 'click', 'sharetwitter');
                    break;
                case 2:
                    var a = $("<a>").attr("href", currTarjeta).attr("download", "tarjeta-felizzitaciones.gif").appendTo("body");
                    a[0].click();
                    a.remove();

                    registerAnalytics($(e.currentTarget).parent().parent().parent().parent().parent().parent().data('tarjeta-global-name'), 'click', 'downloadimage');
                    break;
            }

        });
    });


    setMenuClicks();



    //TweenMax.delayedCall(0, showingPreloader, [false, .4]);

});



$(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        // downscroll code
        scrollDirection = false;
    } else {
        // upscroll code
        scrollDirection = true;
    }
    lastScrollTop = st;
});



$(window).resize(function () {
    onwindowresize();
});


function onwindowresize() {

    currBoxWidth = $('.menu-gif-box')[0].getBoundingClientRect().width;

    initialViewerHeight = currBoxWidth * 2;

    $('.category-box').height(currBoxWidth);

    $('.category-box-rightalign').height(currBoxWidth);


    $('.menu-gif-box').height(currBoxWidth);


    /*=======================*/

    /*$('.instrudef').height(currBoxWidth);

     while ($('.instrudef div').height() > $('.instrudef').height()) {
     $('.instrudef div').css('font-size', (parseInt($('.instrudef div').css('font-size')) - 1) + "px");
     }*/

    $('.category-title-box-name').textfill({
        maxFontPixels: 120
    });

    $('.category-title-box-description').textfill({
        maxFontPixels: 20,
        minFontPixels: 8,
        changeLineHeight: true
    });

    $('.category-title-box-description').find('span').css('line-height', $('.category-title-box-description').find('span').css('font-size'));

    /*=======================*/

    $('.category-title-box-name-rightalign').textfill({
        maxFontPixels: 120
    });

    $('.category-title-box-description-rightalign').textfill({
        maxFontPixels: 20,
        minFontPixels: 9,
        changeLineHeight: true
    });

    $('.category-title-box-description-rightalign').find('span').css('line-height', $('.category-title-box-description-rightalign').find('span').css('font-size'));


    /*=======================*/

    $('.gif-viewer-box-mask').width(initialViewerHeight);

}


var tarjetitaActual;
var tarjetitaPrevia;

function setMenuShareBtns() {


    $.each($('.box-strip-container .menu-gif-box'), function () {

        //$(this).find('.share-icon-white').mouseover(function (e) {
        $(this).mouseover(function (e) {


            if (tarjetitaActual != undefined) {
                tarjetitaPrevia = tarjetitaActual;
            }

            tarjetitaActual = $('*').index($(this));


            if(tarjetitaActual != tarjetitaPrevia){

                if (currOverShare != undefined) {

                    prevOverShare = currOverShare;
                    showPersonalizarBtn(prevOverShare, false);

                    /////////
                    prevPortadaContainer = currPortadaContainer;
                    replacePortadaImage(prevPortadaContainer, currPortada);
                }


                //currOverShare = $(e.currentTarget).parent();
                currOverShare = $(e.currentTarget).find('.menu-gif-btn-mask .menu-gif-btn-wrapper');
                showPersonalizarBtn(currOverShare, true);



                //var gifURL = $(e.currentTarget).parent().find('.personalizar-share-btn').data('giphy-url');
                var gifURL = $(e.currentTarget).find('.menu-gif-btn-mask').find('.menu-gif-btn-wrapper').find('.personalizar-share-btn').data('giphy-url');

                /////////
                currPortadaContainer = $(currOverShare).parent().parent().find('.menu-gif-container');
                currPortada = $(currPortadaContainer).find('img').attr('src');


                if(gifURL != undefined){
                    replacePortadaImage(currPortadaContainer, gifURL);
                }

            }

        });


        TweenMax.set($(this).find('.menu-gif-btn-wrapper'), {left: -$('.menu-gif-btn-mask').width()});
    });


    $('.personalizar-btn-wrapper').click(function (e) {


        if (currWindowPos != undefined) {
            prevWindowPos = currWindowPos;
        }

        currWindowPos = $(window).scrollTop();


        tarjetaGlobalNameClicked = $(e.currentTarget).parent().parent().parent().parent().parent().data('tarjeta-global-name');

        if (currPersonalizarBtn != undefined) {
            prevPersonalizarBtn = currPersonalizarBtn;
        }


        registerAnalytics($(e.currentTarget).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id'), 'click', tarjetaGlobalNameClicked);

        currPersonalizarBtn = $(e.currentTarget).index('.personalizar-btn-wrapper');

        if (currPersonalizarBtn != prevPersonalizarBtn) {

            if (isViewerOpen) {

                switch (gifCustomStage) {
                    case 0:
                        showingViewer(currViewer, false);

                        TweenMax.delayedCall(.5, function () {
                            /*$('.gif-viewer-backgoptions').html('');*/
                            $(currViewer).html('');
                        });
                        break;
                    case 1:
                        showingViewer(currViewer, false)

                        TweenMax.delayedCall(.5, function () {
                            /*$('.gif-viewer-backgoptions').html('');*/
                            $(currViewer).html('');
                            $('#fromInput').val('');
                            $('#toInput').val('');
                        });
                        break;
                    case 2:
                        showingViewer(currViewer, false);

                        TweenMax.delayedCall(.5, restartGifEngine);
                        break;
                }

                TweenMax.delayedCall(.7, function () {

                    setViewer(e.currentTarget);
                });

            } else {
                setViewer(e.currentTarget);
            }


        } else {
            //console.log('el mismo :/');
        }


    });
}


function setViewer(_currtarget) {
    //currWindowPos = $(window).scrollTop();

    currBoxStrip = $(_currtarget).parent().parent().parent().parent().parent().parent().parent().parent();

    currBoxStripID = $(currBoxStrip).index('.box-strip-container');
    currViewer = $('.gif-viewer').eq(currBoxStripID);

    var boxstrippos = $(currViewer).position();

    var animto = boxstrippos.top - ( $(window).height() / 2 - ((initialViewerHeight) / 2) );


    TweenLite.to(window, 1, {scrollTo:animto, ease: Back.easeOut});


    currGifBox = $(_currtarget).parent().parent().parent().parent().parent();


    loadViewer(currViewer, function () {


        onwindowresize();
        showingViewer(currViewer, true);

        fillwasapinfo();

        showingWasap(false, 0);
        showingGifGifPreloader(false, 0);
        TweenMax.set($('.gif-viewer-wasap'), {left:-initialViewerHeight});
        TweenMax.set($('.gif-viewer-preloader'), {left: initialViewerHeight * 2});


        gifCustomStage = 0;


        if ($(currGifBox).data('background-color-option-a') != undefined) {
            //console.log('set color');

            isColorBackground = true;


            $('.gif-viewer-backgoptions').prepend(
                '<div class="backgoption backgoptioncolor" style="background-color: ' + $(currGifBox).data('background-color-option-a') + ';"></div>' +
                '<div class="backgoption backgoptioncolor" style="background-color: ' + $(currGifBox).data('background-color-option-b') + ';"></div>' +
                '<div class="backgoption backgoptioncolor" style="background-color: ' + $(currGifBox).data('background-color-option-c') + ';"></div>' +
                '<div class="backgoption backgoptioncolor" style="background-color: ' + $(currGifBox).data('background-color-option-d') + ';"></div>'
            );


            TweenMax.fromTo($('.backgoptioncolor').eq(0), .7, {scale: 0}, {delay: .1, scale: 1, ease: Back.easeOut});
            TweenMax.fromTo($('.backgoptioncolor').eq(1), .7, {scale: 0}, {delay: .2, scale: 1, ease: Back.easeOut});
            TweenMax.fromTo($('.backgoptioncolor').eq(2), .7, {scale: 0}, {delay: .3, scale: 1, ease: Back.easeOut});
            TweenMax.fromTo($('.backgoptioncolor').eq(3), .7, {scale: 0}, {delay: .4, scale: 1, ease: Back.easeOut});


            $('.backgoptioncolor').mouseover(function (e) {
                overColor(e);
            });

            $('.backgoptioncolor').mouseout(function (e) {
                outColor(e);
            });


            onBackgroundOptionsComplete();

        } else {
            console.log('load imaganes')

            isColorBackground = false;

            $('.gif-viewer-backgoptions').prepend(
                '<div class="backgoption is-loading"><img src="' + $(currGifBox).data('back-option-a') + '" alt=""></div>' +
                '<div class="backgoption is-loading"><img src="' + $(currGifBox).data('back-option-b') + '" alt=""></div>' +
                '<div class="backgoption is-loading"><img src="' + $(currGifBox).data('back-option-c') + '" alt=""></div>' +
                '<div class="backgoption is-loading"><img src="' + $(currGifBox).data('back-option-d') + '" alt=""></div>'
            );

            $('.gif-viewer-backgoptions').imagesLoaded()
                .progress(function (imgLoad, image) {
                    var $item = $(image.img).parent();
                    $item.removeClass('is-loading');

                    TweenMax.fromTo($item, .7, {scale: 0}, {delay: .4, scale: 1, ease: Back.easeOut});
                })
                .always(function () {

                    onBackgroundOptionsComplete();

                });
        }






        $('.gif-viewer-guardar').mouseover(function (e) {
            TweenMax.to($(e.currentTarget), .3, {backgroundColor: '#d2007e'});
        });
        $('.gif-viewer-guardar').mouseout(function (e) {
            TweenMax.to($(e.currentTarget), .3, {backgroundColor: '#01dacf'});
        });


        $('#fromInput').add('#toInput').focus(function (e) {
            TweenMax.to($(e.currentTarget), .3, {backgroundColor: '#f6cc16'});
        });
        $('#fromInput').add('#toInput').focusout(function (e) {
            TweenMax.to($(e.currentTarget), .3, {backgroundColor: '#d2007e'});
        });

        $('.gif-viewer-guardar').click(function () {

            registerAnalytics(tarjetaGlobalNameClicked, 'click', 'guardar');

            if ($('#fromInput').val()) {

                if ($('#toInput').val()) {

                    createCanvasGif();
                    moveGifCustomSettings(2, .3);

                    showingGifGifPreloader(true, .3);
                    $('.preloader-message').html('Estamos preparando tu tarjeta de Felizzitaciones :)');

                    TweenMax.to(currViewer, .3, {height: initialViewerHeight + $('.gif-viewer-bottom').height()});

                    gifCustomStage = 2;

                } else {
                    warningNames($('#toInput'));
                }
            } else {
                warningNames($('#fromInput'));
            }


        });

        $('.gif-viewer-wasap .gif-viewer-close').click(function () {

            registerAnalytics(tarjetaGlobalNameClicked, 'click', 'cerrarwhatsappintrucciones');

            showingWasap(false, .3);
        });

        $('.gif-viewer-depara .gif-viewer-close').click(function () {

            registerAnalytics(tarjetaGlobalNameClicked, 'click', 'cerrarendepara');

            showingViewer(currViewer, false)

            TweenMax.delayedCall(.5, function () {
                $(currViewer).html('');
                $('#fromInput').val('');
                $('#toInput').val('');
            });

            showPersonalizarBtn(currOverShare, false);
            prevPersonalizarBtn = undefined;
            currPersonalizarBtn = undefined;
        });

        $('.gif-viewer-final .gif-viewer-close').click(function () {

            registerAnalytics(tarjetaGlobalNameClicked, 'click', 'cerrarenfinal');

            showingViewer(currViewer, false);

            TweenMax.delayedCall(.5, restartGifEngine);

            showPersonalizarBtn(currOverShare, false);
            prevPersonalizarBtn = undefined;
            currPersonalizarBtn = undefined;

        });


        $('.gif-viewer-depara .gif-viewer-back').click(function () {

            registerAnalytics(tarjetaGlobalNameClicked, 'click', 'regresarendepara');

            moveGifCustomSettings(0, .3);

            gifCustomStage = 0;
        });


        $('.gif-viewer-final .gif-viewer-canvas-share ul li').eq(4).click(function () {

            registerAnalytics(tarjetaGlobalNameClicked, 'click', 'volveralinicio');

            moveGifCustomSettings(0, .3);

            TweenMax.to(currViewer, .3, {height: initialViewerHeight});

            $('.gif-viewer-canvas').html('<canvas id="myCanvas"></canvas>');
            initialGif();

            $('#fromInput').val('');
            $('#toInput').val('');

            gifCustomStage = 0;
        });


        $.each($('.gif-viewer-canvas-share ul li'), function () {
            $(this).bind('mouseover', function (e) {
                overColor(e);
            });
            $(this).bind('mouseout', function (e) {
                outColor(e);
            });
        });


        initialGif();


    });
}

function overColor(e) {
    TweenMax.to($(e.currentTarget), .3, {scale: 1.2, ease: Back.easeOut});
}
function outColor(e) {
    TweenMax.to($(e.currentTarget), .3, {scale: 1, ease: Back.easeOut});
}


function onBackgroundOptionsComplete() {
    $('.gif-viewer-fondo .gif-viewer-close').click(function () {

        registerAnalytics(tarjetaGlobalNameClicked, 'click', 'cerrarenfondo');

        showingViewer(currViewer, false);

        TweenMax.delayedCall(.5, function () {
            $(currViewer).html('');
            /*$('.gif-viewer-backgoptions').html('');*/
        });

        showPersonalizarBtn(currOverShare, false);
        prevPersonalizarBtn = undefined;
        currPersonalizarBtn = undefined;
    });

    $('.backgoption').click(function (e) {

        registerAnalytics(tarjetaGlobalNameClicked, 'click', 'opcion'+$(e.currentTarget).index());

        gifColorSelected = $(e.currentTarget).index('.backgoption');
        moveGifCustomSettings(1, .3);

        gifCustomStage = 1;
    });

    $('.backgoption').mouseover(function (e) {
        overColor(e);
    });

    $('.backgoption').mouseout(function (e) {
        outColor(e);
    });


}

function restartGifEngine() {

    $('.gif-viewer-canvas').html('<canvas id="myCanvas"></canvas>');
    $(currViewer).html('');


    $('#fromInput').val('');
    $('#toInput').val('');

}


function showingWasap(on_off, time) {
    if (on_off) {
        TweenMax.fromTo($('.gif-viewer-wasap'), time, {left: initialViewerHeight}, {left: initialViewerHeight * 2});
    } else {
        TweenMax.fromTo($('.gif-viewer-wasap'), time, {left: initialViewerHeight * 2}, {left: initialViewerHeight * 3});
    }
}

function showingViewer(elem, on_off) {
    if (on_off) {
        TweenMax.to($(elem), .5, {height: (initialViewerHeight)});
        isViewerOpen = true;
    } else {
        TweenMax.to($(elem), 1, {
            height: 0, onComplete: function () {
                moveGifCustomSettings(0, 0);
            }
        });


        if(scrollDirection){
            TweenLite.to(window, 1, {scrollTo: $(window).scrollTop()-currBoxWidth, ease: Back.easeOut});
        }

        isViewerOpen = false;
    }
}





function replacePortadaImage(_target, _url) {
    $(_target).find('img').attr('src', _url);
}



function showPersonalizarBtn(obj, on_off) {
    if (on_off) {
        TweenMax.to($(obj), .3, {left: 0});

    } else {
        TweenMax.to($(obj), .6, {left: -currBoxWidth, ease: Back.easeOut});
    }
}


function loadViewer(_container, _callback) {

    $(_container).load("viewer.html", function () {
        _callback();
    });
}

function moveGifCustomSettings(_page, _time) {
    TweenMax.to($('.gif-viewer-box-wrapper'), _time, {left: -((initialViewerHeight) * _page)});
}


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

    //console.log('initialGif');
}


function gameLoop() {

    canvasAnim = window.requestAnimationFrame(gameLoop);

    coin.update();
    coin.render();
}


function stopCanvasAnim() {
    cancelAnimationFrame(canvasAnim);
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

            saveGif();

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

        if (!isColorBackground) {
            that.bgcontext.drawImage(backImgUrl, 0, 0, 400, 400);
        } else {
            that.bgcontext.fillStyle = backColorSelected;
            that.bgcontext.fillRect(0, 0, 400, 400);
        }


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


        var myFont;

        if ($(currGifBox).data('fromto-bold') && $(currGifBox).data('fromto-italic')) {

            myFont = 'bold ' + 'italic ' + $(currGifBox).data('fromto-size') + ' ' + $(currGifBox).data('fromto-font');

        }

        else if (($(currGifBox).data('fromto-bold'))) {

            myFont = 'bold ' + $(currGifBox).data('fromto-size') + ' ' + $(currGifBox).data('fromto-font');

        } else if (($(currGifBox).data('fromto-italic'))) {

            myFont = 'italic ' + $(currGifBox).data('fromto-size') + ' ' + $(currGifBox).data('fromto-font');

        } else {
            myFont = $(currGifBox).data('fromto-size') + ' ' + $(currGifBox).data('fromto-font');
        }


        // draw tu nombre
        that.decontext.fillStyle = $(currGifBox).data('fromto-color');
        that.decontext.font = myFont;
        that.decontext.textAlign = $(currGifBox).data('from-align');


        // draw el nombre de lo que viene siendo esa personita especial
        that.paracontext.fillStyle = $(currGifBox).data('fromto-color');
        that.paracontext.font = myFont;
        that.paracontext.textAlign = $(currGifBox).data('to-align');



        if ($(currGifBox).data('from-rotation') == 0) {
            that.decontext.fillText(gifNameFrom, $(currGifBox).data('from-posx'), $(currGifBox).data('from-posy'));
        } else {
            that.decontext.save();
            that.decontext.rotate(8 * Math.PI / $(currGifBox).data('from-rotation'));
            that.decontext.fillText(gifNameFrom, $(currGifBox).data('from-posx'), $(currGifBox).data('from-posy'));
            that.decontext.restore();
        }

        if ($(currGifBox).data('to-rotation') == 0) {
            that.paracontext.fillText(gifNameTo, $(currGifBox).data('to-posx'), $(currGifBox).data('to-posy'));
        } else {
            that.paracontext.save();
            that.paracontext.rotate(8 * Math.PI / $(currGifBox).data('to-rotation'));
            that.paracontext.fillText(gifNameTo, $(currGifBox).data('to-posx'), $(currGifBox).data('to-posy'));
            that.paracontext.restore();
        }


    };

    return that;
}


function saveGif() {

    if (nowSave) {

        count++;
        encoder.addFrame(coin.gifcontext);
        console.log('rcording: ' + count)


        if (count > grabLimit - 1) {
            console.log('stop rcording');

            showResults(encoder);


            allowsaving = false;
            nowSave = false;
            count = 0;
            gifSpeed = normalSpeed;
        }
    }
}


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return 'calaverita-' + uuid;
}


function uploadGif(imagedata) {

    console.log('saving gif in server');

    //var currentName = generateUUID();

    $.ajax({
        url: "/upload",
        // send the base64 post parameter


        data: {
            image: imagedata
            //uuidname: currentName
        },
        // important POST method !
        type: "post",
        success: function (response) {

            $('.preloader-message').html('ya falta poco :O');

            console.log(response);

            var currHref_substr = currHref.substr(0, currHref.length-1);
            var myurl = currHref_substr + response;
            GIPHYGif(myurl);

        },
        complete: function (e) {

        }
    });
}

function changeAllowSaving() {
    allowsaving = true;
    encoder.start();
};


function showResults() {
    console.log('Finishing');

    encoder.finish();

    stopCanvasAnim();

    var binary_gif = encoder.stream().getData();
    var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
    $('.gif-viewer-canvas').html('<img src="' + data_url + '"/>');


    $('.gif-viewer-canvas-share ul li').eq(2).bind('click', function () {

        registerAnalytics(tarjetaGlobalNameClicked, 'click', 'descarcar');

        var a = $("<a>").attr("href", data_url).attr("download", "tarjeta-felizzitaciones-" + $(currGifBox).data('tarjeta-global-name') + ".gif").appendTo("body");
        a[0].click();
        a.remove();
    });

    $('.gif-viewer-canvas-share ul li').eq(3).bind('click', function () {

        registerAnalytics(tarjetaGlobalNameClicked, 'click', 'whatsappinstrucciones');

        showingWasap(true, .3);
    });


    uploadGif(data_url);

    //TweenMax.delayedCall(2, showingGifGifPreloader, [false, .4]);
}


function GIPHYGif(currentURL) {

    console.log('posting to giphy');

    $.ajax({
        type: 'POST',
        url: 'https://upload.giphy.com/v1/gifs',
        data: {
            username: 'alonso19m',
            api_key: 'l0MYMT0GdpmGyJjpK',
            file: '',
            source_image_url: currentURL,
            tags: 'izzi, felizzitaciones'
        },
        success: function (e) {

            console.log(e);
            console.log(e.data.id);

            giphyURL = 'https://media.giphy.com/media/' + e.data.id + '/giphy.gif';

            $('.gif-viewer-canvas-share ul li').eq(0).click(function () {

                registerAnalytics(tarjetaGlobalNameClicked, 'click', 'compartirfacebook');

                shareGal(giphyURL);
            });

            $('.gif-viewer-canvas-share ul li').eq(1).click(function () {

                registerAnalytics(tarjetaGlobalNameClicked, 'click', 'compartirtwitter');

                tweet('https://giphy.com/gifs/' + e.data.id, 'izzi_mx');
            });

            $('.preloader-message').html('listo! :D');
            TweenMax.delayedCall(2, showingGifGifPreloader, [false, .4]);

            //window.open('https://media.giphy.com/media/' + e.data.id + '/giphy.gif');
        },
        error: function () {
            console.log('error')
        }
    });
}


function createCanvasGif() {

    gifNameFrom = $('#fromInput').val().toUpperCase();
    gifNameTo = $('#toInput').val().toUpperCase();

    $('#images-loader-container').html('<img src="' + $(currGifBox).data('sprite-url') + '" alt="">');
    $('#images-loader-container').imagesLoaded()
        .done(function () {

            coinImage.src = $(currGifBox).data('sprite-url');
            coinImage.addEventListener("load", gameLoop);
            TweenMax.delayedCall(2, changeAllowSaving);
        });


    if (!isColorBackground) {
        switch (gifColorSelected) {
            case 0:
                backImgUrl.src = $(currGifBox).data('back-option-a');
                break;
            case 1:
                backImgUrl.src = $(currGifBox).data('back-option-b');
                break;
            case 2:
                backImgUrl.src = $(currGifBox).data('back-option-c');
                break;
            case 3:
                backImgUrl.src = $(currGifBox).data('back-option-d');
                break;
        }
    } else {
        switch (gifColorSelected) {
            case 0:
                backColorSelected = $(currGifBox).data('background-color-option-a');
                break;
            case 1:
                backColorSelected = $(currGifBox).data('background-color-option-b');
                break;
            case 2:
                backColorSelected = $(currGifBox).data('background-color-option-c');
                break;
            case 3:
                backColorSelected = $(currGifBox).data('background-color-option-d');
                break;
        }
    }
}


function shareGal(_img) {
    FB.ui({
        method: 'share',
        href: _img,
        caption: 'http://felizzitaciones.izzi.mx/'
    }, function (response) {
        /*ga('send', 'event', {
         eventCategory: _gif,
         eventAction: 'compartir-completo'
         });*/
    });
}


function tweet(mygif) {
    window.open('http://twitter.com/share?text=¡Ya tengo mi tarjeta personalizada gracias a @izzi_mx! Crea la tuya en felizzitaciones.izzi.mx&url=' + mygif, '_blank', 'top=0,left=0,width=400,height=400');
}


function showingPreloader(on_off, time) {
    if (on_off) {
        TweenMax.to($('.preloader-backcolor'), time, {alpha: 1});
        TweenMax.to($('.preloader-gif'), time, {scale: 1, ease: Back.easeOut});

    } else {
        TweenMax.to($('.preloader-backcolor'), time, {alpha: 0});
        TweenMax.to($('.preloader-gif'), time, {
            scale: 0, ease: Back.easeIn, onComplete: function () {

            }
        });

    }
}


function showingGifGifPreloader(on_off, time) {
    if (on_off) {
        TweenMax.to($('.gif-viewer-preloader-back'), time, {alpha: 1});
        TweenMax.to($('.gif-viewer-preloader'), time, {scale: 1, ease: Back.easeOut});

    } else {
        TweenMax.to($('.gif-viewer-preloader-back'), time, {alpha: 0});
        TweenMax.to($('.gif-viewer-preloader'), time, {
            scale: 0, ease: Back.easeIn, onComplete: function () {

            }
        });

    }
}


function fillwasapinfo() {
    var iphonecont = 'INSTRUCCIONES iPhone' +
        '<br>' +
        '<br>Asegúrate de estar utilizando Safari como navegador.' +
        '<br>Toca el botón de descargar.' +
        '<br>En la nueva ventana toca el botón de compartir.' +
        '<br>Busca la aplicación WhatsApp y selecciónala.' +
        '<br>Selecciona el contacto al que deseas enviar tu felizzitación.';

    var androidcont = 'INSTRUCCIONES Android' +
        '<br>' +
        '<br>Toca el botón de descargar.' +
        '<br>En la nueva ventana toca el botón de menú en chrome (el de los 3 puntitos).' +
        '<br>Toca el botón de compartir.' +
        '<br>Busca la aplicación WhatsApp y selecciónala.' +
        '<br>Selecciona el contacto al que deseas enviar tu felizzitación.';


    switch (navigationDevice) {
        case 'iphone':
            $('.instrudef-wrapper').html(iphonecont);
            break;
        case 'android':
            $('.instrudef-wrapper').html(androidcont);
            break;
        case 'desktop':
            $('.instrudef-wrapper').html(iphonecont +'<br><br>'+ androidcont);
            break;
    }


}



function setMenuClicks() {
    $.each($('.nav-items li'), function () {
        $(this).click(function (e) {
            var id = '.' + $(e.currentTarget).data('category');
            var curpos = $(id).position();
            TweenLite.to(window, 1, {scrollTo: (curpos.top-$('.logo-felizzitaciones-top-left').height())-8, ease: Back.easeOut});

            registerAnalytics('menugeneral', 'click', $(e.currentTarget).data('category'));
        });
    });
}


function warningNames(_id) {
    TweenMax.to($(_id), .1, {rotation: 5});
    TweenMax.to($(_id), .1, {delay: .1, rotation: 0});
    TweenMax.to($(_id), .1, {delay: .2, rotation: 5});
    TweenMax.to($(_id), .1, {delay: .3, rotation: 0});
}




/*FACEBOOK API*/
window.fbAsyncInit = function () {
    FB.init({
        appId: '616118785257409',
        //appId: '616155045253783',//ac
        xfbml: true,
        version: 'v2.5'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function registerAnalytics(_eventCategory, _eventAction, _eventLabel) {

    console.log(_eventCategory + " " + _eventAction + " " + _eventLabel);

    ga('send', {
        hitType: 'event',
        eventCategory: _eventCategory,
        eventAction: _eventAction,
        eventLabel: _eventLabel
    });

}


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-75870004-9', 'auto');
ga('send', 'pageview');

