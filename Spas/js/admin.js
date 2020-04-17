// //Func for Index HTML get username
// function user(database) {
//     document.getElementById("user_name").innerHTML = localStorage.getItem("name");
// }
// // Func for index HTML get Meal
// function get_meals(database) {
//     document.getElementById("loader").style.display = "block";
//     var ref = database.database().ref("Meals");


//     ref.on('value', function(snapshot) {
//         if (snapshot.numChildren() != 0) {
//             document.getElementById("right-sub").innerHTML = "";
//             snapshot.forEach(function(childSnapshot) {
//                 var name = childSnapshot.key;

//                 var ingridient = [];
//                 var amount = [];
//                 var units = [];

//                 var preparation = [];

//                 var direction = [];

//                 var cooking_method = [];
//                 var cooking_time = [];
//                 var cooking_temp = [];

//                 var i = 0;

//                 childSnapshot.child("Ingridients").forEach(function(childSnapshot1) {
//                     ingridient[i] = childSnapshot1.val();
//                     i++;
//                 });
//                 i = 0;
//                 childSnapshot.child("Amount").forEach(function(childSnapshot1) {
//                     amount[i] = childSnapshot1.val();
//                     i++;
//                 });
//                 i = 0;
//                 childSnapshot.child("Units").forEach(function(childSnapshot1) {
//                     units[i] = childSnapshot1.val();
//                     i++;
//                 });
//                 if (childSnapshot.child("Cooking_method").numChildren() != 0) {
//                     i = 0;
//                     childSnapshot.child("Cooking_method").forEach(function(childSnapshot1) {
//                         cooking_method[i] = childSnapshot1.val();
//                         i++;
//                     });
//                 }

//                 if (childSnapshot.child("Cooking_temperature").numChildren() != 0) {
//                     i = 0;
//                     childSnapshot.child("Cooking_temperature").forEach(function(childSnapshot1) {
//                         cooking_temp[i] = childSnapshot1.val();
//                         i++;
//                     });
//                 }

//                 if (childSnapshot.child("Preparation_method").numChildren() != 0) {
//                     i = 0;
//                     childSnapshot.child("Preparation_method").forEach(function(childSnapshot1) {
//                         preparation[i] = childSnapshot1.val();
//                         i++;
//                     });
//                 }
//                 if (childSnapshot.child("Directions").numChildren() != 0) {
//                     i = 0;
//                     childSnapshot.child("Directions").forEach(function(childSnapshot1) {
//                         direction[i] = childSnapshot1.val();
//                         i++;
//                     });
//                 }

//                 var main_div = document.getElementById("right-sub");
//                 var new_div = document.createElement("div");
//                 new_div.classList.add("meal");
//                 new_div.setAttribute("align", "left");

//                 var meal_name = document.createElement("H4");
//                 var t = document.createTextNode(name);
//                 meal_name.appendChild(t);
//                 meal_name.setAttribute("align", "center");

//                 var b = document.createElement("b");
//                 t = document.createTextNode("Ingridients");
//                 b.appendChild(t);

//                 var p;

//                 new_div.appendChild(meal_name);
//                 new_div.appendChild(b);

//                 i = 0;
//                 while (i < ingridient.length) {
//                     p = document.createElement("p");
//                     t = document.createTextNode(i + 1 + ". " + ingridient[i] + " - " + amount[i] + units[i]);
//                     p.appendChild(t);
//                     new_div.appendChild(p);

//                     i++;
//                 }

//                 if (preparation.length != 0) {
//                     b = document.createElement("b");
//                     t = document.createTextNode("Preparation");
//                     b.appendChild(t);
//                     new_div.appendChild(b);

//                     i = 0;
//                     while (i < preparation.length) {
//                         p = document.createElement("p");
//                         t = document.createTextNode(i + 1 + ". " + preparation[i]);
//                         p.appendChild(t);
//                         new_div.appendChild(p);

//                         i++;
//                     }
//                 }
//                 if (direction.length != 0) {
//                     b = document.createElement("b");
//                     t = document.createTextNode("Directions");
//                     b.appendChild(t);
//                     new_div.appendChild(b);

//                     i = 0;
//                     while (i < direction.length) {
//                         p = document.createElement("p");
//                         t = document.createTextNode(i + 1 + ". " + direction[i]);
//                         p.appendChild(t);
//                         new_div.appendChild(p);

//                         i++;
//                     }
//                 }


//                 if (cooking_method.length != 0) {
//                     b = document.createElement("b");
//                     t = document.createTextNode("Cooking Method");
//                     b.appendChild(t);
//                     new_div.appendChild(b);

