(function( $ ) {

    $.fn.setautowidth = function( options ) {


        var totalwidth = 0;

        var defaults = {
            aditionalWidth: 0
        };

        var settings = $.extend( {}, defaults, options );

        this.children().each(function () {
            totalwidth += Math.ceil( this.getBoundingClientRect().width );
        });

        this.width(totalwidth + settings.aditionalWidth);
    };

}( jQuery ));

