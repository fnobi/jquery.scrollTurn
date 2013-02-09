(function ($) {
        $.fn.scrollTurn = function (opt) {
                var posit = function () {
                        var scroll = $(window).scrollTop();

                        $children.each(function (index) {
                                var top = this.offsetTop - scroll;
                                var deg = top * speed;

                                var originLeft = clockWise ? 1 : 0;
                                var adjustLeft = clockWise ? (
                                        radius - Math.cos(Math.PI * -deg / 180) * radius
                                ) : (
                                        -radius + Math.cos(Math.PI * deg / 180) * radius
                                );
                                var adjustTop = (-top + Math.sin(Math.PI * deg / 180) * radius);

                                if ((deg < -90 || 90 <= deg) && !infinite) {
                                        $(this).css({
                                                transform: 'none',
                                                opacity: 0
                                        });
                                        return;
                                }

                                $(this).css({
                                        opacity: 1,
                                        transformOrigin: (originLeft * 100) + '% 0%',
                                        transform: [
                                                'translate(' + adjustLeft + 'px, ' + adjustTop + 'px)',
                                                'rotate(' + (clockWise ? -deg : deg) + 'deg)'
                                        ].join(' ')
                                });
                        });
                };

                opt = opt || {};

                var $root = this;
                var $children = $root.children();

                var speed = 360 / $root[0].offsetHeight;

                var radius = opt.radius || 0;
                var infinite = opt.infinite || false;
                var clockWise = opt.clockWise || false;

                $(window).scroll(posit);
                posit();
        };
})(jQuery);