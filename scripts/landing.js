var animatePoints = function animatePoints() {

    var revealPoint = function revealPoint() {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) scaleY(1) translateY(0)',
            color: 'white'
        });
    };

    $.each($('.point'), revealPoint);
};

$(window).load(function () {
    // automatically animate selling points on tall screens
    if ($(window).height > 950) {
        animatePoints();
    }

    // animate selling points when user scrolls them into view
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

    $(window).scroll(function (event) {
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
});