//                     i = 0;
//                     while (i < cooking_method.length) {
//                         p = document.createElement("p");
//                         t = document.createTextNode(i + 1 + ". " + cooking_method[i]);
//                         p.appendChild(t);
//                         if (childSnapshot.child("Cooking_time").numChildren() != 0) {
//                             i = 0;
//                             childSnapshot.child("Cooking_time").forEach(function(childSnapshot1) {
//                                 if (parseInt(childSnapshot1.key) == i + 1) {
//                                     t = document.createTextNode(" for " + childSnapshot1.val() + " min");
//                                     p.appendChild(t);
//                                 }
//                                 i++;
//                             });
//                         }
//                         if (childSnapshot.child("Cooking_temperature").numChildren() != 0) {
//                             i = 0;
//                             childSnapshot.child("Cooking_temperature").forEach(function(childSnapshot1) {
//                                 if (parseInt(childSnapshot1.key) == i + 1) {
//                                     t = document.createTextNode(" at " + childSnapshot1.val());
//                                     if (!isNaN(childSnapshot1.val())) {
//                                         t.nodeValue += " °C";
//                                     }
//                                     p.appendChild(t);
//                                 }
//                                 i++;
//                             });
//                         }
//                         new_div.appendChild(p);

//                         i++;
//                     }
//                 }

//                 main_div.appendChild(new_div);
//                 document.getElementById("loader").style.display = "none";

//             });
//         } else {
//             document.getElementById("loader").style.display = "none";
//         }
//     });

// }
// if (typeof jQuery === "undefined") {
//     throw new Error("jQuery plugins need to be before this file");
// }

// Checklist JS
$('.task__add').on('focus', function() {
    $(this).val('');
});

$('.task__add').on('blur', function() {
    $(this).val('+ add new task');
});

$('form').on('submit', function(event) {
    event.preventDefault();

    var taskText = $('.task__add').val();
    var tasksN = $('.task').length + 1;

    var newTask = '<label for="task--' + tasksN + '" class="task task--new"><input class="task__check" type="checkbox" id="task--' + tasksN + '" /> <div class="task__field task--row">' + taskText + '<button class="task__important"><i class="fa fa-check" aria-hidden="true"></i></button></div></label>'


    $('.task__list').append(newTask);

    $('.task__add').val('');
    checkList();
});

var lastDeletedTask = '';


function checkList() {


    $('.task').each(function() {

        var $field = $(this).find('.task__field');
        var mousedown = false;


        $field.on('mousedown', function() {
            mousedown = true;
            $field.addClass('shaking');
            setTimeout(deleteTask, 1000)
        });

        $field.on('mouseup', function() {
            mousedown = false;
            $field.removeClass('shaking');
        });

        function deleteTask() {
            if (mousedown) {
                $field.addClass('delete');
                lastDeletedTask = $field.text();
                console.log(lastDeletedTask);

                setTimeout(function() {
                    $field.remove();
                }, 200);
            } else { return; }
        }

    });
}

checkList();


$.AdminBSB = {};
$.AdminBSB.options = {
    colors: {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deepPurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#ffe821',
        amber: '#FFC107',
        orange: '#FF9800',
        deepOrange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        blueGrey: '#607D8B',
        black: '#000000',
        white: '#ffffff'
    },
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollAlwaysVisible: false,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 1170
    },
    dropdownMenu: {
        effectIn: 'fadeIn',
        effectOut: 'fadeOut'
    }
}

/* Left Sidebar - Function =================================================================================================
 *  You can manage the left sidebar menu options
 *  
 */
