
$(function() {
    if (location.href.match("forum") != null) {
        let image_hide = true;
        $(".hidable_element").hide();

        $(".image_hidable_button").click(function() {
            if (!image_hide) {
                $(".hidable_element").fadeOut();
                $(".tool_icon").attr("src", "../../tool_icon/open_element.webp");
                $(".tool_icon").attr("alt", "表示");
                $(".menu_text").text("表示する");
                
                image_hide = true;
            } else {
                $(".hidable_element").fadeIn();
                $(".tool_icon").attr("src", "../../tool_icon/close_element.webp");
                $(".tool_icon").attr("alt", "非表示");
                $(".menu_text").text("閉じる");

                image_hide = false;
            }
        });
    }
})