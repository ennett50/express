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
            return $(window).scroll(function() {
                var topW;
                topW = $(window).scrollTop();
                $('.items-list').each(function(i) {
                    if ($(this).position().top <= topW + 80) {
                        $('.js-scroll-to .navbar-brand.__current').removeClass('__current');
                        return $('.js-scroll-to .navbar-brand').eq(i).addClass('__current');
                    }
                });
            });
        };
    })(this));

}).call(this);