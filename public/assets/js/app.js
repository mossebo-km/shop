webpackJsonp([1],{

/***/ "./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery) {// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
(function(window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function(stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is already initialized
  // ========================================

  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");

    return;
  }

  // Private default settings
  // ========================

  var defaults = {
    // Enable infinite gallery navigation
    loop: false,

    // Horizontal space between slides
    gutter: 50,

    // Enable keyboard navigation
    keyboard: true,

    // Should display navigation arrows at the screen edges
    arrows: true,

    // Should display counter at the top left corner
    infobar: true,

    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",

    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      "zoom",
      //"share",
      //"slideShow",
      //"fullScreen",
      //"download",
      "thumbs",
      "close"
    ],

    // Detect "idle" time in seconds
    idleTime: 3,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    iframe: {
      // Iframe template
      tpl:
        '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,

      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},

      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },

    // Default content type if cannot be detected automatically
    defaultType: "image",

    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 366,

    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",

    // Duration in ms for transition animation
    transitionDuration: 366,

    // Custom CSS class for slide element
    slideClass: "",

    // Custom CSS class for layout
    baseClass: "",

    // Base template for layout
    baseTpl:
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar">' +
      "<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
      "</div>" +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"></div>' +
      "</div>" +
      "</div>",

    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',

    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    btnTpl: {
      download:
        '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" />' +
        "</svg>" +
        "</a>",

      zoom:
        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" />' +
        "</svg>" +
        "</button>",

      close:
        '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,10 L30,30 M30,10 L10,30" />' +
        "</svg>" +
        "</button>",

      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn:
        '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',

      // Arrows
      arrowLeft:
        '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path>' +
        "</svg>" +
        "</a>",

      arrowRight:
        '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path>' +
        "</svg>" +
        "</a>"
    },

    // Container is injected into this element
    parentEl: "body",

    // Focus handling
    // ==============

    // Try to focus on the first focusable element after opening
    autoFocus: false,

    // Put focus back to active element after closing
    backFocus: true,

    // Do not let user to focus on element outside modal content
    trapFocus: true,

    // Module specific options
    // =======================

    fullScreen: {
      autoStart: false
    },

    // Set `touch: false` to disable dragging/swiping
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning
    },

    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,

    // Customize or add new media types
    // Example:
    /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
    media: {},

    slideShow: {
      autoStart: false,
      speed: 4000
    },

    thumbs: {
      autoStart: false, // Display thumbnails on opening
      hideOnClose: true, // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container", // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",

    // Callbacks
    //==========

    // See Documentation/API/Events for more information
    // Example:
    /*
		afterShow: function( instance, current ) {
			console.info( 'Clicked element:' );
			console.info( current.opts.$orig );
		}
	*/

    onInit: $.noop, // When instance has been initialized

    beforeLoad: $.noop, // Before the content of a slide is being loaded
    afterLoad: $.noop, // When the content of a slide is done loading

    beforeShow: $.noop, // Before open animation starts
    afterShow: $.noop, // When content is done loading and animating

    beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop, // After instance has been closed

    onActivate: $.noop, // When instance is brought to front
    onDeactivate: $.noop, // When other instance has been activated

    // Interaction
    // ===========

    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing

    // Clicked on the content
    clickContent: function(current, event) {
      return current.type === "image" ? "zoom" : false;
    },

    // Clicked on the slide
    clickSlide: "close",

    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",

    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,

    // Custom options when mobile device is detected
    // =============================================

    mobile: {
      idleTime: false,
      clickContent: function(current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function(current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },

    // Internationalization
    // ====================

    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schliessen",
        NEXT: "Weiter",
        PREV: "Zurück",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Maßstab"
      }
    }
  };

  // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);

  var called = 0;

  // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================
  var isQuery = function(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  };

  // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================
  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Detect the supported transition-end event property name
  // =======================================================
  var transitionEnd = (function() {
    var el = document.createElement("fakeelement"),
      t;

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  })();

  // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================
  var forceRedraw = function($el) {
    return $el && $el.length && $el[0].offsetHeight;
  };

  // Exclude array (`buttons`) options from deep merging
  // ===================================================
  var mergeOpts = function(opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);

    $.each(opts2, function(key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });

    return rez;
  };

  // Class definition
  // ================

  var FancyBox = function(content, opts, index) {
    var self = this;

    self.opts = mergeOpts({index: index}, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;

    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;

    self.prevPos = null;
    self.currPos = 0;

    self.firstRun = true;

    // All group items
    self.group = [];

    // Existing slides (for current, next and previous gallery items)
    self.slides = {};

    // Create group elements
    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    // Save last active element
    self.$lastFocus = $(document.activeElement).trigger("blur");

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================

    init: function() {
      var self = this,
        firstItem = self.group[self.currIndex],
        firstItemOpts = firstItem.opts,
        scrollbarWidth = $.fancybox.scrollbarWidth,
        $scrollDiv,
        $container,
        buttonStr;

      // Hide scrollbars
      // ===============

      if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false) {
        $("body").addClass("fancybox-active");

        if (!$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
          if (scrollbarWidth === undefined) {
            $scrollDiv = $('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body");

            scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;

            $scrollDiv.remove();
          }

          $("head").append(
            '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
              scrollbarWidth +
              "px; }</style>"
          );

          $("body").addClass("compensate-for-scrollbar");
        }
      }

      // Build html markup and set references
      // ====================================

      // Build html code for buttons and insert into main template
      buttonStr = "";

      $.each(firstItemOpts.buttons, function(index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      });

      // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete
      $container = $(
        self.translate(
          self,
          firstItemOpts.baseTpl
            .replace("{{buttons}}", buttonStr)
            .replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
        )
      )
        .attr("id", "fancybox-container-" + self.id)
        .addClass("fancybox-is-hidden")
        .addClass(firstItemOpts.baseClass)
        .data("FancyBox", self)
        .appendTo(firstItemOpts.parentEl);

      // Create object holding references to jQuery wrapped nodes
      self.$refs = {
        container: $container
      };

      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });

      self.trigger("onInit");

      // Enable events, deactive previous instances
      self.activate();

      // Build slides, load and reveal content
      self.jumpTo(self.currIndex);
    },

    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================

    translate: function(obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang];

      return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
        var value = arr[n];

        if (value === undefined) {
          return match;
        }

        return value;
      });
    },

    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================

    addContent: function(content) {
      var self = this,
        items = $.makeArray(content),
        thumbs;

      $.each(items, function(i, item) {
        var obj = {},
          opts = {},
          $item,
          type,
          found,
          src,
          srcParts;

        // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item);

          // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options);

          // Here we store clicked element
          opts.$orig = $item;

          obj.src = self.opts.src || opts.src || $item.attr("href");

          // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`
          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        }

        // Each gallery object has full collection of options
        obj.opts = $.extend(true, {}, self.opts, opts);

        // Do not merge buttons array
        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================

        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if ((found = src.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))) {
            type = "video";

            if (!obj.opts.videoFormat) {
              obj.opts.videoFormat = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        }

        // Step 3 - Some adjustments
        // =========================

        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        }

        // Find thumbnail image
        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.opts.$thumb = obj.opts.$trigger.find("img:first");
        }

        if ((!obj.opts.$thumb || !obj.opts.$thumb.length) && obj.opts.$orig) {
          obj.opts.$thumb = obj.opts.$orig.find("img:first");
        }

        // "caption" is a "special" option, it can be used to customize caption per gallery item ..
        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        }

        // Make sure we have caption as a string or jQuery object
        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        }

        // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"
        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();

            obj.opts.filter = srcParts.shift();
          }
        }

        // Hide all buttons and disable interactivity for modal items
        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            // Remove buttons
            infobar: 0,
            toolbar: 0,

            smallBtn: 0,

            // Disable keyboard navigation
            keyboard: 0,

            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,

            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        }

        // Step 4 - Add processed object to group
        // ======================================

        self.group.push(obj);
      });

      // Update controls if gallery is already opened
      if (Object.keys(self.slides).length) {
        self.updateControls();

        // Update thumbnails, if needed
        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();

          thumbs.focus();
        }
      }
    },

    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detect idle
    // ======================================

    addEvents: function() {
      var self = this;

      self.removeEvents();

      // Make navigation elements clickable
      self.$refs.container
        .on("click.fb-close", "[data-fancybox-close]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.close(e);
        })
        .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.previous();
        })
        .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.next();
        })
        .on("click.fb", "[data-fancybox-zoom]", function(e) {
          // Click handler for zoom button
          self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
        });

      // Handle page scrolling and browser resizing
      $W.on("orientationchange.fb resize.fb", function(e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          requestAFrame(function() {
            self.update();
          });
        } else {
          self.$refs.stage.hide();

          setTimeout(function() {
            self.$refs.stage.show();

            self.update();
          }, $.fancybox.isMobile ? 600 : 250);
        }
      });

      // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
      // (a.k.a. "escaping the modal")
      $D.on("focusin.fb", function(e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null;

        if (
          instance.isClosing ||
          !instance.current ||
          !instance.current.opts.trapFocus ||
          $(e.target).hasClass("fancybox-container") ||
          $(e.target).is(document)
        ) {
          return;
        }

        if (instance && $(e.target).css("position") !== "fixed" && !instance.$refs.container.has(e.target).length) {
          e.stopPropagation();

          instance.focus();
        }
      });

      // Enable keyboard navigation
      $D.on("keydown.fb", function(e) {
        var current = self.current,
          keycode = e.keyCode || e.which;

        if (!current || !current.opts.keyboard) {
          return;
        }

        if (e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input") || $(e.target).is("textarea")) {
          return;
        }

        // Backspace and Esc keys
        if (keycode === 8 || keycode === 27) {
          e.preventDefault();

          self.close(e);

          return;
        }

        // Left arrow and Up arrow
        if (keycode === 37 || keycode === 38) {
          e.preventDefault();

          self.previous();

          return;
        }

        // Righ arrow and Down arrow
        if (keycode === 39 || keycode === 40) {
          e.preventDefault();

          self.next();

          return;
        }

        self.trigger("afterKeydown", e, keycode);
      });

      // Hide controls after some inactivity period
      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;

        $D.on(
          "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
          function(e) {
            self.idleSecondsCounter = 0;

            if (self.isIdle) {
              self.showControls();
            }

            self.isIdle = false;
          }
        );

        self.idleInterval = window.setInterval(function() {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;

            self.hideControls();
          }
        }, 1000);
      }
    },

    // Remove events added by the core
    // ===============================

    removeEvents: function() {
      var self = this;

      $W.off("orientationchange.fb resize.fb");
      $D.off("focusin.fb keydown.fb .fb-idle");

      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);

        self.idleInterval = null;
      }
    },

    // Change to previous gallery item
    // ===============================

    previous: function(duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },

    // Change to next gallery item
    // ===========================

    next: function(duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },

    // Switch to selected gallery item
    // ===============================

    jumpTo: function(pos, duration) {
      var self = this,
        groupLen = self.group.length,
        firstRun,
        loop,
        current,
        previous,
        canvasWidth,
        currentPos,
        transitionProps;

      if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
        return;
      }

      pos = parseInt(pos, 10);

      // Should loop?
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      firstRun = self.firstRun = !Object.keys(self.slides).length;

      if (groupLen < 2 && !firstRun && !!self.isDragging) {
        return;
      }

      previous = self.current;

      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;

      // Create slides
      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }

        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;

      self.trigger("beforeShow", firstRun);

      self.updateControls();

      currentPos = $.fancybox.getTranslate(current.$slide);

      current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass("fancybox-animated");

      // Validate duration length
      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10);

      // Fresh start - reveal container, current slide and start loading content
      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.removeClass("fancybox-is-hidden");

        forceRedraw(self.$refs.container);

        self.$refs.container.addClass("fancybox-is-open");

        forceRedraw(self.$refs.container);

        // Make current slide visible
        current.$slide.addClass("fancybox-slide--previous");

        // Attempt to load content into slide;
        // at this point image would start loading, but inline/html content would load immediately
        self.loadSlide(current);

        current.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current");

        self.preload("image");

        return;
      }

      // Clean up
      $.each(self.slides, function(index, slide) {
        $.fancybox.stop(slide.$slide);
      });

      // Make current that slide is visible even if content is still loading
      current.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current");

      // If slides have been dragged, animate them to correct position
      if (current.isMoved) {
        canvasWidth = Math.round(current.$slide.width());

        $.each(self.slides, function(index, slide) {
          var pos = slide.pos - current.pos;

          $.fancybox.animate(
            slide.$slide,
            {
              top: 0,
              left: pos * canvasWidth + pos * slide.opts.gutter
            },
            duration,
            function() {
              slide.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous");

              if (slide.pos === self.currPos) {
                current.isMoved = false;

                self.complete();
              }
            }
          );
        });
      } else {
        self.$refs.stage.children().removeAttr("style");
      }

      // Start transition that reveals current content
      // or wait when it will be loaded

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");

      if (previous.pos === current.pos) {
        return;
      }

      // Handle previous slide
      // =====================

      transitionProps = "fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous");

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous");

      previous.isComplete = false;

      if (!duration || (!current.isMoved && !current.opts.transitionEffect)) {
        return;
      }

      if (current.isMoved) {
        previous.$slide.addClass(transitionProps);
      } else {
        transitionProps = "fancybox-animated " + transitionProps + " fancybox-fx-" + current.opts.transitionEffect;

        $.fancybox.animate(previous.$slide, transitionProps, duration, function() {
          previous.$slide.removeClass(transitionProps).removeAttr("style");
        });
      }
    },

    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================

    createSlide: function(pos) {
      var self = this,
        $slide,
        index;

      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });

        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },

    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================

    scaleToActual: function(x, y, duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        canvasWidth = $.fancybox.getTranslate(current.$slide).width,
        canvasHeight = $.fancybox.getTranslate(current.$slide).height,
        newImgWidth = current.width,
        newImgHeight = current.height,
        imgPos,
        posX,
        posY,
        scaleX,
        scaleY;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;

      imgPos = $.fancybox.getTranslate($content);

      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;

      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height;

      // Get center position for original image
      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5;

      // Make sure image does not move away from edges
      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);

      $.fancybox.animate(
        $content,
        {
          top: posY,
          left: posX,
          scaleX: scaleX,
          scaleY: scaleY
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );

      // Stop slideshow
      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },

    // Scale image to fit inside parent element
    // ========================================

    scaleToFit: function(duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        end;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      end = self.getFitPos(current);

      self.updateCursor(end.width, end.height);

      $.fancybox.animate(
        $content,
        {
          top: end.top,
          left: end.left,
          scaleX: end.width / $content.width(),
          scaleY: end.height / $content.height()
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );
    },

    // Calculate image size to fit inside viewport
    // ===========================================

    getFitPos: function(slide) {
      var self = this,
        $content = slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        maxWidth,
        maxHeight,
        minRatio,
        margin,
        aspectRatio,
        rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      margin = {
        top: parseInt(slide.$slide.css("paddingTop"), 10),
        right: parseInt(slide.$slide.css("paddingRight"), 10),
        bottom: parseInt(slide.$slide.css("paddingBottom"), 10),
        left: parseInt(slide.$slide.css("paddingLeft"), 10)
      };

      // We can not use $slide width here, because it can have different diemensions while in transiton
      maxWidth = parseInt(self.$refs.stage.width(), 10) - (margin.left + margin.right);
      maxHeight = parseInt(self.$refs.stage.height(), 10) - (margin.top + margin.bottom);

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);

      // Use floor rounding to make sure it really fits
      width = Math.floor(minRatio * width);
      height = Math.floor(minRatio * height);

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + margin.top;
        rez.left = Math.floor((maxWidth - width) * 0.5) + margin.left;
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;

      return rez;
    },

    // Update content size and position for all slides
    // ==============================================

    update: function() {
      var self = this;

      $.each(self.slides, function(key, slide) {
        self.updateSlide(slide);
      });
    },

    // Update slide content position and size
    // ======================================

    updateSlide: function(slide, duration) {
      var self = this,
        $content = slide && slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height;

      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);

        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;

          self.updateCursor();
        }
      }

      slide.$slide.trigger("refresh");

      self.$refs.toolbar.toggleClass("compensate-for-scrollbar", slide.$slide.get(0).scrollHeight > slide.$slide.get(0).clientHeight);

      self.trigger("onUpdate", slide);
    },

    // Horizontally center slide
    // =========================

    centerSlide: function(slide, duration) {
      var self = this,
        canvasWidth,
        pos;

      if (self.current) {
        canvasWidth = Math.round(slide.$slide.width());
        pos = slide.pos - self.current.pos;

        $.fancybox.animate(
          slide.$slide,
          {
            top: 0,
            left: pos * canvasWidth + pos * slide.opts.gutter,
            opacity: 1
          },
          duration === undefined ? 0 : duration,
          null,
          false
        );
      }
    },

    // Update cursor style depending if content can be zoomed
    // ======================================================

    updateCursor: function(nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        $container = self.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"),
        isZoomable;

      if (!current || self.isClosing) {
        return;
      }

      isZoomable = self.isZoomable();

      $container.toggleClass("fancybox-is-zoomable", isZoomable);

      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      // Set cursor to zoom in/out if click event is 'zoom'
      if (
        isZoomable &&
        (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom"))
      ) {
        if (self.isScaledDown(nextWidth, nextHeight)) {
          // If image is scaled down, then, obviously, it can be zoomed to full size
          $container.addClass("fancybox-can-zoomIn");
        } else {
          if (current.opts.touch) {
            // If image size ir largen than available available and touch module is not disable,
            // then user can do panning
            $container.addClass("fancybox-can-drag");
          } else {
            $container.addClass("fancybox-can-zoomOut");
          }
        }
      } else if (current.opts.touch && current.contentType !== "video") {
        $container.addClass("fancybox-can-drag");
      }
    },

    // Check if current slide is zoomable
    // ==================================

    isZoomable: function() {
      var self = this,
        current = self.current,
        fitPos;

      // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area
      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (current.width > fitPos.width || current.height > fitPos.height) {
          return true;
        }
      }

      return false;
    },

    // Check if current image dimensions are smaller than actual
    // =========================================================

    isScaledDown: function(nextWidth, nextHeight) {
      var self = this,
        rez = false,
        current = self.current,
        $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },

    // Check if image dimensions exceed parent element
    // ===============================================

    canPan: function() {
      var self = this,
        rez = false,
        current = self.current,
        $content;

      if (current.type === "image" && ($content = current.$content) && !current.hasError) {
        rez = self.getFitPos(current);
        rez = Math.abs($content.width() - rez.width) > 1 || Math.abs($content.height() - rez.height) > 1;
      }

      return rez;
    },

    // Load content into the slide
    // ===========================

    loadSlide: function(slide) {
      var self = this,
        type,
        $slide,
        ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      self.trigger("beforeLoad", slide);

      type = slide.type;
      $slide = slide.$slide;

      $slide
        .off("refresh")
        .trigger("onReset")
        .addClass(slide.opts.slideClass);

      // Create content depending on the type
      switch (type) {
        case "image":
          self.setImage(slide);

          break;

        case "iframe":
          self.setIframe(slide);

          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);

          break;

        case "video":
          self.setContent(
            slide,
            '<video class="fancybox-video" controls controlsList="nodownload">' +
              '<source src="' +
              slide.src +
              '" type="' +
              slide.opts.videoFormat +
              '">' +
              "Your browser doesn't support HTML5 video" +
              "</video"
          );

          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);

          ajaxLoad = $.ajax(
            $.extend({}, slide.opts.ajax.settings, {
              url: slide.src,
              success: function(data, textStatus) {
                if (textStatus === "success") {
                  self.setContent(slide, data);
                }
              },
              error: function(jqXHR, textStatus) {
                if (jqXHR && textStatus !== "abort") {
                  self.setError(slide);
                }
              }
            })
          );

          $slide.one("onReset", function() {
            ajaxLoad.abort();
          });

          break;

        default:
          self.setError(slide);

          break;
      }

      return true;
    },

    // Use thumbnail image, if possible
    // ================================

    setImage: function(slide) {
      var self = this,
        srcset = slide.opts.srcset || slide.opts.image.srcset,
        thumbSrc,
        found,
        temp,
        pxRatio,
        windowWidth;

      // Check if need to show loading icon
      slide.timouts = setTimeout(function() {
        var $img = slide.$image;

        if (slide.isLoading && (!$img || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 350);

      // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.
      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;

        temp = srcset.split(",").map(function(el) {
          var ret = {};

          el
            .trim()
            .split(/\s+/)
            .forEach(function(el, i) {
              var value = parseInt(el.substring(0, el.length - 1), 10);

              if (i === 0) {
                return (ret.url = el);
              }

              if (value) {
                ret.value = value;
                ret.postfix = el[el.length - 1];
              }
            });

          return ret;
        });

        // Sort by value
        temp.sort(function(a, b) {
          return a.value - b.value;
        });

        // Ok, now we have an array of all srcset values
        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
            found = el;
            break;
          }
        }

        // If not found, take the last one
        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url;

          // If we have default width/height values, we can calculate height for matching source
          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = slide.width / slide.height * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }

      // This will be wrapper containing both ghost and actual image
      slide.$content = $('<div class="fancybox-content"></div>')
        .addClass("fancybox-is-hidden")
        .appendTo(slide.$slide.addClass("fancybox-slide--image"));

      // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually
      thumbSrc = slide.opts.thumb || (slide.opts.$thumb && slide.opts.$thumb.length ? slide.opts.$thumb.attr("src") : false);

      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && thumbSrc) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;

        slide.$ghost = $("<img />")
          .one("error", function() {
            $(this).remove();

            slide.$ghost = null;
          })
          .one("load", function() {
            self.afterLoad(slide);
          })
          .addClass("fancybox-image")
          .appendTo(slide.$content)
          .attr("src", thumbSrc);
      }

      // Start loading actual image
      self.setBigImage(slide);
    },

    // Create full-size image
    // ======================

    setBigImage: function(slide) {
      var self = this,
        $img = $("<img />");

      slide.$image = $img
        .one("error", function() {
          self.setError(slide);
        })
        .one("load", function() {
          var sizes;

          if (!slide.$ghost) {
            self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);

            self.afterLoad(slide);
          }

          // Clear timeout that checks if loading icon needs to be displayed
          if (slide.timouts) {
            clearTimeout(slide.timouts);
            slide.timouts = null;
          }

          if (self.isClosing) {
            return;
          }

          if (slide.opts.srcset) {
            sizes = slide.opts.sizes;

            if (!sizes || sizes === "auto") {
              sizes =
                (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) +
                "vw";
            }

            $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
          }

          // Hide temporary image after some delay
          if (slide.$ghost) {
            setTimeout(function() {
              if (slide.$ghost && !self.isClosing) {
                slide.$ghost.hide();
              }
            }, Math.min(300, Math.max(1000, slide.height / 1600)));
          }

          self.hideLoading(slide);
        })
        .addClass("fancybox-image")
        .attr("src", slide.src)
        .appendTo(slide.$content);

      if (($img[0].complete || $img[0].readyState == "complete") && $img[0].naturalWidth && $img[0].naturalHeight) {
        $img.trigger("load");
      } else if ($img[0].error) {
        $img.trigger("error");
      }
    },

    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================

    resolveImageSlideSize: function(slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
        maxHeight = parseInt(slide.opts.height, 10);

      // Sets the default values from the image
      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor(maxWidth * imgHeight / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor(maxHeight * imgWidth / imgHeight);
        slide.height = maxHeight;
      }
    },

    // Create iframe wrapper, iframe and bindings
    // ==========================================

    setIframe: function(slide) {
      var self = this,
        opts = slide.opts.iframe,
        $slide = slide.$slide,
        $iframe;

      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
        .css(opts.css)
        .appendTo($slide);

      $slide.addClass("fancybox-slide--" + slide.contentType);

      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
        .attr(opts.attr)
        .appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide);

        // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function(e) {
          this.isReady = 1;

          slide.$slide.trigger("refresh");

          self.afterLoad(slide);
        });

        // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function() {
          var $content = slide.$content,
            frameWidth = opts.css.width,
            frameHeight = opts.css.height,
            $contents,
            $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {}

          // Calculate contnet dimensions if it is accessible
          if ($body && $body.length && $body.children().length) {
            $content.css({
              width: "",
              height: ""
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            if (frameWidth) {
              $content.width(frameWidth);
            }

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            if (frameHeight) {
              $content.height(frameHeight);
            }
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        this.afterLoad(slide);
      }

      $iframe.attr("src", slide.src);

      // Remove iframe if closing or changing gallery item
      $slide.one("onReset", function() {
        // This helps IE not to throw errors when closing
        try {
          $(this)
            .find("iframe")
            .hide()
            .unbind()
            .attr("src", "//about:blank");
        } catch (ignore) {}

        $(this)
          .off("refresh.fb")
          .empty();

        slide.isLoaded = false;
      });
    },

    // Wrap and append content to the slide
    // ======================================

    setContent: function(slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty();

      // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.
      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        content
          .parent()
          .parent(".fancybox-slide--inline")
          .trigger("onReset");

        // Create temporary element marking original place of the content
        slide.$placeholder = $("<div>")
          .hide()
          .insertAfter(content);

        // Make sure content is visible
        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>")
            .append($.trim(content))
            .contents();

          // If we have text node, then add wrapping element to make vertical alignment work
          if (content[0].nodeType === 3) {
            content = $("<div>").html(content);
          }
        }

        // If "filter" option is provided, then filter content
        if (slide.opts.filter) {
          content = $("<div>")
            .html(content)
            .find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function() {
        // Pause all html5 video/audio
        $(this)
          .find("video,audio")
          .trigger("pause");

        // Put content back
        if (slide.$placeholder) {
          slide.$placeholder.after(content.hide()).remove();

          slide.$placeholder = null;
        }

        // Remove custom close button
        if (slide.$smallBtn) {
          slide.$smallBtn.remove();

          slide.$smallBtn = null;
        }

        // Remove content and mark slide as not loaded
        if (!slide.hasError) {
          $(this).empty();

          slide.isLoaded = false;
        }
      });

      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");

        $(content).wrap("<div></div>");

        slide.contentType = "video";

        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide
        .children()
        .filter("div,form,main,video,audio")
        .first()
        .addClass("fancybox-content");

      slide.$slide.addClass("fancybox-slide--" + slide.contentType);

      this.afterLoad(slide);
    },

    // Display error message
    // =====================

    setError: function(slide) {
      slide.hasError = true;

      slide.$slide
        .trigger("onReset")
        .removeClass("fancybox-slide--" + slide.contentType)
        .addClass("fancybox-slide--error");

      slide.contentType = "html";

      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },

    // Show loading icon inside the slide
    // ==================================

    showLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide);
      }
    },

    // Remove loading icon from the slide
    // ==================================

    hideLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.remove();

        delete slide.$spinner;
      }
    },

    // Adjustments after slide content has been loaded
    // ===============================================

    afterLoad: function(slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;

      self.trigger("afterLoad", slide);

      self.hideLoading(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).prependTo(slide.$content);
      }

      if (slide.opts.protect && slide.$content && !slide.hasError) {
        // Disable right click
        slide.$content.on("contextmenu.fb", function(e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        });

        // Add fake element on top of the image
        // This makes a bit harder for user to select image
        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.revealContent(slide);
    },

    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================

    revealContent: function(slide) {
      var self = this,
        $slide = slide.$slide,
        end = false,
        start = false,
        effect,
        effectClassName,
        duration,
        opacity;

      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];

      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

      // Do not animate if revealing the same slide
      if (slide.pos === self.currPos) {
        if (slide.isComplete) {
          effect = false;
        } else {
          self.isAnimating = true;
        }
      }

      if (slide.isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      }

      // Check if can zoom
      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      }

      // Zoom animation
      // ==============
      if (effect === "zoom") {
        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height;

        // Check if we need to animate opacity
        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        }

        // Draw image at start position
        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);

        forceRedraw(slide.$content);

        // Start animation
        $.fancybox.animate(slide.$content, end, duration, function() {
          self.isAnimating = false;

          self.complete();
        });

        return;
      }

      self.updateSlide(slide);

      // Simply show content
      // ===================

      if (!effect) {
        forceRedraw($slide);

        slide.$content.removeClass("fancybox-is-hidden");

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      $.fancybox.stop($slide);

      effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;

      $slide
        .removeAttr("style")
        .removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous")
        .addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden");

      // Force reflow for CSS3 transitions
      forceRedraw($slide);

      $.fancybox.animate(
        $slide,
        "fancybox-slide--current",
        duration,
        function(e) {
          $slide.removeClass(effectClassName).removeAttr("style");

          if (slide.pos === self.currPos) {
            self.complete();
          }
        },
        true
      );
    },

    // Check if we can and have to zoom from thumbnail
    //================================================

    getThumbPos: function(slide) {
      var self = this,
        rez = false,
        $thumb = slide.opts.$thumb,
        thumbPos = $thumb && $thumb.length && $thumb[0].ownerDocument === document ? $thumb.offset() : 0,
        slidePos;

      // Check if element is inside the viewport by at least 1 pixel
      var isElementVisible = function($el) {
        var element = $el[0],
          elementRect = element.getBoundingClientRect(),
          parentRects = [],
          visibleInAllParents;

        while (element.parentElement !== null) {
          if ($(element.parentElement).css("overflow") === "hidden" || $(element.parentElement).css("overflow") === "auto") {
            parentRects.push(element.parentElement.getBoundingClientRect());
          }

          element = element.parentElement;
        }

        visibleInAllParents = parentRects.every(function(parentRect) {
          var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
          var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);

          return visiblePixelX > 0 && visiblePixelY > 0;
        });

        return (
          visibleInAllParents &&
          elementRect.bottom > 0 &&
          elementRect.right > 0 &&
          elementRect.left < $(window).width() &&
          elementRect.top < $(window).height()
        );
      };

      if (thumbPos && isElementVisible($thumb)) {
        slidePos = self.$refs.stage.offset();

        rez = {
          top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
          left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
          width: $thumb.width(),
          height: $thumb.height(),
          scaleX: 1,
          scaleY: 1
        };
      }

      return rez;
    },

    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================

    complete: function() {
      var self = this,
        current = self.current,
        slides = {};

      if (current.isMoved || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;

        current.$slide.siblings().trigger("onReset");

        self.preload("inline");

        // Trigger any CSS3 transiton inside the slide
        forceRedraw(current.$slide);

        current.$slide.addClass("fancybox-slide--complete");

        // Remove unnecessary slides
        $.each(self.slides, function(key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);

            slide.$slide.off().remove();
          }
        });

        self.slides = slides;
      }

      self.isAnimating = false;

      self.updateCursor();

      self.trigger("afterShow");

      // Play first html5 video/audio
      current.$slide
        .find("video,audio")
        .filter(":visible:first")
        .trigger("play");

      // Try to focus on the first focusable element
      if (
        $(document.activeElement).is("[disabled]") ||
        (current.opts.autoFocus && !(current.type == "image" || current.type === "iframe"))
      ) {
        self.focus();
      }
    },

    // Preload next and previous slides
    // ================================

    preload: function(type) {
      var self = this,
        next = self.slides[self.currPos + 1],
        prev = self.slides[self.currPos - 1];

      if (next && next.type === type) {
        self.loadSlide(next);
      }

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }
    },

    // Try to find and focus on the first focusable element
    // ====================================================

    focus: function() {
      var current = this.current,
        $el;

      if (this.isClosing) {
        return;
      }

      if (current && current.isComplete && current.$content) {
        // Look for first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if (!$el.length) {
          $el = current.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first");
        }

        $el = $el && $el.length ? $el : current.$content;

        $el.trigger("focus");
      }
    },

    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================

    activate: function() {
      var self = this;

      // Deactivate all instances
      $(".fancybox-container").each(function() {
        var instance = $(this).data("FancyBox");

        // Skip self and closing instances
        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");

          instance.removeEvents();

          instance.isVisible = false;
        }
      });

      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();

        self.updateControls();
      }

      self.trigger("onActivate");

      self.addEvents();
    },

    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================

    close: function(e, d) {
      var self = this,
        current = self.current,
        effect,
        duration,
        $content,
        domRect,
        opacity,
        start,
        end;

      var done = function() {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true;

      // If beforeClose callback prevents closing, make sure content is centered
      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;

        requestAFrame(function() {
          self.update();
        });

        return false;
      }

      // Remove all events
      // If there are multiple instances, they will be set again by "activate" method
      self.removeEvents();

      if (current.timouts) {
        clearTimeout(current.timouts);
      }

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

      // Remove other slides
      current.$slide
        .off(transitionEnd)
        .removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      current.$slide
        .siblings()
        .trigger("onReset")
        .remove();

      // Trigger animations
      if (duration) {
        self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing");
      }

      // Clean up
      self.hideLoading(current);

      self.hideControls();

      self.updateCursor();

      // Check if possible to zoom-out
      if (
        effect === "zoom" &&
        !(e !== true && $content && duration && current.type === "image" && !current.hasError && (end = self.getThumbPos(current)))
      ) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);

        domRect = $.fancybox.getTranslate($content);

        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        };

        // Check if we need to animate opacity
        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);

        forceRedraw($content);

        $.fancybox.animate($content, end, duration, done);

        return true;
      }

      if (effect && duration) {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          $.fancybox.animate(
            current.$slide.removeClass("fancybox-slide--current"),
            "fancybox-animated fancybox-slide--previous fancybox-fx-" + effect,
            duration,
            done
          );
        }
      } else {
        done();
      }

      return true;
    },

    // Final adjustments after removing the instance
    // =============================================

    cleanUp: function(e) {
      var self = this,
        $body = $("body"),
        instance,
        scrollTop;

      self.current.$slide.trigger("onReset");

      self.$refs.container.empty().remove();

      self.trigger("afterClose", e);

      // Place back focus
      if (self.$lastFocus && !!self.current.opts.backFocus) {
        self.$lastFocus.trigger("focus");
      }

      self.current = null;

      // Check if there are other instances
      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $body.removeClass("fancybox-active compensate-for-scrollbar");

        $("#fancybox-style-noscroll").remove();
      }
    },

    // Call callback and trigger an event
    // ==================================

    trigger: function(name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        obj = slide && slide.opts ? slide : self.current,
        rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },

    // Update infobar values, navigation button states and reveal caption
    // ==================================================================

    updateControls: function(force) {
      var self = this,
        current = self.current,
        index = current.index,
        caption = current.opts.caption,
        $container = self.$refs.container,
        $caption = self.$refs.caption;

      // Recalculate content dimensions
      current.$slide.trigger("refresh");

      self.$caption = caption && caption.length ? $caption.html(caption) : null;

      if (!self.isHiddenControls && !self.isIdle) {
        self.showControls();
      }

      // Update info and navigation elements
      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);

      $container.find("[data-fancybox-prev]").toggleClass("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").toggleClass("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container
          .find("[data-fancybox-zoom]")
          .show()
          .end()
          .find("[data-fancybox-download]")
          .attr("href", current.opts.image.src || current.src)
          .show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }
    },

    // Hide toolbar and caption
    // ========================

    hideControls: function() {
      this.isHiddenControls = true;

      this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
    },

    showControls: function() {
      var self = this,
        opts = self.current ? self.current.opts : self.opts,
        $container = self.$refs.container;

      self.isHiddenControls = false;
      self.idleSecondsCounter = 0;

      $container
        .toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
        .toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
        .toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
        .toggleClass("fancybox-is-modal", !!opts.modal);

      if (self.$caption) {
        $container.addClass("fancybox-show-caption ");
      } else {
        $container.removeClass("fancybox-show-caption");
      }
    },

    // Toggle toolbar and caption
    // ==========================

    toggleControls: function() {
      if (this.isHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });

  $.fancybox = {
    version: "3.3.5",
    defaults: defaults,

    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================

    getInstance: function(command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
        args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },

    // Create new instance
    // ===================

    open: function(items, opts, index) {
      return new FancyBox(items, opts, index);
    },

    // Close current or all instances
    // ==============================

    close: function(all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close();

        // Try to find and close next instance

        if (all === true) {
          this.close();
        }
      }
    },

    // Close all instances and unbind all events
    // =========================================

    destroy: function() {
      this.close(true);

      $D.add("body").off("click.fb-start", "**");
    },

    // Try to detect mobile devices
    // ============================

    isMobile:
      document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    // Detect if 'translate3d' support is available
    // ============================================

    use3d: (function() {
      var div = document.createElement("div");

      return (
        window.getComputedStyle &&
        window.getComputedStyle(div) &&
        window.getComputedStyle(div).getPropertyValue("transform") &&
        !(document.documentMode && document.documentMode < 11)
      );
    })(),

    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================

    getTranslate: function($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();

      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },

    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================

    setTranslate: function($el, props) {
      var str = "",
        css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str =
          (props.left === undefined ? $el.position().left : props.left) +
          "px, " +
          (props.top === undefined ? $el.position().top : props.top) +
          "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str = (str.length ? str + " " : "") + "scale(" + props.scaleX + ", " + props.scaleY + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },

    // Simple CSS transition handler
    // =============================

    animate: function($el, to, duration, callback, leaveAnimationName) {
      var final = false;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      if (!$.isPlainObject(to)) {
        $el.removeAttr("style");
      }

      $.fancybox.stop($el);

      $el.on(transitionEnd, function(e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        $.fancybox.stop($el);

        if (final) {
          $.fancybox.setTranslate($el, final);
        }

        if ($.isPlainObject(to)) {
          if (leaveAnimationName === false) {
            $el.removeAttr("style");
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      }

      // Start animation by changing CSS properties or class name
      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          final = $.extend({}, to, {
            width: $el.width() * to.scaleX,
            height: $el.height() * to.scaleY,
            scaleX: 1,
            scaleY: 1
          });

          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      }

      // Make sure that `transitionend` callback gets fired
      $el.data(
        "timer",
        setTimeout(function() {
          $el.trigger("transitionend");
        }, duration + 16)
      );
    },

    stop: function($el) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        $el.off("transitionend").css("transition-duration", "");

        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  };

  // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
      index = 0,
      $target,
      value;

    // Avoid opening multiple times
    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    opts = e && e.data ? e.data.options : opts || {};

    $target = opts.$target || $(e.currentTarget);
    value = $target.attr("data-fancybox") || "";

    // Get all related items and find index for clicked one
    if (value) {
      items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [];
      items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');

      index = items.index($target);

      // Sometimes current item can not be found (for example, if some script clones items)
      if (index < 0) {
        index = 0;
      }
    } else {
      items = [$target];
    }

    $.fancybox.open(items, opts, index);
  }

  // Create a jQuery plugin
  // ======================

  $.fn.fancybox = function(options) {
    var selector;

    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body")
        .off("click.fb-start", selector)
        .on("click.fb-start", selector, {options: options}, _run);
    } else {
      this.off("click.fb-start").on(
        "click.fb-start",
        {
          items: this,
          options: options
        },
        _run
      );
    }

    return this;
  };

  // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================

  $D.on("click.fb-start", "[data-fancybox]", _run);

  // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-trigger]", function(e) {
    _run(e, {
      $target: $('[data-fancybox="' + $(e.currentTarget).attr("data-trigger") + '"]').eq($(e.currentTarget).attr("data-index") || 0),
      $trigger: $(this)
    });
  });
})(window, document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function($) {
  "use strict";

  // Formats matching url to final form

  var format = function(url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function(key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  };

  // Object containing properties for each media type

  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },

    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1,
        api: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },

    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },

    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function(rez) {
        return (
          "//maps.google." +
          rez[2] +
          "/?ll=" +
          (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
          "&output=" +
          (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        );
      }
    },

    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function(rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  };

  $(document).on("objectNeedsType.fb", function(e, instance, item) {
    var url = item.src || "",
      type = false,
      media,
      thumb,
      rez,
      params,
      urlParams,
      paramObj,
      provider;

    media = $.extend(true, {}, defaults, item.opts.media);

    // Look for any matching media type
    $.each(media, function(providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);

      url =
        $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);

      thumb =
        $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function(match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    });

    // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  });
})(__webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function(window, document, $) {
  "use strict";

  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function() {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function(id) {
        window.clearTimeout(id);
      }
    );
  })();

  var getPointerXY = function(e) {
    var result = [];

    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function(point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function($el) {
    if (
      $el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') ||
      $.isFunction($el.get(0).onclick) ||
      $el.data("selectable")
    ) {
      return true;
    }

    // Check for attributes like data-fancybox-next or data-fancybox-close
    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function(el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
      overflowX = window.getComputedStyle(el)["overflow-x"],
      vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
      horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;

    return vertical || horizontal;
  };

  var isScrollable = function($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function(instance) {
    var self = this;

    self.instance = instance;

    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;

    self.destroy();

    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function() {
    this.$container.off(".fb.touch");
  };

  Guestures.prototype.ontouchstart = function(e) {
    var self = this,
      $target = $(e.target),
      instance = self.instance,
      current = instance.current,
      $content = current.$content,
      isTouchDevice = e.type == "touchstart";

    // Do not respond to both (touch and mouse) events
    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    }

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Ignore taping on links, buttons, input elements
    if (!$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    }

    // Ignore clicks on the scrollbar
    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Ignore clicks while zooming or closing
    if (!current || instance.isAnimating || instance.isClosing) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    }

    e.stopPropagation();

    self.startEvent = e;

    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;

    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;

    self.canvasWidth = Math.round(current.$slide[0].clientWidth);
    self.canvasHeight = Math.round(current.$slide[0].clientHeight);

    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {top: 0, left: 0};
    self.sliderStartPos = self.sliderLastPos || $.fancybox.getTranslate(current.$slide);

    // Since position will be absolute, but we need to make it relative to the stage
    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);

    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;

    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;

    $(document)
      .off(".fb.touch")
      .on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend"))
      .on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    }

    if (!(self.opts || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      return;
    }

    if (!($.fancybox.isMobile && (isScrollable($target) || isScrollable($target.parent())))) {
      e.preventDefault();
    }

    if (self.startPoints.length === 1 || current.hasError) {
      if (self.instance.canPan()) {
        $.fancybox.stop(self.$content);

        self.$content.css("transition-duration", "");

        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-controls--isGrabbing");
    }

    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;

      self.isZooming = true;

      $.fancybox.stop(self.$content);

      self.$content.css("transition-duration", "");

      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();

      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;

      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function(e) {
    var self = this;

    self.isScrolling = true;

    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function(e) {
    var self = this,
      $target = $(e.target);

    // Make sure user has not released over iframe or disabled element
    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      self.canTap = false;

      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.instance.canPan()) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");

    self.distance = distance(self.newPoints[0], self.startPoints[0]);

    // Skip false ontouchmove events (Chrome)
    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function(e) {
    var self = this,
      swiping = self.isSwiping,
      left = self.sliderStartPos.left || 0,
      angle;

    // If direction is not yet determined
    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (self.instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (self.instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);

          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        self.canTap = false;

        if (self.isSwiping === "y" && $.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
          self.isScrolling = true;

          return;
        }

        self.instance.isDragging = self.isSwiping;

        // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
        self.startPoints = self.newPoints;

        $.each(self.instance.slides, function(index, slide) {
          $.fancybox.stop(slide.$slide);

          slide.$slide.css("transition-duration", "");

          slide.inTransition = false;

          if (slide.pos === self.instance.current.pos) {
            self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left - $.fancybox.getTranslate(self.instance.$refs.stage).left;
          }
        });

        // Stop slideshow
        if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
          self.instance.SlideShow.stop();
        }
      }

      return;
    }

    // Sticky edges
    if (swiping == "x") {
      if (
        self.distanceX > 0 &&
        (self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))
      ) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (
        self.distanceX < 0 &&
        (self.instance.group.length < 2 ||
          (self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))
      ) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function(index, slide) {
          var pos = slide.pos - self.instance.currPos;

          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });

        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function() {
    var self = this;

    // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;

    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  // Make panning sticky to the edges
  Guestures.prototype.limitMovement = function() {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    var distanceX = self.distanceX;
    var distanceY = self.distanceY;

    var contentStartPos = self.contentStartPos;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY;

    // Slow down proportionally to traveled distance
    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);

    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5);

    //   ->
    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    }

    //    <-
    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    }

    //   \/
    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    }

    //   /\
    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function(newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function() {
    var self = this;

    // Calculate current distance between points to get pinch ratio and new width and height
    var contentStartPos = self.contentStartPos;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);

    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio);

    // This is the translation due to pinch-zooming
    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

    // Point between the two touches
    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();

    // And this is the translation due to translation of the centerpoint
    // between the two fingers
    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

    // The new offset is the old/current one plus the total translation
    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);

    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };

    self.canTap = false;

    self.newWidth = newWidth;
    self.newHeight = newHeight;

    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function(e) {
    var self = this;
    var dMs = Math.max(new Date().getTime() - self.startTime, 1);

    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;

    self.endPoints = getPointerXY(e);

    self.$container.removeClass("fancybox-controls--isGrabbing");

    $(document).off(".fb.touch");

    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 366;

    // Speed in px/ms
    self.velocityX = self.distanceX / dMs * 0.5;
    self.velocityY = self.distanceY / dMs * 0.5;

    self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function(swiping, scrolling) {
    var self = this,
      ret = false,
      len = self.instance.group.length;

    self.sliderLastPos = null;

    // Close if swiped vertically / navigate if horizontally
    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(
        self.instance.current.$slide,
        {
          top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
          opacity: 0
        },
        200
      );

      ret = self.instance.close(true, 200);
    } else if (swiping == "x" && self.distanceX > 50 && len > 1) {
      ret = self.instance.previous(self.speedX);
    } else if (swiping == "x" && self.distanceX < -50 && len > 1) {
      ret = self.instance.next(self.speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      if (scrolling || len < 2) {
        self.instance.centerSlide(self.instance.current, 150);
      } else {
        self.instance.jumpTo(self.instance.current.index);
      }
    }

    self.$container.removeClass("fancybox-is-sliding");
  };

  // Limit panning from edges
  // ========================
  Guestures.prototype.endPanning = function() {
    var self = this;
    var newOffsetX, newOffsetY, newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
      newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;

    $.fancybox.animate(self.$content, newPos, 330);
  };

  Guestures.prototype.endZooming = function() {
    var self = this;

    var current = self.instance.current;

    var newOffsetX, newOffsetY, newPos, reset;

    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;

    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    };

    // Reset scalex/scaleY values; this helps for perfomance and does not break animation
    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);

      // Switch from scale() to width/height or animation will not work correctly
      $.fancybox.setTranslate(self.$content, $.fancybox.getTranslate(self.$content));

      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function(e) {
    var self = this;
    var $target = $(e.target);

    var instance = self.instance;
    var current = instance.current;

    var endPoints = (e && getPointerXY(e)) || self.startPoints;

    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;

    var where;

    var process = function(prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);

          break;

        case "toggleControls":
          instance.toggleControls(true);

          break;

        case "next":
          instance.next();

          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    };

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Skip if clicked on the scrollbar
    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Check where is clicked
    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (
      instance.current.$content &&
      instance.current.$content
        .find($target)
        .addBack()
        .filter($target).length
    ) {
      where = "Content";
    } else {
      return;
    }

    // Check if this is a double tap
    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null;

      // Skip if distance between taps is too big
      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      }

      // OK, now we assume that this is a double-tap
      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function() {
          self.tapped = null;

          process("click" + where);
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document).on("onActivate.fb", function(e, instance) {
    if (instance && !instance.Guestures) {
      instance.Guestures = new Guestures(instance);
    }
  });
})(window, document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow:
        '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,12 L27,20 L13,27 Z" />' +
        '<path d="M15,10 v19 M23,10 v19" />' +
        "</svg>" +
        "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000
    }
  });

  var SlideShow = function(instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,

    init: function() {
      var self = this;

      self.$button = self.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
        self.toggle();
      });

      if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
        self.$button.hide();
      }
    },

    set: function(force) {
      var self = this;

      // Check if reached last element
      if (
        self.instance &&
        self.instance.current &&
        (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)
      ) {
        self.timer = setTimeout(function() {
          if (self.isActive) {
            self.instance.jumpTo((self.instance.currIndex + 1) % self.instance.group.length);
          }
        }, self.instance.current.opts.slideShow.speed);
      } else {
        self.stop();
        self.instance.idleSecondsCounter = 0;
        self.instance.showControls();
      }
    },

    clear: function() {
      var self = this;

      clearTimeout(self.timer);

      self.timer = null;
    },

    start: function() {
      var self = this;
      var current = self.instance.current;

      if (current) {
        self.isActive = true;

        self.$button
          .attr("title", current.opts.i18n[current.opts.lang].PLAY_STOP)
          .removeClass("fancybox-button--play")
          .addClass("fancybox-button--pause");

        self.set(true);
      }
    },

    stop: function() {
      var self = this;
      var current = self.instance.current;

      self.clear();

      self.$button
        .attr("title", current.opts.i18n[current.opts.lang].PLAY_START)
        .removeClass("fancybox-button--pause")
        .addClass("fancybox-button--play");

      self.isActive = false;
    },

    toggle: function() {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },

    "beforeShow.fb": function(e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },

    "afterShow.fb": function(e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow;

      // "P" or Spacebar
      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();

        SlideShow.toggle();
      }
    },

    "beforeClose.fb onDeactivate.fb": function(e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  });

  // Page Visibility API to pause slideshow when window is not active
  $(document).on("visibilitychange", function() {
    var instance = $.fancybox.getInstance();
    var SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function(document, $) {
  "use strict";

  // Collection of methods supported by user browser
  var fn = (function() {
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      // new WebKit
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      // old WebKit (Safari 5.1)
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];

    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  })();

  // If browser does not have Full Screen API, then simply unset default button template and stop
  if (!fn) {
    if ($ && $.fancybox) {
      $.fancybox.defaults.btnTpl.fullScreen = false;
    }

    return;
  }

  var FullScreen = {
    request: function(elem) {
      elem = elem || document.documentElement;

      elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function() {
      document[fn.exitFullscreen]();
    },
    toggle: function(elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function() {
      return Boolean(document[fn.fullscreenElement]);
    },
    enabled: function() {
      return Boolean(document[fn.fullscreenEnabled]);
    }
  };

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      fullScreen:
        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M9,12 v16 h22 v-16 h-22 v8" />' +
        "</svg>" +
        "</button>"
    },
    fullScreen: {
      autoStart: false
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var $container;

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;

        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        }

        // Expose API
        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();

        instance.FullScreen.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });

  $(document).on(fn.fullscreenchange, function() {
    var isFullscreen = FullScreen.isFullscreen(),
      instance = $.fancybox.getInstance();

    if (instance) {
      // If image is zooming, then force to stop and reposition properly
      if (instance.current && instance.current.type === "image" && instance.isAnimating) {
        instance.current.$content.css("transition", "none");

        instance.isAnimating = false;

        instance.update(true, true, 0);
      }

      instance.trigger("onFullscreenChange", isFullscreen);

      instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var CLASS = "fancybox-thumbs",
    CLASS_ACTIVE = CLASS + "-active",
    CLASS_LOAD = CLASS + "-loading";

  // Make sure there are default values
  $.fancybox.defaults = $.extend(
    true,
    {
      btnTpl: {
        thumbs:
          '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
          '<svg viewBox="0 0 120 120">' +
          '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' +
          "</svg>" +
          "</button>"
      },
      thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
      }
    },
    $.fancybox.defaults
  );

  var FancyThumbs = function(instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,

    init: function(instance) {
      var self = this,
        first,
        second;

      self.instance = instance;

      instance.Thumbs = self;

      self.opts = instance.group[instance.currIndex].opts.thumbs;

      // Enable thumbs if at least two group items have thumbnails
      first = instance.group[0];
      first = first.opts.thumb || (first.opts.$thumb && first.opts.$thumb.length ? first.opts.$thumb.attr("src") : false);

      if (instance.group.length > 1) {
        second = instance.group[1];
        second = second.opts.thumb || (second.opts.$thumb && second.opts.$thumb.length ? second.opts.$thumb.attr("src") : false);
      }

      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");

      if (self.opts && first && second && first && second) {
        self.$button.show().on("click", function() {
          self.toggle();
        });

        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },

    create: function() {
      var self = this,
        instance = self.instance,
        parentEl = self.opts.parentEl,
        list = [],
        src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(
          instance.$refs.container
            .find(parentEl)
            .addBack()
            .filter(parentEl)
        );

        // Add "click" event that performs gallery navigation
        self.$grid.on("click", "li", function() {
          instance.jumpTo($(this).attr("data-index"));
        });
      }

      // Build the list
      if (!self.$list) {
        self.$list = $("<ul>").appendTo(self.$grid);
      }

      $.each(instance.group, function(i, item) {
        src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr("src") : null);

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push(
          '<li data-index="' +
            i +
            '" tabindex="0" class="' +
            CLASS_LOAD +
            '"' +
            (src && src.length ? ' style="background-image:url(' + src + ')" />' : "") +
            "></li>"
        );
      });

      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(
          parseInt(self.$grid.css("padding-right"), 10) +
            instance.group.length *
              self.$list
                .children()
                .eq(0)
                .outerWidth(true)
        );
      }
    },

    focus: function(duration) {
      var self = this,
        $list = self.$list,
        $grid = self.$grid,
        thumb,
        thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list
        .children()
        .removeClass(CLASS_ACTIVE)
        .filter('[data-index="' + self.instance.current.index + '"]')
        .addClass(CLASS_ACTIVE);

      thumbPos = thumb.position();

      // Check if need to scroll to make current thumb visible
      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate(
          {
            scrollTop: $list.scrollTop() + thumbPos.top
          },
          duration
        );
      } else if (
        self.opts.axis === "x" &&
        (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))
      ) {
        $list
          .parent()
          .stop()
          .animate(
            {
              scrollLeft: thumbPos.left
            },
            duration
          );
      }
    },

    update: function() {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");

        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      }

      // Update content position
      that.instance.update();
    },

    hide: function() {
      this.isVisible = false;
      this.update();
    },

    show: function() {
      this.isVisible = true;
      this.update();
    },

    toggle: function() {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },

    "beforeShow.fb": function(e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs;

      // "G"
      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();

        Thumbs.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share:
        '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' +
        "</svg>" +
        "</button>"
    },
    share: {
      url: function(instance, item) {
        return (
          (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
        );
      },
      tpl:
        '<div class="fancybox-share">' +
        "<h1>{{SHARE}}</h1>" +
        "<p>" +
        '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
        "<span>Facebook</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
        "<span>Twitter</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
        "<span>Pinterest</span>" +
        "</a>" +
        "</p>" +
        '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p>' +
        "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };

    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function() {
    var instance = $.fancybox.getInstance(),
      current = instance.current || null,
      url,
      tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl
      .replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
      .replace(/\{\{url\}\}/g, encodeURIComponent(url))
      .replace(/\{\{url_raw\}\}/g, escapeHtml(url))
      .replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");

    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        animationEffect: false,
        afterLoad: function(shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function() {
            shareInstance.close(null, 0);
          });

          // Opening links in a popup window
          shareCurrent.$content.find(".fancybox-share__links a").click(function() {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        }
      }
    });
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function(document, window, $) {
  "use strict";

  // Simple $.escapeSelector polyfill (for jQuery prior v3)
  if (!$.escapeSelector) {
    $.escapeSelector = function(sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      var fcssescape = function(ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          }

          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }

        // Other potentially-special ASCII characters get backslash-escaped
        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  }

  // Get info about gallery name and current index from url
  function parseUrl() {
    var hash = window.location.hash.substr(1),
      rez = hash.split("-"),
      index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
      gallery = rez.join("-");

    return {
      hash: hash,
      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  }

  // Trigger click evnt on links to open new fancyBox instance
  function triggerFromUrl(url) {
    var $el;

    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute, then trigger click event for that.
      // It should start fancyBox
      $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']")
        .eq(url.index - 1)
        .trigger("click.fb-start");
    }
  }

  // Get gallery name from current instance
  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") : "");

    return ret === "" ? false : ret;
  }

  // Start when DOM becomes ready
  $(function() {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    }

    // Update hash when opening/closing fancyBox
    $(document).on({
      "onInit.fb": function(e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance);

        // Make sure gallery start index matches index from hash
        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },

      "beforeShow.fb": function(e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        }

        // Check if need to update window hash
        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        }

        // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected
        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");

        // If current hash is the same (this instance most likely is opened by hashchange), then do nothing
        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (!instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        }

        // Update hash
        instance.hashTimer = setTimeout(function() {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"](
              {},
              document.title,
              window.location.pathname + window.location.search + "#" + instance.currentHash
            );

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },

      "beforeClose.fb": function(e, instance, current) {
        var gallery;

        if (current.opts.hash === false) {
          return;
        }

        gallery = getGalleryID(instance);

        // Goto previous history entry
        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;

        clearTimeout(instance.hashTimer);
      }
    });

    // Check if need to start/close after url has changed
    $(window).on("hashchange.fb", function() {
      var url = parseUrl(),
        fb;

      // Find last fancyBox instance that has "hash"
      $.each(
        $(".fancybox-container")
          .get()
          .reverse(),
        function(index, value) {
          var tmp = $(value).data("FancyBox");
          //isClosing
          if (tmp.currentHash) {
            fb = tmp;
            return false;
          }
        }
      );

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash && fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;

          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    });

    // Check current hash and trigger click event on matching element to start fancyBox, if needed
    setTimeout(function() {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(document, window, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var prevTime = new Date().getTime();

  $(document).on({
    "onInit.fb": function(e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
        var current = instance.current,
          currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;

        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js"), __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/AnimatedSymbolChange.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "AnimatedSymbolChange",

    props: ['value'],

    watch: {
        value: 'explode'
    },

    data: function data() {
        return {
            value$: ''
        };
    },
    created: function created() {
        this.explode();
    },


    methods: {
        explode: function explode() {
            this.value$ = this.value.toString().split('');
        },
        done: function done(el, _done) {
            el.addEventListener('transitionend', _done, { passive: true, once: true });
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/CitiesSelect.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'CitiesSelect',

    data: function data() {
        return {
            currentCityId: __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].config('location.userCity'),
            cities: __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].config('location.cities'),
            btn: null
        };
    },
    mounted: function mounted() {
        this.btn = this.$el.querySelector('.js-ht');

        heightToggle(this.btn, {
            bindCloseEvents: true
        });
    },
    beforeDestroy: function beforeDestroy() {
        this.btn.heightToggle.destroy();
    },


    methods: {
        setCity: function setCity(cityId) {
            __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].cookie.set('city', this.currentCityId = cityId);
            this.btn.heightToggle.close();
        }
    },

    computed: {
        currentCity: function currentCity() {
            var _this = this;

            return this.cities.find(function (city) {
                return city.id === _this.currentCityId;
            });
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/HeaderBanner.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageLoaders_BackgroundImageLoader__ = __webpack_require__("./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageLoaders_BackgroundImageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__imageLoaders_BackgroundImageLoader__);
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'HeaderBanner',

    components: {
        BackgroundImageLoader: __WEBPACK_IMPORTED_MODULE_0__imageLoaders_BackgroundImageLoader___default.a
    },

    props: ['link', 'image', 'mobileImage']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/LabelValueTable.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "LabelValueTable",

    props: {
        data: Array
    },

    methods: {
        isVisible: function isVisible(item) {
            return !(_.isEmpty(item.value) && item.onEmpty === 'hide');
        },
        getValue: function getValue(item) {
            if (_.isEmpty(item.value)) {
                return this.$root.translate('unspecified');
            }

            return item.value;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Loading.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'loading',

    props: {
        loading: {
            type: Boolean,
            default: false
        },
        sticky: {
            type: Boolean,
            default: false
        },
        noOverlay: {
            type: Boolean,
            default: false
        },
        noMinHeight: {
            type: Boolean,
            default: false
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/NumControl.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_PendingLoader__ = __webpack_require__("./resources/assets/js/scripts/PendingLoader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ClassNameWithModificators__ = __webpack_require__("./resources/assets/js/mixins/ClassNameWithModificators.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "NumControl",

    props: {
        number: Number,
        small: Boolean,
        min: Number,
        max: Number
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_ClassNameWithModificators__["a" /* default */]],

    data: function data() {
        return {
            focusPendingHandler: false
        };
    },


    methods: {
        set: function set(e) {
            this.updateNumber(e.target.value);
        },
        plus: function plus() {
            this.numberFlowStart(1);
        },
        minus: function minus() {
            this.numberFlowStart(-1);
        },
        plusEventHandle: function plusEventHandle(e) {
            if (e.button === 0) {
                return this.plus();
            }
        },
        minusEventHandle: function minusEventHandle(e) {
            if (e.button === 0) {
                return this.minus();
            }
        },
        handleInputArrows: function handleInputArrows(e) {
            switch (e.keyCode) {
                case 38:
                    this.plus();
                    break;

                case 40:
                    this.minus();
                    break;
            }
        },
        numberFlowStart: function numberFlowStart(augend) {
            var _this = this;

            var number = this.number + augend;

            this.updateNumber(number);
            this.focusInput();

            clearTimeout(this.numberFlowTimeout);
            clearInterval(this.numberFlowInterval);

            this.numberFlowTimeout = setTimeout(function () {
                _this.numberFlowInterval = setInterval(function () {
                    number += augend;
                    _this.updateNumber(number);
                }, 50);
            }, 300);
        },


        // todo: Событие срабатывает на вложенные элементы style="z-index: -1"

        numberFlowStop: function numberFlowStop() {
            clearTimeout(this.numberFlowTimeout);
            clearInterval(this.numberFlowInterval);

            this.blurInput();
        },
        updateNumber: function updateNumber(num) {
            if (typeof this.min !== 'undefined') {
                num = Math.max(this.min, num);
            }

            if (typeof this.max !== 'undefined') {
                num = Math.min(this.max, num);
            }

            if (this.number !== num) {
                this.$emit('update:number', num);
            }
        },
        focusInput: function focusInput() {
            if (this.focusPendingHandler !== false) {
                this.focusPendingHandler.cancel();
            }

            this.focusPendingHandler = new __WEBPACK_IMPORTED_MODULE_0__scripts_PendingLoader__["a" /* default */](300);
            this.getInputEl().classList.add('is-focused');
        },
        blurInput: function blurInput() {
            var _this2 = this;

            if (this.focusPendingHandler === false) return;

            this.focusPendingHandler.finish(function () {
                _this2.getInputEl().classList.remove('is-focused');
                _this2.focusPendingHandler = false;
            });
        },
        getInputEl: function getInputEl() {
            return this.$el.querySelector('.js-num-control-input');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Rating.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_ClassNameWithModificators__ = __webpack_require__("./resources/assets/js/mixins/ClassNameWithModificators.js");
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Rating",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_ClassNameWithModificators__["a" /* default */]],

    methods: {
        getRatingPercent: function getRatingPercent() {
            return getRandomInt(70, 100);
        },
        getScoresNum: function getScoresNum() {
            var value = getRandomInt(1, 10);
            return value + ' ' + declOfNum(value, ['отзыв', 'отзыва', 'отзывов']);
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/ScrollContainer.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ScrollContainer",

    props: {
        maxHeight: {
            type: Number,
            default: 200
        }
    },

    mounted: function mounted() {
        var _this = this;

        this.unbinders = [];
        this.check();

        this.observer = new MutationObserver(this.check.bind(this));

        this.observer.observe(this.$el, { attributes: false, childList: true, characterData: true, subtree: true });

        var resizeHadler = _.debounce(function () {
            _this.check();
        }, 64);

        this.resizeUnsubscriber = function () {
            window.removeEventListener('resize', resizeHadler);
        };

        window.addEventListener('resize', resizeHadler, { passive: true });
    },
    beforeDestroy: function beforeDestroy() {
        if (_.isFunction(this.resizeUnsubscriber)) {
            this.resizeUnsubscriber();
            this.resizeUnsubscriber = null;
        }

        if (_.isFunction(this.scrollUnsubscriber)) {
            this.scrollUnsubscriber();
            this.scrollUnsubscriber = null;
        }

        this.unbindEvents();
        this.observer.disconnect();
    },


    methods: {
        check: function check() {
            if (this.$el.scrollHeight > this.$el.clientHeight) {
                this.handleScroll();
                this.bindEvents();
            } else {
                this.$el.removeAttribute('style');
                this.$el.classList.remove('overflow-top');
                this.$el.classList.remove('overflow-bottom');
                this.$el.classList.remove('overflow-both');
                this.unbindEvents();
            }
        },
        bindEvents: function bindEvents() {
            var _this2 = this;

            var scrollHandler = _.throttle(function () {
                _this2.handleScroll();
            }, 64, { leading: false });

            this.scrollUnsubscriber = function () {
                _this2.$el.removeEventListener('scroll', scrollHandler);
                scrollHandler = null;
            };

            this.$el.addEventListener('scroll', scrollHandler, { passive: true });
        },
        unbindEvents: function unbindEvents() {
            if (_.isFunction(this.scrollUnsubscriber)) {
                this.scrollUnsubscriber();
                this.scrollUnsubscriber = null;
            }
        },
        handleScroll: function handleScroll() {
            var el = this.$el;

            var overflowTop = el.scrollTop !== 0;
            var overflowBottom = el.offsetHeight + el.scrollTop !== el.scrollHeight;

            if (overflowTop && overflowBottom) {
                el.classList.remove('overflow-top');
                el.classList.remove('overflow-bottom');
                el.classList.add('overflow-both');
            } else {
                if (el.classList.contains('overflow-both')) {
                    el.classList.remove('overflow-both');
                }

                if (overflowTop) {
                    el.classList.add('overflow-top');
                } else {
                    el.classList.remove('overflow-top');
                }

                if (overflowBottom) {
                    el.classList.add('overflow-bottom');
                } else {
                    el.classList.remove('overflow-bottom');
                }
            }
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/SidePopup.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_SidePopupper__ = __webpack_require__("./resources/assets/js/scripts/SidePopupper.js");
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "SidePopup",

    data: function data() {
        return {
            popup: null
        };
    },
    mounted: function mounted() {
        this.popup = new __WEBPACK_IMPORTED_MODULE_0__scripts_SidePopupper__["a" /* default */](this.$el.firstChild);
    },


    methods: {
        open: function open() {
            var _this = this;

            if (this.popup) {
                this.$nextTick(function () {
                    _this.popup.open();
                });
            }
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Tabs.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_ClassNameWithModificators__ = __webpack_require__("./resources/assets/js/mixins/ClassNameWithModificators.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Tabs',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_ClassNameWithModificators__["a" /* default */]],

    props: {
        active: String,
        tabs: Object
    },

    watch: {
        active: 'updateLinePosition'
    },

    mounted: function mounted() {
        var _this = this;

        this.updateLinePosition();

        this.resizeUnsubscriber = this.$root.$on('resize', function () {
            _this.updateLinePosition();
        });
    },
    beforeDestroy: function beforeDestroy() {
        if (_.isFunction(this.resizeUnsubscriber)) {
            this.resizeUnsubscriber();
        }
    },


    methods: {
        getLineEl: function getLineEl() {
            return this.$el.querySelector('.js-sort-line');
        },
        getActiveEl: function getActiveEl() {
            return this.$el.querySelector('.is-active');
        },
        click: function click(key) {
            if (this.active !== key) {
                this.$emit('activation', key);
            }
        },
        updateLinePosition: function updateLinePosition() {
            var _this2 = this;

            this.$nextTick(function () {
                var activeEl = _this2.getActiveEl();
                var lineEl = _this2.getLineEl();

                if (_this2.$root.windowLessThan('md')) {
                    _this2.updateLineV(activeEl, lineEl);
                } else {
                    _this2.updateLineH(activeEl, lineEl);
                }
            });
        },
        updateLineH: function updateLineH(activeEl, lineEl) {
            lineEl.setAttribute('style', 'left:' + Math.round(activeEl.offsetLeft) + 'px;width:' + Math.round(activeEl.scrollWidth) + 'px');
        },
        updateLineV: function updateLineV(activeEl, lineEl) {
            lineEl.setAttribute('style', 'top:' + Math.round(activeEl.offsetTop) + 'px;height:' + Math.round(activeEl.scrollHeight) + 'px');
        },
        isActive: function isActive(key) {
            return this.active === key;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/TabsHtml.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tabs__ = __webpack_require__("./resources/assets/js/components/Tabs.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Tabs__);
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "TabsHtml",

    components: {
        Tabs: __WEBPACK_IMPORTED_MODULE_0__Tabs___default.a
    },

    props: {
        active: String,
        tabs: Object,
        classNameModificators: null
    },

    data: function data() {
        return {
            active$: this.active || Object.keys(this.tabs)[0]
        };
    },
    mounted: function mounted() {
        this.els = Object.keys(this.tabs).reduce(function (acc, query) {
            acc[query] = document.querySelector(query);

            return acc;
        }, {});
    },


    methods: {
        activate: function activate(key) {
            var _this = this;

            this.els[this.active$].addEventListener('transitionend', function () {
                _this.els[_this.active$].classList.remove('active');

                _this.active$ = key;

                _this.els[key].classList.add('active');

                setTimeout(function () {
                    _this.els[key].classList.add('show');
                });
            }, { passive: true, once: true });

            this.els[this.active$].classList.remove('show');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Timer.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AnimatedSymbolChange__ = __webpack_require__("./resources/assets/js/components/AnimatedSymbolChange.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AnimatedSymbolChange___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AnimatedSymbolChange__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var second = 1;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Timer",

    components: {
        AnimatedSymbolChange: __WEBPACK_IMPORTED_MODULE_0__AnimatedSymbolChange___default.a
    },

    props: {
        time: Number
    },

    data: function data() {
        return {
            elapsed: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            stopped: false
        };
    },
    mounted: function mounted() {
        var _this = this;

        var start = performance.now();

        var animate = function animate(time) {
            _this.elapsed = (time - start) / 1000;

            _this.tick();

            if (_this.timeLeft > 0 && !_this.stopped) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    },
    beforeDestroy: function beforeDestroy() {
        this.stopped = true;
    },


    methods: {
        isDone: function isDone() {
            return this.timeLeft === 0;
        },
        tick: function tick() {
            var left = this.timeLeft;

            this.days = Math.floor(left / day);
            left -= day * this.days;

            this.hours = Math.floor(left / hour);
            left -= hour * this.hours;

            this.minutes = Math.floor(left / minute);

            this.seconds = Math.floor(left - minute * this.minutes);
        },
        prepareNum: function prepareNum(num) {
            return num < 10 ? '0' + num : num;
        }
    },

    computed: {
        timeLeft: function timeLeft() {
            return Math.max(this.time - this.elapsed, 0);
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/Banner.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader__ = __webpack_require__("./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Banner",

    components: {
        BackgroundImageLoader: __WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader___default.a
    },

    props: {
        id: Number,

        image: String,

        gradientFrom: {
            default: '#fcc600'
        },

        gradientTo: {
            default: '#fdda55'
        },

        gradientIsRadial: {
            default: false
        },

        gradientType: {
            default: 'linear'
        },

        gradientAngle: {
            default: 45
        },

        title: String,

        buttonText: {
            type: String,
            // todo: Назвать правильно
            default: __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].translate('See details')
        },

        link: {
            type: String
        }
    },

    computed: {
        linkIsOuter: function linkIsOuter() {
            return this.link.indexOf('http') === 0 && this.link.indexOf(window.location.host) === -1;
        },
        preparedLink: function preparedLink() {
            return this.linkIsOuter ? this.link : __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].siteUrl(this.link);
        },
        gradient: function gradient() {
            if (this.gradientIsRadial) {
                return 'radial-gradient(' + this.gradientFrom + ', ' + this.gradientTo + ')';
            }

            return 'linear-gradient(' + this.gradientAngle + 'deg, ' + this.gradientFrom + ' 0%, ' + this.gradientTo + ' 100%)';
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/BannerHomeNew.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_json__ = __webpack_require__("./resources/assets/js/components/banners/banners.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__banners_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Banner__ = __webpack_require__("./resources/assets/js/components/banners/Banner.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Banner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Banner__);
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BannerHomeNew",

    components: {
        Banner: __WEBPACK_IMPORTED_MODULE_1__Banner___default.a
    },

    data: function data() {
        return {
            data: __WEBPACK_IMPORTED_MODULE_0__banners_json___default.a.find(function (item) {
                return item.id === 3;
            })
        };
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/BannerHomeStock.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_json__ = __webpack_require__("./resources/assets/js/components/banners/banners.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__banners_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Banner__ = __webpack_require__("./resources/assets/js/components/banners/Banner.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Banner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Banner__);
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BannerHomeStock",

    components: {
        Banner: __WEBPACK_IMPORTED_MODULE_1__Banner___default.a
    },

    data: function data() {
        return {
            data: __WEBPACK_IMPORTED_MODULE_0__banners_json___default.a.find(function (item) {
                return item.id === 1;
            })
        };
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/BannerRandom.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_json__ = __webpack_require__("./resources/assets/js/components/banners/banners.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__banners_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Banner__ = __webpack_require__("./resources/assets/js/components/banners/Banner.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Banner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Banner__);




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BannerRandom",

    props: {
        isLong: {
            type: Boolean,
            default: false
        }
    },

    components: {
        Banner: __WEBPACK_IMPORTED_MODULE_1__Banner___default.a
    },

    data: function data() {
        return {
            data: __WEBPACK_IMPORTED_MODULE_0__banners_json___default.a[_.random(0, __WEBPACK_IMPORTED_MODULE_0__banners_json___default.a.length - 1)]
        };
    },


    render: function render(createElement) {
        var params = {
            props: this.data
        };

        if (this.isLong) {
            params.class = 'banner--long';
        }

        return createElement('banner', params);
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/buttons/ButtonLoading.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ButtonLoading",

    props: {
        tag: {
            type: String,
            default: 'button'
        },

        loading: Boolean
    },

    methods: {
        click: function click() {
            this.$emit('click');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/imageLoaders/mixin.js");
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "BackgroundImageLoader",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    computed: {
        style: function style() {
            if (this.image$) {
                return {
                    'background-image': "url('" + this.image$ + "')"
                };
            }

            return '';
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/ProductShortDescription.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ProductImagesHat__ = __webpack_require__("./resources/assets/js/mixins/ProductImagesHat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader__ = __webpack_require__("./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductShortDescription",

    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_ProductImagesHat__["a" /* default */]],

    components: {
        BackgroundImageLoader: __WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader___default.a
    },

    props: {
        product: Object,
        small: Boolean
    },

    methods: {
        mouseover: function mouseover() {
            this.$el.classList.add('link-is-active');
        },
        mouseout: function mouseout() {
            this.$el.classList.remove('link-is-active');
        }
    },

    computed: {
        link: function link() {
            return __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].siteUrl('goods/' + this.product.id);
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cabinet/Cabinet.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs__ = __webpack_require__("./resources/assets/js/components/Tabs.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Tabs__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Cabinet",

    components: {
        Tabs: __WEBPACK_IMPORTED_MODULE_1__Tabs___default.a
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        pages: function pages(state) {
            return state.cabinet.pages;
        },
        activePage: function activePage(state) {
            return state.cabinet.pages;
        }
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/Cart.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/cart/mixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Cart",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    mounted: function mounted() {
        this.$store.dispatch('cart/init');
    },


    methods: {
        getWrapEl: function getWrapEl() {
            return document.querySelector('.js-cart-wrap');
        },
        beforeEnter: function beforeEnter(el) {
            var wrapEl = this.getWrapEl();

            wrapEl.classList.add('animation-in-process');

            this.$nextTick(function () {
                wrapEl.style.height = el.clientHeight + 100 + 'px';
            });
        },
        afterLeave: function afterLeave() {
            var wrapEl = this.getWrapEl();

            this.$nextTick(function () {
                wrapEl.style.height = 'auto';
                wrapEl.classList.remove('animation-in-process');
            });
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/CartBtn.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScrollContainer__ = __webpack_require__("./resources/assets/js/components/ScrollContainer.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScrollContainer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ScrollContainer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin__ = __webpack_require__("./resources/assets/js/components/shop/cart/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'CartBtn',

    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixin__["a" /* default */]],

    components: {
        ScrollContainer: __WEBPACK_IMPORTED_MODULE_1__ScrollContainer___default.a
    },

    data: function data() {
        return {
            loaded: false
        };
    },


    watch: {
        isDesktop: 'checkHT'
    },

    mounted: function mounted() {
        var _this = this;

        this.btn = this.$el.querySelector('.js-cart-btn');
        this.checkHT();

        var badgeEl = this.$el.querySelector('.js-badge');
        var debouncer = _.debounce(function () {
            badgeEl.classList.remove('bounce');
        }, 1000);

        this.badgeAnimator = _.throttle(function () {
            badgeEl.classList.add('bounce');
            debouncer();
        }, 1000, { leading: true });

        this.animateUnsubscriber = this.$store.subscribe(function (mutation) {
            if (mutation.type === 'cart/CART_ADD_ITEM') {
                if (_this.loaded) {
                    _this.$nextTick(function () {
                        _this.badgeAnimator();
                    });
                } else if (_this.$store.state.cart.ready) {
                    _this.loaded = true;
                }
            }
        });
    },
    beforeDestroy: function beforeDestroy() {
        if (this.btn.heightToggle) {
            this.btn.heightToggle.destroy();
        }

        if (typeof this.animateUnsubscriber === 'function') {
            this.animateUnsubscriber();
        }

        this.badgeAnimator = undefined;
    },


    computed: _extends({
        productsShortQuantity: function productsShortQuantity() {
            if (this.productsQuantity > 9) {
                return '9+';
            }

            return this.productsQuantity;
        },
        btnLink: function btnLink() {
            if (this.isDesktop) {
                return 'javascript:void(0)';
            }

            return this.linkToCart;
        },
        linkToCart: function linkToCart() {
            return __WEBPACK_IMPORTED_MODULE_0__scripts_core__["a" /* default */].siteUrl('/cart');
        },
        isDesktop: function isDesktop() {
            return this.$root.isDesktop;
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["mapGetters"])({
        isEmpty: 'cart/isEmpty'
    })),

    methods: {
        checkHT: function checkHT() {
            var _this2 = this;

            this.$nextTick(function () {
                var htLoaded = !!_this2.btn.heightToggle;

                if (_this2.isDesktop && !htLoaded) {
                    heightToggle(_this2.btn, {
                        bindCloseEvents: true
                    });
                }

                if (!_this2.isDesktop && htLoaded) {
                    _this2.btn.heightToggle.destroy();
                }
            });
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/CartTable.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product_CartProductRow__ = __webpack_require__("./resources/assets/js/components/shop/cart/product/CartProductRow.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product_CartProductRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__product_CartProductRow__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_CartProductItem__ = __webpack_require__("./resources/assets/js/components/shop/cart/product/CartProductItem.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_CartProductItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__product_CartProductItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_ClassNameWithModificators__ = __webpack_require__("./resources/assets/js/mixins/ClassNameWithModificators.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CartTable",

    components: {
        CartProductRow: __WEBPACK_IMPORTED_MODULE_1__product_CartProductRow___default.a,
        CartProductItem: __WEBPACK_IMPORTED_MODULE_2__product_CartProductItem___default.a
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_ClassNameWithModificators__["a" /* default */]],

    props: {
        'no-header': {
            type: Boolean,
            default: false
        },

        'no-controls': {
            type: Boolean,
            default: false
        },

        small: Boolean
    },

    data: function data() {
        return {
            breakpoint: 768
        };
    },


    computed: _extends({
        isTable: function isTable() {
            return this.$root.windowMoreThan('md');
        },
        className: function className() {
            var baseClass = 'cart-table';
            var addModif = function addModif(acc, modif) {
                return acc + ' ' + baseClass + '--' + modif;
            };

            if (_.isArray(this.modif)) {
                return this.modif.reduce(addModif, baseClass);
            }

            if (_.isString(this.modif)) {
                return addModif(baseClass, this.modif);
            }

            return baseClass;
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        products: function products(state, getters) {
            return getters['cart/products'];
        }
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/product/CartProductItem.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/cart/product/mixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CartProductItem",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/product/CartProductRow.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/cart/product/mixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CartProductRow",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    methods: {
        beforeLeave: function beforeLeave(el) {
            var plugEl = document.createElement('tr');
            var tdEl = plugEl.insertCell(0);

            tdEl.colSpan = el.cells.length;
            tdEl.style.backgroundColor = '#fafbfc';
            tdEl.style.height = el.scrollHeight + 'px';
            tdEl.style.padding = '0';
            tdEl.style.position = 'relative';
            tdEl.style.overflow = 'hidden';
            tdEl.style.transition = 'height 300ms ease-in';
            tdEl.style.transform = 'translate3d(0, 0, 0)';
            tdEl.style.willChange = 'transform';

            el.style.position = 'absolute';
            el.style.width = '100%';
            el.style.left = '0';
            el.style.top = '50%';
            el.style.zIndex = '1';
            el.style.overflow = 'hidden';
            el.style.transform = 'translate3d(0, -50%, 0)';
            el.style.transition = 'all 300ms';
            el.style.willChange = 'transform, opacity';

            plugEl.appendChild(tdEl);
            el.parentNode.insertBefore(plugEl, el.nextSibling);
            tdEl.appendChild(el);

            this.plugEl = plugEl;
            this.tdEl = tdEl;
        },
        leave: function leave(el, done) {
            var tdEl = this.tdEl;

            el.classList.add('block-ui');

            setTimeout(function () {
                var handler = function handler(e) {
                    if (tdEl.isEqualNode(e.target)) {
                        done();
                        tdEl.removeEventListener('transitionend', handler);
                    }
                };

                tdEl.addEventListener('transitionend', handler, { passive: true });

                el.style.transform = 'translate3d(0, -50%, 0) scale(0.9)';
                el.style.opacity = '0.2';
                tdEl.style.height = '0px';
            }, 0);
        },
        afterLeave: function afterLeave() {
            this.plugEl.parentElement.removeChild(this.plugEl);
            this.plugEl = undefined;
            this.tdEl = undefined;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/CardTypesChanger.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CardTypesChanger",

    mounted: function mounted() {
        this.$root.initTooltips();
    },


    methods: {
        click: function click(type) {
            this.$store.dispatch('catalog/setCardType', type);
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        types: function types(state) {
            return state.catalog.cards.types;
        },
        active: function active(state) {
            return state.catalog.cards.active;
        }
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/Catalog.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sort_mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/sort/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/filter/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_list_mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-list/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading__ = __webpack_require__("./resources/assets/js/components/Loading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Loading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Tabs__ = __webpack_require__("./resources/assets/js/components/Tabs.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CardTypesChanger__ = __webpack_require__("./resources/assets/js/components/shop/catalog/CardTypesChanger.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CardTypesChanger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__CardTypesChanger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buttons_ButtonLoading__ = __webpack_require__("./resources/assets/js/components/buttons/ButtonLoading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buttons_ButtonLoading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__buttons_ButtonLoading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scripts_PendingLoader__ = __webpack_require__("./resources/assets/js/scripts/PendingLoader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__banners_BannerRandom__ = __webpack_require__("./resources/assets/js/components/banners/BannerRandom.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__banners_BannerRandom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__banners_BannerRandom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SidePopup__ = __webpack_require__("./resources/assets/js/components/SidePopup.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SidePopup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__SidePopup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_multiselect__ = __webpack_require__("./node_modules/vue-multiselect/dist/vue-multiselect.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_vue_multiselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__scripts_DataHandler__ = __webpack_require__("./resources/assets/js/scripts/DataHandler.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


















/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Catalog",

    components: {
        Loading: __WEBPACK_IMPORTED_MODULE_4__Loading___default.a,
        Tabs: __WEBPACK_IMPORTED_MODULE_5__Tabs___default.a,
        CardTypesChanger: __WEBPACK_IMPORTED_MODULE_6__CardTypesChanger___default.a,
        ButtonLoading: __WEBPACK_IMPORTED_MODULE_7__buttons_ButtonLoading___default.a,
        BannerRandom: __WEBPACK_IMPORTED_MODULE_9__banners_BannerRandom___default.a,
        SidePopup: __WEBPACK_IMPORTED_MODULE_10__SidePopup___default.a,
        MultiSelect: __WEBPACK_IMPORTED_MODULE_11_vue_multiselect___default.a
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_1__sort_mixin__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__filter_mixin__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__product_list_mixin__["a" /* default */]],

    data: function data() {
        return {
            errorRefreshIterations: 0,
            error: false,
            loading: true,
            products$: [],
            productsThatCanBeShown: [],
            productsToShow: [],
            activeCardType: '',
            productsToShowCalculateInProcess: false,
            productsLoading: {
                inProcess: false,
                minTime: 700,
                handler: false
            },

            lastFilterName: false
        };
    },


    watch: {
        productsToShow: 'loadingProductsEnd',
        perPage: 'calculateProductsToShow',
        productsThatCanBeShown: ['calculateProductsToShow', 'applyActiveOptions'],
        activeCardType: 'calculateProductsToShow',
        activeSortType: ['loadingProductsStart', 'changeSortType']
    },

    created: function created() {
        var _this = this;

        var throttle = _.throttle(function () {
            _this.productsToShowCalculateInProcess = false;
            _this.unbindScrollMoreEvent();
            _this.calculatePerPager();

            _this.loadingProductsEnd();
            _this.bindScrollMoreEvent();
        }, 300);

        this.calculateProductsToShowThrottler = function () {
            _this.productsToShowCalculateInProcess = true;

            throttle();
        };

        this.$store.subscribe(function (mutation) {
            if (mutation.type === 'catalog/CATALOG_SET_CARD_TYPE') {
                _this.setActiveCardType();
            }
        });

        this.filterChangeHandler = function (filterName) {
            _this.lastFilterName = filterName;
            _this.productsThatCanBeShown = _this.filterProducts(_this.products$);
            _this.resetPage();
        };

        this.$store.dispatch('catalog/init');

        this.fetchCatalog();
    },


    methods: {
        fetchProducts: function fetchProducts() {
            return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/api' + window.location.pathname);
        },
        fetchFilters: function fetchFilters() {
            return __WEBPACK_IMPORTED_MODULE_12__scripts_DataHandler__["a" /* default */].get('attributes');
        },
        fetchCatalog: function fetchCatalog() {
            var _this2 = this;

            this.loading = true;

            Promise.all([this.fetchFilters(), this.fetchProducts()]).then(function (response) {
                _this2.products$ = response[1].data.products;
                _this2.filters$ = response[0].attributes;

                _this2.init();

                _this2.error = false;
            }).catch(function (error) {
                _this2.error = true;

                console.error(error);
            }).finally(function () {
                _this2.loading = false;
            });
        },


        // todo: разобраться с этим ужасом
        init: function init() {
            this.$root.$on('filterChanged', this.filterChangeHandler);
            this.$root.$on('resize', this.setActiveCardType);

            this.loadingProductsStart();
            this.setActiveCardType();
            this.changeSortType();
        },
        changeSortType: function changeSortType() {
            this.products$ = this.sortProducts(this.products$);
            this.productsThatCanBeShown = this.filterProducts(this.products$);
            this.resetPage();
        },


        /**
         * Попытка загрузки каталога в случае возникновения ошибки.
         */
        refreshCatalog: function refreshCatalog() {
            if (++this.errorRefreshIterations > 1) {
                window.location.reload();
            } else {
                this.fetchCatalog();
            }
        },
        calculateProductsToShow: function calculateProductsToShow() {
            this.loadingProductsStart();

            this.calculateProductsToShowThrottler();
        },
        setActiveCardType: function setActiveCardType() {
            var type = this.$root.windowLessThan('lg') ? 'mobile' : this.$store.state.catalog.cards.active;

            if (type !== this.activeCardType) {
                this.resetPage();
                this.activeCardType = type;
            }
        },
        loadingProductsStart: function loadingProductsStart() {
            if (this.productsLoading.inProcess) {
                this.productsLoading.handler.cancel();
            }

            this.productsLoading = {
                inProcess: true,
                minTime: this.productsLoading.minTime,
                handler: new __WEBPACK_IMPORTED_MODULE_8__scripts_PendingLoader__["a" /* default */](this.productsLoading.minTime)
            };
        },
        loadingProductsEnd: function loadingProductsEnd() {
            var _this3 = this;

            if (this.productsLoading.inProcess) {
                this.productsLoading.handler.finish(function () {
                    _this3.productsLoading = {
                        inProcess: false,
                        minTime: _this3.productsLoading.minTime,
                        handler: false
                    };
                });
            }
        },
        resetPage: function resetPage() {
            this.page = 1;

            this.calculateProductsToShow();
        },
        calculatePerPager: function calculatePerPager() {
            var end = Math.min(this.perPage * this.page, this.productsThatCanBeShown.length);

            this.productsToShow = this.productsThatCanBeShown.slice(0, end);
        },
        openPopup: function openPopup() {
            this.$refs.popup.open();
        },
        setActiveSortTypeByMultiselect: function setActiveSortTypeByMultiselect(type) {
            this.setActiveSortType(type.value);
        }
    },

    computed: {
        multiselectSortOptions: function multiselectSortOptions() {
            var _this4 = this;

            return Object.keys(this.sortTypes).reduce(function (acc, key) {
                acc.push({
                    title: _this4.sortTypes[key],
                    value: key
                });

                return acc;
            }, []);
        },
        multiselectActiveSortType: function multiselectActiveSortType() {
            var _this5 = this;

            return this.multiselectSortOptions.find(function (option) {
                return option.value === _this5.activeSortType;
            });
        }
    },

    beforeDestroy: function beforeDestroy() {
        if (this.filterChangeHandler) {
            this.$root.$off('filterChanged', this.filterChangeHandler);
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/ProductList.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Loading__ = __webpack_require__("./resources/assets/js/components/Loading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Loading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_list_CatalogProductList__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_list_CatalogProductList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__product_list_CatalogProductList__);
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductList",

    components: {
        CatalogProductList: __WEBPACK_IMPORTED_MODULE_2__product_list_CatalogProductList___default.a,
        Loading: __WEBPACK_IMPORTED_MODULE_1__Loading___default.a
    },
    data: function data() {
        return {
            error: false,
            loading: true,
            products: []
        };
    },

    props: {
        url: null,
        limit: {
            type: Number,
            default: 8
        }
    },

    mounted: function mounted() {
        this.fetchProducts();
    },


    computed: {
        cardType: function cardType() {
            return this.$root.windowMoreThan('lg') ? 'tile' : 'mobile';
        }
    },

    methods: {
        fetchProducts: function fetchProducts() {
            var _this = this;

            // todo: доделать обработку ошибок
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(this.url).then(function (response) {
                _this.products = response.data.products.slice(0, _this.limit);
                _this.loading = false;
            }).catch(function (error) {
                _this.error = true;
                console.log(error);
            }).finally(function () {
                // this.loading = false
            });
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_BannerRandom__ = __webpack_require__("./resources/assets/js/components/banners/BannerRandom.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners_BannerRandom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__banners_BannerRandom__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'CatalogBanner',

    props: {
        index: null
    },

    components: {
        BannerRandom: __WEBPACK_IMPORTED_MODULE_0__banners_BannerRandom___default.a
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CatalogFilterOption__ = __webpack_require__("./resources/assets/js/components/shop/catalog/filter/CatalogFilterOption.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CatalogFilterOption___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CatalogFilterOption__);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CatalogFilter",

    components: {
        CatalogFilterOption: __WEBPACK_IMPORTED_MODULE_0__CatalogFilterOption___default.a
    },

    props: {
        id: Number,
        title: String,
        options: Array,
        expanded: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            checkedOptions: [],
            activeOptions: [],
            activeOptions$: {}
        };
    },
    mounted: function mounted() {
        this.$nextTick(function () {
            heightToggle('.js-ht-filter');
        });
    },


    methods: {
        optionClick: function optionClick(optionId) {
            if (this.checkedOptions.indexOf(optionId) === -1) {
                this.checkedOptions = [].concat(_toConsumableArray(this.checkedOptions), [optionId]);
            } else {
                this.checkedOptions = this.checkedOptions.filter(function (id) {
                    return id != optionId;
                });
            }

            this.$root.$emit('filterChanged');
        },
        optionIsChecked: function optionIsChecked(optionId) {
            return this.checkedOptions.indexOf(optionId) !== -1;
        },
        optionIsDisabled: function optionIsDisabled(optionId) {
            if (this.optionIsChecked(optionId)) {
                return false;
            }

            return this.activeOptions.indexOf(optionId) === -1;
        },
        prepareActiveOptions: function prepareActiveOptions(_ref) {
            var _this = this;

            var _ref$options = _ref.options,
                options = _ref$options === undefined ? [] : _ref$options;

            options.forEach(function (optionId) {
                _this.activeOptions$[optionId] = 1;
            });
        },
        applyActiveOptions: function applyActiveOptions() {
            this.activeOptions = Object.keys(this.activeOptions$).map(function (optionId) {
                return parseInt(optionId);
            });
            this.activeOptions$ = {};
        },
        checkProduct: function checkProduct() {
            var product = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (this.checkedOptions.length === 0) {
                return true;
            }

            var options = product.options;

            if (!(options instanceof Array && options.length > 0)) {
                return false;
            }

            for (var i = 0; i < this.checkedOptions.length; i++) {
                var index = options.indexOf(this.checkedOptions[i]);

                if (index !== -1) {
                    return true;
                }
            }

            return false;
        },
        isDirty: function isDirty() {
            return !!this.checkedOptions.length;
        },
        clear: function clear() {
            this.checkedOptions = [];
        }
    },

    computed: {
        orderedOptions: function orderedOptions() {
            return _.orderBy(this.options, 'position');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CatalogFilter__ = __webpack_require__("./resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CatalogFilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CatalogFilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CatalogFilterPrice__ = __webpack_require__("./resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CatalogFilterPrice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CatalogFilterPrice__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CatalogFilterList",

    components: {
        CatalogFilter: __WEBPACK_IMPORTED_MODULE_0__CatalogFilter___default.a,
        CatalogFilterPrice: __WEBPACK_IMPORTED_MODULE_1__CatalogFilterPrice___default.a
    },

    props: ['prices', 'filters'],

    methods: {
        getFiltersArray: function getFiltersArray() {
            var filters = [];

            for (var key in this.$refs) {
                if (this.$refs[key] instanceof Array) {
                    this.$refs[key].forEach(function (component) {
                        filters.push(component);
                    });
                } else {
                    filters.push(this.$refs[key]);
                }
            }

            return filters;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterOption.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CatalogFilterOption",

    props: {
        id: null,

        title: String,

        checked: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    render: function render(createElement) {
        var _class,
            _this = this;

        return createElement('label', {
            class: (_class = {
                'form-checkbox': true,
                'filter-option': true
            }, _defineProperty(_class, 'filter-option--' + this.id, true), _defineProperty(_class, 'disabled', this.disabled), _class),

            on: {
                click: function click(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!_this.disabled) {
                        _this.$emit('click');
                    }
                }
            }
        }, [createElement('input', {
            class: 'form-checkbox__input',
            attrs: {
                type: 'checkbox',
                checked: this.checked,
                disabled: this.disabled
            }
        }), createElement('span', { class: 'form-checkbox__checkmark' }), createElement('span', {
            class: 'form-checkbox__label'
        }, [this.title])]);
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_slider_component__ = __webpack_require__("./node_modules/vue-slider-component/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_slider_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_slider_component__);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



// Добавлены event клика по слайдеру
__WEBPACK_IMPORTED_MODULE_0_vue_slider_component___default.a.methods.wrapClick = function (e) {
    if (this.isDisabled || !this.clickable || this.processFlag) return false;
    var pos = this.getPos(e);
    if (this.isRange) {
        this.currentSlider = pos > (this.position[1] - this.position[0]) / 2 + this.position[0] ? 1 : 0;
    }
    this.setValueOnPos(pos);
    this.$emit('click', this);
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CatalogFilterPrice",

    components: {
        VueSlider: __WEBPACK_IMPORTED_MODULE_0_vue_slider_component___default.a
    },

    props: ['name', 'prices'],

    // todo: допилить

    data: function data() {
        return {
            priceFilter: {
                value: [].concat(_toConsumableArray(this.prices)),
                width: 'calc(100% - 30px)',
                height: 5,
                dotSize: 15,
                min: this.prices[0],
                max: this.prices[1],
                interval: 1,
                disabled: false,
                show: true,
                formatter: "{value} ₽",
                tooltip: 'always',
                piecewise: false,
                // processDragable: true,
                style: {
                    "marginTop": "20px",
                    "marginBottom": "0px",
                    "marginLeft": "auto",
                    "marginRight": "auto"
                },
                bgStyle: {
                    "backgroundColor": "#b4b4b4"
                },
                sliderStyle: [{
                    "backgroundColor": "#fcc600",
                    "boxShadow": "none"
                }, {
                    "backgroundColor": "#fcc600",
                    "boxShadow": "none"
                }],
                tooltipStyle: [{
                    "backgroundColor": "#ecedf3",
                    "borderColor": "#ecedf3",
                    "fontSize": "12px",
                    "color": "#969CA3",
                    "paddingLeft": "6px",
                    "paddingRight": "6px",
                    "borderRadius": "3px"
                }, {
                    "backgroundColor": "#ecedf3",
                    "borderColor": "#ecedf3",
                    "fontSize": "12px",
                    "color": "#969CA3",
                    "boxShadows": "none",
                    "paddingLeft": "6px",
                    "paddingRight": "6px",
                    "borderRadius": "3px"
                }],
                processStyle: {
                    "backgroundColor": "transparent"
                }
                // data: [
                //     '8560',
                //     '8960',
                //     '1060',
                //     '1160',
                //     '1260',
                //     '1360',
                //     '1460',
                //     '1560',
                //     '1660',
                //     '1760',
                //     '1860',
                //     '1960',
                //     '108700'
                // ]
            },

            filterRange: [].concat(_toConsumableArray(this.prices)),
            availableRange: [].concat(_toConsumableArray(this.prices)),
            cachedRange: [].concat(_toConsumableArray(this.prices)),
            manualRange: [].concat(_toConsumableArray(this.prices)),
            activePrices$: false
        };
    },
    mounted: function mounted() {
        this.$nextTick(function () {
            heightToggle('.js-ht-price-filter');
        });
    },


    methods: {
        checkProduct: function checkProduct() {
            var product = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var price = parseInt(product.price);

            if (price < parseInt(this.filterRange[0])) {
                return false;
            }

            if (price > parseInt(this.filterRange[1])) {
                return false;
            }

            return true;
        },
        prepareActiveOptions: function prepareActiveOptions(product) {
            if (!this.activePrices$) {
                this.activePrices$ = [product.price, product.price];
            } else {
                if (product.price < this.activePrices$[0]) {
                    this.activePrices$[0] = product.price;
                } else if (product.price > this.activePrices$[1]) {
                    this.activePrices$[1] = product.price;
                }
            }
        },
        applyActiveOptions: function applyActiveOptions(filterName) {
            var prices = this.activePrices$ ? this.activePrices$ : this.prices;

            this.availableRange = [].concat(_toConsumableArray(prices));

            if (filterName !== this.name) {
                this.priceFilter.value = [Math.max(prices[0], this.manualRange[0]), Math.min(prices[1], this.manualRange[1])];
            }

            this.activePrices$ = false;
        },
        clear: function clear() {
            this.priceFilter.value = [].concat(_toConsumableArray(this.prices));
            this.filterRange = [].concat(_toConsumableArray(this.prices));
            this.cachedRange = [].concat(_toConsumableArray(this.prices));
            this.manualRange = [].concat(_toConsumableArray(this.prices));
            this.availableRange = [].concat(_toConsumableArray(this.prices));
        },
        inputChange: function inputChange() {
            var min = this.$refs.minPrice.value;
            var max = this.$refs.maxPrice.value;

            min = Math.max(this.priceFilter.min, min);
            min = Math.min(this.priceFilter.max, min);

            max = Math.min(this.priceFilter.max, max);
            max = Math.max(this.priceFilter.min, max);

            this.setPriceRange([min, max]);
        },
        sliderValueChanged: function sliderValueChanged() {
            this.setPriceRange(this.priceFilter.value);
        },
        setPriceRange: function setPriceRange(prices) {
            if (this.cachedRange[0] !== prices[0] || this.cachedRange[1] !== prices[1]) {
                this.cachedRange = [].concat(_toConsumableArray(prices));

                this.manualRange = [].concat(_toConsumableArray(prices));

                this.priceFilter.value = [].concat(_toConsumableArray(prices));

                this.filterRange = [Math.min(prices[0], this.manualRange[0]), Math.max(prices[1], this.manualRange[1])];

                this.$root.$emit('filterChanged', this.name);
            }
        },
        getPercent: function getPercent(value) {
            return (value / this.diff * 100).toFixed(4);
        },
        isDirty: function isDirty() {
            return !_.isEqual(this.priceFilter.value, this.prices);
        }
    },

    computed: {
        diff: function diff() {
            return this.prices[1] - this.prices[0];
        },
        emptyLeftStyle: function emptyLeftStyle() {
            return {
                left: '0',
                width: this.getPercent(this.priceFilter.value[0] - this.prices[0]) + '%'
            };
        },
        emptyRightStyle: function emptyRightStyle() {
            return {
                right: '0',
                width: this.getPercent(this.prices[1] - this.priceFilter.value[1]) + '%'
            };
        },
        availableStyle: function availableStyle() {
            var leftPercent = this.getPercent(this.availableRange[0] - this.prices[0]);
            var rightPercent = this.getPercent(this.prices[1] - this.availableRange[1]);

            return {
                left: 'calc(' + leftPercent + '% - 1px)',
                right: 'calc(' + rightPercent + '% - 1px)'
            };
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/mixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductCard",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/mixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductCardLong",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    data: function data() {
        return {
            linkIsHovered: false
        };
    },


    methods: {
        hoverLink: function hoverLink() {
            this.linkIsHovered = true;
        },
        unHoverLink: function unHoverLink() {
            this.linkIsHovered = false;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/mixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductCardMobile",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Timer__ = __webpack_require__("./resources/assets/js/components/Timer.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Timer__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductCardSale",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    components: {
        Timer: __WEBPACK_IMPORTED_MODULE_1__Timer___default.a
    },

    props: {
        saleTime: null,
        small: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            image: false
        };
    },
    mounted: function mounted() {
        if (this.images.length) {
            this.image = this.images[0];
        }
    },


    methods: {
        setImage: function setImage(id) {
            this.image = this.product.images.find(function (image) {
                return image.id === id;
            });
        }
    },

    computed: {
        images: function images() {
            if (!(this.product && this.product.images && this.product.images.length)) return [];

            return this.product.images.slice(0, 3);
        },
        isSmall: function isSmall() {
            return this.small || this.$root.isMobile;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banner_CatalogBanner__ = __webpack_require__("./resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banner_CatalogBanner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__banner_CatalogBanner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product_cards_ProductCard__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product_cards_ProductCard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__product_cards_ProductCard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_cards_ProductCardLong__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_cards_ProductCardLong___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__product_cards_ProductCardLong__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_cards_ProductCardMobile__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_cards_ProductCardMobile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__product_cards_ProductCardMobile__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductList",

    components: {
        ProductCard: __WEBPACK_IMPORTED_MODULE_1__product_cards_ProductCard___default.a,
        ProductCardLong: __WEBPACK_IMPORTED_MODULE_2__product_cards_ProductCardLong___default.a,
        ProductCardMobile: __WEBPACK_IMPORTED_MODULE_3__product_cards_ProductCardMobile___default.a,
        CatalogBanner: __WEBPACK_IMPORTED_MODULE_0__banner_CatalogBanner___default.a
    },

    props: {
        products: {
            type: Array,
            default: function _default() {
                return [];
            }
        },

        cardType: {
            type: String,
            default: function _default() {
                return 'tile';
            }
        },

        loading: Boolean,

        rowClass: {
            default: ''
        },

        tileCardClass: {
            default: 'col-lg-3'
        },

        listCardClass: {
            default: 'col-12'
        },

        mobileCardClass: {
            default: 'col-12'
        }
    },

    data: function data() {
        return {
            show: !this.loading,
            type: 'long'
        };
    },


    watch: {
        loading: 'onLoadingChange'
    },

    methods: {
        onLoadingChange: function onLoadingChange() {
            var _this = this;

            this.$nextTick(function () {
                _this.show = !_this.loading;
            });
        },
        switchType: function switchType() {
            if (this.type === 'default') {
                this.type = 'long';
            } else {
                this.type = 'default';
            }
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/Checkout.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__panels_CheckoutStepsPanel__ = __webpack_require__("./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__panels_CheckoutStepsPanel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__panels_CheckoutStepsPanel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panels_CheckoutStepsPanelMobile__ = __webpack_require__("./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panels_CheckoutStepsPanelMobile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__panels_CheckoutStepsPanelMobile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__steps_CheckoutStepCart__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__steps_CheckoutStepCart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__steps_CheckoutStepCart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__steps_CheckoutStepShipping__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__steps_CheckoutStepShipping___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__steps_CheckoutStepShipping__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__steps_CheckoutStepPayments__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__steps_CheckoutStepPayments___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__steps_CheckoutStepPayments__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__steps_CheckoutStepConfirmation__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__steps_CheckoutStepConfirmation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__steps_CheckoutStepConfirmation__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Checkout",

    components: {
        CheckoutStepsPanel: __WEBPACK_IMPORTED_MODULE_1__panels_CheckoutStepsPanel___default.a,
        CheckoutStepsPanelMobile: __WEBPACK_IMPORTED_MODULE_2__panels_CheckoutStepsPanelMobile___default.a,
        CheckoutStepCart: __WEBPACK_IMPORTED_MODULE_3__steps_CheckoutStepCart___default.a,
        CheckoutStepShipping: __WEBPACK_IMPORTED_MODULE_4__steps_CheckoutStepShipping___default.a,
        CheckoutStepPayments: __WEBPACK_IMPORTED_MODULE_5__steps_CheckoutStepPayments___default.a,
        CheckoutStepConfirmation: __WEBPACK_IMPORTED_MODULE_6__steps_CheckoutStepConfirmation___default.a
    },

    created: function created() {
        this.$store.dispatch('checkout/init');
        this.$store.dispatch('cart/init');
        this.$store.dispatch('shipping/init');
        this.$store.dispatch('payments/init');
    },


    methods: {
        isActive: function isActive(tab) {
            return tab === this.activeTab;
        },
        getWrapEl: function getWrapEl() {
            return this.$el.querySelector('.js-checkout-wrap');
        },
        beforeLeave: function beforeLeave(el) {
            var wrapEl = this.getWrapEl();
            wrapEl.classList.add('animation-in-process');

            this.$nextTick(function () {
                wrapEl.style.height = el.clientHeight + 'px';
            });
        },
        enter: function enter(el) {
            var wrapEl = this.getWrapEl();

            this.$nextTick(function () {
                wrapEl.style.height = el.clientHeight + 'px';
            });
        },
        afterEnter: function afterEnter() {
            var wrapEl = this.getWrapEl();
            wrapEl.classList.remove('animation-in-process');

            this.$nextTick(function () {
                wrapEl.style.height = 'auto';
            });
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        steps: function steps(state) {
            return state.checkout.steps;
        },
        animationName: function animationName(state) {
            return 'slide-' + state.checkout.direction;
        }
    }), Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        activeTab: 'checkout/activeTab'
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin__ = __webpack_require__("./resources/assets/js/components/shop/checkout/panels/mixin.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStepsPanel",

    props: {
        active: String
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* default */]],

    methods: {
        isActive: function isActive(step) {
            return step.identif === this.activeTab;
        },
        setStep: function setStep(step) {
            this.$store.dispatch('checkout/set', step);
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        activeTab: 'checkout/activeTab'
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin__ = __webpack_require__("./resources/assets/js/components/shop/checkout/panels/mixin.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStepsPanelMobile",

    props: {
        active: String
    },

    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* default */]],

    methods: {
        isActive: function isActive(step) {
            return step.identif === this.activeTab;
        },
        prevStep: function prevStep() {
            if (this.current === 1) {
                window.location.href = '/';
            } else {
                this.$store.dispatch('checkout/prev');
            }
        }
    },

    computed: _extends({
        total: function total() {
            return this.steps.length;
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        current: function current(state) {
            return state.checkout.active + 1;
        }
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStep",

    props: ['title']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CheckoutStep__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CheckoutStep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__CheckoutStep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_Cart__ = __webpack_require__("./resources/assets/js/components/shop/cart/Cart.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_Cart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__cart_Cart__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStepCart",

    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixin__["a" /* default */]],

    components: {
        Cart: __WEBPACK_IMPORTED_MODULE_3__cart_Cart___default.a,
        CheckoutStep: __WEBPACK_IMPORTED_MODULE_2__CheckoutStep___default.a
    },

    methods: {},

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        nextDisabled: 'cart/stepNotDone'
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixin__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CheckoutStep__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CheckoutStep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__CheckoutStep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confirmation_Confirmation__ = __webpack_require__("./resources/assets/js/components/shop/confirmation/Confirmation.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confirmation_Confirmation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__confirmation_Confirmation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buttons_ButtonLoading__ = __webpack_require__("./resources/assets/js/components/buttons/ButtonLoading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buttons_ButtonLoading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__buttons_ButtonLoading__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// todo: Объяснить причину блокировки кнопки пользователю












/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStepPayment",

    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixin__["a" /* default */]],

    components: {
        CheckoutStep: __WEBPACK_IMPORTED_MODULE_4__CheckoutStep___default.a,
        Confirmation: __WEBPACK_IMPORTED_MODULE_5__confirmation_Confirmation___default.a,
        ButtonLoading: __WEBPACK_IMPORTED_MODULE_6__buttons_ButtonLoading___default.a
    },

    data: function data() {
        return {
            loading: false
        };
    },


    methods: {
        submit: function submit() {
            var _this = this;

            if (this.loading) return;

            this.loading = true;

            var state = this.$store.state;

            var data = {
                cart: state.cart.items.reduce(function (acc, item) {
                    acc[item.key] = item.qty;
                    return acc;
                }, {}),
                shipping: {
                    type: state.shipping.type,
                    data: _extends({}, state.shipping.data)
                },
                payment: state.payments.type
            };

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(__WEBPACK_IMPORTED_MODULE_2__scripts_core__["a" /* default */].siteUrl('checkout'), data).then(function (response) {
                window.location.href = __WEBPACK_IMPORTED_MODULE_2__scripts_core__["a" /* default */].siteUrl('checkout/thanks');
            }).catch(function (response) {
                // todo: ДОДЕЛАТЬ!
                alert('Ошибка. Попробуйте позднее.');
                window.location.reload();
                console.log(response);

                _this.loading = false;
            });
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["mapState"])({
        submitDisabled: function submitDisabled(state) {
            return !state.cart.ready || state.cart.loading || state.cart.error || !state.cart.synchronized || !state.shipping.validated;
        }
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CheckoutStep__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CheckoutStep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CheckoutStep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_Payment__ = __webpack_require__("./resources/assets/js/components/shop/payment/Payment.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_Payment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__payment_Payment__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStepPayment",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    components: {
        CheckoutStep: __WEBPACK_IMPORTED_MODULE_1__CheckoutStep___default.a,
        Payment: __WEBPACK_IMPORTED_MODULE_2__payment_Payment___default.a
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/mixin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CheckoutStep__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CheckoutStep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CheckoutStep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shipping_Shipping__ = __webpack_require__("./resources/assets/js/components/shop/shipping/Shipping.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shipping_Shipping___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__shipping_Shipping__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading__ = __webpack_require__("./resources/assets/js/components/buttons/ButtonLoading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: "CheckoutStepShipping",

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixin__["a" /* default */]],

    components: {
        CheckoutStep: __WEBPACK_IMPORTED_MODULE_1__CheckoutStep___default.a,
        Shipping: __WEBPACK_IMPORTED_MODULE_2__shipping_Shipping___default.a,
        ButtonLoading: __WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading___default.a
    },

    data: function data() {
        return {
            nextDisabled: true,
            validationLoading: false
        };
    },
    created: function created() {
        var _this = this;

        this.__validateDebouncer = _.debounce(function () {
            _this.validate();
        }, 300);

        this.validateDebouncer = function () {
            _this.validationLoading = true;
            _this.__validateDebouncer();
        };

        this.unsubscriber = this.$store.subscribe(function (mutation) {
            if (mutation.type === 'shipping/SHIPPING_SET_VALUE') {
                _this.validateDebouncer();
            }
        });
    },
    mounted: function mounted() {
        this.validate(this.$store.state.checkout.direction !== 'back', false);
    },
    beforeDestroy: function beforeDestroy() {
        this.validateDebouncer = null;
        this.__validateDebouncer = null;

        if (_.isFunction(this.unsubscriber)) {
            this.unsubscriber();
        }

        this.unsubscriber = null;
    },


    methods: {
        validate: function validate() {
            var _this2 = this;

            var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var showLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!this.validationLoading && showLoading) {
                this.validationLoading = true;
            }

            this.$refs.shippingComponent.$validator.validateAll(undefined, undefined, silent).then(function (result) {
                _this2.validationLoading = false;
                _this2.nextDisabled = !result;
                _this2.$store.dispatch('shipping/validation', result);
            });
        },
        showValidationErrors: function showValidationErrors() {
            this.validate(false, false);
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/confirmation/Confirmation.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationBlock__ = __webpack_require__("./resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationBlock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ConfirmationBlock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_CartTable__ = __webpack_require__("./resources/assets/js/components/shop/cart/CartTable.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_CartTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__cart_CartTable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LabelValueTable__ = __webpack_require__("./resources/assets/js/components/LabelValueTable.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LabelValueTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__LabelValueTable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_PaymentItemInfo__ = __webpack_require__("./resources/assets/js/components/shop/payment/PaymentItemInfo.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_PaymentItemInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__payment_PaymentItemInfo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Loading__ = __webpack_require__("./resources/assets/js/components/Loading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Loading__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Confirmation",

    components: {
        ConfirmationBlock: __WEBPACK_IMPORTED_MODULE_1__ConfirmationBlock___default.a,
        CartTable: __WEBPACK_IMPORTED_MODULE_2__cart_CartTable___default.a,
        LabelValueTable: __WEBPACK_IMPORTED_MODULE_3__LabelValueTable___default.a,
        PaymentItemInfo: __WEBPACK_IMPORTED_MODULE_4__payment_PaymentItemInfo___default.a,
        Loading: __WEBPACK_IMPORTED_MODULE_5__Loading___default.a
    },

    methods: {
        setStep: function setStep(stepName) {
            this.$store.dispatch('checkout/set', stepName);
        },
        collectLabelData: function collectLabelData() {
            var _this = this;

            var labels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var data = arguments[1];

            return labels.reduce(function (acc, label) {
                acc.push({
                    label: _this.$root.translate('form.fields.' + label),
                    value: data[label]
                    // onEmpty: 'hide'
                });

                return acc;
            }, []);
        },
        dataIsEmpty: function dataIsEmpty(data) {
            for (var i = 0; i < data.length; i++) {
                if (!_.isEmpty(data[i].value)) {
                    return false;
                }
            }

            return true;
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        recipientData: function recipientData(_ref) {
            var shipping = _ref.shipping;

            return this.collectLabelData(['name', 'surname', 'email', 'phone'], shipping.data);
        },
        shippingData: function shippingData(_ref2) {
            var shipping = _ref2.shipping;

            return this.collectLabelData(['city', 'address', 'post_code', 'comment'], shipping.data);
        },
        paymentType: function paymentType(_ref3) {
            var payments = _ref3.payments;

            return payments.type;
        },
        shippingStepDone: function shippingStepDone(_ref4) {
            var shipping = _ref4.shipping;

            return shipping.validated;
        },
        paymentStepDone: function paymentStepDone() {
            return true;
        },
        cartHasError: function cartHasError(_ref5) {
            var cart = _ref5.cart;

            return cart.error;
        },
        cartIsReady: function cartIsReady(_ref6) {
            var cart = _ref6.cart;

            return cart.ready;
        }
    }), Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        cartIsEmpty: 'cart/isEmpty',
        cartStepNotDone: 'cart/stepNotDone'
    }), {
        cartStepDone: function cartStepDone() {
            return !this.cartStepNotDone;
        },
        recipientDataIsEmpty: function recipientDataIsEmpty() {
            for (var i = 0; i < this.recipientData.length; i++) {
                if (!_.isEmpty(this.recipientData[i].value)) {
                    return false;
                }
            }

            return true;
        }
    })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ConfirmationBlock",

    props: ['icon', 'title'],

    methods: {
        change: function change() {
            this.$emit('change');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/payment/Payment.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Payment",

    methods: {
        isActive: function isActive(type) {
            return this.activeType === type;
        },
        setType: function setType(type) {
            this.$store.dispatch('payments/setType', type);
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        types: function types(state) {
            return Object.keys(state.payments.types).reduce(function (acc, key) {
                acc[key] = state.payments.types[key].title;
                return acc;
            }, {});
        },
        activeType: function activeType(state) {
            return state.payments.type;
        }
    }))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/payment/PaymentItemInfo.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader__ = __webpack_require__("./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: "PaymentItemInfo",

    props: {
        'paymentType': String
    },

    components: {
        BackgroundImageLoader: __WEBPACK_IMPORTED_MODULE_1__imageLoaders_BackgroundImageLoader___default.a
    },

    methods: {
        isActive: function isActive(type) {
            return this.activeType === type;
        },
        setType: function setType(type) {
            this.$store.dispatch('payments/setType', type);
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        paymentData: function paymentData(_ref) {
            var payments = _ref.payments;

            return payments.types[this.paymentType];
        }
    }), {
        imageExist: function imageExist() {
            return 'image' in this.paymentData;
        },
        paymentTitle: function paymentTitle() {
            if (this.paymentData.infoTitle) {
                return this.paymentData.infoTitle;
            }

            return this.paymentData.title;
        }
    })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/price/FormattedPrice.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "FormattedPrice",

    props: ['value'],

    computed: {
        formatted: function formatted() {
            var value = this.value.toString().replace(',', '.').replace(/[^0-9]+/g, '');
            return parseFloat(value).toLocaleString() + ' ' + this.$root.mossebo.currency.symbol;
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/product/ProductActions.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductActions",

    mounted: function mounted() {
        this.$root.initTooltips();
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/product/ProductControls.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_multiselect__ = __webpack_require__("./node_modules/vue-multiselect/dist/vue-multiselect.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_multiselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NumControl__ = __webpack_require__("./resources/assets/js/components/NumControl.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NumControl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__NumControl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading__ = __webpack_require__("./resources/assets/js/components/buttons/ButtonLoading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_cart_index__ = __webpack_require__("./resources/assets/js/store/cart/index.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductControls",

    components: {
        MultiSelect: __WEBPACK_IMPORTED_MODULE_1_vue_multiselect___default.a,
        NumControl: __WEBPACK_IMPORTED_MODULE_2__NumControl___default.a,
        ButtonLoading: __WEBPACK_IMPORTED_MODULE_3__buttons_ButtonLoading___default.a
    },

    data: function data() {
        return {
            id: window.product.id,
            selectable: window.product.selectable,
            options: [],
            a: false
        };
    },
    created: function created() {},
    mounted: function mounted() {
        this.initSocials();
        heightToggle('.js-ht-product-info');
    },


    computed: _extends({
        key: function key() {
            return Object(__WEBPACK_IMPORTED_MODULE_4__store_cart_index__["b" /* makeKey */])(this.id, this.options);
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        quantity: function quantity(state) {
            var _this = this;

            var item = state.cart.items.find(function (item) {
                return item.hasKey(_this.key);
            });

            if (item) {
                return item.qty;
            }

            return 0;
        },
        loading: function loading(state) {
            return state.cart.loading;
        }
    })),

    methods: {
        select: function select(attribute) {
            var _this2 = this;

            attribute.error = false;

            this.$nextTick(function () {
                _this2.collectOptions();
            });
        },
        collectOptions: function collectOptions() {
            this.options = this.selectable.reduce(function (acc, item) {
                if (item.value && item.options.find(function (option) {
                    return option.id === item.value.id;
                })) {
                    acc.push(item.value.id);
                }

                return acc;
            }, []);
        },
        addToCart: function addToCart() {
            var _this3 = this;

            var canAdd = true;

            this.selectable = this.selectable.map(function (attribute) {
                if (_this3.attributeHasError(attribute)) {
                    canAdd = false;
                }

                return attribute;
            });

            if (canAdd) {
                this.$store.dispatch('cart/addProduct', [{ id: this.id, options: this.options }, 1]);
            }
        },
        attributeHasError: function attributeHasError(attribute) {
            if (!attribute.need_to_select) return false;

            if (attribute.value && this.options.indexOf(attribute.value.id) !== -1) {
                return false;
            }

            return attribute.error = true;
        },
        setQty: function setQty(qty) {
            this.$store.dispatch('cart/updateProduct', [{ id: this.id, options: this.options }, qty]);
        },
        initSocials: function initSocials() {
            if (window.uSocial) {
                window.uSocial.init();
            }
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/sale/ProductSale.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_core_index__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loading__ = __webpack_require__("./resources/assets/js/components/Loading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Loading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__catalog_product_cards_ProductCardSale__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__catalog_product_cards_ProductCardSale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__catalog_product_cards_ProductCardSale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__banners_BannerHomeStock__ = __webpack_require__("./resources/assets/js/components/banners/BannerHomeStock.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__banners_BannerHomeStock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__banners_BannerHomeStock__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    name: "ProductSale",

    components: {
        ProductCardSale: __WEBPACK_IMPORTED_MODULE_3__catalog_product_cards_ProductCardSale___default.a,
        Loading: __WEBPACK_IMPORTED_MODULE_2__Loading___default.a,
        BannerHomeStock: __WEBPACK_IMPORTED_MODULE_4__banners_BannerHomeStock___default.a
    },

    data: function data() {
        return {
            loading: false,
            error: false,
            product: null,
            saleTime: 0
        };
    },
    created: function created() {
        this.fetchItem();
    },
    beforeDestroy: function beforeDestroy() {
        if (this.requestCanceler) {
            this.requestCanceler.cancel();
            this.requestCanceler = undefined;
        }
    },


    methods: {
        fetchItem: function fetchItem() {
            var _this = this;

            this.loading = true;
            this.requestCanceler = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.CancelToken.source();

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(__WEBPACK_IMPORTED_MODULE_1__scripts_core_index__["a" /* default */].apiUrl('sale'), {
                cancelToken: this.requestCanceler.token
            }).then(function (response) {
                _this.saleTime = parseInt(response.data.sale_time);
                _this.product = response.data.product;
            }).catch(function (e) {
                if (!__WEBPACK_IMPORTED_MODULE_0_axios___default.a.isCancel(e)) {
                    console.log(e);
                    _this.error = true;
                }
            }).finally(function () {
                _this.loading = false;
            });
        }
    },

    computed: {
        small: function small() {
            return this.$root.windowLessThan('sm') || this.$root.windowMoreThan('lg') && this.$root.windowLessThan('xl');
        }
    }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/shipping/Shipping.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_the_mask__ = __webpack_require__("./node_modules/vue-the-mask/dist/vue-the-mask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_the_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_the_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vee_validate__ = __webpack_require__("./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scripts_formSender__ = __webpack_require__("./resources/assets/js/scripts/formSender.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tabs__ = __webpack_require__("./resources/assets/js/components/Tabs.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Tabs__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// todo: Маску телефона поправить (убрать код?)








/* harmony default export */ __webpack_exports__["default"] = ({
    name: "Shipping",

    components: {
        Tabs: __WEBPACK_IMPORTED_MODULE_6__Tabs___default.a,
        TheMask: __WEBPACK_IMPORTED_MODULE_2_vue_the_mask__["TheMask"]
    },

    watch: {
        '$validator.errors.items': 'setErrors'
    },

    created: function created() {
        __WEBPACK_IMPORTED_MODULE_3_vee_validate__["Validator"].localize(__WEBPACK_IMPORTED_MODULE_5__scripts_core__["a" /* default */].getLang());
        this.extendFieldAvailable('email');
        // todo: Добавить форматирование (добавление в начало номера кода страны)
        this.extendFieldAvailable('phone');
    },
    mounted: function mounted() {
        this.FormInputs = new __WEBPACK_IMPORTED_MODULE_4__scripts_formSender__["a" /* FormInputs */](this.$el);
    },
    beforeDestroy: function beforeDestroy() {
        this.FormInputs.destroy();
        this.FormInputs = null;
    },


    methods: {
        setErrors: function setErrors() {
            this.FormInputs.showErrors(this.formErrors.items.reduce(function (acc, item) {
                acc[item.field] = item.msg;

                return acc;
            }, {}));
        },
        input: function input(e) {
            this.setValue(e.target.name.replace('shipping[', '').replace(']', ''), e.target.value);
        },
        setType: function setType(type) {
            this.$store.dispatch('shipping/setType', type);
        },
        setValue: function setValue(name, value) {
            this.$store.dispatch('shipping/setValue', [name, value]);
        },
        extendFieldAvailable: function extendFieldAvailable(fieldName) {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_3_vee_validate__["Validator"].extend(fieldName + '_available', {
                getMessage: function getMessage() {
                    return _this.$root.translate('form.errors.' + fieldName + '_available');
                },
                validate: function validate(value) {
                    return new Promise(function (resolve) {
                        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(__WEBPACK_IMPORTED_MODULE_5__scripts_core__["a" /* default */].siteUrl('checkout/' + fieldName), _defineProperty({}, fieldName, value)).then(function (response) {
                            resolve({ valid: true });
                        }).catch(function (response) {
                            if (response.status === 422) {
                                resolve({
                                    valid: false
                                });
                            }

                            // todo: Ошибка соединения с сервером вызывает провал валидации вместо сообщения об ошибке
                            resolve({
                                valid: false
                            });
                        });
                    });
                }
            });
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["mapState"])({
        data: function data(state) {
            return state.shipping.data;
        },
        shippingTypes: function shippingTypes(state) {
            return state.shipping.types;
        },
        activeShippingType: function activeShippingType(state) {
            return state.shipping.type;
        }
    }))
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57e64c2f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.catalog-product-enter-active[data-v-57e64c2f] {\n  -webkit-transition: opacity .4s;\n  transition: opacity .4s;\n}\n.catalog-product-enter[data-v-57e64c2f],\n.catalog-product-leave-to[data-v-57e64c2f] {\n  opacity: 0;\n}\n", "", {"version":3,"sources":["/Users/Urij/code/mossebo-shop/resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue"],"names":[],"mappings":";AAAA;EACE,gCAAwB;EAAxB,wBAAwB;CAAE;AAE5B;;EAEE,WAAW;CAAE","file":"CatalogProductList.vue","sourcesContent":[".catalog-product-enter-active {\n  transition: opacity .4s; }\n\n.catalog-product-enter,\n.catalog-product-leave-to {\n  opacity: 0; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-00fec501\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/CardTypesChanger.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "card-types-changer" },
    [
      _vm._l(_vm.types, function(data, type) {
        return [
          _c(
            "div",
            {
              key: type,
              class: {
                "card-types-changer__item": true,
                "is-active": _vm.active === type
              },
              attrs: {
                "data-toggle": "tooltip",
                "data-placement": "top",
                title: data.title
              },
              on: {
                click: function($event) {
                  _vm.click(type)
                }
              }
            },
            [
              _c("svg", { staticClass: "card-types-changer__icon" }, [
                _c("use", {
                  attrs: {
                    "xlink:href": "/assets/images/icons.svg#" + data.icon
                  }
                })
              ])
            ]
          )
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-00fec501", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0280c0bc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        class: { "filter-name js-ht-filter": true, "is-active": _vm.expanded }
      },
      [
        _c("span", { staticClass: "filter-name__name" }, [
          _vm._v("\n            " + _vm._s(_vm.title) + "\n        ")
        ]),
        _vm._v(" "),
        _c(
          "svg",
          { staticClass: "filter-name__icon symbol-icon symbol-keyboard-down" },
          [
            _c("use", {
              attrs: {
                "xlink:href": "/assets/images/icons.svg#symbol-keyboard-down"
              }
            })
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "ht-container" }, [
      _c("div", { staticClass: "ht-inner" }, [
        _c(
          "div",
          { class: "filter-desc filter-desc--" + _vm.id },
          [
            _vm._l(_vm.orderedOptions, function(option) {
              return [
                _c("catalog-filter-option", {
                  key: option.id,
                  attrs: {
                    id: option.id,
                    title: option.title,
                    checked: _vm.optionIsChecked(option.id),
                    disabled: _vm.optionIsDisabled(option.id)
                  },
                  on: {
                    click: function($event) {
                      _vm.optionClick(option.id)
                    }
                  }
                })
              ]
            })
          ],
          2
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0280c0bc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-12d313f4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/banners/BannerHomeNew.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("banner", {
    attrs: {
      id: _vm.data.id,
      title: _vm.data.title,
      "button-text": _vm.data["button-text"],
      link: _vm.data.link,
      image: _vm.data.image,
      "gradient-from": _vm.data["gradient-from"],
      "gradient-to": _vm.data["gradient-to"]
    }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-12d313f4", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-16397c24\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "checkout-steps-panel-mobile" }, [
    _c("div", { staticClass: "checkout-steps-panel-mobile__left" }, [
      _c(
        "div",
        { staticClass: "back-link", on: { click: _vm.prevStep } },
        [
          _c("svg", { staticClass: "back-link__icon" }, [
            _c("use", {
              attrs: {
                "xlink:href": "/assets/images/icons.svg#symbol-chevron-left"
              }
            })
          ]),
          _vm._v(" "),
          this.current === 1
            ? [_vm._v("\n                На главную\n            ")]
            : [_vm._v("\n                Назад\n            ")]
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "checkout-steps-panel-mobile__right" }, [
      _vm._v(
        "\n        Шаг  " +
          _vm._s(_vm.current) +
          "  из  " +
          _vm._s(_vm.total) +
          "\n    "
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16397c24", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-18d6f266\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    class: {
      "bg-image-loader": true,
      animate: _vm.animate,
      loaded: _vm.loaded,
      empty: _vm.empty
    },
    style: _vm.style
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-18d6f266", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1f236cb6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/product/CartProductItem.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "cart-product-item": true,
        "cart-product-item--ghost": _vm.isGhost,
        "block-ui": true
      }
    },
    [
      _c(
        "div",
        { staticClass: "cart-product-item__top" },
        [
          _c("product-short-description", {
            attrs: { product: _vm.product, small: _vm.small }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "cart-product-item__bottom" }, [
        _c(
          "div",
          { staticClass: "cart-product-item__num" },
          [
            _vm.noControls
              ? [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.product.quantity) +
                      " шт\n            "
                  )
                ]
              : _c("num-control", {
                  attrs: {
                    number: _vm.product.quantity,
                    classNameModificators: _vm.small ? "small" : "default",
                    min: 1,
                    max: 99
                  },
                  on: { "update:number": _vm.changeQty }
                })
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "cart-product-item__total" },
          [
            _vm.totalPrice
              ? _c("formatted-price", { attrs: { value: _vm.totalPrice } })
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        !_vm.noControls
          ? _c("div", { staticClass: "cart-product-item__trash" }, [
              _c(
                "button",
                {
                  staticClass: "cart-trash-btn cart-table__ghost-focus",
                  on: { click: _vm.remove }
                },
                [
                  _c("svg", { staticClass: "symbol-icon" }, [
                    _c("use", {
                      attrs: {
                        "xlink:href": "/assets/images/icons.svg#symbol-trash"
                      }
                    })
                  ])
                ]
              )
            ])
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1f236cb6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1fb01de6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/Checkout.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "checkout js-checkout" }, [
    _c(
      "div",
      { staticClass: "checkout__steps js-checkout-steps" },
      [
        _vm.$root.isDesktop
          ? [_c("checkout-steps-panel")]
          : [_c("checkout-steps-panel-mobile")]
      ],
      2
    ),
    _vm._v(" "),
    _c("div", { staticClass: "py-3" }),
    _vm._v(" "),
    _c("div", { class: { "block-ui": _vm.$root.isDesktop } }, [
      _c("div", { staticClass: "checkout__wrap js-checkout-wrap" }, [
        _c(
          "div",
          { staticClass: "checkout__content" },
          [
            _c(
              "transition",
              {
                attrs: { name: _vm.animationName },
                on: {
                  "before-leave": _vm.beforeLeave,
                  enter: _vm.enter,
                  "after-enter": _vm.afterEnter
                }
              },
              [
                _vm.isActive("cart")
                  ? _c(
                      "div",
                      { key: "cart", staticClass: "checkout__item" },
                      [_c("checkout-step-cart")],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.isActive("shipping")
                  ? _c(
                      "div",
                      { key: "shipping", staticClass: "checkout__item" },
                      [_c("checkout-step-shipping")],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.isActive("payment")
                  ? _c(
                      "div",
                      { key: "payment", staticClass: "checkout__item" },
                      [_c("checkout-step-payments")],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.isActive("confirmation")
                  ? _c(
                      "div",
                      { key: "confirmation", staticClass: "checkout__item" },
                      [_c("checkout-step-confirmation")],
                      1
                    )
                  : _vm._e()
              ]
            )
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1fb01de6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-23d53014\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Rating.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classNameWithModificators("rating") }, [
    _c("div", { staticClass: "rating__stars" }, [
      _c("div", { staticClass: "rating__icon" }),
      _vm._v(" "),
      _c("div", {
        staticClass: "rating__percent",
        style: { width: _vm.getRatingPercent() + "%" }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "rating__reviews-num" }, [
      _vm._v("\n        " + _vm._s(_vm.getScoresNum()) + "\n    ")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-23d53014", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2e2c68ee\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/NumControl.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classNameWithModificators("num-control") }, [
    _c(
      "button",
      {
        staticClass: "num-control__minus",
        staticStyle: { "z-index": "1" },
        on: {
          mousedown: _vm.minusEventHandle,
          mouseup: _vm.numberFlowStop,
          mouseout: _vm.numberFlowStop
        }
      },
      [
        _c(
          "svg",
          {
            staticClass: "symbol-icon symbol-remove",
            staticStyle: { "z-index": "-1" }
          },
          [
            _c("use", {
              attrs: { "xlink:href": "/assets/images/icons.svg#symbol-remove" }
            })
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c("input", {
      staticClass: "num-control__input js-num-control-input",
      attrs: { type: "text" },
      domProps: { value: _vm.number },
      on: {
        change: _vm.set,
        keydown: _vm.handleInputArrows,
        keyup: _vm.numberFlowStop
      }
    }),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "num-control__plus",
        staticStyle: { "z-index": "1" },
        on: {
          mousedown: function($event) {
            $event.stopPropagation()
            return _vm.plusEventHandle($event)
          },
          mouseup: function($event) {
            $event.stopPropagation()
            return _vm.numberFlowStop($event)
          },
          mouseout: function($event) {
            $event.stopPropagation()
            return _vm.numberFlowStop($event)
          }
        }
      },
      [
        _c(
          "svg",
          {
            staticClass: "symbol-icon symbol-add",
            staticStyle: { "z-index": "-1" }
          },
          [
            _c("use", {
              attrs: { "xlink:href": "/assets/images/icons.svg#symbol-add" }
            })
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2e2c68ee", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-30179e40\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/sale/ProductSale.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "loading",
    { attrs: { loading: _vm.loading } },
    [
      _vm.error
        ? _c("div", [_c("banner-home-stock")], 1)
        : !_vm.product
          ? _c("div", { staticClass: "product-card-sale block-ui" })
          : _c("product-card-sale", {
              attrs: {
                product: _vm.product,
                saleTime: _vm.saleTime,
                small: _vm.small
              }
            })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30179e40", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-303c3bcd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/Cart.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition-group",
    {
      staticClass: "cart-animation-wrap js-cart-wrap",
      attrs: { name: "fade-up", mode: "out-in", tag: "div" },
      on: {
        "before-enter": _vm.beforeEnter,
        "before-leave": _vm.beforeEnter,
        "after-leave": _vm.afterLeave
      }
    },
    [
      _vm.hasError
        ? _c(
            "div",
            { key: "error", staticClass: "cart-animation-wrap__item" },
            [
              _c(
                "div",
                {
                  class: {
                    "cart-error": true,
                    "block-ui": !_vm.$root.isDesktop
                  }
                },
                [
                  _c("h4", [_vm._v("Ошибка соединения с сервером")]),
                  _vm._v(" "),
                  _c("div", { staticClass: "cart-error__buttons" }, [
                    _c(
                      "button",
                      {
                        staticClass: "button button-primary",
                        on: { click: _vm.refresh }
                      },
                      [
                        _vm._v(
                          "\n                    Попробовать еще раз\n                "
                        )
                      ]
                    )
                  ])
                ]
              )
            ]
          )
        : !_vm.isReady || (_vm.isEmpty && _vm.loading)
          ? _c(
              "div",
              { key: "ready", staticClass: "cart-animation-wrap__item" },
              [
                _c("loading", {
                  class: { "block-ui": !_vm.$root.isDesktop },
                  attrs: { loading: true, "no-overlay": true }
                })
              ],
              1
            )
          : _vm.isEmpty
            ? _c(
                "div",
                { key: "empty", staticClass: "cart-animation-wrap__item" },
                [
                  _c(
                    "div",
                    {
                      class: {
                        "cart-empty": true,
                        "block-ui": !_vm.$root.isDesktop
                      }
                    },
                    [_vm._v("\n            Корзина пуста.\n        ")]
                  )
                ]
              )
            : _c(
                "div",
                { key: "list", staticClass: "cart-animation-wrap__item" },
                [
                  _c(
                    "loading",
                    { key: "list", attrs: { loading: _vm.loading$ } },
                    [
                      _c(
                        "div",
                        { staticClass: "cart-page" },
                        [
                          _c(
                            "div",
                            {
                              class: {
                                "block-ui": _vm.$root.windowBetween("md", "lg")
                              }
                            },
                            [_c("cart-table")],
                            1
                          ),
                          _vm._v(" "),
                          _vm.$root.isDesktop
                            ? [
                                _c("div", { staticClass: "cart-page__total" }, [
                                  _c("div", { staticClass: "cart-total" }, [
                                    _c(
                                      "span",
                                      { staticClass: "cart-total__label" },
                                      [
                                        _vm._v(
                                          "\n                                Предварительная цена:\n                            "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "cart-total__value" },
                                      [
                                        _c("formatted-price", {
                                          attrs: { value: _vm.totalPrice }
                                        })
                                      ],
                                      1
                                    )
                                  ])
                                ])
                              ]
                            : [
                                _c(
                                  "h4",
                                  {
                                    staticClass: "cart-page__mobile-total-title"
                                  },
                                  [
                                    _vm._v(
                                      "\n                        Итого\n                    "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "cart-page__mobile-total cart-total-mobile block-ui"
                                  },
                                  [
                                    _c("table", [
                                      _c("tbody", [
                                        _c("tr", [
                                          _c("td", [
                                            _vm._v(
                                              "\n                                    Товаров:\n                                "
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(_vm.productsQuantity) +
                                                "\n                                "
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "td",
                                            [
                                              _c("formatted-price", {
                                                attrs: {
                                                  value: _vm.productsPrice
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ]),
                                        _vm._v(" "),
                                        false
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  "\n                                    Доставка:\n                                "
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td"),
                                              _vm._v(" "),
                                              _c(
                                                "td",
                                                [
                                                  _c("formatted-price", {
                                                    attrs: {
                                                      value: _vm.shippingPrice
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c("tr", [
                                          _c("td", [
                                            _vm._v(
                                              "\n                                    Всего:\n                                "
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td"),
                                          _vm._v(" "),
                                          _c(
                                            "td",
                                            [
                                              _c("formatted-price", {
                                                attrs: { value: _vm.totalPrice }
                                              })
                                            ],
                                            1
                                          )
                                        ])
                                      ])
                                    ])
                                  ]
                                )
                              ]
                        ],
                        2
                      )
                    ]
                  )
                ],
                1
              )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-303c3bcd", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-309ae095\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/ProductList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "loading",
    { attrs: { loading: _vm.loading, "no-overlay": true } },
    [
      _c("catalog-product-list", {
        attrs: {
          products: _vm.products,
          "card-type": _vm.cardType,
          loading: _vm.loading,
          "tile-card-class": "col-lg-4 col-xl-3"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-309ae095", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3373ff55\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Loading.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "loading-wrap": true,
        "loading-wrap--no-overlay": _vm.noOverlay,
        "loading-wrap--no-min-height": _vm.noMinHeight,
        "loading-wrap--sticky": _vm.sticky && _vm.loading,
        loaded: !_vm.loading
      }
    },
    [
      _vm.loading
        ? _c("div", { staticClass: "loading-wrap__spinner" }, [
            _c(
              "svg",
              {
                staticClass: "loading-wrap__icon",
                attrs: {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 100 100",
                  "enable-background": "new 0 0 0 0",
                  "xml:space": "preserve"
                }
              },
              [
                _c(
                  "circle",
                  { attrs: { stroke: "none", cx: "12%", cy: "50%", r: "12%" } },
                  [
                    _c("animate", {
                      attrs: {
                        attributeName: "opacity",
                        dur: "1s",
                        values: "0;1;0",
                        repeatCount: "indefinite",
                        begin: "0.1"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "circle",
                  { attrs: { stroke: "none", cx: "50%", cy: "50%", r: "12%" } },
                  [
                    _c("animate", {
                      attrs: {
                        attributeName: "opacity",
                        dur: "1s",
                        values: "0;1;0",
                        repeatCount: "indefinite",
                        begin: "0.2"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "circle",
                  { attrs: { stroke: "none", cx: "88%", cy: "50%", r: "12%" } },
                  [
                    _c("animate", {
                      attrs: {
                        attributeName: "opacity",
                        dur: "1s",
                        values: "0;1;0",
                        repeatCount: "indefinite",
                        begin: "0.3"
                      }
                    })
                  ]
                )
              ]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "loading-wrap__content" },
        [_vm._t("default")],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3373ff55", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-339b10e1\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "checkout-step",
    { attrs: { title: "Корзина" } },
    [
      _c("cart"),
      _vm._v(" "),
      _c("template", { slot: "back" }, [
        _c("a", { staticClass: "button button-light", attrs: { href: "/" } }, [
          _vm._v("\n            На главную\n        ")
        ])
      ]),
      _vm._v(" "),
      _c("template", { slot: "forward" }, [
        _c(
          "button",
          {
            class: {
              button: true,
              "button-primary": !_vm.nextDisabled,
              "button-light": _vm.nextDisabled
            },
            attrs: { disabled: _vm.nextDisabled },
            on: {
              click: function($event) {
                _vm.toStep("shipping")
              }
            }
          },
          [
            _vm._v("\n            Оформить заказ\n\n            "),
            _c("svg", { staticClass: "button__icon button__icon--right" }, [
              _c("use", {
                attrs: {
                  "xlink:href": "/assets/images/icons.svg#symbol-arrow-forward"
                }
              })
            ])
          ]
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-339b10e1", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-37150a90\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/product/CartProductRow.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      on: {
        "before-leave": _vm.beforeLeave,
        leave: _vm.leave,
        "after-leave": _vm.afterLeave
      }
    },
    [
      _c("tr", { class: { "cart-table__ghost": _vm.isGhost } }, [
        _c(
          "td",
          [
            _c("product-short-description", {
              attrs: { product: _vm.product, small: _vm.small }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("td", [
          _c(
            "span",
            { staticClass: "cart-table__price" },
            [
              _c("formatted-price", {
                staticClass: "cart-table__price",
                attrs: { value: _vm.product.price }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c(
          "td",
          [
            _vm.noControls
              ? [
                  _vm._v(
                    "\n               " +
                      _vm._s(_vm.product.quantity) +
                      " шт\n            "
                  )
                ]
              : _c("num-control", {
                  attrs: {
                    number: _vm.product.quantity,
                    classNameModificators: _vm.small ? "small" : "default",
                    min: 1,
                    max: 99
                  },
                  on: { "update:number": _vm.changeQty }
                })
          ],
          2
        ),
        _vm._v(" "),
        _c("td", [
          _c(
            "span",
            { staticClass: "cart-table__price" },
            [
              _vm.totalPrice
                ? _c("formatted-price", { attrs: { value: _vm.totalPrice } })
                : _vm._e()
            ],
            1
          )
        ]),
        _vm._v(" "),
        !_vm.noControls
          ? _c("td", [
              _c("div", { staticClass: "cart-table__ghost-focus" }, [
                _c(
                  "button",
                  {
                    staticClass: "cart-trash-btn",
                    on: {
                      click: function($event) {
                        _vm.remove()
                      }
                    }
                  },
                  [
                    _c("svg", { staticClass: "symbol-icon" }, [
                      _c("use", {
                        attrs: {
                          "xlink:href": "/assets/images/icons.svg#symbol-trash"
                        }
                      })
                    ])
                  ]
                )
              ])
            ])
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-37150a90", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3dc6dbf5\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/buttons/ButtonLoading.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    _vm.tag,
    {
      tag: "component",
      class: { "button-loading": true, "is-loading": _vm.loading },
      on: { click: _vm.click }
    },
    [
      _c(
        "span",
        { staticClass: "button-loading__content" },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c("svg", { staticClass: "button-loading__loader" }, [
        _c("use", {
          attrs: { "xlink:href": "/assets/images/icons.svg#symbol-spinner" }
        })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3dc6dbf5", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-41702600\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/TabsHtml.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("tabs", {
    attrs: {
      active: _vm.active$,
      tabs: _vm.tabs,
      "class-name-modificators": _vm.classNameModificators
    },
    on: { activation: _vm.activate }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-41702600", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-42336731\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/CartTable.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isTable
    ? _c(
        "table",
        { class: { "cart-table": true, "cart-table--small": _vm.small } },
        [
          !_vm.noHeader
            ? _c("thead", [
                _c("tr", [
                  _c("th", [_vm._v("\n                Товары\n            ")]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v("\n                Цена за шт\n            ")
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v("\n                Количество\n            ")
                  ]),
                  _vm._v(" "),
                  _c("th", [_vm._v("\n                Цена\n            ")]),
                  _vm._v(" "),
                  !_vm.noControls ? _c("th") : _vm._e()
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "tbody",
            [
              _vm._l(_vm.products, function(product) {
                return [
                  _c("cart-product-row", {
                    key: product.key,
                    attrs: {
                      small: _vm.small,
                      product: product,
                      "no-controls": _vm.noControls
                    }
                  })
                ]
              })
            ],
            2
          )
        ]
      )
    : _c(
        "div",
        [
          _vm._l(_vm.products, function(product) {
            return [
              _c("cart-product-item", {
                key: product.key,
                attrs: {
                  small: _vm.small,
                  product: product,
                  "no-controls": _vm.noControls
                }
              })
            ]
          })
        ],
        2
      )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42336731", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-445f48fd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "product-card block-ui block-ui--with-hover" },
    [
      _c(
        "div",
        { staticClass: "product-card__actions text-right" },
        [_c("product-actions")],
        1
      ),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "product-card__link", attrs: { href: _vm.link } },
        [
          _c(
            "div",
            { staticClass: "product-card__image-box" },
            [
              _vm.product.image
                ? [
                    _c("background-image-loader", {
                      staticClass: "product-card__image product-image",
                      attrs: {
                        screen: true,
                        image: _vm.prepareImage(_vm.product.image.src),
                        "retina-image": _vm.prepareImage(
                          _vm.product.image.srcset
                        )
                      }
                    })
                  ]
                : [
                    _c("div", {
                      staticClass: "product-card__image bg-image product-image"
                    })
                  ]
            ],
            2
          ),
          _vm._v(" "),
          _c("div", { staticClass: "product-card__name" }, [
            _vm._v("\n            " + _vm._s(_vm.product.name) + "\n        ")
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "product-card__reviews" }, [_c("rating")], 1),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-card__price" },
        [_c("formatted-price", { attrs: { value: _vm.product.price } })],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-card__old-price" },
        [_c("formatted-price", { attrs: { value: _vm.product.old_price } })],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "product-card__buttons" }, [
        _c(
          "a",
          { staticClass: "button button-light", attrs: { href: _vm.link } },
          [_vm._v("\n            Подробнее\n        ")]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-445f48fd", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-488738dc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/CitiesSelect.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ht-popup-wrap" }, [
    _c(
      "a",
      { staticClass: "location js-ht", attrs: { href: "javascript:void(0);" } },
      [
        _c("div", { staticClass: "location-icon" }, [
          _c("svg", { staticClass: "symbol-icon symbol-location" }, [
            _c("use", {
              attrs: {
                "xlink:href": "/assets/images/icons.svg#symbol-location"
              }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("div", { staticClass: "location-name" }, [
            _vm._v(
              "\n                " +
                _vm._s(_vm.currentCity.name) +
                "\n            "
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "location-phone" }, [
            _vm._v(
              "\n                " +
                _vm._s(_vm.currentCity.phone) +
                "\n            "
            )
          ])
        ]),
        _vm._v(" "),
        _c("svg", { staticClass: "symbol-icon symbol-keyboard-down" }, [
          _c("use", {
            attrs: {
              "xlink:href": "/assets/images/icons.svg#symbol-keyboard-down"
            }
          })
        ])
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "ht-container ht-container--popup ht-container--right" },
      [
        _c(
          "div",
          { staticClass: "ht-inner block-ui" },
          [
            _vm._l(_vm.cities, function(city) {
              return [
                _c(
                  "a",
                  {
                    staticClass: "dropdown-item",
                    attrs: { href: "javascript:void(0);" },
                    on: {
                      click: function($event) {
                        _vm.setCity(city.id)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(city.name) +
                        "\n                "
                    )
                  ]
                )
              ]
            })
          ],
          2
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-488738dc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4a91651e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Timer.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.isDone()
    ? _c("div", { staticClass: "timer" }, [
        _c("div", { staticClass: "timer__container" }, [
          _vm.days > 0
            ? _c("div", { staticClass: "timer__num timer__num--days" }, [
                _c(
                  "span",
                  [
                    _c("animated-symbol-change", {
                      attrs: { value: _vm.prepareNum(_vm.days) }
                    })
                  ],
                  1
                ),
                _vm._v(
                  "\n\n            " +
                    _vm._s(_vm.$root.translate("days.short")) +
                    "\n        "
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "timer__num timer__num--hours" }, [
            _c(
              "span",
              [
                _c("animated-symbol-change", {
                  attrs: { value: _vm.prepareNum(_vm.hours) }
                })
              ],
              1
            ),
            _vm._v(
              "\n\n            " +
                _vm._s(_vm.$root.translate("hours.short")) +
                "\n        "
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "timer__num timer__num--minutes" }, [
            _c(
              "span",
              [
                _c("animated-symbol-change", {
                  attrs: { value: _vm.prepareNum(_vm.minutes) }
                })
              ],
              1
            ),
            _vm._v(
              "\n\n            " +
                _vm._s(_vm.$root.translate("minutes.short")) +
                "\n        "
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "timer__num timer__num--seconds" }, [
            _c(
              "span",
              [
                _c("animated-symbol-change", {
                  attrs: { value: _vm.prepareNum(_vm.seconds) }
                })
              ],
              1
            ),
            _vm._v(
              "\n\n            " +
                _vm._s(_vm.$root.translate("seconds.short")) +
                "\n        "
            )
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4a91651e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4bbcf55c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/payment/PaymentItemInfo.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.paymentData
    ? _c(
        "div",
        { staticClass: "payment-item-info" },
        [
          _vm.imageExist
            ? [
                _c("background-image-loader", {
                  staticClass: "payment-item-info__image",
                  attrs: {
                    image: _vm.paymentData.image.src,
                    retinaImage: _vm.paymentData.image.srcset
                  }
                })
              ]
            : [
                _c("div", { staticClass: "payment-item-info__title" }, [
                  _vm._v(
                    "\n            " + _vm._s(_vm.paymentTitle) + "\n        "
                  )
                ])
              ]
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4bbcf55c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4bef3081\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/Catalog.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "loading",
    { attrs: { loading: _vm.loading } },
    [
      _vm.error
        ? [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.loading,
                    expression: "!loading"
                  }
                ],
                staticStyle: { "text-align": "center" }
              },
              [
                _c("h4", { staticStyle: { "margin-bottom": "30px" } }, [
                  _vm._v(
                    "\n                Произошла ошибка соединения с сервером\n            "
                  )
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "button",
                    {
                      staticClass: "button button-primary",
                      attrs: { type: "button" },
                      on: { click: _vm.refreshCatalog }
                    },
                    [
                      _vm._v(
                        "\n                    Попробовать еще раз\n                "
                      )
                    ]
                  )
                ])
              ]
            )
          ]
        : [
            _c("div", { staticClass: "row align-content-stretch" }, [
              _vm.$root.windowMoreThan("lg")
                ? _c(
                    "div",
                    { staticClass: "col-md-3" },
                    [
                      _c("catalog-filter-list", {
                        ref: "filters",
                        attrs: { filters: _vm.filters, prices: _vm.prices }
                      }),
                      _vm._v(" "),
                      _vm.filters.length > 0
                        ? _c(
                            "div",
                            { staticClass: "catalog-filters-controls" },
                            [
                              _c(
                                "button",
                                {
                                  staticClass: "button button-light",
                                  attrs: {
                                    type: "button",
                                    disabled: !_vm.filtersIsDirty
                                  },
                                  on: { click: _vm.clearFilters }
                                },
                                [
                                  _vm._v(
                                    "\n                        Сбросить фильтры\n                    "
                                  )
                                ]
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.loading
                        ? _c(
                            "div",
                            { staticClass: "catalog-filters-banner" },
                            [_c("banner-random")],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  )
                : _c(
                    "div",
                    { staticClass: "col-12" },
                    [
                      _c("div", { staticClass: "catalog-top-panel block-ui" }, [
                        _c(
                          "div",
                          { staticClass: "catalog-top-panel__sort" },
                          [
                            _c("multi-select", {
                              staticClass: "multiselect--mobile-sort",
                              attrs: {
                                value: _vm.multiselectActiveSortType,
                                options: _vm.multiselectSortOptions,
                                "max-height": 300,
                                placeholder: _vm.$root.translate("Sort"),
                                searchable: false,
                                "hide-selected": false,
                                multiple: false,
                                "allow-empty": false
                              },
                              on: {
                                select: _vm.setActiveSortTypeByMultiselect
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "option",
                                  fn: function(props) {
                                    return [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(props.option.title) +
                                          "\n                            "
                                      )
                                    ]
                                  }
                                },
                                {
                                  key: "singleLabel",
                                  fn: function(props) {
                                    return [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(props.option.title) +
                                          "\n                            "
                                      )
                                    ]
                                  }
                                }
                              ])
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "catalog-top-panel__filter-btn" },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "filters-mobile-btn",
                                on: { click: _vm.openPopup }
                              },
                              [
                                _c(
                                  "svg",
                                  { staticClass: "filters-mobile-btn__icon" },
                                  [
                                    _c("use", {
                                      attrs: {
                                        "xlink:href":
                                          "/assets/images/icons.svg#symbol-filters"
                                      }
                                    })
                                  ]
                                )
                              ]
                            )
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("side-popup", { ref: "popup" }, [
                        _c(
                          "div",
                          [
                            _c("catalog-filter-list", {
                              ref: "filters",
                              attrs: {
                                filters: _vm.filters,
                                prices: _vm.prices
                              }
                            }),
                            _vm._v(" "),
                            _vm.filters.length > 0
                              ? _c(
                                  "div",
                                  { staticClass: "catalog-filters-controls" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "button button-light",
                                        attrs: {
                                          type: "button",
                                          disabled: !_vm.filtersIsDirty
                                        },
                                        on: { click: _vm.clearFilters }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                Сбросить фильтры\n                            "
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ])
                    ],
                    1
                  ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-lg-9" },
                [
                  _vm.productsToShow.length > 0
                    ? [
                        _vm.$root.windowMoreThan("lg")
                          ? _c(
                              "div",
                              { staticClass: "catalog-top-panel block-ui" },
                              [
                                _c(
                                  "div",
                                  { staticClass: "catalog-top-panel__sort" },
                                  [
                                    _c("tabs", {
                                      attrs: {
                                        tabs: _vm.sortTypes,
                                        active: _vm.activeSortType
                                      },
                                      on: { activation: _vm.setActiveSortType }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "catalog-top-panel__card-types"
                                  },
                                  [_c("card-types-changer")],
                                  1
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "loading",
                          {
                            attrs: {
                              loading: _vm.productsLoading.inProcess,
                              sticky: true,
                              "no-overlay": true
                            }
                          },
                          [
                            _c("catalog-product-list", {
                              attrs: {
                                cardType: _vm.activeCardType,
                                products: _vm.productsToShow,
                                loading: _vm.productsLoading.inProcess,
                                "row-class": "row--half",
                                "tile-card-class": "col-lg-4"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.moreBtnIsVisible
                          ? _c(
                              "button-loading",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.productsLoading.inProcess,
                                    expression: "!productsLoading.inProcess"
                                  }
                                ],
                                staticClass:
                                  "catalog-more-btn block-ui js-more-btn",
                                attrs: {
                                  loading: _vm.productsToShowCalculateInProcess
                                }
                              },
                              [
                                _vm._v(
                                  "\n                        Показать еще\n                    "
                                )
                              ]
                            )
                          : _vm._e()
                      ]
                    : !_vm.productsToShowCalculateInProcess &&
                      _vm.productsToShow.length === 0 &&
                      this.products$.length > 0
                      ? [
                          _c(
                            "div",
                            { staticStyle: { "text-align": "center" } },
                            [
                              _c(
                                "h4",
                                { staticStyle: { "margin-bottom": "30px" } },
                                [
                                  _vm._v(
                                    "\n                            В выбранной категории ничего не найдено\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticStyle: { "margin-bottom": "30px" } },
                                [
                                  _vm._v(
                                    "\n                            Попробуйте сбросить один или несколько фильтров.\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", [
                                _c(
                                  "button",
                                  {
                                    staticClass: "button button-primary",
                                    attrs: { type: "button" },
                                    on: { click: _vm.clearFilters }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                Сбросить все фильтры\n                            "
                                    )
                                  ]
                                )
                              ])
                            ]
                          )
                        ]
                      : _vm._e()
                ],
                2
              )
            ])
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4bef3081", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4d0533e6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/shipping/Shipping.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("form", { staticClass: "shipping" }, [
    _c(
      "div",
      { staticClass: "shipping__type d-none" },
      [
        _c("tabs", {
          staticStyle: { "margin-bottom": "-1px" },
          attrs: {
            tabs: _vm.shippingTypes,
            active: _vm.activeShippingType,
            classNameModificators: ["xl", "center", "underline"]
          },
          on: { activation: _vm.setType }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "shipping__form" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-sm-12 col-md-6 col-lg-6" }, [
          _c("div", { staticClass: "form-group js-form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "shipping-name" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$root.translate("form.fields.name")) +
                    "\n                        "
                ),
                _c("span", { staticClass: "form-required" }, [_vm._v("*")])
              ]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required|max:255",
                  expression: "'required|max:255'"
                }
              ],
              staticClass: "form-input",
              attrs: {
                id: "shipping-name",
                type: "text",
                name: "shipping[name]"
              },
              domProps: { value: _vm.data.name },
              on: { input: _vm.input }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12 col-md-6 col-lg-6" }, [
          _c("div", { staticClass: "form-group js-form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "shipping-surname" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$root.translate("form.fields.surname")) +
                    "\n                        "
                ),
                _c("span", { staticClass: "form-required" }, [_vm._v("*")])
              ]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required|max:255",
                  expression: "'required|max:255'"
                }
              ],
              staticClass: "form-input",
              attrs: {
                id: "shipping-surname",
                type: "text",
                name: "shipping[surname]"
              },
              domProps: { value: _vm.data.surname },
              on: { input: _vm.input }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12 col-md-6 col-lg-6" }, [
          _c(
            "div",
            { staticClass: "form-group js-form-group" },
            [
              _c(
                "label",
                { staticClass: "form-label", attrs: { for: "shipping-phone" } },
                [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.$root.translate("form.fields.phone")) +
                      "\n                        "
                  ),
                  _c("span", { staticClass: "form-required" }, [_vm._v("*")])
                ]
              ),
              _vm._v(" "),
              _c("the-mask", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|size:12|phone_available",
                    expression: "'required|size:12|phone_available'"
                  }
                ],
                staticClass: "form-input",
                attrs: {
                  mask: "+7 (###) ###-####",
                  placeholder: "+7 (___) ___-____",
                  id: "shipping-phone",
                  type: "tel",
                  name: "shipping[phone]",
                  value: _vm.data.phone.replace("+7", ""),
                  masked: false
                },
                on: {
                  input: function($event) {
                    _vm.setValue("phone", "+7" + arguments[0])
                  }
                }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12 col-md-6 col-lg-6" }, [
          _c("div", { staticClass: "form-group js-form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "shipping-email" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$root.translate("form.fields.email")) +
                    "\n                        "
                ),
                _c("span", { staticClass: "form-required" }, [_vm._v("*")])
              ]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required|email|min:6|max:255|email_available",
                  expression: "'required|email|min:6|max:255|email_available'"
                }
              ],
              staticClass: "form-input",
              attrs: {
                id: "shipping-email",
                type: "text",
                name: "shipping[email]"
              },
              domProps: { value: _vm.data.email },
              on: { input: _vm.input }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12 col-md-6 col-lg-6" }, [
          _c("div", { staticClass: "form-group js-form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "shipping-city" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$root.translate("form.fields.city")) +
                    "\n                        "
                ),
                _c("span", { staticClass: "form-required" }, [_vm._v("*")])
              ]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required|max:255",
                  expression: "'required|max:255'"
                }
              ],
              staticClass: "form-input",
              attrs: {
                id: "shipping-city",
                type: "text",
                name: "shipping[city]"
              },
              domProps: { value: _vm.data.city },
              on: { input: _vm.input }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12 col-md-6 col-lg-6" }, [
          _c(
            "div",
            { staticClass: "form-group js-form-group" },
            [
              _c(
                "label",
                {
                  staticClass: "form-label",
                  attrs: { for: "shipping-post-code" }
                },
                [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.$root.translate("form.fields.post_code")) +
                      "\n                        "
                  ),
                  _c("span", { staticClass: "form-required" }, [_vm._v("*")])
                ]
              ),
              _vm._v(" "),
              _c("the-mask", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|digits:6",
                    expression: "'required|digits:6'"
                  }
                ],
                staticClass: "form-input",
                attrs: {
                  mask: "### ###",
                  placeholder: "000 000",
                  id: "shipping-post-code",
                  type: "text",
                  name: "shipping[post_code]",
                  value: _vm.data.post_code,
                  masked: false
                },
                on: {
                  input: function($event) {
                    _vm.setValue("post_code", arguments[0])
                  }
                }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12" }, [
          _c("div", { staticClass: "form-group js-form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "shipping-address" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$root.translate("form.fields.address")) +
                    "\n                        "
                ),
                _c("span", { staticClass: "form-required" }, [_vm._v("*")])
              ]
            ),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "required|max:255",
                  expression: "'required|max:255'"
                }
              ],
              staticClass: "form-textarea",
              attrs: { id: "shipping-address", name: "shipping[address]" },
              domProps: { value: _vm.data.address },
              on: { input: _vm.input }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-12" }, [
          _c("div", { staticClass: "form-group js-form-group" }, [
            _c(
              "label",
              { staticClass: "form-label", attrs: { for: "shipping-comment" } },
              [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.$root.translate("form.fields.comment")) +
                    "\n                    "
                )
              ]
            ),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate",
                  value: "max:255",
                  expression: "'max:255'"
                }
              ],
              staticClass: "form-textarea",
              attrs: { id: "shipping-comment", name: "shipping[comment]" },
              domProps: { value: _vm.data.comment },
              on: { input: _vm.input }
            })
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "form-help" }, [
            _vm._v(
              "\n                    " +
                _vm._s(_vm.$root.translate("shipping.comment_help")) +
                "\n                "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "shipping__note" }, [
        _vm._v(
          "\n            " +
            _vm._s(_vm.$root.translate("shipping.note")) +
            "\n        "
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4d0533e6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4e6e2fc0\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/product/ProductActions.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "product-actions" }, [
    _c("div", { staticClass: "product-actions__container" }, [
      _c("div", { staticClass: "product-actions__item" }, [
        _c(
          "a",
          {
            attrs: {
              href: "javascript:void(0);",
              "data-toggle": "tooltip",
              "data-placement": "top",
              title: "Данная функция в разработке"
            }
          },
          [
            _c("svg", { staticClass: "symbol-icon symbol-wishlist" }, [
              _c("use", {
                attrs: {
                  "xlink:href": "/assets/images/icons.svg#symbol-wishlist"
                }
              })
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "product-actions__item" }, [
        _c(
          "a",
          {
            attrs: {
              href: "javascript:void(0);",
              "data-toggle": "tooltip",
              "data-placement": "top",
              title: "Данная функция в разработке"
            }
          },
          [
            _c("svg", { staticClass: "symbol-icon symbol-heart" }, [
              _c("use", {
                attrs: { "xlink:href": "/assets/images/icons.svg#symbol-heart" }
              })
            ])
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4e6e2fc0", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4e83b566\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/ProductShortDescription.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "product-short-description": true,
        "product-short-description--small": _vm.small
      }
    },
    [
      _c(
        "a",
        {
          staticClass: "product-short-description__image-wrap",
          attrs: { href: _vm.link, target: "_blank" },
          on: { mouseover: _vm.mouseover, mouseout: _vm.mouseout }
        },
        [
          _c("background-image-loader", {
            staticClass: "product-short-description__image product-image",
            attrs: {
              image: _vm.prepareImage(_vm.product.image.src),
              "retina-image": _vm.prepareImage(_vm.product.image.srcset)
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "product-short-description__info" }, [
        _vm.product.category
          ? _c("div", { staticClass: "product-short-description__category" }, [
              _vm._v(
                "\n            " + _vm._s(_vm.product.category) + "\n        "
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "product-short-description__title",
            attrs: { href: _vm.link, target: "_blank" },
            on: { mouseover: _vm.mouseover, mouseout: _vm.mouseout }
          },
          [_c("span", [_vm._v(_vm._s(_vm.product.title))])]
        ),
        _vm._v(" "),
        _vm.product.attributes
          ? _c(
              "div",
              { staticClass: "product-short-description__attributes" },
              [
                _vm._v(
                  "\n            " +
                    _vm._s(_vm.product.attributes) +
                    "\n        "
                )
              ]
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4e83b566", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4f8c297f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/CartBtn.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ht-popup-wrap" }, [
    _c(
      "a",
      { staticClass: "cart-btn js-cart-btn", attrs: { href: _vm.btnLink } },
      [
        _c("div", { staticClass: "cart-btn-icon" }, [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.isEmpty,
                  expression: "!isEmpty"
                }
              ],
              staticClass: "badge js-badge"
            },
            [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.productsShortQuantity) +
                  "\n            "
              )
            ]
          ),
          _vm._v(" "),
          _c("svg", { staticClass: "symbol-icon symbol-cart" }, [
            _c("use", {
              attrs: { "xlink:href": "/assets/images/icons.svg#symbol-cart" }
            })
          ])
        ]),
        _vm._v(" "),
        _vm.$root.isDesktop
          ? _c("div", [
              _c("div", { staticClass: "cart-btn-name" }, [
                _vm._v("\n                Корзина\n            ")
              ]),
              _vm._v(" "),
              !_vm.isEmpty
                ? _c("div", { staticClass: "cart-btn-result" }, [
                    _c(
                      "span",
                      { staticClass: "prices" },
                      [
                        _c("formatted-price", {
                          attrs: { value: _vm.productsPrice }
                        })
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("svg", { staticClass: "symbol-icon symbol-keyboard-down" }, [
          _c("use", {
            attrs: {
              "xlink:href": "/assets/images/icons.svg#symbol-keyboard-down"
            }
          })
        ])
      ]
    ),
    _vm._v(" "),
    _vm.isDesktop
      ? _c(
          "div",
          {
            staticClass: "ht-container ht-container--popup ht-container--right"
          },
          [
            _c("div", { staticClass: "ht-inner" }, [
              _c(
                "div",
                {
                  class: { "cart-popup-wrap": !(_vm.isEmpty && !_vm.loading) }
                },
                [
                  _c(
                    "transition",
                    { attrs: { name: "fade", mode: "out-in" } },
                    [
                      _vm.hasError
                        ? _c("div", { staticClass: "cart-error block-ui" }, [
                            _c("h4", [_vm._v("Ошибка соединения с сервером")]),
                            _vm._v(" "),
                            _c("div", { staticClass: "cart-error__buttons" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "button button-primary",
                                  on: { click: _vm.refresh }
                                },
                                [
                                  _vm._v(
                                    "\n                                Попробовать еще раз\n                            "
                                  )
                                ]
                              )
                            ])
                          ])
                        : !_vm.isReady || (_vm.isEmpty && _vm.loading)
                          ? _c("loading", {
                              staticClass: "block-ui",
                              attrs: { loading: true, "no-overlay": true }
                            })
                          : _vm.isEmpty
                            ? _c(
                                "div",
                                { staticClass: "cart-empty block-ui" },
                                [
                                  _vm._v(
                                    "\n                        Корзина пуста.\n                    "
                                  )
                                ]
                              )
                            : _c(
                                "loading",
                                {
                                  key: "list",
                                  attrs: {
                                    loading: _vm.loading$,
                                    "no-min-height": true
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "cart-popup block-ui" },
                                    [
                                      _c(
                                        "scroll-container",
                                        {
                                          staticClass: "cart-popup__products",
                                          attrs: { "max-height": 260 }
                                        },
                                        [
                                          _c("cart-table", {
                                            attrs: {
                                              "no-header": true,
                                              small: true,
                                              "class-name-modificators": "small"
                                            }
                                          })
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "cart-popup__panel" },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "cart-popup__total"
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "cart-total" },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "cart-total__label"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            Итого:\n                                        "
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "cart-total__value"
                                                    },
                                                    [
                                                      _c("formatted-price", {
                                                        attrs: {
                                                          value:
                                                            _vm.productsPrice
                                                        }
                                                      })
                                                    ],
                                                    1
                                                  )
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "cart-popup__submit"
                                            },
                                            [
                                              _c(
                                                "a",
                                                {
                                                  staticClass:
                                                    "button button-primary",
                                                  attrs: {
                                                    href: _vm.linkToCart
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                        Оформить заказ\n\n                                        "
                                                  ),
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "button__icon button__icon--right"
                                                    },
                                                    [
                                                      _c("use", {
                                                        attrs: {
                                                          "xlink:href":
                                                            "/assets/images/icons.svg#symbol-arrow-forward"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ]
                              )
                    ],
                    1
                  )
                ],
                1
              )
            ])
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4f8c297f", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-525dfd50\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "confirmation-block" }, [
    _c("div", { staticClass: "confirmation-block__head" }, [
      _c("svg", { staticClass: "confirmation-block__icon" }, [
        _c("use", {
          attrs: { "xlink:href": "/assets/images/icons.svg#" + _vm.icon }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "confirmation-block__title" }, [
        _vm._v("\n            " + _vm._s(_vm.title) + "\n        ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "confirmation-block__change" }, [
        _c(
          "span",
          {
            staticClass: "link link--dashed link--inverse",
            on: { click: _vm.change }
          },
          [_vm._v("Изменить")]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "confirmation-block__content" },
      [_vm._t("default")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-525dfd50", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5424d202\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cabinet/Cabinet.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "cabinet block-ui" }, [
    _c(
      "div",
      { staticClass: "cabinet__tabs" },
      [_c("tabs", { attrs: { tabs: _vm.pages, active: _vm.activePage } })],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5424d202", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5615b12a\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/banners/Banner.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: "banner banner--" + _vm.id,
      style: { backgroundImage: _vm.gradient }
    },
    [
      _c(
        "div",
        { staticClass: "banner__image-box" },
        [
          _c("background-image-loader", {
            staticClass: "banner__image",
            attrs: { image: _vm.image, screen: true }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "banner__bottom" }, [
        _c("div", {
          staticClass: "banner__title",
          domProps: { innerHTML: _vm._s(_vm.title) }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "banner__button" }, [
          _c(
            "a",
            {
              staticClass: "button button-long button-shadow",
              attrs: {
                href: _vm.preparedLink,
                target: _vm.linkIsOuter ? "_blank" : "_self"
              }
            },
            [
              _vm._v(
                "\n                " + _vm._s(_vm.buttonText) + "\n            "
              )
            ]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5615b12a", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-57e64c2f\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "catalog-product-list" }, [
        _c(
          "div",
          {
            class: ((_obj = {
              row: true,
              "row--half": _vm.cardType === "mobile" || _vm.cardType === "list"
            }),
            (_obj[_vm.rowClass] = true),
            _obj)
          },
          [
            _vm._l(_vm.products, function(product, index) {
              return [
                _c("catalog-banner", {
                  key: index + "banner",
                  attrs: { index: index }
                }),
                _vm._v(" "),
                _vm.cardType === "tile"
                  ? [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.show,
                              expression: "show"
                            }
                          ],
                          key: product.id,
                          class:
                            "catalog-product-list__product " + _vm.tileCardClass
                        },
                        [_c("product-card", { attrs: { product: product } })],
                        1
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.cardType === "list"
                  ? [
                      _c(
                        "div",
                        {
                          key: product.id,
                          class:
                            "catalog-product-list__product " + _vm.listCardClass
                        },
                        [
                          _c("product-card-long", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.show,
                                expression: "show"
                              }
                            ],
                            attrs: { product: product }
                          })
                        ],
                        1
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.cardType === "mobile"
                  ? [
                      _c(
                        "div",
                        {
                          key: product.id,
                          class:
                            "catalog-product-list__product " +
                            _vm.mobileCardClass
                        },
                        [
                          _c("product-card-mobile", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.show,
                                expression: "show"
                              }
                            ],
                            attrs: { product: product }
                          })
                        ],
                        1
                      )
                    ]
                  : _vm._e()
              ]
            })
          ],
          2
        )
      ])
    : _vm._e()
  var _obj
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-57e64c2f", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-58dcdcfc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/banners/BannerHomeStock.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("banner", {
    attrs: {
      id: _vm.data.id,
      title: _vm.data.title,
      link: _vm.data.link,
      image: _vm.data.image
    }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-58dcdcfc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5e155676\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "checkout-step",
    { attrs: { title: "Подтверждение" } },
    [
      _c("confirmation"),
      _vm._v(" "),
      _c("template", { slot: "back" }, [
        _c(
          "button",
          {
            staticClass: "button button-light",
            on: {
              click: function($event) {
                _vm.toStep("payment")
              }
            }
          },
          [
            _c("svg", { staticClass: "button__icon button__icon--left" }, [
              _c("use", {
                attrs: {
                  "xlink:href": "/assets/images/icons.svg#symbol-arrow-back"
                }
              })
            ]),
            _vm._v("\n\n            Назад\n        ")
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "template",
        { slot: "forward" },
        [
          _c(
            "button-loading",
            {
              class: {
                button: true,
                "button-primary": !_vm.submitDisabled,
                "button-light": _vm.submitDisabled
              },
              attrs: { loading: _vm.loading, disabled: _vm.submitDisabled },
              on: { click: _vm.submit }
            },
            [
              _vm._v("\n            Оформить заказ\n\n            "),
              _c("svg", { staticClass: "button__icon button__icon--right" }, [
                _c("use", {
                  attrs: {
                    "xlink:href": "/assets/images/icons.svg#symbol-cart"
                  }
                })
              ])
            ]
          )
        ],
        1
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5e155676", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-60a06077\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("a", { staticClass: "filter-name js-ht-price-filter is-active" }, [
      _vm._v("\n        Цена\n        "),
      _c("svg", { staticClass: "symbol-icon symbol-keyboard-down" }, [
        _c("use", {
          attrs: {
            "xlink:href": "/assets/images/icons.svg#symbol-keyboard-down"
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "ht-container" }, [
      _c("div", { staticClass: "ht-inner" }, [
        _c(
          "div",
          { staticClass: "filter-desc", attrs: { id: "filerCollapsePrice" } },
          [
            _c("div", { staticStyle: { "padding-top": "10px" } }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "prices-slider" },
              [
                _c(
                  "vue-slider",
                  _vm._b(
                    {
                      on: {
                        "drag-end": _vm.sliderValueChanged,
                        click: _vm.sliderValueChanged
                      },
                      model: {
                        value: _vm.priceFilter.value,
                        callback: function($$v) {
                          _vm.$set(_vm.priceFilter, "value", $$v)
                        },
                        expression: "priceFilter.value"
                      }
                    },
                    "vue-slider",
                    _vm.priceFilter,
                    false
                  )
                ),
                _vm._v(" "),
                _c("div", { staticClass: "prices-slider__group" }, [
                  _c("input", {
                    ref: "minPrice",
                    staticClass: "prices-slider__input",
                    attrs: { type: "number" },
                    domProps: { value: _vm.priceFilter.value[0] },
                    on: { change: _vm.inputChange }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "prices-slider__separator" }, [
                    _vm._v("—")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    ref: "maxPrice",
                    staticClass: "prices-slider__input",
                    attrs: { type: "number" },
                    domProps: { value: _vm.priceFilter.value[1] },
                    on: { change: _vm.inputChange }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "prices-slider__tube" }, [
                  _c("div", {
                    staticClass: "prices-slider__empty",
                    style: _vm.emptyLeftStyle
                  }),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "prices-slider__empty",
                    style: _vm.emptyRightStyle
                  }),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "prices-slider__available-process",
                    style: _vm.availableStyle
                  })
                ])
              ],
              1
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60a06077", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-66d38c3c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/AnimatedSymbolChange.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "anim-symbol-change" },
    [
      _vm._l(_vm.value$, function(symbol, index) {
        return [
          _c(
            "transition-group",
            {
              attrs: { name: "anim-symbol-change__anim", tag: "div" },
              on: { enter: _vm.done, leave: _vm.done }
            },
            [
              _c(
                "div",
                { key: index, staticClass: "anim-symbol-change__plug" },
                [_vm._v("0")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  key: symbol + index,
                  staticClass: "anim-symbol-change__symbol"
                },
                [
                  _vm._v(
                    "\n                " + _vm._s(symbol) + "\n            "
                  )
                ]
              )
            ]
          )
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-66d38c3c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6a14bf40\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "catalog-filter block-ui" },
    [
      _vm.prices
        ? _c(
            "div",
            { staticClass: "catalog-filter-item" },
            [
              _c("catalog-filter-price", {
                ref: "filter-price",
                attrs: { name: "price", prices: _vm.prices }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.filters, function(filter, index) {
        return _c(
          "div",
          { key: filter.id, staticClass: "catalog-filter-item" },
          [
            _c("catalog-filter", {
              ref: "filter-" + filter.id,
              refInFor: true,
              attrs: {
                id: filter.id,
                title: filter.title,
                options: filter.options,
                expanded: index < 4
              }
            })
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6a14bf40", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6d3ecd50\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/HeaderBanner.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    { attrs: { href: _vm.link } },
    [
      _c("background-image-loader", {
        key: _vm.$root.isMobile
          ? "header-banner-mobile"
          : "header-banner-desktop",
        staticClass: "header-banner",
        attrs: {
          image: _vm.$root.isMobile ? _vm.mobileImage : _vm.image,
          screen: true
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d3ecd50", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6dbffd05\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/price/FormattedPrice.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return typeof _vm.value !== "undefined"
    ? _c("span", [_vm._v("\n    " + _vm._s(_vm.formatted) + "\n")])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6dbffd05", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-72d24eee\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/SidePopup.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "d-none" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-72d24eee", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-89c0a566\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/ScrollContainer.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "scroll-container",
      style: { "max-height": _vm.maxHeight + "px" }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-89c0a566", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-91cd44ec\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/LabelValueTable.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "label-value-table" },
    [
      _vm._l(_vm.data, function(item) {
        return [
          _vm.isVisible(item)
            ? _c("div", { staticClass: "label-value-table__item" }, [
                _c("div", { staticClass: "label-value-table__label" }, [
                  _vm._v(
                    "\n                " + _vm._s(item.label) + "\n            "
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "label-value-table__value" }, [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.getValue(item)) +
                      "\n            "
                  )
                ])
              ])
            : _vm._e()
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-91cd44ec", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-971a3596\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Tabs.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: _vm.classNameWithModificators("tabs") },
    [
      _vm._l(_vm.tabs, function(title, key) {
        return _c(
          "div",
          {
            key: key,
            class: { tabs__item: true, "is-active": _vm.isActive(key) },
            on: {
              click: function($event) {
                _vm.click(key)
              }
            }
          },
          [_vm._v("\n        " + _vm._s(title) + "\n    ")]
        )
      }),
      _vm._v(" "),
      _vm._m(0)
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tabs__line-tube" }, [
      _c("div", { staticClass: "tabs__line js-sort-line" })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-971a3596", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-9b1995a8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "checkout-steps-panel block-ui" }, [
    _c(
      "div",
      { staticClass: "row" },
      [
        _vm._l(_vm.steps, function(step) {
          return [
            _c(
              "div",
              {
                key: step.identif,
                staticClass: "col-xs-6 col-sm-6 col-md-6 col-lg-3"
              },
              [
                _c(
                  "div",
                  {
                    class: {
                      "checkout-step-badge": true,
                      "is-active": _vm.isActive(step)
                    }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "checkout-step-badge__icon",
                        on: {
                          click: function($event) {
                            _vm.setStep(step.identif)
                          }
                        }
                      },
                      [
                        _c("svg", [
                          _c("use", {
                            attrs: {
                              "xlink:href":
                                "/assets/images/icons.svg#" + step.icon
                            }
                          })
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "checkout-step-badge__info" }, [
                      _c("div", { staticClass: "checkout-step-badge__name" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(step.stepName) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "checkout-step-badge__title" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(step.title) +
                            "\n                        "
                        )
                      ])
                    ])
                  ]
                )
              ]
            )
          ]
        })
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9b1995a8", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-a07dc9ce\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "product-card-long block-ui block-ui--with-hover": true,
        "link-is-hovered": _vm.linkIsHovered
      }
    },
    [
      _c(
        "div",
        { staticClass: "product-card-long__actions text-right" },
        [_c("product-actions")],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "product-card-long__image-box" }, [
        _c(
          "a",
          {
            staticClass: "product-card-long__link",
            attrs: { href: _vm.link },
            on: { mouseenter: _vm.hoverLink, mouseout: _vm.unHoverLink }
          },
          [
            _vm.product.image
              ? [
                  _c("background-image-loader", {
                    staticClass: "product-card-long__image product-image",
                    attrs: {
                      screen: true,
                      image: _vm.prepareImage(_vm.product.image.src),
                      "retina-image": _vm.prepareImage(_vm.product.image.srcset)
                    }
                  })
                ]
              : [
                  _c("div", {
                    staticClass:
                      "product-card-long__image bg-image product-image"
                  })
                ]
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "product-card-long__center" }, [
        _c("div", { staticClass: "product-card-long__name" }, [
          _c(
            "a",
            {
              staticClass: "product-card-long__link",
              attrs: { href: _vm.link },
              on: { mouseenter: _vm.hoverLink, mouseout: _vm.unHoverLink }
            },
            [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.product.name) +
                  "\n            "
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "product-card-long__short-desc" }, [
          _c("div", { staticClass: "product-param" }, [
            _vm._v("\n                Артикул:\n                "),
            _c("span", { staticClass: "product-param__value" }, [
              _vm._v(_vm._s(_vm.product.id))
            ])
          ]),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _vm._m(1)
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "product-card-long__right" }, [
        _c("div", [
          _c(
            "div",
            { staticClass: "product-card-long__price" },
            [_c("formatted-price", { attrs: { value: _vm.product.price } })],
            1
          ),
          _vm._v(" "),
          _vm.product.old_price
            ? _c(
                "div",
                { staticClass: "product-card-long__old-price" },
                [
                  _c("formatted-price", {
                    attrs: { value: _vm.product.old_price }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "product-card-long__rating" },
            [_c("rating")],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "product-card-long__buttons" }, [
          _c(
            "a",
            { staticClass: "button button-light", attrs: { href: _vm.link } },
            [_vm._v("\n                Подробнее\n            ")]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "product-param" }, [
      _vm._v("\n                Наличие:\n                "),
      _c("span", { staticClass: "product-param__value" }, [_vm._v("Под заказ")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "product-param" }, [
      _vm._v("\n                Срок поставки:\n                "),
      _c("span", { staticClass: "product-param__value" }, [_vm._v("14 дней")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a07dc9ce", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-a7a91602\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "product-card-mobile block-ui block-ui--with-hover" },
    [
      _c(
        "div",
        { staticClass: "product-card-mobile__actions text-right" },
        [_c("product-actions")],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "product-card-mobile__image-box" }, [
        _c(
          "a",
          {
            staticClass: "product-card-mobile__link",
            attrs: { href: _vm.link }
          },
          [
            _vm.product.image
              ? [
                  _c("background-image-loader", {
                    staticClass: "product-card-mobile__image product-image",
                    attrs: {
                      screen: true,
                      image: _vm.prepareImage(_vm.product.image.src),
                      "retina-image": _vm.prepareImage(_vm.product.image.srcset)
                    }
                  })
                ]
              : [
                  _c("div", {
                    staticClass:
                      "product-card-mobile__image bg-image product-image"
                  })
                ]
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "product-card-mobile__center" }, [
        _c("div", { staticClass: "product-card-mobile__name" }, [
          _c(
            "a",
            {
              staticClass: "product-card-mobile__link",
              attrs: { href: _vm.link }
            },
            [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.product.name) +
                  "\n            "
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "product-card-mobile__info" }, [
          _c(
            "div",
            { staticClass: "product-card-mobile__rating" },
            [_c("rating", { attrs: { "class-name-modificators": "sm" } })],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "product-card-mobile__prices" }, [
          _c(
            "div",
            { staticClass: "product-card-mobile__price" },
            [_c("formatted-price", { attrs: { value: _vm.product.price } })],
            1
          ),
          _vm._v(" "),
          _vm.product.old_price
            ? _c(
                "div",
                { staticClass: "product-card-mobile__old-price" },
                [
                  _c("formatted-price", {
                    attrs: { value: _vm.product.old_price }
                  })
                ],
                1
              )
            : _vm._e()
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a7a91602", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c2679138\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "product-card-sale block-ui block-ui--with-hover": true,
        "product-card-sale--small": _vm.isSmall
      }
    },
    [
      _c(
        "div",
        { staticClass: "product-card-sale__actions text-right" },
        [_c("product-actions")],
        1
      ),
      _vm._v(" "),
      _vm.isSmall
        ? _c("div", { staticClass: "product-card-sale__timer" }, [
            _c("div", { staticClass: "action-small-timer" }, [
              _c("div", { staticClass: "action-small-timer__label" }, [
                _vm._v("\n                Акция действует\n            ")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "action-small-timer__timer" },
                [_c("timer", { attrs: { time: _vm.saleTime } })],
                1
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.isSmall && _vm.product.images && _vm.product.images.length > 0
        ? _c("div", { staticClass: "product-card-sale__thumbs" }, [
            _c("div", { staticClass: "product-thumbs" }, [
              _c(
                "div",
                { staticClass: "product-thumbs__container" },
                [
                  _vm._l(_vm.images, function(image) {
                    return [
                      _c(
                        "div",
                        { key: image.id, staticClass: "product-thumbs__item" },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "product-thumbs__btn",
                              on: {
                                click: function($event) {
                                  _vm.setImage(image.id)
                                }
                              }
                            },
                            [
                              _c("background-image-loader", {
                                staticClass: "product-thumbs__image",
                                attrs: {
                                  image: _vm.prepareImage(image.thumb.src),
                                  "retina-image": _vm.prepareImage(
                                    image.thumb.srcset
                                  )
                                }
                              })
                            ],
                            1
                          )
                        ]
                      )
                    ]
                  })
                ],
                2
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "product-card-sale__link", attrs: { href: _vm.link } },
        [
          _c(
            "div",
            { staticClass: "product-card-sale__image-box" },
            [
              _vm.image
                ? _c("background-image-loader", {
                    key: _vm.image.id,
                    staticClass: "product-card-sale__image",
                    attrs: {
                      screen: true,
                      image: _vm.prepareImage(_vm.image.small.src),
                      "retina-image": _vm.prepareImage(_vm.image.small.srcset),
                      reset: true
                    }
                  })
                : _c("div", { staticClass: "product-card-sale__image" })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "product-card-sale__name" }, [
            _vm._v("\n            " + _vm._s(_vm.product.name) + "\n        ")
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-card-sale__reviews" },
        [_c("rating")],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "product-card-sale__prices" }, [
        _c(
          "div",
          { staticClass: "product-card-sale__price" },
          [_c("formatted-price", { attrs: { value: _vm.product.price } })],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "product-card-sale__old-price" },
          [_c("formatted-price", { attrs: { value: _vm.product.old_price } })],
          1
        ),
        _vm._v(" "),
        !_vm.isSmall
          ? _c("div", { staticClass: "product-card-sale__timer" }, [
              _c("div", { staticClass: "action-small-timer" }, [
                _c("div", { staticClass: "action-small-timer__label" }, [
                  _vm._v(
                    "\n                    Акция действует\n                "
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "action-small-timer__timer" },
                  [_c("timer", { attrs: { time: _vm.saleTime } })],
                  1
                )
              ])
            ])
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c2679138", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c493efec\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.index === 24
    ? _c(
        "div",
        { staticClass: "col-12" },
        [_c("banner-random", { attrs: { "is-long": "" } })],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c493efec", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-da21edfa\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/product/ProductControls.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "product-controls" }, [
    _vm.selectable.length
      ? _c("div", { staticClass: "product-controls__attributes" }, [
          _c("div", { staticClass: "product-controls-attributes" }, [
            _c(
              "div",
              { staticClass: "row" },
              [
                _vm._l(_vm.selectable, function(attribute) {
                  return [
                    _c(
                      "div",
                      { staticClass: "col-12 col-sm-6 col-lg-6" },
                      [
                        _c("multi-select", {
                          class: { "has-error": attribute.error },
                          attrs: {
                            options: attribute.options,
                            "max-height": 300,
                            placeholder: attribute.title,
                            searchable: false,
                            "hide-selected": false,
                            multiple: false,
                            "allow-empty": true
                          },
                          on: {
                            select: function($event) {
                              _vm.select(attribute)
                            },
                            remove: function($event) {
                              _vm.select(attribute)
                            }
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "option",
                              fn: function(props) {
                                return [
                                  _c(
                                    "div",
                                    {
                                      class:
                                        "attribute-option attribute-option--" +
                                        props.option.id
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(props.option.title) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ]
                              }
                            },
                            {
                              key: "singleLabel",
                              fn: function(props) {
                                return [
                                  _c(
                                    "div",
                                    {
                                      class:
                                        "attribute-option attribute-option--" +
                                        props.option.id
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(props.option.title) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ]
                              }
                            }
                          ]),
                          model: {
                            value: attribute.value,
                            callback: function($$v) {
                              _vm.$set(attribute, "value", $$v)
                            },
                            expression: "attribute.value"
                          }
                        })
                      ],
                      1
                    )
                  ]
                })
              ],
              2
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "product-controls__buttons" }, [
      _c("div", { staticClass: "row row--half" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-sm-6 col-md-12 col-xl-6" },
          [
            _vm.quantity === 0
              ? [
                  _c(
                    "button-loading",
                    {
                      staticClass:
                        "product-controls__button button button-long button-dark",
                      attrs: { loading: _vm.loading },
                      on: { click: _vm.addToCart }
                    },
                    [
                      _vm._v(
                        "\n                        Добавить в корзину\n                    "
                      )
                    ]
                  )
                ]
              : [
                  _c(
                    "button-loading",
                    {
                      staticClass:
                        "product-controls__button product-controls__button--num button button-long button-dark",
                      attrs: { tag: "div", loading: _vm.loading }
                    },
                    [
                      _c("num-control", {
                        attrs: {
                          number: _vm.quantity,
                          min: 1,
                          max: 99,
                          classNameModificators: ["large", "product"]
                        },
                        on: { "update:number": _vm.setQty }
                      })
                    ],
                    1
                  )
                ]
          ],
          2
        )
      ])
    ]),
    _vm._v(" "),
    _vm._m(1)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-6 col-md-12 col-xl-6" }, [
      _c(
        "button",
        {
          staticClass:
            "product-controls__button button button-long button-primary",
          attrs: { type: "button" }
        },
        [_vm._v("\n                    Купить в 1 клик\n                ")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "product-page__socials" }, [
      _c("div", { staticClass: "product-socials" }, [
        _c("div", { staticClass: "product-socials__label" }, [
          _vm._v("\n                Расскажите друзьям:\n            ")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "product-socials__socials" }, [
          _c("div", {
            staticClass: "uSocial-Share",
            attrs: {
              "data-pid": "7dcb3e6a17ce539277db2193d1b2a7da",
              "data-type": "share",
              "data-options":
                "round,style1,default,absolute,horizontal,size32,counter0",
              "data-social": "vk,ok,fb,pinterest,twi,telegram",
              "data-mobile": "vi,wa,sms"
            }
          })
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-da21edfa", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e3708022\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "checkout-step",
    { attrs: { title: "Доставка" } },
    [
      _c("shipping", {
        ref: "shippingComponent",
        class: { "block-ui": !_vm.$root.isDesktop }
      }),
      _vm._v(" "),
      _c("template", { slot: "back" }, [
        _c(
          "button",
          {
            staticClass: "button button-light",
            on: {
              click: function($event) {
                _vm.toStep("cart")
              }
            }
          },
          [
            _c("svg", { staticClass: "button__icon button__icon--left" }, [
              _c("use", {
                attrs: {
                  "xlink:href": "/assets/images/icons.svg#symbol-arrow-back"
                }
              })
            ]),
            _vm._v("\n\n            Назад\n        ")
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "template",
        { slot: "forward" },
        [
          _vm.nextDisabled
            ? [
                _c(
                  "button-loading",
                  {
                    staticClass: "button button-light",
                    attrs: {
                      loading: _vm.validationLoading,
                      disabled: _vm.validationLoading
                    },
                    on: { click: _vm.showValidationErrors }
                  },
                  [
                    _vm._v(
                      "\n                Перейти к оплате\n\n                "
                    ),
                    _c(
                      "svg",
                      { staticClass: "button__icon button__icon--right" },
                      [
                        _c("use", {
                          attrs: {
                            "xlink:href":
                              "/assets/images/icons.svg#symbol-arrow-forward"
                          }
                        })
                      ]
                    )
                  ]
                )
              ]
            : [
                _c(
                  "button-loading",
                  {
                    staticClass: "button button-primary",
                    attrs: {
                      loading: _vm.validationLoading,
                      disabled: _vm.validationLoading
                    },
                    on: {
                      click: function($event) {
                        _vm.toStep("payment")
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                Перейти к оплате\n\n                "
                    ),
                    _c(
                      "svg",
                      { staticClass: "button__icon button__icon--right" },
                      [
                        _c("use", {
                          attrs: {
                            "xlink:href":
                              "/assets/images/icons.svg#symbol-arrow-forward"
                          }
                        })
                      ]
                    )
                  ]
                )
              ]
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e3708022", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ec80cb4a\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/payment/Payment.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "payment-page" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "payment-page__content" }, [
      _c("div", { staticClass: "payment-page__choose" }, [
        _c(
          "div",
          { staticClass: "row" },
          [
            _vm._l(_vm.types, function(title, type) {
              return [
                _c(
                  "div",
                  { staticClass: "payment-page__option col-sm-12 col-md-6" },
                  [
                    _c("input", {
                      staticStyle: { display: "none" },
                      attrs: {
                        type: "radio",
                        name: "payment",
                        id: "payment-" + type
                      },
                      domProps: { checked: _vm.isActive(type) }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "huge-radio",
                        attrs: { for: "payment-" + type },
                        on: {
                          click: function($event) {
                            _vm.setType(type)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(title) +
                            "\n                        "
                        )
                      ]
                    )
                  ]
                )
              ]
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "payment-page__info" }, [
        _vm._v(
          "\n            Ссылку на оплату пришлет менеджер после подтверждения заказа.\n        "
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "payment-page__top" }, [
      _c("span", [_vm._v("Выберете способ оплаты")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ec80cb4a", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ed17cc24\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "checkout-step",
    { attrs: { title: "Оплата" } },
    [
      _c("payment"),
      _vm._v(" "),
      _c("template", { slot: "back" }, [
        _c(
          "button",
          {
            staticClass: "button button-light",
            on: {
              click: function($event) {
                _vm.toStep("shipping")
              }
            }
          },
          [
            _c("svg", { staticClass: "button__icon button__icon--left" }, [
              _c("use", {
                attrs: {
                  "xlink:href": "/assets/images/icons.svg#symbol-arrow-back"
                }
              })
            ]),
            _vm._v("\n\n            Назад\n        ")
          ]
        )
      ]),
      _vm._v(" "),
      _c("template", { slot: "forward" }, [
        _c(
          "button",
          {
            staticClass: "button button-primary",
            on: {
              click: function($event) {
                _vm.toStep("confirmation")
              }
            }
          },
          [
            _vm._v("\n            Подтвердить заказ\n\n            "),
            _c("svg", { staticClass: "button__icon button__icon--right" }, [
              _c("use", {
                attrs: {
                  "xlink:href": "/assets/images/icons.svg#symbol-arrow-forward"
                }
              })
            ])
          ]
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ed17cc24", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-f01daa26\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/confirmation/Confirmation.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "confirmation-page" }, [
    _c(
      "div",
      { staticClass: "confirmation-page__content" },
      [
        _c(
          "confirmation-block",
          {
            class: {
              "block-ui": !_vm.$root.isDesktop,
              success: _vm.cartStepDone,
              "has-error": !_vm.cartStepDone
            },
            attrs: { icon: "symbol-cart", title: "Корзина" },
            on: {
              change: function($event) {
                _vm.setStep("cart")
              }
            }
          },
          [
            _c(
              "transition",
              { attrs: { name: "fade", mode: "out-in" } },
              [
                _vm.cartHasError
                  ? _c("div", { key: "error" }, [
                      _c(
                        "div",
                        {
                          class: {
                            "cart-error": true,
                            "block-ui": !_vm.$root.isDesktop
                          }
                        },
                        [
                          _c("h4", [_vm._v("Ошибка соединения с сервером")]),
                          _vm._v(" "),
                          _c("div", { staticClass: "cart-error__buttons" }, [
                            _c(
                              "button",
                              {
                                staticClass: "button button-primary",
                                on: { click: _vm.refresh }
                              },
                              [
                                _vm._v(
                                  "\n                                Попробовать еще раз\n                            "
                                )
                              ]
                            )
                          ])
                        ]
                      )
                    ])
                  : !_vm.cartIsReady
                    ? _c(
                        "div",
                        { key: "ready" },
                        [
                          _c("loading", {
                            class: { "block-ui": !_vm.$root.isDesktop },
                            attrs: { loading: true, "no-overlay": true }
                          })
                        ],
                        1
                      )
                    : _vm.cartIsEmpty
                      ? _c("div", { key: "empty" }, [
                          _c(
                            "div",
                            {
                              class: {
                                "cart-empty": true,
                                "block-ui": !_vm.$root.isDesktop
                              }
                            },
                            [
                              _vm._v(
                                "\n                        Корзина пуста.\n                    "
                              )
                            ]
                          )
                        ])
                      : _c("cart-table", {
                          attrs: {
                            small: true,
                            "no-header": true,
                            "no-controls": true
                          }
                        })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "confirmation-block",
          {
            class: {
              "block-ui": !_vm.$root.isDesktop,
              success: _vm.shippingStepDone,
              "has-error": !_vm.shippingStepDone
            },
            attrs: { icon: "symbol-person", title: "Получатель" },
            on: {
              change: function($event) {
                _vm.setStep("shipping")
              }
            }
          },
          [
            _c(
              "div",
              { staticClass: "confirmation-content-wrap" },
              [
                _vm.dataIsEmpty(_vm.recipientData)
                  ? _c("div", { staticClass: "confirmation-empty" }, [
                      _vm._v(
                        "\n                    Не заполнено.\n                "
                      )
                    ])
                  : _c("label-value-table", {
                      attrs: { data: _vm.recipientData }
                    })
              ],
              1
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "confirmation-block",
          {
            class: {
              "block-ui": !_vm.$root.isDesktop,
              success: _vm.shippingStepDone,
              "has-error": !_vm.shippingStepDone
            },
            attrs: { icon: "symbol-truck", title: "Адрес доставки" },
            on: {
              change: function($event) {
                _vm.setStep("shipping")
              }
            }
          },
          [
            _c(
              "div",
              { staticClass: "confirmation-content-wrap" },
              [
                _vm.dataIsEmpty(_vm.shippingData)
                  ? _c("div", { staticClass: "confirmation-empty" }, [
                      _vm._v(
                        "\n                    Не заполнено.\n                "
                      )
                    ])
                  : _c("label-value-table", {
                      attrs: { data: _vm.shippingData }
                    })
              ],
              1
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "confirmation-block",
          {
            class: {
              "block-ui": !_vm.$root.isDesktop,
              success: _vm.paymentStepDone,
              "has-error": !_vm.paymentStepDone
            },
            attrs: { icon: "symbol-credit-card", title: "Оплата" },
            on: {
              change: function($event) {
                _vm.setStep("payment")
              }
            }
          },
          [
            _c(
              "div",
              { staticClass: "confirmation-content-wrap" },
              [
                _c("payment-item-info", {
                  attrs: { "payment-type": _vm.paymentType }
                })
              ],
              1
            )
          ]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f01daa26", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-fa20a3be\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "checkout-step" }, [
    _vm.title
      ? _c("h2", { staticClass: "checkout-step__title" }, [
          _vm._v("\n        " + _vm._s(_vm.title) + "\n    ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "checkout-step__content" },
      [_vm._t("default")],
      2
    ),
    _vm._v(" "),
    _c("div", { staticClass: "checkout-step__controls-wrap" }, [
      _c("div", { staticClass: "checkout-step__controls" }, [
        _c("div", { staticClass: "checkout-step__back" }, [_vm._t("back")], 2),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "checkout-step__forward" },
          [_vm._t("forward")],
          2
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fa20a3be", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-multiselect/dist/vue-multiselect.min.js":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueMultiselect=e():t.VueMultiselect=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=66)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(12)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(10),r=n(43),o=n(31),s=Object.defineProperty;e.f=n(1)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var i=n(77),r=n(21);t.exports=function(t){return i(r(t))}},function(t,e,n){var i=n(9),r=n(52),o=n(18),s=n(55),u=n(53),a=function(t,e,n){var l,c,f,p,h=t&a.F,d=t&a.G,v=t&a.S,y=t&a.P,g=t&a.B,b=d?i:v?i[e]||(i[e]={}):(i[e]||{}).prototype,m=d?r:r[e]||(r[e]={}),_=m.prototype||(m.prototype={});d&&(n=e);for(l in n)c=!h&&b&&void 0!==b[l],f=(c?b:n)[l],p=g&&c?u(f,i):y&&"function"==typeof f?u(Function.call,f):f,b&&s(b,l,f,t&a.U),m[l]!=f&&o(m,l,p),y&&_[l]!=f&&(_[l]=f)};i.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var i=n(3),r=n(15);t.exports=n(1)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var i=n(29)("wks"),r=n(16),o=n(0).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(13);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(48),r=n(22);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var i=n(109),r=n(110);t.exports=n(35)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(8);t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(0),r=n(11),o=n(74),s=n(6),u=function(t,e,n){var a,l,c,f=t&u.F,p=t&u.G,h=t&u.S,d=t&u.P,v=t&u.B,y=t&u.W,g=p?r:r[e]||(r[e]={}),b=g.prototype,m=p?i:h?i[e]:(i[e]||{}).prototype;p&&(n=e);for(a in n)(l=!f&&m&&void 0!==m[a])&&a in g||(c=l?m[a]:n[a],g[a]=p&&"function"!=typeof m[a]?n[a]:v&&l?o(c,i):y&&m[a]==c?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(c):d&&"function"==typeof c?o(Function.call,c):c,d&&((g.virtual||(g.virtual={}))[a]=c,t&u.R&&b&&!b[a]&&s(b,a,c)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var i=n(3).f,r=n(2),o=n(7)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(29)("keys"),r=n(16);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(0),r=i["__core-js_shared__"]||(i["__core-js_shared__"]={});t.exports=function(t){return r[t]||(r[t]={})}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(13);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var i=n(0),r=n(11),o=n(25),s=n(33),u=n(3).f;t.exports=function(t){var e=r.Symbol||(r.Symbol=o?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||u(e,t,{value:s.f(t)})}},function(t,e,n){e.f=n(7)},function(t,e,n){var i=n(53),r=n(36),o=n(57),s=n(37),u=n(104);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||u;return function(e,u,d){for(var v,y,g=o(e),b=r(g),m=i(u,d,3),_=s(b.length),x=0,w=n?h(e,_):a?h(e,0):void 0;_>x;x++)if((p||x in b)&&(v=b[x],y=m(v,x,g),t))if(n)w[x]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:w.push(v)}else if(c)return!1;return f?-1:l||c?c:w}}},function(t,e,n){t.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(51);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e,n){var i=n(56),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(111)("wks"),r=n(58),o=n(9).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i},function(t,e,n){"use strict";function i(t){return 0!==t&&(!(!Array.isArray(t)||0!==t.length)||!t)}function r(t){return function(){return!t.apply(void 0,arguments)}}function o(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}function s(t,e,n,i){return t.filter(function(t){return o(i(t,n),e)})}function u(t){return t.filter(function(t){return!t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function l(t,e,n,i,r){return function(o){return o.map(function(o){var u;if(!o[n])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var a=s(o[n],t,e,r);return a.length?(u={},v()(u,i,o[i]),v()(u,n,a),u):[]})}}var c=n(65),f=n.n(c),p=n(59),h=(n.n(p),n(122)),d=(n.n(h),n(64)),v=n.n(d),y=n(120),g=(n.n(y),n(121)),b=(n.n(g),n(117)),m=(n.n(b),n(123)),_=(n.n(m),n(118)),x=(n.n(_),n(119)),w=(n.n(x),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return{search:"",isOpen:!1,prefferedOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return[]}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){this.multiple||this.clearOnSelect||console.warn("[Vue-Multiselect warn]: ClearOnSelect and Multiple props can’t be both set to false."),!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):s(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(r(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null))},search:function(){this.$emit("search-change",this.search,this.id)}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return w(l(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return w(a(this.groupValues,this.groupLabel),u)(t)},updateSearch:function(t){this.search=t},isExistingOption:function(t){return!!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},getOptionLabel:function(t){if(i(t))return"";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)return void this.selectGroup(t);if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return-1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id)}else{var o=n[this.groupValues].filter(r(this.isSelected));this.$emit("select",o,this.id),this.$emit("input",this.internalValue.concat(o),this.id)}},wholeGroupSelected:function(t){return t[this.groupValues].every(this.isSelected)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var n="object"===f()(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var i=this.internalValue.slice(0,n).concat(this.internalValue.slice(n+1));this.$emit("input",i,this.id)}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate()}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle:function(){this.isOpen?this.deactivate():this.activate()},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.prefferedOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.prefferedOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight))}}}}},function(t,e,n){"use strict";var i=n(59);n.n(i);e.a={data:function(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust()},isOpen:function(){this.pointerDirty=!1}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return["multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return[this.groupSelect?"multiselect__option--group":"multiselect__option--disabled",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0}}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var i=n(13),r=n(0).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e,n){t.exports=!n(1)&&!n(12)(function(){return 7!=Object.defineProperty(n(42)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var i=n(25),r=n(23),o=n(49),s=n(6),u=n(2),a=n(24),l=n(79),c=n(27),f=n(86),p=n(7)("iterator"),h=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,v,y,g,b){l(n,e,v);var m,_,x,w=function(t){if(!h&&t in P)return P[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",O="values"==y,L=!1,P=t.prototype,k=P[p]||P["@@iterator"]||y&&P[y],E=k||w(y),j=y?O?w("entries"):E:void 0,V="Array"==e?P.entries||k:k;if(V&&(x=f(V.call(new t)))!==Object.prototype&&(c(x,S,!0),i||u(x,p)||s(x,p,d)),O&&k&&"values"!==k.name&&(L=!0,E=function(){return k.call(this)}),i&&!b||!h&&!L&&P[p]||s(P,p,E),a[e]=E,a[S]=d,y)if(m={values:O?E:w("values"),keys:g?E:w("keys"),entries:j},b)for(_ in m)_ in P||o(P,_,m[_]);else r(r.P+r.F*(h||L),e,m);return m}},function(t,e,n){var i=n(10),r=n(83),o=n(22),s=n(28)("IE_PROTO"),u=function(){},a=function(){var t,e=n(42)("iframe"),i=o.length;for(e.style.display="none",n(76).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;i--;)delete a.prototype[o[i]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=i(t),n=new u,u.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(48),r=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var i=n(2),r=n(4),o=n(73)(!1),s=n(28)("IE_PROTO");t.exports=function(t,e){var n,u=r(t),a=0,l=[];for(n in u)n!=s&&i(u,n)&&l.push(n);for(;e.length>a;)i(u,n=e[a++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(6)},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(50);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var i=n(51);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){var i=n(9),r=n(18),o=n(107),s=n(58)("src"),u=Function.toString,a=(""+u).split("toString");n(52).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var l="function"==typeof n;l&&(o(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(o(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===i?t[e]=n:u?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||u.call(this)})},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(17);t.exports=function(t){return Object(i(t))}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(5),r=n(34)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(99)("find")},function(t,e,n){"use strict";function i(t){n(124)}var r=n(67),o=n(126),s=n(125),u=i,a=s(r.a,o.a,!1,u,null,null);e.a=a.exports},function(t,e,n){t.exports=n(68)},function(t,e,n){t.exports=n(69)},function(t,e,n){t.exports=n(70)},function(t,e,n){function i(t,e,n){return e in t?r(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=n(61);t.exports=i},function(t,e,n){function i(t){return(i="function"==typeof s&&"symbol"==typeof o?function(t){return typeof t}:function(t){return t&&"function"==typeof s&&t.constructor===s&&t!==s.prototype?"symbol":typeof t})(t)}function r(e){return"function"==typeof s&&"symbol"===i(o)?t.exports=r=function(t){return i(t)}:t.exports=r=function(t){return t&&"function"==typeof s&&t.constructor===s&&t!==s.prototype?"symbol":i(t)},r(e)}var o=n(63),s=n(62);t.exports=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(60),r=n(39),o=n(40);n.d(e,"Multiselect",function(){return i.a}),n.d(e,"multiselectMixin",function(){return r.a}),n.d(e,"pointerMixin",function(){return o.a}),e.default=i.a},function(t,e,n){"use strict";var i=n(39),r=n(40);e.a={name:"vue-multiselect",mixins:[i.a,r.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return"and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return this.singleValue&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"auto"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.prefferedOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}}},function(t,e,n){n(92);var i=n(11).Object;t.exports=function(t,e,n){return i.defineProperty(t,e,n)}},function(t,e,n){n(95),n(93),n(96),n(97),t.exports=n(11).Symbol},function(t,e,n){n(94),n(98),t.exports=n(33).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var i=n(4),r=n(89),o=n(88);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return!0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(71);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var i=n(14),r=n(47),o=n(26);t.exports=function(t){var e=i(t),n=r.f;if(n)for(var s,u=n(t),a=o.f,l=0;u.length>l;)a.call(t,s=u[l++])&&e.push(s);return e}},function(t,e,n){t.exports=n(0).document&&document.documentElement},function(t,e,n){var i=n(41);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e,n){var i=n(41);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";var i=n(45),r=n(15),o=n(27),s={};n(6)(s,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(14),r=n(4);t.exports=function(t,e){for(var n,o=r(t),s=i(o),u=s.length,a=0;u>a;)if(o[n=s[a++]]===e)return n}},function(t,e,n){var i=n(16)("meta"),r=n(13),o=n(2),s=n(3).f,u=0,a=Object.isExtensible||function(){return!0},l=!n(12)(function(){return a(Object.preventExtensions({}))}),c=function(t){s(t,i,{value:{i:"O"+ ++u,w:{}}})},f=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,i)){if(!a(t))return"F";if(!e)return"E";c(t)}return t[i].i},p=function(t,e){if(!o(t,i)){if(!a(t))return!0;if(!e)return!1;c(t)}return t[i].w},h=function(t){return l&&d.NEED&&a(t)&&!o(t,i)&&c(t),t},d=t.exports={KEY:i,NEED:!1,fastKey:f,getWeak:p,onFreeze:h}},function(t,e,n){var i=n(3),r=n(10),o=n(14);t.exports=n(1)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),u=s.length,a=0;u>a;)i.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var i=n(26),r=n(15),o=n(4),s=n(31),u=n(2),a=n(43),l=Object.getOwnPropertyDescriptor;e.f=n(1)?l:function(t,e){if(t=o(t),e=s(e,!0),a)try{return l(t,e)}catch(t){}if(u(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(4),r=n(46).f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(t){try{return r(t)}catch(t){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==o.call(t)?u(t):r(i(t))}},function(t,e,n){var i=n(2),r=n(90),o=n(28)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){var i=n(30),r=n(21);t.exports=function(t){return function(e,n){var o,s,u=String(r(e)),a=i(n),l=u.length;return a<0||a>=l?t?"":void 0:(o=u.charCodeAt(a),o<55296||o>56319||a+1===l||(s=u.charCodeAt(a+1))<56320||s>57343?t?u.charAt(a):o:t?u.slice(a,a+2):s-56320+(o-55296<<10)+65536)}}},function(t,e,n){var i=n(30),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(30),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(21);t.exports=function(t){return Object(i(t))}},function(t,e,n){"use strict";var i=n(72),r=n(80),o=n(24),s=n(4);t.exports=n(44)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){var i=n(23);i(i.S+i.F*!n(1),"Object",{defineProperty:n(3).f})},function(t,e){},function(t,e,n){"use strict";var i=n(87)(!0);n(44)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var i=n(0),r=n(2),o=n(1),s=n(23),u=n(49),a=n(82).KEY,l=n(12),c=n(29),f=n(27),p=n(16),h=n(7),d=n(33),v=n(32),y=n(81),g=n(75),b=n(78),m=n(10),_=n(4),x=n(31),w=n(15),S=n(45),O=n(85),L=n(84),P=n(3),k=n(14),E=L.f,j=P.f,V=O.f,C=i.Symbol,T=i.JSON,A=T&&T.stringify,$=h("_hidden"),D=h("toPrimitive"),F={}.propertyIsEnumerable,M=c("symbol-registry"),B=c("symbols"),N=c("op-symbols"),R=Object.prototype,H="function"==typeof C,G=i.QObject,I=!G||!G.prototype||!G.prototype.findChild,K=o&&l(function(){return 7!=S(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=E(R,e);i&&delete R[e],j(t,e,n),i&&t!==R&&j(R,e,i)}:j,z=function(t){var e=B[t]=S(C.prototype);return e._k=t,e},U=H&&"symbol"==typeof C.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof C},W=function(t,e,n){return t===R&&W(N,e,n),m(t),e=x(e,!0),m(n),r(B,e)?(n.enumerable?(r(t,$)&&t[$][e]&&(t[$][e]=!1),n=S(n,{enumerable:w(0,!1)})):(r(t,$)||j(t,$,w(1,{})),t[$][e]=!0),K(t,e,n)):j(t,e,n)},J=function(t,e){m(t);for(var n,i=g(e=_(e)),r=0,o=i.length;o>r;)W(t,n=i[r++],e[n]);return t},q=function(t,e){return void 0===e?S(t):J(S(t),e)},X=function(t){var e=F.call(this,t=x(t,!0));return!(this===R&&r(B,t)&&!r(N,t))&&(!(e||!r(this,t)||!r(B,t)||r(this,$)&&this[$][t])||e)},Y=function(t,e){if(t=_(t),e=x(e,!0),t!==R||!r(B,e)||r(N,e)){var n=E(t,e);return!n||!r(B,e)||r(t,$)&&t[$][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=V(_(t)),i=[],o=0;n.length>o;)r(B,e=n[o++])||e==$||e==a||i.push(e);return i},Z=function(t){for(var e,n=t===R,i=V(n?N:_(t)),o=[],s=0;i.length>s;)!r(B,e=i[s++])||n&&!r(R,e)||o.push(B[e]);return o};H||(C=function(){if(this instanceof C)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===R&&e.call(N,n),r(this,$)&&r(this[$],t)&&(this[$][t]=!1),K(this,t,w(1,n))};return o&&I&&K(R,t,{configurable:!0,set:e}),z(t)},u(C.prototype,"toString",function(){return this._k}),L.f=Y,P.f=W,n(46).f=O.f=Q,n(26).f=X,n(47).f=Z,o&&!n(25)&&u(R,"propertyIsEnumerable",X,!0),d.f=function(t){return z(h(t))}),s(s.G+s.W+s.F*!H,{Symbol:C});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)h(tt[et++]);for(var tt=k(h.store),et=0;tt.length>et;)v(tt[et++]);s(s.S+s.F*!H,"Symbol",{for:function(t){return r(M,t+="")?M[t]:M[t]=C(t)},keyFor:function(t){if(U(t))return y(M,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){I=!0},useSimple:function(){I=!1}}),s(s.S+s.F*!H,"Object",{create:q,defineProperty:W,defineProperties:J,getOwnPropertyDescriptor:Y,getOwnPropertyNames:Q,getOwnPropertySymbols:Z}),T&&s(s.S+s.F*(!H||l(function(){var t=C();return"[null]"!=A([t])||"{}"!=A({a:t})||"{}"!=A(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!U(t)){for(var e,n,i=[t],r=1;arguments.length>r;)i.push(arguments[r++]);return e=i[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!U(e))return e}),i[1]=e,A.apply(T,i)}}}),C.prototype[D]||n(6)(C.prototype,D,C.prototype.valueOf),f(C,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},function(t,e,n){n(32)("asyncIterator")},function(t,e,n){n(32)("observable")},function(t,e,n){n(91);for(var i=n(0),r=n(6),o=n(24),s=n(7)("toStringTag"),u=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],a=0;a<5;a++){var l=u[a],c=i[l],f=c&&c.prototype;f&&!f[s]&&r(f,s,l),o[l]=o.Array}},function(t,e,n){var i=n(38)("unscopables"),r=Array.prototype;void 0==r[i]&&n(18)(r,i,{}),t.exports=function(t){r[i][t]=!0}},function(t,e,n){var i=n(19);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(115),r=n(37),o=n(114);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return!0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(50),r=n(57),o=n(36),s=n(37);t.exports=function(t,e,n,u,a){i(e);var l=r(t),c=o(l),f=s(l.length),p=a?f-1:0,h=a?-1:1;if(n<2)for(;;){if(p in c){u=c[p],p+=h;break}if(p+=h,a?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;a?p>=0:f>p;p+=h)p in c&&(u=e(u,c[p],p,l));return u}},function(t,e,n){var i=n(19),r=n(54),o=n(38)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[o])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(103);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){var i=n(19),r=n(9).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e,n){"use strict";var i=n(18),r=n(55),o=n(8),s=n(17),u=n(38);t.exports=function(t,e,n){var a=u(t),l=n(s,a,""[t]),c=l[0],f=l[1];o(function(){var e={};return e[a]=function(){return 7},7!=""[t](e)})&&(r(String.prototype,t,c),i(RegExp.prototype,a,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=!n(35)&&!n(8)(function(){return 7!=Object.defineProperty(n(105)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(100),r=n(108),o=n(116),s=Object.defineProperty;e.f=n(35)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(9),r=i["__core-js_shared__"]||(i["__core-js_shared__"]={});t.exports=function(t){return r[t]||(r[t]={})}},function(t,e,n){var i=n(5),r=n(17),o=n(8),s=n(113),u="["+s+"]",a="​",l=RegExp("^"+u+u+"*"),c=RegExp(u+u+"*$"),f=function(t,e,n){var r={},u=o(function(){return!!s[t]()||a[t]()!=a}),l=r[t]=u?e(p):s[t];n&&(r[n]=l),i(i.P+i.F*u,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var i=n(56),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(36),r=n(17);t.exports=function(t){return i(r(t))}},function(t,e,n){var i=n(19);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){"use strict";var i=n(5),r=n(34)(2);i(i.P+i.F*!n(20)([].filter,!0),"Array",{filter:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(5),r=n(101)(!1),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(s||!n(20)(o)),"Array",{indexOf:function(t){return s?o.apply(this,arguments)||0:r(this,t,arguments[1])}})},function(t,e,n){var i=n(5);i(i.S,"Array",{isArray:n(54)})},function(t,e,n){"use strict";var i=n(5),r=n(34)(1);i(i.P+i.F*!n(20)([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(5),r=n(102);i(i.P+i.F*!n(20)([].reduce,!0),"Array",{reduce:function(t){return r(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){n(106)("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i):new RegExp(n)[e](String(i))},n]})},function(t,e,n){"use strict";n(112)("trim",function(t){return function(){return t(this,3)}})},function(t,e){},function(t,e){t.exports=function(t,e,n,i,r,o){var s,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,u=t.default);var l="function"==typeof u?u.options:u;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=i),c){var f=l.functional,p=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(t,e){return c.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:l}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate()},blur:function(e){!t.searchable&&t.deactivate()},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,"ArrowDown")?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,"ArrowUp")?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null},function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}],keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e){return[t._t("tag",[n("span",{staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keydown:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e)},mousedown:function(n){n.preventDefault(),t.removeElement(e)}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e(),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:t.isOpen&&t.searchable,expression:"isOpen && searchable"}],ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"off",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value)},focus:function(e){e.preventDefault(),t.activate()},blur:function(e){e.preventDefault(),t.deactivate()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,"ArrowDown"))return null;e.preventDefault(),t.pointerForward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,"ArrowUp"))return null;e.preventDefault(),t.pointerBackward()},function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement()}]}}),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[n("span",{staticClass:"multiselect__single"},[t._v("\n            "+t._s(t.placeholder)+"\n          ")])])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},on:{focus:t.activate,mousedown:function(t){t.preventDefault()}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e)},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i)},mousedown:function(n){n.preventDefault(),t.selectGroup(e)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},r=[],o={render:i,staticRenderFns:r};e.a=o}])});

/***/ }),

/***/ "./node_modules/vue-slider-component/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("vue-slider-component",[],e):"object"==typeof exports?exports["vue-slider-component"]=e():t["vue-slider-component"]=e()}(this,function(){return function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,i){i(7);var s=i(5)(i(1),i(6),null,null);t.exports=s.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){var t="undefined"!=typeof window?window.devicePixelRatio||1:1;return function(e){return Math.round(e*t)/t}}();e.default={name:"VueSliderComponent",props:{width:{type:[Number,String],default:"auto"},height:{type:[Number,String],default:6},data:{type:Array,default:null},dotSize:{type:Number,default:16},dotWidth:{type:Number,required:!1},dotHeight:{type:Number,required:!1},min:{type:Number,default:0},max:{type:Number,default:100},interval:{type:Number,default:1},show:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},piecewise:{type:Boolean,default:!1},tooltip:{type:[String,Boolean],default:"always"},eventType:{type:String,default:"auto"},direction:{type:String,default:"horizontal"},reverse:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},clickable:{type:Boolean,default:!0},speed:{type:Number,default:.5},realTime:{type:Boolean,default:!1},stopPropagation:{type:Boolean,default:!1},value:{type:[String,Number,Array,Object],default:0},piecewiseLabel:{type:Boolean,default:!1},debug:{type:Boolean,default:!0},fixed:{type:Boolean,default:!1},processDragable:{type:Boolean,default:!1},useKeyboard:{type:Boolean,default:!1},actionsKeyboard:{type:Array,default:function(){return[function(t){return t-1},function(t){return t+1}]}},tooltipMerge:{type:Boolean,default:!0},sliderStyle:[Array,Object,Function],focusStyle:[Array,Object,Function],tooltipDir:[Array,String],formatter:[String,Function],mergeFormatter:[String,Function],piecewiseStyle:Object,piecewiseActiveStyle:Object,processStyle:Object,bgStyle:Object,tooltipStyle:[Array,Object,Function],labelStyle:Object,labelActiveStyle:Object},data:function(){return{flag:!1,keydownFlag:null,focusFlag:!1,processFlag:!1,processSign:null,size:0,fixedValue:0,focusSlider:0,currentValue:0,currentSlider:0,isComponentExists:!0,isMounted:!1}},computed:{dotWidthVal:function(){return"number"==typeof this.dotWidth?this.dotWidth:this.dotSize},dotHeightVal:function(){return"number"==typeof this.dotHeight?this.dotHeight:this.dotSize},flowDirection:function(){return"vue-slider-"+this.direction+(this.reverse?"-reverse":"")},tooltipMergedPosition:function(){if(!this.isMounted)return{};var t=this.tooltipDirection[0];if(this.$refs.dot0){if("vertical"===this.direction){var e={};return e[t]="-"+(this.dotHeightVal/2-this.width/2+9)+"px",e}var i={};return i[t]="-"+(this.dotWidthVal/2-this.height/2+9)+"px",i.left="50%",i}},tooltipDirection:function(){var t=this.tooltipDir||("vertical"===this.direction?"left":"top");return Array.isArray(t)?this.isRange?t:t[1]:this.isRange?[t,t]:t},tooltipStatus:function(){return"hover"===this.tooltip&&this.flag?"vue-slider-always":this.tooltip?"vue-slider-"+this.tooltip:""},tooltipClass:function(){return["vue-slider-tooltip-"+this.tooltipDirection,"vue-slider-tooltip"]},isDisabled:function(){return"none"===this.eventType||this.disabled},disabledClass:function(){return this.disabled?"vue-slider-disabled":""},stateClass:function(){return{"vue-slider-state-process-drag":this.processFlag,"vue-slider-state-drag":this.flag&&!this.processFlag&&!this.keydownFlag,"vue-slider-state-focus":this.focusFlag}},isRange:function(){return Array.isArray(this.value)},slider:function(){return this.isRange?[this.$refs.dot0,this.$refs.dot1]:this.$refs.dot},minimum:function(){return this.data?0:this.min},val:{get:function(){return this.data?this.isRange?[this.data[this.currentValue[0]],this.data[this.currentValue[1]]]:this.data[this.currentValue]:this.currentValue},set:function(t){if(this.data)if(this.isRange){var e=this.data.indexOf(t[0]),i=this.data.indexOf(t[1]);e>-1&&i>-1&&(this.currentValue=[e,i])}else{var s=this.data.indexOf(t);s>-1&&(this.currentValue=s)}else this.currentValue=t}},currentIndex:function(){return this.isRange?this.data?this.currentValue:[this.getIndexByValue(this.currentValue[0]),this.getIndexByValue(this.currentValue[1])]:this.getIndexByValue(this.currentValue)},indexRange:function(){return this.isRange?this.currentIndex:[0,this.currentIndex]},maximum:function(){return this.data?this.data.length-1:this.max},multiple:function(){var t=(""+this.interval).split(".")[1];return t?Math.pow(10,t.length):1},spacing:function(){return this.data?1:this.interval},total:function(){return this.data?this.data.length-1:(Math.floor((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&this.printError("Prop[interval] is illegal, Please make sure that the interval can be divisible"),(this.maximum-this.minimum)/this.interval)},gap:function(){return this.size/this.total},position:function(){return this.isRange?[(this.currentValue[0]-this.minimum)/this.spacing*this.gap,(this.currentValue[1]-this.minimum)/this.spacing*this.gap]:(this.currentValue-this.minimum)/this.spacing*this.gap},limit:function(){return this.isRange?this.fixed?[[0,(this.maximum-this.fixedValue*this.spacing)/this.spacing*this.gap],[(this.minimum+this.fixedValue*this.spacing)/this.spacing*this.gap,this.size]]:[[0,this.position[1]],[this.position[0],this.size]]:[0,this.size]},valueLimit:function(){return this.isRange?this.fixed?[[this.minimum,this.maximum-this.fixedValue*this.spacing],[this.minimum+this.fixedValue*this.spacing,this.maximum]]:[[this.minimum,this.currentValue[1]],[this.currentValue[0],this.maximum]]:[this.minimum,this.maximum]},idleSlider:function(){return 0===this.currentSlider?1:0},wrapStyles:function(){return"vertical"===this.direction?{height:"number"==typeof this.height?this.height+"px":this.height,padding:this.dotHeightVal/2+"px "+this.dotWidthVal/2+"px"}:{width:"number"==typeof this.width?this.width+"px":this.width,padding:this.dotHeightVal/2+"px "+this.dotWidthVal/2+"px"}},sliderStyles:function(){return Array.isArray(this.sliderStyle)?this.isRange?this.sliderStyle:this.sliderStyle[1]:"function"==typeof this.sliderStyle?this.sliderStyle(this.val,this.currentIndex):this.isRange?[this.sliderStyle,this.sliderStyle]:this.sliderStyle},focusStyles:function(){return Array.isArray(this.focusStyle)?this.isRange?this.focusStyle:this.focusStyle[1]:"function"==typeof this.focusStyle?this.focusStyle(this.val,this.currentIndex):this.isRange?[this.focusStyle,this.focusStyle]:this.focusStyle},tooltipStyles:function(){return Array.isArray(this.tooltipStyle)?this.isRange?this.tooltipStyle:this.tooltipStyle[1]:"function"==typeof this.tooltipStyle?this.tooltipStyle(this.val,this.currentIndex):this.isRange?[this.tooltipStyle,this.tooltipStyle]:this.tooltipStyle},elemStyles:function(){return"vertical"===this.direction?{width:this.width+"px",height:"100%"}:{height:this.height+"px"}},dotStyles:function(){return"vertical"===this.direction?{width:this.dotWidthVal+"px",height:this.dotHeightVal+"px",left:-(this.dotWidthVal-this.width)/2+"px"}:{width:this.dotWidthVal+"px",height:this.dotHeightVal+"px",top:-(this.dotHeightVal-this.height)/2+"px"}},piecewiseDotStyle:function(){return"vertical"===this.direction?{width:this.width+"px",height:this.width+"px"}:{width:this.height+"px",height:this.height+"px"}},piecewiseDotWrap:function(){if(!this.piecewise&&!this.piecewiseLabel)return!1;for(var t=[],e=0;e<=this.total;e++){var i="vertical"===this.direction?{bottom:this.gap*e-this.width/2+"px",left:0}:{left:this.gap*e-this.height/2+"px",top:0},s=this.reverse?this.total-e:e,r=this.data?this.data[s]:this.spacing*s+this.min;t.push({style:i,label:this.formatter?this.formatting(r):r,inRange:s>=this.indexRange[0]&&s<=this.indexRange[1]})}return t}},watch:{value:function(t){this.flag||this.setValue(t,!0)},max:function(t){if(t<this.min)return this.printError("The maximum value can not be less than the minimum value.");var e=this.limitValue(this.val);this.setValue(e),this.refresh()},min:function(t){if(t>this.max)return this.printError("The minimum value can not be greater than the maximum value.");var e=this.limitValue(this.val);this.setValue(e),this.refresh()},show:function(t){var e=this;t&&!this.size&&this.$nextTick(function(){e.refresh()})},fixed:function(){this.computedFixedValue()}},methods:{bindEvents:function(){document.addEventListener("touchmove",this.moving,{passive:!1}),document.addEventListener("touchend",this.moveEnd,{passive:!1}),document.addEventListener("mousedown",this.blurSlider),document.addEventListener("mousemove",this.moving),document.addEventListener("mouseup",this.moveEnd),document.addEventListener("mouseleave",this.moveEnd),document.addEventListener("keydown",this.handleKeydown),document.addEventListener("keyup",this.handleKeyup),window.addEventListener("resize",this.refresh),this.isRange&&this.tooltipMerge&&(this.$refs.dot0.addEventListener("transitionend",this.handleOverlapTooltip),this.$refs.dot1.addEventListener("transitionend",this.handleOverlapTooltip))},unbindEvents:function(){document.removeEventListener("touchmove",this.moving),document.removeEventListener("touchend",this.moveEnd),document.removeEventListener("mousedown",this.blurSlider),document.removeEventListener("mousemove",this.moving),document.removeEventListener("mouseup",this.moveEnd),document.removeEventListener("mouseleave",this.moveEnd),document.removeEventListener("keydown",this.handleKeydown),document.removeEventListener("keyup",this.handleKeyup),window.removeEventListener("resize",this.refresh),this.isRange&&this.tooltipMerge&&(this.$refs.dot0.removeEventListener("transitionend",this.handleOverlapTooltip),this.$refs.dot1.removeEventListener("transitionend",this.handleOverlapTooltip))},handleKeydown:function(t){if(!this.useKeyboard||!this.focusFlag)return!1;switch(t.keyCode){case 37:case 40:t.preventDefault(),this.keydownFlag=!0,this.flag=!0,this.changeFocusSlider(this.actionsKeyboard[0]);break;case 38:case 39:t.preventDefault(),this.keydownFlag=!0,this.flag=!0,this.changeFocusSlider(this.actionsKeyboard[1])}},handleKeyup:function(){this.keydownFlag&&(this.keydownFlag=!1,this.flag=!1)},changeFocusSlider:function(t){var e=this;if(this.isRange){var i=this.currentIndex.map(function(i,s){if(s===e.focusSlider||e.fixed){var r=t(i),o=e.fixed?e.valueLimit[s]:[0,e.total];if(r<=o[1]&&r>=o[0])return r}return i});i[0]>i[1]&&(this.focusSlider=0===this.focusSlider?1:0,i=i.reverse()),this.setIndex(i)}else this.setIndex(t(this.currentIndex))},blurSlider:function(t){var e=this.isRange?this.$refs["dot"+this.focusSlider]:this.$refs.dot;if(!e||e===t.target)return!1;this.focusFlag=!1},formatting:function(t){return"string"==typeof this.formatter?this.formatter.replace(/\{value\}/,t):this.formatter(t)},mergeFormatting:function(t,e){return"string"==typeof this.mergeFormatter?this.mergeFormatter.replace(/\{(value1|value2)\}/g,function(i,s){return"value1"===s?t:e}):this.mergeFormatter(t,e)},getPos:function(t){return this.realTime&&this.getStaticData(),"vertical"===this.direction?this.reverse?t.pageY-this.offset:this.size-(t.pageY-this.offset):this.reverse?this.size-(t.clientX-this.offset):t.clientX-this.offset},processClick:function(t){this.fixed&&t.stopPropagation()},wrapClick:function(t){if(this.isDisabled||!this.clickable||this.processFlag)return!1;var e=this.getPos(t);this.isRange&&(this.currentSlider=e>(this.position[1]-this.position[0])/2+this.position[0]?1:0),this.setValueOnPos(e)},moveStart:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments[2];if(this.isDisabled)return!1;if(this.stopPropagation&&t.stopPropagation(),this.isRange&&(this.currentSlider=e,i)){if(!this.processDragable)return!1;this.processFlag=!0,this.processSign={pos:this.position,start:this.getPos(t.targetTouches&&t.targetTouches[0]?t.targetTouches[0]:t)}}!i&&this.useKeyboard&&(this.focusFlag=!0,this.focusSlider=e),this.flag=!0,this.$emit("drag-start",this)},moving:function(t){if(this.stopPropagation&&t.stopPropagation(),!this.flag)return!1;t.preventDefault(),t.targetTouches&&t.targetTouches[0]&&(t=t.targetTouches[0]),this.processFlag?(this.currentSlider=0,this.setValueOnPos(this.processSign.pos[0]+this.getPos(t)-this.processSign.start,!0),this.currentSlider=1,this.setValueOnPos(this.processSign.pos[1]+this.getPos(t)-this.processSign.start,!0)):this.setValueOnPos(this.getPos(t),!0),this.isRange&&this.tooltipMerge&&this.handleOverlapTooltip()},moveEnd:function(t){var e=this;if(this.stopPropagation&&t.stopPropagation(),!this.flag)return!1;this.$emit("drag-end",this),this.lazy&&this.isDiff(this.val,this.value)&&this.syncValue(),this.flag=!1,window.setTimeout(function(){e.processFlag=!1},0),this.setPosition()},setValueOnPos:function(t,e){var i=this.isRange?this.limit[this.currentSlider]:this.limit,s=this.isRange?this.valueLimit[this.currentSlider]:this.valueLimit;if(t>=i[0]&&t<=i[1]){this.setTransform(t);var r=this.getValueByIndex(Math.round(t/this.gap));this.setCurrentValue(r,e),this.isRange&&this.fixed&&(this.setTransform(t+this.fixedValue*this.gap*(0===this.currentSlider?1:-1),!0),this.setCurrentValue(r+this.fixedValue*this.spacing*(0===this.currentSlider?1:-1),e,!0))}else t<i[0]?(this.setTransform(i[0]),this.setCurrentValue(s[0]),this.isRange&&this.fixed?(this.setTransform(this.limit[this.idleSlider][0],!0),this.setCurrentValue(this.valueLimit[this.idleSlider][0],e,!0)):this.fixed||1!==this.currentSlider||(this.focusSlider=0,this.currentSlider=0)):(this.setTransform(i[1]),this.setCurrentValue(s[1]),this.isRange&&this.fixed?(this.setTransform(this.limit[this.idleSlider][1],!0),this.setCurrentValue(this.valueLimit[this.idleSlider][1],e,!0)):this.fixed||0!==this.currentSlider||(this.focusSlider=1,this.currentSlider=1))},isDiff:function(t,e){return Object.prototype.toString.call(t)!==Object.prototype.toString.call(e)||(Array.isArray(t)&&t.length===e.length?t.some(function(t,i){return t!==e[i]}):t!==e)},setCurrentValue:function(t,e,i){var s=i?this.idleSlider:this.currentSlider;if(t<this.minimum||t>this.maximum)return!1;this.isRange?this.isDiff(this.currentValue[s],t)&&(this.currentValue.splice(s,1,t),this.lazy&&this.flag||this.syncValue()):this.isDiff(this.currentValue,t)&&(this.currentValue=t,this.lazy&&this.flag||this.syncValue()),e||this.setPosition()},getValueByIndex:function(t){return(this.spacing*this.multiple*t+this.minimum*this.multiple)/this.multiple},getIndexByValue:function(t){return Math.round((t-this.minimum)*this.multiple)/(this.spacing*this.multiple)},setIndex:function(t){if(Array.isArray(t)&&this.isRange){var e=void 0;e=this.data?[this.data[t[0]],this.data[t[1]]]:[this.getValueByIndex(t[0]),this.getValueByIndex(t[1])],this.setValue(e)}else t=this.getValueByIndex(t),this.isRange&&(this.currentSlider=t>(this.currentValue[1]-this.currentValue[0])/2+this.currentValue[0]?1:0),this.setCurrentValue(t)},setValue:function(t,e,i){var s=this;if(this.isDiff(this.val,t)){var r=this.limitValue(t);this.val=this.isRange?r.concat():r,this.computedFixedValue(),this.syncValue(e)}this.$nextTick(function(){return s.setPosition(i)})},computedFixedValue:function(){if(!this.fixed)return this.fixedValue=0,!1;this.fixedValue=this.currentIndex[1]-this.currentIndex[0]},setPosition:function(t){this.flag||this.setTransitionTime(void 0===t?this.speed:t),this.isRange?(this.setTransform(this.position[0],1===this.currentSlider),this.setTransform(this.position[1],0===this.currentSlider)):this.setTransform(this.position),this.flag||this.setTransitionTime(0)},setTransform:function(t,e){var i=e?this.idleSlider:this.currentSlider,r=s(("vertical"===this.direction?this.dotHeightVal/2-t:t-this.dotWidthVal/2)*(this.reverse?-1:1)),o="vertical"===this.direction?"translateY("+r+"px)":"translateX("+r+"px)",n=this.fixed?this.fixedValue*this.gap+"px":(0===i?this.position[1]-t:t-this.position[0])+"px",l=this.fixed?(0===i?t:t-this.fixedValue*this.gap)+"px":(0===i?t:this.position[0])+"px";this.isRange?(this.slider[i].style.transform=o,this.slider[i].style.WebkitTransform=o,this.slider[i].style.msTransform=o,"vertical"===this.direction?(this.$refs.process.style.height=n,this.$refs.process.style[this.reverse?"top":"bottom"]=l):(this.$refs.process.style.width=n,this.$refs.process.style[this.reverse?"right":"left"]=l)):(this.slider.style.transform=o,this.slider.style.WebkitTransform=o,this.slider.style.msTransform=o,"vertical"===this.direction?(this.$refs.process.style.height=t+"px",this.$refs.process.style[this.reverse?"top":"bottom"]=0):(this.$refs.process.style.width=t+"px",this.$refs.process.style[this.reverse?"right":"left"]=0))},setTransitionTime:function(t){if(t||this.$refs.process.offsetWidth,this.isRange){for(var e=0;e<this.slider.length;e++)this.slider[e].style.transitionDuration=t+"s",this.slider[e].style.WebkitTransitionDuration=t+"s";this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"}else this.slider.style.transitionDuration=t+"s",this.slider.style.WebkitTransitionDuration=t+"s",this.$refs.process.style.transitionDuration=t+"s",this.$refs.process.style.WebkitTransitionDuration=t+"s"},limitValue:function(t){var e=this;if(this.data)return t;var i=function(i){return i<e.min?(e.printError("The value of the slider is "+t+", the minimum value is "+e.min+", the value of this slider can not be less than the minimum value"),e.min):i>e.max?(e.printError("The value of the slider is "+t+", the maximum value is "+e.max+", the value of this slider can not be greater than the maximum value"),e.max):i};return this.isRange?t.map(function(t){return i(t)}):i(t)},syncValue:function(t){var e=this.isRange?this.val.concat():this.val;this.$emit("input",e),t||this.$emit("callback",e)},getValue:function(){return this.val},getIndex:function(){return this.currentIndex},getStaticData:function(){this.$refs.elem&&(this.size="vertical"===this.direction?this.$refs.elem.offsetHeight:this.$refs.elem.offsetWidth,this.offset="vertical"===this.direction?this.$refs.elem.getBoundingClientRect().top+window.pageYOffset||document.documentElement.scrollTop:this.$refs.elem.getBoundingClientRect().left)},refresh:function(){this.$refs.elem&&(this.getStaticData(),this.computedFixedValue(),this.setPosition())},printError:function(t){this.debug&&console.error("[VueSlider error]: "+t)},handleOverlapTooltip:function(){var t=this.tooltipDirection[0]===this.tooltipDirection[1];if(this.isRange&&t){var e=this.$refs.tooltip0,i=this.$refs.tooltip1,s=e.getBoundingClientRect().right,r=i.getBoundingClientRect().left,o=e.getBoundingClientRect().y,n=i.getBoundingClientRect().y+i.getBoundingClientRect().height,l="horizontal"===this.direction&&s>r,a="vertical"===this.direction&&n>o;l||a?this.handleDisplayMergedTooltip(!0):this.handleDisplayMergedTooltip(!1)}},handleDisplayMergedTooltip:function(t){var e=this.$refs.tooltip0,i=this.$refs.tooltip1,s=this.$refs.process.getElementsByClassName("vue-merged-tooltip")[0];t?(e.style.visibility="hidden",i.style.visibility="hidden",s.style.visibility="visible"):(e.style.visibility="visible",i.style.visibility="visible",s.style.visibility="hidden")}},mounted:function(){var t=this;if(this.isComponentExists=!0,"undefined"==typeof window||"undefined"==typeof document)return this.printError("window or document is undefined, can not be initialization.");this.$nextTick(function(){t.isComponentExists&&(t.getStaticData(),t.setValue(t.limitValue(t.value),!0,0),t.bindEvents())}),this.isMounted=!0},beforeDestroy:function(){this.isComponentExists=!1,this.unbindEvents()}}},function(t,e,i){"use strict";var s=i(0);t.exports=s},function(t,e,i){e=t.exports=i(4)(),e.push([t.i,'.vue-slider-component{position:relative;box-sizing:border-box;-ms-user-select:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none}.vue-slider-component.vue-slider-disabled{opacity:.5;cursor:not-allowed}.vue-slider-component.vue-slider-has-label{margin-bottom:15px}.vue-slider-component.vue-slider-disabled .vue-slider-dot{cursor:not-allowed}.vue-slider-component .vue-slider{position:relative;display:block;border-radius:15px;background-color:#ccc}.vue-slider-component .vue-slider:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slider-component .vue-slider-process{position:absolute;border-radius:15px;background-color:#3498db;transition:all 0s;z-index:1}.vue-slider-component .vue-slider-process.vue-slider-process-dragable{cursor:pointer;z-index:3}.vue-slider-component.vue-slider-horizontal .vue-slider-process{width:0;height:100%;top:0;left:0;will-change:width}.vue-slider-component.vue-slider-vertical .vue-slider-process{width:100%;height:0;bottom:0;left:0;will-change:height}.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-process{width:0;height:100%;top:0;right:0}.vue-slider-component.vue-slider-vertical-reverse .vue-slider-process{width:100%;height:0;top:0;left:0}.vue-slider-component .vue-slider-dot{position:absolute;border-radius:50%;background-color:#fff;box-shadow:.5px .5px 2px 1px rgba(0,0,0,.32);transition:all 0s;will-change:transform;cursor:pointer;z-index:4}.vue-slider-component .vue-slider-dot.vue-slider-dot-focus{box-shadow:0 0 2px 1px #3498db}.vue-slider-component .vue-slider-dot.vue-slider-dot-dragging{z-index:5}.vue-slider-component.vue-slider-horizontal .vue-slider-dot{left:0}.vue-slider-component.vue-slider-vertical .vue-slider-dot{bottom:0}.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-dot{right:0}.vue-slider-component.vue-slider-vertical-reverse .vue-slider-dot{top:0}.vue-slider-component .vue-slider-tooltip-wrap{display:none;position:absolute;z-index:9}.vue-slider-component .vue-slider-tooltip{display:block;font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #3498db;background-color:#3498db}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top{top:-9px;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom{bottom:-9px;left:50%;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left{top:50%;left:-9px;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right{top:50%;right:-9px;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.vue-slider-component .vue-slider-tooltip-top .vue-merged-tooltip .vue-slider-tooltip:before,.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip:before{content:"";position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-top-color:inherit;-webkit-transform:translate(-50%);transform:translate(-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-merged-tooltip{display:block;visibility:hidden}.vue-slider-component .vue-slider-tooltip-bottom .vue-merged-tooltip .vue-slider-tooltip:before,.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom .vue-slider-tooltip:before{content:"";position:absolute;top:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-bottom-color:inherit;-webkit-transform:translate(-50%);transform:translate(-50%)}.vue-slider-component .vue-slider-tooltip-left .vue-merged-tooltip .vue-slider-tooltip:before,.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left .vue-slider-tooltip:before{content:"";position:absolute;top:50%;right:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-left-color:inherit;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-slider-component .vue-slider-tooltip-right .vue-merged-tooltip .vue-slider-tooltip:before,.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right .vue-slider-tooltip:before{content:"";position:absolute;top:50%;left:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-right-color:inherit;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-slider-component .vue-slider-dot.vue-slider-hover:hover .vue-slider-tooltip-wrap{display:block}.vue-slider-component .vue-slider-dot.vue-slider-always .vue-slider-tooltip-wrap{display:block!important}.vue-slider-component .vue-slider-piecewise{position:absolute;width:100%;padding:0;margin:0;left:0;top:0;height:100%;list-style:none}.vue-slider-component .vue-slider-piecewise-item{position:absolute;width:8px;height:8px}.vue-slider-component .vue-slider-piecewise-dot{position:absolute;left:50%;top:50%;width:100%;height:100%;display:inline-block;background-color:rgba(0,0,0,.16);border-radius:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:2;transition:all .3s}.vue-slider-component .vue-slider-piecewise-item:first-child .vue-slider-piecewise-dot,.vue-slider-component .vue-slider-piecewise-item:last-child .vue-slider-piecewise-dot{visibility:hidden}.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-label,.vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-label{position:absolute;display:inline-block;top:100%;left:50%;white-space:nowrap;font-size:12px;color:#333;-webkit-transform:translate(-50%,8px);transform:translate(-50%,8px);visibility:visible}.vue-slider-component.vue-slider-vertical-reverse .vue-slider-piecewise-label,.vue-slider-component.vue-slider-vertical .vue-slider-piecewise-label{position:absolute;display:inline-block;top:50%;left:100%;white-space:nowrap;font-size:12px;color:#333;-webkit-transform:translate(8px,-50%);transform:translate(8px,-50%);visibility:visible}.vue-slider-component .vue-slider-sr-only{clip:rect(1px,1px,1px,1px);height:1px;width:1px;overflow:hidden;position:absolute!important}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var s={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(s[o]=!0)}for(r=0;r<e.length;r++){var n=e[r];"number"==typeof n[0]&&s[n[0]]||(i&&!n[2]?n[2]=i:i&&(n[2]="("+n[2]+") and ("+i+")"),t.push(n))}},t}},function(t,e){t.exports=function(t,e,i,s){var r,o=t=t||{},n=typeof t.default;"object"!==n&&"function"!==n||(r=t,o=t.default);var l="function"==typeof o?o.options:o;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),i&&(l._scopeId=i),s){var a=Object.create(l.computed||null);Object.keys(s).forEach(function(t){var e=s[t];a[t]=function(){return e}}),l.computed=a}return{esModule:r,exports:o,options:l}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],ref:"wrap",class:["vue-slider-component",t.flowDirection,t.disabledClass,t.stateClass,{"vue-slider-has-label":t.piecewiseLabel}],style:t.wrapStyles,on:{click:t.wrapClick}},[i("div",{ref:"elem",staticClass:"vue-slider",style:[t.elemStyles,t.bgStyle],attrs:{"aria-hidden":"true"}},[t.isRange?[i("div",{key:"dot0",ref:"dot0",class:[t.tooltipStatus,"vue-slider-dot",{"vue-slider-dot-focus":t.focusFlag&&0===t.focusSlider,"vue-slider-dot-dragging":t.flag&&0===t.currentSlider}],style:[t.dotStyles,t.sliderStyles[0],t.focusFlag&&0===t.focusSlider?t.focusStyles[0]:null],on:{mousedown:function(e){t.moveStart(e,0)},touchstart:function(e){t.moveStart(e,0)}}},[i("div",{ref:"tooltip0",class:["vue-slider-tooltip-"+t.tooltipDirection[0],"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles[0]},[t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])],{value:t.val[0],index:0})],2)]),t._v(" "),i("div",{key:"dot1",ref:"dot1",class:[t.tooltipStatus,"vue-slider-dot",{"vue-slider-dot-focus":t.focusFlag&&1===t.focusSlider,"vue-slider-dot-dragging":t.flag&&1===t.currentSlider}],style:[t.dotStyles,t.sliderStyles[1],t.focusFlag&&1===t.focusSlider?t.focusStyles[1]:null],on:{mousedown:function(e){t.moveStart(e,1)},touchstart:function(e){t.moveStart(e,1)}}},[i("div",{ref:"tooltip1",class:["vue-slider-tooltip-"+t.tooltipDirection[1],"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles[1]},[t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])],{value:t.val[1],index:1})],2)])]:[i("div",{key:"dot",ref:"dot",class:[t.tooltipStatus,"vue-slider-dot",{"vue-slider-dot-focus":t.focusFlag&&0===t.focusSlider,"vue-slider-dot-dragging":t.flag&&0===t.currentSlider}],style:[t.dotStyles,t.sliderStyles,t.focusFlag&&0===t.focusSlider?t.focusStyles:null],on:{mousedown:t.moveStart,touchstart:t.moveStart}},[i("div",{class:["vue-slider-tooltip-"+t.tooltipDirection,"vue-slider-tooltip-wrap"]},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles},[t._v(t._s(t.formatter?t.formatting(t.val):t.val))])],{value:t.val})],2)])],t._v(" "),i("ul",{staticClass:"vue-slider-piecewise"},t._l(t.piecewiseDotWrap,function(e,s){return i("li",{key:s,staticClass:"vue-slider-piecewise-item",style:[t.piecewiseDotStyle,e.style]},[t._t("piecewise",[t.piecewise?i("span",{staticClass:"vue-slider-piecewise-dot",style:[t.piecewiseStyle,e.inRange?t.piecewiseActiveStyle:null]}):t._e()],{label:e.label,index:s,first:0===s,last:s===t.piecewiseDotWrap.length-1,active:e.inRange}),t._v(" "),t._t("label",[t.piecewiseLabel?i("span",{staticClass:"vue-slider-piecewise-label",style:[t.labelStyle,e.inRange?t.labelActiveStyle:null]},[t._v("\n            "+t._s(e.label)+"\n          ")]):t._e()],{label:e.label,index:s,first:0===s,last:s===t.piecewiseDotWrap.length-1,active:e.inRange})],2)})),t._v(" "),i("div",{ref:"process",class:["vue-slider-process",{"vue-slider-process-dragable":t.isRange&&t.processDragable}],style:t.processStyle,on:{click:t.processClick,mousedown:function(e){t.moveStart(e,0,!0)},touchstart:function(e){t.moveStart(e,0,!0)}}},[i("div",{ref:"mergedTooltip",staticClass:"vue-merged-tooltip",class:["vue-slider-tooltip-"+t.tooltipDirection[0],"vue-slider-tooltip-wrap"],style:t.tooltipMergedPosition},[t._t("tooltip",[i("span",{staticClass:"vue-slider-tooltip",style:t.tooltipStyles},[t._v("\n            "+t._s(t.mergeFormatter?t.mergeFormatting(t.val[0],t.val[1]):t.formatter?t.formatting(t.val[0])+" - "+t.formatting(t.val[1]):t.val[0]+" - "+t.val[1])+"\n          ")])])],2)]),t._v(" "),t.isRange||t.data?t._e():i("input",{directives:[{name:"model",rawName:"v-model",value:t.val,expression:"val"}],staticClass:"vue-slider-sr-only",attrs:{type:"range",min:t.min,max:t.max},domProps:{value:t.val},on:{__r:function(e){t.val=e.target.value}}})],2)])},staticRenderFns:[]}},function(t,e,i){var s=i(3);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i(8)("743d98f5",s,!0)},function(t,e,i){function s(t){for(var e=0;e<t.length;e++){var i=t[e],s=d[i.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](i.parts[r]);for(;r<i.parts.length;r++)s.parts.push(o(i.parts[r]));s.parts.length>i.parts.length&&(s.parts.length=i.parts.length)}else{for(var n=[],r=0;r<i.parts.length;r++)n.push(o(i.parts[r]));d[i.id]={id:i.id,refs:1,parts:n}}}}function r(){var t=document.createElement("style");return t.type="text/css",h.appendChild(t),t}function o(t){var e,i,s=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(s){if(f)return v;s.parentNode.removeChild(s)}if(m){var o=p++;s=c||(c=r()),e=n.bind(null,s,o,!1),i=n.bind(null,s,o,!0)}else s=r(),e=l.bind(null,s),i=function(){s.parentNode.removeChild(s)};return e(t),function(s){if(s){if(s.css===t.css&&s.media===t.media&&s.sourceMap===t.sourceMap)return;e(t=s)}else i()}}function n(t,e,i,s){var r=i?"":s.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var o=document.createTextNode(r),n=t.childNodes;n[e]&&t.removeChild(n[e]),n.length?t.insertBefore(o,n[e]):t.appendChild(o)}}function l(t,e){var i=e.css,s=e.media,r=e.sourceMap;if(s&&t.setAttribute("media",s),r&&(i+="\n/*# sourceURL="+r.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=i(9),d={},h=a&&(document.head||document.getElementsByTagName("head")[0]),c=null,p=0,f=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,i){f=i;var r=u(t,e);return s(r),function(e){for(var i=[],o=0;o<r.length;o++){var n=r[o],l=d[n.id];l.refs--,i.push(l)}e?(r=u(t,e),s(r)):r=[];for(var o=0;o<i.length;o++){var l=i[o];if(0===l.refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete d[l.id]}}}};var g=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var i=[],s={},r=0;r<e.length;r++){var o=e[r],n=o[0],l=o[1],a=o[2],u=o[3],d={id:t+":"+r,css:l,media:a,sourceMap:u};s[n]?s[n].parts.push(d):i.push(s[n]={id:n,parts:[d]})}return i}}])});

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57e64c2f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57e64c2f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("4f781111", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57e64c2f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CatalogProductList.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57e64c2f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CatalogProductList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("./node_modules/vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./resources/assets/js/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_svg4everybody_legacy_min__ = __webpack_require__("./resources/assets/js/core/svg4everybody.legacy.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_svg4everybody_legacy_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__core_svg4everybody_legacy_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__("./resources/assets/js/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap__ = __webpack_require__("./resources/assets/js/bootstrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__("./node_modules/vue/dist/vue.common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store__ = __webpack_require__("./resources/assets/js/store/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vee_validate__ = __webpack_require__("./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_shop_catalog_Catalog__ = __webpack_require__("./resources/assets/js/components/shop/catalog/Catalog.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_shop_catalog_Catalog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_shop_catalog_Catalog__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_shop_catalog_ProductList__ = __webpack_require__("./resources/assets/js/components/shop/catalog/ProductList.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_shop_catalog_ProductList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_shop_catalog_ProductList__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_shop_catalog_product_cards_ProductCard__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_shop_catalog_product_cards_ProductCard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_shop_catalog_product_cards_ProductCard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_shop_price_FormattedPrice__ = __webpack_require__("./resources/assets/js/components/shop/price/FormattedPrice.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_shop_price_FormattedPrice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_shop_price_FormattedPrice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_banners_BannerHomeStock__ = __webpack_require__("./resources/assets/js/components/banners/BannerHomeStock.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_banners_BannerHomeStock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_banners_BannerHomeStock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_banners_BannerHomeNew__ = __webpack_require__("./resources/assets/js/components/banners/BannerHomeNew.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_banners_BannerHomeNew___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_banners_BannerHomeNew__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_shop_checkout_Checkout__ = __webpack_require__("./resources/assets/js/components/shop/checkout/Checkout.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_shop_checkout_Checkout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_shop_checkout_Checkout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_shop_cabinet_Cabinet__ = __webpack_require__("./resources/assets/js/components/shop/cabinet/Cabinet.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_shop_cabinet_Cabinet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_shop_cabinet_Cabinet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_shop_cart_CartBtn__ = __webpack_require__("./resources/assets/js/components/shop/cart/CartBtn.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_shop_cart_CartBtn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_shop_cart_CartBtn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_shop_product_ProductControls__ = __webpack_require__("./resources/assets/js/components/shop/product/ProductControls.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_shop_product_ProductControls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_shop_product_ProductControls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_TabsHtml__ = __webpack_require__("./resources/assets/js/components/TabsHtml.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_TabsHtml___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_TabsHtml__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_Rating__ = __webpack_require__("./resources/assets/js/components/Rating.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_Rating___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_Rating__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_shop_product_ProductActions__ = __webpack_require__("./resources/assets/js/components/shop/product/ProductActions.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_shop_product_ProductActions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_shop_product_ProductActions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_shop_sale_ProductSale__ = __webpack_require__("./resources/assets/js/components/shop/sale/ProductSale.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_shop_sale_ProductSale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__components_shop_sale_ProductSale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_CitiesSelect__ = __webpack_require__("./resources/assets/js/components/CitiesSelect.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_CitiesSelect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__components_CitiesSelect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_HeaderBanner__ = __webpack_require__("./resources/assets/js/components/HeaderBanner.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_HeaderBanner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__components_HeaderBanner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_imageLoaders_BackgroundImageLoader__ = __webpack_require__("./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_imageLoaders_BackgroundImageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__components_imageLoaders_BackgroundImageLoader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__scripts_HeightToggle__ = __webpack_require__("./resources/assets/js/scripts/HeightToggle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__scripts_HeightToggle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__scripts_HeightToggle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__bootstrap_tooltip__ = __webpack_require__("./resources/assets/js/bootstrap/tooltip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__fancyapps_fancybox__ = __webpack_require__("./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__fancyapps_fancybox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27__fancyapps_fancybox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__scripts_FixedMenu__ = __webpack_require__("./resources/assets/js/scripts/FixedMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__scripts_MainMenu__ = __webpack_require__("./resources/assets/js/scripts/MainMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__scripts_MetaSetter__ = __webpack_require__("./resources/assets/js/scripts/MetaSetter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__scripts_formSender__ = __webpack_require__("./resources/assets/js/scripts/formSender.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * GLOBAL
 */



/**
 * Imports
 */





__WEBPACK_IMPORTED_MODULE_3_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vuex__["default"]);

var store = new __WEBPACK_IMPORTED_MODULE_4_vuex__["default"].Store(__WEBPACK_IMPORTED_MODULE_5__store__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_3_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_6_vee_validate__["default"], {
    fieldsBagName: 'formFields',
    errorBagName: 'formErrors'
});

/**
 * Components
 */































/**
 * App
 */

var breakpoints = {
    xs: 1,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};

var app = new __WEBPACK_IMPORTED_MODULE_3_vue___default.a({
    el: '#app',
    store: store,
    components: {
        ProductSale: __WEBPACK_IMPORTED_MODULE_20__components_shop_sale_ProductSale___default.a,
        Catalog: __WEBPACK_IMPORTED_MODULE_7__components_shop_catalog_Catalog___default.a,
        ProductList: __WEBPACK_IMPORTED_MODULE_8__components_shop_catalog_ProductList___default.a,
        ProductCard: __WEBPACK_IMPORTED_MODULE_9__components_shop_catalog_product_cards_ProductCard___default.a,
        FormattedPrice: __WEBPACK_IMPORTED_MODULE_10__components_shop_price_FormattedPrice___default.a,
        BannerHomeStock: __WEBPACK_IMPORTED_MODULE_11__components_banners_BannerHomeStock___default.a,
        BannerHomeNew: __WEBPACK_IMPORTED_MODULE_12__components_banners_BannerHomeNew___default.a,
        Checkout: __WEBPACK_IMPORTED_MODULE_13__components_shop_checkout_Checkout___default.a,
        Cabinet: __WEBPACK_IMPORTED_MODULE_14__components_shop_cabinet_Cabinet___default.a,
        CartBtn: __WEBPACK_IMPORTED_MODULE_15__components_shop_cart_CartBtn___default.a,
        ProductControls: __WEBPACK_IMPORTED_MODULE_16__components_shop_product_ProductControls___default.a,
        TabsHtml: __WEBPACK_IMPORTED_MODULE_17__components_TabsHtml___default.a,
        Rating: __WEBPACK_IMPORTED_MODULE_18__components_Rating___default.a,
        ProductActions: __WEBPACK_IMPORTED_MODULE_19__components_shop_product_ProductActions___default.a,
        CitiesSelect: __WEBPACK_IMPORTED_MODULE_21__components_CitiesSelect___default.a,
        HeaderBanner: __WEBPACK_IMPORTED_MODULE_22__components_HeaderBanner___default.a,
        BackgroundImageLoader: __WEBPACK_IMPORTED_MODULE_23__components_imageLoaders_BackgroundImageLoader___default.a
    },
    data: {
        windowWidth: window.innerWidth,

        mossebo: window.mossebo
    },
    mixins: [],
    methods: {
        windowLessThan: function windowLessThan(size) {
            return this.windowWidth < breakpoints[size];
        },
        windowMoreThan: function windowMoreThan(size) {
            return this.windowWidth >= breakpoints[size];
        },
        windowBetween: function windowBetween(from, to) {
            return this.windowWidth >= breakpoints[from] && this.windowWidth < breakpoints[to];
        },
        translate: function translate() {
            return __WEBPACK_IMPORTED_MODULE_24__scripts_core__["a" /* default */].translate.apply(null, arguments);
        },
        initTooltips: function initTooltips() {
            $('[data-toggle="tooltip"]').tooltip();
        },


        setMeta: __WEBPACK_IMPORTED_MODULE_30__scripts_MetaSetter__["a" /* default */]
    },

    computed: {
        isMobile: function isMobile() {
            return this.windowLessThan('sm');
        },
        isTablet: function isTablet() {
            return this.windowMoreThan('sm') && this.windowLessThan('lg');
        },
        isDesktop: function isDesktop() {
            return this.windowMoreThan('lg');
        }
    },

    created: function created() {
        var _this = this;

        this.resizeHandler = _.debounce(function () {
            _this.windowWidth = window.innerWidth;
            _this.$emit('resize');
        }, 50);

        window.addEventListener('resize', this.resizeHandler, { passive: true });
    },
    mounted: function mounted() {
        Object(__WEBPACK_IMPORTED_MODULE_28__scripts_FixedMenu__["a" /* default */])('.js-fixed-menu');

        Object(__WEBPACK_IMPORTED_MODULE_29__scripts_MainMenu__["a" /* default */])();

        heightToggle('.js-ht', {
            bindCloseEvents: true
        });
    },
    beforeDestroy: function beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    }
});

window.app = app;

// All Browser support SVG
// https://github.com/jonathantneal/svg4everybody
__WEBPACK_IMPORTED_MODULE_0__core_svg4everybody_legacy_min___default()();

// Instagram Slider
$('.slider-instagram').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    lazyLoad: 'ondemand',
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000
});

// Product Slider
$('.js-product-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    asNavFor: '.slider-nav',
    lazyLoad: 'ondemand',
    mobileFirst: true,

    responsive: [{
        breakpoint: 991,
        settings: {
            fade: true,
            dots: false
        }
    }]
});

$('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.js-product-slider',
    dots: false,
    //arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="symbol-icon symbol-arrow-back"><use xlink:href="/assets/images/icons.svg#symbol-arrow-back"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="symbol-icon symbol-arrow-forward"><use xlink:href="/assets/images/icons.svg#symbol-arrow-forward"></use></svg></button>',
    centerMode: false,
    focusOnSelect: true,
    lazyLoad: 'ondemand'
});

// Product gallery
$('.js-zoom-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
        verticalFit: true,
        titleSrc: function titleSrc(item) {
            return item.el.attr('title');
        }
    },
    gallery: {
        enabled: true
    }
});

(function () {
    var $slider = $('.js-studio-work-life');

    if (!$slider.length) return;
    var initialized = false;

    function check() {
        if (app.windowLessThan('md')) {
            if (!initialized) {
                $slider.slick({
                    prevArrow: false,
                    nextArrow: false,
                    variableWidth: true,
                    dots: true
                });

                initialized = true;
            }
        } else {
            if (initialized) {
                $slider.slick('unslick');
                initialized = false;
            }
        }
    }

    app.$on('resize', check);

    check();
})();[].forEach.call(document.querySelectorAll('.js-form-sender'), function (el) {
    return new __WEBPACK_IMPORTED_MODULE_31__scripts_formSender__["b" /* default */](el);
});

$('.js-form-popup').fancybox({
    toolbar: false,
    infobar: false,
    arrows: false,
    buttons: ['close'],
    protect: false,
    // touch: {
    //     vertical: false,
    //     momentum: false
    // },

    touch: false,
    hash: false,

    lang: __WEBPACK_IMPORTED_MODULE_24__scripts_core__["a" /* default */].getLang(),

    autoFocus: true,

    i18n: _defineProperty({}, __WEBPACK_IMPORTED_MODULE_24__scripts_core__["a" /* default */].getLang(), __WEBPACK_IMPORTED_MODULE_24__scripts_core__["a" /* default */].translate('fancybox'))
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {__webpack_require__("./node_modules/babel-polyfill/lib/index.js");

window._ = __webpack_require__("./node_modules/lodash/lodash.js");
window.Popper = __webpack_require__("./node_modules/popper.js/dist/esm/popper.js").default;
window.slick = __webpack_require__("./node_modules/slick-carousel/slick/slick.js");
window.MagnificPopup = __webpack_require__("./node_modules/magnific-popup/dist/jquery.magnific-popup.js");

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__("./node_modules/jquery/dist/jquery.js");
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__("./node_modules/axios/index.js");

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/bootstrap/tooltip.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_popper_js__ = __webpack_require__("./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__("./resources/assets/js/bootstrap/util.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.1): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tooltip';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

    var DefaultType = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)'
    };

    var AttachmentMap = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
    };

    var Default = {
        animation: true,
        template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: 0,
        container: false,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent'
    };

    var HoverState = {
        SHOW: 'show',
        OUT: 'out'
    };

    var Event = {
        HIDE: 'hide' + EVENT_KEY,
        HIDDEN: 'hidden' + EVENT_KEY,
        SHOW: 'show' + EVENT_KEY,
        SHOWN: 'shown' + EVENT_KEY,
        INSERTED: 'inserted' + EVENT_KEY,
        CLICK: 'click' + EVENT_KEY,
        FOCUSIN: 'focusin' + EVENT_KEY,
        FOCUSOUT: 'focusout' + EVENT_KEY,
        MOUSEENTER: 'mouseenter' + EVENT_KEY,
        MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    var ClassName = {
        FADE: 'fade',
        SHOW: 'show'
    };

    var Selector = {
        TOOLTIP: '.tooltip',
        TOOLTIP_INNER: '.tooltip-inner',
        ARROW: '.arrow'
    };

    var Trigger = {
        HOVER: 'hover',
        FOCUS: 'focus',
        CLICK: 'click',
        MANUAL: 'manual'

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };
    var Tooltip = function () {
        function Tooltip(element, config) {
            _classCallCheck(this, Tooltip);

            /**
             * Check for Popper dependency
             * Popper - https://popper.js.org
             */
            if (typeof __WEBPACK_IMPORTED_MODULE_1_popper_js__["default"] === 'undefined') {
                throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
            }

            // private
            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = '';
            this._activeTrigger = {};
            this._popper = null;

            // Protected
            this.element = element;
            this.config = this._getConfig(config);
            this.tip = null;

            this._setListeners();
        }

        // Getters

        _createClass(Tooltip, [{
            key: 'enable',


            // Public

            value: function enable() {
                this._isEnabled = true;
            }
        }, {
            key: 'disable',
            value: function disable() {
                this._isEnabled = false;
            }
        }, {
            key: 'toggleEnabled',
            value: function toggleEnabled() {
                this._isEnabled = !this._isEnabled;
            }
        }, {
            key: 'toggle',
            value: function toggle(event) {
                if (!this._isEnabled) {
                    return;
                }

                if (event) {
                    var dataKey = this.constructor.DATA_KEY;
                    var context = $(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $(event.currentTarget).data(dataKey, context);
                    }

                    context._activeTrigger.click = !context._activeTrigger.click;

                    if (context._isWithActiveTrigger()) {
                        context._enter(null, context);
                    } else {
                        context._leave(null, context);
                    }
                } else {
                    if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
                        this._leave(null, this);
                        return;
                    }

                    this._enter(null, this);
                }
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                clearTimeout(this._timeout);

                $.removeData(this.element, this.constructor.DATA_KEY);

                $(this.element).off(this.constructor.EVENT_KEY);
                $(this.element).closest('.modal').off('hide.bs.modal');

                if (this.tip) {
                    $(this.tip).remove();
                }

                this._isEnabled = null;
                this._timeout = null;
                this._hoverState = null;
                this._activeTrigger = null;
                if (this._popper !== null) {
                    this._popper.destroy();
                }

                this._popper = null;
                this.element = null;
                this.config = null;
                this.tip = null;
            }
        }, {
            key: 'show',
            value: function show() {
                var _this = this;

                if ($(this.element).css('display') === 'none') {
                    throw new Error('Please use show on visible elements');
                }

                var showEvent = $.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    $(this.element).trigger(showEvent);

                    var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

                    if (showEvent.isDefaultPrevented() || !isInTheDom) {
                        return;
                    }

                    var tip = this.getTipElement();
                    var tipId = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].getUID(this.constructor.NAME);

                    tip.setAttribute('id', tipId);
                    this.element.setAttribute('aria-describedby', tipId);

                    this.setContent();

                    if (this.config.animation) {
                        $(tip).addClass(ClassName.FADE);
                    }

                    var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                    var attachment = this._getAttachment(placement);
                    this.addAttachmentClass(attachment);

                    var container = this.config.container === false ? document.body : $(this.config.container);

                    $(tip).data(this.constructor.DATA_KEY, this);

                    if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                        $(tip).appendTo(container);
                    }

                    $(this.element).trigger(this.constructor.Event.INSERTED);

                    this._popper = new __WEBPACK_IMPORTED_MODULE_1_popper_js__["default"](this.element, tip, {
                        placement: attachment,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: Selector.ARROW
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function onCreate(data) {
                            if (data.originalPlacement !== data.placement) {
                                _this._handlePopperPlacementChange(data);
                            }
                        },
                        onUpdate: function onUpdate(data) {
                            _this._handlePopperPlacementChange(data);
                        }
                    });

                    $(tip).addClass(ClassName.SHOW);

                    // If this is a touch-enabled device we add extra
                    // empty mouseover listeners to the body's immediate children;
                    // only needed because of broken event delegation on iOS
                    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
                    if ('ontouchstart' in document.documentElement) {
                        $(document.body).children().on('mouseover', null, $.noop);
                    }

                    var complete = function complete() {
                        if (_this.config.animation) {
                            _this._fixTransition();
                        }
                        var prevHoverState = _this._hoverState;
                        _this._hoverState = null;

                        $(_this.element).trigger(_this.constructor.Event.SHOWN);

                        if (prevHoverState === HoverState.OUT) {
                            _this._leave(null, _this);
                        }
                    };

                    if ($(this.tip).hasClass(ClassName.FADE)) {
                        var transitionDuration = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].getTransitionDurationFromElement(this.tip);

                        $(this.tip).one(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                    } else {
                        complete();
                    }
                }
            }
        }, {
            key: 'hide',
            value: function hide(callback) {
                var _this2 = this;

                var tip = this.getTipElement();
                var hideEvent = $.Event(this.constructor.Event.HIDE);
                var complete = function complete() {
                    if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
                        tip.parentNode.removeChild(tip);
                    }

                    _this2._cleanTipClass();
                    _this2.element.removeAttribute('aria-describedby');
                    $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
                    if (_this2._popper !== null) {
                        _this2._popper.destroy();
                    }

                    if (callback) {
                        callback();
                    }
                };

                $(this.element).trigger(hideEvent);

                if (hideEvent.isDefaultPrevented()) {
                    return;
                }

                $(tip).removeClass(ClassName.SHOW);

                // If this is a touch-enabled device we remove the extra
                // empty mouseover listeners we added for iOS support
                if ('ontouchstart' in document.documentElement) {
                    $(document.body).children().off('mouseover', null, $.noop);
                }

                this._activeTrigger[Trigger.CLICK] = false;
                this._activeTrigger[Trigger.FOCUS] = false;
                this._activeTrigger[Trigger.HOVER] = false;

                if ($(this.tip).hasClass(ClassName.FADE)) {
                    var transitionDuration = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].getTransitionDurationFromElement(tip);

                    $(tip).one(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                    complete();
                }

                this._hoverState = '';
            }
        }, {
            key: 'update',
            value: function update() {
                if (this._popper !== null) {
                    this._popper.scheduleUpdate();
                }
            }

            // Protected

        }, {
            key: 'isWithContent',
            value: function isWithContent() {
                return Boolean(this.getTitle());
            }
        }, {
            key: 'addAttachmentClass',
            value: function addAttachmentClass(attachment) {
                $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
            }
        }, {
            key: 'getTipElement',
            value: function getTipElement() {
                this.tip = this.tip || $(this.config.template)[0];
                return this.tip;
            }
        }, {
            key: 'setContent',
            value: function setContent() {
                var $tip = $(this.getTipElement());
                this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
                $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
            }
        }, {
            key: 'setElementContent',
            value: function setElementContent($element, content) {
                var html = this.config.html;
                if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
                    // Content is a DOM node or a jQuery
                    if (html) {
                        if (!$(content).parent().is($element)) {
                            $element.empty().append(content);
                        }
                    } else {
                        $element.text($(content).text());
                    }
                } else {
                    $element[html ? 'html' : 'text'](content);
                }
            }
        }, {
            key: 'getTitle',
            value: function getTitle() {
                var title = this.element.getAttribute('data-original-title');

                if (!title) {
                    title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
                }

                return title;
            }

            // Private

        }, {
            key: '_getAttachment',
            value: function _getAttachment(placement) {
                return AttachmentMap[placement.toUpperCase()];
            }
        }, {
            key: '_setListeners',
            value: function _setListeners() {
                var _this3 = this;

                var triggers = this.config.trigger.split(' ');

                triggers.forEach(function (trigger) {
                    if (trigger === 'click') {
                        $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
                            return _this3.toggle(event);
                        });
                    } else if (trigger !== Trigger.MANUAL) {
                        var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
                        var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

                        $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
                            return _this3._enter(event);
                        }).on(eventOut, _this3.config.selector, function (event) {
                            return _this3._leave(event);
                        });
                    }

                    $(_this3.element).closest('.modal').on('hide.bs.modal', function () {
                        return _this3.hide();
                    });
                });

                if (this.config.selector) {
                    this.config = _extends({}, this.config, {
                        trigger: 'manual',
                        selector: ''
                    });
                } else {
                    this._fixTitle();
                }
            }
        }, {
            key: '_fixTitle',
            value: function _fixTitle() {
                var titleType = _typeof(this.element.getAttribute('data-original-title'));
                if (this.element.getAttribute('title') || titleType !== 'string') {
                    this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                    this.element.setAttribute('title', '');
                }
            }
        }, {
            key: '_enter',
            value: function _enter(event, context) {
                var dataKey = this.constructor.DATA_KEY;

                context = context || $(event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }

                if (event) {
                    context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
                }

                if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
                    context._hoverState = HoverState.SHOW;
                    return;
                }

                clearTimeout(context._timeout);

                context._hoverState = HoverState.SHOW;

                if (!context.config.delay || !context.config.delay.show) {
                    context.show();
                    return;
                }

                context._timeout = setTimeout(function () {
                    if (context._hoverState === HoverState.SHOW) {
                        context.show();
                    }
                }, context.config.delay.show);
            }
        }, {
            key: '_leave',
            value: function _leave(event, context) {
                var dataKey = this.constructor.DATA_KEY;

                context = context || $(event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }

                if (event) {
                    context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
                }

                if (context._isWithActiveTrigger()) {
                    return;
                }

                clearTimeout(context._timeout);

                context._hoverState = HoverState.OUT;

                if (!context.config.delay || !context.config.delay.hide) {
                    context.hide();
                    return;
                }

                context._timeout = setTimeout(function () {
                    if (context._hoverState === HoverState.OUT) {
                        context.hide();
                    }
                }, context.config.delay.hide);
            }
        }, {
            key: '_isWithActiveTrigger',
            value: function _isWithActiveTrigger() {
                for (var trigger in this._activeTrigger) {
                    if (this._activeTrigger[trigger]) {
                        return true;
                    }
                }

                return false;
            }
        }, {
            key: '_getConfig',
            value: function _getConfig(config) {
                config = _extends({}, this.constructor.Default, $(this.element).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config ? config : {});

                if (typeof config.delay === 'number') {
                    config.delay = {
                        show: config.delay,
                        hide: config.delay
                    };
                }

                if (typeof config.title === 'number') {
                    config.title = config.title.toString();
                }

                if (typeof config.content === 'number') {
                    config.content = config.content.toString();
                }

                __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].typeCheckConfig(NAME, config, this.constructor.DefaultType);

                return config;
            }
        }, {
            key: '_getDelegateConfig',
            value: function _getDelegateConfig() {
                var config = {};

                if (this.config) {
                    for (var key in this.config) {
                        if (this.constructor.Default[key] !== this.config[key]) {
                            config[key] = this.config[key];
                        }
                    }
                }

                return config;
            }
        }, {
            key: '_cleanTipClass',
            value: function _cleanTipClass() {
                var $tip = $(this.getTipElement());
                var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
                if (tabClass !== null && tabClass.length > 0) {
                    $tip.removeClass(tabClass.join(''));
                }
            }
        }, {
            key: '_handlePopperPlacementChange',
            value: function _handlePopperPlacementChange(data) {
                this._cleanTipClass();
                this.addAttachmentClass(this._getAttachment(data.placement));
            }
        }, {
            key: '_fixTransition',
            value: function _fixTransition() {
                var tip = this.getTipElement();
                var initConfigAnimation = this.config.animation;
                if (tip.getAttribute('x-placement') !== null) {
                    return;
                }
                $(tip).removeClass(ClassName.FADE);
                this.config.animation = false;
                this.hide();
                this.show();
                this.config.animation = initConfigAnimation;
            }

            // Static

        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                return this.each(function () {
                    var data = $(this).data(DATA_KEY);
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

                    if (!data && /dispose|hide/.test(config)) {
                        return;
                    }

                    if (!data) {
                        data = new Tooltip(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError('No method named "' + config + '"');
                        }
                        data[config]();
                    }
                });
            }
        }, {
            key: 'VERSION',
            get: function get() {
                return VERSION;
            }
        }, {
            key: 'Default',
            get: function get() {
                return Default;
            }
        }, {
            key: 'NAME',
            get: function get() {
                return NAME;
            }
        }, {
            key: 'DATA_KEY',
            get: function get() {
                return DATA_KEY;
            }
        }, {
            key: 'Event',
            get: function get() {
                return Event;
            }
        }, {
            key: 'EVENT_KEY',
            get: function get() {
                return EVENT_KEY;
            }
        }, {
            key: 'DefaultType',
            get: function get() {
                return DefaultType;
            }
        }]);

        return Tooltip;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tooltip._jQueryInterface;
    };

    return Tooltip;
}(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a, __WEBPACK_IMPORTED_MODULE_1_popper_js__["default"]);

/* unused harmony default export */ var _unused_webpack_default_export = (Tooltip);

/***/ }),

/***/ "./resources/assets/js/bootstrap/util.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.1): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000;

    // Shoutout AngusCroll (https://goo.gl/pxwQGp)
    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
        return {
            bindType: TRANSITION_END,
            delegateType: TRANSITION_END,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                }
                return undefined; // eslint-disable-line no-undefined
            }
        };
    }

    function transitionEndEmulator(duration) {
        var _this = this;

        var called = false;

        $(this).one(Util.TRANSITION_END, function () {
            called = true;
        });

        setTimeout(function () {
            if (!called) {
                Util.triggerTransitionEnd(_this);
            }
        }, duration);

        return this;
    }

    function setTransitionEndSupport() {
        $.fn.emulateTransitionEnd = transitionEndEmulator;
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {

        TRANSITION_END: 'bsTransitionEnd',

        getUID: function getUID(prefix) {
            do {
                // eslint-disable-next-line no-bitwise
                prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
            } while (document.getElementById(prefix));
            return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');
            if (!selector || selector === '#') {
                selector = element.getAttribute('href') || '';
            }

            try {
                var $selector = $(document).find(selector);
                return $selector.length > 0 ? selector : null;
            } catch (err) {
                return null;
            }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
            if (!element) {
                return 0;
            }

            // Get transition-duration of the element
            var transitionDuration = $(element).css('transition-duration');
            var floatTransitionDuration = parseFloat(transitionDuration);

            // Return 0 if element or transition duration is not found
            if (!floatTransitionDuration) {
                return 0;
            }

            // If multiple durations are defined, take the first
            transitionDuration = transitionDuration.split(',')[0];

            return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
        },
        reflow: function reflow(element) {
            return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(TRANSITION_END);
        },


        // TODO: Remove in v5
        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
                if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                    var expectedTypes = configTypes[property];
                    var value = config[property];
                    var valueType = value && Util.isElement(value) ? 'element' : toType(value);

                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
                    }
                }
            }
        }
    };

    setTransitionEndSupport();

    return Util;
}(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ }),

/***/ "./resources/assets/js/common.js":
/***/ (function(module, exports) {

window.isHighDensity = function () {
    var isHighDensity = window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches) || window.devicePixelRatio && window.devicePixelRatio > 1.3;

    return function () {
        return isHighDensity;
    };
}();

window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.declOfNum = function (value, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];
};

/***/ }),

/***/ "./resources/assets/js/components/AnimatedSymbolChange.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/AnimatedSymbolChange.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-66d38c3c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/AnimatedSymbolChange.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/AnimatedSymbolChange.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66d38c3c", Component.options)
  } else {
    hotAPI.reload("data-v-66d38c3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/CitiesSelect.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/CitiesSelect.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-488738dc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/CitiesSelect.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/CitiesSelect.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-488738dc", Component.options)
  } else {
    hotAPI.reload("data-v-488738dc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/HeaderBanner.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/HeaderBanner.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6d3ecd50\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/HeaderBanner.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/HeaderBanner.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d3ecd50", Component.options)
  } else {
    hotAPI.reload("data-v-6d3ecd50", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/LabelValueTable.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/LabelValueTable.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-91cd44ec\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/LabelValueTable.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/LabelValueTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-91cd44ec", Component.options)
  } else {
    hotAPI.reload("data-v-91cd44ec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/Loading.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Loading.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3373ff55\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Loading.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Loading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3373ff55", Component.options)
  } else {
    hotAPI.reload("data-v-3373ff55", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/NumControl.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/NumControl.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2e2c68ee\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/NumControl.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/NumControl.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e2c68ee", Component.options)
  } else {
    hotAPI.reload("data-v-2e2c68ee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/Rating.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Rating.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-23d53014\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Rating.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Rating.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23d53014", Component.options)
  } else {
    hotAPI.reload("data-v-23d53014", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/ScrollContainer.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/ScrollContainer.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-89c0a566\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/ScrollContainer.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/ScrollContainer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-89c0a566", Component.options)
  } else {
    hotAPI.reload("data-v-89c0a566", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/SidePopup.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/SidePopup.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-72d24eee\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/SidePopup.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/SidePopup.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72d24eee", Component.options)
  } else {
    hotAPI.reload("data-v-72d24eee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/Tabs.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Tabs.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-971a3596\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Tabs.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Tabs.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-971a3596", Component.options)
  } else {
    hotAPI.reload("data-v-971a3596", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/TabsHtml.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/TabsHtml.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-41702600\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/TabsHtml.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/TabsHtml.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41702600", Component.options)
  } else {
    hotAPI.reload("data-v-41702600", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/Timer.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Timer.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4a91651e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Timer.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Timer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a91651e", Component.options)
  } else {
    hotAPI.reload("data-v-4a91651e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/banners/Banner.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/Banner.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5615b12a\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/banners/Banner.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/banners/Banner.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5615b12a", Component.options)
  } else {
    hotAPI.reload("data-v-5615b12a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/banners/BannerHomeNew.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/BannerHomeNew.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-12d313f4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/banners/BannerHomeNew.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/banners/BannerHomeNew.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12d313f4", Component.options)
  } else {
    hotAPI.reload("data-v-12d313f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/banners/BannerHomeStock.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/BannerHomeStock.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-58dcdcfc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/banners/BannerHomeStock.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/banners/BannerHomeStock.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58dcdcfc", Component.options)
  } else {
    hotAPI.reload("data-v-58dcdcfc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/banners/BannerRandom.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/banners/BannerRandom.vue")
/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/banners/BannerRandom.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bec0b6e4", Component.options)
  } else {
    hotAPI.reload("data-v-bec0b6e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/banners/banners.json":
/***/ (function(module, exports) {

module.exports = [{"id":1,"title":"Стань поставщиком для Mossebo.Market","link":"/dlya-postavshhikov/","image":"/assets/images/tmp/banner_action.png"},{"id":2,"title":"Скидки на стулья до 30%!","link":"/catalog/kresla","image":"/assets/images/tmp/banner_test.png","gradient-from":"#F5515F","gradient-to":"#9F041B","gradient-angle":120},{"id":3,"title":"Дизайн интерьера <br>от Mossebo","button-text":"Заказать","link":"https://mossebo.studio/","image":"/assets/images/tmp/banner_new.png","gradient-from":"#aabed6","gradient-to":"#bce3f0"}]

/***/ }),

/***/ "./resources/assets/js/components/buttons/ButtonLoading.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/buttons/ButtonLoading.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3dc6dbf5\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/buttons/ButtonLoading.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/buttons/ButtonLoading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3dc6dbf5", Component.options)
  } else {
    hotAPI.reload("data-v-3dc6dbf5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-18d6f266\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18d6f266", Component.options)
  } else {
    hotAPI.reload("data-v-18d6f266", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/imageLoaders/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        image: null,
        retinaImage: null,
        screen: {
            type: Boolean,
            default: false
        },
        offset: {
            type: Number,
            default: 1000
        },
        index: Number,
        reset: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            loaded: false,
            animate: false,
            empty: false,
            // todo: протестировать в ie
            image$: ''
        };
    },
    created: function created() {
        this.init();
    },
    beforeDestroy: function beforeDestroy() {
        this.unbindEvents();
    },


    methods: {
        isLoaded: function isLoaded(elImg) {
            if (!elImg.complete) {
                return false;
            }

            if (typeof elImg.naturalWidth !== 'undefined' && elImg.naturalWidth === 0) {
                return false;
            }

            return true;
        },
        onLoad: function onLoad(elImg, cb) {
            if (typeof cb !== 'function') return;

            if (this.isLoaded(elImg)) {
                if (this.reset) {
                    this.animate = true;
                } else {
                    this.animate = false;
                }

                cb();
            } else {
                this.animate = true;

                var onLoad = function onLoad() {
                    elImg.removeEventListener('load', onLoad);
                    cb();
                };

                elImg.addEventListener('load', onLoad);
            }
        },
        getResponsiveImage: function getResponsiveImage() {
            if (isHighDensity() && _.isString(this.retinaImage)) {
                return this.retinaImage;
            }

            return _.isString(this.image) ? this.image : this.image$;
        },
        load: function load() {
            var _this = this;

            var image = this.getResponsiveImage();

            if (!image) {
                this.loaded = true;
                this.empty = true;
                return;
            }

            var elImg = document.createElement('img');
            elImg.src = image;

            this.onLoad(elImg, function () {
                _this.loaded = true;
                _this.image$ = elImg.src;
            });
        },
        isNeedToShow: function isNeedToShow() {
            var screenHeight = document.documentElement.clientHeight;
            var coordinates = this.$el.getBoundingClientRect();

            if (coordinates.top - screenHeight - this.offset > 0) {
                return false;
            }

            if (coordinates.top + this.$el.scrollHeight + this.offset < 0) {
                return false;
            }

            return true;
        },
        bindEvents: function bindEvents() {
            var _this2 = this;

            this.handler = _.throttle(function () {
                if (_this2.isNeedToShow()) {
                    _this2.load();
                    _this2.unbindEvents();
                }
            });

            window.addEventListener('scroll', this.handler, { passive: true });
            document.addEventListener('DOMSubtreeModified', this.handler);
        },
        unbindEvents: function unbindEvents() {
            if (!this.handler) return;

            window.removeEventListener('scroll', this.handler);
            document.removeEventListener('DOMSubtreeModified', this.handler);

            this.handler = false;
        },
        init: function init() {
            var _this3 = this;

            if (this.loaded || this.handler) return;

            this.$nextTick(function () {
                if (!screen || _this3.isNeedToShow()) {
                    _this3.load();
                } else {
                    _this3.bindEvents();
                }
            });
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/ProductShortDescription.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/ProductShortDescription.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4e83b566\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/ProductShortDescription.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/ProductShortDescription.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e83b566", Component.options)
  } else {
    hotAPI.reload("data-v-4e83b566", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cabinet/Cabinet.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cabinet/Cabinet.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5424d202\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cabinet/Cabinet.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/cabinet/Cabinet.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5424d202", Component.options)
  } else {
    hotAPI.reload("data-v-5424d202", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cart/Cart.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/Cart.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-303c3bcd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/Cart.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/cart/Cart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-303c3bcd", Component.options)
  } else {
    hotAPI.reload("data-v-303c3bcd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cart/CartBtn.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/CartBtn.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4f8c297f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/CartBtn.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/cart/CartBtn.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f8c297f", Component.options)
  } else {
    hotAPI.reload("data-v-4f8c297f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cart/CartTable.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/CartTable.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-42336731\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/CartTable.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/cart/CartTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42336731", Component.options)
  } else {
    hotAPI.reload("data-v-42336731", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cart/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CartTable__ = __webpack_require__("./resources/assets/js/components/shop/cart/CartTable.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CartTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CartTable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__price_FormattedPrice__ = __webpack_require__("./resources/assets/js/components/shop/price/FormattedPrice.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__price_FormattedPrice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__price_FormattedPrice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Loading__ = __webpack_require__("./resources/assets/js/components/Loading.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Loading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scripts_PendingLoader__ = __webpack_require__("./resources/assets/js/scripts/PendingLoader.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        CartTable: __WEBPACK_IMPORTED_MODULE_1__CartTable___default.a,
        FormattedPrice: __WEBPACK_IMPORTED_MODULE_2__price_FormattedPrice___default.a,
        Loading: __WEBPACK_IMPORTED_MODULE_3__components_Loading___default.a
    },

    data: function data() {
        return {
            loading$: false,
            pendingLoader: false
        };
    },


    watch: {
        loading: function loading() {
            // если ответ с сервера приходит менее чем за 200мс - никакой анимации загрузки не будет.
            // если больше - включается загрузка, которая продлится не менее чем 300мс, чтобы избежать мигания.
            if (this.loading) {
                this.startLoadingDebounce();
            } else {
                this.stopLoadingDebounce();
            }
        }
    },

    created: function created() {
        var _this = this;

        this.$store.dispatch('cart/init');

        this.startLoadingDebounce = _.debounce(function () {
            _this.startInnerLoading();
        }, 200);

        this.stopLoadingDebounce = _.debounce(function () {
            _this.stopInnerLoading();
        }, 200);
    },


    methods: {
        refresh: function refresh() {
            this.$store.dispatch('cart/refresh');
        },
        startInnerLoading: function startInnerLoading() {
            if (!this.loading) return;
            if (this.pendingLoader !== false) {
                this.pendingLoader.cancel();
            }
            this.pendingLoader = new __WEBPACK_IMPORTED_MODULE_4__scripts_PendingLoader__["a" /* default */](300);
            this.loading$ = true;
        },
        stopInnerLoading: function stopInnerLoading() {
            var _this2 = this;

            if (this.loading) return;
            if (this.pendingLoader === false) return;

            this.pendingLoader.finish(function () {
                _this2.loading$ = false;
                _this2.pendingLoader = false;
            });
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        productsQuantity: 'cart/quantity',
        isEmpty: 'cart/isEmpty'
    }), Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        loading: function loading(state) {
            return state.cart.loading;
        },
        hasError: function hasError(state) {
            return state.cart.error;
        },
        isReady: function isReady(state) {
            return state.cart.ready;
        },
        productsPrice: function productsPrice(state, getters) {
            return getters['cart/products'].reduce(function (acc, product) {
                acc += product.quantity * product.price;

                return acc;
            }, 0);
        }
    }), {
        shippingPrice: function shippingPrice() {
            return 0;
        },
        totalPrice: function totalPrice() {
            return this.productsPrice + this.shippingPrice;
        }
    })
});

/***/ }),

/***/ "./resources/assets/js/components/shop/cart/product/CartProductItem.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/product/CartProductItem.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1f236cb6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/product/CartProductItem.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/cart/product/CartProductItem.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f236cb6", Component.options)
  } else {
    hotAPI.reload("data-v-1f236cb6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cart/product/CartProductRow.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/cart/product/CartProductRow.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-37150a90\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/cart/product/CartProductRow.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/cart/product/CartProductRow.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37150a90", Component.options)
  } else {
    hotAPI.reload("data-v-37150a90", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/cart/product/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__price_FormattedPrice__ = __webpack_require__("./resources/assets/js/components/shop/price/FormattedPrice.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__price_FormattedPrice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__price_FormattedPrice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NumControl__ = __webpack_require__("./resources/assets/js/components/NumControl.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NumControl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__NumControl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProductShortDescription__ = __webpack_require__("./resources/assets/js/components/shop/ProductShortDescription.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProductShortDescription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ProductShortDescription__);




/* harmony default export */ __webpack_exports__["a"] = ({

    components: {
        FormattedPrice: __WEBPACK_IMPORTED_MODULE_0__price_FormattedPrice___default.a,
        NumControl: __WEBPACK_IMPORTED_MODULE_1__NumControl___default.a,
        ProductShortDescription: __WEBPACK_IMPORTED_MODULE_2__ProductShortDescription___default.a
    },

    props: {
        product: Object,
        small: Boolean,
        noControls: Boolean
    },

    data: function data() {
        return {
            /**
             * интервал, нужный для обработки зажимания кнопок +/-
             */
            quantityFlowInterval: null,

            /**
             * таймаут, который увеличивает запускает интервал,
             * чтобы при единичном клике не было изменения количества товаров на несколько шт.
             */
            quantityFlowTimeout: null
        };
    },


    methods: {
        remove: function remove() {
            this.$store.dispatch('cart/removeProduct', this.product);
            // this.$emit('remove', this)
        },
        getDescEl: function getDescEl(e) {
            return e.target.closest('.js-product-description');
        },
        changeQty: function changeQty(qty) {
            this.$store.dispatch('cart/updateProduct', [this.product, qty]);
        }
    },

    computed: {
        totalPrice: function totalPrice() {
            return this.product.quantity * this.product.price;
        },
        isGhost: function isGhost() {
            return this.product.quantity === 0;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/CardTypesChanger.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/CardTypesChanger.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-00fec501\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/CardTypesChanger.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/CardTypesChanger.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00fec501", Component.options)
  } else {
    hotAPI.reload("data-v-00fec501", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/Catalog.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/Catalog.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4bef3081\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/Catalog.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/Catalog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4bef3081", Component.options)
  } else {
    hotAPI.reload("data-v-4bef3081", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/ProductList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/ProductList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-309ae095\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/ProductList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/ProductList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-309ae095", Component.options)
  } else {
    hotAPI.reload("data-v-309ae095", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c493efec\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/banner/CatalogBanner.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c493efec", Component.options)
  } else {
    hotAPI.reload("data-v-c493efec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0280c0bc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/filter/CatalogFilter.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0280c0bc", Component.options)
  } else {
    hotAPI.reload("data-v-0280c0bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6a14bf40\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a14bf40", Component.options)
  } else {
    hotAPI.reload("data-v-6a14bf40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/filter/CatalogFilterOption.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterOption.vue")
/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/filter/CatalogFilterOption.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f215237", Component.options)
  } else {
    hotAPI.reload("data-v-5f215237", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-60a06077\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/filter/CatalogFilterPrice.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60a06077", Component.options)
  } else {
    hotAPI.reload("data-v-60a06077", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/filter/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CatalogFilterList__ = __webpack_require__("./resources/assets/js/components/shop/catalog/filter/CatalogFilterList.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CatalogFilterList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CatalogFilterList__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        CatalogFilterList: __WEBPACK_IMPORTED_MODULE_0__CatalogFilterList___default.a
    },

    data: function data() {
        return {
            filters$: [],
            filtersIsDirty: false
        };
    },


    methods: {
        checkProduct: function checkProduct(product) {
            var filters = this.getFilterComponents();
            var group = false;
            var flag = true;

            for (var i = 0; i < filters.length; i++) {
                var filter = filters[i];

                if (!filter.checkProduct(product)) {
                    if (flag) {
                        flag = false;
                        group = filter;
                    } else {
                        group = false;
                        break;
                    }
                }
            }

            if (group) {
                group.prepareActiveOptions(product);
            }

            return flag;
        },
        filterProducts: function filterProducts(products) {
            var _this = this;

            if (this.filters.length === 0) {
                return [].concat(_toConsumableArray(products));
            } else {
                return products.filter(function (product) {
                    return _this.checkProduct(product);
                });
            }
        },
        applyActiveOptions: function applyActiveOptions() {
            var _this2 = this;

            this.$nextTick(function () {
                if (_this2.productsThatCanBeShown.length === 0) return;

                _this2.getFilterComponents().forEach(function (filterComponent) {
                    _this2.productsThatCanBeShown.forEach(function (product) {
                        filterComponent.prepareActiveOptions(product);
                    });

                    if (filterComponent.isDirty()) {
                        _this2.filtersIsDirty = true;
                    }

                    filterComponent.applyActiveOptions(_this2.lastFilterName);
                    _this2.lastFilterName = false;
                });
            });
        },
        getFilterComponents: function getFilterComponents() {
            return this.$refs.filters ? this.$refs.filters.getFiltersArray() : [];
        },
        clearFilters: function clearFilters() {
            if (!this.filtersIsDirty) return;

            this.getFilterComponents().forEach(function (component) {
                component.clear();
            });

            this.filtersIsDirty = false;

            this.$root.$emit('filterChanged');
        }
    },

    computed: {
        prices: function prices() {
            if (this.products$.length === 0) {
                return false;
            }

            return this.products$.reduce(function (acc, product) {
                if (product.price < acc[0]) {
                    acc[0] = product.price;
                }

                if (product.price > acc[1]) {
                    acc[1] = product.price;
                }

                return acc;
            }, [this.products$[0].price, this.products$[0].price]);
        },
        allPresentedOptions: function allPresentedOptions() {
            return this.products$.reduce(function (acc, product) {
                (product.options || []).forEach(function (optionId) {
                    if (acc.indexOf(optionId) === -1) {
                        acc.push(optionId);
                    }
                });

                return acc;
            }, []);
        },
        filters: function filters() {
            var _this3 = this;

            var filters = this.filters$.reduce(function (acc, filter) {
                var options = (filter.options || []).reduce(function (acc, option) {
                    if (_this3.allPresentedOptions.indexOf(option.id) !== -1) {
                        acc.push(option);
                    }

                    return acc;
                }, []);

                if (options.length > 1) {
                    acc.push(_extends({}, filter, {
                        options: _.orderBy(options, 'position')
                    }));
                }

                return acc;
            }, []);

            return _.orderBy(filters, 'position');
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-445f48fd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/product-cards/ProductCard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-445f48fd", Component.options)
  } else {
    hotAPI.reload("data-v-445f48fd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-a07dc9ce\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/product-cards/ProductCardLong.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a07dc9ce", Component.options)
  } else {
    hotAPI.reload("data-v-a07dc9ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-a7a91602\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/product-cards/ProductCardMobile.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a7a91602", Component.options)
  } else {
    hotAPI.reload("data-v-a7a91602", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c2679138\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/product-cards/ProductCardSale.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c2679138", Component.options)
  } else {
    hotAPI.reload("data-v-c2679138", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-cards/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_core_index__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__price_FormattedPrice__ = __webpack_require__("./resources/assets/js/components/shop/price/FormattedPrice.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__price_FormattedPrice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__price_FormattedPrice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader__ = __webpack_require__("./resources/assets/js/components/imageLoaders/BackgroundImageLoader.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_ProductImagesHat__ = __webpack_require__("./resources/assets/js/mixins/ProductImagesHat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rating__ = __webpack_require__("./resources/assets/js/components/Rating.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rating___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Rating__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__product_ProductActions__ = __webpack_require__("./resources/assets/js/components/shop/product/ProductActions.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__product_ProductActions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__product_ProductActions__);







/* harmony default export */ __webpack_exports__["a"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_ProductImagesHat__["a" /* default */]],

    components: {
        FormattedPrice: __WEBPACK_IMPORTED_MODULE_1__price_FormattedPrice___default.a,
        BackgroundImageLoader: __WEBPACK_IMPORTED_MODULE_2__imageLoaders_BackgroundImageLoader___default.a,
        Rating: __WEBPACK_IMPORTED_MODULE_4__Rating___default.a,
        ProductActions: __WEBPACK_IMPORTED_MODULE_5__product_ProductActions___default.a
    },

    props: ['product'],

    methods: {},

    computed: {
        link: function link() {
            return __WEBPACK_IMPORTED_MODULE_0__scripts_core_index__["a" /* default */].siteUrl('goods/' + this.product.id);
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-57e64c2f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-57e64c2f\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-57e64c2f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57e64c2f", Component.options)
  } else {
    hotAPI.reload("data-v-57e64c2f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/product-list/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CatalogProductList__ = __webpack_require__("./resources/assets/js/components/shop/catalog/product-list/CatalogProductList.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CatalogProductList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CatalogProductList__);




/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        CatalogProductList: __WEBPACK_IMPORTED_MODULE_1__CatalogProductList___default.a
    },

    // todo: разобраться с таймаутом

    data: function data() {
        var _this = this;

        return {
            page: 1,
            perPage: 12,

            moreBtn: {
                query: '.js-more-btn',
                eventBinded: false,
                scrollHandler: _.throttle(function () {
                    if (_this.canAutoclickMoreBtn()) {
                        _this.more();
                    }
                }, 300)
            }

        };
    },
    beforeDestroy: function beforeDestroy() {
        this.unbindScrollMoreEvent();

        if (this.productsLoading.inProcess) {
            this.productsLoading.handler.cancel();
        }
    },


    methods: {
        more: function more() {
            this.page++;

            this.calculateProductsToShowThrottler();
        },
        bindScrollMoreEvent: function bindScrollMoreEvent() {
            var _this2 = this;

            if (this.moreBtn.eventBinded || this.productsToShowCalculateInProcess || !this.moreBtnIsVisible) return;

            window.addEventListener('scroll', this.moreBtn.scrollHandler, { passive: true });

            this.$nextTick(function () {
                _this2.moreBtn.scrollHandler();
            });

            this.moreBtn.eventBinded = true;
        },
        unbindScrollMoreEvent: function unbindScrollMoreEvent() {
            if (this.moreBtn.eventBinded === false) return;

            window.removeEventListener('scroll', this.moreBtn.scrollHandler);
            this.moreBtn.eventBinded = false;
        },
        canAutoclickMoreBtn: function canAutoclickMoreBtn() {
            var moreBtn = this.$el.querySelector(this.moreBtn.query);

            if (moreBtn) {
                var screenHeight = document.documentElement.clientHeight;
                var coordinates = moreBtn.getBoundingClientRect();

                if (coordinates.top - screenHeight - 500 < 0) {
                    return true;
                }
            }

            return false;
        }
    },

    computed: {
        moreBtnIsVisible: function moreBtnIsVisible() {
            return this.productsToShow.length < this.productsThatCanBeShown.length;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/catalog/sort/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            sortTypes: {
                popular: 'Популярное',
                new: 'Новинки',
                discount: 'Скидки',
                name: 'Название'
            },

            activeSortType: false
        };
    },
    created: function created() {
        this.setActiveSortType();
    },


    methods: {
        setActiveSortType: function setActiveSortType(type) {
            if (type && typeof this.sortTypes[type] !== 'undefined') {
                this.activeSortType = type;
            } else {
                this.activeSortType = Object.keys(this.sortTypes)[0];
            }
        },


        /**
         * Сортировка по популярности.
         *
         * @param products
         * @returns {Array}
         */
        sortPopular: function sortPopular(products) {
            return _.orderBy(products, ['popular', 'id']);
        },


        /**
         * Сортировка по новинкам.
         *
         * @param products
         * @returns {Array}
         */
        sortNew: function sortNew(products) {
            return _.orderBy(products, ['new', 'id']);
        },


        /**
         * Сортировка по названию.
         *
         * @param products
         * @returns {Array}
         */
        sortName: function sortName(products) {
            return _.orderBy(products, ['name', 'id']);
        },


        /**
         * Сортировка по скидке.
         *
         * @param products
         * @returns {Array}
         */
        sortDiscount: function sortDiscount(products) {
            return _.orderBy(products, ['old_price', 'id']);
        },
        sortProducts: function sortProducts(products) {
            if (!this.activeSortType) {
                return products;
            }

            var methodName = 'sort' + _.upperFirst(_.camelCase(this.activeSortType));

            if (methodName in this) {
                return this[methodName]([].concat(_toConsumableArray(products)));
            }

            return products;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/Checkout.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/Checkout.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1fb01de6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/Checkout.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/Checkout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fb01de6", Component.options)
  } else {
    hotAPI.reload("data-v-1fb01de6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-9b1995a8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9b1995a8", Component.options)
  } else {
    hotAPI.reload("data-v-9b1995a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-16397c24\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/panels/CheckoutStepsPanelMobile.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16397c24", Component.options)
  } else {
    hotAPI.reload("data-v-16397c24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/panels/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])({
        steps: function steps(state) {
            return state.checkout.steps;
        }
    }))
});

/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-fa20a3be\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fa20a3be", Component.options)
  } else {
    hotAPI.reload("data-v-fa20a3be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-339b10e1\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/steps/CheckoutStepCart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-339b10e1", Component.options)
  } else {
    hotAPI.reload("data-v-339b10e1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5e155676\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/steps/CheckoutStepConfirmation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e155676", Component.options)
  } else {
    hotAPI.reload("data-v-5e155676", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ed17cc24\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/steps/CheckoutStepPayments.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ed17cc24", Component.options)
  } else {
    hotAPI.reload("data-v-ed17cc24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e3708022\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/checkout/steps/CheckoutStepShipping.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e3708022", Component.options)
  } else {
    hotAPI.reload("data-v-e3708022", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/checkout/steps/mixin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CheckoutStep__ = __webpack_require__("./resources/assets/js/components/shop/checkout/steps/CheckoutStep.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CheckoutStep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CheckoutStep__);


/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        CheckoutStep: __WEBPACK_IMPORTED_MODULE_0__CheckoutStep___default.a
    },

    methods: {
        toStep: function toStep(stepName) {
            this.$store.dispatch('checkout/set', stepName);
        },
        prevStep: function prevStep() {
            this.$store.dispatch('checkout/prev');
        },
        nextStep: function nextStep() {
            this.$store.dispatch('checkout/next');
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/components/shop/confirmation/Confirmation.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/confirmation/Confirmation.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-f01daa26\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/confirmation/Confirmation.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/confirmation/Confirmation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f01daa26", Component.options)
  } else {
    hotAPI.reload("data-v-f01daa26", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-525dfd50\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/confirmation/ConfirmationBlock.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-525dfd50", Component.options)
  } else {
    hotAPI.reload("data-v-525dfd50", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/payment/Payment.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/payment/Payment.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ec80cb4a\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/payment/Payment.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/payment/Payment.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ec80cb4a", Component.options)
  } else {
    hotAPI.reload("data-v-ec80cb4a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/payment/PaymentItemInfo.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/payment/PaymentItemInfo.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4bbcf55c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/payment/PaymentItemInfo.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/payment/PaymentItemInfo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4bbcf55c", Component.options)
  } else {
    hotAPI.reload("data-v-4bbcf55c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/price/FormattedPrice.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/price/FormattedPrice.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6dbffd05\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/price/FormattedPrice.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/price/FormattedPrice.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6dbffd05", Component.options)
  } else {
    hotAPI.reload("data-v-6dbffd05", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/product/ProductActions.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/product/ProductActions.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4e6e2fc0\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/product/ProductActions.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/product/ProductActions.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e6e2fc0", Component.options)
  } else {
    hotAPI.reload("data-v-4e6e2fc0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/product/ProductControls.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/product/ProductControls.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-da21edfa\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/product/ProductControls.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/product/ProductControls.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-da21edfa", Component.options)
  } else {
    hotAPI.reload("data-v-da21edfa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/sale/ProductSale.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/sale/ProductSale.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-30179e40\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/sale/ProductSale.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/sale/ProductSale.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30179e40", Component.options)
  } else {
    hotAPI.reload("data-v-30179e40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/shop/shipping/Shipping.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/shop/shipping/Shipping.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4d0533e6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/shop/shipping/Shipping.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shop/shipping/Shipping.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d0533e6", Component.options)
  } else {
    hotAPI.reload("data-v-4d0533e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/core/svg4everybody.legacy.min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a, b) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return a.svg4everybody = b();
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = b() : a.svg4everybody = b();
}(this, function () {
  function a(a, b, c) {
    if (c) {
      var d = document.createDocumentFragment(),
          e = !b.hasAttribute("viewBox") && c.getAttribute("viewBox");e && b.setAttribute("viewBox", e);for (var f = c.cloneNode(!0); f.childNodes.length;) {
        d.appendChild(f.firstChild);
      }a.appendChild(d);
    }
  }function b(b) {
    b.onreadystatechange = function () {
      if (4 === b.readyState) {
        var c = b._cachedDocument;c || (c = b._cachedDocument = document.implementation.createHTMLDocument(""), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function (d) {
          var e = b._cachedTarget[d.id];e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.parent, d.svg, e);
        });
      }
    }, b.onreadystatechange();
  }function c(c) {
    function e() {
      for (var c = 0; c < r.length;) {
        var j = r[c],
            k = j.parentNode,
            l = d(k),
            m = j.getAttribute("xlink:href") || j.getAttribute("href");if (!m && h.attributeName && (m = j.getAttribute(h.attributeName)), l && m) {
          if (f) {
            var n = document.createElement("img");n.style.cssText = "display:inline-block;height:100%;width:100%", n.setAttribute("width", l.getAttribute("width") || l.clientWidth), n.setAttribute("height", l.getAttribute("height") || l.clientHeight), n.src = g(m, l, j), k.replaceChild(n, j);
          } else if (i) if (!h.validate || h.validate(m, l, j)) {
            k.removeChild(j);var o = m.split("#"),
                t = o.shift(),
                u = o.join("#");if (t.length) {
              var v = p[t];v || (v = p[t] = new XMLHttpRequest(), v.open("GET", t), v.send(), v._embeds = []), v._embeds.push({ parent: k, svg: l, id: u }), b(v);
            } else a(k, l, document.getElementById(u));
          } else ++c, ++s;
        } else ++c;
      }(!r.length || r.length - s > 0) && q(e, 67);
    }var f,
        g,
        h = Object(c);g = h.fallback || function (a) {
      return a.replace(/\?[^#]+/, "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(a) || [""])[0];
    }, f = "nosvg" in h ? h.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent), f && (document.createElement("svg"), document.createElement("use"));var i,
        j = /\bMSIE [1-8]\.0\b/,
        k = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        l = /\bAppleWebKit\/(\d+)\b/,
        m = /\bEdge\/12\.(\d+)\b/,
        n = /\bEdge\/.(\d+)\b/,
        o = window.top !== window.self;i = "polyfill" in h ? h.polyfill : j.test(navigator.userAgent) || k.test(navigator.userAgent) || (navigator.userAgent.match(m) || [])[1] < 10547 || (navigator.userAgent.match(l) || [])[1] < 537 || n.test(navigator.userAgent) && o;var p = {},
        q = window.requestAnimationFrame || setTimeout,
        r = document.getElementsByTagName("use"),
        s = 0;i && e();
  }function d(a) {
    for (var b = a; "svg" !== b.nodeName.toLowerCase() && (b = b.parentNode);) {}return b;
  }return c;
});

/***/ }),

/***/ "./resources/assets/js/mixins/ClassNameWithModificators.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['classNameModificators'],

    methods: {
        classNameWithModificators: function classNameWithModificators(baseClass) {
            var addModif = function addModif(acc, modif) {
                return acc + ' ' + baseClass + '--' + modif;
            };
            var modif = this.classNameModificators;

            if (_.isArray(modif)) {
                return modif.reduce(addModif, baseClass);
            }

            if (_.isString(modif)) {
                return addModif(baseClass, modif);
            }

            return baseClass;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/mixins/ProductImagesHat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        prepareImage: function prepareImage(image) {
            return 'https://admin.mossebo.market' + image;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/scripts/DataHandler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocalStorageProxy__ = __webpack_require__("./resources/assets/js/scripts/LocalStorageProxy.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Загрузка блоков данных с сервера по ключам с дублированием в localStorage.





/* harmony default export */ __webpack_exports__["a"] = ({
    data: {},
    storage: new __WEBPACK_IMPORTED_MODULE_2__LocalStorageProxy__["a" /* LocalStorageProxy */]('__data' + '::' + __WEBPACK_IMPORTED_MODULE_1__core__["a" /* default */].getLang()),
    expiredTime: 30 * 60 * 1000,

    get: function get() {
        var dataKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this.data = {};

        if (_.isString(dataKeys)) {
            dataKeys = [dataKeys];
        }

        if (dataKeys.length === 0) {
            return new Promise(function (resolve) {
                return resolve();
            });
        }

        return this.getData(dataKeys);
    },
    storageDataIsValid: function storageDataIsValid(data) {
        if (_.isObject(data) && 'expires' in data) {
            return data.expires > Date.now();
        }

        return false;
    },
    getFromStorage: function getFromStorage(key) {
        var data = this.storage.get(key);

        if (this.storageDataIsValid(data)) {
            this.data[key] = data.value;
            return true;
        }

        return false;
    },
    getData: function getData(dataKeys) {
        var _this = this;

        return new Promise(function (resolve) {
            dataKeys = dataKeys.reduce(function (acc, key) {
                if (!_this.getFromStorage(key)) {
                    acc.push(key);
                }

                return acc;
            }, []);

            if (dataKeys.length === 0) {
                resolve(_this.data);
            } else {
                resolve(_this.getFromServer(dataKeys));
            }
        });
    },
    getFromServer: function getFromServer(dataKeys) {
        var _this2 = this;

        return new Promise(function (resolve) {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(__WEBPACK_IMPORTED_MODULE_1__core__["a" /* default */].siteUrl('data'), {
                responseType: 'json',
                params: { dataKeys: dataKeys }
            }).then(function (response) {
                var data = response.data;

                _this2.setDataToStorage(data);

                _this2.data = _extends({}, _this2.data, data);

                resolve(_this2.data);
            });
        });
    },
    setDataToStorage: function setDataToStorage(data) {
        for (var key in data) {
            if (_.isBoolean(data[key])) {
                this.setItemToStorage(key, data[key]);
            } else if (!_.isEmpty(data[key])) {
                this.setItemToStorage(key, data[key]);
            }
        }
    },
    setItemToStorage: function setItemToStorage(key, data) {
        this.storage.add(key, {
            expires: Date.now() + this.expiredTime,
            value: data
        });
    },
    flush: function flush() {
        this.storage.forgetAll();
    }
});

/***/ }),

/***/ "./resources/assets/js/scripts/FixedMenu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initFixedMenu;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scrollHeight = 56;

var FixedMenu = function () {
    function FixedMenu(query) {
        var _this = this;

        _classCallCheck(this, FixedMenu);

        try {
            this.menuEl = document.querySelector(query);
            this.menuContainerEl = this.menuEl.querySelector(query + '-container');
            this.menuInnerEl = this.menuContainerEl.querySelector(query + '-inner');
            this.offsetEls = document.querySelectorAll(query + '-offset');
        } catch (e) {
            return;
        }

        if (!this.menuInnerEl) return;

        this.isFixed = false;

        setTimeout(function () {
            _this.init();
        }, 60);
    }

    _createClass(FixedMenu, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.calculateFixedOffset();
            this.calculateScrollOffset();

            if (this.menuNeedsToBeFixed()) {
                this.animateFixed();
            } else {
                this.check();
            }

            var resizeDebouncer = _.debounce(function () {
                _this2.calculateFixedOffset();
                _this2.calculateScrollOffset();
                _this2.check();
            }, 60);

            window.addEventListener('scroll', this.check.bind(this), { passive: true });
            window.addEventListener('resize', resizeDebouncer, { passive: true });
        }
    }, {
        key: 'calculateFixedOffset',
        value: function calculateFixedOffset() {
            this.fixedOffset = [].reduce.apply(this.offsetEls, [function (acc, el) {
                return acc + el.clientHeight;
            }, 0]);
        }
    }, {
        key: 'calculateScrollOffset',
        value: function calculateScrollOffset() {
            this.scrollOffsetTop = window.scrollY + this.menuEl.getBoundingClientRect().y;
        }
    }, {
        key: 'menuNeedsToBeFixed',
        value: function menuNeedsToBeFixed() {
            return window.scrollY > this.scrollOffsetTop - this.fixedOffset;
        }
    }, {
        key: 'check',
        value: function check(e) {
            if (this.menuEl.clientHeight <= scrollHeight) {
                if (this.menuNeedsToBeFixed()) {
                    this.setFixed();
                } else {
                    this.unsetFixed();
                }

                if (this.menuInnerEl.clientHeight !== this.menuEl.clientHeight) {
                    this.menuInnerEl.removeAttribute('style');
                }

                return;
            } else {
                var heightDiff = window.scrollY - this.scrollOffsetTop + this.fixedOffset;

                if (this.menuEl.clientHeight >= heightDiff + this.menuInnerEl.clientHeight) {
                    this.unsetFixed();
                } else {
                    var maxDiff = this.menuEl.clientHeight - scrollHeight;

                    if (heightDiff > maxDiff) {
                        this.setFixed();
                    }
                }

                var height = Math.min(this.menuEl.clientHeight, Math.max(this.menuEl.clientHeight - heightDiff, scrollHeight));

                if (this.menuInnerEl.clientHeight !== height) {
                    this.menuInnerEl.style.height = height + 'px';
                }
            }
        }
    }, {
        key: 'setFixed',
        value: function setFixed() {
            if (this.isFixed) return;

            this.isFixed = true;
            this.menuEl.classList.add('fixed');
            this.menuContainerEl.style.top = this.fixedOffset + 'px';
        }
    }, {
        key: 'unsetFixed',
        value: function unsetFixed() {
            if (!this.isFixed) return;

            this.isFixed = false;
            this.menuEl.classList.remove('fixed');
            this.menuContainerEl.style.top = 0;

            this.breakAnimation();
        }
    }, {
        key: 'animateFixed',
        value: function animateFixed() {
            var _this3 = this;

            this.animationInProcess = true;
            this.setFixed();
            this.menuContainerEl.classList.add('from-top');

            setTimeout(function () {
                if (_this3.animationInProcess) {
                    _this3.menuContainerEl.classList.remove('from-top');
                }
            }, 1000);
        }
    }, {
        key: 'breakAnimation',
        value: function breakAnimation() {
            if (!this.animationInProcess) return;

            this.animationInProcess = false;
            this.menuContainerEl.classList.remove('from-top');
        }
    }]);

    return FixedMenu;
}();

function initFixedMenu(query) {
    new FixedMenu(query);
}

/***/ }),

/***/ "./resources/assets/js/scripts/HeightToggle.js":
/***/ (function(module, exports) {

// Всплывашки.

var MakeHtUniqueId = function () {
    var counter = 0;

    return function () {
        return btoa(new Date().getTime() + counter++).replace('=', '');
    };
}();

(function () {
    "use strict";

    var pluginName = 'heightToggle';

    var defaultOptions = {
        containerQuery: '.ht-container',
        innerQuery: '.ht-inner',
        bindCloseEvents: false,
        isOpened: false,
        toggleCaption: false,
        element: null
    };

    function Plugin(el, options) {
        if (pluginName in el) return;

        var _ = this,
            href;

        _.eventDestroyers = [];

        _.loadOptions(options || {});

        _.els = {};
        _.id = MakeHtUniqueId();

        try {
            _.els.trigger = el;

            if (_.opt.element) {
                _.els.container = _.opt.element;
                _.opt.element = null;
            } else if (href = el.getAttribute('data-href')) {
                _.els.container = document.querySelector(href);
            } else if (_.opt.containerQuery !== defaultOptions.containerQuery) {
                _.els.container = document.querySelector(_.opt.containerQuery);
            } else {
                _.els.container = _.els.trigger.parentNode.querySelector(_.opt.containerQuery);
            }

            _.els.inner = _.els.container.querySelector(_.opt.innerQuery);
        } catch (e) {
            console.log('HT init error: (1)');
            return;
        }

        el[pluginName] = this;

        if (el.classList.contains('is-active')) {
            _.opt.isOpened = true;
            el.classList.remove('is-active');
        }

        _.clickTimeout = null;

        _.windowClick = function () {
            var _arguments = arguments;

            clearTimeout(_.clickTimeout);
            _.clickTimeout = setTimeout(function () {
                Plugin.prototype.windowClick.apply(_, _arguments);
            }, 64);
        };

        _.init();
    }

    Plugin.prototype.loadOptions = function (options) {
        var _ = this;

        _.opt = {};

        for (var i in defaultOptions) {
            if (i in options) {
                _.opt[i] = options[i];
            } else {
                _.opt[i] = defaultOptions[i];
            }
        }
    };

    Plugin.prototype.bindEvent = function (obj, name, cb, options) {
        cb = cb.bind(this);

        this.eventDestroyers.push(function () {
            obj.removeEventListener(name, cb);
        });

        obj.addEventListener(name, cb, options);
    };

    Plugin.prototype.init = function () {
        var _ = this;

        _.mutationObserver = new MutationObserver(_.update.bind(_));

        _.mutationObserver.observe(_.els.container, { attributes: false, childList: true, characterData: true, subtree: true });

        _.bindEvent(window, 'resize', _.update, { passive: true });
        _.bindEvent(document, 'click', _.windowClick, { passive: true });
        _.bindEvent(document, 'touchend', _.windowClick, { passive: true });

        if (_.opt.bindCloseEvents) {
            _.bindEvent(document, 'keydown', _.keydown, { passive: true });
        }

        _.update();

        if (_.opt.isOpened) {
            _.els.container.classList.add('no-transition');
            _.open();

            setTimeout(function () {
                _.els.container.classList.remove('no-transition');
            });
        }

        _.bindEvent(_.els.container, 'transitionend', function (e) {
            e.stopPropagation();

            if (_.active) {
                _.dispatchEvent('HT::after-open');
            } else {
                _.dispatchEvent('HT::after-close');
            }
        }, { passive: true });
    };

    Plugin.prototype.close = function () {
        var _ = this;

        if (_.active) {
            _.active = false;
            _.els.trigger.classList.remove('is-active');
            _.els.container.classList.remove('is-active');
            _.dispatchEvent('HT::before-close');
        }

        if (_.opt.minH) {
            _.els.container.style.maxHeight = _.opt.minH + 'px';
        } else {
            _.els.container.removeAttribute('style');
        }
    };

    Plugin.prototype.open = function () {
        var _ = this;

        if (!_.active) {
            _.active = true;
            _.els.trigger.classList.add('is-active');
            _.els.container.classList.add('is-active');
            _.dispatchEvent('HT::before-open');
        }

        _.els.container.style.maxHeight = _.maxH + 'px';
    };

    Plugin.prototype.toggle = function () {
        var _ = this;

        _.active ? _.close() : _.open();

        _.toggleCaption();
    };

    Plugin.prototype.toggleCaption = function () {
        var _ = this;

        if (_.opt.toggleCaption) {
            var a = _.els.trigger.getAttribute('data-caption');
            var b = _.els.trigger.innerText;

            _.els.trigger.innerText = a;
            _.els.trigger.setAttribute('data-caption', b);
        }
    };

    Plugin.prototype.update = function () {
        var _ = this;

        var styles = window.getComputedStyle(_.els.inner);
        var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

        var h = Math.ceil(_.els.inner.scrollHeight + margin);
        h = _.opt.maxH ? Math.min(h, _.opt.maxH) : h;

        if (_.maxH != h) {
            _.maxH = h;
            _.active ? _.open() : _.close();
        }
    };

    Plugin.prototype.windowClick = function (e) {
        var _ = this;

        if (_.eventHandled(e)) return;

        var el = e.target;

        if (_.els.trigger.contains(el)) {
            _.toggle();
            _.handleEvent(e);
        } else if (_.els.container.contains(el)) {
            _.handleEvent(e);
        } else if (_.opt.bindCloseEvents) {
            _.close();
            _.handleEvent(e);
        }
    };

    Plugin.prototype.eventHandled = function (e) {
        if ('htHandled' in e && e.htHandled.indexOf(this.id) !== -1) {
            return true;
        }

        return false;
    };

    Plugin.prototype.handleEvent = function (e) {
        if (!('htHandled' in e)) {
            e.htHandled = [];
        }

        e.htHandled.push(this.id);
    };

    Plugin.prototype.keydown = function (e) {
        var _ = this;

        var code = e.keyCode || e.which;
        if (_.active && code === 27) {
            _.close();
        }
    };

    Plugin.prototype.dispatchEvent = function (eventName) {
        var _ = this;

        if (typeof CustomEvent === 'undefined') {
            var myEvent = document.createEvent(eventName);
            myEvent.initCustomEvent(eventName, false, true);
        } else {
            var myEvent = new CustomEvent(eventName, {
                bubbles: false,
                cancelable: true
            });
        }

        _.els.trigger.dispatchEvent(myEvent);
    };

    Plugin.prototype.destroy = function () {
        var _ = this;

        _.close();
        clearTimeout(_.clickTimeout);
        _.eventDestroyers.forEach(function (destroyer) {
            return destroyer();
        });
        _.els.trigger[pluginName] = undefined;
        delete _.els.trigger[pluginName];

        if (_.mutationObserver) {
            _.mutationObserver.disconnect();
            _.mutationObserver = undefined;
            delete _.mutationObserver;
        }
    };

    window[pluginName] = function (el, options) {
        if (el instanceof Element) {
            return new Plugin(el, options);
        }

        if (!(el instanceof NodeList)) {
            el = document.querySelectorAll(el);
        }

        if (!el.length) return false;

        var set = [];

        [].forEach.call(el, function (el) {
            set.push(new Plugin(el, options));
        });

        return set;
    };
})();

/***/ }),

/***/ "./resources/assets/js/scripts/LocalStorageProxy.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageProxy; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Прослойка между localStorage и app.

// Класс, который можно использовать для хранения данных с определенным пространством имен.
var LocalStorageProxy = function () {
    function LocalStorageProxy() {
        var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, LocalStorageProxy);

        this.__data = {};
        this.__available = 'localStorage' in window && window['localStorage'] !== null;
        this.__namespace = namespace;
    }

    _createClass(LocalStorageProxy, [{
        key: 'isAvailable',
        value: function isAvailable() {
            return this.__available;
        }
    }, {
        key: 'prepareKey',
        value: function prepareKey(key) {
            if (this.__namespace) {
                if (key.indexOf(this.__namespace + '::') === 0) {
                    return key;
                }

                return this.__namespace + '::' + key;
            }

            return key;
        }
    }, {
        key: 'keyToShort',
        value: function keyToShort(key) {
            if (this.__namespace) {
                return key.replace(this.__namespace + '::', '');
            }

            return key;
        }
    }, {
        key: 'add',
        value: function add(key, data) {
            key = this.prepareKey(key);

            this.__data[key] = data;

            if (!this.isAvailable()) return;
            if (typeof data === 'function') return;

            if (typeof data !== 'string') {
                data = JSON.stringify(data);
            }

            localStorage.setItem(key, data);
        }
    }, {
        key: 'get',
        value: function get(key) {
            key = this.prepareKey(key);

            if (key in this.__data) {
                var _data = this.__data[key];

                if (typeof _data !== 'string') {
                    try {
                        _data = JSON.parse(JSON.stringify(this.__data[key]));
                    } catch (e) {
                        delete this.__data[key];
                        return this.get(key);
                    }
                }

                return _data;
            }

            if (!this.isAvailable()) return;

            var data = localStorage.getItem(key);

            try {
                data = JSON.parse(data);
            } catch (e) {}

            this.__data[key] = data;

            return data;
        }
    }, {
        key: 'getAllKeys',
        value: function getAllKeys() {
            var _this = this;

            var keys = Object.keys(localStorage).filter(function (key) {
                return localStorage.hasOwnProperty(key);
            });

            if (this.__namespace) {
                keys = keys.filter(function (key) {
                    return key.indexOf(_this.__namespace) === 0;
                });
            }

            return keys;
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            var _this2 = this;

            return this.getAllKeys().reduce(function (acc, key) {
                acc[_this2.keyToShort(key)] = _this2.get(key);

                return acc;
            }, {});
        }
    }, {
        key: 'has',
        value: function has(key) {
            return this.prepareKey(key) in localStorage;
        }
    }, {
        key: 'remember',
        value: function remember(key, getDataFunc, callback) {
            var _this3 = this;

            if (!_.isFunction(callback)) return;
            key = this.prepareKey(key);

            data = this.get(key);

            if (data) {
                callback(data);
            } else {
                try {
                    getDataFunc(function (data) {
                        _this3.add(key, data);
                        callback(data);
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }, {
        key: 'forget',
        value: function forget(key) {
            if (!this.isAvailable()) return;

            localStorage.removeItem(this.prepareKey(key));
        }
    }, {
        key: 'forgetAll',
        value: function forgetAll() {
            var _this4 = this;

            this.getAllKeys().forEach(function (key) {
                return _this4.forget(key);
            });
        }
    }]);

    return LocalStorageProxy;
}();

// По-умолчанию без пространства имен.
var defaultProxy = new LocalStorageProxy();

/* harmony default export */ __webpack_exports__["b"] = (defaultProxy);

/***/ }),

/***/ "./resources/assets/js/scripts/MainMenu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initMainMenu;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_DesktopMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/DesktopMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_MobileMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/MobileMenu.js");



function initMainMenu() {
    var menu = void 0;
    var size = void 0;

    var check = function check() {
        if (window.innerWidth < 992) {
            if (size !== 'mobile') {
                size = 'mobile';

                if (menu) {
                    menu.destroy();
                }

                menu = new __WEBPACK_IMPORTED_MODULE_1__menu_MobileMenu__["a" /* default */]('.js-main-menu');
            }
        } else {
            if (size !== 'desktop') {
                size = 'desktop';

                if (menu) {
                    menu.destroy();
                }

                menu = new __WEBPACK_IMPORTED_MODULE_0__menu_DesktopMenu__["a" /* default */]('.js-catalog-nav');
            }
        }
    };

    var resizeHandler = _.debounce(check, 60);

    window.addEventListener('resize', resizeHandler, { passive: true });

    check();
}

/***/ }),

/***/ "./resources/assets/js/scripts/MetaSetter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setMeta;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__meta_title__ = __webpack_require__("./resources/assets/js/scripts/meta/title.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__meta_breadcrumbs__ = __webpack_require__("./resources/assets/js/scripts/meta/breadcrumbs.js");



function setMeta(data) {
    var titleEl = document.getElementsByTagName('title')[0];
    var metaEls = document.getElementsByTagName('meta');[].forEach.call(metaEls, function (el) {
        var name = el.name;

        if (name) {
            name = name.toLowerCase();

            if (name in data) {
                el.content = data[name];
            }
        }

        var property = el.attributes.property;

        if (property) {
            property = property.value.toLowerCase();

            if (property in data) {
                el.content = data[property];
            }
        }
    });

    if ('title' in data) {
        Object(__WEBPACK_IMPORTED_MODULE_0__meta_title__["a" /* default */])(data.title);
        titleEl.innerHTML = data.title;
    }

    if ('breadcrumbs' in data) {
        Object(__WEBPACK_IMPORTED_MODULE_1__meta_breadcrumbs__["a" /* default */])(data.breadcrumbs);
    }
}

/***/ }),

/***/ "./resources/assets/js/scripts/PendingLoader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Чтобы задержка между асинхронными действиями не была меньше определенного времени. (Избавление от моргания загрузки)
var PendingLoader = function () {
    function PendingLoader(time) {
        var _this = this;

        _classCallCheck(this, PendingLoader);

        this.timeIsElapsed = false;

        this.timeout = setTimeout(function () {
            if (_.isFunction(_this.callback)) {
                _this.callback();
            } else {
                _this.canFinish = true;
            }
        }, time);
    }

    _createClass(PendingLoader, [{
        key: "finish",
        value: function finish(cb) {
            if (!_.isFunction(cb)) return;

            if (this.canFinish) {
                cb();
            } else {
                this.callback = cb;
            }
        }
    }, {
        key: "cancel",
        value: function cancel() {
            clearTimeout(this.timeout);
            this.callback = null;
        }
    }]);

    return PendingLoader;
}();

/* harmony default export */ __webpack_exports__["a"] = (PendingLoader);

/***/ }),

/***/ "./resources/assets/js/scripts/SidePopupper.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_BlankPlugin__ = __webpack_require__("./resources/assets/js/scripts/base/BlankPlugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SidePopupper = function (_BlankPlugin) {
    _inherits(SidePopupper, _BlankPlugin);

    function SidePopupper() {
        var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, SidePopupper);

        var _this = _possibleConstructorReturn(this, (SidePopupper.__proto__ || Object.getPrototypeOf(SidePopupper)).call(this));

        _this.pages = [];
        _this.triggers = [];
        _this.opened = false;
        _this.animationInProcess = false;

        var popupEl = document.createElement('div');
        popupEl.classList.add();

        _this.appEl = document.querySelector('.js-app');

        _this.popupEl = _this.makeEl('side-popup');
        _this.containerEl = _this.makeEl('side-popup__container');
        _this.controlsEl = _this.makeEl('side-popup__controls');
        _this.contentEl = _this.makeEl('side-popup__content');
        _this.closeBtnEl = _this.makeEl('side-popup__close', '<svg class="side-popup__close-icon symbol-icon">\n                <use xlink:href="/assets/images/icons.svg#symbol-close"></use>\n            </svg>');

        _this.controlsEl.appendChild(_this.closeBtnEl);
        _this.containerEl.appendChild(_this.controlsEl);
        _this.containerEl.appendChild(_this.contentEl);
        _this.popupEl.appendChild(_this.containerEl);

        document.body.appendChild(_this.popupEl);

        if (content !== false) {
            _this.addPage(content);
        }

        _this.bindEvents();
        return _this;
    }

    _createClass(SidePopupper, [{
        key: 'makeEl',
        value: function makeEl(className, innerHtml) {
            var el = document.createElement('div');

            if (className) {
                className.split(' ').forEach(function (className) {
                    return el.classList.add(className);
                });
            }

            if (typeof innerHtml === 'string') {
                el.innerHTML = innerHtml;
            }

            if (innerHtml instanceof HTMLElement) {
                el.appendChild(innerHtml);
            }

            return el;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this2 = this;

            this.bindEvent(this.closeBtnEl, 'click', this.close, { passive: true });

            this.bindEvent(window, 'keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 27) {
                    _this2.close();
                }
            }, { passive: true });

            this.bindEvent(document, 'click', function (e) {
                if (_this2.popupEl.contains(e.target)) {
                    return;
                }

                for (var i = 0; i < _this2.triggers.length; i++) {
                    if (_this2.triggers[i].contains(e.target)) {
                        return;
                    }
                }

                _this2.close();
            }, { passive: true });
        }
    }, {
        key: 'addTrigger',
        value: function addTrigger(el) {
            if (!(el instanceof HTMLElement)) {
                el = document.querySelector(el);
            }

            if (el) {
                this.triggers.push(el);
                this.bindEvent(el, 'click', this.toggle, { passive: true });
            }

            return this;
        }
    }, {
        key: 'addPage',
        value: function addPage(content, title) {
            var _this3 = this;

            var pageEl = this.makeEl('side-popup__page');

            if (this.pages.length > 0) {
                if (!title) {
                    title = __WEBPACK_IMPORTED_MODULE_1__core__["a" /* default */].translate('Back');
                }

                var index = this.pages.length;
                var backButtonEl = this.makeEl('side-popup__back', '<svg class="side-popup__back-icon">\n                    <use xlink:href="/assets/images/icons.svg#symbol-chevron-left"></use>\n                </svg>\n                <span class="side-popup__back-title">' + title + '</span>');

                this.bindEvent(backButtonEl, 'click', function () {
                    _this3.popPage(index);
                }, { passive: true });

                pageEl.appendChild(backButtonEl);
            }

            var pageContentEl = this.makeEl('side-popup__page-content');
            pageEl.appendChild(pageContentEl);

            pageContentEl.classList.add();
            pageContentEl.appendChild(content);

            this.pages.push(pageEl);
            this.contentEl.appendChild(pageEl);

            setTimeout(function () {
                pageEl.classList.add('is-active');
            }, 60);

            return this;
        }
    }, {
        key: 'popPage',
        value: function popPage(index) {
            var _this4 = this;

            if (this.animationInProcess) return;
            this.animationInProcess = true;

            this.pages[index].addEventListener('transitionend', function () {
                _this4.contentEl.removeChild(_this4.pages[index]);
                _this4.pages.splice(index, 1);
                _this4.animationInProcess = false;
            }, { passive: true, once: true });

            this.pages[index].classList.remove('is-active');
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.opened) {
                this.close();
            } else {
                this.open();
            }
        }
    }, {
        key: 'open',
        value: function open() {
            if (this.opened) return;
            this.opened = true;

            this.top = window.pageYOffset;

            this.appEl.style.height = window.innerHeight + this.top + 'px';
            this.appEl.style.top = '-' + this.top + 'px';
            this.appEl.classList.add('side-popup-opened');

            this.popupEl.classList.add('is-active');
        }
    }, {
        key: 'close',
        value: function close() {
            var _this5 = this;

            if (!this.opened) return;

            this.opened = false;
            this.appEl.classList.remove('side-popup-opened');
            this.appEl.style.height = 'auto';
            this.appEl.style.top = 'auto';

            window.scrollTo(0, this.top);

            this.popupEl.addEventListener('transitionend', function () {
                _this5.pages.splice(1).forEach(function (el) {
                    _this5.contentEl.removeChild(el);
                });
            }, { passive: true, once: true });

            this.popupEl.classList.remove('is-active');
        }
    }, {
        key: 'beforeDestroy',
        value: function beforeDestroy() {
            this.triggers = [];
        }
    }]);

    return SidePopupper;
}(__WEBPACK_IMPORTED_MODULE_0__base_BlankPlugin__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (SidePopupper);

/***/ }),

/***/ "./resources/assets/js/scripts/SmoothScroll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SmoothScroll */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Анимированный скролл.



var eventsList = ['keydown', 'wheel', 'mousewheel', 'MozMousePixelScroll', 'touchstart'];

var SmoothScrollProxy = function () {
    function SmoothScrollProxy(elem, duration, callback) {
        _classCallCheck(this, SmoothScrollProxy);

        return new SmoothScroll(SmoothScroll.findEndPoint(elem) - this.getOffset(), duration, callback);
    }

    _createClass(SmoothScrollProxy, [{
        key: 'getOffset',
        value: function getOffset() {
            if (window.innerWidth < 992) {
                return 0;
                // return document.querySelector('.js-header-mobile-fix').clientHeight
            } else {
                return 0;
            }
        }
    }]);

    return SmoothScrollProxy;
}();

/* harmony default export */ __webpack_exports__["a"] = (SmoothScrollProxy);


var SmoothScroll = function () {
    function SmoothScroll(elem, duration, callback) {
        _classCallCheck(this, SmoothScroll);

        this.startFrom = window.pageYOffset;
        this.scrollHeight = SmoothScroll.findEndPoint(elem) - this.startFrom;
        this.duration = duration || SmoothScroll.calculateDuration(this.scrollHeight);

        this.callback = callback;

        this.inProcess = true;
        this.animate();
    }

    _createClass(SmoothScroll, [{
        key: 'animate',
        value: function animate() {
            var self = this;

            this.bindEvents();

            var start = performance.now();

            requestAnimationFrame(function animate(time) {
                var timePassed = Math.min(time - start, self.duration);
                var scrollTo = Math.round(self.scrollHeight * timePassed / self.duration);

                window.scrollTo(0, self.startFrom + scrollTo);

                if (self.inProcess && timePassed < self.duration) {
                    requestAnimationFrame(animate);
                } else {
                    self.stop();
                }
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.inProcess) {
                this.inProcess = false;
                this.unbindEvents();

                if (typeof this.callback === 'function') {
                    this.callback();
                    this.callback = undefined;
                }
            }
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.stopProxy = function () {
                _this.stop();
            };

            eventsList.forEach(function (eventName) {
                document.addEventListener(eventName, _this.stopProxy, { passive: true });
            });
        }
    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            var _this2 = this;

            eventsList.forEach(function (eventName) {
                document.removeEventListener(eventName, _this2.stopProxy);
            });

            this.stopProxy = undefined;
        }
    }], [{
        key: 'findEndPoint',
        value: function findEndPoint(elem) {
            if (typeof elem === 'string') {
                elem = document.querySelector(elem);
            }

            if (elem instanceof Element) {
                return elem.offsetTop;
            }

            if (Number(parseFloat(elem)) === elem) {
                return elem;
            }

            throw new Error('Невозможно определить точку назначения.');
        }
    }, {
        key: 'calculateDuration',
        value: function calculateDuration(height) {
            var duration = Math.abs(parseInt(height / 5));
            duration = Math.max(100, duration);
            duration = Math.min(1500, duration);

            return duration;
        }
    }]);

    return SmoothScroll;
}();

/***/ }),

/***/ "./resources/assets/js/scripts/alerty.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_BlankPlugin__ = __webpack_require__("./resources/assets/js/scripts/base/BlankPlugin.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Alerty = function (_BlankPlugin) {
    _inherits(Alerty, _BlankPlugin);

    function Alerty(content) {
        _classCallCheck(this, Alerty);

        var _this = _possibleConstructorReturn(this, (Alerty.__proto__ || Object.getPrototypeOf(Alerty)).call(this));

        _this.el = document.createElement('div');
        _this.el.classList.add('popup');
        _this.el.classList.add('block-ui');
        _this.el.id = 'alerty';

        _this.els = [];

        if (typeof content === 'string') {
            _this.setMessage(content);
        } else {
            ;['title', 'message', 'buttons', 'type', 'class'].forEach(function (key) {
                if (key in content) {
                    _this['set' + key.charAt(0).toUpperCase() + key.slice(1)](content[key]);
                }
            });
        }

        _this.fillEl();
        _this.open();
        return _this;
    }

    _createClass(Alerty, [{
        key: 'fillEl',
        value: function fillEl() {
            var containerEl = document.createElement('div');
            containerEl.classList.add('popup__container');

            this.els.forEach(function (el) {
                return containerEl.appendChild(el);
            });

            this.el.appendChild(containerEl);
        }
    }, {
        key: 'setTitle',
        value: function setTitle(titleHtml) {
            var el = document.createElement('h3');
            el.classList.add('popup__title');
            el.classList.add('title-h3');
            el.innerHTML = titleHtml;

            var topEl = document.createElement('div');
            topEl.classList.add('popup__top');
            topEl.appendChild(el);

            this.els.push(topEl);
        }
    }, {
        key: 'setMessage',
        value: function setMessage(messageHtml) {
            var el = document.createElement('div');
            el.classList.add('popup__message');
            el.innerHTML = messageHtml;

            var contentEl = document.createElement('div');
            contentEl.classList.add('popup__content');
            contentEl.appendChild(el);

            this.els.push(contentEl);
        }
    }, {
        key: 'setButtons',
        value: function setButtons(buttons) {
            var bottomEl = document.createElement('div');
            bottomEl.classList.add('popup__bottom');

            buttons.forEach(function (button) {

                var el = document.createElement('a');

                if ('href' in button) {
                    el.href = button.href;
                }

                if ('class' in button) {
                    button.class.split(' ').forEach(function (className) {
                        return el.classList.add(className);
                    });
                }

                if ('onclick' in button) {
                    el.onclick = button.onclick;
                }

                if ('text' in button) {
                    el.innerHTML = button.text;
                }

                var buttonEl = document.createElement('div');
                buttonEl.classList.add('popup__button');
                buttonEl.appendChild(el);

                bottomEl.appendChild(buttonEl);
            });
        }
    }, {
        key: 'setType',
        value: function setType(type) {
            this.setClass(type);
        }
    }, {
        key: 'setClass',
        value: function setClass(classList) {
            var _this2 = this;

            if (!classList) return;

            classList.split(' ').forEach(function (className) {
                return _this2.el.classList.add(className);
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.el.style.display = 'none';
            document.body.appendChild(this.el);

            $.fancybox.close();

            $.fancybox.open({
                src: '#alerty'
            }, {
                padding: 0,
                scrolling: 'no',
                afterClose: this.close.bind(this)
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.destroy();
            document.body.removeChild(this.el);
        }
    }]);

    return Alerty;
}(__WEBPACK_IMPORTED_MODULE_0__base_BlankPlugin__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Alerty);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/scripts/base/BlankPlugin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlankPlugin = function () {
    function BlankPlugin() {
        _classCallCheck(this, BlankPlugin);

        this.subscribers = [];
        this.eventDestroyers = [];
        this.opened = false;
    }

    _createClass(BlankPlugin, [{
        key: 'on',
        value: function on(name, callback) {
            var _this = this;

            if (typeof callback !== 'function') return;

            if (!this.subscribers[name]) {
                this.subscribers[name] = [];
            }

            this.subscribers[name].push(callback);

            return function () {
                _this.off(name, callback);
            };
        }
    }, {
        key: 'one',
        value: function one(name, callback) {
            var _arguments = arguments,
                _this2 = this;

            if (typeof callback !== 'function') return;

            var handler = function handler() {
                callback.apply(null, _arguments);
                _this2.off(name, handler);
            };

            this.on(name, handler);
        }
    }, {
        key: 'off',
        value: function off(name, callback) {
            if (!this.subscribers[name]) return;

            if (typeof callback === 'undefined') {
                delete this.subscribers[name];
            } else if (typeof callback === 'function') {
                var index = this.subscribers[name].indexOf(callback);

                if (index !== -1) {
                    if (this.subscribers[name].length === 1) {
                        delete this.subscribers[name];
                    } else {
                        this.subscribers[name].splice(index, 1);
                    }
                }
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(name) {
            var data = [].slice.call(arguments, 1);

            if (!this.subscribers[name]) return;

            this.subscribers[name].forEach(function (eventCallback) {
                eventCallback.apply(null, data);
            });
        }
    }, {
        key: 'cleanSubscribers',
        value: function cleanSubscribers() {
            this.subscribers = {};
        }
    }, {
        key: 'call',
        value: function call(name) {
            if (typeof this[name] === 'function') {
                this[name]();
            }
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent(el, name, cb) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            cb = cb.bind(this);

            this.eventDestroyers.push(function () {
                el.removeEventListener(name, cb);
            });

            el.addEventListener(name, cb, options);
        }
    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.eventDestroyers.forEach(function (cb) {
                return cb();
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.call('beforeDestroy');
            this.unbindEvents();
            this.cleanSubscribers();
        }
    }]);

    return BlankPlugin;
}();

/* harmony default export */ __webpack_exports__["a"] = (BlankPlugin);

/***/ }),

/***/ "./resources/assets/js/scripts/core/cookie.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCookie */
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    });
}

/* harmony default export */ __webpack_exports__["a"] = ({
    get: function get(name) {
        return getCookie(name);
    },
    set: function set(name, value) {
        var time = new Date();
        time.setDate(time.getDate() + 21);

        setCookie(name, value, {
            expires: time,
            domain: '.mossebo-shop.test',
            path: '/'
        });
    },
    delete: function _delete(name) {
        deleteCookie(name);
    }
});

/***/ }),

/***/ "./resources/assets/js/scripts/core/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cookie__ = __webpack_require__("./resources/assets/js/scripts/core/cookie.js");


/* harmony default export */ __webpack_exports__["a"] = ({
    siteUrl: function siteUrl() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (url.indexOf('http') === 0) {
            return url;
        }

        return window.location.origin + '/' + this.getLang() + '/' + _.trim(url, '/');
    },
    apiUrl: function apiUrl() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (url.indexOf('http') === 0) {
            return url;
        }

        return window.location.origin + '/api/' + this.getLang() + '/' + _.trim(url, '/');
    },
    translate: function translate(identif) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return _.get(window.mossebo.translates, identif);
    },
    getLang: function getLang() {
        return 'ru';
    },
    config: function config(path) {
        return _.get(window.mossebo, path);
    },


    cookie: __WEBPACK_IMPORTED_MODULE_0__cookie__["a" /* default */]
});

/***/ }),

/***/ "./resources/assets/js/scripts/formSender.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* unused harmony export inputFillCheck */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormInputs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_BlankPlugin__ = __webpack_require__("./resources/assets/js/scripts/base/BlankPlugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alerty__ = __webpack_require__("./resources/assets/js/scripts/alerty.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






function dispatchEvent(el, eventName) {
    var myEvent = void 0;

    if (typeof CustomEvent === 'undefined') {
        myEvent = document.createEvent(eventName);
        myEvent.initCustomEvent(eventName, false, true);
    } else {
        myEvent = new CustomEvent(eventName, {
            bubbles: false,
            cancelable: true
        });
    }

    el.dispatchEvent(myEvent);
}

function onInputFocus(ev) {
    ev.target.parentNode.classList.add('form-input--focus');
}

function onInputBlur(ev) {
    if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('form-input--filled');
    }

    ev.target.parentNode.classList.remove('form-input--focus');
}

function onInputChange(ev) {
    if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('form-input--filled');
    } else {
        ev.target.parentNode.classList.add('form-input--filled');
    }

    ev.target.parentNode.classList.add('form-input--focus');
}

function inputFillCheck(querySelector) {
    [].slice.call(document.querySelectorAll(querySelector)).forEach(function (inputEl) {
        inputEl.addEventListener('focus', onInputFocus, { passive: true });
        inputEl.addEventListener('blur', onInputBlur, { passive: true });
        inputEl.addEventListener('change', onInputChange, { passive: true });

        onInputChange({ target: inputEl });
    });
}

var FormField = function () {
    function FormField(el) {
        _classCallCheck(this, FormField);

        this.el = el;
        this.inputEl = el.querySelector('.form-input, .form-textarea');
        this.errorEl = el.querySelector('.form-error');

        if (!this.inputEl) return;

        if (!this.detectInputType()) {
            return;
        }

        if (!this.errorEl) {
            this.errorEl = document.createElement('div');
            this.errorEl.classList.add('form-error');

            this.el.append(this.errorEl);
        }

        $(this.errorEl).tooltip();

        this.name = this.inputEl.getAttribute('name');
        this.bindEvents();
        this.ready = true;
    }

    _createClass(FormField, [{
        key: 'bindEvents',
        value: function bindEvents() {
            this.inputEl.addEventListener('focus', onInputFocus, { passive: true });
            this.inputEl.addEventListener('blur', onInputBlur, { passive: true });
            this.inputEl.addEventListener('change', onInputChange, { passive: true });

            onInputChange({
                target: this.inputEl
            });
        }
    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            this.inputEl.removeEventListener('focus', onInputFocus);
            this.inputEl.removeEventListener('blur', onInputBlur);
            this.inputEl.removeEventListener('change', onInputChange);
        }
    }, {
        key: 'setType',
        value: function setType(type) {
            this.type = type;

            if (['text', 'tel', 'email', 'password', 'textarea'].indexOf(type) !== -1) {
                this.valueType = 'value';
            } else if (['checkbox', 'radio'].indexOf(type) !== -1) {
                this.valueType = 'check';
            } else if (type === 'select') {
                this.valueType = 'select';
            }
        }
    }, {
        key: 'detectInputType',
        value: function detectInputType() {
            if (this.inputEl.tagName.toLocaleLowerCase() === 'textarea') {
                this.setType('textarea');

                return true;
            }

            if (!this.inputEl.type) {
                return false;
            }

            this.setType(this.inputEl.type);

            return true;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            if (this.type === 'hidden') return;

            if (this.valueType === 'value') {
                this.inputEl.value = value;

                return;
            }

            if (this.valueType === 'check') {
                if (value) {
                    this.inputEl.checked = true;
                    this.inputEl.setAttribute('checked');
                } else {
                    this.inputEl.checked = false;
                    this.inputEl.removeAttribute('checked');
                }

                return;
            }

            if (this.valueType === 'select') {
                [].forEach.call(this.inputEl.querySelectorAll('option'), function (el) {
                    el.selected = el.value === value;
                });

                return;
            }
        }
    }, {
        key: 'setError',
        value: function setError(text) {
            if (!this.ready) return;

            this.el.classList.add('has-error');

            this.errorEl.setAttribute('data-original-title', text);

            this.inputEl.addEventListener('input', this.hideError.bind(this), { passive: true, once: true });
        }
    }, {
        key: 'hideError',
        value: function hideError() {
            if (!this.ready) return;

            this.el.classList.remove('has-error');
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setValue('');

            dispatchEvent(this.inputEl, 'focus');
            dispatchEvent(this.inputEl, 'blur');

            this.hideError();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.unbindEvents();
        }
    }]);

    return FormField;
}();

var FormInputs = function (_BlankPlugin) {
    _inherits(FormInputs, _BlankPlugin);

    function FormInputs(el) {
        _classCallCheck(this, FormInputs);

        var _this = _possibleConstructorReturn(this, (FormInputs.__proto__ || Object.getPrototypeOf(FormInputs)).call(this));

        _this.el = el;
        _this.fields = [].map.call(el.querySelectorAll('.js-form-group'), function (el) {
            return new FormField(el);
        });
        return _this;
    }

    _createClass(FormInputs, [{
        key: 'applyToFields',
        value: function applyToFields(method) {
            var args = [].slice.call(arguments, 1);

            this.fields.forEach(function (field) {
                field[method].apply(field, args);
            });
        }
    }, {
        key: 'showErrors',
        value: function showErrors(errors) {
            if (!errors) return;

            this.fields.forEach(function (field) {
                if (field.name in errors) {
                    field.setError(errors[field.name]);
                }
            });
        }
    }, {
        key: 'beforeDestroy',
        value: function beforeDestroy() {
            this.applyToFields('destroy');
        }
    }]);

    return FormInputs;
}(__WEBPACK_IMPORTED_MODULE_1__base_BlankPlugin__["a" /* default */]);

var FormSender = function (_FormInputs) {
    _inherits(FormSender, _FormInputs);

    function FormSender(el) {
        _classCallCheck(this, FormSender);

        var _this2 = _possibleConstructorReturn(this, (FormSender.__proto__ || Object.getPrototypeOf(FormSender)).call(this, el));

        _this2.url = _this2.el.getAttribute('action');
        _this2.sendInProcess = false;
        _this2.init();
        return _this2;
    }

    _createClass(FormSender, [{
        key: 'init',
        value: function init() {
            var _this3 = this;

            this.submitEl = this.el.querySelector('[type="submit"]');

            this.bindEvent(this.el, 'submit', function (e) {
                e.preventDefault();
                _this3.submit();
            });
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this4 = this;

            if (this.sendInProcess) return;
            this.startLoading();

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(this.url, new FormData(this.el), { cancelToken: new __WEBPACK_IMPORTED_MODULE_0_axios___default.a.CancelToken(function (c) {
                    return _this4.requestCancel = c;
                }) }).then(function (response) {
                return _this4.handleResponseData(response.data);
            }).catch(function (thrown) {
                if (__WEBPACK_IMPORTED_MODULE_0_axios___default.a.isCancel(thrown)) return;

                if ('response' in thrown && thrown.response.data) {
                    _this4.handleResponseData(thrown.response.data);
                    return;
                }

                _this4.showMessage(__WEBPACK_IMPORTED_MODULE_2__core__["a" /* default */].translate('errors.technical'), 'error');
                console.log(thrown);
            }).finally(function () {
                _this4.endLoading();
            });
        }
    }, {
        key: 'handleResponseData',
        value: function handleResponseData(data) {
            if (data.status === 'error' && data.errors) {
                this.showErrors(data.errors);
            }

            if (data.status === 'success') {
                this.applyToFields('reset');
            }

            if (data.message) {
                this.showMessage(data.message, data.status);
            }
        }
    }, {
        key: 'startLoading',
        value: function startLoading() {
            this.sendInProcess = true;

            if (this.submitEl) {
                this.submitEl.classList.add('is-loading');
            }
        }
    }, {
        key: 'endLoading',
        value: function endLoading() {
            this.sendInProcess = false;

            if (this.submitEl) {
                this.submitEl.classList.remove('is-loading');
            }
        }
    }, {
        key: 'showMessage',
        value: function showMessage(message, type) {
            new __WEBPACK_IMPORTED_MODULE_3__alerty__["a" /* default */]({
                type: type,
                message: message
            });
        }
    }, {
        key: 'beforeDestroy',
        value: function beforeDestroy() {
            this.endLoading();

            if (typeof this.requestCancel === 'function') {
                this.requestCancel();
            }
        }
    }]);

    return FormSender;
}(FormInputs);

/* harmony default export */ __webpack_exports__["b"] = (FormSender);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/scripts/menu/BaseMenu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_BlankPlugin__ = __webpack_require__("./resources/assets/js/scripts/base/BlankPlugin.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BaseMenu = function (_BlankPlugin) {
    _inherits(BaseMenu, _BlankPlugin);

    function BaseMenu(query) {
        _classCallCheck(this, BaseMenu);

        var _this = _possibleConstructorReturn(this, (BaseMenu.__proto__ || Object.getPrototypeOf(BaseMenu)).call(this));

        if (query instanceof HTMLElement) {
            _this.menuEl = query;
        } else {
            _this.menuEl = document.querySelector(query);
        }

        if (!_this.menuEl) return _possibleConstructorReturn(_this);
        _this.opened = false;

        _this.call('init');
        return _this;
    }

    _createClass(BaseMenu, [{
        key: 'open',
        value: function open() {
            if (this.opened) return false;

            this.call('beforeOpen');
            this.opened = true;
            this.menuEl.classList.add('is-active');
        }
    }, {
        key: 'close',
        value: function close() {
            if (!this.opened) return false;

            this.call('beforeClose');
            this.opened = false;
            this.menuEl.classList.remove('is-active');
        }
    }]);

    return BaseMenu;
}(__WEBPACK_IMPORTED_MODULE_0__base_BlankPlugin__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (BaseMenu);

/***/ }),

/***/ "./resources/assets/js/scripts/menu/DesktopMenu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/BaseMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DesktopMenuContainer__ = __webpack_require__("./resources/assets/js/scripts/menu/DesktopMenuContainer.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DesktopMenu = function (_BaseMenu) {
    _inherits(DesktopMenu, _BaseMenu);

    function DesktopMenu() {
        _classCallCheck(this, DesktopMenu);

        return _possibleConstructorReturn(this, (DesktopMenu.__proto__ || Object.getPrototypeOf(DesktopMenu)).apply(this, arguments));
    }

    _createClass(DesktopMenu, [{
        key: 'init',
        value: function init() {
            this.subMenu = new __WEBPACK_IMPORTED_MODULE_1__DesktopMenuContainer__["a" /* default */]('.js-catalog-nav--menu');
            this.appContainer = document.querySelector('.js-app');

            this.menuEl.classList.add('ht-container');
            this.menuEl.classList.add('ht-container--popup');
            this.subMenu.menuEl.classList.add('ht-inner');

            this.initButton();
        }
    }, {
        key: 'initButton',
        value: function initButton() {
            var _this2 = this;

            this.menuShowButtonEl = document.querySelector('.js-desktop-menu-btn');
            if (!this.menuShowButtonEl) return;

            heightToggle(this.menuShowButtonEl, {
                bindCloseEvents: true,
                element: this.menuEl
            });

            this.bindEvent(this.menuShowButtonEl, 'HT::before-open', function () {
                _this2.open();
            });

            this.bindEvent(this.menuShowButtonEl, 'HT::before-close', function () {
                _this2.close();
            });
        }
    }, {
        key: 'beforeOpen',
        value: function beforeOpen() {
            this.appContainer.classList.add('menu-opened');
        }
    }, {
        key: 'beforeClose',
        value: function beforeClose() {
            this.appContainer.classList.remove('menu-opened');
            this.subMenu.close();
        }
    }, {
        key: 'beforeDestroy',
        value: function beforeDestroy() {
            this.close();
            this.menuShowButtonEl.heightToggle.destroy();
            this.subMenu.destroy();

            this.menuEl.classList.remove('ht-container');
            this.menuEl.classList.remove('ht-container--popup');
            this.subMenu.menuEl.classList.remove('ht-inner');
        }
    }]);

    return DesktopMenu;
}(__WEBPACK_IMPORTED_MODULE_0__BaseMenu__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (DesktopMenu);

/***/ }),

/***/ "./resources/assets/js/scripts/menu/DesktopMenuContainer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/BaseMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DesktopSubMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/DesktopSubMenu.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




function getElementOffset(el) {
    var offset = el.getBoundingClientRect();

    return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset,
        bottom: offset.top + el.scrollHeight,
        right: offset.left + el.scrollWidth
    };
}

var DesktopMenuContainer = function (_BaseMenu) {
    _inherits(DesktopMenuContainer, _BaseMenu);

    function DesktopMenuContainer() {
        _classCallCheck(this, DesktopMenuContainer);

        return _possibleConstructorReturn(this, (DesktopMenuContainer.__proto__ || Object.getPrototypeOf(DesktopMenuContainer)).apply(this, arguments));
    }

    _createClass(DesktopMenuContainer, [{
        key: 'init',
        value: function init() {
            this.menuSubsEl = this.menuEl.querySelector('.js-catalog-nav--subs');

            if (!this.menuSubsEl) return;
            this.menuEl.classList.add('is-active');

            this.closePendingLoader = false;
            this.linksEls = {};
            this.subMenus = {};

            this.initSubLists();
            this.initParentLinks();
            this.calculateNavHeight();
            this.initMousemove();

            this.activeRowId = false;
            this.mouseLocs = [];
            this.lastDelayLoc = null;
            this.timeoutId = null;

            this.delay = 300;
            this.tolerance = 10;
        }
    }, {
        key: 'initMousemove',
        value: function initMousemove() {
            this.bindEvent(document, 'mousemove', this.mousemoveDocument);
        }
    }, {
        key: 'mousemoveDocument',
        value: function mousemoveDocument(e) {
            this.mouseLocs.push({
                x: e.pageX,
                y: e.pageY
            });

            if (this.mouseLocs.length > 2) {
                this.mouseLocs.shift();
            }
        }
    }, {
        key: 'activateRow',
        value: function activateRow(id) {
            if (this.activeRowId === id || !(id in this.linksEls)) {
                return;
            }

            if (this.activeRowId !== false) {
                this.deactivateRow();
            }

            if (id in this.subMenus) {
                this.open();
            } else {
                this.close();
            }

            this.linksEls[id].classList.add('is-active');

            if (id in this.subMenus) {
                this.subMenus[id].open();
            }

            this.activeRowId = id;
        }
    }, {
        key: 'deactivateRow',
        value: function deactivateRow() {
            this.clearTimeout();

            if (!this.activeRowId) return;

            this.linksEls[this.activeRowId].classList.remove('is-active');

            if (this.activeRowId in this.subMenus) {
                this.subMenus[this.activeRowId].close();
            }

            this.activeRowId = false;
        }
    }, {
        key: 'mouseenterRow',
        value: function mouseenterRow(id) {
            this.clearTimeout();
            this.possiblyActivate(id);
        }
    }, {
        key: 'possiblyActivate',
        value: function possiblyActivate(id) {
            var _this2 = this;

            var delay = this.getActivationDelay();

            if (delay) {
                this.timeoutId = setTimeout(function () {
                    _this2.possiblyActivate(id);
                }, delay);
            } else {
                this.activateRow(id);
            }
        }
    }, {
        key: 'clearTimeout',
        value: function (_clearTimeout) {
            function clearTimeout() {
                return _clearTimeout.apply(this, arguments);
            }

            clearTimeout.toString = function () {
                return _clearTimeout.toString();
            };

            return clearTimeout;
        }(function () {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
        })
    }, {
        key: 'getActivationDelay',
        value: function getActivationDelay() {
            if (!this.activeRowId) {
                return 0;
            }

            var rowOffset = getElementOffset(this.linksEls[this.activeRowId]);
            var menuOffset = getElementOffset(this.menuSubsEl);

            var upperLeft = {
                x: rowOffset.left,
                y: menuOffset.top - this.tolerance
            };

            var upperRight = {
                x: rowOffset.right,
                y: upperLeft.y
            };

            var lowerLeft = {
                x: upperLeft.x,
                y: menuOffset.bottom + this.tolerance
            };

            var lowerRight = {
                x: upperRight.x,
                y: lowerLeft.y
            };

            var loc = this.mouseLocs[this.mouseLocs.length - 1],
                prevLoc = this.mouseLocs[0];

            if (!loc) {
                return 0;
            }

            if (!prevLoc) {
                prevLoc = loc;
            }

            if (prevLoc.x < upperLeft.x || prevLoc.x > lowerRight.x || prevLoc.y < upperLeft.y || prevLoc.y > lowerRight.y) {
                return 0;
            }

            if (this.lastDelayLoc && loc.x == this.lastDelayLoc.x && loc.y == this.lastDelayLoc.y) {
                return 0;
            }

            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            }

            var decreasingCorner = upperRight,
                increasingCorner = lowerRight;

            var decreasingSlope = slope(loc, decreasingCorner),
                increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);

            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {

                this.lastDelayLoc = loc;

                return this.delay;
            }

            this.lastDelayLoc = null;
            return 0;
        }
    }, {
        key: 'initSubLists',
        value: function initSubLists() {
            var _this3 = this;

            [].forEach.call(this.menuEl.querySelectorAll('.js-catalog-nav--sub'), function (el) {
                var id = el.getAttribute('data-id');
                _this3.subMenus[id] = new __WEBPACK_IMPORTED_MODULE_1__DesktopSubMenu__["a" /* default */](el);

                _this3.bindEvent(el, 'mouseover', function () {
                    _this3.mouseenterRow(id);
                });
            });
        }
    }, {
        key: 'initParentLinks',
        value: function initParentLinks() {
            var _this4 = this;

            [].forEach.call(document.querySelectorAll('.js-catalog-nav--link'), function (el) {
                var id = el.getAttribute('data-id');

                _this4.linksEls[id] = el;

                _this4.bindEvent(el, 'mouseover', function () {
                    _this4.mouseenterRow(id);
                });

                _this4.bindEvent(el, 'click', function () {
                    _this4.activateRow(id);
                });
            });
        }
    }, {
        key: 'calculateNavHeight',
        value: function calculateNavHeight() {
            var _this5 = this;

            this.catalogNavHeight = [].reduce.apply(Object.keys(this.subMenus), [function (acc, id) {
                var height = _this5.subMenus[id].menuEl.scrollHeight;

                if (acc < height) {
                    acc = height;
                }

                return acc;
            }, 0]);

            this.menuEl.style.height = this.catalogNavHeight + 'px';
        }
    }, {
        key: 'beforeDestroy',
        value: function beforeDestroy() {
            var _this6 = this;

            this.linksEls = {};
            this.subMenus = {};
            Object.keys(this.subMenus).forEach(function (id) {
                return _this6.subMenus[id].destroy();
            });
            this.menuEl.removeAttribute('style');
        }
    }]);

    return DesktopMenuContainer;
}(__WEBPACK_IMPORTED_MODULE_0__BaseMenu__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (DesktopMenuContainer);

/***/ }),

/***/ "./resources/assets/js/scripts/menu/DesktopSubMenu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/BaseMenu.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var DesktopSubMenu = function (_BaseMenu) {
  _inherits(DesktopSubMenu, _BaseMenu);

  function DesktopSubMenu() {
    _classCallCheck(this, DesktopSubMenu);

    return _possibleConstructorReturn(this, (DesktopSubMenu.__proto__ || Object.getPrototypeOf(DesktopSubMenu)).apply(this, arguments));
  }

  return DesktopSubMenu;
}(__WEBPACK_IMPORTED_MODULE_0__BaseMenu__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (DesktopSubMenu);

/***/ }),

/***/ "./resources/assets/js/scripts/menu/MobileMenu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseMenu__ = __webpack_require__("./resources/assets/js/scripts/menu/BaseMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SidePopupper__ = __webpack_require__("./resources/assets/js/scripts/SidePopupper.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var MobileMenu = function (_BaseMenu) {
    _inherits(MobileMenu, _BaseMenu);

    function MobileMenu() {
        _classCallCheck(this, MobileMenu);

        return _possibleConstructorReturn(this, (MobileMenu.__proto__ || Object.getPrototypeOf(MobileMenu)).apply(this, arguments));
    }

    _createClass(MobileMenu, [{
        key: 'init',
        value: function init() {
            this.menuEl = this.menuEl.cloneNode(true);
            this.popuper = new __WEBPACK_IMPORTED_MODULE_1__SidePopupper__["a" /* default */](this.menuEl);
            this.popuper.addTrigger('.js-mobile-menu-btn');

            this.initButton();
            this.initLinks();

            this.subMenus = [].reduce.apply(document.querySelectorAll('.js-catalog-nav--sub'), [function (acc, el) {
                acc[el.getAttribute('data-id')] = el;

                return acc;
            }, {}]);
        }
    }, {
        key: 'initButton',
        value: function initButton() {
            this.menuButtonEl = document.querySelector('.js-mobile-menu-btn');
            if (!this.menuButtonEl) return;

            this.bindEvent(this.menuButtonEl, 'click', this.open, { passive: true });
        }
    }, {
        key: 'initLinks',
        value: function initLinks() {
            var _this2 = this;

            this.bindEvent(window, 'click', function (e) {
                if (e.target.classList.contains('js-mobile-nav-btn') || e.target.classList.contains('js-catalog-nav--link')) {
                    e.stopPropagation();
                    _this2.showPage(e.target.getAttribute('data-id'));
                }
            }, { passive: true });
        }
    }, {
        key: 'showPage',
        value: function showPage(id) {
            if (!(id in this.subMenus)) return;

            this.popuper.addPage(this.subMenus[id].cloneNode(true));
        }
    }]);

    return MobileMenu;
}(__WEBPACK_IMPORTED_MODULE_0__BaseMenu__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MobileMenu);

/***/ }),

/***/ "./resources/assets/js/scripts/meta/breadcrumbs.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setBreadcrumbs;
function setBreadcrumbs(data) {
    var breadcrumbsEl = document.querySelector('.shop-breadcrumbs');

    if (!breadcrumbsEl) return;

    breadcrumbsEl.parentNode.replaceChild(buildNewBreadcrumbs(data), breadcrumbsEl);
}

function buildNewBreadcrumbs(data) {
    var breadcrumbsEl = document.createElement('nav');
    breadcrumbsEl.className = 'shop-breadcrumbs';
    var containerEl = document.createElement('div');
    containerEl.className = 'shop-breadcrumbs__container';

    return data.reduce(function (acc, itemData, index) {
        var itemEl = document.createElement('div');
        itemEl.className = 'shop-breadcrumbs__item';
        var separatorEl = itemEl.cloneNode();
        var linkEl = void 0;

        if (itemData.link) {
            linkEl = document.createElement('a');
            linkEl.className = 'shop-breadcrumbs__link link';
            linkEl.setAttribute('href', itemData.link);
        } else {
            linkEl = document.createElement('span');
            linkEl.className = 'shop-breadcrumbs__active';
        }

        linkEl.innerHTML = itemData.title;

        itemEl.appendChild(linkEl);
        containerEl.appendChild(itemEl);

        if (data.length - 1 > index) {
            separatorEl.innerHTML = '<svg class="shop-breadcrumbs__separator"><use xlink:href="/assets/images/icons.svg#symbol-chevron-right"></use></svg>';
            containerEl.appendChild(separatorEl);
        }

        return containerEl;
    }, containerEl);
}

/***/ }),

/***/ "./resources/assets/js/scripts/meta/title.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setTitle;
function setTitle(title) {
    var titleEl = document.querySelector('.js-main-title, .title-h1');

    if (titleEl) {
        titleEl.innerHTML = title;
    }
}

/***/ }),

/***/ "./resources/assets/js/store/cabinet/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__("./resources/assets/js/store/cabinet/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__ = __webpack_require__("./resources/assets/js/scripts/LocalStorageProxy.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__ = __webpack_require__("./resources/assets/js/store/localStorageActionsExtension.js");
var _mutations;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,

    state: {
        ready: false,

        pages: {
            orders: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('Orders'),
            profile: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('Profile'),
            reviews: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('Reviews'),
            questions: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('Questions')
        },

        activePage: null
    },

    actions: _extends({}, __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__["a" /* default */], {
        init: function init(_ref) {
            var state = _ref.state,
                dispatch = _ref.dispatch,
                commit = _ref.commit;

            if (state.ready) return;

            var pathname = window.location.pathname.split('/');
            var key = pathname[pathname.length - 1];

            if (key in state.pages) {
                state.activePage = key;
            }

            dispatch('initLocalStorageExtension', new __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__["a" /* LocalStorageProxy */]('__cabinet'));

            commit(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* CATALOG_READY */]);
        },
        setPage: function setPage(_ref2, key) {
            var state = _ref2.state,
                commit = _ref2.commit,
                dispatch = _ref2.dispatch;

            if (key in state.pages) {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["b" /* CATALOG_SET_PAGE */], key);
            }
        }
    }),

    mutations: (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["a" /* CATALOG_READY */], function (state) {
        state.ready = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["b" /* CATALOG_SET_PAGE */], function (state, key) {
        state.activePage = key;
    }), _mutations)
});

/***/ }),

/***/ "./resources/assets/js/store/cabinet/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CATALOG_SET_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CATALOG_READY; });
var CATALOG_SET_PAGE = 'CATALOG_SET_PAGE';
var CATALOG_READY = 'CATALOG_READY';

/***/ }),

/***/ "./resources/assets/js/store/cart/LocalCart.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LocalCart */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_LocalStorageProxy__ = __webpack_require__("./resources/assets/js/scripts/LocalStorageProxy.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var cartParamKeys = ['synchronized', 'time', 'items'];

var LocalCart = function () {
    function LocalCart(namespace) {
        _classCallCheck(this, LocalCart);

        this.namespace = namespace;
    }

    _createClass(LocalCart, [{
        key: 'get',
        value: function get() {
            var _this = this;

            return cartParamKeys.reduce(function (acc, key) {
                acc[key] = _this.getFromStorage(key);
                return acc;
            }, {});
        }
    }, {
        key: 'set',
        value: function set(data) {
            var _this2 = this;

            LocalCart.checkData(data);

            cartParamKeys.forEach(function (key) {
                return __WEBPACK_IMPORTED_MODULE_0__scripts_LocalStorageProxy__["b" /* default */].add(_this2.makeKey(key), data[key]);
            });
        }
    }, {
        key: 'getFromStorage',
        value: function getFromStorage(key) {
            return __WEBPACK_IMPORTED_MODULE_0__scripts_LocalStorageProxy__["b" /* default */].get(this.makeKey(key));
        }
    }, {
        key: 'exists',
        value: function exists() {
            return __WEBPACK_IMPORTED_MODULE_0__scripts_LocalStorageProxy__["b" /* default */].has(this.makeKey('items'));
        }
    }, {
        key: 'makeKey',
        value: function makeKey(key) {
            if (!key) {
                return this.namespace;
            }

            return this.namespace + '::' + key;
        }
    }], [{
        key: 'checkData',
        value: function checkData(data) {
            cartParamKeys.forEach(function (key) {
                if (!key in data) {
                    throw new Error('Укажите параметр при изменении содержимого корзины: ' + key);
                }
            });
        }
    }]);

    return LocalCart;
}();

var cart = new LocalCart('__cart');

/* harmony default export */ __webpack_exports__["a"] = (cart);

/***/ }),

/***/ "./resources/assets/js/store/cart/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = makeKey;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./resources/assets/js/store/cart/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocalCart__ = __webpack_require__("./resources/assets/js/store/cart/LocalCart.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scripts_DataHandler__ = __webpack_require__("./resources/assets/js/scripts/DataHandler.js");
var _mutations;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







function makeKey(id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return options.sort(function (a, b) {
        return a - b;
    }).reduce(function (acc, optionId) {
        return acc + '-' + optionId;
    }, id);
}

var CartItem = function () {
    function CartItem(key) {
        var qty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, CartItem);

        this.key = key.toString();
        this.setQty(qty);
        this.loaded = false;
    }

    _createClass(CartItem, [{
        key: 'hasKey',
        value: function hasKey(key) {
            if (!key) return false;
            return this.key === key.toString();
        }
    }, {
        key: 'getMaxQty',
        value: function getMaxQty() {
            // if (this.loaded && _.isNumber(this.info.remnant)) {
            //     return this.info.remnant
            // }

            return 99;
        }
    }, {
        key: 'getMinQty',
        value: function getMinQty() {
            return 1;
        }
    }, {
        key: 'setQty',
        value: function setQty(qty) {
            this.qty = Math.min(this.getMaxQty(), Math.max(this.getMinQty(), qty));
        }
    }, {
        key: 'add',
        value: function add(qty) {
            this.setQty(this.qty + qty);

            return this;
        }
    }, {
        key: 'update',
        value: function update(qty) {
            this.setQty(qty);

            return this;
        }
    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            return this.loaded;
        }
    }, {
        key: 'getInfo',
        value: function getInfo() {
            return this.info;
        }
    }, {
        key: 'setProductInfo',
        value: function setProductInfo(info) {
            this.info = _extends({}, info);

            this.setQty(this.qty);

            this.loaded = true;

            return this;
        }
    }]);

    return CartItem;
}();

function itemsToCartItems() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return items.map(function (item) {
        var ci = new CartItem(item.key, item.qty);

        if (item.info) {
            ci.setProductInfo(item.info);
        }

        return ci;
    });
}

function operateItem(items, method, key, qty) {
    var changed = false;

    var result = items.map(function (item) {
        if (item.hasKey(key)) {
            item[method](qty);
            changed = true;
        }

        return item;
    });

    if (!changed) {
        result.push(new CartItem(key, qty));
    }

    return result;
}

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,

    state: {
        lastSyncTime: null,
        ready: false,
        loading: false,
        error: false,
        synchronized: false,
        items: [],
        options: [],
        abortRequest: null
    },

    actions: {
        addProduct: function addProduct(_ref, _ref2) {
            var commit = _ref.commit,
                dispatch = _ref.dispatch;

            var _ref3 = _slicedToArray(_ref2, 2),
                _ref3$ = _ref3[0],
                id = _ref3$.id,
                options = _ref3$.options,
                qty = _ref3[1];

            dispatch('addItem', [makeKey(id, options), qty]);
        },
        updateProduct: function updateProduct(_ref4, _ref5) {
            var commit = _ref4.commit,
                dispatch = _ref4.dispatch;

            var _ref6 = _slicedToArray(_ref5, 2),
                _ref6$ = _ref6[0],
                id = _ref6$.id,
                options = _ref6$.options,
                qty = _ref6[1];

            dispatch('updateItem', [makeKey(id, options), qty]);
        },
        removeProduct: function removeProduct(_ref7, _ref8) {
            var commit = _ref7.commit,
                dispatch = _ref7.dispatch;
            var id = _ref8.id,
                options = _ref8.options;

            dispatch('removeItem', makeKey(id, options));
        },
        addItem: function addItem(_ref9, keyQtyArr) {
            var commit = _ref9.commit,
                dispatch = _ref9.dispatch;

            commit(__WEBPACK_IMPORTED_MODULE_1__types__["a" /* CART_ADD_ITEM */], keyQtyArr);

            dispatch('dirty');
            dispatch('add', keyQtyArr);
        },
        updateItem: function updateItem(_ref10, keyQtyArr) {
            var commit = _ref10.commit,
                dispatch = _ref10.dispatch;

            commit(__WEBPACK_IMPORTED_MODULE_1__types__["j" /* CART_UPDATE_ITEM */], keyQtyArr);

            dispatch('dirty');
            this.syncDebouncer();
        },
        removeItem: function removeItem(_ref11, key) {
            var commit = _ref11.commit,
                dispatch = _ref11.dispatch;

            commit(__WEBPACK_IMPORTED_MODULE_1__types__["e" /* CART_REMOVE_ITEM */], key);

            dispatch('dirty');
            this.syncDebouncer();
        },
        clear: function clear(_ref12) {
            var commit = _ref12.commit,
                dispatch = _ref12.dispatch;

            commit(__WEBPACK_IMPORTED_MODULE_1__types__["b" /* CART_CLEAR */]);

            dispatch('dirty');
            this.syncDebouncer();
        },
        dirty: function dirty(_ref13) {
            var state = _ref13.state,
                commit = _ref13.commit,
                dispatch = _ref13.dispatch;
            var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            commit(__WEBPACK_IMPORTED_MODULE_1__types__["c" /* CART_DIRTY */]);
            dispatch('updateLocalCart');

            if (state.loading && _.isFunction(state.abortRequest)) {
                state.abortRequest();
            }
        },
        refresh: function refresh(_ref14) {
            var state = _ref14.state,
                dispatch = _ref14.dispatch;

            dispatch('init');
        },
        init: function init(_ref15) {
            var commit = _ref15.commit,
                state = _ref15.state,
                dispatch = _ref15.dispatch;

            if (state.ready || state.loading) {
                return;
            }

            this.syncDebouncer = _.debounce(function () {
                return dispatch('sync');
            }, 400);
            var cartRequest = void 0;

            if (!__WEBPACK_IMPORTED_MODULE_2__LocalCart__["a" /* default */].exists()) {
                cartRequest = dispatch('load');
            } else {
                var localCartData = __WEBPACK_IMPORTED_MODULE_2__LocalCart__["a" /* default */].get();

                if (!localCartData.synchronized) {
                    cartRequest = dispatch('load');
                } else {
                    state.lastSyncTime = localCartData.time;
                    state.items = itemsToCartItems(localCartData.items);
                    cartRequest = dispatch('sync');
                }
            }

            // todo: вынести отсюда загрузку аттрибутов в отдельное место (DataStore?)
            Promise.all([cartRequest, dispatch('loadOptionsDescription')]);
        },
        loadOptionsDescription: function loadOptionsDescription(_ref16) {
            var commit = _ref16.commit;

            return __WEBPACK_IMPORTED_MODULE_4__scripts_DataHandler__["a" /* default */].get('attributes').then(function (data) {
                return commit(__WEBPACK_IMPORTED_MODULE_1__types__["i" /* CART_SET_OPTION_DESCRIPTIONS */], data.attributes);
            }).catch(function () {
                __WEBPACK_IMPORTED_MODULE_4__scripts_DataHandler__["a" /* default */].flush();
            });
        },
        add: function add(_ref17, item) {
            var dispatch = _ref17.dispatch;

            dispatch('request', {
                method: 'put',
                url: __WEBPACK_IMPORTED_MODULE_3__scripts_core__["a" /* default */].siteUrl('cart/' + item[0]),
                data: {
                    qty: item[1] || 1
                }
            });
        },
        request: function request(_ref18, config) {
            var state = _ref18.state,
                commit = _ref18.commit,
                dispatch = _ref18.dispatch;

            commit(__WEBPACK_IMPORTED_MODULE_1__types__["g" /* CART_REQUEST_START */]);

            return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.request(_extends({}, config, {
                cancelToken: new __WEBPACK_IMPORTED_MODULE_0_axios___default.a.CancelToken(function (c) {
                    return state.abortRequest = c;
                })
            })).then(function (response) {
                commit(__WEBPACK_IMPORTED_MODULE_1__types__["h" /* CART_REQUEST_SUCCESS */], response);
                dispatch('updateLocalCart');
            }).catch(function (thrown) {
                if (!__WEBPACK_IMPORTED_MODULE_0_axios___default.a.isCancel(thrown)) {
                    commit(__WEBPACK_IMPORTED_MODULE_1__types__["f" /* CART_REQUEST_FAILURE */]);
                }
            });
        },
        load: function load(_ref19) {
            var state = _ref19.state,
                commit = _ref19.commit,
                dispatch = _ref19.dispatch;

            return dispatch('request', {
                url: __WEBPACK_IMPORTED_MODULE_3__scripts_core__["a" /* default */].siteUrl('cart'),
                method: 'post'
            });
        },
        sync: function sync(_ref20) {
            var state = _ref20.state,
                dispatch = _ref20.dispatch;

            return dispatch('request', {
                url: __WEBPACK_IMPORTED_MODULE_3__scripts_core__["a" /* default */].siteUrl('cart'),
                method: 'put',
                data: {
                    time: state.lastSyncTime,
                    items: state.items.map(function (item) {
                        return {
                            key: item.key,
                            qty: item.qty
                        };
                    })
                }
            });
        },
        updateLocalCart: function updateLocalCart(_ref21) {
            var state = _ref21.state;

            __WEBPACK_IMPORTED_MODULE_2__LocalCart__["a" /* default */].set({
                time: state.lastSyncTime,
                synchronized: state.synchronized,
                items: state.items.map(function (item) {
                    return {
                        key: item.key,
                        qty: item.qty
                    };
                })
            });
        }
    },

    mutations: (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["a" /* CART_ADD_ITEM */], function (state, _ref22) {
        var _ref23 = _slicedToArray(_ref22, 2),
            key = _ref23[0],
            _ref23$ = _ref23[1],
            qty = _ref23$ === undefined ? 1 : _ref23$;

        state.items = operateItem(state.items, 'add', key, qty);
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["j" /* CART_UPDATE_ITEM */], function (state, _ref24) {
        var _ref25 = _slicedToArray(_ref24, 2),
            key = _ref25[0],
            qty = _ref25[1];

        state.items = operateItem(state.items, 'update', key, qty);
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["e" /* CART_REMOVE_ITEM */], function (state, key) {
        state.items = state.items.filter(function (item) {
            return !item.hasKey(key);
        });
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["b" /* CART_CLEAR */], function (state) {
        state.items = [];
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["c" /* CART_DIRTY */], function (state) {
        state.synchronized = false;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["g" /* CART_REQUEST_START */], function (state) {
        state.loading = true;
        state.error = false;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["d" /* CART_READY */], function (state) {
        state.ready = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["h" /* CART_REQUEST_SUCCESS */], function (state) {
        var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var data = response.data || {};
        state.items = itemsToCartItems(data.items);
        state.lastSyncTime = data.time;
        state.ready = true;
        state.synchronized = true;
        state.loading = false;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["f" /* CART_REQUEST_FAILURE */], function (state) {
        state.loading = false;
        state.error = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_1__types__["i" /* CART_SET_OPTION_DESCRIPTIONS */], function (state, attributes) {
        state.options = attributes.reduce(function (acc, attribute) {
            (attribute.options || []).forEach(function (option) {
                acc[option.id] = option.title;
            });

            return acc;
        }, {});
    }), _mutations),

    getters: {
        loaded: function loaded(state) {
            return state.items.filter(function (item) {
                return item.isLoaded();
            });
        },
        products: function products(state, getters) {
            return getters.loaded.map(function (item) {
                var product = _extends({}, item.getInfo(), {
                    quantity: item.qty,
                    key: item.key
                });

                if (!(_.isEmpty(state.options) || _.isEmpty(product.options))) {
                    product.attributes = product.options.reduce(function (acc, id) {
                        if (id in state.options) {
                            acc.push(state.options[id]);
                        }

                        return acc;
                    }, []).join(', ');
                }

                return product;
            });
        },
        quantity: function quantity(state) {
            return state.items.reduce(function (acc, item) {
                return acc + item.qty;
            }, 0);
        },
        isEmpty: function isEmpty(state, getters) {
            return getters.loaded.length === 0;
        },
        stepNotDone: function stepNotDone(state, getters) {
            return state.loading || state.error || getters.isEmpty || !(state.ready && state.synchronized);
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/store/cart/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CART_READY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CART_ADD_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CART_UPDATE_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CART_REMOVE_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CART_CLEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CART_DIRTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CART_REQUEST_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CART_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CART_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CART_SET_OPTION_DESCRIPTIONS; });
var CART_READY = 'CART_READY';

var CART_ADD_ITEM = 'CART_ADD_ITEM';
var CART_UPDATE_ITEM = 'CART_UPDATE_ITEM';
var CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

var CART_CLEAR = 'CART_CLEAR';
var CART_DIRTY = 'CART_DIRTY';

var CART_REQUEST_START = 'CART_REQUEST_START';
var CART_REQUEST_SUCCESS = 'CART_REQUEST_SUCCESS';
var CART_REQUEST_FAILURE = 'CART_REQUEST_FAILURE';

var CART_SET_OPTION_DESCRIPTIONS = 'CART_SET_OPTION_DESCRIPTIONS';

/***/ }),

/***/ "./resources/assets/js/store/catalog/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__("./resources/assets/js/store/catalog/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__ = __webpack_require__("./resources/assets/js/scripts/LocalStorageProxy.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__ = __webpack_require__("./resources/assets/js/store/localStorageActionsExtension.js");
var _mutations;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,

    state: {
        ready: false,

        cards: {
            types: {
                tile: {
                    icon: 'symbol-tile',
                    title: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('tile')
                },

                list: {
                    icon: 'symbol-list',
                    title: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('list')
                }
            },

            active: 'tile'
        }
    },

    actions: _extends({}, __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__["a" /* default */], {
        init: function init(_ref) {
            var state = _ref.state,
                dispatch = _ref.dispatch,
                commit = _ref.commit;

            if (state.ready) return;

            dispatch('initLocalStorageExtension', new __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__["a" /* LocalStorageProxy */]('__catalog'));

            commit(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* CATALOG_READY */]);
        },
        setCardType: function setCardType(_ref2, type) {
            var state = _ref2.state,
                commit = _ref2.commit,
                dispatch = _ref2.dispatch;

            if (type in state.cards.types) {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["b" /* CATALOG_SET_CARD_TYPE */], type);
                dispatch('updateLocalStorage', 'cards.active');
            }
        }
    }),

    mutations: (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["a" /* CATALOG_READY */], function (state) {
        state.ready = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["b" /* CATALOG_SET_CARD_TYPE */], function (state, type) {
        state.cards.active = type;
    }), _mutations)
});

/***/ }),

/***/ "./resources/assets/js/store/catalog/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CATALOG_SET_CARD_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CATALOG_READY; });
var CATALOG_SET_CARD_TYPE = 'CATALOG_SET_CARD_TYPE';
var CATALOG_READY = 'CATALOG_READY';

/***/ }),

/***/ "./resources/assets/js/store/checkout/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__("./resources/assets/js/store/checkout/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_SmoothScroll__ = __webpack_require__("./resources/assets/js/scripts/SmoothScroll.js");
var _mutations;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var historyProxy = function () {
    function historyProxy() {
        var _this = this;

        _classCallCheck(this, historyProxy);

        this.proxy = document.createElement('a');
        this.proxy.href = window.location.href;

        window.addEventListener('popstate', function () {
            _this.proxy.href = window.location.href;
        }, { passive: true });
    }

    _createClass(historyProxy, [{
        key: 'setHash',
        value: function setHash(hash) {
            this.set('hash', hash);
        }
    }, {
        key: 'getHash',
        value: function getHash() {
            return this.get('hash').replace('#', '');
        }
    }, {
        key: 'get',
        value: function get(part) {
            return this.proxy[part];
        }
    }, {
        key: 'set',
        value: function set(part, value) {
            this.proxy[part] = value;

            this.pushState();
        }
    }, {
        key: 'pushState',
        value: function pushState() {
            window.history.pushState(null, null, this.proxy.href);
        }
    }]);

    return historyProxy;
}();

var hp = new historyProxy();

function getStepIndex(state, identif) {
    identif = identif.toLowerCase();

    for (var i = 0; i < state.steps.length; i++) {
        if (state.steps[i].identif.toLowerCase() === identif) {
            return i;
        }
    }

    return false;
}

function scrollIsNeed() {
    var stepsEl = document.querySelector('.js-checkout-steps');
    if (!stepsEl) {
        return false;
    }

    var y = stepsEl.getBoundingClientRect().y;

    return y + stepsEl.offsetHeight < stepsEl.offsetHeight / 2;
}

function scrollToStart(cb) {
    if (scrollIsNeed()) {
        new __WEBPACK_IMPORTED_MODULE_2__scripts_SmoothScroll__["a" /* default */]('.js-checkout', 300, function () {
            cb();
        });
    } else {
        cb();
    }
}

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,

    state: {
        steps: [{
            identif: 'cart',
            icon: 'symbol-cart',
            stepName: 'Шаг первый',
            title: 'Корзина'
        }, {
            identif: 'shipping',
            icon: 'symbol-truck',
            stepName: 'Шаг второй',
            title: 'Доставка'
        }, {
            identif: 'payment',
            icon: 'symbol-credit-card',
            stepName: 'Шаг третий',
            title: 'Оплата'
        }, {
            identif: 'confirmation',
            icon: 'symbol-confirmation',
            stepName: 'Шаг четвёртый',
            title: 'Подтверждение'
        }],

        active: 0,
        direction: 'forward'
    },

    actions: {
        init: function init(_ref) {
            var state = _ref.state,
                dispatch = _ref.dispatch,
                commit = _ref.commit;

            dispatch('setByIndex', [getStepIndex(state, hp.getHash('hash')) || 0, false]);

            if (!state.ready) {
                var baseUrl = __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].siteUrl('cart');

                window.addEventListener('popstate', function () {
                    if (window.location.href.indexOf(baseUrl) === 0) {
                        dispatch('setByIndex', [getStepIndex(state, hp.getHash('hash')) || 0, false]);
                    } else {
                        window.location.reload();
                    }
                }, { passive: true });

                commit(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* CHECKOUT_READY */]);
            }
        },
        set: function set(_ref2, stepName) {
            var state = _ref2.state,
                dispatch = _ref2.dispatch;

            dispatch('setByIndex', [getStepIndex(state, stepName)]);
        },
        next: function next(_ref3) {
            var state = _ref3.state,
                dispatch = _ref3.dispatch;

            dispatch('setByIndex', [state.active + 1]);
        },
        prev: function prev(_ref4) {
            var state = _ref4.state,
                dispatch = _ref4.dispatch;

            dispatch('setByIndex', [state.active - 1]);
        },
        setByIndex: function setByIndex(_ref5, _ref6) {
            var state = _ref5.state,
                commit = _ref5.commit;

            var _ref7 = _slicedToArray(_ref6, 2),
                index = _ref7[0],
                _ref7$ = _ref7[1],
                toHistory = _ref7$ === undefined ? true : _ref7$;

            if (state.active !== index && index in state.steps) {
                scrollToStart(function () {
                    commit(__WEBPACK_IMPORTED_MODULE_0__types__["b" /* CHECKOUT_SET_STEP */], index);
                });

                if (toHistory) {
                    hp.setHash(index === 0 ? '' : state.steps[index].identif);
                }
            }
        }
    },

    mutations: (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["a" /* CHECKOUT_READY */], function (state) {
        state.ready = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["b" /* CHECKOUT_SET_STEP */], function (state, newActiveIndex) {
        if (newActiveIndex > state.active) {
            state.direction = 'forward';
        } else {
            state.direction = 'back';
        }

        state.active = newActiveIndex;
    }), _mutations),

    getters: {
        activeTab: function activeTab(state) {
            return state.steps[state.active].identif;
        }
    }
});

/***/ }),

/***/ "./resources/assets/js/store/checkout/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHECKOUT_READY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHECKOUT_SET_STEP; });
var CHECKOUT_READY = 'CHECKOUT_READY';
var CHECKOUT_SET_STEP = 'CHECKOUT_SET_STEP';

/***/ }),

/***/ "./resources/assets/js/store/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cart__ = __webpack_require__("./resources/assets/js/store/cart/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__checkout__ = __webpack_require__("./resources/assets/js/store/checkout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shipping__ = __webpack_require__("./resources/assets/js/store/shipping/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payments__ = __webpack_require__("./resources/assets/js/store/payments/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__catalog__ = __webpack_require__("./resources/assets/js/store/catalog/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cabinet__ = __webpack_require__("./resources/assets/js/store/cabinet/index.js");







/* harmony default export */ __webpack_exports__["a"] = ({
    modules: {
        cart: __WEBPACK_IMPORTED_MODULE_0__cart__["a" /* default */],
        checkout: __WEBPACK_IMPORTED_MODULE_1__checkout__["a" /* default */],
        shipping: __WEBPACK_IMPORTED_MODULE_2__shipping__["a" /* default */],
        payments: __WEBPACK_IMPORTED_MODULE_3__payments__["a" /* default */],
        catalog: __WEBPACK_IMPORTED_MODULE_4__catalog__["a" /* default */],
        cabinet: __WEBPACK_IMPORTED_MODULE_5__cabinet__["a" /* default */]
    }
});

/***/ }),

/***/ "./resources/assets/js/store/localStorageActionsExtension.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isObject(obj) {
    return _.isObject(obj) && !_.isFunction(obj);
}

/**
 * Преобразование вида
 *
 * data = {
 *     'key1.key2': value
 * }
 *
 * в
 *
 * data = {
 *     key1: {
 *         key2: value
 *     }
 * }
 *
 * @param data
 * @returns {{}}
 */
function flatDataToTree(data) {
    return Object.keys(data).reduce(function (acc, key) {
        _.set(acc, key, data[key]);

        return acc;
    }, {});
}

/**
 * Копирование данных в state
 *
 * @param state
 * @param data
 */
function deepCopy(state) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var i in state) {
        if (i in data) {
            if (isObject(state[i])) {
                if (isObject(data[i])) {
                    deepCopy(state[i], data[i]);
                }
            } else {
                state[i] = data[i];
            }
        }
    }
}

/**
 * Получение не пустых данных (удаление пустых строк, объектов и т.д.), чтобы не захламлять localStorage
 *
 * @param data
 * @returns {*}
 */
function getNotEmptyData(data) {
    var result = void 0;

    if (isObject(data)) {
        result = {};

        for (var i in data) {
            var a = getNotEmptyData(data[i]);

            if (!_.isEmpty(a)) {
                result[i] = a;
            }
        }
    } else {
        result = data;
    }

    return result;
}

/* harmony default export */ __webpack_exports__["a"] = ({
    initLocalStorageExtension: function initLocalStorageExtension(_ref, localStorageProxy) {
        var state = _ref.state,
            dispatch = _ref.dispatch;

        state.localStorageProxy = localStorageProxy;
        state.debouncers = {};

        dispatch('initDataFromStorage');
    },
    updateLocalStorage: function updateLocalStorage(_ref2, type) {
        var state = _ref2.state;

        if (!(type in state.debouncers)) {
            state.debouncers[type] = _.throttle(function () {
                var data = getNotEmptyData(_.get(state, type));

                if (_.isBoolean(data) || !_.isEmpty(data)) {
                    state.localStorageProxy.add(type, data);
                } else {
                    state.localStorageProxy.forget(type);
                }
            }, 300);
        }

        state.debouncers[type]();
    },
    initDataFromStorage: function initDataFromStorage(_ref3) {
        var state = _ref3.state;

        var data = state.localStorageProxy.getAll();

        if (!_.isEmpty(data)) {
            deepCopy(state, flatDataToTree(data));
        }
    },
    clearStorageData: function clearStorageData() {
        state.localStorageProxy.forgetAll();
    },
    destroyLocalStorageInstance: function destroyLocalStorageInstance(_ref4) {
        var state = _ref4.state;

        state.localStorageProxy = undefined;
        state.debouncers = undefined;
    }
});

/***/ }),

/***/ "./resources/assets/js/store/payments/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__("./resources/assets/js/store/payments/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__ = __webpack_require__("./resources/assets/js/scripts/LocalStorageProxy.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__ = __webpack_require__("./resources/assets/js/store/localStorageActionsExtension.js");
var _mutations;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var defaultState = {
    ready: false,

    types: {
        'yandex_payment': {
            title: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('payments.yandex_payment.title'),
            image: {
                src: '/assets/images/payments/yandex_payment.png',
                srcset: '/assets/images/payments/yandex_payment@2x.png'
            }
        },
        'upon_receipt': {
            title: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('payments.upon_receipt.title'),
            infoTitle: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('payments.upon_receipt.info_title')
        }
    },

    type: 'yandex_payment'
};

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,

    state: _extends({}, defaultState),

    actions: _extends({}, __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__["a" /* default */], {
        init: function init(_ref) {
            var state = _ref.state,
                dispatch = _ref.dispatch,
                commit = _ref.commit;

            if (state.ready) return;

            dispatch('initLocalStorageExtension', new __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__["a" /* LocalStorageProxy */]('__payment'));

            commit(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* PAYMENTS_READY */]);
        },
        setType: function setType(_ref2, type) {
            var state = _ref2.state,
                commit = _ref2.commit,
                dispatch = _ref2.dispatch;

            if (type in state.types) {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["b" /* PAYMENTS_SET_TYPE */], type);
                dispatch('updateLocalStorage', 'type');
            }
        }
    }),

    mutations: (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["a" /* PAYMENTS_READY */], function (state) {
        state.ready = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["b" /* PAYMENTS_SET_TYPE */], function (state, type) {
        state.type = type;
    }), _mutations)
});

/***/ }),

/***/ "./resources/assets/js/store/payments/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PAYMENTS_READY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PAYMENTS_SET_TYPE; });
var PAYMENTS_READY = 'PAYMENTS_READY';
var PAYMENTS_SET_TYPE = 'PAYMENTS_SET_TYPE';

/***/ }),

/***/ "./resources/assets/js/store/shipping/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__("./resources/assets/js/store/shipping/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_core__ = __webpack_require__("./resources/assets/js/scripts/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__ = __webpack_require__("./resources/assets/js/scripts/LocalStorageProxy.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__ = __webpack_require__("./resources/assets/js/store/localStorageActionsExtension.js");
var _mutations;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var defaultState = {
    ready: false,

    data: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        post_code: '',
        comment: ''
    },

    types: {
        free: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('shipping.types.free'),
        express: __WEBPACK_IMPORTED_MODULE_1__scripts_core__["a" /* default */].translate('shipping.types.express')
    },

    type: 'free',

    validated: false
};

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,

    state: _extends({}, defaultState),

    actions: _extends({}, __WEBPACK_IMPORTED_MODULE_3__localStorageActionsExtension__["a" /* default */], {
        init: function init(_ref) {
            var state = _ref.state,
                dispatch = _ref.dispatch,
                commit = _ref.commit;

            if (state.ready) return;

            dispatch('initLocalStorageExtension', new __WEBPACK_IMPORTED_MODULE_2__scripts_LocalStorageProxy__["a" /* LocalStorageProxy */]('__shipping'));

            commit(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* SHIPPING_READY */]);
        },
        setValue: function setValue(_ref2, _ref3) {
            var state = _ref2.state,
                commit = _ref2.commit,
                dispatch = _ref2.dispatch;

            var _ref4 = _slicedToArray(_ref3, 2),
                label = _ref4[0],
                value = _ref4[1];

            if (label in state.data) {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["c" /* SHIPPING_SET_VALUE */], [label, value]);
                dispatch('updateLocalStorage', 'data');
            }
        },
        setType: function setType(_ref5, type) {
            var state = _ref5.state,
                commit = _ref5.commit,
                dispatch = _ref5.dispatch;

            if (type in state.types) {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["b" /* SHIPPING_SET_TYPE */], type);
                dispatch('updateLocalStorage', 'type');
            }
        },
        validation: function validation(_ref6, result) {
            var commit = _ref6.commit,
                dispatch = _ref6.dispatch;

            if (result) {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["e" /* SHIPPING_VALIDATION_SUCCESS */]);
            } else {
                commit(__WEBPACK_IMPORTED_MODULE_0__types__["d" /* SHIPPING_VALIDATION_FAILURE */]);
            }

            dispatch('updateLocalStorage', 'validated');
        }
    }),

    mutations: (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["a" /* SHIPPING_READY */], function (state) {
        state.ready = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["c" /* SHIPPING_SET_VALUE */], function (state, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            label = _ref8[0],
            value = _ref8[1];

        state.data[label] = value;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["b" /* SHIPPING_SET_TYPE */], function (state, type) {
        state.type = type;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["e" /* SHIPPING_VALIDATION_SUCCESS */], function (state) {
        state.validated = true;
    }), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__types__["d" /* SHIPPING_VALIDATION_FAILURE */], function (state) {
        state.validated = false;
    }), _mutations)
});

/***/ }),

/***/ "./resources/assets/js/store/shipping/types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHIPPING_READY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SHIPPING_SET_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SHIPPING_SET_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SHIPPING_VALIDATION_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SHIPPING_VALIDATION_FAILURE; });
var SHIPPING_READY = 'SHIPPING_READY';
var SHIPPING_SET_VALUE = 'SHIPPING_SET_VALUE';
var SHIPPING_SET_TYPE = 'SHIPPING_SET_TYPE';

var SHIPPING_VALIDATION_SUCCESS = 'SHIPPING_VALIDATION_SUCCESS';
var SHIPPING_VALIDATION_FAILURE = 'SHIPPING_VALIDATION_FAILURE';

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/app.js");
module.exports = __webpack_require__("./resources/assets/sass/app.scss");


/***/ })

},[0]);
//# sourceMappingURL=app.js.map