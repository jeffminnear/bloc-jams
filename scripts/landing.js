var pointsArray = document.getElementsByClassName('point');

var animatePoints = function animatePoints(points) {

    var revealPoint = function revealPoint(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) scaleY(1) translateY(0)";
        point.style.msTransform = "scaleX(1) scaleY(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) scaleY(1) translateY(0)";
        point.style.color = "#FFFFFF";
    };

    forEach(points, revealPoint);
};

window.onload = function () {
    // automatically animate selling points on tall screens
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }

    // animate selling points when user scrolls them into view
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function (event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
};