$.AdminBSB.leftSideBar = {
    activate: function() {
        var _this = this;
        var $body = $('body');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function(e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if (!$target.hasClass('bars') && _this.isOpen() && $target.parents('#leftsidebar').length === 0) {
                if (!$target.hasClass('js-right-sidebar')) $overlay.fadeOut();
                $body.removeClass('overlay-open');
            }
        });

        $.each($('.menu-toggle.toggled'), function(i, val) {
            $(val).next().slideToggle(0);
        });

        //When page load
        $.each($('.menu .list li.active'), function(i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');

            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        //Collapse or Expand Menu
        $('.menu-toggle').on('click', function(e) {
            var $this = $(this);
            var $content = $this.next();

            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                $.each($('.menu-toggle.toggled').not($not).next(), function(i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }

            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });

        //Set menu height
        _this.setMenuHeight(true);
        _this.checkStatusForResize(true);
        $(window).resize(function() {
            _this.setMenuHeight(false);
            _this.checkStatusForResize(false);
        });

        //Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();
    },
    setMenuHeight: function(isFirstTime) {
        if (typeof $.fn.slimScroll != 'undefined') {
            var configs = $.AdminBSB.options.leftSideBar;
            var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
            var $el = $('.list');

            if (!isFirstTime) {
                $el.slimscroll({
                    destroy: true
                });
            }

            $el.slimscroll({
                height: height + "px",
                color: configs.scrollColor,
                size: configs.scrollWidth,
                alwaysVisible: configs.scrollAlwaysVisible,
                borderRadius: configs.scrollBorderRadius,
                railBorderRadius: configs.scrollRailBorderRadius
            });

            //Scroll active menu item when page load, if option set = true
            if ($.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var item = $('.menu .list li.active')[0];
                if (item) {
                    var activeItemOffsetTop = item.offsetTop;
                    if (activeItemOffsetTop > 150) $el.slimscroll({ scrollTo: activeItemOffsetTop + 'px' });
                }
            }
        }
    },
    checkStatusForResize: function(firstTime) {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');
        var width = $body.width();

        if (firstTime) {
            $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function() {
                $(this).removeClass('no-animate').dequeue();
            });
        }

        if (width < $.AdminBSB.options.leftSideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.fadeIn();
        } else {
            $body.removeClass('ls-closed');
            $openCloseBar.fadeOut();
        }
    },
    isOpen: function() {
        return $('body').hasClass('overlay-open');
    }
};
//==========================================================================================================================

/* Right Sidebar - Function ================================================================================================
 *  You can manage the right sidebar menu options
 *  
 */
$.AdminBSB.rightSideBar = {
        activate: function() {
            var _this = this;
            var $sidebar = $('#rightsidebar');
            var $overlay = $('.overlay');

            //Close sidebar
            $(window).click(function(e) {
                var $target = $(e.target);
                if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

                if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
                    if (!$target.hasClass('bars')) $overlay.fadeOut();
                    $sidebar.removeClass('open');
                }
            });

            $('.js-right-sidebar').on('click', function() {
                $sidebar.toggleClass('open');
                if (_this.isOpen()) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
            });
        },
        isOpen: function() {
            return $('.right-sidebar').hasClass('open');
        }
    }
    //==========================================================================================================================

/* Searchbar - Function ================================================================================================
 *  You can manage the search bar
 *  
 */
var $searchBar = $('.search-bar');
$.AdminBSB.search = {
        activate: function() {
            var _this = this;

            //Search button click event
            $('.js-search').on('click', function() {
                _this.showSearchBar();
            });

            //Close search click event
            $searchBar.find('.close-search').on('click', function() {
                _this.hideSearchBar();
            });

            //ESC key on pressed
            $searchBar.find('input[type="text"]').on('keyup', function(e) {
                if (e.keyCode == 27) {
                    _this.hideSearchBar();
                }
            });
        },
        showSearchBar: function() {
            $searchBar.addClass('open');
            $searchBar.find('input[type="text"]').focus();
        },
        hideSearchBar: function() {
            $searchBar.removeClass('open');
            $searchBar.find('input[type="text"]').val('');
        }
    }
    //==========================================================================================================================

/* Navbar - Function =======================================================================================================
 *  You can manage the navbar
 *  
 */
$.AdminBSB.navbar = {
        activate: function() {
            var $body = $('body');
            var $overlay = $('.overlay');

            //Open left sidebar panel
            $('.bars').on('click', function() {
                $body.toggleClass('overlay-open');
                if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
            });

            //Close collapse bar on click event
            $('.nav [data-close="true"]').on('click', function() {
                var isVisible = $('.navbar-toggle').is(':visible');
                var $navbarCollapse = $('.navbar-collapse');

                if (isVisible) {
                    $navbarCollapse.slideUp(function() {
                        $navbarCollapse.removeClass('in').removeAttr('style');
                    });
                }
            });
        }
    }
    //==========================================================================================================================

/* Input - Function ========================================================================================================
 *  You can manage the inputs(also textareas) with name of class 'form-control'
 *  
 */
$.AdminBSB.input = {
        activate: function($parentSelector) {
            $parentSelector = $parentSelector || $('body');

            //On focus event
            $parentSelector.find('.form-control').focus(function() {
                $(this).closest('.form-line').addClass('focused');
            });

            //On focusout event
            $parentSelector.find('.form-control').focusout(function() {
                var $this = $(this);
                if ($this.parents('.form-group').hasClass('form-float')) {
                    if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
                } else {
                    $this.parents('.form-line').removeClass('focused');
                }
            });

            //On label click
            $parentSelector.on('click', '.form-float .form-line .form-label', function() {
                $(this).parent().find('input').focus();
            });

            //Not blank form
            $parentSelector.find('.form-control').each(function() {
                if ($(this).val() !== '') {
                    $(this).parents('.form-line').addClass('focused');
                }
            });
        }
    }
    //==========================================================================================================================

