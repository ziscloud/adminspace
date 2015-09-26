/**
 * Created by tonywang on 9/25/15.
 */
(function($){
    $.TreeMenu = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("TreeMenu", base);

        base.init = function(){
            base.options = $.extend({},$.TreeMenu.defaultOptions, options);

            // Put your initialization code here
            base.initMenu(base.$el);
        };

        // Sample Function, Uncomment to use
        // base.functionName = function(paramaters){
        //
        // };
        base.initMenu = function (menu) {
            var animationSpeed = base.options.animationSpeed;
            menu.on('click', 'li a', function (e) {
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    //Close the menu
                    checkElement.slideUp(animationSpeed, function () {
                        checkElement.removeClass('menu-open');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        //_this.layout.fix();
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = $this.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown(animationSpeed, function () {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        };

        // Run initializer
        base.init();
    };

    $.TreeMenu.defaultOptions = {
        animationSpeed: 500
    };

    $.fn.treeMenu = function(options){
        return this.each(function(){
            (new $.TreeMenu(this, options));
        });
    };

})(jQuery);