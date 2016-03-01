var animatePoints = function animatePoints() {

    var points = document.getElementsByClassName('point');

    var revealPoint = function revealPoint(i) {

        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) scaleY(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) scaleY(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) scaleY(1) translateY(0)";
        points[i].style.color = "#FFFFFF";
    };

    var pointsLength = points.length;
    for (var i = 0; i < pointsLength; i++) {
        revealPoint(i);
    }
};