/* Form - Select - Function ================================================================================================
 *  You can manage the 'select' of form elements
 *  
 */
$.AdminBSB.select = {
        activate: function() {
            if ($.fn.selectpicker) { $('select:not(.ms)').selectpicker(); }
        }
    }
    //==========================================================================================================================

/* DropdownMenu - Function =================================================================================================
 *  You can manage the dropdown menu
 *  
 */

$.AdminBSB.dropdownMenu = {
        activate: function() {
            var _this = this;

            $('.dropdown, .dropup, .btn-group').on({
                "show.bs.dropdown": function() {
                    var dropdown = _this.dropdownEffect(this);
                    _this.dropdownEffectStart(dropdown, dropdown.effectIn);
                },
                "shown.bs.dropdown": function() {
                    var dropdown = _this.dropdownEffect(this);
                    if (dropdown.effectIn && dropdown.effectOut) {
                        _this.dropdownEffectEnd(dropdown, function() {});
                    }
                },
                "hide.bs.dropdown": function(e) {
                    var dropdown = _this.dropdownEffect(this);
                    if (dropdown.effectOut) {
                        e.preventDefault();
                        _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                        _this.dropdownEffectEnd(dropdown, function() {
                            dropdown.dropdown.removeClass('open');
                        });
                    }
                }
            });

            //Set Waves
            Waves.attach('.dropdown-menu li a', ['waves-block']);
            Waves.init();
        },
        dropdownEffect: function(target) {
            var effectIn = $.AdminBSB.options.dropdownMenu.effectIn,
                effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
            var dropdown = $(target),
                dropdownMenu = $('.dropdown-menu', target);

            if (dropdown.length > 0) {
                var udEffectIn = dropdown.data('effect-in');
                var udEffectOut = dropdown.data('effect-out');
                if (udEffectIn !== undefined) { effectIn = udEffectIn; }
                if (udEffectOut !== undefined) { effectOut = udEffectOut; }
            }

            return {
                target: target,
                dropdown: dropdown,
                dropdownMenu: dropdownMenu,
                effectIn: effectIn,
                effectOut: effectOut
            };
        },
        dropdownEffectStart: function(data, effectToStart) {
            if (effectToStart) {
                data.dropdown.addClass('dropdown-animating');
                data.dropdownMenu.addClass('animated dropdown-animated');
                data.dropdownMenu.addClass(effectToStart);
            }
        },
        dropdownEffectEnd: function(data, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            data.dropdown.one(animationEnd, function() {
                data.dropdown.removeClass('dropdown-animating');
                data.dropdownMenu.removeClass('animated dropdown-animated');
                data.dropdownMenu.removeClass(data.effectIn);
                data.dropdownMenu.removeClass(data.effectOut);

                if (typeof callback == 'function') {
                    callback();
                }
            });
        }
    }
    //==========================================================================================================================

/* Browser - Function ======================================================================================================
 *  You can manage browser
 *  
 */
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.AdminBSB.browser = {
        activate: function() {
            var _this = this;
            var className = _this.getClassName();

            if (className !== '') $('html').addClass(_this.getClassName());
        },
        getBrowser: function() {
            var userAgent = navigator.userAgent.toLowerCase();

            if (/edge/i.test(userAgent)) {
                return edge;
            } else if (/rv:11/i.test(userAgent)) {
                return ie11;
            } else if (/msie 10/i.test(userAgent)) {
                return ie10;
            } else if (/opr/i.test(userAgent)) {
                return opera;
            } else if (/chrome/i.test(userAgent)) {
                return chrome;
            } else if (/firefox/i.test(userAgent)) {
                return firefox;
            } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
                return safari;
            }

            return undefined;
        },
        getClassName: function() {
            var browser = this.getBrowser();

            if (browser === edge) {
                return 'edge';
            } else if (browser === ie11) {
                return 'ie11';
            } else if (browser === ie10) {
                return 'ie10';
            } else if (browser === opera) {
                return 'opera';
            } else if (browser === chrome) {
                return 'chrome';
            } else if (browser === firefox) {
                return 'firefox';
            } else if (browser === safari) {
                return 'safari';
            } else {
                return '';
            }
        }
    }
    //==========================================================================================================================

$(function() {
    $.AdminBSB.browser.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.rightSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
});