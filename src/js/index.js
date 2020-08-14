import normalize from '../scss/vendor/normalize.css';
//import skeleton from "../scss/vendor/skeleton.css";
import style from '../scss/main.scss';

/// JQUERY TOAST --- START -----
// jQuery toast plugin created by Kamran Ahmed copyright MIT license 2015
if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

(function ($, window, document, undefined) {
  'use strict';

  var Toast = {
    _positionClasses: [
      'bottom-left',
      'bottom-right',
      'top-right',
      'top-left',
      'bottom-center',
      'top-center',
      'mid-center',
    ],
    _defaultIcons: ['success', 'error', 'info', 'warning'],

    init: function (options, elem) {
      this.prepareOptions(options, $.toast.options);
      this.process();
    },

    prepareOptions: function (options, options_to_extend) {
      var _options = {};
      if (typeof options === 'string' || options instanceof Array) {
        _options.text = options;
      } else {
        _options = options;
      }
      this.options = $.extend({}, options_to_extend, _options);
    },

    process: function () {
      this.setup();
      this.addToDom();
      this.position();
      this.bindToast();
      this.animate();
    },

    setup: function () {
      var _toastContent = '';

      this._toastEl =
        this._toastEl ||
        $('<div></div>', {
          class: 'jq-toast-single',
        });

      // For the loader on top
      _toastContent += '<span class="jq-toast-loader"></span>';

      if (this.options.allowToastClose) {
        _toastContent += '<span class="close-jq-toast-single">&times;</span>';
      }

      if (this.options.text instanceof Array) {
        if (this.options.heading) {
          _toastContent +=
            '<h2 class="jq-toast-heading">' + this.options.heading + '</h2>';
        }

        _toastContent += '<ul class="jq-toast-ul">';
        for (var i = 0; i < this.options.text.length; i++) {
          _toastContent +=
            '<li class="jq-toast-li" id="jq-toast-item-' +
            i +
            '">' +
            this.options.text[i] +
            '</li>';
        }
        _toastContent += '</ul>';
      } else {
        if (this.options.heading) {
          _toastContent +=
            '<h2 class="jq-toast-heading">' + this.options.heading + '</h2>';
        }
        _toastContent += this.options.text;
      }

      this._toastEl.html(_toastContent);

      if (this.options.bgColor !== false) {
        this._toastEl.css('background-color', this.options.bgColor);
      }

      if (this.options.textColor !== false) {
        this._toastEl.css('color', this.options.textColor);
      }

      if (this.options.textAlign) {
        this._toastEl.css('text-align', this.options.textAlign);
      }

      if (this.options.icon !== false) {
        this._toastEl.addClass('jq-has-icon');

        if ($.inArray(this.options.icon, this._defaultIcons) !== -1) {
          this._toastEl.addClass('jq-icon-' + this.options.icon);
        }
      }

      if (this.options.class !== false) {
        this._toastEl.addClass(this.options.class);
      }
    },

    position: function () {
      if (
        typeof this.options.position === 'string' &&
        $.inArray(this.options.position, this._positionClasses) !== -1
      ) {
        if (this.options.position === 'bottom-center') {
          this._container.css({
            left: $(window).outerWidth() / 2 - this._container.outerWidth() / 2,
            bottom: 20,
          });
        } else if (this.options.position === 'top-center') {
          this._container.css({
            left: $(window).outerWidth() / 2 - this._container.outerWidth() / 2,
            top: 20,
          });
        } else if (this.options.position === 'mid-center') {
          this._container.css({
            left: $(window).outerWidth() / 2 - this._container.outerWidth() / 2,
            top:
              $(window).outerHeight() / 2 - this._container.outerHeight() / 2,
          });
        } else {
          this._container.addClass(this.options.position);
        }
      } else if (typeof this.options.position === 'object') {
        this._container.css({
          top: this.options.position.top ? this.options.position.top : 'auto',
          bottom: this.options.position.bottom
            ? this.options.position.bottom
            : 'auto',
          left: this.options.position.left
            ? this.options.position.left
            : 'auto',
          right: this.options.position.right
            ? this.options.position.right
            : 'auto',
        });
      } else {
        this._container.addClass('bottom-left');
      }
    },

    bindToast: function () {
      var that = this;

      this._toastEl.on('afterShown', function () {
        that.processLoader();
      });

      this._toastEl.find('.close-jq-toast-single').on('click', function (e) {
        e.preventDefault();

        if (that.options.showHideTransition === 'fade') {
          that._toastEl.trigger('beforeHide');
          that._toastEl.fadeOut(function () {
            that._toastEl.trigger('afterHidden');
          });
        } else if (that.options.showHideTransition === 'slide') {
          that._toastEl.trigger('beforeHide');
          that._toastEl.slideUp(function () {
            that._toastEl.trigger('afterHidden');
          });
        } else {
          that._toastEl.trigger('beforeHide');
          that._toastEl.hide(function () {
            that._toastEl.trigger('afterHidden');
          });
        }
      });

      if (typeof this.options.beforeShow == 'function') {
        this._toastEl.on('beforeShow', function () {
          that.options.beforeShow(that._toastEl);
        });
      }

      if (typeof this.options.afterShown == 'function') {
        this._toastEl.on('afterShown', function () {
          that.options.afterShown(that._toastEl);
        });
      }

      if (typeof this.options.beforeHide == 'function') {
        this._toastEl.on('beforeHide', function () {
          that.options.beforeHide(that._toastEl);
        });
      }

      if (typeof this.options.afterHidden == 'function') {
        this._toastEl.on('afterHidden', function () {
          that.options.afterHidden(that._toastEl);
        });
      }

      if (typeof this.options.onClick == 'function') {
        this._toastEl.on('click', function () {
          that.options.onClick(that._toastEl);
        });
      }
    },

    addToDom: function () {
      var _container = $('.jq-toast-wrap');

      if (_container.length === 0) {
        _container = $('<div></div>', {
          class: 'jq-toast-wrap',
          role: 'alert',
          'aria-live': 'polite',
        });

        $('body').append(_container);
      } else if (
        !this.options.stack ||
        isNaN(parseInt(this.options.stack, 10))
      ) {
        _container.empty();
      }

      _container.find('.jq-toast-single:hidden').remove();

      _container.append(this._toastEl);

      if (this.options.stack && !isNaN(parseInt(this.options.stack), 10)) {
        var _prevToastCount = _container.find('.jq-toast-single').length,
          _extToastCount = _prevToastCount - this.options.stack;

        if (_extToastCount > 0) {
          $('.jq-toast-wrap')
            .find('.jq-toast-single')
            .slice(0, _extToastCount)
            .remove();
        }
      }

      this._container = _container;
    },

    canAutoHide: function () {
      return (
        this.options.hideAfter !== false &&
        !isNaN(parseInt(this.options.hideAfter, 10))
      );
    },

    processLoader: function () {
      // Show the loader only, if auto-hide is on and loader is demanded
      if (!this.canAutoHide() || this.options.loader === false) {
        return false;
      }

      var loader = this._toastEl.find('.jq-toast-loader');

      // 400 is the default time that jquery uses for fade/slide
      // Divide by 1000 for milliseconds to seconds conversion
      var transitionTime = (this.options.hideAfter - 400) / 1000 + 's';
      var loaderBg = this.options.loaderBg;

      var style = loader.attr('style') || '';
      style = style.substring(0, style.indexOf('-webkit-transition')); // Remove the last transition definition

      style +=
        '-webkit-transition: width ' +
        transitionTime +
        ' ease-in; \
                    -o-transition: width ' +
        transitionTime +
        ' ease-in; \
                    transition: width ' +
        transitionTime +
        ' ease-in; \
                    background-color: ' +
        loaderBg +
        ';';

      loader.attr('style', style).addClass('jq-toast-loaded');
    },

    animate: function () {
      var that = this;

      this._toastEl.hide();

      this._toastEl.trigger('beforeShow');

      if (this.options.showHideTransition.toLowerCase() === 'fade') {
        this._toastEl.fadeIn(function () {
          that._toastEl.trigger('afterShown');
        });
      } else if (this.options.showHideTransition.toLowerCase() === 'slide') {
        this._toastEl.slideDown(function () {
          that._toastEl.trigger('afterShown');
        });
      } else {
        this._toastEl.show(function () {
          that._toastEl.trigger('afterShown');
        });
      }

      if (this.canAutoHide()) {
        var that = this;

        window.setTimeout(function () {
          if (that.options.showHideTransition.toLowerCase() === 'fade') {
            that._toastEl.trigger('beforeHide');
            that._toastEl.fadeOut(function () {
              that._toastEl.trigger('afterHidden');
            });
          } else if (
            that.options.showHideTransition.toLowerCase() === 'slide'
          ) {
            that._toastEl.trigger('beforeHide');
            that._toastEl.slideUp(function () {
              that._toastEl.trigger('afterHidden');
            });
          } else {
            that._toastEl.trigger('beforeHide');
            that._toastEl.hide(function () {
              that._toastEl.trigger('afterHidden');
            });
          }
        }, this.options.hideAfter);
      }
    },

    reset: function (resetWhat) {
      if (resetWhat === 'all') {
        $('.jq-toast-wrap').remove();
      } else {
        this._toastEl.remove();
      }
    },

    update: function (options) {
      this.prepareOptions(options, this.options);
      this.setup();
      this.bindToast();
    },

    close: function () {
      this._toastEl.find('.close-jq-toast-single').click();
    },
  };

  $.toast = function (options) {
    var toast = Object.create(Toast);
    toast.init(options, this);

    return {
      reset: function (what) {
        toast.reset(what);
      },

      update: function (options) {
        toast.update(options);
      },

      close: function () {
        toast.close();
      },
    };
  };

  $.toast.options = {
    text: '',
    heading: '',
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    loader: true,
    loaderBg: '#9EC600',
    stack: 5,
    position: 'bottom-left',
    bgColor: false,
    textColor: false,
    textAlign: 'left',
    icon: false,
    beforeShow: function () {},
    afterShown: function () {},
    beforeHide: function () {},
    afterHidden: function () {},
    onClick: function () {},
  };
})($, window, document);
// JQUERY TOAST --- END -------

var TSR_Model = (function () {
  /* List of all collumns of information needed */

  var tableData = [
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 2',
      DataClassification: 'Confidential',
      DateIQUploaded: '2017-05-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 1,
      Id: 1,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 7,
        Title: 'Department 1',
      },
      LOBNameId: 7,
      OrderNumber: '00001',
      ProjectName: 'Project 1',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '1111',
      Third_x0020_Party_x0020_Name: 'Vendor 1',
      ThirdPartyName: {
        ID: 1105,
        Third_x0020_Party_x0020_Name: 'Vendor 1',
      },
      Tier: 1,
      TSr_x0020_Status:
        'LOB to ensure the vendor responds to the Assessors request for additional evidence.',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 1',
      DataClassification: 'Internal',
      DateIQUploaded: '2018-10-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 2,
      Id: 2,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-12-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 7,
        Title: 'Department 1',
      },
      LOBNameId: 7,
      OrderNumber: '00002',
      ProjectName: 'Project 2',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '2222',
      Third_x0020_Party_x0020_Name: 'Vendor 2',
      ThirdPartyName: {
        ID: 1105,
        Third_x0020_Party_x0020_Name: 'Vendor 2',
      },
      Tier: 2,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Public',
      DateIQUploaded: '2018-11-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 3,
      Id: 3,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2019-12-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 7,
        Title: 'Department 1',
      },
      LOBNameId: 7,
      OrderNumber: '000003',
      ProjectName: 'Project 3',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: null,
      Remediation_Needed: 'No',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '3333',
      Third_x0020_Party_x0020_Name: 'Vendor 3',
      ThirdPartyName: {
        ID: 287,
        Third_x0020_Party_x0020_Name: 'Vendor 3',
      },
      Tier: 1,
      TSr_x0020_Status:
        'Assessor received SOC report and currently reviewing/mapping security controls',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 1',
      DataClassification: 'Restricted',
      DateIQUploaded: '2018-12-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 4,
      Id: 4,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-10-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 7,
        Title: 'Department 1',
      },
      LOBNameId: 7,
      OrderNumber: '00004',
      ProjectName: 'Project 4',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '4444',
      Third_x0020_Party_x0020_Name: 'Vendor 4',
      ThirdPartyName: {
        ID: 684,
        Third_x0020_Party_x0020_Name: 'Vendor 4',
      },
      Tier: 3,
      TSr_x0020_Status:
        'LOB to ensure the vendor completes and returns Controls Questionnaire.',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 2',
      DataClassification: 'Internal',
      DateIQUploaded: '2018-10-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 5,
      Id: 5,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 10,
        Title: 'Department 2',
      },
      LOBNameId: 10,
      OrderNumber: '00005',
      ProjectName: 'Project 5',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '5555',
      Third_x0020_Party_x0020_Name: 'Vendor 5',
      ThirdPartyName: {
        ID: 287,
        Third_x0020_Party_x0020_Name: 'Vendor 5',
      },
      Tier: 3,
      TSr_x0020_Status: 'LOB to ensure vendor mitigates deficient controls.',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 1',
      DataClassification: 'Internal',
      DateIQUploaded: '2019-10-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 6,
      Id: 6,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 10,
        Title: 'Department 2',
      },
      LOBNameId: 10,
      OrderNumber: '00006',
      ProjectName: 'Project 6',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '6666',
      Third_x0020_Party_x0020_Name: 'Vendor 6',
      ThirdPartyName: {
        ID: 1103,
        Third_x0020_Party_x0020_Name: 'Vendor 6',
      },
      Tier: 2,
      TSr_x0020_Status: 'On Hold',
      OriginalAssessor: 'Person 4',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Internal',
      DateIQUploaded: '2019-09-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 7,
      Id: 7,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 10,
        Title: 'Department 2',
      },
      LOBNameId: 10,
      OrderNumber: '000007',
      ProjectName: 'Project 7',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '7777',
      Third_x0020_Party_x0020_Name: 'Vendor 7',
      ThirdPartyName: {
        ID: 1099,
        Third_x0020_Party_x0020_Name: 'Vendor 7',
      },
      Tier: 1,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 1',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 4',
      DataClassification: 'Internal',
      DateIQUploaded: '2019-05-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 8,
      Id: 8,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 10,
        Title: 'Department 2',
      },
      LOBNameId: 10,
      OrderNumber: '000008',
      ProjectName: 'Project 8',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '8888',
      Third_x0020_Party_x0020_Name: 'Vendor 8',
      ThirdPartyName: {
        ID: 1088,
        Third_x0020_Party_x0020_Name: 'Vendor 8',
      },
      Tier: 2,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 4',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Internal',
      DateIQUploaded: '2019-10-02T02:10:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 9,
      Id: 9,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 10,
        Title: 'Department 2',
      },
      LOBNameId: 10,
      OrderNumber: '00009',
      ProjectName: 'Project 9',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '9999',
      Third_x0020_Party_x0020_Name: 'Vendor 9',
      ThirdPartyName: {
        ID: 215,
        Third_x0020_Party_x0020_Name: 'Vendor 9',
      },
      Tier: 1,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 5',
      DataClassification: 'Internal',
      DateIQUploaded: '2017-05-02T02:50:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 10,
      Id: 10,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 17,
        Title: 'Department 3',
      },
      LOBNameId: 10,
      OrderNumber: '000010',
      ProjectName: 'Project 10',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '1212',
      Third_x0020_Party_x0020_Name: 'Vendor 10',
      ThirdPartyName: {
        ID: 1089,
        Third_x0020_Party_x0020_Name: 'Vendor 10',
      },
      Tier: 3,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 1',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 5',
      DataClassification: 'Internal',
      DateIQUploaded: '2018-02-02T02:50:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 11,
      Id: 11,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 17,
        Title: 'Department 3',
      },
      LOBNameId: 10,
      OrderNumber: '000011',
      ProjectName: 'Project 11',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '2323',
      Third_x0020_Party_x0020_Name: 'Vendor 11',
      ThirdPartyName: {
        ID: 1079,
        Third_x0020_Party_x0020_Name: 'Vendor 11',
      },
      Tier: 3,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 1',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Internal',
      DateIQUploaded: '2018-02-02T02:50:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 12,
      Id: 12,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2018-11-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 17,
        Title: 'Department 3',
      },
      LOBNameId: 10,
      OrderNumber: '000012',
      ProjectName: 'Project 12',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '3434',
      Third_x0020_Party_x0020_Name: 'Vendor 12',
      ThirdPartyName: {
        ID: 1069,
        Third_x0020_Party_x0020_Name: 'Vendor 12',
      },
      Tier: 3,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Internal',
      DateIQUploaded: '2018-02-02T02:50:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 13,
      Id: 13,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2019-01-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 18,
        Title: 'Department 4',
      },
      LOBNameId: 10,
      OrderNumber: '000013',
      ProjectName: 'Project 13',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '4545',
      Third_x0020_Party_x0020_Name: 'Vendor 13',
      ThirdPartyName: {
        ID: 1059,
        Third_x0020_Party_x0020_Name: 'Vendor 13',
      },
      Tier: 4,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Internal',
      DateIQUploaded: '2018-02-02T02:50:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 14,
      Id: 14,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2019-01-06T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 18,
        Title: 'Department 4',
      },
      LOBNameId: 10,
      OrderNumber: '000014',
      ProjectName: 'Project 14',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '5656',
      Third_x0020_Party_x0020_Name: 'Vendor 14',
      ThirdPartyName: {
        ID: 1049,
        Third_x0020_Party_x0020_Name: 'Vendor 14',
      },
      Tier: 4,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 2',
    },
    {
      ActionNeeded: 'Do things',
      AssessorFinalNotes: 'these are my notes 1',
      CommentWeek1: 'this is comment for week 1',
      CommentWeek2: 'this is comment for week 2',
      CommentWeek3: 'this is comment for week 3',
      CommentWeek4: 'this is comment for week 4',
      CommentWeek5: 'this is comment for week 5',
      CommentWeek6: 'this is comment for week 6',
      CommentWeek7: 'this is comment for week 7',
      ControlAssessor: 'Person 3',
      DataClassification: 'Internal',
      DateIQUploaded: '2019-01-01T02:50:04Z',
      DateComplete: '2018-12-07T02:10:04Z',
      ID: 15,
      Id: 15,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: '2019-01-04T02:10:04Z',
      LOB: 'Department 1',
      LOBName: {
        ID: 18,
        Title: 'Department 4',
      },
      LOBNameId: 10,
      OrderNumber: '000015',
      ProjectName: 'Project 15',
      Remediation_Notes: 'These are my remediation Notes',
      Remediation_Status: 'Remediation Complete',
      Remediation_Needed: 'Yes',
      Remediation_Date_Start: null,
      SMCWorkOrderNumber: '7878',
      Third_x0020_Party_x0020_Name: 'Vendor 15',
      ThirdPartyName: {
        ID: 1039,
        Third_x0020_Party_x0020_Name: 'Vendor 15',
      },
      Tier: 4,
      TSr_x0020_Status: 'Review Complete',
      OriginalAssessor: 'Person 2',
    },
  ];

  var tblLOB = [
    {
      ID: 18,
      Id: 18,
      ReOrgOut: false,
      Title: 'Department 4',
    },
    {
      ID: 17,
      Id: 17,
      ReOrgOut: false,
      Title: 'Department 3',
    },
    {
      ID: 16,
      Id: 16,
      ReOrgOut: false,
      Title: 'Department 5',
    },
    {
      ID: 15,
      Id: 15,
      ReOrgOut: false,
      Title: 'Department 6',
    },
    {
      ID: 14,
      Id: 14,
      ReOrgOut: false,
      Title: 'Department 7',
    },
    {
      ID: 13,
      Id: 13,
      ReOrgOut: false,
      Title: 'Department 8',
    },
    {
      ID: 12,
      Id: 12,
      ReOrgOut: false,
      Title: 'Department 9',
    },
    {
      ID: 11,
      Id: 11,
      ReOrgOut: false,
      Title: 'Department 10',
    },
    {
      ID: 10,
      Id: 10,
      ReOrgOut: false,
      Title: 'Department 2',
    },
    {
      ID: 9,
      Id: 9,
      ReOrgOut: false,
      Title: 'Department 11',
    },
    {
      ID: 8,
      Id: 8,
      ReOrgOut: false,
      Title: 'Department 12',
    },
    {
      ID: 7,
      Id: 7,
      ReOrgOut: false,
      Title: 'Department 1',
    },
    {
      ID: 1,
      Id: 1,
      ReOrgOut: false,
      Title: 'Department 13',
    },
  ];

  var tblUsers = [
    {
      Active: 'Yes',
      Assessment: 'PERSON 1',
    },
    {
      Active: 'Yes',
      Assessment: 'PERSON 2',
    },
    {
      Active: 'Yes',
      Assessment: 'PERSON 3',
    },
    {
      Active: 'Yes',
      Assessment: 'PERSON 4',
    },
    {
      Active: 'Yes',
      Assessment: 'PERSON 5',
    },
  ];

  var tblIQInformation = [
    {
      ID: 1,
      Id: 1,
      Assessment: 1,
      Assessment_x0020_Type: 2,
      Information_x0020_Classification: 'Confidential',
    },
    {
      ID: 2,
      Id: 2,
      Assessment: 2,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 3,
      Id: 3,
      Assessment: 3,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Public',
    },
    {
      ID: 4,
      Id: 4,
      Assessment: 4,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Restricted',
    },
    {
      ID: 5,
      Id: 5,
      Assessment: 5,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 6,
      Id: 6,
      Assessment: 6,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 7,
      Id: 7,
      Assessment: 7,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 8,
      Id: 8,
      Assessment: 8,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 9,
      Id: 9,
      Assessment: 9,
      Assessment_x0020_Type: 3,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 10,
      Id: 10,
      Assessment: 11,
      Assessment_x0020_Type: 2,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 11,
      Id: 11,
      Assessment: 11,
      Assessment_x0020_Type: 1,
      Information_x0020_Classification: 'Internal',
    },
    {
      ID: 12,
      Id: 12,
      Assessment: 12,
      Assessment_x0020_Type: 2,
      Information_x0020_Classification: 'Confidential',
    },
    {
      ID: 13,
      Id: 13,
      Assessment: 13,
      Assessment_x0020_Type: 2,
      Information_x0020_Classification: 'Restricted',
    },
    {
      ID: 14,
      Id: 14,
      Assessment: 14,
      Assessment_x0020_Type: 2,
      Information_x0020_Classification: 'Confidential',
    },
    {
      ID: 15,
      Id: 15,
      Assessment: 15,
      Assessment_x0020_Type: 1,
      Information_x0020_Classification: 'Confidential',
    },
  ];

  // Helper Functions
  function showBtnSuccess(data, status) {
    console.log('You did the thing!!!');
    console.log(data);
    console.log(status);
  }

  function showBtnFailure(status, error) {
    console.log('You did not do the thing!!!');
    console.log(error);
    console.log(status);
  }

  function genericError(status, error) {
    console.log('You did not do the thing!!!');
    console.log(error);
    console.log(status);
  }

  return {
    getCurrentUser: function (usingSP, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          '/_api/web/getuserbyid(' +
          _spPageContextInfo.userId +
          ')?$select=*&$expand=Groups';
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            accept: 'application/json; odata=verbose',
          },
          success: function (data) {
            var myStr = data.d.LoginName;
            //console.log(data)
            if (myStr.slice(-5) === 'admin') {
              callback(
                myStr.slice(myStr.length - 9, myStr.length - 5).toUpperCase()
              );
            } else {
              //console.log(myStr.slice(-4).toUpperCase())
              callback(myStr.slice(-4).toUpperCase());
            }
          },
          error: genericError,
        });
      } else {
        setTimeout(function () {
          callback('K3BI');
        }, 500);
      }
    },
    getModifyTableData: function (usingSP, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('tblAssessments')/items?$select=*,LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,Attachments,AttachmentFiles&$expand=LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,AttachmentFiles&$filter=IsLegacyData eq false&$top=900&$orderby=ID desc";
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            accept: 'application/json; odata=verbose',
          },
          success: function (data) {
            callback(data.d.results);
          },
          error: genericError,
        });
      } else {
        setTimeout(function () {
          callback(tableData);
        }, 500);
      }
    },
    getAssessorTableData: function (usingSP, assessor, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('tblAssessments')/items?$select=*,LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,Attachments,AttachmentFiles&$expand=LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,AttachmentFiles&$filter=(TSr_x0020_Status ne 'Review Complete' and TSr_x0020_Status ne 'Review Cancelled' and TSr_x0020_Status ne 'No TSR Required') and (ControlAssessor eq '" +
          assessor +
          "')&$orderby=ID desc";
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            accept: 'application/json; odata=verbose',
          },
          success: function (data) {
            callback(data.d.results);
          },
          error: genericError,
        });
      } else {
        setTimeout(function () {
          callback(tableData);
        }, 500);
      }
    },
    getSingleModifyAssessment: function (usingSP, ID, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('tblAssessments')/items?$select=*,LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,Attachments,AttachmentFiles&$expand=LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,AttachmentFiles&$filter=ID eq " +
          ID;
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            Accept: 'application/json;odata=verbose', // Requests that return SharePoint metadata
          },
          success: function (data) {
            callback(data.d.results[0]);
          },
          error: function (data) {
            alert('Item not Available');
          },
        });
      } else {
        setTimeout(function () {
          callback(tableData[ID - 1]);
        }, 500);
      }
    },
    postSingleAssessment: function (usingSP, id, columnName, value, callback) {
      var myDate = new Date();
      var myObj = {
        __metadata: {
          type: 'SP.ListItem',
        },
      };
      myObj[columnName] = value;
      myObj.Last_x0020_Update = myDate.toISOString();

      if (usingSP) {
        $.ajax({
          url:
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists/GetByTitle('tblAssessments')/items(" +
            id +
            ')', // list item ID
          type: 'POST',
          data: JSON.stringify(myObj),
          headers: {
            Accept: 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'IF-MATCH': '*',
            'X-HTTP-Method': 'MERGE',
          },
          success: callback,
          error: showBtnFailure,
        });
      } else {
        setTimeout(function () {
          tableData[id - 1][columnName] = value;
          tableData[id - 1]['Last_x0020_Update'] = myDate.toISOString();
          //callback(tableData[assessment - 1]);
          callback();
          //console.log(tableData[id - 1]);
          //console.log("information Posted");
        }, 500);
      }
    },
    getAssessmentInformation: function (
      usingSP,
      filterColumn,
      filterValue,
      table,
      callback
    ) {
      if (usingSP) {
        var requestUri;
        if (table === 'tblAssessments') {
          requestUri =
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists/getbytitle('" +
            table +
            "')/items?$select=*,LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,Attachments,AttachmentFiles&$expand=LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,AttachmentFiles&$filter=" +
            filterColumn +
            ' eq ' +
            filterValue;
        } else if (table === 'tblLOB') {
          requestUri =
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists/getbytitle('" +
            table +
            "')/items?$select=*&$filter=ReOrgOut eq false and " +
            filterColumn +
            ' eq ' +
            filterValue;
        } else {
          requestUri =
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists/getbytitle('" +
            table +
            "')/items?$select=*&$filter=" +
            filterColumn +
            ' eq ' +
            filterValue;
        }

        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            Accept: 'application/json;odata=verbose', // Requests that return SharePoint metadata
          },
          success: function (data) {
            callback(data.d.results[0]);
          },
          error: function (data) {
            alert('Item not Available');
          },
        });
      } else {
        setTimeout(function () {
          if (table === 'tblAssessments') {
            tableData.forEach(function (element) {
              if (element[filterColumn] === filterValue) {
                callback(element);
              }
            });
          } else if (table === 'tblLOB') {
            tblLOB.forEach(function (element) {
              if (element[filterColumn] === filterValue) {
                callback(element);
              }
            });
          } else if (table === 'tblIQInformation') {
            tblIQInformation.forEach(function (element) {
              if (element[filterColumn] === filterValue) {
                callback(element);
              }
            });
          } else {
            console.log('could not find this table provided');
          }
        }, 500);
      }
    },
    mergeAssessmentInformation: function (
      usingSP,
      id,
      dataObj,
      table,
      callback
    ) {
      var myObj = JSON.parse(JSON.stringify(dataObj));
      myObj.__metadata = {
        type: 'SP.ListItem',
      };
      if (table === 'tblAssessments') {
        var myDate = new Date();
        myObj.Last_x0020_Update = myDate.toISOString();
      }

      //myObj[columnName] = value;
      //myObj.Last_x0020_Update = myDate.toISOString();

      if (usingSP) {
        $.ajax({
          url:
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists/GetByTitle('" +
            table +
            "')/items(" +
            id +
            ')', // list item ID
          type: 'POST',
          data: JSON.stringify(myObj),
          headers: {
            Accept: 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'IF-MATCH': '*',
            'X-HTTP-Method': 'MERGE',
          },
          success: callback,
          error: showBtnFailure,
        });
      } else {
        setTimeout(function () {
          if (table === 'tblAssessments') {
            Object.keys(myObj).forEach(function (key, index) {
              tableData[id - 1][key] = myObj[key];
            });
            callback();
          } else if (table === 'tblLOB') {
            tblLOB.forEach(function (element) {
              if (element['Id'] === id) {
                Object.keys(myObj).forEach(function (key, index) {
                  element[key] = myObj[key];
                });
              }
            });
            callback();
          } else if (table === 'tblIQInformation') {
            tblLOB.forEach(function (element) {
              if (element['Id'] === id) {
                Object.keys(myObj).forEach(function (key, index) {
                  element[key] = myObj[key];
                });
              }
            });
            callback();
          } else {
            console.log('could not find this table provided in order to merge');
          }
        }, 500);
      }
    },
    getReportData: function (usingSP, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('tblAssessments')/items?$select=*,LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,Attachments,AttachmentFiles&$expand=LOBName/ID,LOBName/Title,ThirdPartyName/ID,ThirdPartyName/Third_x0020_Party_x0020_Name,AttachmentFiles&$top=2000&$orderby=DateIQUploaded desc,ID desc";
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            accept: 'application/json; odata=verbose',
          },
          success: function (data) {
            callback(data.d.results);
          },
          error: genericError,
        });
      } else {
        setTimeout(function () {
          callback(tableData);
        }, 500);
      }
    },
    getAllDepartments: function (usingSP, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('tblLOB')/items?$select=*";
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            accept: 'application/json; odata=verbose',
          },
          success: function (data) {
            callback(data.d.results);
          },
          error: genericError,
        });
      } else {
        setTimeout(function () {
          callback(tblLOB);
        }, 500);
      }
    },
    getAllUsers: function (usingSP, callback) {
      if (usingSP) {
        var requestUri =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('tblAssessor')/items?$select=*";
        $.ajax({
          url: requestUri,
          type: 'GET',
          headers: {
            accept: 'application/json; odata=verbose',
          },
          success: function (data) {
            callback(data.d.results);
          },
          error: genericError,
        });
      } else {
        setTimeout(function () {
          callback(tblUsers);
        }, 500);
      }
    },
  };
})();

