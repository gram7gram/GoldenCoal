$(function () {

    var visible = false;
    var scrollToTop = $('<a href="#" class="scrollToTop"><img src="/img/up.png"/></a>')

    $('body').append(scrollToTop);

    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (!visible && scrollTop > 100) {
            scrollToTop.fadeIn();
            visible = true;
        } else if (visible && scrollTop <= 100) {
            scrollToTop.fadeOut();
            visible = false;
        }
    });

    //Click event to scroll to top
    scrollToTop.click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });

});