(function() {
    $(document).ready((function(_this) {
        return function() {
            $('.js-scroll-to').click(function(e) {
                var $offsetTop, target;
                target = $(this).attr('href');
                $offsetTop = $(target).offset().top - $('.js-scroll-to').outerHeight() - 10;
                $('html, body').stop().animate({
                    scrollTop: $offsetTop
                }, 500);
                $('.js-scroll-to .navbar-brand.__current').removeClass('__current');
                $(this).addClass('__current');
                e.preventDefault();
            });
            $(window).scroll(function() {
                var topW;
                topW = $(window).scrollTop();
                $('.items-list').each(function(i) {
                    if ($(this).position().top <= topW + 80) {
                        $('.js-scroll-to .navbar-brand.__current').removeClass('__current');
                        return $('.js-scroll-to .navbar-brand').eq(i).addClass('__current');
                    }
                });
            });

            $('.js-wysihtml5').wysihtml5({
                "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                "emphasis": true, //Italics, bold, etc. Default true
                "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                "html": true, //Button which allows you to edit the generated HTML. Default false
                "link": false, //Button to insert a link. Default true
                "image": false, //Button to insert an image. Default true,
                "color": true //Button to change color of font
            });

        };
    })(this));

}).call(this);