var TSR_View = (function () {
  // Holds refeences to the 2 datatbles
  var tables = {
    modify: {
      tableRef: null,
      initialAdjust: true,
      columnPairs: [
        {
          colName: 'ID',
          spColName: 'ID',
        },
        {
          colName: 'Third Party Name',
          spColName: 'Third_x0020_Party_x0020_Name',
        },
        {
          colName: 'Line of Business',
          spColName: 'LOB',
        },
        {
          colName: 'CEUD',
          spColName: 'IsCEUD',
        },
        {
          colName: 'PII',
          spColName: 'IsPII',
        },
        {
          colName: 'PHI',
          spColName: 'IsPHI',
        },
        {
          colName: 'Date Started',
          spColName: 'DateIQUploaded',
        },
        {
          colName: 'Date Complete',
          spColName: 'DateComplete',
        },
        {
          colName: 'Controls Assessor',
          spColName: 'ControlAssessor',
        },
        {
          colName: 'TSR Status',
          spColName: 'TSr_x0020_Status',
        },
        {
          colName: 'Last Update',
          spColName: 'Last_x0020_Update',
        },
      ],
    },
    assessor: {
      tableRef: null,
      initialAdjust: true,
      columnPairs: [
        {
          colName: 'ID',
          spColName: 'ID',
        },
        {
          colName: 'Third Party Name',
          spColName: 'Third_x0020_Party_x0020_Name',
        },
        {
          colName: 'Line of Business',
          spColName: 'LOB',
        },
        {
          colName: 'Original Assessor',
          spColName: 'OriginalAssessor',
        },
        {
          colName: 'Date Started',
          spColName: 'DateIQUploaded',
        },
        {
          colName: 'TSR Status',
          spColName: 'TSr_x0020_Status',
        },
        {
          colName: 'Last Update',
          spColName: 'Last_x0020_Update',
        },
      ],
    },
  };

  var modifyFormElements = [
    {
      show: true,
      eleID: 'K_vendorName',
      colName: 'Third_x0020_Party_x0020_Name',
    },
    {
      show: true,
      eleID: 'K_LOB',
      colName: 'LOB',
    },
    {
      show: true,
      eleID: 'K_orderNum',
      colName: 'OrderNumber',
    },
    {
      show: true,
      eleID: 'K_Tier',
      colName: 'Tier',
    },
    {
      show: true,
      eleID: 'K_dateStarted',
      colName: 'DateIQUploaded',
    },
    {
      show: true,
      eleID: 'K_workOrderNum',
      colName: 'SMCWorkOrderNumber',
    },
    {
      show: true,
      eleID: 'K_infoClass',
      colName: 'DataClassification',
    },
    {
      show: true,
      eleID: 'K_assessor',
      colName: 'ControlAssessor',
    },
    {
      show: true,
      eleID: 'K_projectName',
      colName: 'ProjectName',
    },
    {
      show: false,
      eleID: 'K_contactTitle',
      colName: '',
    },
    {
      show: true,
      eleID: 'K_generalStatus',
      colName: 'TSr_x0020_Status',
    },
    {
      show: false,
      eleID: 'K_actionNeeded',
      colName: 'TSr_x0020_Status',
    },
    {
      show: true,
      eleID: 'K_commentsWeek1',
      colName: 'CommentWeek1',
    },
    {
      show: true,
      eleID: 'K_commentsWeek2',
      colName: 'CommentWeek2',
    },
    {
      show: true,
      eleID: 'K_commentsWeek3',
      colName: 'CommentWeek3',
    },
    {
      show: true,
      eleID: 'K_commentsWeek4',
      colName: 'CommentWeek4',
    },
    {
      show: true,
      eleID: 'K_commentsWeek5',
      colName: 'CommentWeek5',
    },
    {
      show: true,
      eleID: 'K_commentsWeek6',
      colName: 'CommentWeek6',
    },
    {
      show: true,
      eleID: 'K_commentsWeek7',
      colName: 'CommentWeek7',
    },
    {
      show: true,
      eleID: 'K_assessorNotes',
      colName: 'AssessorFinalNotes',
    },
    {
      show: true,
      eleID: 'K_remediationStatus',
      colName: 'Remediation_Status',
    },
    {
      show: true,
      eleID: 'K_remediationNotes',
      colName: 'Remediation_Notes',
    },
  ];

  var assessorFormElements = [
    {
      show: true,
      eleID: 'K_generalStatus_2',
      colName: 'TSr_x0020_Status',
    },
    {
      show: false,
      eleID: 'K_actionNeeded_2',
      colName: 'TSr_x0020_Status',
    },
    {
      show: true,
      eleID: 'K_commentsWeek1_2',
      colName: 'CommentWeek1',
    },
    {
      show: true,
      eleID: 'K_commentsWeek2_2',
      colName: 'CommentWeek2',
    },
    {
      show: true,
      eleID: 'K_commentsWeek3_2',
      colName: 'CommentWeek3',
    },
    {
      show: true,
      eleID: 'K_commentsWeek4_2',
      colName: 'CommentWeek4',
    },
    {
      show: true,
      eleID: 'K_commentsWeek5_2',
      colName: 'CommentWeek5',
    },
    {
      show: true,
      eleID: 'K_commentsWeek6_2',
      colName: 'CommentWeek6',
    },
    {
      show: true,
      eleID: 'K_commentsWeek7_2',
      colName: 'CommentWeek7',
    },
    {
      show: true,
      eleID: 'K_assessorNotes_2',
      colName: 'AssessorFinalNotes',
    },
    {
      show: true,
      eleID: 'K_remediationStatus_2',
      colName: 'Remediation_Status',
    },
    {
      show: true,
      eleID: 'K_remediationNotes_2',
      colName: 'Remediation_Notes',
    },
  ];

  //  HELPER FUNCTIONS
  function htmlDecode(value) {
    return $('<textarea/>').html(value).text();
  }

  function formatSingleRowData(tableName, rawRowData) {
    var newRow = {};

    if (tableName === 'modify') {
      tables.modify.columnPairs.forEach(function (element) {
        if (element.colName === 'Third Party Name') {
          newRow[element.colName] =
            rawRowData['ThirdPartyName']['Third_x0020_Party_x0020_Name'];
        } else if (element.colName === 'Line of Business') {
          newRow[element.colName] = rawRowData['LOBName']['Title'];
        } else {
          newRow[element.colName] = rawRowData[element.spColName];
        }
      });
    } else if (tableName === 'assessor') {
      //assesor Table data column and pairs information
      tables.assessor.columnPairs.forEach(function (element) {
        if (element.colName === 'Third Party Name') {
          newRow[element.colName] =
            rawRowData['ThirdPartyName']['Third_x0020_Party_x0020_Name'];
        } else if (element.colName === 'Line of Business') {
          newRow[element.colName] = rawRowData['LOBName']['Title'];
        } else {
          newRow[element.colName] = rawRowData[element.spColName];
        }
      });
    } else {
      throw Error(
        'Did not put a correct table name, cannot determine which table to format the row data to'
      );
    }
    return newRow;
  }

  function updateActionNeeded(table, tempVal) {
    if (table === 'modify') {
      if (tempVal === 'Assessor Working') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append(
          '<option>Assessor received ISO report and currently reviewing/mapping security controls</option>'
        );
        $('#' + 'K_actionNeeded').append(
          '<option>Assessor received SOC report and currently reviewing/mapping security controls</option>'
        );
        $('#' + 'K_actionNeeded').append(
          '<option>TSR Assessor to complete review and analysis.</option>'
        );
      } else if (tempVal === 'Cancelled') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append('<option>Review Cancelled</option>');
      } else if (tempVal === 'No TSR Required') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append('<option>No TSR Required</option>');
      } else if (tempVal === 'On Hold') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append('<option>On Hold</option>');
      } else if (tempVal === 'On Site') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append(
          '<option>On Site Assessment in Progress</option>'
        );
        $('#' + 'K_actionNeeded').append(
          '<option>On Site Assessment Complete</option>'
        );
      } else if (tempVal === 'Renewal') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append(
          '<option>No Longer Doing Business with Vendor</option>'
        );
      } else if (tempVal === 'Review Complete') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append(
          '<option>LOB to ensure vendor mitigates deficient controls.</option>'
        );
        $('#' + 'K_actionNeeded').append('<option>Review Complete</option>');
      } else if (tempVal === 'Waiting for 3P Response') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append(
          '<option>LOB to ensure the vendor responds to the Assessors request for additional evidence.</option>'
        );
        $('#' + 'K_actionNeeded').append(
          '<option>LOB to ensure the vendor responds to the Assessors request for clarification.</option>'
        );
        $('#' + 'K_actionNeeded').append(
          '<option>LOB to ensure the vendor completes and returns Controls Questionnaire.</option>'
        );
      } else if (tempVal === 'Waiting for LOB Response') {
        $('#' + 'K_actionNeeded').empty();
        $('#' + 'K_actionNeeded').append(
          '<option>LOB contact to provide additional information for the Intake Questionnaire to allow proper risk evaluation.</option>'
        );
        $('#' + 'K_actionNeeded').append(
          '<option>LOB contact to complete and submit Intake Questionnaire</option>'
        );
      } else {
        console.log('issue with updating the action needed options');
      }
    } else if (table === 'assessor') {
      if (tempVal === 'Assessor Working') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append(
          '<option>Assessor received ISO report and currently reviewing/mapping security controls</option>'
        );
        $('#' + 'K_actionNeeded_2').append(
          '<option>Assessor received SOC report and currently reviewing/mapping security controls</option>'
        );
        $('#' + 'K_actionNeeded_2').append(
          '<option>TSR Assessor to complete review and analysis.</option>'
        );
      } else if (tempVal === 'Cancelled') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append('<option>Review Cancelled</option>');
      } else if (tempVal === 'No TSR Required') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append('<option>No TSR Required</option>');
      } else if (tempVal === 'On Hold') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append('<option>On Hold</option>');
      } else if (tempVal === 'On Site') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append(
          '<option>On Site Assessment in Progress</option>'
        );
        $('#' + 'K_actionNeeded_2').append(
          '<option>On Site Assessment Complete</option>'
        );
      } else if (tempVal === 'Renewal') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append(
          '<option>No Longer Doing Business with Vendor</option>'
        );
      } else if (tempVal === 'Review Complete') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append(
          '<option>LOB to ensure vendor mitigates deficient controls.</option>'
        );
        $('#' + 'K_actionNeeded_2').append('<option>Review Complete</option>');
      } else if (tempVal === 'Waiting for 3P Response') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append(
          '<option>LOB to ensure the vendor responds to the Assessors request for additional evidence.</option>'
        );
        $('#' + 'K_actionNeeded_2').append(
          '<option>LOB to ensure the vendor responds to the Assessors request for clarification.</option>'
        );
        $('#' + 'K_actionNeeded_2').append(
          '<option>LOB to ensure the vendor completes and returns Controls Questionnaire.</option>'
        );
      } else if (tempVal === 'Waiting for LOB Response') {
        $('#' + 'K_actionNeeded_2').empty();
        $('#' + 'K_actionNeeded_2').append(
          '<option>LOB contact to provide additional information for the Intake Questionnaire to allow proper risk evaluation.</option>'
        );
        $('#' + 'K_actionNeeded_2').append(
          '<option>LOB contact to complete and submit Intake Questionnaire</option>'
        );
      } else {
        console.log('issue with updating the action needed options');
      }
    } else {
      console.log('there was an issue, no valid table was picked');
    }
  }

  Date.prototype.getMonthName = function () {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[this.getMonth()];
  };

  function barChartFactory(selector, dataObj, options) {
    //SETTINGS
    var state = {
      bar_chart: null,
      y_scale: null,
      x_scale: null,
      y_axis: null,
      x_axis: null,
      initialized: false,
      data: dataObj || { name: 'loading', data: 0 },
      options: {
        title: options.title || '2019 LOB DATA',
        x_title: options.x_title || 'Line of Business',
        y_title: options.y_title || 'Assessments',
        rotateX: options.rotateX || false,
        chart_height: options.chart_height || 800,
        chart_width: options.chart_width || 800,
        chart_padding_top: options.chart_padding_top || 100,
        chart_padding_bottom: options.chart_padding_bottom || 100,
        chart_padding_left: options.chart_padding_left || 100,
        chart_padding_right: options.chart_padding_right || 100,
        label_font_size: options.label_font_size || 12,
        axes_font_size: options.axes_font_size || 12,
        x_axes_font_size: options.axes_font_size || 12,
        y_axes_font_size: options.axes_font_size || 14,
        rect_color: options.rect_color || '#7ed26d',
      },
    };

    function responsivefy(svg) {
      // get container + svg aspect ratio
      var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height;

      // add viewBox and preserveAspectRatio properties,
      // and call resize so that svg resizes on inital page load
      svg
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('perserveAspectRatio', 'xMinYMid')
        .call(resize);

      // to register multiple listeners for same event type,
      // you need to add namespace, i.e., 'click.foo'
      // necessary if you call invoke this function for multiple svgs
      // api docs: https://github.com/mbostock/d3/wiki/Selections#on
      d3.select(window).on('resize.' + container.attr('id'), resize);

      // get width of container and resize svg to fit it
      function resize() {
        var targetWidth = parseInt(container.style('width'));
        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth / aspect));
      }
    }

    return {
      init: function () {
        if (state.initialized) return null;

        var dataObj = state.data.map(function (element) {
          var ele = JSON.parse(JSON.stringify(element));
          ele.data = 0;
          return ele;
        });

        state.bar_chart =
          state.bar_chart ||
          d3
            .select(selector)
            .append('svg')
            .attr('height', state.options.chart_height)
            .attr('width', state.options.chart_width)
            .style('background-color', '#eee')
            .call(responsivefy);

        // ***** CREATING SCALES *******
        state.x_scale = d3
          .scaleBand()
          .domain(
            dataObj.map(function (d) {
              return d.name;
            })
          )
          .rangeRound([
            state.options.chart_padding_left,
            state.options.chart_width - state.options.chart_padding_right,
          ])
          .padding(0.2);

        state.y_scale = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(dataObj, function (d) {
              return d.data;
            }),
          ])
          .rangeRound([
            state.options.chart_height - state.options.chart_padding_bottom,
            state.options.chart_padding_top,
          ]);

        // ********* ADDING DATA TO THE RECT TABLES **********

        state.bar_chart
          .selectAll('rect')
          .data(dataObj)
          .enter()
          .append('rect')
          .attr('x', function (d, i) {
            return state.x_scale(d.name);
          })
          .attr('y', function (d, i) {
            return state.y_scale(d.data);
          })
          .attr('width', state.x_scale.bandwidth())
          .attr('height', function (d, i) {
            return (
              state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data)
            );
          })
          .attr('fill', state.options.rect_color)
          .on('mouseover', function (d) {
            var x =
              parseFloat(d3.select(this).attr('x')) *
                (parseFloat(state.bar_chart.style('width')) /
                  state.options.chart_width) +
              state.x_scale.bandwidth() / 2;
            /*
            var y =
              (parseFloat(d3.select(this).attr("y")) *
                (parseFloat(state.bar_chart.style("height")) /
                  state.options.chart_height)) /
                3 +
              state.options.chart_height / 2;
              */
            var y =
              (parseFloat(d3.select(this).attr('y')) *
                (parseFloat(state.bar_chart.style('height')) /
                  state.options.chart_height)) /
                3 +
              parseFloat(state.bar_chart.style('height')) / 2;

            d3.select('#tooltip2')
              .style('left', x + 'px')
              .style('top', y + 'px')
              .style('display', 'block')
              .style('white-space', 'pre-line')
              .text(d.name + ': \n ' + d.data);
          })
          .on('mouseout', function () {
            d3.select('#tooltip2').style('display', 'none');
          });

        // CREATING AXES

        state.x_axis = d3.axisBottom(state.x_scale);
        state.bar_chart
          .append('g')
          .attr('class', 'x-axis')
          .attr(
            'transform',
            'translate(0,' +
              (state.options.chart_height -
                state.options.chart_padding_bottom) +
              ')'
          )
          .attr('color', '#000')
          .call(state.x_axis)
          .selectAll('text')
          .attr('transform', state.options.rotateX ? 'rotate(25)' : 'rotate(0)')
          .attr('text-anchor', state.options.rotateX ? 'start' : 'middle')
          .attr('font-size', state.options.x_axes_font_size)
          .attr('class', 'x_label_text');

        state.y_axis = d3.axisLeft(state.y_scale);
        state.bar_chart
          .append('g')
          .attr('class', 'y-axis')
          .attr(
            'transform',
            'translate(' + state.options.chart_padding_left + ',0)'
          )
          .attr('color', '#000')
          .call(state.y_axis)
          .selectAll('text')
          .attr('font-size', state.options.y_axes_font_size)
          .attr('class', 'y_label_text');

        //  ******* ADDING LABELS **********************

        // making dynamic label fonts sizes
        state.options.label_font_size =
          Math.ceil(state.x_scale.bandwidth() / 3) > 12
            ? Math.ceil(state.x_scale.bandwidth() / 3)
            : 14;

        state.bar_chart
          .append('g')
          .attr('class', 'labels')
          .selectAll('text')
          .data(dataObj)
          .enter()
          .append('text')
          .text(function (d, i) {
            return d.data;
          })
          .attr('x', function (d, i) {
            return state.x_scale(d.name) + state.x_scale.bandwidth() / 2;
          })
          .attr('y', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? state.y_scale(d.data) - state.options.label_font_size / 2
              : state.y_scale(d.data) + state.options.label_font_size * 1.2;
          })
          .attr('font-size', state.options.label_font_size)
          .attr('fill', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? '#000'
              : '#FFF';
          })
          .attr('text-anchor', 'middle')
          .attr('font-weight', 'bold')
          .style('pointer-events', 'none');

        //  ADDING TITLES, X AXXIS LABEL AND Y AXIS LABEL

        state.bar_chart
          .append('text')
          .attr('x', state.options.chart_width / 2)
          .attr('y', state.options.chart_padding_top / 2)
          .style('text-anchor', 'middle')
          .style('font-size', 22)
          .attr('font-weight', 'bold')
          .text(state.options.title);

        state.bar_chart
          .append('text')
          .attr('x', state.options.chart_width / 2)
          .attr(
            'y',
            state.options.rotateX
              ? state.options.chart_height -
                  state.options.chart_padding_bottom * 0.1
              : state.options.chart_height -
                  state.options.chart_padding_bottom * 0.5
          )
          .style('text-anchor', 'middle')
          .style('font-size', 20)
          .attr('font-weight', 'bold')
          .text(state.options.x_title);

        state.bar_chart
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr(
            'y',
            state.options.chart_padding_left / 2 - state.options.axes_font_size
          )
          .attr('x', -(state.options.chart_height / 2))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .style('font-size', 20)
          .attr('font-weight', 'bold')
          .text(state.options.y_title);

        state.initialized = true;
      },
      loadData: function () {
        var dataObj = state.data;

        state.x_scale = d3
          .scaleBand()
          .domain(
            dataObj.map(function (d) {
              return d.name;
            })
          )
          .rangeRound([
            state.options.chart_padding_left,
            state.options.chart_width - state.options.chart_padding_right,
          ])
          .padding(0.2);

        state.y_scale = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(dataObj, function (d) {
              return d.data;
            }),
          ])
          .rangeRound([
            state.options.chart_height - state.options.chart_padding_bottom,
            state.options.chart_padding_top,
          ]);

        // Updatting AXES Text labels

        state.x_axis = d3.axisBottom(state.x_scale);
        state.bar_chart
          .select('.x-axis')
          .transition()
          .duration(800)
          .attr(
            'transform',
            'translate(0,' +
              (state.options.chart_height -
                state.options.chart_padding_bottom) +
              ')'
          )
          .attr('color', '#000')
          .call(state.x_axis)
          .selectAll('text')
          .attr('class', 'x_label_text')
          .attr('font-size', state.options.x_axes_font_size);

        state.y_axis = d3.axisLeft(state.y_scale);
        state.bar_chart
          .select('.y-axis')
          .transition()
          .duration(800)
          .attr(
            'transform',
            'translate(' + state.options.chart_padding_left + ',0)'
          )
          .attr('color', '#000')
          .call(state.y_axis)
          .selectAll('text')
          .attr('class', 'y_label_text')
          .attr('font-size', state.options.y_axes_font_size);

        // making dynamic label fonts sizes
        state.options.label_font_size =
          Math.ceil(state.x_scale.bandwidth() / 3) > 12
            ? Math.ceil(state.x_scale.bandwidth() / 3)
            : 14;

        // ********* ADDING DATA TO THE RECT TABLES **********
        state.bar_chart
          .selectAll('rect')
          .data(dataObj)
          .transition()
          .duration(800)
          .attr('y', function (d, i) {
            return state.y_scale(d.data);
          })
          .attr('height', function (d, i) {
            return (
              state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data)
            );
          })
          .attr('fill', state.options.rect_color);

        state.bar_chart
          .selectAll('.labels text')
          .data(dataObj)
          .transition()
          .duration(800)
          .text(function (d, i) {
            return d.data;
          })
          .attr('y', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? state.y_scale(d.data) - state.options.label_font_size / 2
              : state.y_scale(d.data) + state.options.label_font_size * 1.2;
          })
          .attr('fill', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? '#000'
              : '#FFF';
          })
          .attr('text-anchor', 'middle')
          .attr('font-weight', 'bold');
      },
      sortData: function (sortType) {
        if (sortType === 'A->Z') {
          state.data.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          });
        } else if (sortType === 'Z->A') {
          state.data.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }

            // names must be equal
            return 0;
          });
        } else if (sortType === 'ASC') {
          state.data.sort(function (a, b) {
            return a.data - b.data;
          });
        } else if (sortType === 'DESC') {
          state.data.sort(function (a, b) {
            return b.data - a.data;
          });
        } else {
        }

        var dataObj = state.data;

        state.x_scale = d3
          .scaleBand()
          .domain(
            dataObj.map(function (d) {
              return d.name;
            })
          )
          .rangeRound([
            state.options.chart_padding_left,
            state.options.chart_width - state.options.chart_padding_right,
          ])
          .padding(0.2);

        state.y_scale = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(dataObj, function (d) {
              return d.data;
            }),
          ])
          .rangeRound([
            state.options.chart_height - state.options.chart_padding_bottom,
            state.options.chart_padding_top,
          ]);

        // Updatting AXES Text labels

        state.x_axis = d3.axisBottom(state.x_scale);
        state.bar_chart
          .select('.x-axis')
          .transition()
          .duration(800)
          .attr(
            'transform',
            'translate(0,' +
              (state.options.chart_height -
                state.options.chart_padding_bottom) +
              ')'
          )
          .attr('color', '#000')
          .call(state.x_axis)
          .selectAll('text')
          .attr('class', 'x_label_text');

        state.y_axis = d3.axisLeft(state.y_scale);
        state.bar_chart
          .select('.y-axis')
          .transition()
          .duration(800)
          .attr(
            'transform',
            'translate(' + state.options.chart_padding_left + ',0)'
          )
          .attr('color', '#000')
          .call(state.y_axis)
          .selectAll('text');
        //.attr("font-size", axes_font_size);

        // making dynamic label fonts sizes
        state.options.label_font_size =
          Math.ceil(state.x_scale.bandwidth() / 3) > 12
            ? Math.ceil(state.x_scale.bandwidth() / 3)
            : 12;

        // ********* ADDING DATA TO THE RECT TABLES **********
        state.bar_chart
          .selectAll('rect')
          .data(dataObj)
          .transition()
          .duration(800)
          .attr('y', function (d, i) {
            return state.y_scale(d.data);
          })
          .attr('height', function (d, i) {
            return (
              state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data)
            );
          })
          .attr('fill', state.options.rect_color);

        state.bar_chart
          .selectAll('.labels text')
          .data(dataObj)
          .transition()
          .duration(800)
          .text(function (d, i) {
            return d.data;
          })
          .attr('y', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? state.y_scale(d.data) - state.options.label_font_size / 2
              : state.y_scale(d.data) + state.options.label_font_size * 1.2;
          })
          .attr('fill', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? '#000'
              : '#FFF';
          })
          .attr('text-anchor', 'middle');
      },
      resetData: function () {
        var dataObj = state.data.map(function (element) {
          var ele = JSON.parse(JSON.stringify(element));
          ele.data = 0;
          return ele;
        });

        state.x_scale = d3
          .scaleBand()
          .domain(
            dataObj.map(function (d) {
              return d.name;
            })
          )
          .rangeRound([
            state.options.chart_padding_left,
            state.options.chart_width - state.options.chart_padding_right,
          ])
          .padding(0.2);

        state.y_scale = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(dataObj, function (d) {
              return d.data;
            }),
          ])
          .rangeRound([
            state.options.chart_height - state.options.chart_padding_bottom,
            state.options.chart_padding_top,
          ]);

        // Updatting AXES Text labels

        state.x_axis = d3.axisBottom(state.x_scale);
        state.bar_chart
          .select('.x-axis')
          .transition()
          .duration(400)
          .attr(
            'transform',
            'translate(0,' +
              (state.options.chart_height -
                state.options.chart_padding_bottom) +
              ')'
          )
          .attr('color', '#000')
          .call(state.x_axis)
          .selectAll('text')
          .attr('class', 'x_label_text');

        state.y_axis = d3.axisLeft(state.y_scale);
        state.bar_chart
          .select('.y-axis')
          .transition()
          .duration(400)
          .attr(
            'transform',
            'translate(' + state.options.chart_padding_left + ',0)'
          )
          .attr('color', '#000')
          .call(state.y_axis)
          .selectAll('text');
        //.attr("font-size", axes_font_size);

        // making dynamic label fonts sizes
        state.options.label_font_size =
          Math.ceil(state.x_scale.bandwidth() / 3) > 12
            ? Math.ceil(state.x_scale.bandwidth() / 3)
            : 12;

        // ********* ADDING DATA TO THE RECT TABLES **********
        state.bar_chart
          .selectAll('rect')
          .data(dataObj)
          .transition()
          .duration(400)
          .attr('y', function (d, i) {
            return state.y_scale(d.data);
          })
          .attr('height', function (d, i) {
            return (
              state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data)
            );
          })
          .attr('fill', state.options.rect_color);

        state.bar_chart
          .selectAll('.labels text')
          .data(dataObj)
          .transition()
          .duration(400)
          .text(function (d, i) {
            return d.data;
          })
          .attr('y', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? state.y_scale(d.data) - state.options.label_font_size / 2
              : state.y_scale(d.data) + state.options.label_font_size * 1.2;
          })
          .attr('fill', function (d, i) {
            return state.options.chart_height -
              state.options.chart_padding_bottom -
              state.y_scale(d.data) <
              state.options.label_font_size * 1.5
              ? '#000'
              : '#FFF';
          })
          .attr('text-anchor', 'middle');
      },
    };
  }

  var decodeEntities = (function () {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities(str) {
      if (str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }

      return str;
    }

    return decodeHTMLEntities;
  })();

  return {
    initialzie: function (callback, callback2) {
      /*
        var myColMetaData = [];
        tables.modify.columnPairs.forEach(function(ele) {
          myColMetaData.push({
            data: ele.colName
          });
        });
      */

      tables.modify.tableRef = $('#modifyTable_id').DataTable({
        scrollX: true,
        scrollY: '200px',
        paging: true,
        pageLength: 50,
        order: [],
        fixedHeader: true,
        select: 'single',
        dom: 'Bfrtip',
        buttons: [
          {
            text: 'Reload',
            action: function (e, dt, node, config) {
              dt.clear();
              callback();
              dt.draw();
            },
          },
        ],
        columnDefs: [{ className: 'dt-center', targets: '_all' }],
        columns: [
          { data: 'ID' },
          { data: 'Third Party Name' },
          { data: 'Line of Business' },
          { data: 'CEUD' },
          { data: 'PII' },
          { data: 'PHI' },
          {
            data: 'Date Started',
            type: 'date',
            render: function (data) {
              if (data === null || data === 'Loading') return '';

              var date = new Date(data);
              var month = date.getMonth() + 1;
              var day = date.getDate();
              day = day > 9 ? day : '0' + day;
              return (
                (month > 9 ? month : '0' + month) +
                '/' +
                day +
                '/' +
                date.getFullYear() +
                ', ' +
                date.toLocaleTimeString()
              );

              /*
             var options =  { year:'2-digit', month:'2-digit', day:'2-digit', hour:"2-digit", minute:"2-digit", second:"2-digit", hour12: true };
              return  date.toLocaleString("en-US", options);
              */
            },
          },
          {
            data: 'Date Complete',
            type: 'date',
            render: function (data) {
              if (data === null || data === 'Loading') return '';

              var date = new Date(data);
              var month = date.getMonth() + 1;
              var day = date.getDate();
              day = day > 9 ? day : '0' + day;
              return (
                (month > 9 ? month : '0' + month) +
                '/' +
                day +
                '/' +
                date.getFullYear() +
                ', ' +
                date.toLocaleTimeString()
              );
            },
          },
          {
            data: 'Controls Assessor',
            render: function (data) {
              return data.toUpperCase();
            },
          },
          { data: 'TSR Status' },
          {
            data: 'Last Update',
            type: 'date',
            render: function (data) {
              if (data === null || data === 'Loading') return '';

              var date = new Date(data);
              var month = date.getMonth() + 1;
              var day = date.getDate();
              day = day > 9 ? day : '0' + day;
              return (
                (month > 9 ? month : '0' + month) +
                '/' +
                day +
                '/' +
                date.getFullYear() +
                ', ' +
                date.toLocaleTimeString()
              );
            },
          },
        ],
      });
      tables.modify.tableRef.clear();

      // SETTING UP ASSESSOR DATA TABLE
      tables.assessor.tableRef = $('#assessorTable_id').DataTable({
        scrollX: false,
        scrollY: '200px',
        paging: false,
        order: [],
        fixedHeader: true,
        select: 'single',
        dom: 'Bfrtip',
        buttons: [
          {
            text: 'Reload',
            action: function (e, dt, node, config) {
              dt.clear();
              callback2();
              dt.draw();
            },
          },
        ],
        columnDefs: [{ className: 'dt-center', targets: '_all' }],
        columns: [
          { data: 'ID' },
          { data: 'Third Party Name' },
          { data: 'Line of Business' },
          {
            data: 'Original Assessor',
            render: function (data) {
              return data.toUpperCase();
            },
          },
          {
            data: 'Date Started',
            type: 'date',
            render: function (data) {
              if (data === null || data === 'Loading') return '';

              var date = new Date(data);
              var month = date.getMonth() + 1;
              var day = date.getDate();
              day = day > 9 ? day : '0' + day;
              return (
                (month > 9 ? month : '0' + month) +
                '/' +
                day +
                '/' +
                date.getFullYear() +
                ', ' +
                date.toLocaleTimeString()
              );
            },
          },
          { data: 'TSR Status' },
          {
            data: 'Last Update',
            type: 'date',
            render: function (data) {
              if (data === null || data === 'Loading') return '';

              var date = new Date(data);
              var month = date.getMonth() + 1;
              var day = date.getDate();
              day = day > 9 ? day : '0' + day;
              return (
                (month > 9 ? month : '0' + month) +
                '/' +
                day +
                '/' +
                date.getFullYear() +
                ', ' +
                date.toLocaleTimeString()
              );
            },
          },
        ],
      });

      tables.assessor.tableRef.clear();

      //Setting up the general status dropdowns
      $('#' + 'K_generalStatus').change(function () {
        updateActionNeeded('modify', $('#' + 'K_generalStatus').val());
      });

      $('#' + 'K_generalStatus_2').change(function () {
        updateActionNeeded('assessor', $('#' + 'K_generalStatus_2').val());
      });

      /*
      tables.modify.tableRef.row
        .add({
          ID: 2364,
          "Third Party Name": "Smart Wires",
          "Line of Business": "Electric Operations",
          CEUD: true,
          PII: false,
          PHI: true,
          "Date Started": 3 / 2 / 2018,
          "Date Complete": 4 / 7 / 2018,
          "Controls Assessor": "K3BI",
          "TSR Status": "Review Complete",
          "Last Update": 5 / 7 / 2018
        })
        .draw();

        */
    },
    returnFormatTableRow: function (table, data) {
      return formatSingleRowData(table, data);
    },
    renderModifyTableSingleRow: function (rawRowData) {
      tables.modify.tableRef.row
        .add(formatSingleRowData('modify', rawRowData))
        .draw();

      tables.modify.tableRef.columns.adjust().draw();
    },
    renderModifyTableData: function (rawTableData) {
      // Raw table data will be an array of objects from SP, each object contains row information
      // loop through each row and format that data to add to the UI table
      rawTableData.forEach(function (element) {
        tables.modify.tableRef.row.add(formatSingleRowData('modify', element));
        //.draw();
      });

      tables.modify.tableRef.draw();
      //tables.modify.tableRef.columns.adjust().draw();
    },
    renderAssessorTableData: function (rawTableData) {
      rawTableData.forEach(function (element) {
        tables.assessor.tableRef.row.add(
          formatSingleRowData('assessor', element)
        );
        //.draw();
      });

      //tables.assessor.tableRef.draw();
      tables.assessor.tableRef.columns.adjust().draw();
    },
    modifyTableAutoAdjust: function () {
      if (tables.modify.initialAdjust) {
        tables.modify.tableRef.columns.adjust();
        //tables.modify.initialAdjust = false;
      }
    },
    assessorTableAutoAdjust: function () {
      if (tables.assessor.initialAdjust) {
        tables.assessor.tableRef.columns.adjust().draw();
        //tables.assessor.initialAdjust = false;
      }
    },
    modifyTableReference: function () {
      return tables.modify.tableRef;
    },
    assessorTableReference: function () {
      return tables.assessor.tableRef;
    },
    renderAssessorElements: function (data) {
      var date1;
      assessorFormElements.forEach(function (ele) {
        if (ele.show) {
          if (ele.colName === 'DateIQUploaded') {
            date1 = new Date(data[ele.colName]);
            if (/Trident\/|MSIE /.test(window.navigator.userAgent)) {
              //$("#" + ele.eleID).val(date1.toLocaleDateString());
              $('#' + ele.eleID).val(
                (date1.getMonth() < 9
                  ? '0' + (date1.getMonth() + 1).toString()
                  : date1.getMonth() + 1) +
                  '/' +
                  (date1.getDate().toString().length === 1
                    ? '0' + date1.getDate().toString()
                    : date1.getDate()) +
                  '/' +
                  date1.getFullYear()
              );
            } else {
              $('#' + ele.eleID).val(
                (date1.getMonth() < 9
                  ? '0' + (date1.getMonth() + 1).toString()
                  : date1.getMonth() + 1) +
                  '/' +
                  (date1.getDate().toString().length === 1
                    ? '0' + date1.getDate().toString()
                    : date1.getDate()) +
                  '/' +
                  date1.getFullYear()
              );
              /*
              $("#" + ele.eleID).val(
                date1.getFullYear() +
                  "-" +
                  (date1.getMonth() < 9
                    ? "0" + (date1.getMonth() + 1).toString()
                    : date1.getMonth() + 1) +
                  "-" +
                  (date1.getDate().toString().length === 1
                    ? "0" + date1.getDate().toString()
                    : date1.getDate())
              );
              */
            }
          } else if (ele.colName === 'LOB') {
            $('#' + ele.eleID).val(data['LOBName']['Title']);
          } else if (ele.colName === 'Third_x0020_Party_x0020_Name') {
            $('#' + ele.eleID).val(
              data['ThirdPartyName']['Third_x0020_Party_x0020_Name']
            );
          } else if (ele.colName === 'ControlAssessor') {
            $('#' + ele.eleID).val(data[ele.colName].toUpperCase());
          } else if (ele.colName === 'TSr_x0020_Status') {
            if (
              data[ele.colName] ===
                'Assessor received SOC report and currently reviewing/mapping security controls' ||
              data[ele.colName] ===
                'Assessor received ISO report and currently reviewing/mapping security controls' ||
              data[ele.colName] ===
                'TSR Assessor to complete review and analysis.'
            ) {
              $('#' + ele.eleID).val('Assessor Working');
              updateActionNeeded('assessor', 'Assessor Working');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (
              data[ele.colName] ===
                'LOB to ensure the vendor completes and returns Controls Questionnaire.' ||
              data[ele.colName] ===
                'LOB to ensure the vendor responds to the Assessors request for clarification.' ||
              data[ele.colName] ===
                'LOB to ensure the vendor responds to the Assessors request for additional evidence.'
            ) {
              $('#' + ele.eleID).val('Waiting for 3P Response');
              updateActionNeeded('assessor', 'Waiting for 3P Response');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (
              data[ele.colName] ===
                'LOB contact to complete and submit Intake Questionnaire' ||
              data[ele.colName] ===
                'LOB contact to provide additional information for the Intake Questionnaire to allow proper risk evaluation.'
            ) {
              $('#' + ele.eleID).val('Waiting for LOB Response');
              updateActionNeeded('assessor', 'Waiting for LOB Response');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (data[ele.colName] === 'Review Cancelled') {
              $('#' + ele.eleID).val('Cancelled');
              updateActionNeeded('assessor', 'Cancelled');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (data[ele.colName] === 'No TSR Required') {
              $('#' + ele.eleID).val('No TSR Required');
              updateActionNeeded('assessor', 'No TSR Required');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (
              data[ele.colName] === 'Review Complete' ||
              data[ele.colName] ===
                'LOB to ensure vendor mitigates deficient controls.'
            ) {
              $('#' + ele.eleID).val('Review Complete');
              updateActionNeeded('assessor', 'Review Complete');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (
              data[ele.colName] === 'On Site Assessment in Progress' ||
              data[ele.colName] === 'On Site Assessment Complete'
            ) {
              $('#' + ele.eleID).val('On Site');
              updateActionNeeded('assessor', 'On Site');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (data[ele.colName] === 'On Hold') {
              $('#' + ele.eleID).val('On Hold');
              updateActionNeeded('assessor', 'On Hold');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else if (
              data[ele.colName] === 'No Longer Doing Business with Vendor'
            ) {
              $('#' + ele.eleID).val('Renewal');
              updateActionNeeded('assessor', 'Renewal');
              $('#' + 'K_actionNeeded_2').val(data[ele.colName]);
            } else {
              console.log('There was an issue, no valid status was provided');
            }
          } else {
            //var tempVal = data[ele.colName]
            //tempVal = tempVal.replace()
            //$("#" + ele.eleID).val(data[ele.colName]);
            //$("#" + ele.eleID).val(htmlDecode(data[ele.colName]));
            // $("#" + ele.eleID).val( $('<textarea />').html(data[ele.colName]).text());
            $('#' + ele.eleID).val(
              $('<textarea />')
                .html(data[ele.colName])
                .text()
                .replace('<div>', '')
                .replace('</div>', '')
            );
          }
        }
      });
    },
    renderModifyElements: function (data) {
      var date1;
      modifyFormElements.forEach(function (ele) {
        if (ele.show) {
          if (ele.colName === 'DateIQUploaded') {
            date1 = new Date(data[ele.colName]);
            if (/Trident\/|MSIE /.test(window.navigator.userAgent)) {
              //$("#" + ele.eleID).val(date1.toLocaleDateString());
              $('#' + ele.eleID).val(
                (date1.getMonth() < 9
                  ? '0' + (date1.getMonth() + 1).toString()
                  : date1.getMonth() + 1) +
                  '/' +
                  (date1.getDate().toString().length === 1
                    ? '0' + date1.getDate().toString()
                    : date1.getDate()) +
                  '/' +
                  date1.getFullYear()
              );
            } else {
              $('#' + ele.eleID).val(
                (date1.getMonth() < 9
                  ? '0' + (date1.getMonth() + 1).toString()
                  : date1.getMonth() + 1) +
                  '/' +
                  (date1.getDate().toString().length === 1
                    ? '0' + date1.getDate().toString()
                    : date1.getDate()) +
                  '/' +
                  date1.getFullYear()
              );
              /*
              $("#" + ele.eleID).val(
                date1.getFullYear() +
                  "-" +
                  (date1.getMonth() < 9
                    ? "0" + (date1.getMonth() + 1).toString()
                    : date1.getMonth() + 1) +
                  "-" +
                  (date1.getDate().toString().length === 1
                    ? "0" + date1.getDate().toString()
                    : date1.getDate())
              );
              */
            }
          } else if (ele.colName === 'LOB') {
            $('#' + ele.eleID).val(data['LOBName']['Title']);
          } else if (ele.colName === 'Third_x0020_Party_x0020_Name') {
            $('#' + ele.eleID).val(
              data['ThirdPartyName']['Third_x0020_Party_x0020_Name']
            );
          } else if (ele.colName === 'ControlAssessor') {
            $('#' + ele.eleID).val(data[ele.colName].toUpperCase());
          } else if (ele.colName === 'TSr_x0020_Status') {
            if (
              data[ele.colName] ===
                'Assessor received SOC report and currently reviewing/mapping security controls' ||
              data[ele.colName] ===
                'Assessor received ISO report and currently reviewing/mapping security controls' ||
              data[ele.colName] ===
                'TSR Assessor to complete review and analysis.'
            ) {
              $('#' + ele.eleID).val('Assessor Working');
              updateActionNeeded('modify', 'Assessor Working');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (
              data[ele.colName] ===
                'LOB to ensure the vendor completes and returns Controls Questionnaire.' ||
              data[ele.colName] ===
                'LOB to ensure the vendor responds to the Assessors request for clarification.' ||
              data[ele.colName] ===
                'LOB to ensure the vendor responds to the Assessors request for additional evidence.'
            ) {
              $('#' + ele.eleID).val('Waiting for 3P Response');
              updateActionNeeded('modify', 'Waiting for 3P Response');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (
              data[ele.colName] ===
                'LOB contact to complete and submit Intake Questionnaire' ||
              data[ele.colName] ===
                'LOB contact to provide additional information for the Intake Questionnaire to allow proper risk evaluation.'
            ) {
              $('#' + ele.eleID).val('Waiting for LOB Response');
              updateActionNeeded('modify', 'Waiting for LOB Response');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (data[ele.colName] === 'Review Cancelled') {
              $('#' + ele.eleID).val('Cancelled');
              updateActionNeeded('modify', 'Cancelled');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (data[ele.colName] === 'No TSR Required') {
              $('#' + ele.eleID).val('No TSR Required');
              updateActionNeeded('modify', 'No TSR Required');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (
              data[ele.colName] === 'Review Complete' ||
              data[ele.colName] ===
                'LOB to ensure vendor mitigates deficient controls.'
            ) {
              $('#' + ele.eleID).val('Review Complete');
              updateActionNeeded('modify', 'Review Complete');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (
              data[ele.colName] === 'On Site Assessment in Progress' ||
              data[ele.colName] === 'On Site Assessment Complete'
            ) {
              $('#' + ele.eleID).val('On Site');
              updateActionNeeded('modify', 'On Site');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (data[ele.colName] === 'On Hold') {
              $('#' + ele.eleID).val('On Hold');
              updateActionNeeded('modify', 'On Hold');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else if (
              data[ele.colName] === 'No Longer Doing Business with Vendor'
            ) {
              $('#' + ele.eleID).val('Renewal');
              updateActionNeeded('modify', 'Renewal');
              $('#' + 'K_actionNeeded').val(data[ele.colName]);
            } else {
              console.log('There was an issue, no valid status was provided');
            }
          } else {
            //$("#" + ele.eleID).val(data[ele.colName]);
            //$("#" + ele.eleID).html(data[ele.colName]);
            $('#' + ele.eleID).val(
              $('<textarea />')
                .html(data[ele.colName])
                .text()
                .replace('<div>', '')
                .replace('</div>', '')
            );
          }
        }
      });
    },
    renderBarChart: function (
      selector,
      dataObj,
      title,
      title_bottom,
      title_left,
      rotateX
    ) {
      var chart_height = 600;
      var chart_width = 600;

      var chart_padding_top = 100;
      var chart_padding_bottom = 100;
      var chart_padding_left = 100;
      var chart_padding_right = 100;
      var label_font_size = 12;
      var axes_font_size = 12;

      //Creating our SVG BAR Chart
      var bar_chart = d3
        .select(selector)
        .append('svg')
        .attr('height', chart_height)
        .attr('width', chart_width);
      //.style("background-color", "#eee");

      // ***** CREATING SCALES *******

      var x_scale = d3
        .scaleBand()
        .domain(
          dataObj.map(function (d) {
            return d.name;
          })
        )
        .rangeRound([chart_padding_left, chart_width - chart_padding_right])
        .padding(0.2);

      var y_scale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dataObj, function (d) {
            return d.data;
          }),
        ])
        .rangeRound([chart_height - chart_padding_bottom, chart_padding_top]);

      // ********* ADDING DATA TO THE RECT TABLES **********

      bar_chart
        .selectAll('rect')
        .data(dataObj)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
          return x_scale(d.name);
        })
        .attr('y', function (d, i) {
          return y_scale(d.data);
        })
        .attr('width', x_scale.bandwidth())
        .attr('height', function (d, i) {
          return chart_height - chart_padding_bottom - y_scale(d.data);
        })
        .attr('fill', '#7ed26d')
        .on('mouseover', function (d) {
          var x =
            parseFloat(d3.select(this).attr('x')) + x_scale.bandwidth() / 2;
          var y = parseFloat(d3.select(this).attr('y')) / 2 + chart_height / 2;

          d3.select(selector + ' .tooltip')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block')
            .style('white-space', 'pre-line')
            .text(d.name + ': \n ' + d.data);
        })
        .on('mouseout', function () {
          d3.select(selector + ' .tooltip').style('display', 'none');
        });

      // CREATING AXES

      var x_axis = d3.axisBottom(x_scale);
      bar_chart
        .append('g')
        .attr('class', 'x-axis')
        .attr(
          'transform',
          'translate(0,' + (chart_height - chart_padding_bottom) + ')'
        )
        .attr('color', '#000')
        .call(x_axis)
        .selectAll('text')
        .attr('transform', rotateX ? 'rotate(25)' : 'rotate(0)')
        .attr('text-anchor', rotateX ? 'start' : 'middle')
        .attr('font-size', axes_font_size)
        .attr('class', 'x_label_text');

      var y_axis = d3.axisLeft(y_scale);
      bar_chart
        .append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(' + chart_padding_left + ',0)')
        .attr('color', '#000')
        .call(y_axis)
        .selectAll('text')
        .attr('font-size', axes_font_size)
        .attr('class', 'y_label_text');

      //  ******* ADDING LABELS **********************

      // making dynamic label fonts sizes
      label_font_size =
        Math.ceil(x_scale.bandwidth() / 3) > 10
          ? Math.ceil(x_scale.bandwidth() / 3)
          : 10;

      bar_chart
        .append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(dataObj)
        .enter()
        .append('text')
        .text(function (d, i) {
          return d.data;
        })
        .attr('x', function (d, i) {
          return x_scale(d.name) + x_scale.bandwidth() / 2;
        })
        .attr('y', function (d, i) {
          return chart_height - chart_padding_bottom - y_scale(d.data) <
            label_font_size * 1.5
            ? y_scale(d.data) - label_font_size / 2
            : y_scale(d.data) + label_font_size * 1.2;
        })
        .attr('font-size', label_font_size)
        .attr('fill', function (d, i) {
          return chart_height - chart_padding_bottom - y_scale(d.data) <
            label_font_size * 1.5
            ? '#000'
            : '#FFF';
        })
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none');

      //  ADDING TITLES, X AXXIS LABEL AND Y AXIS LABEL

      bar_chart
        .append('text')
        .attr('x', chart_width / 2)
        .attr('y', chart_padding_top / 2)
        .style('text-anchor', 'middle')
        .style('font-size', 20)
        .text(title);

      bar_chart
        .append('text')
        .attr('x', chart_width / 2)
        .attr(
          'y',
          rotateX
            ? chart_height - chart_padding_bottom * 0.1
            : chart_height - chart_padding_bottom * 0.5
        )
        .style('text-anchor', 'middle')
        .style('font-size', 18)
        .text(title_bottom);

      bar_chart
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', chart_padding_left / 2 - axes_font_size)
        .attr('x', -(chart_height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', 18)
        .text(title_left);
    },
    refreshBarChart: function (selector, dataObj) {
      var chart_height = 1000;
      var chart_width = 1000;

      var chart_padding_top = 100;
      var chart_padding_bottom = 100;
      var chart_padding_left = 100;
      var chart_padding_right = 100;
      var label_font_size = 12;
      var axes_font_size = 12;

      //Creating our SVG BAR Chart
      var bar_chart = d3.select(selector + ' svg');
      //.style("background-color", "#eee");

      var x_scale = d3
        .scaleBand()
        .domain(
          dataObj.map(function (d) {
            return d.name;
          })
        )
        .rangeRound([chart_padding_left, chart_width - chart_padding_right])
        .padding(0.2);

      var y_scale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dataObj, function (d) {
            return d.data;
          }),
        ])
        .rangeRound([chart_height - chart_padding_bottom, chart_padding_top]);

      // Updatting AXES Text labels

      var x_axis = d3.axisBottom(x_scale);
      bar_chart
        .select('.x-axis')
        .transition()
        .duration(800)
        .attr(
          'transform',
          'translate(0,' + (chart_height - chart_padding_bottom) + ')'
        )
        .attr('color', '#000')
        .call(x_axis)
        .selectAll('text')
        .attr('class', 'x_label_text');

      var y_axis = d3.axisLeft(y_scale);
      bar_chart
        .select('.y-axis')
        .transition()
        .duration(800)
        .attr('transform', 'translate(' + chart_padding_left + ',0)')
        .attr('color', '#000')
        .call(y_axis)
        .selectAll('text');
      //.attr("font-size", axes_font_size);

      // making dynamic label fonts sizes
      label_font_size =
        Math.ceil(x_scale.bandwidth() / 3) > 12
          ? Math.ceil(x_scale.bandwidth() / 3)
          : 12;

      // ********* ADDING DATA TO THE RECT TABLES **********
      bar_chart
        .selectAll('rect')
        .data(dataObj)
        .transition()
        .duration(800)
        .attr('y', function (d, i) {
          return y_scale(d.data);
        })
        .attr('height', function (d, i) {
          return chart_height - chart_padding_bottom - y_scale(d.data);
        })
        .attr('fill', '#7ed26d');

      bar_chart
        .selectAll('.labels text')
        .data(dataObj)
        .transition()
        .duration(800)
        .text(function (d, i) {
          return d.data;
        })
        .attr('y', function (d, i) {
          return chart_height - chart_padding_bottom - y_scale(d.data) <
            label_font_size * 1.5
            ? y_scale(d.data) - label_font_size / 2
            : y_scale(d.data) + label_font_size * 1.2;
        })
        .attr('fill', function (d, i) {
          return chart_height - chart_padding_bottom - y_scale(d.data) <
            label_font_size * 1.5
            ? '#000'
            : '#FFF';
        })
        .attr('text-anchor', 'middle');
    },
    renderKPIs: function (data) {
      data.forEach(function (ele) {
        //console.log(ele.name);
        $('#' + ele.name + '_KPI').text(ele.data);
      });
    },
    renderAllKPIs: function (total, data, num, year) {
      data.forEach(function (ele) {
        $('#' + ele.name + '_KPI_' + num).text(ele.data);
      });
      $('#Total_KPI_' + num).text(total);
      $('#overall_TSR_' + num).text(total);
      $('#overall_TSR_Label_' + num).text(year);
    },
    render2019SubmissionReport: function (selector, data) {
      var barchart = barChartFactory(selector + ' .chart', data, {
        title: 'My Title',
        x_title: 'x_title',
        y_title: 'y_title',
      });

      barchart.init();
    },
  };
})();

var TSR_App = (function (model, view) {
  var state = {
    modifyTable: {
      currentAssessment: null,
      currentRow: null,
      table: null,
    },
    assessorTable: {
      currentAssessment: null,
      currentRow: null,
      table: null,
    },
    usingSP: false,
    currentUser: null,
    lastreLoad: null,
  };

  var LOB_Data = [
    { LOB: 'Customer Care & CRE', data: 5 },
    { LOB: 'Corporate Services', data: 20 },
    { LOB: 'Ethics and Compliance', data: 30 },
    { LOB: 'Finance & Risk', data: 40 },
    { LOB: 'Generation', data: 50 },
    { LOB: 'IT & Supply Chain', data: 60.7 },
    { LOB: 'Pres/CEO/COO', data: 67.8 },
    { LOB: 'Electric Operations', data: 80 },
    { LOB: 'General Counsel', data: 120 },
    { LOB: 'Business Technology', data: 99 },
  ];

  var buttons = [
    {
      active: false,
      eleID: 'K_vendorName',
      colName: 'Third_x0020_Party_x0020_Name',
      btnID: 'btn-1',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_LOB',
      colName: 'LOB',
      btnID: 'btn-2',
      uiColName: 'Line of Business',
    },
    {
      active: true,
      eleID: 'K_orderNum',
      colName: 'OrderNumber',
      btnID: 'btn-3',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_Tier',
      colName: 'Tier',
      btnID: 'btn-4',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_dateStarted',
      colName: 'DateIQUploaded',
      btnID: 'btn-5',
      uiColName: 'Date Started',
    },
    {
      active: true,
      eleID: 'K_workOrderNum',
      colName: 'SMCWorkOrderNumber',
      btnID: 'btn-6',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_infoClass',
      colName: 'DataClassification',
      btnID: 'btn-7',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_assessor',
      colName: 'ControlAssessor',
      btnID: 'btn-8',
      uiColName: 'Controls Assessor',
    },
    {
      active: true,
      eleID: 'K_projectName',
      colName: 'ProjectName',
      btnID: 'btn-9',
      uiColName: null,
    },
    {
      active: false,
      eleID: 'K_generalStatus',
      colName: '',
      btnID: 'btn-10',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_actionNeeded',
      colName: 'TSr_x0020_Status',
      btnID: 'btn-11',
      uiColName: 'TSR Status',
    },
    {
      active: true,
      eleID: 'K_commentsWeek1',
      colName: 'CommentWeek1',
      btnID: 'btn-12',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek2',
      colName: 'CommentWeek2',
      btnID: 'btn-13',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek3',
      colName: 'CommentWeek3',
      btnID: 'btn-14',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek4',
      colName: 'CommentWeek4',
      btnID: 'btn-15',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek5',
      colName: 'CommentWeek5',
      btnID: 'btn-16',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek6',
      colName: 'CommentWeek6',
      btnID: 'btn-17',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek7',
      colName: 'CommentWeek7',
      btnID: 'btn-18',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_assessorNotes',
      colName: 'AssessorFinalNotes',
      btnID: 'btn-19',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_remediationStatus',
      colName: 'Remediation_Status',
      btnID: 'btn-20',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_remediationNotes',
      colName: 'Remediation_Notes',
      btnID: 'btn-21',
      uiColName: null,
    },
  ];

  var assessorFormButtons = [
    {
      active: false,
      eleID: 'K_generalStatus_2',
      colName: '',
      btnID: 'btn-10',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_actionNeeded_2',
      colName: 'TSr_x0020_Status',
      btnID: 'btn-31',
      uiColName: 'TSR Status',
    },
    {
      active: true,
      eleID: 'K_commentsWeek1_2',
      colName: 'CommentWeek1',
      btnID: 'btn-32',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek2_2',
      colName: 'CommentWeek2',
      btnID: 'btn-33',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek3_2',
      colName: 'CommentWeek3',
      btnID: 'btn-34',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek4_2',
      colName: 'CommentWeek4',
      btnID: 'btn-35',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek5_2',
      colName: 'CommentWeek5',
      btnID: 'btn-36',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek6_2',
      colName: 'CommentWeek6',
      btnID: 'btn-37',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_commentsWeek7_2',
      colName: 'CommentWeek7',
      btnID: 'btn-38',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_assessorNotes_2',
      colName: 'AssessorFinalNotes',
      btnID: 'btn-39',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_remediationStatus_2',
      colName: 'Remediation_Status',
      btnID: 'btn-40',
      uiColName: null,
    },
    {
      active: true,
      eleID: 'K_remediationNotes_2',
      colName: 'Remediation_Notes',
      btnID: 'btn-41',
      uiColName: null,
    },
  ];

  //HELPER FUNCTIONS

  function getMonthOrder(month) {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    var newI;

    monthNames.forEach(function (val, index) {
      if (val === month) {
        newI = index;
      }
    });

    return newI;
  }

  function formatSubmissionData(data, year) {
    var LOBs = [
      { name: 'Corporate Services', data: 0 },
      { name: 'Customer Care & CRE', data: 0 },
      { name: 'Electric Operations', data: 0 },
      { name: 'Ethics & Compliance', data: 0 },
      { name: 'Finance & Risk', data: 0 },
      { name: 'Gas Operations', data: 0 },
      { name: 'General Counsel/Law', data: 0 },
      { name: 'Generation', data: 0 },
      { name: 'Human Resources', data: 0 },
      { name: 'Information Technology & Supply Chain', data: 0 },
      { name: 'Pres/ CEO /COO', data: 0 },
      { name: 'Safety Health and Enterprise', data: 0 },
      { name: 'Strategy & Policy', data: 0 },
    ];
    var Months = [
      { name: 'January', data: 0 },
      { name: 'February', data: 0 },
      { name: 'March', data: 0 },
      { name: 'April', data: 0 },
      { name: 'May', data: 0 },
      { name: 'June', data: 0 },
      { name: 'July', data: 0 },
      { name: 'August', data: 0 },
      { name: 'September', data: 0 },
      { name: 'October', data: 0 },
      { name: 'November', data: 0 },
      { name: 'December', data: 0 },
    ];

    var allData = _.groupBy(data, function (d) {
      var newDate = new Date(d.DateIQUploaded);
      return newDate.getFullYear();
    });

    var myData = {
      byTier: [],
      byMonth: [],
      byLOB: [],
      byTierHighLOB: [],
      total: null,
    };

    // console.log(allData);
    myData.total = allData[year].length;

    myData.byTier = _.groupBy(allData[year], function (d) {
      return d.Tier;
    });
    myData.byTierHighLOB = _.cloneDeep(myData.byTier);
    myData.byTier = _.mapKeys(myData.byTier, function (val, key) {
      return 'Tier ' + key;
    });
    myData.byTier = _.mapValues(myData.byTier, 'length');
    myData.byTier = _.map(myData.byTier, function (val, index, array) {
      return { name: index, data: val };
    });

    myData.byMonth = _.groupBy(allData[year], function (d) {
      var newDate = new Date(d.DateIQUploaded);
      return newDate.getMonthName();
    });
    myData.byMonth = _.mapValues(myData.byMonth, 'length');
    myData.byMonth = _.map(myData.byMonth, function (val, index, array) {
      return { name: index, data: val };
    });
    myData.byMonth = _.unionWith(myData.byMonth, Months, function (n1, n2) {
      return n1.name === n2.name;
    });
    myData.byMonth = _.orderBy(
      myData.byMonth,
      function (m) {
        return getMonthOrder(m.name);
      },
      ['asc']
    );

    myData.byLOB = _.groupBy(allData[year], function (d) {
      return d.LOBName.Title;
    });
    myData.byLOB = _.mapValues(myData.byLOB, 'length');
    myData.byLOB = _.map(myData.byLOB, function (val, index, array) {
      return { name: index, data: val };
    });
    myData.byLOB = _.unionWith(myData.byLOB, LOBs, function (n1, n2) {
      return n1.name === n2.name;
    });
    myData.byLOB = _.map(myData.byLOB, function (val, index) {
      if (val.name === 'Information Technology & Supply Chain')
        val.name = 'IT & Supply Chain';
      else if (val.name === 'Safety Health and Enterprise')
        val.name = 'Safety & Health';

      return val;
    });
    myData.byLOB = _.orderBy(myData.byLOB, ['name'], ['asc']);

    myData.byTierHighLOB = _.groupBy(myData.byTierHighLOB[1], function (d) {
      return d.LOBName.Title;
    });
    myData.byTierHighLOB = _.mapValues(myData.byTierHighLOB, 'length');
    myData.byTierHighLOB = _.map(myData.byTierHighLOB, function (
      val,
      index,
      array
    ) {
      return { name: index, data: val };
    });
    myData.byTierHighLOB = _.unionWith(myData.byTierHighLOB, LOBs, function (
      n1,
      n2
    ) {
      return n1.name === n2.name;
    });
    myData.byTierHighLOB = _.map(myData.byTierHighLOB, function (val, index) {
      if (val.name === 'Information Technology & Supply Chain')
        val.name = 'IT & Supply Chain';
      else if (val.name === 'Safety Health and Enterprise')
        val.name = 'Safety & Health';

      return val;
    });
    myData.byTierHighLOB = _.orderBy(myData.byTierHighLOB, ['name'], ['asc']);
    return myData;
  }

  function formatSubmissionData2(data, year) {
    /*
    var LOBs = [
      { name: "Corporate Services", data: 0 },
      { name: "Customer Care & CRE", data: 0 },
      { name: "Electric Operations", data: 0 },
      { name: "Ethics & Compliance", data: 0 },
      { name: "Finance & Risk", data: 0 },
      { name: "Gas Operations", data: 0 },
      { name: "General Counsel/Law", data: 0 },
      { name: "Generation", data: 0 },
      { name: "Human Resources", data: 0 },
      { name: "Information Technology & Supply Chain", data: 0 },
      { name: "Pres/ CEO /COO", data: 0 },
      { name: "Safety Health and Enterprise", data: 0 },
      { name: "Strategy & Policy", data: 0 }
    ];
    */

    var LOBs = _.orderBy(
      _.filter(
        _.map(
          _.groupBy(data, function (d) {
            return d.LOBName.Title;
          }),
          function (val, index, array) {
            return { name: index, data: 0 };
          }
        ),
        function (o) {
          return o.name !== 'Energy Supply';
        }
      ),
      ['name'],
      ['asc']
    );

    var Months = [
      { x: 'January', y: 0 },
      { x: 'February', y: 0 },
      { x: 'March', y: 0 },
      { x: 'April', y: 0 },
      { x: 'May', y: 0 },
      { x: 'June', y: 0 },
      { x: 'July', y: 0 },
      { x: 'August', y: 0 },
      { x: 'September', y: 0 },
      { x: 'October', y: 0 },
      { x: 'November', y: 0 },
      { x: 'December', y: 0 },
    ];

    var allData = _.groupBy(data, function (d) {
      var newDate = new Date(d.DateIQUploaded);
      return newDate.getFullYear();
    });

    var myData = {
      byTier: [],
      byLOBTime: [],
      byMonth: [],
      byLOB: [],
      total: null,
    };

    myData.total = allData[year].length;

    myData.byTier = _.groupBy(allData[year], function (d) {
      return d.Tier;
    });
    delete myData.byTier['null'];
    myData.byTier = _.mapKeys(myData.byTier, function (val, key) {
      return 'Tier ' + key;
    });

    if (!_.has(myData.byTier, 'Tier 1')) {
      myData.byTier['Tier 1'] = [];
      console.log('No Tier 1s found');
    }
    if (!_.has(myData.byTier, 'Tier 2')) {
      myData.byTier['Tier 2'] = [];
    }
    if (!_.has(myData.byTier, 'Tier 3')) {
      myData.byTier['Tier 3'] = [];
    }
    if (!_.has(myData.byTier, 'Tier 4')) {
      myData.byTier['Tier 4'] = [];
    }

    myData.byTier = _.mapValues(myData.byTier, function (val, index, array) {
      return {
        total: val.length,
        items: _.orderBy(
          _.unionWith(
            _.map(
              _.mapValues(
                _.groupBy(val, function (d) {
                  return d.LOBName.Title;
                }),
                'length'
              ),
              function (val, index, array) {
                return { name: index, data: val };
              }
            ),
            LOBs,
            function (n1, n2) {
              return n1.name === n2.name;
            }
          ),
          ['name'],
          ['asc']
        ),
      };
    });

    myData.byLOB = _.groupBy(allData[year], function (d) {
      return d.LOBName.Title;
    });
    myData.byLOB = _.map(myData.byLOB, function (val, index, array) {
      return { name: index, data: val.length };
    });
    myData.byLOB = _.unionWith(myData.byLOB, LOBs, function (n1, n2) {
      return n1.name === n2.name;
    });

    /*
    myData.byLOB = _.map(myData.byLOB, function (val, index) {
      if (val.name === "Information Technology & Supply Chain") val.name = "IT & Supply Chain"
      else if (val.name === "Safety Health and Enterprise") val.name = "Safety & Health"

      return val
    })
    */

    myData.byLOBTime = _.groupBy(allData[year], function (d) {
      return d.LOBName.Title;
    });
    myData.byLOBTime = _.mapValues(myData.byLOBTime, function (
      val,
      index,
      array
    ) {
      return _.orderBy(
        _.unionWith(
          _.map(
            _.mapValues(
              _.groupBy(val, function (d) {
                var newDate = new Date(d.DateIQUploaded);
                //return newDate.toISOString()
                return newDate.getMonthName();
              }),
              'length'
            ),
            function (val, index, array) {
              return { x: index, y: val };
            }
          ),
          Months,
          function (n1, n2) {
            return n1.x === n2.x;
          }
        ),
        function (m) {
          return getMonthOrder(m.x);
        },
        ['asc']
      ).sort(function compare(a, b) {
        var dateA = new Date(a.x);
        var dateB = new Date(b.x);
        return dateA - dateB;
      });
    });

    myData.byMonth = _.groupBy(allData[year], function (d) {
      var newDate = new Date(d.DateIQUploaded);
      return newDate.getMonthName();
    });
    myData.byMonth = _.mapValues(myData.byMonth, 'length');
    myData.byMonth = _.map(myData.byMonth, function (val, index, array) {
      return { x: index, y: val };
    });
    myData.byMonth = _.unionWith(myData.byMonth, Months, function (n1, n2) {
      return n1.x === n2.x;
    });
    myData.byMonth = _.orderBy(
      myData.byMonth,
      function (m) {
        return getMonthOrder(m.x);
      },
      ['asc']
    );

    /*
    myData.byMonth = _.groupBy(allData[year], function (d) { return d.LOBName.Title })
    myData.byMonth = _.mapValues(myData.byMonth, function (val, index, array) {
      return _.orderBy(_.unionWith(_.map(_.mapValues(_.groupBy(val, function (d) {
        var newDate = new Date(d.DateIQUploaded)
        return newDate.getMonthName()
      }), 'length'), function (val, index, array) { return { x: index, y: val } }), Months, function (n1, n2) { return n1.name === n2.name }), function (m) { return getMonthOrder(m.x) }, ['asc']).sort(function compare(a, b) {
        var dateA = new Date(a.x);
        var dateB = new Date(b.x);
        return dateA - dateB;
      })
    })

    */

    /*
    myData.byMonth = _.groupBy(allData[year], function (d) {
      var newDate = new Date(d.DateIQUploaded)
      return newDate.getMonthName();
    })
    myData.byMonth = _.mapValues(myData.byMonth, "length")
    myData.byMonth = _.map(myData.byMonth, function (val, index, array) { return { name: index, data: val } })
    myData.byMonth = _.unionWith(myData.byMonth, Months, function (n1, n2) { return n1.name === n2.name })
    myData.byMonth = _.orderBy(myData.byMonth, function (m) { return getMonthOrder(m.name) }, ['asc'])
    */

    /*
    myData.byLOBTime = _.groupBy(myData.byLOBTime, function (d) {
      var newDate = new Date(d.DateIQUploaded)
      return newDate.toLocaleDateString()
    })
    */

    /*
    var Active = {
      total: dataActive.length
    }

    dataActive = _.groupBy(dataActive, function (d) { return d.Tier })
    dataActive = _.mapKeys(dataActive, function (val, key) { return "Tier " + key; })
    dataActive = _.mapValues(dataActive, function (val, index, array) {
      return {
        total: val.length,
        items: _.orderBy(_.unionWith(_.map(_.mapValues(_.groupBy(val, function (d) { return d.LOBName.Title }), 'length'), function (val, index, array) { return { name: index, data: val } }), LOBs, function (n1, n2) { return n1.name === n2.name }), ["name"], ['asc'])
      }
    })

    Active.Data = dataActive;
    */

    /*    
      myData.total = allData[year].length
  
      myData.byTier = _.groupBy(allData[year], function (d) { return d.Tier })
      myData.byTierHighLOB = _.cloneDeep(myData.byTier);
      myData.byTier = _.mapKeys(myData.byTier, function (val, key) { return "Tier " + key; })
      myData.byTier = _.mapValues(myData.byTier, "length")
      myData.byTier = _.map(myData.byTier, function (val, index, array) { return { name: index, data: val } })
  
  
      myData.byMonth = _.groupBy(allData[year], function (d) {
        var newDate = new Date(d.DateIQUploaded)
        return newDate.getMonthName();
      })
      myData.byMonth = _.mapValues(myData.byMonth, "length")
      myData.byMonth = _.map(myData.byMonth, function (val, index, array) { return { name: index, data: val } })
      myData.byMonth = _.unionWith(myData.byMonth, Months, function (n1, n2) { return n1.name === n2.name })
      myData.byMonth = _.orderBy(myData.byMonth, function (m) { return getMonthOrder(m.name) }, ['asc'])
  
  
      myData.byLOB = _.groupBy(allData[year], function (d) { return d.LOBName.Title })
      myData.byLOB = _.mapValues(myData.byLOB, "length")
      myData.byLOB = _.map(myData.byLOB, function (val, index, array) { return { name: index, data: val } })
      myData.byLOB = _.unionWith(myData.byLOB, LOBs, function (n1, n2) { return n1.name === n2.name })
      myData.byLOB = _.map(myData.byLOB, function (val, index) {
        if (val.name === "Information Technology & Supply Chain") val.name = "IT & Supply Chain"
        else if (val.name === "Safety Health and Enterprise") val.name = "Safety & Health"
  
        return val
      })
      myData.byLOB = _.orderBy(myData.byLOB, ["name"], ['asc'])
  
      myData.byTierHighLOB = _.groupBy(myData.byTierHighLOB[1], function (d) { return d.LOBName.Title });
      myData.byTierHighLOB = _.mapValues(myData.byTierHighLOB, "length")
      myData.byTierHighLOB = _.map(myData.byTierHighLOB, function (val, index, array) { return { name: index, data: val } })
      myData.byTierHighLOB = _.unionWith(myData.byTierHighLOB, LOBs, function (n1, n2) { return n1.name === n2.name })
      myData.byTierHighLOB = _.map(myData.byTierHighLOB, function (val, index) {
        if (val.name === "Information Technology & Supply Chain") val.name = "IT & Supply Chain"
        else if (val.name === "Safety Health and Enterprise") val.name = "Safety & Health"
  
        return val
      })
      myData.byTierHighLOB = _.orderBy(myData.byTierHighLOB, ["name"], ['asc'])
  
      */
    return myData;
  }

  function formatMonthlyReport(data) {
    var currentYearLOBAggregate = [
      { name: 'Corporate Services', data: 0 },
      { name: 'Customer Care & CRE', data: 0 },
      { name: 'Electric Operations', data: 0 },
      { name: 'Ethics & Compliance', data: 0 },
      { name: 'Finance & Risk', data: 0 },
      { name: 'Gas Operations', data: 0 },
      { name: 'General Counsel/Law', data: 0 },
      { name: 'Generation', data: 0 },
      { name: 'Human Resources', data: 0 },
      { name: 'Information Technology & Supply Chain', data: 0 },
      { name: 'Pres/ CEO /COO', data: 0 },
      { name: 'Safety Health and Enterprise', data: 0 },
      { name: 'Strategy & Policy', data: 0 },
    ];

    var currentYearTier1LOBAggregate = [
      { name: 'Corporate Services', data: 0 },
      { name: 'Customer Care & CRE', data: 0 },
      { name: 'Electric Operations', data: 0 },
      { name: 'Ethics & Compliance', data: 0 },
      { name: 'Finance & Risk', data: 0 },
      { name: 'Gas Operations', data: 0 },
      { name: 'General Counsel/Law', data: 0 },
      { name: 'Generation', data: 0 },
      { name: 'Human Resources', data: 0 },
      { name: 'Information Technology & Supply Chain', data: 0 },
      { name: 'Pres/ CEO /COO', data: 0 },
      { name: 'Safety Health and Enterprise', data: 0 },
      { name: 'Strategy & Policy', data: 0 },
    ];

    var currentYearCompleteTierAggregate = [
      { name: 'Tier 1', data: 0 },
      { name: 'Tier 2', data: 0 },
      { name: 'Tier 3', data: 0 },
      { name: 'Tier 4', data: 0 },
    ];

    var currentYearActiveTierAggregate = [
      { name: 'Tier 1', data: 0 },
      { name: 'Tier 2', data: 0 },
      { name: 'Tier 3', data: 0 },
      { name: 'Tier 4', data: 0 },
    ];

    var OverallMonthlyAggregate = [
      { name: 'January', data: 0 },
      { name: 'February', data: 0 },
      { name: 'March', data: 0 },
      { name: 'April', data: 0 },
      { name: 'May', data: 0 },
      { name: 'June', data: 0 },
      { name: 'July', data: 0 },
      { name: 'August', data: 0 },
      { name: 'September', data: 0 },
      { name: 'October', data: 0 },
      { name: 'November', data: 0 },
      { name: 'December', data: 0 },
    ];

    var currentYear = new Date();
    currentYear = currentYear.getFullYear();
    var totalAggregate = 0;
    var totalActive = 0;
    var totalReview = 0;
    var totalRemediation = 0;

    var temp = null;
    var dateStart = null,
      dateComplete = null,
      remediationNeeded = null,
      TSRStatus = null,
      remediationStatus = null,
      remedaitionStart = null,
      remediationComplete = null;
    var myNewData = [];

    data.forEach(function (ele) {
      temp = new Date(ele.DateIQUploaded);

      dateStart = new Date(ele.DateIQUploaded);
      dateComplete = new Date(ele.DateComplete);
      remediationNeeded = ele.Remediation_Needed;
      TSRStatus = ele.TSr_x0020_Status;
      remediationStatus = ele.Remediation_Status;
      remedaitionStart = new Date(ele.Remediation_Date_Start);
      remediationComplete = new Date(ele.Remediation_Date_Complete);

      if (
        dateStart.getFullYear() === currentYear ||
        (dateComplete.getFullYear() === currentYear &&
          TSRStatus !== 'Certificate/report  Valid') ||
        remedaitionStart.getFullYear() === currentYear ||
        remediationComplete.getFullYear() === currentYear ||
        (TSRStatus !== 'Review Complete' &&
          TSRStatus !== 'Review Cancelled' &&
          TSRStatus !== 'On Hold' &&
          TSRStatus !== 'On Site Assessment Complete' &&
          TSRStatus !== 'No TSR Required' &&
          TSRStatus !== 'Certificate/report  Valid' &&
          TSRStatus !== null) ||
        (TSRStatus === 'Review Complete' &&
          remediationStatus !== 'Remediation Complete' &&
          remediationStatus !== 'Remediation Cancelled' &&
          remediationStatus !== null)
      ) {
        if (
          (TSRStatus !== 'Review Complete' &&
            TSRStatus !== 'Review Cancelled' &&
            TSRStatus !== 'On Hold' &&
            TSRStatus !== 'On Site Assessment Complete' &&
            TSRStatus !== 'No TSR Required') ||
          (TSRStatus === 'Review Complete' &&
            remediationStatus !== 'Remediation Complete' &&
            remediationStatus !== 'Remediation Cancelled' &&
            remediationStatus !== null)
        ) {
          // Active

          if (
            TSRStatus !== 'Review Complete' &&
            TSRStatus !== 'Review Cancelled' &&
            TSRStatus !== 'On Hold' &&
            TSRStatus !== 'On Site Assessment Complete' &&
            TSRStatus !== 'No TSR Required'
          ) {
            totalReview++;
          }

          if (
            TSRStatus === 'Review Complete' &&
            remediationStatus !== 'Remediation Complete' &&
            remediationStatus !== 'Remediation Cancelled' &&
            remediationStatus !== null
          ) {
            totalRemediation++;
          }

          switch (ele.Tier) {
            case 1:
              currentYearActiveTierAggregate[0].data++;
              break;
            case 2:
              currentYearActiveTierAggregate[1].data++;
              break;
            case 3:
              currentYearActiveTierAggregate[2].data++;
              break;
            case 4:
              currentYearActiveTierAggregate[3].data++;
              break;
          }

          myNewData.push(ele.ID);
          totalActive++;
        } else {
          // Complete

          switch (ele.Tier) {
            case 1:
              currentYearCompleteTierAggregate[0].data++;
              break;
            case 2:
              currentYearCompleteTierAggregate[1].data++;
              break;
            case 3:
              currentYearCompleteTierAggregate[2].data++;
              break;
            case 4:
              currentYearCompleteTierAggregate[3].data++;
              break;
          }
        }

        if (ele.Tier === 1) {
          switch (ele.LOBName.Title) {
            case 'Corporate Services':
              currentYearTier1LOBAggregate[0].data++;
              break;
            case 'Customer Care & CRE':
              currentYearTier1LOBAggregate[1].data++;
              break;
            case 'Electric Operations':
              currentYearTier1LOBAggregate[2].data++;
              break;
            case 'Ethics & Compliance':
              currentYearTier1LOBAggregate[3].data++;
              break;
            case 'Finance & Risk':
              currentYearTier1LOBAggregate[4].data++;
              break;
            case 'Gas Operations':
              currentYearTier1LOBAggregate[5].data++;
              break;
            case 'General Counsel/Law':
              currentYearTier1LOBAggregate[6].data++;
              break;
            case 'Generation':
              currentYearTier1LOBAggregate[7].data++;
              break;
            case 'Human Resources':
              currentYearTier1LOBAggregate[8].data++;
              break;
            case 'Information Technology & Supply Chain':
              currentYearTier1LOBAggregate[9].data++;
              break;
            case 'Pres/ CEO /COO':
              currentYearTier1LOBAggregate[10].data++;
              break;
            case 'Safety Health and Enterprise':
              currentYearTier1LOBAggregate[11].data++;
              break;
            case 'Strategy & Policy':
              currentYearTier1LOBAggregate[12].data++;
              break;
          }
        }

        switch (ele.LOBName.Title) {
          case 'Corporate Services':
            currentYearLOBAggregate[0].data++;
            break;
          case 'Customer Care & CRE':
            currentYearLOBAggregate[1].data++;
            break;
          case 'Electric Operations':
            currentYearLOBAggregate[2].data++;
            break;
          case 'Ethics & Compliance':
            currentYearLOBAggregate[3].data++;
            break;
          case 'Finance & Risk':
            currentYearLOBAggregate[4].data++;
            break;
          case 'Gas Operations':
            currentYearLOBAggregate[5].data++;
            break;
          case 'General Counsel/Law':
            currentYearLOBAggregate[6].data++;
            break;
          case 'Generation':
            currentYearLOBAggregate[7].data++;
            break;
          case 'Human Resources':
            currentYearLOBAggregate[8].data++;
            break;
          case 'Information Technology & Supply Chain':
            currentYearLOBAggregate[9].data++;
            break;
          case 'Pres/ CEO /COO':
            currentYearLOBAggregate[10].data++;
            break;
          case 'Safety Health and Enterprise':
            currentYearLOBAggregate[11].data++;
            break;
          case 'Strategy & Policy':
            currentYearLOBAggregate[12].data++;
            break;
        }
        totalAggregate++;
      }
    });

    currentYearLOBAggregate[9].name = 'IT & Supply Chain';
    currentYearLOBAggregate[11].name = 'Safety & Health';

    currentYearTier1LOBAggregate[9].name = 'IT & Supply Chain';
    currentYearTier1LOBAggregate[11].name = 'Safety & Health';

    //
    /*
    console.log(totalActive);
    console.log(totalAggregate)
    console.log(myNewData)
    console.log(currentYearActiveTierAggregate)
    console.log(currentYearCompleteTierAggregate)
    console.log(totalReview)
    console.log(totalRemediation)
    */

    return {
      active: totalActive,
      review: totalReview,
      remediation: totalRemediation,
      complete: totalAggregate - totalActive,
      total: totalAggregate,
      activeByTier: currentYearActiveTierAggregate,
      completeByTier: currentYearCompleteTierAggregate,
      byLOB: currentYearLOBAggregate,
      byTier1LOB: currentYearTier1LOBAggregate,
    };
  }

  function formatMonthlyReport2(data) {
    var newData = [];
    var dataActive = [];
    var dataComplete = [];
    var dataTotal = [];

    var LOBs = _.orderBy(
      _.filter(
        _.map(
          _.groupBy(data, function (d) {
            return d.LOBName.Title;
          }),
          function (val, index, array) {
            return { name: index, data: 0 };
          }
        ),
        function (o) {
          return o.name !== 'Energy Supply';
        }
      ),
      ['name'],
      ['asc']
    );

    var Months = [
      { name: 'January', data: 0 },
      { name: 'February', data: 0 },
      { name: 'March', data: 0 },
      { name: 'April', data: 0 },
      { name: 'May', data: 0 },
      { name: 'June', data: 0 },
      { name: 'July', data: 0 },
      { name: 'August', data: 0 },
      { name: 'September', data: 0 },
      { name: 'October', data: 0 },
      { name: 'November', data: 0 },
      { name: 'December', data: 0 },
    ];

    var currentYear = new Date();
    currentYear = currentYear.getFullYear();
    var totalAggregate = 0;
    var totalActive = 0;
    var totalReview = 0;
    var totalRemediation = 0;

    var temp = null;
    var dateStart = null,
      dateComplete = null,
      remediationNeeded = null,
      TSRStatus = null,
      remediationStatus = null,
      remedaitionStart = null,
      remediationComplete = null;
    var myNewData = [];

    data.forEach(function (ele) {
      temp = new Date(ele.DateIQUploaded);

      dateStart = new Date(ele.DateIQUploaded);
      dateComplete = new Date(ele.DateComplete);
      remediationNeeded = ele.Remediation_Needed;
      TSRStatus = ele.TSr_x0020_Status;
      remediationStatus = ele.Remediation_Status;
      remedaitionStart = new Date(ele.Remediation_Date_Start);
      remediationComplete = new Date(ele.Remediation_Date_Complete);

      if (
        dateStart.getFullYear() === currentYear ||
        (dateComplete.getFullYear() === currentYear &&
          TSRStatus !== 'Certificate/report  Valid') ||
        remedaitionStart.getFullYear() === currentYear ||
        remediationComplete.getFullYear() === currentYear ||
        (TSRStatus !== 'Review Complete' &&
          TSRStatus !== 'Review Cancelled' &&
          TSRStatus !== 'On Hold' &&
          TSRStatus !== 'On Site Assessment Complete' &&
          TSRStatus !== 'No TSR Required' &&
          TSRStatus !== 'Certificate/report  Valid' &&
          TSRStatus !== null) ||
        (TSRStatus === 'Review Complete' &&
          remediationStatus !== 'Remediation Complete' &&
          remediationStatus !== 'Remediation Cancelled' &&
          remediationStatus !== null)
      ) {
        if (
          (TSRStatus !== 'Review Complete' &&
            TSRStatus !== 'Review Cancelled' &&
            TSRStatus !== 'On Hold' &&
            TSRStatus !== 'On Site Assessment Complete' &&
            TSRStatus !== 'No TSR Required') ||
          (TSRStatus === 'Review Complete' &&
            remediationStatus !== 'Remediation Complete' &&
            remediationStatus !== 'Remediation Cancelled' &&
            remediationStatus !== null)
        ) {
          // Active
          dataActive.push(ele);

          if (
            TSRStatus !== 'Review Complete' &&
            TSRStatus !== 'Review Cancelled' &&
            TSRStatus !== 'On Hold' &&
            TSRStatus !== 'On Site Assessment Complete' &&
            TSRStatus !== 'No TSR Required'
          ) {
            totalReview++;
          }

          if (
            TSRStatus === 'Review Complete' &&
            remediationStatus !== 'Remediation Complete' &&
            remediationStatus !== 'Remediation Cancelled' &&
            remediationStatus !== null
          ) {
            totalRemediation++;
          }

          myNewData.push(ele.ID);
          totalActive++;
        } else {
          // Complete

          dataComplete.push(ele);
        }

        dataTotal.push(ele);
        totalAggregate++;
      }
    });

    //myData.byTierHighLOB = _.cloneDeep(myData.byTier);
    //myData.byTier = _.mapKeys(myData.byTier, function (val, key) { return "Tier " + key; })
    //myData.byTier = _.mapValues(myData.byTier, "length")
    //myData.byTier = _.map(myData.byTier, function (val, index, array) { return { name: index, data: val } })

    var Total = {
      total: dataTotal.length,
    };

    dataTotal = _.groupBy(dataTotal, function (d) {
      return d.Tier;
    });
    dataTotal = _.mapKeys(dataTotal, function (val, key) {
      return 'Tier ' + key;
    });

    if (!_.has(dataTotal, 'Tier 1')) {
      dataTotal['Tier 1'] = [];
    }
    if (!_.has(dataTotal, 'Tier 2')) {
      dataTotal['Tier 2'] = [];
    }
    if (!_.has(dataTotal, 'Tier 3')) {
      dataTotal['Tier 3'] = [];
    }
    if (!_.has(dataTotal, 'Tier 4')) {
      dataTotal['Tier 4'] = [];
    }

    dataTotal = _.mapValues(dataTotal, function (val, index, array) {
      return {
        total: val.length,
        items: _.orderBy(
          _.unionWith(
            _.map(
              _.mapValues(
                _.groupBy(val, function (d) {
                  return d.LOBName.Title;
                }),
                'length'
              ),
              function (val, index, array) {
                return { name: index, data: val };
              }
            ),
            LOBs,
            function (n1, n2) {
              return n1.name === n2.name;
            }
          ),
          ['name'],
          ['asc']
        ),
      };
    });

    Total.Data = dataTotal;

    var Active = {
      total: dataActive.length,
    };
    // console.log(
    //   _.groupBy(dataActive, function (d) {
    //     return d.TSr_x0020_Status;
    //   })
    // );

    dataActive = _.groupBy(dataActive, function (d) {
      return d.Tier;
    });
    dataActive = _.mapKeys(dataActive, function (val, key) {
      return 'Tier ' + key;
    });

    if (!_.has(dataActive, 'Tier 1')) {
      dataActive['Tier 1'] = [];
      console.log('No Tier 1s found');
    }
    if (!_.has(dataActive, 'Tier 2')) {
      dataActive['Tier 2'] = [];
    }
    if (!_.has(dataActive, 'Tier 3')) {
      dataActive['Tier 3'] = [];
    }

    dataActive = _.mapValues(dataActive, function (val, index, array) {
      return {
        total: val.length,
        items: _.orderBy(
          _.unionWith(
            _.map(
              _.mapValues(
                _.groupBy(val, function (d) {
                  return d.LOBName.Title;
                }),
                'length'
              ),
              function (val, index, array) {
                return { name: index, data: val };
              }
            ),
            LOBs,
            function (n1, n2) {
              return n1.name === n2.name;
            }
          ),
          ['name'],
          ['asc']
        ),
      };
    });

    Active.Data = dataActive;

    var Complete = {
      total: dataComplete.length,
    };

    dataComplete = _.groupBy(dataComplete, function (d) {
      return d.Tier;
    });
    dataComplete = _.mapKeys(dataComplete, function (val, key) {
      return 'Tier ' + key;
    });

    if (!_.has(dataComplete, 'Tier 1')) {
      dataComplete['Tier 1'] = [];
    }
    if (!_.has(dataComplete, 'Tier 2')) {
      dataComplete['Tier 2'] = [];
    }
    if (!_.has(dataComplete, 'Tier 3')) {
      dataComplete['Tier 3'] = [];
    }
    if (!_.has(dataComplete, 'Tier 4')) {
      dataComplete['Tier 4'] = [];
    }

    dataComplete = _.mapValues(dataComplete, function (val, index, array) {
      return {
        total: val.length,
        items: _.orderBy(
          _.unionWith(
            _.map(
              _.mapValues(
                _.groupBy(val, function (d) {
                  return d.LOBName.Title;
                }),
                'length'
              ),
              function (val, index, array) {
                return { name: index, data: val };
              }
            ),
            LOBs,
            function (n1, n2) {
              return n1.name === n2.name;
            }
          ),
          ['name'],
          ['asc']
        ),
      };
    });

    Complete.Data = dataComplete;

    return {
      Active: Active,
      Complete: Complete,
      Total: Total,
    };
  }

  return {
    initialize: function () {
      // START -- CODE FOR TABS
      var TabBlock = {
        s: {
          animLen: 200,
        },

        init: function () {
          TabBlock.bindUIActions();
          TabBlock.hideInactive();
        },

        bindUIActions: function () {
          $('.tabBlock-tabs').on('click', '.tabBlock-tab', function () {
            TabBlock.switchTab($(this));
          });
        },

        hideInactive: function () {
          var $tabBlocks = $('.tabBlock');

          $tabBlocks.each(function (i) {
            var $tabBlock = $($tabBlocks[i]),
              $panes = $tabBlock.find('.tabBlock-pane'),
              $activeTab = $tabBlock.find('.tabBlock-tab.is-active');

            $panes.hide();
            $($panes[$activeTab.index()]).show();
          });
        },

        switchTab: function ($tab) {
          var $context = $tab.closest('.tabBlock');

          if (!$tab.hasClass('is-active')) {
            $tab.siblings().removeClass('is-active');
            $tab.addClass('is-active');
            TabBlock.showPane($tab.index(), $context);
          }
        },

        showPane: function (i, $context) {
          //Changed this line to only search in the top tadblocks tab panes,
          var $panes = $context
            .children('.tabBlock-content')
            .children('.tabBlock-pane');

          // Normally I'd frown at using jQuery over CSS animations, but we can't transition between unspecified variable heights, right? If you know a better way, I'd love a read it in the comments or on Twitter @johndjameson
          $panes.slideUp(TabBlock.s.animLen);

          $($panes[i]).slideDown(TabBlock.s.animLen, function () {
            //console.log($(this).has("#modifyTable_id").length);
            if ($(this).has('#modifyTable_id').length === 1) {
              view.modifyTableAutoAdjust();
            }

            if ($(this).has('#assessorTable_id').length === 1) {
              view.assessorTableAutoAdjust();
            }
          });

          //adding code for appending a function to run after a tab is displayed
          //this will be used to help Jquery Datatables issue needing to run column adjust
          // right after its parent tab is being displayed
        },
      };
      // END -- CODE FOR TABS

      //Intialize Tab functionality
      TabBlock.init();

      //intialize tables as Jquery tables, provided a calback function
      view.initialzie(
        function () {
          model.getModifyTableData(state.usingSP, function (rawData) {
            view.renderModifyTableData(rawData);
          });
        },
        function () {
          model.getAssessorTableData(
            state.usingSP,
            state.currentUser,
            function (rawData) {
              view.renderAssessorTableData(rawData);
            }
          );
        }
      );

      //Jaquery UI Date Picker
      $('#K_dateStarted').datepicker();

      //Semantic UI Accordion
      $('.ui.accordion').accordion();

      TSR_Model.getAllDepartments(state.usingSP, function (data) {
        data
          .reduce(function (accu, current, index, arr) {
            if (current.ReOrgOut === false) {
              accu.push(current.Title);
            }
            return accu;
          }, [])
          .forEach(function (item) {
            $('#K_LOB').append('<option>' + item + '</option>');
          });
      });

      TSR_Model.getAllUsers(state.usingSP, function (data) {
        data
          .reduce(function (accu, current, index, arr) {
            if (current.Active === 'Yes') {
              if (current.Assessment !== 'N/A') accu.push(current.Assessment);
            }
            return accu;
          }, [])
          .forEach(function (item) {
            $('#K_assessor').append(
              '<option>' + item.toUpperCase() + '</option>'
            );
          });
      });
    },
    setButtons: function () {
      buttons.forEach(function (ele) {
        if (ele.active) {
          $('#' + ele.btnID).click(function () {
            if (!(state.modifyTable.currentAssessment === null)) {
              var tempVal = $('#' + ele.eleID).val();

              if (ele.colName === 'DateIQUploaded') {
                tempVal = new Date(tempVal);
                tempVal = tempVal.toISOString();

                model.postSingleAssessment(
                  state.usingSP,
                  state.modifyTable.currentAssessment,
                  ele.colName,
                  tempVal,
                  function (data) {
                    model.getSingleModifyAssessment(
                      state.usingSP,
                      state.modifyTable.currentAssessment,
                      function (data) {
                        //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                        state.modifyTable.currentRow.data(
                          view.returnFormatTableRow('modify', data)
                        );

                        $.toast({
                          heading: 'Update Successful',
                          showHideTransition: 'plain',
                          icon: 'success',
                          position: 'bottom-right',
                        });
                      }
                    );
                  }
                );
              } else if (ele.colName === 'TSr_x0020_Status') {
                if (
                  tempVal ===
                  'LOB to ensure vendor mitigates deficient controls.'
                ) {
                  model.getAssessmentInformation(
                    state.usingSP,
                    'ID',
                    state.modifyTable.currentAssessment,
                    'tblAssessments',
                    function (data) {
                      var myNewData = {};
                      if (data.LOBNameId === 7) {
                        myNewData.ControlAssessor = 'DLKT';
                      } else {
                        myNewData.ControlAssessor = 'M2O1';
                      }

                      var newDate = new Date();

                      myNewData.TSr_x0020_Status = 'Review Complete';
                      myNewData.Remediation_Needed = 'Yes';
                      myNewData.Remediation_Status = 'Remediation in progress';
                      myNewData.DateComplete = newDate.toISOString();
                      myNewData.Remediation_Date_Start = newDate.toISOString();

                      model.mergeAssessmentInformation(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        myNewData,
                        'tblAssessments',
                        function () {
                          model.getSingleModifyAssessment(
                            state.usingSP,
                            state.modifyTable.currentAssessment,
                            function (data) {
                              //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                              state.modifyTable.currentRow.data(
                                view.returnFormatTableRow('modify', data)
                              );

                              $.toast({
                                heading: 'Update Successful',
                                showHideTransition: 'plain',
                                icon: 'success',
                                position: 'bottom-right',
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                } else if (tempVal === 'Review Complete') {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.TSr_x0020_Status = 'Review Complete';
                  myNewData.Remediation_Needed = 'No';
                  myNewData.DateComplete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.modifyTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        function (data) {
                          //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                          state.modifyTable.currentRow.data(
                            view.returnFormatTableRow('modify', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else if (tempVal === 'No TSR Required') {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.TSr_x0020_Status = 'No TSR Required';
                  myNewData.Remediation_Needed = 'No';
                  myNewData.DateComplete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.modifyTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        function (data) {
                          //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                          state.modifyTable.currentRow.data(
                            view.returnFormatTableRow('modify', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else if (tempVal === 'Review Cancelled') {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.TSr_x0020_Status = 'Review Cancelled';
                  myNewData.Remediation_Needed = 'No';
                  myNewData.DateComplete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.modifyTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        function (data) {
                          //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                          state.modifyTable.currentRow.data(
                            view.returnFormatTableRow('modify', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else {
                  model.postSingleAssessment(
                    state.usingSP,
                    state.modifyTable.currentAssessment,
                    ele.colName,
                    tempVal,
                    function (data) {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        function (data) {
                          //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                          state.modifyTable.currentRow.data(
                            view.returnFormatTableRow('modify', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                }
              } else if (ele.colName === 'Remediation_Status') {
                if (
                  tempVal === 'Remediation Complete' ||
                  tempVal === 'Remediation Cancelled'
                ) {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.Remediation_Status = tempVal;
                  myNewData.Remediation_Date_Complete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.modifyTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        function (data) {
                          //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                          state.modifyTable.currentRow.data(
                            view.returnFormatTableRow('modify', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else {
                  model.postSingleAssessment(
                    state.usingSP,
                    state.modifyTable.currentAssessment,
                    ele.colName,
                    tempVal,
                    function (data) {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.modifyTable.currentAssessment,
                        function (data) {
                          //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                          state.modifyTable.currentRow.data(
                            view.returnFormatTableRow('modify', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                }
              } else if (ele.colName === 'LOB') {
                var encodedVal = encodeURI(tempVal);
                encodedVal = encodedVal.replace('&', '%26');
                encodedVal = encodedVal.replace("'", '%27%27');

                model.getAssessmentInformation(
                  state.usingSP,
                  'Title',
                  "'" + encodedVal + "'",
                  'tblLOB',
                  function (data) {
                    var myNewData = {};
                    myNewData.LOBName = data.ID;
                    myNewData.LOBNameId = data.ID;
                    myNewData.LOB_x0020_ID = data.ID;
                    myNewData.LOB = tempVal;

                    model.mergeAssessmentInformation(
                      state.usingSP,
                      state.modifyTable.currentAssessment,
                      myNewData,
                      'tblAssessments',
                      function () {
                        model.getSingleModifyAssessment(
                          state.usingSP,
                          state.modifyTable.currentAssessment,
                          function (data) {
                            //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                            state.modifyTable.currentRow.data(
                              view.returnFormatTableRow('modify', data)
                            );

                            $.toast({
                              heading: 'Update Successful',
                              showHideTransition: 'plain',
                              icon: 'success',
                              position: 'bottom-right',
                            });
                          }
                        );
                      }
                    );
                  }
                );
              } else if (ele.colName === 'Tier') {
                model.getAssessmentInformation(
                  state.usingSP,
                  'Assessment',
                  state.modifyTable.currentAssessment,
                  'tblIQInformation',
                  function (data) {
                    var myNewData = {};
                    myNewData.Assessment_x0020_Type = tempVal;

                    model.mergeAssessmentInformation(
                      state.usingSP,
                      data.Id,
                      myNewData,
                      'tblIQInformation',
                      function () {
                        model.postSingleAssessment(
                          state.usingSP,
                          state.modifyTable.currentAssessment,
                          ele.colName,
                          tempVal,
                          function (data) {
                            model.getSingleModifyAssessment(
                              state.usingSP,
                              state.modifyTable.currentAssessment,
                              function (data) {
                                //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                                state.modifyTable.currentRow.data(
                                  view.returnFormatTableRow('modify', data)
                                );

                                $.toast({
                                  heading: 'Update Successful',
                                  showHideTransition: 'plain',
                                  icon: 'success',
                                  position: 'bottom-right',
                                });
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              } else if (ele.colName === 'DataClassification') {
                model.getAssessmentInformation(
                  state.usingSP,
                  'Assessment',
                  state.modifyTable.currentAssessment,
                  'tblIQInformation',
                  function (data) {
                    var myNewData = {};
                    myNewData.Information_x0020_Classification = tempVal;

                    model.mergeAssessmentInformation(
                      state.usingSP,
                      data.Id,
                      myNewData,
                      'tblIQInformation',
                      function () {
                        model.postSingleAssessment(
                          state.usingSP,
                          state.modifyTable.currentAssessment,
                          ele.colName,
                          tempVal,
                          function (data) {
                            model.getSingleModifyAssessment(
                              state.usingSP,
                              state.modifyTable.currentAssessment,
                              function (data) {
                                //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                                state.modifyTable.currentRow.data(
                                  view.returnFormatTableRow('modify', data)
                                );

                                $.toast({
                                  heading: 'Update Successful',
                                  showHideTransition: 'plain',
                                  icon: 'success',
                                  position: 'bottom-right',
                                });
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              } else {
                model.postSingleAssessment(
                  state.usingSP,
                  state.modifyTable.currentAssessment,
                  ele.colName,
                  tempVal,
                  function (data) {
                    model.getSingleModifyAssessment(
                      state.usingSP,
                      state.modifyTable.currentAssessment,
                      function (data) {
                        //state.modifyTable.currentRow.data(view.returnFormatTableRow("modify", data)).draw();
                        state.modifyTable.currentRow.data(
                          view.returnFormatTableRow('modify', data)
                        );

                        $.toast({
                          heading: 'Update Successful',
                          showHideTransition: 'plain',
                          icon: 'success',
                          position: 'bottom-right',
                        });
                      }
                    );
                  }
                );
              }
            } else {
              $.toast({
                heading: 'Warning',
                text: 'Please click an assessment',
                showHideTransition: 'plain',
                icon: 'warning',
                position: 'bottom-right',
              });
            }
          });
        }
      });

      assessorFormButtons.forEach(function (ele) {
        if (ele.active) {
          $('#' + ele.btnID).click(function () {
            if (!(state.assessorTable.currentAssessment === null)) {
              var tempVal = $('#' + ele.eleID).val();

              if (ele.colName === 'TSr_x0020_Status') {
                if (
                  tempVal ===
                  'LOB to ensure vendor mitigates deficient controls.'
                ) {
                  model.getAssessmentInformation(
                    state.usingSP,
                    'ID',
                    state.assessorTable.currentAssessment,
                    'tblAssessments',
                    function (data) {
                      var myNewData = {};
                      if (data.LOBNameId === 7) {
                        myNewData.ControlAssessor = 'DLKT';
                      } else {
                        myNewData.ControlAssessor = 'M2O1';
                      }

                      var newDate = new Date();

                      myNewData.TSr_x0020_Status = 'Review Complete';
                      myNewData.Remediation_Needed = 'Yes';
                      myNewData.Remediation_Status = 'Remediation in progress';
                      myNewData.DateComplete = newDate.toISOString();
                      myNewData.Remediation_Date_Start = newDate.toISOString();

                      model.mergeAssessmentInformation(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        myNewData,
                        'tblAssessments',
                        function () {
                          model.getSingleModifyAssessment(
                            state.usingSP,
                            state.assessorTable.currentAssessment,
                            function (data) {
                              //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                              state.assessorTable.currentRow.data(
                                view.returnFormatTableRow('assessor', data)
                              );

                              $.toast({
                                heading: 'Update Successful',
                                showHideTransition: 'plain',
                                icon: 'success',
                                position: 'bottom-right',
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                } else if (tempVal === 'Review Complete') {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.TSr_x0020_Status = 'Review Complete';
                  myNewData.Remediation_Needed = 'No';
                  myNewData.DateComplete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.assessorTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        function (data) {
                          //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                          state.assessorTable.currentRow.data(
                            view.returnFormatTableRow('assessor', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else if (tempVal === 'No TSR Required') {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.TSr_x0020_Status = 'No TSR Required';
                  myNewData.Remediation_Needed = 'No';
                  myNewData.DateComplete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.assessorTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        function (data) {
                          //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                          state.assessorTable.currentRow.data(
                            view.returnFormatTableRow('assessor', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else if (tempVal === 'Review Cancelled') {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.TSr_x0020_Status = 'Review Cancelled';
                  myNewData.Remediation_Needed = 'No';
                  myNewData.DateComplete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.assessorTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        function (data) {
                          //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                          state.assessorTable.currentRow.data(
                            view.returnFormatTableRow('assessor', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else {
                  model.postSingleAssessment(
                    state.usingSP,
                    state.assessorTable.currentAssessment,
                    ele.colName,
                    tempVal,
                    function (data) {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        function (data) {
                          //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                          state.assessorTable.currentRow.data(
                            view.returnFormatTableRow('assessor', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                }
              } else if (ele.colName === 'Remediation_Status') {
                if (
                  tempVal === 'Remediation Complete' ||
                  tempVal === 'Remediation Cancelled'
                ) {
                  var myNewData = {};

                  var newDate = new Date();

                  myNewData.Remediation_Status = tempVal;
                  myNewData.Remediation_Date_Complete = newDate.toISOString();

                  model.mergeAssessmentInformation(
                    state.usingSP,
                    state.assessorTable.currentAssessment,
                    myNewData,
                    'tblAssessments',
                    function () {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        function (data) {
                          //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                          state.assessorTable.currentRow.data(
                            view.returnFormatTableRow('assessor', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                } else {
                  model.postSingleAssessment(
                    state.usingSP,
                    state.assessorTable.currentAssessment,
                    ele.colName,
                    tempVal,
                    function (data) {
                      model.getSingleModifyAssessment(
                        state.usingSP,
                        state.assessorTable.currentAssessment,
                        function (data) {
                          //state.assessorTable.currentRow.data(view.returnFormatTableRow("assessor", data)).draw();
                          state.assessorTable.currentRow.data(
                            view.returnFormatTableRow('assessor', data)
                          );

                          $.toast({
                            heading: 'Update Successful',
                            showHideTransition: 'plain',
                            icon: 'success',
                            position: 'bottom-right',
                          });
                        }
                      );
                    }
                  );
                }
              } else {
                model.postSingleAssessment(
                  state.usingSP,
                  state.assessorTable.currentAssessment,
                  ele.colName,
                  tempVal,
                  function (data) {
                    model.getSingleModifyAssessment(
                      state.usingSP,
                      state.assessorTable.currentAssessment,
                      function (data) {
                        state.assessorTable.currentRow.data(
                          view.returnFormatTableRow('assessor', data)
                        );

                        $.toast({
                          heading: 'Update Successful',
                          showHideTransition: 'plain',
                          icon: 'success',
                          position: 'bottom-right',
                        });
                      }
                    );
                  }
                );
              }
            } else {
              $.toast({
                heading: 'Warning',
                text: 'Please click an assessment',
                showHideTransition: 'plain',
                icon: 'warning',
                position: 'bottom-right',
              });
            }
          });
        }
      });
    },
    setTables: function () {
      //set click/selection and functionality of modify table
      $('#modifyTable_id tbody').on('click', 'tr', function () {
        //console.log("you clicked on a row");
        if ($(this).hasClass('row__selected')) {
          //$(this).removeClass("row__selected");
        } else {
          view
            .modifyTableReference()
            .$('tr.row__selected')
            .removeClass('row__selected');
          $(this).addClass('row__selected');
        }

        //record current assessment ID in APP controller state
        state.modifyTable.currentAssessment = view
          .modifyTableReference()
          .row(this)
          .data().ID;

        state.modifyTable.currentRow = view.modifyTableReference().row(this);

        // render elements in form fields on click
        model.getSingleModifyAssessment(
          state.usingSP,
          state.modifyTable.currentAssessment,
          function (rawData) {
            view.renderModifyElements(rawData);
          }
        );
      });

      //set click/selection and functionality of modify table
      $('#assessorTable_id tbody').on('click', 'tr', function () {
        //console.log("you clicked on a row");
        if ($(this).hasClass('row__selected')) {
          //$(this).removeClass("row__selected");
        } else {
          view
            .assessorTableReference()
            .$('tr.row__selected')
            .removeClass('row__selected');
          $(this).addClass('row__selected');
        }

        //record current assessment ID in APP controller state
        state.assessorTable.currentAssessment = view
          .assessorTableReference()
          .row(this)
          .data().ID;

        state.assessorTable.currentRow = view
          .assessorTableReference()
          .row(this);

        // render elements in form fields on click

        model.getSingleModifyAssessment(
          state.usingSP,
          state.assessorTable.currentAssessment,
          function (rawData) {
            view.renderAssessorElements(rawData);
          }
        );
      });
    },
    loadAllTableData: function () {
      //load all tabledata to modify table table
      model.getModifyTableData(state.usingSP, function (rawData) {
        view.renderModifyTableData(rawData);
      });

      model.getCurrentUser(state.usingSP, function (user) {
        state.currentUser = user;
        model.getAssessorTableData(state.usingSP, state.currentUser, function (
          rawData
        ) {
          view.renderAssessorTableData(rawData);
        });
      });
    },
    setCurrentAssessment: function (id) {
      state.currentAssessment = id;
    },
    getCurrentAssessment: function () {
      return state.currentAssessment;
    },
    setReport: function () {
      TSR_Model.getReportData(state.usingSP, function (data) {
        var currentYear = 2019; //new Date();
        // currentYear = currentYear.getFullYear();
        var colorPicker = {
          'Customer Care & CRE': '#e6194B',
          'Information Technology & Supply Chain': '#3cb44b',
          'Human Resources': '#ffe119',
          'Gas Operations': '#4363d8',
          'Electric Operations': '#f58231',
          'Corporate Services': '#fabebe',
          'Finance & Risk': '#911eb4',
          'Safety Health and Enterprise': '#42d4f4',
          Generation: '#f032e6',
          'Pres/ CEO /COO': '#bfef45',
          'Ethics & Compliance': '#469990',
          'General Counsel/Law': '#e6beff',
          'Strategy & Policy': '#800000',
          'Department 1': '#e6194B',
          'Department 2': '#3cb44b',
          'Department 3': '#ffe119',
          'Department 4': '#4363d8',
          'Department 5': '#fabebe',
        };

        var tierColorPicker = {
          'Tier 1': {
            backgroundColor: '#EBCCD1',
            borderColor: 'RGB(156, 0, 6)',
          },
          'Tier 2': {
            backgroundColor: '#ffe0cc',
            borderColor: '#ff6600',
          },
          'Tier 3': {
            backgroundColor: '#FAEBCC',
            borderColor: 'RGB(156, 101, 0)',
          },
          'Tier 4': {
            backgroundColor: '#D6E9C6',
            borderColor: 'RGB(0, 97, 0)',
          },
        };

        // CURRENT YEAR STEVE REPORT

        //  ******** RENDER Current Year MONTHLY AGGREGATE (STEVE Reports) ***********

        var theHelp = Chart.helpers;

        var monthlyReport = formatMonthlyReport(data);
        var FullData = formatMonthlyReport2(data);

        // console.log(FullData);

        $('#' + 'Total_Active').text(monthlyReport.active);
        $('#' + 'Total_Complete').text(monthlyReport.complete);
        $('#' + 'Total_Review').text(monthlyReport.review);
        $('#' + 'Total_Remediation').text(monthlyReport.remediation);

        var myChart = new Chart(
          document.getElementById('AggregateByTier').getContext('2d'),
          {
            type: 'bar',
            data: {
              labels: monthlyReport.completeByTier.map(function (e) {
                return e.name;
              }),
              datasets: [
                {
                  label: 'Complete',
                  backgroundColor: '#3e95cd',
                  data: monthlyReport.completeByTier.map(function (e) {
                    return e.data;
                  }),
                },
                {
                  label: 'Ongoing',
                  backgroundColor: '#D6E9C6', //"#8e5ea2",
                  borderColor: 'RGB(0, 97, 0)',
                  data: monthlyReport.activeByTier.map(function (e) {
                    return e.data;
                  }),
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "TSR's by Tier",
                fontSize: 30,
                padding: 20,
              },
              tooltips: {
                titleFontSize: 18,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#AggregateByTier')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        //console.log(_.orderBy(FullData.Total.Data["Tier 1"].items, ['data'], ['desc']))

        var HighRiskChart = new Chart(
          document.getElementById('HighRiskByLOBPieChart').getContext('2d'),
          {
            type: 'pie',
            data: {
              labels: _.orderBy(
                FullData.Total.Data['Tier 1'].items,
                ['data'],
                ['desc']
              ).map(function (val) {
                return val.name;
              }),
              datasets: [
                {
                  backgroundColor: [
                    '#e6194B',
                    '#3cb44b',
                    '#ffe119',
                    '#4363d8',
                    '#f58231',
                    '#911eb4',
                    '#42d4f4',
                    '#f032e6',
                    '#bfef45',
                    '#fabebe',
                    '#469990',
                    '#e6beff',
                    '800000',
                  ],
                  data: _.orderBy(
                    FullData.Total.Data['Tier 1'].items,
                    ['data'],
                    ['desc']
                  ).map(function (val) {
                    return val.data;
                  }),
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "All High Risk (Tier 1) TSR's by LOB",
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                  usePointStyle: true,
                  generateLabels: function (chart) {
                    var data = chart.data;
                    function getSum(total, num) {
                      return total + num;
                    }
                    if (data.labels.length && data.datasets.length) {
                      return data.labels.map(function (label, i) {
                        var meta = chart.getDatasetMeta(0);
                        var ds = data.datasets[0];
                        var arc = meta.data[i];
                        var custom = (arc && arc.custom) || {};
                        var getValueAtIndexOrDefault =
                          theHelp.getValueAtIndexOrDefault;
                        var arcOpts = chart.options.elements.arc;
                        var fill = custom.backgroundColor
                          ? custom.backgroundColor
                          : getValueAtIndexOrDefault(
                              ds.backgroundColor,
                              i,
                              arcOpts.backgroundColor
                            );
                        var stroke = custom.borderColor
                          ? custom.borderColor
                          : getValueAtIndexOrDefault(
                              ds.borderColor,
                              i,
                              arcOpts.borderColor
                            );
                        var bw = custom.borderWidth
                          ? custom.borderWidth
                          : getValueAtIndexOrDefault(
                              ds.borderWidth,
                              i,
                              arcOpts.borderWidth
                            );
                        return {
                          // And finally :
                          text:
                            (
                              (ds.data[i] / ds.data.reduce(getSum)) *
                              100
                            ).toFixed(2) +
                            ' % : ' +
                            label,
                          fillStyle: fill,
                          strokeStyle: stroke,
                          lineWidth: bw,
                          hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                          index: i,
                        };
                      });
                    }
                    return [];
                  },
                },
              },
              tooltips: {
                titleFontSize: 30,
                bodyFontSize: 20,
                xPadding: 10,
                yPadding: 10,
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#HighRiskByLOBPieChart')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        //console.log(monthlyReport)
        //console.log(FullData)
        //console.log(FullData.Active.Data["Tier 1"].items.map(function (val) { return val.name }))

        var ActiveChart = new Chart(
          document.getElementById('ActiveTSRByLOB').getContext('2d'),
          {
            type: 'bar',
            data: {
              labels: FullData.Active.Data['Tier 1'].items.map(function (val) {
                return val.name;
              }),
              datasets: _.map(FullData.Active.Data, function (
                item,
                index,
                arr
              ) {
                return {
                  label: [index],
                  data: item.items.map(function (val) {
                    return val.data;
                  }),
                  backgroundColor: tierColorPicker[index].backgroundColor,
                  borderColor: tierColorPicker[index].borderColor,
                  borderWidth: 1.5,
                };
              }).reverse(),
            },
            options: {
              aspectRatio: 1.5,
              title: {
                display: true,
                text: "Ongoing TSR's by LOB",
                fontSize: 30,
                padding: 20,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
                reverse: true,
              },
              tooltips: {
                titleFontSize: 18,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    stacked: true,
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#ActiveTSRByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        //console.log(FullData.Active.Data["Tier 1"].items.map(function (val) { return val.name }))

        var completeChart = new Chart(
          document.getElementById('CompleteTSRByLOB').getContext('2d'),
          {
            type: 'bar',
            data: {
              labels: FullData.Complete.Data['Tier 1'].items.map(function (
                val
              ) {
                return val.name;
              }),
              datasets: _.map(FullData.Complete.Data, function (
                item,
                index,
                arr
              ) {
                return {
                  label: [index],
                  data: item.items.map(function (val) {
                    return val.data;
                  }),
                  backgroundColor: tierColorPicker[index].backgroundColor,
                  borderColor: tierColorPicker[index].borderColor,
                  borderWidth: 1.5,
                };
              }).reverse(),
            },
            options: {
              aspectRatio: 1.5,
              title: {
                display: true,
                text: "Complete TSR's by LOB",
                fontSize: 30,
                padding: 20,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
                reverse: true,
              },
              tooltips: {
                titleFontSize: 18,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    stacked: true,
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#CompleteTSRByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        // ********************************************************************

        var current = formatSubmissionData(data, currentYear);
        var current2 = formatSubmissionData2(data, currentYear);

        // RENDER CURRENT YEAR

        TSR_View.renderAllKPIs(current.total, current.byMonth, 1, currentYear);

        //console.log(_.orderBy(current2.byLOB, ['data'], ['desc']).map(function (val) { return val.name }))

        var newChart1 = new Chart(
          document.getElementById('2019LineChartAllRequests').getContext('2d'),
          {
            type: 'line',
            data: {
              // Labels should be Date objects
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  fill: false,
                  label: 'TSR Requests',
                  data: current2.byMonth,
                  borderColor: '#e6194B',
                  backgroundColor: '#e6194B',
                  lineTension: 0,
                },
              ],
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: currentYear + ' TSR Requests by Month',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              tooltips: {
                titleFontSize: 22,
                bodyFontSize: 18,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 24,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'TSR Requests',
                      fontSize: 24,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2019LineChartAllRequests')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart2 = new Chart(
          document
            .getElementById('2019LineChartRequestsByLOB')
            .getContext('2d'),
          {
            type: 'line',
            data: {
              // Labels should be Date objects
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: _.orderBy(current2.byLOB, ['data'], ['desc'])
                .map(function (val) {
                  return val.name;
                })
                .map(function (item) {
                  return {
                    fill: false,
                    label:
                      item === 'Information Technology & Supply Chain'
                        ? 'IT & Supply Chain'
                        : item,
                    data: current2.byLOBTime[item],
                    borderColor: colorPicker[item],
                    backgroundColor: colorPicker[item],
                    lineTension: 0,
                  };
                }),
            },
            options: {
              aspectRatio: 1.5,
              responsive: true,
              title: {
                display: true,
                text: currentYear + ' TSR Requests by LOB',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              tooltips: {
                titleFontSize: 22,
                bodyFontSize: 18,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 24,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'TSR Requests',
                      fontSize: 24,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2019LineChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart3 = new Chart(
          document.getElementById('2019PieChartRequestsByLOB').getContext('2d'),
          {
            type: 'pie',
            data: {
              labels: _.orderBy(current2.byLOB, ['data'], ['desc']).map(
                function (val) {
                  return val.name === 'Information Technology & Supply Chain'
                    ? 'IT & Supply Chain'
                    : val.name;
                }
              ),
              datasets: [
                {
                  backgroundColor: _.orderBy(
                    current2.byLOB,
                    ['data'],
                    ['desc']
                  ).map(function (val) {
                    return colorPicker[val.name];
                  }),
                  data: _.orderBy(current2.byLOB, ['data'], ['desc']).map(
                    function (val) {
                      return val.data;
                    }
                  ),
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: currentYear + ' TSR Requests by LOB',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                  usePointStyle: true,
                  generateLabels: function (chart) {
                    var data = chart.data;
                    function getSum(total, num) {
                      return total + num;
                    }
                    if (data.labels.length && data.datasets.length) {
                      return data.labels.map(function (label, i) {
                        var meta = chart.getDatasetMeta(0);
                        var ds = data.datasets[0];
                        var arc = meta.data[i];
                        var custom = (arc && arc.custom) || {};
                        var getValueAtIndexOrDefault =
                          theHelp.getValueAtIndexOrDefault;
                        var arcOpts = chart.options.elements.arc;
                        var fill = custom.backgroundColor
                          ? custom.backgroundColor
                          : getValueAtIndexOrDefault(
                              ds.backgroundColor,
                              i,
                              arcOpts.backgroundColor
                            );
                        var stroke = custom.borderColor
                          ? custom.borderColor
                          : getValueAtIndexOrDefault(
                              ds.borderColor,
                              i,
                              arcOpts.borderColor
                            );
                        var bw = custom.borderWidth
                          ? custom.borderWidth
                          : getValueAtIndexOrDefault(
                              ds.borderWidth,
                              i,
                              arcOpts.borderWidth
                            );
                        return {
                          // And finally :
                          text:
                            (
                              (ds.data[i] / ds.data.reduce(getSum)) *
                              100
                            ).toFixed(2) +
                            ' % : ' +
                            label,
                          fillStyle: fill,
                          strokeStyle: stroke,
                          lineWidth: bw,
                          hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                          index: i,
                        };
                      });
                    }
                    return [];
                  },
                },
              },
              tooltips: {
                titleFontSize: 30,
                bodyFontSize: 20,
                xPadding: 10,
                yPadding: 10,
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2019PieChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart4 = new Chart(
          document.getElementById('2019BarChartRequestsByLOB').getContext('2d'),
          {
            type: 'bar',
            data: {
              labels: current2.byTier['Tier 1'].items.map(function (val) {
                return val.name;
              }),
              datasets: _.map(current2.byTier, function (item, index, arr) {
                return {
                  label: [index],
                  data: item.items.map(function (val) {
                    return val.data;
                  }),
                  backgroundColor: tierColorPicker[index].backgroundColor,
                  borderColor: tierColorPicker[index].borderColor,
                  borderWidth: 1.5,
                };
              }).reverse(),
            },
            options: {
              aspectRatio: 1.5,
              title: {
                display: true,
                text: currentYear + ' TSR Requests by Tier',
                fontSize: 30,
                padding: 20,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
                reverse: true,
              },
              tooltips: {
                titleFontSize: 18,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    stacked: true,
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2019BarChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var previous = formatSubmissionData(data, currentYear - 1);
        var previous2 = formatSubmissionData2(data, currentYear - 1);

        // RENDER PREVIOUS YEAR

        TSR_View.renderAllKPIs(
          previous.total,
          previous.byMonth,
          2,
          currentYear - 1
        );

        var newChart5 = new Chart(
          document.getElementById('2018LineChartAllRequests').getContext('2d'),
          {
            type: 'line',
            data: {
              // Labels should be Date objects
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  fill: false,
                  label: 'TSR Requests',
                  data: previous2.byMonth,
                  borderColor: '#e6194B',
                  backgroundColor: '#e6194B',
                  lineTension: 0,
                },
              ],
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: currentYear - 1 + ' TSR Requests',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              tooltips: {
                titleFontSize: 22,
                bodyFontSize: 18,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 24,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'TSR Requests',
                      fontSize: 24,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2018LineChartAllRequests')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart6 = new Chart(
          document
            .getElementById('2018LineChartRequestsByLOB')
            .getContext('2d'),
          {
            type: 'line',
            data: {
              // Labels should be Date objects
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: _.orderBy(previous2.byLOB, ['data'], ['desc'])
                .map(function (val) {
                  return val.name;
                })
                .map(function (item) {
                  return {
                    fill: false,
                    label:
                      item === 'Information Technology & Supply Chain'
                        ? 'IT & Supply Chain'
                        : item,
                    data: previous2.byLOBTime[item],
                    borderColor: colorPicker[item],
                    backgroundColor: colorPicker[item],
                    lineTension: 0,
                  };
                }),
            },
            options: {
              aspectRatio: 1.5,
              responsive: true,
              title: {
                display: true,
                text: currentYear - 1 + ' TSR Requests by LOB',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              tooltips: {
                titleFontSize: 22,
                bodyFontSize: 18,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 24,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'TSR Requests',
                      fontSize: 24,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2018LineChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart7 = new Chart(
          document.getElementById('2018PieChartRequestsByLOB').getContext('2d'),
          {
            type: 'pie',
            data: {
              labels: _.orderBy(previous2.byLOB, ['data'], ['desc']).map(
                function (val) {
                  return val.name === 'Information Technology & Supply Chain'
                    ? 'IT & Supply Chain'
                    : val.name;
                }
              ),
              datasets: [
                {
                  backgroundColor: _.orderBy(
                    previous2.byLOB,
                    ['data'],
                    ['desc']
                  ).map(function (val) {
                    return colorPicker[val.name];
                  }),
                  data: _.orderBy(previous2.byLOB, ['data'], ['desc']).map(
                    function (val) {
                      return val.data;
                    }
                  ),
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: currentYear - 1 + ' TSR Requests by LOB',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                  usePointStyle: true,
                  generateLabels: function (chart) {
                    var data = chart.data;
                    function getSum(total, num) {
                      return total + num;
                    }
                    if (data.labels.length && data.datasets.length) {
                      return data.labels.map(function (label, i) {
                        var meta = chart.getDatasetMeta(0);
                        var ds = data.datasets[0];
                        var arc = meta.data[i];
                        var custom = (arc && arc.custom) || {};
                        var getValueAtIndexOrDefault =
                          theHelp.getValueAtIndexOrDefault;
                        var arcOpts = chart.options.elements.arc;
                        var fill = custom.backgroundColor
                          ? custom.backgroundColor
                          : getValueAtIndexOrDefault(
                              ds.backgroundColor,
                              i,
                              arcOpts.backgroundColor
                            );
                        var stroke = custom.borderColor
                          ? custom.borderColor
                          : getValueAtIndexOrDefault(
                              ds.borderColor,
                              i,
                              arcOpts.borderColor
                            );
                        var bw = custom.borderWidth
                          ? custom.borderWidth
                          : getValueAtIndexOrDefault(
                              ds.borderWidth,
                              i,
                              arcOpts.borderWidth
                            );
                        return {
                          // And finally :
                          text:
                            (
                              (ds.data[i] / ds.data.reduce(getSum)) *
                              100
                            ).toFixed(2) +
                            ' % : ' +
                            label,
                          fillStyle: fill,
                          strokeStyle: stroke,
                          lineWidth: bw,
                          hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                          index: i,
                        };
                      });
                    }
                    return [];
                  },
                },
              },
              tooltips: {
                titleFontSize: 30,
                bodyFontSize: 20,
                xPadding: 10,
                yPadding: 10,
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2018PieChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart8 = new Chart(
          document.getElementById('2018BarChartRequestsByLOB').getContext('2d'),
          {
            type: 'bar',
            data: {
              labels: previous2.byTier['Tier 1'].items.map(function (val) {
                return val.name;
              }),
              datasets: _.map(previous2.byTier, function (item, index, arr) {
                return {
                  label: [index],
                  data: item.items.map(function (val) {
                    return val.data;
                  }),
                  backgroundColor: tierColorPicker[index].backgroundColor,
                  borderColor: tierColorPicker[index].borderColor,
                  borderWidth: 1.5,
                };
              }).reverse(),
            },
            options: {
              aspectRatio: 1.5,
              title: {
                display: true,
                text: currentYear - 1 + ' TSR Requests by Tier',
                fontSize: 30,
                padding: 20,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
                reverse: true,
              },
              tooltips: {
                titleFontSize: 18,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    stacked: true,
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2018BarChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        // RENDER 2 YEARS BEFORE CURRENT

        var last = formatSubmissionData(data, currentYear - 2);
        var last2 = formatSubmissionData2(data, currentYear - 2);

        TSR_View.renderAllKPIs(last.total, last.byMonth, 3, currentYear - 2);

        //console.log(last2)
        //console.log(last2.byTier)

        var newChart9 = new Chart(
          document.getElementById('2017LineChartAllRequests').getContext('2d'),
          {
            type: 'line',
            data: {
              // Labels should be Date objects
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  fill: false,
                  label: 'TSR Requests',
                  data: last2.byMonth,
                  borderColor: '#e6194B',
                  backgroundColor: '#e6194B',
                  lineTension: 0,
                },
              ],
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: currentYear - 2 + ' TSR Requests',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              tooltips: {
                titleFontSize: 22,
                bodyFontSize: 18,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 24,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'TSR Requests',
                      fontSize: 24,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2017LineChartAllRequests')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart10 = new Chart(
          document
            .getElementById('2017LineChartRequestsByLOB')
            .getContext('2d'),
          {
            type: 'line',
            data: {
              // Labels should be Date objects
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: _.orderBy(last2.byLOB, ['data'], ['desc'])
                .map(function (val) {
                  return val.name;
                })
                .map(function (item) {
                  return {
                    fill: false,
                    label:
                      item === 'Information Technology & Supply Chain'
                        ? 'IT & Supply Chain'
                        : item,
                    data: last2.byLOBTime[item],
                    borderColor: colorPicker[item],
                    backgroundColor: colorPicker[item],
                    lineTension: 0,
                  };
                }),
            },
            options: {
              aspectRatio: 1.5,
              responsive: true,
              title: {
                display: true,
                text: currentYear - 2 + ' TSR Requests by LOB',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
              },
              tooltips: {
                titleFontSize: 22,
                bodyFontSize: 18,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month',
                      fontSize: 24,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'TSR Requests',
                      fontSize: 24,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2017LineChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart11 = new Chart(
          document.getElementById('2017PieChartRequestsByLOB').getContext('2d'),
          {
            type: 'pie',
            data: {
              labels: _.orderBy(last2.byLOB, ['data'], ['desc']).map(function (
                val
              ) {
                return val.name === 'Information Technology & Supply Chain'
                  ? 'IT & Supply Chain'
                  : val.name;
              }),
              datasets: [
                {
                  backgroundColor: _.orderBy(
                    last2.byLOB,
                    ['data'],
                    ['desc']
                  ).map(function (val) {
                    return colorPicker[val.name];
                  }),
                  data: _.orderBy(last2.byLOB, ['data'], ['desc']).map(
                    function (val) {
                      return val.data;
                    }
                  ),
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: currentYear - 2 + ' TSR Requests by LOB',
                fontSize: 30,
                padding: 30,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                  usePointStyle: true,
                  generateLabels: function (chart) {
                    var data = chart.data;
                    function getSum(total, num) {
                      return total + num;
                    }
                    if (data.labels.length && data.datasets.length) {
                      return data.labels.map(function (label, i) {
                        var meta = chart.getDatasetMeta(0);
                        var ds = data.datasets[0];
                        var arc = meta.data[i];
                        var custom = (arc && arc.custom) || {};
                        var getValueAtIndexOrDefault =
                          theHelp.getValueAtIndexOrDefault;
                        var arcOpts = chart.options.elements.arc;
                        var fill = custom.backgroundColor
                          ? custom.backgroundColor
                          : getValueAtIndexOrDefault(
                              ds.backgroundColor,
                              i,
                              arcOpts.backgroundColor
                            );
                        var stroke = custom.borderColor
                          ? custom.borderColor
                          : getValueAtIndexOrDefault(
                              ds.borderColor,
                              i,
                              arcOpts.borderColor
                            );
                        var bw = custom.borderWidth
                          ? custom.borderWidth
                          : getValueAtIndexOrDefault(
                              ds.borderWidth,
                              i,
                              arcOpts.borderWidth
                            );
                        return {
                          // And finally :
                          text:
                            (
                              (ds.data[i] / ds.data.reduce(getSum)) *
                              100
                            ).toFixed(2) +
                            ' % : ' +
                            label,
                          fillStyle: fill,
                          strokeStyle: stroke,
                          lineWidth: bw,
                          hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                          index: i,
                        };
                      });
                    }
                    return [];
                  },
                },
              },
              tooltips: {
                titleFontSize: 30,
                bodyFontSize: 20,
                xPadding: 10,
                yPadding: 10,
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2017PieChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );

        var newChart12 = new Chart(
          document.getElementById('2017BarChartRequestsByLOB').getContext('2d'),
          {
            type: 'bar',
            data: {
              labels: last2.byTier['Tier 1'].items.map(function (val) {
                return val.name;
              }),
              datasets: _.map(last2.byTier, function (item, index, arr) {
                return {
                  label: [index],
                  data: item.items.map(function (val) {
                    return val.data;
                  }),
                  backgroundColor: tierColorPicker[index].backgroundColor,
                  borderColor: tierColorPicker[index].borderColor,
                  borderWidth: 1.5,
                };
              }).reverse(),
            },
            options: {
              aspectRatio: 1.5,
              title: {
                display: true,
                text: currentYear - 2 + ' TSR Requests by Tier',
                fontSize: 30,
                padding: 20,
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontSize: 16,
                  fontStyle: 'bold',
                },
                reverse: true,
              },
              tooltips: {
                titleFontSize: 18,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    stacked: true,
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      autoSkip: false,
                    },
                  },
                ],
              },
              animation: {
                onProgress: function (animation) {
                  //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                onComplete: function (animation) {
                  $('#2017BarChartRequestsByLOB')
                    .siblings('.active')
                    .addClass('disabled')
                    .removeClass('active');
                },
              },
            },
          }
        );
      });
    },
  };
})(TSR_Model, TSR_View);

$(document).ready(function () {
  TSR_App.initialize();
  TSR_App.setTables();
  TSR_App.loadAllTableData();
  TSR_App.setButtons();
  TSR_App.setReport();

  /*
  var data = [5, 2, 3, 4, 20, 30, 40, 50];

  var chart_width = 800;
  var chart_height = 400;
  var bar_padding = 5;
  var font_size = 14;

  
  var svg = d3
    .select("#charts")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", 400);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return i * (chart_width / data.length);
    })
    .attr("y", function(d, i) {
      return chart_height - d * 5;
    })
    .attr("width", chart_width / data.length - bar_padding)
    .attr("height", function(d, i) {
      return d * 5;
    })
    .attr("fill", "#7ed26d");

  //create labels
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d, i) {
      return d;
    })
    .attr("x", function(d, i) {
      return (
        i * (chart_width / data.length) +
        Math.floor((chart_width / data.length - bar_padding) / 2)
      );
    })
    .attr("y", function(d, i) {
      return d < 5
        ? chart_height - d * 5
        : chart_height - d * 5 + font_size + 5;
    })
    .attr("font-size", font_size)
    .attr("fill", "#fff")
    .attr("text-anchor", "middle");

  var scatter_data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
  ];

  var padding = 50;

  //create SVG
  var new_svg = d3
    .select("#myChart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

  //create Scales
  var x_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(scatter_data, function(d) {
        return d[0];
      })
    ])
    .range([padding, chart_width - padding * 2]);

  var y_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(scatter_data, function(d) {
        return d[1];
      })
    ])
    .range([chart_height - padding, padding]);

  var r_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(scatter_data, function(d) {
        return d[1];
      })
    ])
    .range([5, 30]);

  var a_scale = d3
    .scaleSqrt()
    .domain([
      0,
      d3.max(scatter_data, function(d) {
        return d[1];
      })
    ])
    .range([0, 25]);

  // Create Axis
  var x_axis = d3.axisBottom(x_scale); //.ticks(5);

  new_svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (chart_height - padding) + ")")
    .call(x_axis);

  var y_axis = d3.axisLeft(y_scale);

  new_svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ")")
    .call(y_axis);

  //create circles
  new_svg
    .selectAll("circle")
    .data(scatter_data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return x_scale(d[0]);
    })
    .attr("cy", function(d) {
      return y_scale(d[1]);
    })
    .attr("r", function(d) {
      return a_scale(d[1]);
    })
    .attr("fill", "#d1AB0E");

  //create Labels
  new_svg
    .append("g")
    .selectAll("text")
    .data(scatter_data)
    .enter()
    .append("text")
    .text(function(d) {
      return d.join(",");
    })
    .attr("x", function(d) {
      return x_scale(d[0]);
    })
    .attr("y", function(d) {
      return y_scale(d[1]);
    });


    */
});
