/**
 * Created by tonywang on 9/24/15.
 */
$.AdminSpace = {};

$(function () {
    "use strict";

    //Fix for IE page transitions
    $("body").removeClass("hold-transition");

    //Enable sidebar tree view controls
    $('#left-side').treeMenu();
    //Enable the nice scroll bar
    $('#left-side').niceScroll({scrollspeed:100,mousescrollstep:15,cursorborder:'1px solid #868688'});
});