webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/Modals/alert.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var modal_1 = __webpack_require__("../../../../../src/app/Modals/modal.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var core_2 = __webpack_require__("../../../core/esm5/core.js");
var AlertMsgComponent = (function () {
    function AlertMsgComponent(compiler, viewContainer, resolver) {
        this.compiler = compiler;
        this.viewContainer = viewContainer;
        this.resolver = resolver;
        this.isShown = false;
        this.showClose = false;
        /**
           * Describes if the modal contains Ok Button.
           * The default Ok button will close the modal and emit the callback.
           * Defaults to true.
           */
        this.okButton = true;
        /**
           * Caption for the OK button.
           * Default: Ok
           */
        this.okButtonText = 'Ok';
        /**
           * Describes if the modal contains cancel Button.
           * The default Cancelbutton will close the modal.
           * Defaults to true.
           */
        this.cancelButton = true;
        /**
           * Caption for the Cancel button.
           * Default: Cancel
           */
        this.cancelButtonText = 'Cancel';
        /**
           * if the modalMessage is true it will show the message inside modal body.
           */
        this.modalMessage = true;
        /**
          * if the value is true modal footer will be visible or else it will be hidden.
          */
        this.modalFooter = true;
        /**
          * shows modal header if the value is true.
          */
        this.modalHeader = true;
        /**
          * if the value is true modal will be visible or else it will be hidden.
          */
        this.cssModaldialog = '';
        this.cssModal = 'fade';
        this.backdropModal = 'static';
        /**
          * Emitted when a ok button was clicked
          * or when close method is called.
          */
        this.onClose = new core_1.EventEmitter(false);
        this.onDismissed = new core_1.EventEmitter(false);
        this.onOpened = new core_1.EventEmitter(false);
    }
    Object.defineProperty(AlertMsgComponent.prototype, "isEnglish", {
        get: function () {
            return global_settings_1.AppSettings.CurrentLang !== 'ar';
        },
        enumerable: true,
        configurable: true
    });
    /**
         * Opens a modal window creating backdrop.
         * @param component The angular Component that is to be loaded dynamically(optional).
         */
    AlertMsgComponent.prototype.open = function (size) {
        // this.isOpen = true;
        if (this.cmpRef) {
            this.cmpRef.destroy();
            this.cmpRef = null;
        }
        this.modal.open(size, this.backdropModal);
    };
    AlertMsgComponent.prototype.setComponentData = function (data) {
        if (!data) {
            return;
        }
        // We can destroy the old component is we like by calling destroy
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        // Inputs need to be in the following format to be resolved properly
        var inputProviders = Object.keys(data.inputs).map(function (inputName) { return { provide: inputName, useValue: data.inputs[inputName] }; });
        var resolvedInputs = core_1.ReflectiveInjector.resolve(inputProviders);
        // We create an injector out of the data we want to pass down and this components injector
        var injector = core_1.ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.target.parentInjector);
        // We create a factory out of the component we want to create
        var factory = this.resolver.resolveComponentFactory(data.component);
        // We create the component using the factory and the injector
        var component = factory.create(injector);
        // We insert the component into the dom container
        this.target.insert(component.hostView);
        this.cmpRef = component;
    };
    AlertMsgComponent.prototype.openDynamic = function (data, size) {
        this.setComponentData(data);
        this.modal.open(size, this.backdropModal);
    };
    AlertMsgComponent.prototype.close = function () {
        this.modal.close();
    };
    /**
       *  close method dispose the component, closes the modal and optionally emits modalOutput value.
       */
    AlertMsgComponent.prototype.opened = function () {
        this.onOpened.emit({ actionName: this.actionName, refID: this.refID, arg: null });
        this.isShown = true;
    };
    AlertMsgComponent.prototype.closed = function () {
        var data;
        if (this.ExtraData) {
            data = { actionName: this.actionName, refID: this.refID, arg: this.ExtraData };
        }
        else if (this.cmpRef && !!this.cmpRef.instance.data) {
            data = { actionName: this.actionName, refID: this.refID, arg: this.cmpRef.instance.data };
        }
        else {
            data = { actionName: this.actionName, refID: this.refID, arg: null };
        }
        this.dispose();
        this.onClose.emit(data);
        this.isShown = false;
    };
    /**
       *  ok method dispose the component, closes the modal and emits true.
       */
    AlertMsgComponent.prototype.dismissed = function () {
        this.dispose();
        this.onDismissed.emit({ actionName: this.actionName, refID: this.refID, arg: null });
        this.isShown = false;
    };
    /**
       *  dispose method dispose the loaded component.
       */
    AlertMsgComponent.prototype.dispose = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    AlertMsgComponent.prototype.ngOnDestroy = function () {
        this.dispose();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "modalID", void 0);
    __decorate([
        core_1.Input('show-close'),
        __metadata("design:type", Boolean)
    ], AlertMsgComponent.prototype, "showClose", void 0);
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", modal_1.ModalComponent)
    ], AlertMsgComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('child', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], AlertMsgComponent.prototype, "target", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "modalTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AlertMsgComponent.prototype, "component", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AlertMsgComponent.prototype, "okButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "okButtonText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AlertMsgComponent.prototype, "cancelButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "cancelButtonText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AlertMsgComponent.prototype, "modalMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AlertMsgComponent.prototype, "modalFooter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AlertMsgComponent.prototype, "modalHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "cssModaldialog", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertMsgComponent.prototype, "cssModal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AlertMsgComponent.prototype, "backdropModal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AlertMsgComponent.prototype, "actionName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AlertMsgComponent.prototype, "refID", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AlertMsgComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AlertMsgComponent.prototype, "onDismissed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AlertMsgComponent.prototype, "onOpened", void 0);
    AlertMsgComponent = __decorate([
        core_1.Component({
            selector: 'alertmsg',
            template: "\n  <modal #modal cssClass=\"{{cssModaldialog}}\" \n  cssmodalClass=\"{{cssModal}}\" id=\"{{modalID}}\" \n  backdrop=\"{{backdropModal}}\" (onClose)=\"closed()\" \n  (onDismiss)=\"dismissed()\" (onOpen)=\"opened()\" class=\"{{(isEnglish?'formEN':'')}}\">\n    <modal-header>\n     <button *ngIf=\"showClose\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        <h4 *ngIf=\"modalHeader\" class=\"modal-title\">{{modalTitle}}</h4>\n    </modal-header>\n    <modal-body>\n    \n         <div *ngIf=\"modalMessage\" [innerHTML]=\"message | safeHtml\">\n        </div>\n          <div #child>\n          </div>\n    \n    </modal-body>\n    <modal-footer *ngIf=\"modalFooter\">\n        <button *ngIf=\"cancelButton\" type=\"button\"\n         class=\"btn btn-default\" data-dismiss=\"modal\"\n          (click)=\"modal.dismiss()\">{{cancelButtonText}}\n          </button>\n        <button *ngIf=\"okButton\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">{{okButtonText}}</button>\n    </modal-footer>\n</modal>\n",
            encapsulation: core_1.ViewEncapsulation.None
        })
        /**
          * API to an open modal window.
          */
        ,
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.ViewContainerRef,
            core_1.ComponentFactoryResolver])
    ], AlertMsgComponent);
    return AlertMsgComponent;
}());
exports.AlertMsgComponent = AlertMsgComponent;
var AlertAutofocusDirective = (function () {
    function AlertAutofocusDirective(el, modal) {
        var _this = this;
        this.el = el;
        this.modal = modal;
        if (modal) {
            this.modal.onOpen.subscribe(function () {
                _this.el.nativeElement.focus();
            });
        }
    }
    AlertAutofocusDirective = __decorate([
        core_2.Directive({
            selector: '[autofocus-alert]'
        }),
        __param(1, core_2.Optional()),
        __metadata("design:paramtypes", [core_2.ElementRef, modal_1.ModalComponent])
    ], AlertAutofocusDirective);
    return AlertAutofocusDirective;
}());
exports.AlertAutofocusDirective = AlertAutofocusDirective;


/***/ }),

/***/ "../../../../../src/app/Modals/autofocus.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var modal_1 = __webpack_require__("../../../../../src/app/Modals/modal.ts");
var AutofocusDirective = (function () {
    function AutofocusDirective(el, modal) {
        var _this = this;
        this.el = el;
        this.modal = modal;
        if (modal) {
            this.modal.onOpen.subscribe(function () {
                _this.el.nativeElement.focus();
            });
        }
    }
    AutofocusDirective = __decorate([
        core_1.Directive({
            selector: '[autofocus]'
        }),
        __param(1, core_1.Optional()),
        __metadata("design:paramtypes", [core_1.ElementRef, modal_1.ModalComponent])
    ], AutofocusDirective);
    return AutofocusDirective;
}());
exports.AutofocusDirective = AutofocusDirective;


/***/ }),

/***/ "../../../../../src/app/Modals/modal-body.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var ModalBodyComponent = (function () {
    function ModalBodyComponent() {
    }
    ModalBodyComponent = __decorate([
        core_1.Component({
            selector: 'modal-body',
            template: "\n        <div class=\"modal-body\">\n            <ng-content></ng-content>\n        </div>\n    "
        })
    ], ModalBodyComponent);
    return ModalBodyComponent;
}());
exports.ModalBodyComponent = ModalBodyComponent;


/***/ }),

/***/ "../../../../../src/app/Modals/modal-footer.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var modal_1 = __webpack_require__("../../../../../src/app/Modals/modal.ts");
var ModalFooterComponent = (function () {
    function ModalFooterComponent(modal) {
        this.modal = modal;
        this.showDefaultButtons = false;
        this.dismissButtonLabel = 'Dismiss';
        this.closeButtonLabel = 'Close';
    }
    __decorate([
        core_1.Input('show-default-buttons'),
        __metadata("design:type", Boolean)
    ], ModalFooterComponent.prototype, "showDefaultButtons", void 0);
    __decorate([
        core_1.Input('dismiss-button-label'),
        __metadata("design:type", String)
    ], ModalFooterComponent.prototype, "dismissButtonLabel", void 0);
    __decorate([
        core_1.Input('close-button-label'),
        __metadata("design:type", String)
    ], ModalFooterComponent.prototype, "closeButtonLabel", void 0);
    ModalFooterComponent = __decorate([
        core_1.Component({
            selector: 'modal-footer',
            template: "\n        <div class=\"modal-footer\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"modal.dismiss()\">{{dismissButtonLabel}}</button>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">{{closeButtonLabel}}</button>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [modal_1.ModalComponent])
    ], ModalFooterComponent);
    return ModalFooterComponent;
}());
exports.ModalFooterComponent = ModalFooterComponent;


/***/ }),

/***/ "../../../../../src/app/Modals/modal-header.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var modal_1 = __webpack_require__("../../../../../src/app/Modals/modal.ts");
var ModalHeaderComponent = (function () {
    function ModalHeaderComponent(modal) {
        this.modal = modal;
        this.showClose = false;
    }
    __decorate([
        core_1.Input('show-close'),
        __metadata("design:type", Boolean)
    ], ModalHeaderComponent.prototype, "showClose", void 0);
    ModalHeaderComponent = __decorate([
        core_1.Component({
            selector: 'modal-header',
            template: "\n        <div class=\"modal-header\">\n            <button *ngIf=\"showClose\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <ng-content></ng-content>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [modal_1.ModalComponent])
    ], ModalHeaderComponent);
    return ModalHeaderComponent;
}());
exports.ModalHeaderComponent = ModalHeaderComponent;


/***/ }),

/***/ "../../../../../src/app/Modals/modal-instance.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
__webpack_require__("../../../../rxjs/_esm5/add/observable/fromEvent.js");
var ModalInstance = (function () {
    function ModalInstance(element) {
        this.element = element;
        this.suffix = '.ng2-bs3-modal';
        this.shownEventName = 'shown.bs.modal' + this.suffix;
        this.hiddenEventName = 'hidden.bs.modal' + this.suffix;
        this.visible = false;
        this.init();
    }
    ModalInstance.prototype.ngAfterViewInit = function () {
    };
    ModalInstance.prototype.open = function () {
        this.init();
        return this.show();
    };
    ModalInstance.prototype.close = function () {
        this.result = ModalResult.Close;
        return this.hide();
    };
    ModalInstance.prototype.dismiss = function () {
        this.result = ModalResult.Dismiss;
        return this.hide();
    };
    ModalInstance.prototype.destroy = function () {
        var _this = this;
        return this.hide().then(function () {
            if (_this.$modal) {
                _this.$modal.data('bs.modal', null);
                _this.$modal.remove();
            }
        });
    };
    ModalInstance.prototype.show = function () {
        var promise = toPromise(this.shown);
        this.resetData();
        this.$modal.modal();
        return promise;
    };
    ModalInstance.prototype.hide = function () {
        if (this.$modal && this.visible) {
            var promise = toPromise(this.hidden);
            this.$modal.modal('hide');
            return promise;
        }
        return Promise.resolve(this.result);
    };
    ModalInstance.prototype.init = function () {
        var _this = this;
        this.$modal = jQuery(this.element.nativeElement);
        this.$modal.appendTo('body');
        // this.$modal.bind(this.hiddenEventName, function () {
        //   jQuery('html').css('margin-right', '0px');
        // });
        // this.$modal.bind(this.shownEventName, function () {
        //   jQuery('html').css('margin-right', '-15px');
        // });
        this.shown = Observable_1.Observable.fromEvent(this.$modal, this.shownEventName)
            .map(function () {
            _this.visible = true;
        });
        this.hidden = Observable_1.Observable.fromEvent(this.$modal, this.hiddenEventName)
            .map(function () {
            var result = (!_this.result || _this.result === ModalResult.None)
                ? ModalResult.Dismiss : _this.result;
            _this.result = ModalResult.None;
            _this.visible = false;
            return result;
        });
    };
    ModalInstance.prototype.resetData = function () {
        this.$modal.removeData();
        this.$modal.data('backdrop', booleanOrValue(this.$modal.attr('data-backdrop')));
        this.$modal.data('keyboard', booleanOrValue(this.$modal.attr('data-keyboard')));
    };
    return ModalInstance;
}());
exports.ModalInstance = ModalInstance;
function booleanOrValue(value) {
    if (value === 'true')
        return true;
    else if (value === 'false')
        return false;
    return value;
}
function toPromise(observable) {
    return new Promise(function (resolve, reject) {
        observable.subscribe(function (next) {
            resolve(next);
        });
    });
}
var ModalResult;
(function (ModalResult) {
    ModalResult[ModalResult["None"] = 0] = "None";
    ModalResult[ModalResult["Close"] = 1] = "Close";
    ModalResult[ModalResult["Dismiss"] = 2] = "Dismiss";
})(ModalResult = exports.ModalResult || (exports.ModalResult = {}));


/***/ }),

/***/ "../../../../../src/app/Modals/modal.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var modal_1 = __webpack_require__("../../../../../src/app/Modals/modal.ts");
var modal_header_1 = __webpack_require__("../../../../../src/app/Modals/modal-header.ts");
var modal_body_1 = __webpack_require__("../../../../../src/app/Modals/modal-body.ts");
var modal_footer_1 = __webpack_require__("../../../../../src/app/Modals/modal-footer.ts");
var autofocus_1 = __webpack_require__("../../../../../src/app/Modals/autofocus.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var angular_confirmation_popover_1 = __webpack_require__("../../../../angular-confirmation-popover/dist/esm/src/index.js");
var safehtml_pipe_1 = __webpack_require__("../../../../../src/app/shared/safehtml.pipe.ts");
__export(__webpack_require__("../../../../../src/app/Modals/modal.ts"));
__export(__webpack_require__("../../../../../src/app/Modals/modal-header.ts"));
__export(__webpack_require__("../../../../../src/app/Modals/modal-body.ts"));
__export(__webpack_require__("../../../../../src/app/Modals/modal-footer.ts"));
__export(__webpack_require__("../../../../../src/app/Modals/modal-instance.ts"));
__export(__webpack_require__("../../../../../src/app/Modals/alert.component.ts"));
var ModalModule = (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, angular_confirmation_popover_1.ConfirmationPopoverModule.forRoot({
                    confirmButtonType: 'danger' // set defaults here
                })
            ],
            declarations: [
                modal_1.ModalComponent,
                modal_header_1.ModalHeaderComponent,
                modal_body_1.ModalBodyComponent,
                modal_footer_1.ModalFooterComponent,
                autofocus_1.AutofocusDirective,
                alert_component_1.AlertMsgComponent, alert_component_1.AlertAutofocusDirective, safehtml_pipe_1.SafeHtmlPipe
            ],
            exports: [
                modal_1.ModalComponent,
                modal_header_1.ModalHeaderComponent,
                modal_body_1.ModalBodyComponent,
                modal_footer_1.ModalFooterComponent,
                autofocus_1.AutofocusDirective,
                alert_component_1.AlertMsgComponent, alert_component_1.AlertAutofocusDirective,
                angular_confirmation_popover_1.ConfirmationPopoverModule, safehtml_pipe_1.SafeHtmlPipe
            ]
        })
    ], ModalModule);
    return ModalModule;
}());
exports.ModalModule = ModalModule;


/***/ }),

/***/ "../../../../../src/app/Modals/modal.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var modal_instance_1 = __webpack_require__("../../../../../src/app/Modals/modal-instance.ts");
var ModalComponent = (function () {
    function ModalComponent(compiler, element) {
        var _this = this;
        this.compiler = compiler;
        this.element = element;
        this.overrideSize = null;
        this.visible = false;
        this.ModalID = 'myModal';
        this.animation = true;
        this.backdrop = 'static';
        this.keyboard = true;
        this.cssClass = '';
        this.cssmodalClass = '';
        this.onClose = new core_1.EventEmitter(false);
        this.onDismiss = new core_1.EventEmitter(false);
        this.onOpen = new core_1.EventEmitter(false);
        this.instance = new modal_instance_1.ModalInstance(this.element);
        this.instance.hidden.subscribe(function (result) {
            _this.visible = _this.instance.visible;
            if (result === modal_instance_1.ModalResult.Dismiss) {
                _this.onDismiss.emit(undefined);
            }
        });
        this.instance.shown.subscribe(function () {
            _this.onOpen.emit(undefined);
        });
    }
    Object.defineProperty(ModalComponent.prototype, "modalClass", {
        get: function () {
            return 'modal ' + this.cssmodalClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "fadeClass", {
        get: function () {
            return this.animation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataKeyboardAttr", {
        get: function () {
            return this.keyboard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "idAttr", {
        get: function () {
            return this.ModalID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataBackdropAttr", {
        get: function () {
            return this.backdrop;
        },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngOnDestroy = function () {
        return this.instance && this.instance.destroy();
    };
    ModalComponent.prototype.routerCanDeactivate = function () {
        return this.ngOnDestroy();
    };
    ModalComponent.prototype.open = function (size, backdrop) {
        var _this = this;
        if (ModalSize.validSize(size)) {
            this.overrideSize = size;
            this.backdrop = backdrop;
        }
        return this.instance.open().then(function () {
            _this.visible = _this.instance.visible;
        });
    };
    ModalComponent.prototype.close = function (value) {
        var _this = this;
        return this.instance.close().then(function () {
            _this.onClose.emit(value);
        });
    };
    ModalComponent.prototype.dismiss = function () {
        return this.instance.dismiss();
    };
    ModalComponent.prototype.getCssClasses = function () {
        var classes = [];
        if (this.isSmall()) {
            classes.push('modal-sm');
        }
        if (this.isLarge()) {
            classes.push('modal-lg');
        }
        if (this.isMedum()) {
            classes.push('modal-md');
        }
        if (this.cssClass !== '') {
            classes.push(this.cssClass);
        }
        return classes.join(' ');
    };
    ModalComponent.prototype.isSmall = function () {
        return this.overrideSize !== ModalSize.Large && this.overrideSize !== ModalSize.Medum
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    };
    ModalComponent.prototype.isLarge = function () {
        return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.Medum
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    };
    ModalComponent.prototype.isMedum = function () {
        return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Medum
            || this.overrideSize === ModalSize.Medum;
    };
    ModalComponent.prototype.addComponent = function (template) {
        var TemplateComponent = (function () {
            function TemplateComponent() {
            }
            TemplateComponent = __decorate([
                core_1.Component({ template: template })
            ], TemplateComponent);
            return TemplateComponent;
        }());
        var TemplateModule = (function () {
            function TemplateModule() {
            }
            TemplateModule = __decorate([
                core_1.NgModule({ declarations: [TemplateComponent] })
            ], TemplateModule);
            return TemplateModule;
        }());
        var mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        var factory = mod.componentFactories.find(function (comp) {
            return comp.componentType === TemplateComponent;
        });
        var component = this.container.createComponent(factory);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "ModalID", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "animation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "backdrop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "keyboard", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "cssClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "cssmodalClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "onDismiss", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalComponent.prototype, "onOpen", void 0);
    __decorate([
        core_1.ViewChild('container', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], ModalComponent.prototype, "container", void 0);
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ModalComponent.prototype, "modalClass", null);
    __decorate([
        core_1.HostBinding('class.fade'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], ModalComponent.prototype, "fadeClass", null);
    __decorate([
        core_1.HostBinding('attr.data-keyboard'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], ModalComponent.prototype, "dataKeyboardAttr", null);
    __decorate([
        core_1.HostBinding('attr.id'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ModalComponent.prototype, "idAttr", null);
    __decorate([
        core_1.HostBinding('attr.data-backdrop'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ModalComponent.prototype, "dataBackdropAttr", null);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            host: {
                'class': 'modal',
                'role': 'dialog',
                'tabindex': '-1'
            },
            template: "\n  < <div class=\"vertical-alignment-helper\">\n        <div class=\"modal-dialog vertical-align-center\" [ngClass]=\"getCssClasses()\">\n            <div class=\"modal-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.Compiler, core_1.ElementRef])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
var ModalSize = (function () {
    function ModalSize() {
    }
    ModalSize.validSize = function (size) {
        return size && (size === ModalSize.Small || size === ModalSize.Large || size === ModalSize.Medum);
    };
    ModalSize.Small = 'sm';
    ModalSize.Large = 'lg';
    ModalSize.Medum = 'md';
    return ModalSize;
}());
exports.ModalSize = ModalSize;


/***/ }),

/***/ "../../../../../src/app/Tap/tab-config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
var NgbTabsetConfig = (function () {
    function NgbTabsetConfig() {
        this.justify = 'start';
        this.type = 'tabs';
    }
    NgbTabsetConfig = __decorate([
        core_1.Injectable()
    ], NgbTabsetConfig);
    return NgbTabsetConfig;
}());
exports.NgbTabsetConfig = NgbTabsetConfig;


/***/ }),

/***/ "../../../../../src/app/Tap/tab.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var tab_config_1 = __webpack_require__("../../../../../src/app/Tap/tab-config.ts");
var nextId = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
var NgbTabTitle = (function () {
    function NgbTabTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabTitle = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbTabTitle]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbTabTitle);
    return NgbTabTitle;
}());
exports.NgbTabTitle = NgbTabTitle;
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
var NgbTabContent = (function () {
    function NgbTabContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabContent = __decorate([
        core_1.Directive({ selector: 'ng-template[ngbTabContent]' }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], NgbTabContent);
    return NgbTabContent;
}());
exports.NgbTabContent = NgbTabContent;
/**
 * A directive representing an individual tab.
 */
var NgbTab = (function () {
    function NgbTab() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = "ngb-tab-" + nextId++;
        /**
         * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
         */
        this.disabled = false;
        this.isVisable = true;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgbTab.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTab.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTab.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTab.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgbTab.prototype, "isVisable", void 0);
    __decorate([
        core_1.ContentChild(NgbTabContent),
        __metadata("design:type", NgbTabContent)
    ], NgbTab.prototype, "contentTpl", void 0);
    __decorate([
        core_1.ContentChild(NgbTabTitle),
        __metadata("design:type", NgbTabTitle)
    ], NgbTab.prototype, "titleTpl", void 0);
    NgbTab = __decorate([
        core_1.Directive({ selector: 'ngb-tab' })
    ], NgbTab);
    return NgbTab;
}());
exports.NgbTab = NgbTab;
/**
 * A component that makes it easy to create tabbed interface.
 */
var NgbTabset = (function () {
    function NgbTabset(config) {
        this.navDivClass = "";
        this.contentDivClass = "";
        /**
         * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
         */
        this.tabChange = new core_1.EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
    }
    NgbTabset.prototype.navClass = function () {
        return 'nav nav-' + this.type + ' justify-content-' + this.justify + (this.customClass ? ' ' + this.customClass : '');
    };
    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     */
    NgbTabset.prototype.select = function (tabId) {
        var selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            var defaultPrevented_1 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, activeIndex: this.activeIndex, nextActiveIndex: selectedTab.index, preventDefault: function () { defaultPrevented_1 = true; } });
            if (!defaultPrevented_1) {
                this.activeId = selectedTab.id;
            }
        }
    };
    NgbTabset.prototype.selectbyIndex = function (tabIndex) {
        var selectedTab = this._getTabByIndex(tabIndex);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            var defaultPrevented_2 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, activeIndex: this.activeIndex, nextActiveIndex: selectedTab.index, preventDefault: function () { defaultPrevented_2 = true; } });
            if (!defaultPrevented_2) {
                this.activeId = selectedTab.id;
            }
        }
    };
    NgbTabset.prototype.ngAfterContentChecked = function () {
        // auto-correct activeId that might have been set incorrectly as input
        var activeTab = this._getTabById(this.activeId);
        if (activeTab && !activeTab.isVisable) {
            var tabsWithId = this.tabs.filter(function (tab) { return tab.isVisable; });
            if (tabsWithId.length > 0)
                activeTab = tabsWithId[0];
        }
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
        this.activeIndex = activeTab ? activeTab.index : (this.tabs.length ? this.tabs.first.index : 0);
    };
    NgbTabset.prototype._getTabById = function (id) {
        var tabsWithId = this.tabs.filter(function (tab) { return tab.id === id; });
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    NgbTabset.prototype._getTabByIndex = function (index) {
        var tabsWithId = this.tabs.filter(function (tab) { return tab.index.toString() === index.toString(); });
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    NgbTabset.prototype.ngOnDestroy = function () {
        nextId = 0;
    };
    __decorate([
        core_1.ContentChildren(NgbTab),
        __metadata("design:type", core_1.QueryList)
    ], NgbTabset.prototype, "tabs", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "navDivClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "contentDivClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "customClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "activeId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "justify", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgbTabset.prototype, "type", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgbTabset.prototype, "tabChange", void 0);
    NgbTabset = __decorate([
        core_1.Component({
            selector: 'ngb-tabset',
            exportAs: 'ngbTabset',
            template: "\n  <div class=\"tabcomponent\">\n  <div [class]=\"navDivClass\">\n    <ul [class]=\"navClass()\" role=\"tablist\">\n      <li class=\"nav-item\" *ngFor=\"let tab of tabs\" [class.active]=\"tab.id === activeId\">\n        <a *ngIf=\"tab.isVisable\" [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          href (click)=\"!!select(tab.id)\" role=\"tab\" [attr.aria-controls]=\"tab.id + '-panel'\" [attr.aria-expanded]=\"tab.id === activeId\">\n          {{tab.title}}<ng-template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></ng-template>\n        </a>\n      </li>\n    </ul>\n    </div>\n    <div [class]=\"contentDivClass\">\n    <div class=\"tab-content\">\n      <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n        <div class=\"tab-pane\" [class.active]=\"tab.id === activeId\" role=\"tabpanel\" [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\">\n          <ng-template [ngTemplateOutlet]=\"tab.contentTpl.templateRef\"></ng-template>\n        </div>\n      </ng-template>\n    </div>\n    </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [tab_config_1.NgbTabsetConfig])
    ], NgbTabset);
    return NgbTabset;
}());
exports.NgbTabset = NgbTabset;
var TabAutofocusDirective = (function () {
    function TabAutofocusDirective(el, tab) {
        var _this = this;
        this.el = el;
        this.tab = tab;
        if (tab) {
            this.tab.tabChange.subscribe(function () {
                setTimeout(function () {
                    this.el.nativeElement.focus();
                }.bind(_this), 300);
            });
        }
    }
    TabAutofocusDirective = __decorate([
        core_1.Directive({
            selector: '[Tabautofocus]'
        }),
        __param(1, core_1.Optional()),
        __metadata("design:paramtypes", [core_1.ElementRef, NgbTabset])
    ], TabAutofocusDirective);
    return TabAutofocusDirective;
}());
exports.TabAutofocusDirective = TabAutofocusDirective;


/***/ }),

/***/ "../../../../../src/app/Tap/tab.modal.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var tab_component_1 = __webpack_require__("../../../../../src/app/Tap/tab.component.ts");
var tab_config_1 = __webpack_require__("../../../../../src/app/Tap/tab-config.ts");
var tab_component_2 = __webpack_require__("../../../../../src/app/Tap/tab.component.ts");
exports.NgbTabset = tab_component_2.NgbTabset;
exports.NgbTab = tab_component_2.NgbTab;
exports.NgbTabContent = tab_component_2.NgbTabContent;
exports.NgbTabTitle = tab_component_2.NgbTabTitle;
exports.TabAutofocusDirective = tab_component_2.TabAutofocusDirective;
var tab_config_2 = __webpack_require__("../../../../../src/app/Tap/tab-config.ts");
exports.NgbTabsetConfig = tab_config_2.NgbTabsetConfig;
var NGB_TABSET_DIRECTIVES = [tab_component_1.NgbTabset, tab_component_1.NgbTab, tab_component_1.NgbTabContent, tab_component_1.NgbTabTitle, tab_component_1.TabAutofocusDirective];
var NgbTabsetModule = (function () {
    function NgbTabsetModule() {
    }
    NgbTabsetModule_1 = NgbTabsetModule;
    NgbTabsetModule.forRoot = function () { return { ngModule: NgbTabsetModule_1, providers: [tab_config_1.NgbTabsetConfig] }; };
    NgbTabsetModule = NgbTabsetModule_1 = __decorate([
        core_1.NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [common_1.CommonModule] })
    ], NgbTabsetModule);
    return NgbTabsetModule;
    var NgbTabsetModule_1;
}());
exports.NgbTabsetModule = NgbTabsetModule;


/***/ }),

/***/ "../../../../../src/app/accessdenied/accessdenied.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper row2\">\r\n  <div id=\"container\" class=\"clear\">\r\n  \r\n    <section id=\"fof\" class=\"clear\">\r\n   \r\n      <div class=\"hgroup\">\r\n        <h1 *ngIf=\"!IsRTL\"><span><strong>4</strong></span><span><strong>0</strong></span><span><strong>3</strong></span></h1>\r\n         <h1 *ngIf=\"IsRTL\"><span><strong>3</strong></span><span><strong>0</strong></span><span><strong>4</strong></span></h1>\r\n        <h2 *ngIf=\"!IsRTL\">Error ! <span>Access Denied</span></h2>\r\n        <h2 *ngIf=\"IsRTL\">حدث خطأ ! <span>رفض الوصول</span></h2>\r\n      </div>\r\n      <p *ngIf=\"!IsRTL\">For some reason the requested page needs permissions to access it, please contact your admin for more information</p>\r\n       <p *ngIf=\"IsRTL\">لسبب ما تحتاج الصفحة المطلوبة الأذونات للوصول إليها، يرجى الاتصال بالمسؤول للحصول على مزيد من المعلومات</p>\r\n      <p *ngIf=\"!IsRTL\"><a href=\"javascript:history.go(-1)\">&laquo; Go Back</a> / <a href=\"#\">Go Home &raquo;</a></p>\r\n         <p *ngIf=\"IsRTL\"><a href=\"javascript:history.go(-1)\">&laquo; الرجوع إلى الصفحة السابقة</a> / <a href=\"#\">الذهاب إلى الصفحة الرئيسية &raquo;</a></p>\r\n    \r\n    </section>\r\n \r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/accessdenied/accessdenied.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var AccessDeniedComponent = (function () {
    function AccessDeniedComponent() {
    }
    Object.defineProperty(AccessDeniedComponent.prototype, "IsRTL", {
        get: function () {
            return global_settings_1.AppSettings.CurrentLang === 'ar' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    AccessDeniedComponent.prototype.ngOnInit = function () { };
    AccessDeniedComponent = __decorate([
        core_1.Component({
            selector: 'accessdenied',
            template: __webpack_require__("../../../../../src/app/accessdenied/accessdenied.component.html")
        })
    ], AccessDeniedComponent);
    return AccessDeniedComponent;
}());
exports.AccessDeniedComponent = AccessDeniedComponent;


/***/ }),

/***/ "../../../../../src/app/addtransaction/addtransaction.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/addtransaction/addtransaction.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" (ngSubmit)=\"submit()\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n    <div id=\"addTransRequest\" class=\"col-md-6\">\n\n        <div class=\"form-group\" [ngClass]=\"{'has-error':!f?.controls?.transDate?.valid && f?.controls?.transDate?.touched}\">\n            <label for=\"\">{{\"ClmDate\" | translate }}</label>\n            <div>\n                <datepicker-popup (dateSelected)=\"onDateChange($event,'PS')\" name=\"transDate\" [(ngModel)]=\"transForm.transDate\" required>\n                </datepicker-popup>\n            </div>\n\n        </div>\n        <div class=\"form-input\">\n            <label>{{\"TransactionType\" | translate }}</label>\n            <ul class=\"filterradio\">\n                <li>\n                    <input id=\"execusetype_ra_IN\" name=\"execusetype\" [(ngModel)]=\"transForm.m_transtype\" value=\"1\" type=\"radio\" required>\n                    <label for=\"execusetype_ra_IN\">{{\"ClmIN\" | translate}}</label>\n                </li>\n                <li>\n                    <input id=\"execusetype_ra_OUT\" name=\"execusetype\" [(ngModel)]=\"transForm.m_transtype\" value=\"2\" type=\"radio\" required>\n                    <label for=\"execusetype_ra_OUT\">{{\"ClmOut\" | translate}}</label>\n                </li>\n            </ul>\n        </div>\n        <div class=\"form-group\">\n            <label>{{ \"ClmTime\" | translate}}</label>\n            <div>\n                <input class=\"timepicker form-control\" required [(ngModel)]=\"transForm.m_timeF\" name=\"m_timeF\" id=\"m_timeF\" [options]=\"{disableTextInput: false,'timeFormat': 'H:i',showDuration: false,step:1,scrollDefault:'07:30'}\"\n                    type=\"text\" required #exc_ftime=\"ngModel\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"ddexcexuserequestreson\">{{\"ClmTheReason\" | translate }}</label>\n            <select id=\"ddexcexuserequestreson\" name=\"ModifiedReasonID\" [(ngModel)]=\"transForm.ModifiedReasonID\" class=\"form-control\" #execuseReason_ID=\"ngModel\"\n                required>\n                <option [value]=\"null\" disabled>{{\"lb_PLZSelect\" | translate }}</option>\n                <option *ngFor=\"let reason of reasons\" [value]=\"reason.uptTransReason_id\">{{(this.cultureLang == 'ar' ? reason.uptTransReason_name : reason.uptTransReason_nameEN)}}</option>\n            </select>\n            <!-- <asp:DropDownList  CssClass=\"midcombobox\"  runat=\"server\" ClientIDMode=\"Static\" /> -->\n        </div>\n        <div class=\"form-group\">\n            <label>{{\"NotesLable\" | translate }}</label>\n            <textarea name=\"exc_reason\" id=\"exc_reason\" [(ngModel)]=\"transForm.Note\" col=\"30\" rows=\"10\" class=\"form-control\"></textarea>\n            <!-- <asp:TextBox ID=\"txtexcexuserequestreson\" runat=\"server\" TextMode=\"MultiLine\"  ClientIDMode=\"Static\"></asp:TextBox> -->\n        </div>\n        <!-- <div class=\"form-group col-md-12 PlusOneDay\"> \n            <label for=\"plusoneday\" class=\"checkbox-inline\">\n                <input type=\"checkbox\" id=\"plusoneday\" name=\"plusoneday\"> Actual Date For Transaction + 1 Day\n            </label>\n        </div>-->\n        <div>\n            <button id=\"bt_saveexcexuserequest\" class=\"btn btn-primary btn-lg\" [disabled]=\"!f.valid\">{{\"AddRequest\" | translate }}</button>\n        </div>\n        <!-- {{ JSON.stringify({ reasons }) }} -->\n        <div id=\"errtransmsg\" class=\"alert alert-danger\" style=\"display: none\"></div>\n    </div>\n    <div id=\"transmsgsuccess\" style=\"display: none\">\n        <div class=\"S-alert-s1\">\n            <span>{{\"Yourrequestimplementedsuccessfully\" | translate }}</span>\n\n            <br>\n            <br>\n            <div>\n                <!-- <b> \n                    <a href=\"/\" res-type=\"H\" res-name=\"HomePage\">إضغط هنا للذهاب إلى الصفحة الرئيسية</a>\n                </b>-->\n            </div>\n        </div>\n    </div>\n    <div id=\"transmsgerror\" style=\"display: none\">\n        <div class=\"E-alert-s1\">\n            <span>{{\"AddExcuseErrorMsg\" | translate }}</span>\n\n            <br>\n            <br>\n            <div>\n                <!-- <b> \n                    <a href=\"javascript:location.reload(false)\" res-type=\"H\" res-name=\"Clickheretorefreshpageandtryagain\">إضغط هنا لتحديث الصفحة والمحاولة من جديد</a>\n                </b>-->\n            </div>\n        </div>\n    </div>\n    <div style=\"display: none\">\n        <div id=\"transConfairmDiv\">\n            <div>\n                <span>{{\"ExceuseAddConfairm\" | translate }}</span>\n            </div>\n            <div class=\"cell-12\" id=\"ExecBodyDiv\">\n                <div class=\"row\">\n                    <div class=\"panel-12\">\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\">{{\"ClmDate\" | translate }}</label>\n                            <label id=\"lb_execdate\">{{transForm.transDate}}</label>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\">{{\"TransactionType\" | translate }}</label>\n                            <label id=\"lb_exectype\">{{this.getSelectedTranTypeText()}}</label>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"Reason\">{{\"ClmTheReason\" | translate }}</label>\n                            <label id=\"lb_execreseon\">{{this.getSelectedReasonText()}}</label>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"TransactionTime\">{{\"ClmTime\" | translate }}</label>\n                            <label id=\"lb_exectime\">{{transForm.m_timeF}}</label>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"Notes\">{{\"NotesLable\" | translate }}</label>\n                            <label id=\"lb_execnote\">{{ transForm.Note}}</label>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n\n\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/addtransaction/addtransaction.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var notifications_1 = __webpack_require__("../../../../../src/app/shared/notifications.ts");
var AddtransactionComponent = (function () {
    function AddtransactionComponent(api, router, authService, _notifcation, translate) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this._notifcation = _notifcation;
        this.translate = translate;
        this.transForm = {
            transDate: '',
            DateNo: 0,
            m_transtype: '1',
            m_timeF: '',
            m_time: '',
            ModifiedReasonID: null,
            Note: '',
            emp_id: 0,
            TaskDetails: ''
        };
    }
    Object.defineProperty(AddtransactionComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    AddtransactionComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
        // else {
        this.transForm.emp_id = this.UserInfo.UserEmpID;
        this.GetReasons();
        //}
    };
    AddtransactionComponent.prototype.onDateChange = function (e, d) {
    };
    AddtransactionComponent.prototype.getSelectedReasonText = function () {
        return jQuery("#ddexcexuserequestreson option:selected").text();
    };
    AddtransactionComponent.prototype.GetReasons = function () {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Trans/Reasons/GetAll').subscribe(function (res) {
            if (res.Status == 1) {
                _this.reasons = res.Result;
            }
            console.log(_this.reasons);
        });
    };
    AddtransactionComponent.prototype.submit = function () {
        this.HideExecuseErrormsg();
        this.canAddExc();
    };
    AddtransactionComponent.prototype.canAddExc = function () {
        var _this = this;
        this.transForm.DateNo = (new Date(this.transForm.transDate)).ToOADate();
        this.transForm.m_time = this.transForm.m_timeF;
        this.transForm.m_time = this.transForm.m_time.replace(':', '-');
        this.busy = this.api.getRequest(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Trans/CanAddTransaction/' + this.transForm.DateNo + '/' + this.transForm.m_time + '/' + this.transForm.m_transtype).subscribe(function (res) {
            if (res.Status) {
                _this.message = jQuery("#transConfairmDiv").html();
                _this.openForm();
            }
            else {
                //this._notifcation.showError('', res.Msg );
                _this.ShowExecuseErrormsg(res.Msg);
            }
        }, function (error) {
            _this._notifcation.showError('', error.toString());
        });
        //console.log($event);
    };
    AddtransactionComponent.prototype.openForm = function () {
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.message;
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = true; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Cancel";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'md'); //md,sm,lg
        }.bind(this), 200);
    };
    AddtransactionComponent.prototype.onCloseAlert = function ($event) {
        var _this = this;
        this.transForm.TaskDetails = jQuery("#ExecBodyDiv").html();
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Trans/AddTransByEmp', this.transForm, true).subscribe(function (res) {
            if (res.Status) {
                // console.log('done');
                // jQuery("#addTransRequest").hide();
                // $('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#transmsgsuccess").slideDown("100");
                _this._notifcation.showSuccess('', _this.translate.getValue('Yourrequestimplementedsuccessfully'));
                _this.router.navigate(['']);
            }
            else {
                // jQuery("#addTransRequest").hide();
                // $('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#transmsgerror").slideDown("100");
                _this.ShowExecuseErrormsg(_this.translate.getValue('AddExcuseErrorMsg'));
            }
        }, function (error) {
        });
        //console.log($event);
    };
    AddtransactionComponent.prototype.onOpenAlert = function () { };
    AddtransactionComponent.prototype.onDismissAlert = function () { };
    AddtransactionComponent.prototype.getSelectedTranTypeText = function () {
        return jQuery("label[for='" + jQuery('input[name="execusetype"]:checked').attr("id") + "']").text();
    };
    AddtransactionComponent.prototype.ShowExecuseErrormsg = function (msg) {
        jQuery("#errtransmsg").html(msg);
        jQuery("#errtransmsg").fadeIn(200);
    };
    AddtransactionComponent.prototype.HideExecuseErrormsg = function () {
        jQuery("#errtransmsg").hide();
    };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], AddtransactionComponent.prototype, "alert", void 0);
    AddtransactionComponent = __decorate([
        core_1.Component({
            selector: 'app-addtransaction',
            template: __webpack_require__("../../../../../src/app/addtransaction/addtransaction.component.html"),
            styles: [__webpack_require__("../../../../../src/app/addtransaction/addtransaction.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService,
            notifications_1.Notifications, TranslateService_1.TranslateService])
    ], AddtransactionComponent);
    return AddtransactionComponent;
}());
exports.AddtransactionComponent = AddtransactionComponent;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/busy-backdrop.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @file Component: BusyBackdrop
 * @author yumao<yuzhang.lille@gmail.com>
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var promise_tracker_service_1 = __webpack_require__("../../../../../src/app/angular2-busy/promise-tracker.service.ts");
var inactiveStyle = animations_1.style({
    opacity: 0,
});
var timing = '.3s ease';
var BusyBackdropComponent = (function () {
    function BusyBackdropComponent(tracker) {
        this.tracker = tracker;
    }
    BusyBackdropComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    BusyBackdropComponent = __decorate([
        core_1.Component({
            selector: 'ng-busy-backdrop',
            template: "\n        <div class=\"ng-busy-backdrop\"\n             @fadeInOut\n             *ngIf=\"isActive()\">\n        </div>\n    ",
            animations: [
                animations_1.trigger('fadeInOut', [
                    animations_1.transition('void => *', [
                        inactiveStyle,
                        animations_1.animate(timing)
                    ]),
                    animations_1.transition('* => void', [
                        animations_1.animate(timing, inactiveStyle)
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [promise_tracker_service_1.PromiseTrackerService])
    ], BusyBackdropComponent);
    return BusyBackdropComponent;
}());
exports.BusyBackdropComponent = BusyBackdropComponent;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/busy-config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BusyConfig = (function () {
    function BusyConfig(config) {
        if (config === void 0) { config = {}; }
        for (var option in exports.BUSY_CONFIG_DEFAULTS) {
            this[option] = config[option] != null ? config[option] : exports.BUSY_CONFIG_DEFAULTS[option];
        }
    }
    return BusyConfig;
}());
exports.BusyConfig = BusyConfig;
exports.BUSY_CONFIG_DEFAULTS = {
    template: "\n        <div class=\"ng-busy-default-wrapper\">\n            <div class=\"ng-busy-default-sign\">\n                <div class=\"ng-busy-default-spinner\">\n                    <div class=\"bar1\"></div>\n                    <div class=\"bar2\"></div>\n                    <div class=\"bar3\"></div>\n                    <div class=\"bar4\"></div>\n                    <div class=\"bar5\"></div>\n                    <div class=\"bar6\"></div>\n                    <div class=\"bar7\"></div>\n                    <div class=\"bar8\"></div>\n                    <div class=\"bar9\"></div>\n                    <div class=\"bar10\"></div>\n                    <div class=\"bar11\"></div>\n                    <div class=\"bar12\"></div>\n                </div>\n                <div class=\"ng-busy-default-text\">{{message}}</div>\n            </div>\n        </div>\n    ",
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy'
};


/***/ }),

/***/ "../../../../../src/app/angular2-busy/busy.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var promise_tracker_service_1 = __webpack_require__("../../../../../src/app/angular2-busy/promise-tracker.service.ts");
var inactiveStyle = animations_1.style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
var timing = '.3s ease';
;
var BusyComponent = (function () {
    function BusyComponent(tracker, compiler, translateService) {
        this.tracker = tracker;
        this.compiler = compiler;
        this.translateService = translateService;
    }
    BusyComponent.prototype.ngDoCheck = function () {
        if (this.message.toLowerCase() === 'loading...') {
            this.message = this.translateService.getValue('lb_PleaseWait');
        }
        if (this.message === this.lastMessage) {
            return;
        }
        this.lastMessage = this.message;
        // this.clearDynamicTemplateCache();
        // this.createDynamicTemplate();
    };
    BusyComponent.prototype.ngOnDestroy = function () {
        //  this.clearDynamicTemplateCache();
    };
    BusyComponent.prototype.getModule = function (TemplateComponent) {
        var TemplateModule = (function () {
            function TemplateModule() {
            }
            TemplateModule = __decorate([
                core_1.NgModule({
                    declarations: [TemplateComponent],
                    entryComponents: [TemplateComponent]
                })
            ], TemplateModule);
            return TemplateModule;
        }());
        return TemplateModule;
    };
    BusyComponent.prototype.createDynamicTemplate = function () {
        var _a = this, template = _a.template, message = _a.message;
        var TemplateComponent = (function () {
            function TemplateComponent() {
                this.message = message;
            }
            TemplateComponent = __decorate([
                core_1.Component({ template: template })
            ], TemplateComponent);
            return TemplateComponent;
        }());
        var TemplateModule = this.getModule(TemplateComponent);
        this.TemplateComponent = TemplateComponent;
        this.nmf = this.compiler.compileModuleSync(TemplateModule);
    };
    BusyComponent.prototype.clearDynamicTemplateCache = function () {
        if (!this.nmf) {
            return;
        }
        this.compiler.clearCacheFor(this.nmf.moduleType);
        this.nmf = null;
    };
    BusyComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    BusyComponent = __decorate([
        core_1.Component({
            selector: 'ng-busy',
            template: "\n        <div [class]=\"wrapperClass\" *ngIf=\"isActive()\" @flyInOut>\n           <div class=\"ng-busy-default-wrapper\">\n            <div class=\"ng-busy-default-sign\">\n                <div class=\"ng-busy-default-spinner\">\n                    <div class=\"bar1\"></div>\n                    <div class=\"bar2\"></div>\n                    <div class=\"bar3\"></div>\n                    <div class=\"bar4\"></div>\n                    <div class=\"bar5\"></div>\n                    <div class=\"bar6\"></div>\n                    <div class=\"bar7\"></div>\n                    <div class=\"bar8\"></div>\n                    <div class=\"bar9\"></div>\n                    <div class=\"bar10\"></div>\n                    <div class=\"bar11\"></div>\n                    <div class=\"bar12\"></div>\n                </div>\n                <div class=\"ng-busy-default-text\">{{message}}</div>\n            </div>\n        </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('flyInOut', [
                    animations_1.transition('void => *', [
                        inactiveStyle,
                        animations_1.animate(timing)
                    ]),
                    animations_1.transition('* => void', [
                        animations_1.animate(timing, inactiveStyle)
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [promise_tracker_service_1.PromiseTrackerService,
            core_1.Compiler, TranslateService_1.TranslateService])
    ], BusyComponent);
    return BusyComponent;
}());
exports.BusyComponent = BusyComponent;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/busy.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var util_1 = __webpack_require__("../../../../../src/app/angular2-busy/util.ts");
var promise_tracker_service_1 = __webpack_require__("../../../../../src/app/angular2-busy/promise-tracker.service.ts");
var busy_service_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy.service.ts");
var busy_component_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy.component.ts");
var busy_backdrop_component_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy-backdrop.component.ts");
/**
 * ### Syntax
 *
 * - `<div [ngBusy]="busy">...</div>`
 * - `<div [ngBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ngBusy]="{busy: busy, message: 'Loading...', backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
var BusyDirective = (function () {
    function BusyDirective(service, tracker, cfResolver, vcRef, injector) {
        this.service = service;
        this.tracker = tracker;
        this.cfResolver = cfResolver;
        this.vcRef = vcRef;
        this.injector = injector;
    }
    BusyDirective.prototype.normalizeOptions = function (options) {
        if (!options) {
            options = { busy: null };
        }
        else if (Array.isArray(options)
            || options instanceof Promise
            || options instanceof Subscription_1.Subscription) {
            options = { busy: options };
        }
        options = Object.assign({}, this.service.config, options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }
        return options;
    };
    BusyDirective.prototype.dectectOptionsChange = function () {
        if (util_1.equals(this.optionsNorm, this.optionsRecord)) {
            return false;
        }
        this.optionsRecord = this.optionsNorm;
        return true;
    };
    // As ngOnChanges does not work on Object detection, ngDoCheck is using
    BusyDirective.prototype.ngDoCheck = function () {
        var options = this.optionsNorm = this.normalizeOptions(this.options);
        if (!this.dectectOptionsChange()) {
            return;
        }
        if (this.busyRef) {
            this.busyRef.instance.message = options.message;
        }
        !util_1.equals(options.busy, this.tracker.promiseList)
            && this.tracker.reset({
                promiseList: options.busy,
                delay: options.delay,
                minDuration: options.minDuration
            });
        if (!this.busyRef
            || this.template !== options.template
            || this.backdrop !== options.backdrop) {
            this.destroyComponents();
            this.template = options.template;
            this.backdrop = options.backdrop;
            options.backdrop && this.createBackdrop();
            this.createBusy();
        }
    };
    BusyDirective.prototype.ngOnDestroy = function () {
        this.destroyComponents();
    };
    BusyDirective.prototype.destroyComponents = function () {
        this.busyRef && this.busyRef.destroy();
        this.backdropRef && this.backdropRef.destroy();
    };
    BusyDirective.prototype.createBackdrop = function () {
        var backdropFactory = this.cfResolver.resolveComponentFactory(busy_backdrop_component_1.BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    };
    BusyDirective.prototype.createBusy = function () {
        var busyFactory = this.cfResolver.resolveComponentFactory(busy_component_1.BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);
        var _a = this.optionsNorm, message = _a.message, wrapperClass = _a.wrapperClass, template = _a.template;
        var instance = this.busyRef.instance;
        instance.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    };
    __decorate([
        core_1.Input('ngBusy'),
        __metadata("design:type", Object)
    ], BusyDirective.prototype, "options", void 0);
    BusyDirective = __decorate([
        core_1.Directive({
            selector: '[ngBusy]',
            providers: [promise_tracker_service_1.PromiseTrackerService]
        }),
        __metadata("design:paramtypes", [busy_service_1.BusyService,
            promise_tracker_service_1.PromiseTrackerService,
            core_1.ComponentFactoryResolver,
            core_1.ViewContainerRef,
            core_1.Injector])
    ], BusyDirective);
    return BusyDirective;
}());
exports.BusyDirective = BusyDirective;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/busy.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
// import {JitCompilerFactory} from '@angular/compiler';
var busy_directive_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy.directive.ts");
var busy_service_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy.service.ts");
var busy_backdrop_component_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy-backdrop.component.ts");
var busy_component_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy.component.ts");
var busy_config_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy-config.ts");
// Workaround for Compiler in AOT
// https://github.com/angular/angular/issues/15510#issuecomment-294301758
// export function createJitCompiler() {
//     return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
// }
var BusyModule = (function () {
    function BusyModule() {
    }
    BusyModule_1 = BusyModule;
    BusyModule.forRoot = function (config) {
        return {
            ngModule: BusyModule_1,
            providers: [
                { provide: busy_config_1.BusyConfig, useValue: config }
            ]
        };
    };
    BusyModule = BusyModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                busy_directive_1.BusyDirective,
                busy_component_1.BusyComponent,
                busy_backdrop_component_1.BusyBackdropComponent
            ],
            providers: [
                busy_service_1.BusyService
                //,{provide: Compiler, useFactory: createJitCompiler}
            ],
            exports: [busy_directive_1.BusyDirective],
            entryComponents: [
                busy_component_1.BusyComponent,
                busy_backdrop_component_1.BusyBackdropComponent
            ]
        })
    ], BusyModule);
    return BusyModule;
    var BusyModule_1;
}());
exports.BusyModule = BusyModule;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/busy.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var busy_config_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy-config.ts");
var BusyService = (function () {
    function BusyService(config) {
        this.config = config || new busy_config_1.BusyConfig();
    }
    BusyService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [busy_config_1.BusyConfig])
    ], BusyService);
    return BusyService;
}());
exports.BusyService = BusyService;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/promise-tracker.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var PromiseTrackerService = (function () {
    function PromiseTrackerService() {
        this.promiseList = [];
        this.delayJustFinished = false;
    }
    PromiseTrackerService.prototype.reset = function (options) {
        var _this = this;
        this.minDuration = options.minDuration;
        this.promiseList = [];
        options.promiseList.forEach(function (promise) {
            if (!promise || promise['busyFulfilled']) {
                return;
            }
            _this.addPromise(promise);
        });
        if (this.promiseList.length === 0) {
            return;
        }
        this.delayJustFinished = false;
        if (options.delay) {
            this.delayPromise = setTimeout(function () {
                _this.delayPromise = null;
                _this.delayJustFinished = true;
            }, options.delay);
        }
        if (options.minDuration) {
            this.durationPromise = setTimeout(function () {
                _this.durationPromise = null;
            }, options.minDuration + (options.delay || 0));
        }
    };
    PromiseTrackerService.prototype.addPromise = function (promise) {
        var _this = this;
        if (this.promiseList.indexOf(promise) !== -1) {
            return;
        }
        this.promiseList.push(promise);
        if (promise instanceof Promise) {
            promise.then.call(promise, function () { return _this.finishPromise(promise); }, function () { return _this.finishPromise(promise); });
        }
        else if (promise instanceof Subscription_1.Subscription) {
            promise.add(function () { return _this.finishPromise(promise); });
        }
    };
    PromiseTrackerService.prototype.finishPromise = function (promise) {
        promise['busyFulfilled'] = true;
        var index = this.promiseList.indexOf(promise);
        if (index === -1) {
            return;
        }
        this.promiseList.splice(index, 1);
    };
    PromiseTrackerService.prototype.isActive = function () {
        if (this.delayPromise) {
            return false;
        }
        if (!this.delayJustFinished) {
            if (this.durationPromise) {
                return true;
            }
            return this.promiseList.length > 0;
        }
        this.delayJustFinished = false;
        if (this.promiseList.length === 0) {
            this.durationPromise = null;
        }
        return this.promiseList.length > 0;
    };
    PromiseTrackerService = __decorate([
        core_1.Injectable()
    ], PromiseTrackerService);
    return PromiseTrackerService;
}());
exports.PromiseTrackerService = PromiseTrackerService;


/***/ }),

/***/ "../../../../../src/app/angular2-busy/util.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}
exports.isDate = isDate;
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isWindow(obj) {
    return obj && obj.window === obj;
}
exports.isWindow = isWindow;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isDefined(value) {
    return typeof value !== 'undefined';
}
exports.isDefined = isDefined;
function equals(o1, o2) {
    if (o1 === o2) {
        return true;
    }
    ;
    if (o1 === null || o2 === null) {
        return false;
    }
    if (o1 !== o1 && o2 !== o2) {
        return true; // NaN === NaN
    }
    var t1 = typeof o1;
    var t2 = typeof o2;
    var length;
    var key;
    var keySet;
    if (t1 === t2 && t1 === 'object') {
        if (Array.isArray(o1)) {
            if (!Array.isArray(o2)) {
                return false;
            }
            if ((length = o1.length) === o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key])) {
                        return false;
                    }
                }
                return true;
            }
        }
        else if (isDate(o1)) {
            if (!isDate(o2)) {
                return false;
            }
            return equals(o1.getTime(), o2.getTime());
        }
        else if (isRegExp(o1)) {
            if (!isRegExp(o2)) {
                return false;
            }
            return o1.toString() === o2.toString();
        }
        else {
            if (isWindow(o1) || isWindow(o2)
                || Array.isArray(o2) || isDate(o2) || isRegExp(o2)) {
                return false;
            }
            ;
            keySet = Object.create(null);
            for (key in o1) {
                if (key.charAt(0) === '$' || isFunction(o1[key])) {
                    continue;
                }
                ;
                if (!equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet)
                    && key.charAt(0) !== '$'
                    && isDefined(o2[key])
                    && !isFunction(o2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
exports.equals = equals;


/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\r\n<router-outlet></router-outlet>\r\n<simple-notifications [options]=\"getOption()\"></simple-notifications>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var AppComponent = (function () {
    function AppComponent(document) {
        this.document = document;
        this.title = 'app';
        this.isEnglish = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var rtlcss = this.document.getElementById('rtlcss');
        // "assets/css/bootstrap-rtl.min.css",
        var lang = global_settings_1.AppSettings.getCurrentLanguage;
        if (lang === 'ar') {
            rtlcss.disabled = false;
            var el = document.getElementsByTagName('body')[0];
            var x = el.classList.contains('smart-rtl');
            if (!x) {
                el.classList.add('smart-rtl');
            }
        }
        else {
            rtlcss.disabled = true;
            var el = document.getElementsByTagName('body')[0];
            var x = el.classList.contains('smart-rtl');
            if (!!x) {
                el.classList.remove('smart-rtl');
            }
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var element = document.getElementById('preloader');
        if (element) {
            setTimeout(function () {
                element.style['display'] = 'none';
            }, 1000);
        }
    };
    AppComponent.prototype.getOption = function () {
        return {
            position: (!this.isEnglish ? ['bottom', 'left'] : ['bottom', 'right']),
            timeOut: 5000,
            lastOnBottom: true,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 10000,
            preventDuplicates: true,
            preventLastDuplicates: 'visible',
            theClass: 'notificationclass',
            rtl: !this.isEnglish,
            animate: (!this.isEnglish ? 'fromLeft' : 'fromRight'),
            maxStacks: 8
        };
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var stringformat_pipe_1 = __webpack_require__("../../../../../src/app/shared/stringformat.pipe.ts");
var accessdenied_component_1 = __webpack_require__("../../../../../src/app/accessdenied/accessdenied.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
var authguard_1 = __webpack_require__("../../../../../src/app/shared/authguard.ts");
var angular_datatables_module_1 = __webpack_require__("../../../../../src/app/datatable/angular-datatables.module.ts");
var TranslateModule_1 = __webpack_require__("../../../../../src/app/shared/TranslateModule.ts");
var tab_modal_1 = __webpack_require__("../../../../../src/app/Tap/tab.modal.ts");
var busy_module_1 = __webpack_require__("../../../../../src/app/angular2-busy/busy.module.ts");
var modal_module_1 = __webpack_require__("../../../../../src/app/Modals/modal.module.ts");
var datepicker_module_1 = __webpack_require__("../../../../../src/app/datepicker/datepicker.module.ts");
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var angular2_notifications_1 = __webpack_require__("../../../../angular2-notifications/angular2-notifications.umd.js");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var excuse_component_1 = __webpack_require__("../../../../../src/app/excuse/excuse.component.ts");
var vacation_component_1 = __webpack_require__("../../../../../src/app/vacation/vacation.component.ts");
var reports_component_1 = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
var mytasks_component_1 = __webpack_require__("../../../../../src/app/mytasks/mytasks.component.ts");
var task_details_component_1 = __webpack_require__("../../../../../src/app/task-details/task-details.component.ts");
var myrequests_component_1 = __webpack_require__("../../../../../src/app/myrequests/myrequests.component.ts");
var task_action_component_1 = __webpack_require__("../../../../../src/app/task-action/task-action.component.ts");
var navbar_component_1 = __webpack_require__("../../../../../src/app/navbar/navbar.component.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var timepicker_module_1 = __webpack_require__("../../../../../src/app/timepicker/timepicker.module.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var not_found_component_1 = __webpack_require__("../../../../../src/app/not-found/not-found.component.ts");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var ng2_validation_1 = __webpack_require__("../../../../ng2-validation/dist/index.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var notifications_1 = __webpack_require__("../../../../../src/app/shared/notifications.ts");
var addtransaction_component_1 = __webpack_require__("../../../../../src/app/addtransaction/addtransaction.component.ts");
var my_report_component_1 = __webpack_require__("../../../../../src/app/reports/my-report/my-report.component.ts");
var mgr_report_component_1 = __webpack_require__("../../../../../src/app/reports/mgr-report/mgr-report.component.ts");
var routes = [
    {
        path: "",
        component: home_component_1.HomeComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "excuce",
        component: excuse_component_1.ExcuseComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "myrequests/:taskid",
        component: task_details_component_1.TaskDetailsComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "myrequests",
        component: myrequests_component_1.MyrequestsComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "mytasks/:taskid",
        component: task_action_component_1.TaskActionComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "mytasks",
        component: mytasks_component_1.MytasksComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "report",
        component: reports_component_1.ReportsComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "fingerprint",
        component: addtransaction_component_1.AddtransactionComponent, canActivate: [authguard_1.AuthGuard]
    },
    {
        path: "login",
        component: login_component_1.LoginComponent
    },
    {
        path: "accessdenied",
        component: accessdenied_component_1.AccessDeniedComponent
    },
    {
        path: "**",
        component: accessdenied_component_1.AccessDeniedComponent
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                excuse_component_1.ExcuseComponent,
                vacation_component_1.VacationComponent,
                reports_component_1.ReportsComponent,
                mytasks_component_1.MytasksComponent,
                task_details_component_1.TaskDetailsComponent,
                myrequests_component_1.MyrequestsComponent,
                task_action_component_1.TaskActionComponent,
                navbar_component_1.NavbarComponent,
                home_component_1.HomeComponent, login_component_1.LoginComponent,
                not_found_component_1.NotFoundComponent,
                addtransaction_component_1.AddtransactionComponent,
                my_report_component_1.MyReportComponent,
                mgr_report_component_1.MgrReportComponent,
                accessdenied_component_1.AccessDeniedComponent, stringformat_pipe_1.StringFormatPipe
            ],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule.forRoot(),
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes, { useHash: true }),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                datepicker_module_1.PopupDatepickerModule,
                timepicker_module_1.TimepickerModule,
                modal_module_1.ModalModule,
                ng2_validation_1.CustomFormsModule,
                busy_module_1.BusyModule,
                tab_modal_1.NgbTabsetModule.forRoot(),
                TranslateModule_1.TranslateModule.forRoot(),
                angular_datatables_module_1.DataTablesModule,
                angular2_notifications_1.SimpleNotificationsModule.forRoot(),
            ],
            exports: [angular2_notifications_1.SimpleNotificationsModule],
            providers: [
                {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                },
                {
                    provide: core_1.LOCALE_ID,
                    useValue: 'en'
                }, notifications_1.Notifications
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/datatable/angular-datatables.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference types="datatables.net" />
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var DataTableDirective = (function () {
    function DataTableDirective(el) {
        this.el = el;
        /**
         * The DataTable option you pass to configure your table.
         */
        this.dtOptions = {};
        this.onPageChange = new core_1.EventEmitter();
    }
    DataTableDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dtTrigger) {
            this.dtTrigger.subscribe(function () {
                _this.displayTable();
            });
        }
        else {
            this.displayTable();
        }
    };
    DataTableDirective.prototype.selectRow = function (row) {
        var table = $(this.el.nativeElement).DataTable();
        if ($(row).hasClass('selected')) {
            $(row).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(row).addClass('selected');
        }
    };
    DataTableDirective.prototype.unSelectRows = function () {
        var table = $(this.el.nativeElement).DataTable();
        table.$('tr.selected').removeClass('selected');
    };
    DataTableDirective.prototype.show = function (select) {
        $(this.el.nativeElement).DataTable().row().show(select);
    };
    DataTableDirective.prototype.showRow = function (id, select) {
        $(this.el.nativeElement).DataTable().row().showRow(id, select);
    };
    DataTableDirective.prototype.updateRow = function (id, data, select) {
        $(this.el.nativeElement).DataTable().row().updateRow(id, data, select);
    };
    DataTableDirective.prototype.addRow = function (data, select) {
        $(this.el.nativeElement).DataTable().row().addRow(data, select);
    };
    DataTableDirective.prototype.getRow = function (id) {
        $(this.el.nativeElement).DataTable().row().getRow(id);
    };
    DataTableDirective.prototype.deleteRow = function (id) {
        $(this.el.nativeElement).DataTable().row().deleteRow(id);
    };
    DataTableDirective.prototype.Exists = function (id) {
        $(this.el.nativeElement).DataTable().row().Exists(id);
    };
    DataTableDirective.prototype.drawRow = function (id) {
        $(this.el.nativeElement).DataTable().row().drawRow(id);
    };
    DataTableDirective.prototype.setData = function (data) {
        this.dtOptions.data = data;
    };
    DataTableDirective.prototype.displayTable = function () {
        var _this = this;
        this.dtInstance = new Promise(function (resolve, reject) {
            Promise.resolve(_this.dtOptions).then(function (dtOptions) {
                // Using setTimeout as a "hack" to be "part" of NgZone
                setTimeout(function () {
                    var dt = $(_this.el.nativeElement).DataTable(dtOptions);
                    if (_this.withPaging) {
                        dt.on('page.dt', function () {
                            var info = dt.page.info();
                            this.onPageChange.emit(info);
                        }.bind(_this));
                    }
                    resolve(dt);
                });
            });
        });
    };
    DataTableDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.dtInstance) {
            this.dtInstance.then(function (dtInstance) {
                dtInstance.rows().clear();
                dtInstance.destroy(true);
                _this.dtInstance = null;
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableDirective.prototype, "dtOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Rx_1.Subject)
    ], DataTableDirective.prototype, "dtTrigger", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableDirective.prototype, "withPaging", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableDirective.prototype, "onPageChange", void 0);
    DataTableDirective = __decorate([
        core_1.Directive({
            selector: '[datatable]',
            exportAs: 'datatable'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DataTableDirective);
    return DataTableDirective;
}());
exports.DataTableDirective = DataTableDirective;


/***/ }),

/***/ "../../../../../src/app/datatable/angular-datatables.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var angular_datatables_directive_1 = __webpack_require__("../../../../../src/app/datatable/angular-datatables.directive.ts");
var DataTablesModule = (function () {
    function DataTablesModule() {
    }
    DataTablesModule_1 = DataTablesModule;
    DataTablesModule.forRoot = function () {
        return {
            ngModule: DataTablesModule_1
        };
    };
    DataTablesModule = DataTablesModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [angular_datatables_directive_1.DataTableDirective],
            exports: [angular_datatables_directive_1.DataTableDirective]
        })
    ], DataTablesModule);
    return DataTablesModule;
    var DataTablesModule_1;
}());
exports.DataTablesModule = DataTablesModule;


/***/ }),

/***/ "../../../../../src/app/datepicker/datepicker-popup.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var moment_ = __webpack_require__("../../../../moment/moment.js");
var moment = moment_.default || moment_;
exports.CALENDAR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return PopupDatepickerComponent; }),
    multi: true
};
exports.CALENDAR_VALUE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return PopupDatepickerComponent; }),
    multi: true
};
var PopupDatepickerComponent = (function () {
    function PopupDatepickerComponent() {
        this.dateSelected = new core_1.EventEmitter();
        this.format = 'yyyy-mm-dd';
        this.momentFormat = 'YYYY-MM-DD';
        this.container = "";
        this.disabled = false;
        this.allowClear = false;
        this.viewDate = '';
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.validateFn = function () { };
        this.genratedynamicKey();
    }
    // implements functions
    PopupDatepickerComponent.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    PopupDatepickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    PopupDatepickerComponent.prototype.writeValue = function (value) {
        if (!value) {
            value = '';
        }
        this.viewDate = value;
        var datepickerElement = jQuery('#' + this.dpID).val(this.viewDate);
        this.onChangeCallback(value);
        datepickerElement.val(this.viewDate);
        //   if (this.viewDate) {
        datepickerElement.datepicker('update', this.viewDate);
        //}
    };
    PopupDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    PopupDatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    PopupDatepickerComponent.prototype.genratedynamicKey = function () {
        this.dpID = 'dp_' + (Math.floor((Math.random() * 100000) + 1)).toString();
        return this.dpID;
    };
    Object.defineProperty(PopupDatepickerComponent.prototype, "value", {
        // Properties
        get: function () {
            return this.viewDate;
        },
        set: function (value) {
            var date = (value instanceof moment) ? value : moment(value, this.momentFormat);
            this.viewDate = date.format(this.momentFormat);
            this.onChangeCallback(value);
            var datepickerElement = jQuery('#' + this.dpID).val(this.viewDate);
            // datepickerElement.datepicker('update', this.viewDate);
        },
        enumerable: true,
        configurable: true
    });
    PopupDatepickerComponent.prototype.ngOnInit = function () {
    };
    PopupDatepickerComponent.prototype.ngOnDestroy = function () {
        var datepickerElement = jQuery('#' + this.dpID);
        datepickerElement.datepicker('destroy');
        datepickerElement.datepicker('remove');
    };
    PopupDatepickerComponent.prototype.initCalendar = function () {
        var _this = this;
        var lang = global_settings_1.AppSettings.CurrentLang;
        //this.translate.get('Language').subscribe((res: string) => {
        //  lang = res;
        var datepickerElement = jQuery('#' + this.dpID);
        datepickerElement.prop('readonly', true);
        datepickerElement.datepicker({
            language: lang,
            autoclose: true,
            todayHighlight: true,
            toggleActive: true,
            orientation: 'auto',
            format: this.format,
            todayBtn: true,
            container: (this.container.length === 0 ? '#div_' + this.dpID : this.container) //'#div_' + this.dpID
        });
        datepickerElement.on('changeDate', function (e) {
            if (e.date === undefined) {
                e.target.value = _this.viewDate;
                e.date = new Date(_this.viewDate);
                datepickerElement.datepicker('update', _this.viewDate);
            }
            var date = (e.date instanceof moment) ? e.date : moment(e.date, _this.momentFormat);
            _this.viewDate = date.format(_this.momentFormat);
            _this.value = _this.viewDate;
            _this.dateSelected.emit(_this.viewDate);
        });
        datepickerElement.on('hide', function (e) {
            _this.onTouchedCallback();
        });
        // });
    };
    PopupDatepickerComponent.prototype.clear = function () {
        this.writeValue(null);
        this.dateSelected.emit(this.viewDate);
    };
    PopupDatepickerComponent.prototype.show = function () {
        if (this.disabled)
            return;
        var datepickerElement = jQuery('#' + this.dpID);
        datepickerElement.datepicker('show');
    };
    PopupDatepickerComponent.prototype.setMinDate = function (value) {
        var datepickerElement = jQuery('#' + this.dpID);
        datepickerElement.datepicker('setStartDate', value);
    };
    PopupDatepickerComponent.prototype.setMaxDate = function (value) {
        var datepickerElement = jQuery('#' + this.dpID);
        datepickerElement.datepicker('setEndDate', value);
    };
    PopupDatepickerComponent.prototype.ngAfterViewInit = function () {
        if (this.dpID !== undefined) {
            this.initCalendar();
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PopupDatepickerComponent.prototype, "dateSelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupDatepickerComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupDatepickerComponent.prototype, "momentFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupDatepickerComponent.prototype, "container", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PopupDatepickerComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PopupDatepickerComponent.prototype, "allowClear", void 0);
    PopupDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'datepicker-popup',
            template: "\n    <div class=\"input-group date\" [attr.id]=\"'div_'+ dpID\">\n       <input type=\"text\" class=\"form-control\" [attr.id]=\"dpID\" [disabled]=\"disabled\" />\n       <span (click)=\"clear()\" *ngIf=\"allowClear && !disabled\" class=\"input-group-addon\"><i class=\"glyphicon glyphicon-remove\"></i> </span>\n       <span  class=\"input-group-addon\" (click)=\"show()\">\n            <i class=\"glyphicon glyphicon-th\">\n            </i>\n       </span>\n    </div>",
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [exports.CALENDAR_VALUE_ACCESSOR, exports.CALENDAR_VALUE_VALIDATOR]
        }),
        __metadata("design:paramtypes", [])
    ], PopupDatepickerComponent);
    return PopupDatepickerComponent;
}());
exports.PopupDatepickerComponent = PopupDatepickerComponent;


/***/ }),

/***/ "../../../../../src/app/datepicker/datepicker.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var datepicker_popup_1 = __webpack_require__("../../../../../src/app/datepicker/datepicker-popup.ts");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
__export(__webpack_require__("../../../../../src/app/datepicker/datepicker-popup.ts"));
var PopupDatepickerModule = (function () {
    function PopupDatepickerModule() {
    }
    PopupDatepickerModule = __decorate([
        core_1.NgModule({
            declarations: [datepicker_popup_1.PopupDatepickerComponent],
            entryComponents: [datepicker_popup_1.PopupDatepickerComponent],
            imports: [common_1.CommonModule],
            exports: [datepicker_popup_1.PopupDatepickerComponent]
        })
    ], PopupDatepickerModule);
    return PopupDatepickerModule;
}());
exports.PopupDatepickerModule = PopupDatepickerModule;


/***/ }),

/***/ "../../../../../src/app/excuse/excuse.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/excuse/excuse.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" (ngSubmit)=\"submit()\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n    <div id=\"execuserequest\" class=\"col-md-6\">\n        <div class=\"form-group\">\n            <label>{{ \"ExcuseTypeLable\" | translate}}</label>\n            <ul class=\"list-group\">\n                <li class=\"list-group-item\">\n                    <!-- -->\n                    <input id=\"execusetype_ra_normal\" name=\"exc_type\" [(ngModel)]=\"excuseForm.exc_type\" (click)=\"GetReasons('1')\" value=\"1\" type=\"radio\"\n                        required>\n                    <label for=\"execusetype_ra_normal\">{{ \"ExcuseTypePersonal\" | translate}} </label>\n                </li>\n                <li class=\"list-group-item\">\n                    <input id=\"execusetype_ra_full\" name=\"exc_type\" [(ngModel)]=\"excuseForm.exc_type\" (click)=\"GetReasons('2')\" value=\"2\" type=\"radio\"\n                        required>\n                    <label for=\"execusetype_ra_full\">{{ \"ExcuseTypeOfficialDuty\" | translate}}</label>\n                </li>\n            </ul>\n            <!-- <div class=\"alert alert-danger\" *ngIf=\"type.touched && !type.valid\">الرجاء اختيار نوع الطلب</div> -->\n        </div>\n        <div class=\"form-group\" [ngClass]=\"{'has-error':!f?.controls?.exc_dateF?.valid && f?.controls?.exc_dateF?.touched}\">\n            <label for=\"\">{{\"ExcuseDateClm\" | translate }}</label>\n            <div>\n                <datepicker-popup container='body' (dateSelected)=\"onDateChange($event,'PS')\" name=\"exc_dateF\" [(ngModel)]=\"excuseForm.exc_dateF\"\n                    required>\n                </datepicker-popup>\n            </div>\n\n        </div>\n        <div class=\"form-group\">\n            <label for=\"ddexcexuserequestreson\">{{\"Excuse_Reason\" | translate }}</label>\n            <select id=\"ddexcexuserequestreson\" name=\"execuseReason_ID\" [(ngModel)]=\"excuseForm.execuseReason_ID\" class=\"form-control\"\n                #execuseReason_ID=\"ngModel\" required>\n                <option [value]=\"null\" disabled>{{\"lb_PLZSelect\" | translate }}</option>\n                <option *ngFor=\"let reason of reasons\" [value]=\"reason.execuseReason_id\">{{(this.cultureLang == 'ar' ? reason.execuseReason_name : reason.execuseReason_nameEN) }}</option>\n            </select>\n            <!-- <asp:DropDownList  CssClass=\"midcombobox\"  runat=\"server\" ClientIDMode=\"Static\" /> -->\n        </div>\n        <div class=\"form-group\">\n            <label>{{\"ExcuseTime\" | translate }}</label>\n            <div>\n                <label> {{\"FromLable\" | translate }} </label>\n                <input class=\"timepicker form-control\" required [(ngModel)]=\"excuseForm.exc_ftime\" name=\"exc_ftime\" id=\"exc_ftime\" [options]=\"{disableTextInput: false,'timeFormat': 'H:i',showDuration: false,step:1,scrollDefault:'07:30'}\"\n                    type=\"text\" required #exc_ftime=\"ngModel\">\n            </div>\n            <div>\n                <label> {{\"ToLable\" | translate }} </label>\n                <input class=\"timepicker form-control\" [(ngModel)]=\"excuseForm.exc_ttime\" name=\"exc_ttime\" id=\"exc_ttime\" [options]=\"{disableTextInput: false,'timeFormat': 'H:i',showDuration: false,step:1,scrollDefault:'09:30'}\"\n                    type=\"text\" required #exc_ttime=\"ngModel\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label>{{\"NotesLable\" | translate }}</label>\n            <textarea name=\"exc_reason\" id=\"exc_reason\" [(ngModel)]=\"excuseForm.exc_reason\" col=\"30\" rows=\"10\" class=\"form-control\"></textarea>\n            <!-- <asp:TextBox ID=\"txtexcexuserequestreson\" runat=\"server\" TextMode=\"MultiLine\"  ClientIDMode=\"Static\"></asp:TextBox> -->\n        </div>\n        <div>\n            <button id=\"bt_saveexcexuserequest\" class=\"btn btn-primary btn-lg\" [disabled]=\"!f.valid\">{{\"AddRequest\" | translate }}</button>\n        </div>\n        <!-- {{ JSON.stringify({ reasons }) }} -->\n        <div class=\"alert alert-danger\" id=\"errexecusemsg\" style=\"display:none\"></div>\n    </div>\n    <div id=\"execusemsgsuccess\" style=\"display: none\">\n        <div class=\"S-alert-s1\">\n            <span>{{\"Yourrequestimplementedsuccessfully\" | translate }}</span>\n\n            <br>\n            <br>\n            <div>\n                <!-- <b> \n                    <a href=\"/\" res-type=\"H\" res-name=\"HomePage\">إضغط هنا للذهاب إلى الصفحة الرئيسية</a>\n                </b>-->\n            </div>\n        </div>\n    </div>\n    <div id=\"execusemsgerror\" style=\"display: none\">\n        <div class=\"E-alert-s1\">\n            <span>{{\"AddExcuseErrorMsg\" | translate }}</span>\n\n            <br>\n            <br>\n            <div>\n                <!-- <b> \n                    <a href=\"javascript:location.reload(false)\" res-type=\"H\" res-name=\"Clickheretorefreshpageandtryagain\">إضغط هنا لتحديث الصفحة والمحاولة من جديد</a>\n                </b>-->\n            </div>\n        </div>\n    </div>\n    <div style=\"display: none\">\n        <div id=\"ExecConfairmDiv\">\n            <div>\n                <span>{{\"ExceuseAddConfairm\" | translate }}</span>\n\n            </div>\n            <div id=\"ExecBodyDiv\">\n                <div class=\"row\">\n                    <div class=\"panel-12\">\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"ExcuseDateClm\">{{\"ExcuseDateClm\" | translate }}</label>\n                            <span id=\"lb_execdate\"> {{excuseForm.exc_dateF}} </span>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"ExcuseTypeLable\">{{ \"ExcuseTypeLable\" | translate}}</label>\n                            <span id=\"lb_exectype\">{{this.getExcuseTypeText()}}</span>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"Excuse_Reason\">{{\"Excuse_Reason\" | translate }}</label>\n                            <span id=\"lb_execreseon\">{{this.getSelectedReasonText()}} </span>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"ExcuseTime\">{{\"ExcuseTime\" | translate }}</label>\n                            <span id=\"lb_exectime\">\n                                <span res-type=\"H\" res-name=\"FromLable\"> {{\"FromLable\" | translate }} </span>\n                                <span> {{this.excuseForm.exc_ftime}}</span>\n                                <span res-type=\"H\" res-name=\"ToLable\"> {{\"ToLable\" | translate }} </span>\n                                <span>{{this.excuseForm.exc_ttime }}</span>\n                                <span res-type=\"H\" res-name=\"ExcuseTotalLable\">{{\"ExcuseTotalLable\" | translate }}</span>\n                            </span>\n                            <b>\n                                <span id=\"lb_exectotaltime\">{{this.CalculateExecuseHours() }}</span>\n                            </b>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-3 pr0\" res-type=\"H\" res-name=\"NotesLable\">{{\"NotesLable\" | translate }}</label>\n                            <span id=\"lb_execnote\">{{ this.excuseForm.exc_reason }}</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>\n\n\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/excuse/excuse.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var notifications_1 = __webpack_require__("../../../../../src/app/shared/notifications.ts");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var ExcuseComponent = (function () {
    function ExcuseComponent(api, router, authService, _notifcation, translate) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this._notifcation = _notifcation;
        this.translate = translate;
        this.excuseForm = { exc_empid: 0, exc_ftime: '', exc_ttime: '', exc_type: '1', exc_date: 0, exc_dateF: '', execuseReason_ID: null, exc_reason: '', TaskDetails: '' };
    }
    ExcuseComponent.prototype.ngAfterViewInit = function () {
        this.GetReasons(1);
    };
    Object.defineProperty(ExcuseComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    ExcuseComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
        // else
        this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
    };
    ExcuseComponent.prototype.onDateChange = function (e, d) {
    };
    ExcuseComponent.prototype.GetReasons = function (type) {
        var _this = this;
        this.excuseForm.execuseReason_ID = null;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Excuse/Reasons/GetAll').subscribe(function (res) {
            if (res.Status == 1) {
                _this.reasons = res.Result.filter(function (e) { return e.exc_type == type; });
            }
            console.log(_this.reasons);
        });
        // console.log(this.excuseForm);
    };
    ExcuseComponent.prototype.submit = function () {
        this.HideExecuseErrormsg();
        var totexecTime = this.CalculateExecuseHours();
        //console.log(totexecTime);
        if (totexecTime == "") {
            //this._notifcation.showError('', this.translate.getValue('ExcuceValidationErr') );
            this.ShowExecuseErrormsg(this.translate.getValue('ExcuceValidationErr'));
            return;
        }
        else {
            this.canAddExc();
        }
    };
    ExcuseComponent.prototype.getSelectedReasonText = function () {
        return jQuery("#ddexcexuserequestreson option:selected").text();
    };
    ExcuseComponent.prototype.getExcuseTypeText = function () {
        return jQuery("label[for='" + jQuery('input[name="exc_type"]:checked').attr("id") + "']").text();
    };
    ExcuseComponent.prototype.ShowExecuseErrormsg = function (msg) {
        jQuery("#errexecusemsg").html(msg);
        jQuery("#errexecusemsg").fadeIn(200);
    };
    ExcuseComponent.prototype.HideExecuseErrormsg = function () {
        jQuery("#errexecusemsg").hide();
    };
    ExcuseComponent.prototype.canAddExc = function () {
        var _this = this;
        this.excuseForm.exc_date = (new Date(this.excuseForm.exc_dateF)).ToOADate();
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Excuse/CanAdd', this.excuseForm, true).subscribe(function (res) {
            if (res.Status) {
                _this.message = jQuery("#ExecConfairmDiv").html();
                _this.openForm();
            }
            else {
                _this.ShowExecuseErrormsg(res.Msg);
                //this._notifcation.showError('',res.Msg);
            }
        }, function (error) {
            _this.ShowExecuseErrormsg(error.toString());
            //this._notifcation.showError('',error.toString());
        });
        //console.log($event);
    };
    ExcuseComponent.prototype.openForm = function () {
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.message;
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = true; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Cancel";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'md'); //md,sm,lg
        }.bind(this), 200);
    };
    ExcuseComponent.prototype.onCloseAlert = function ($event) {
        var _this = this;
        this.excuseForm.TaskDetails = jQuery("#ExecBodyDiv").html();
        this.excuseForm.exc_date = (new Date(this.excuseForm.exc_dateF)).ToOADate();
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Excuse/AddByEmp', this.excuseForm, true).subscribe(function (res) {
            if (res.Status) {
                _this._notifcation.showSuccess('', _this.translate.getValue('Yourrequestimplementedsuccessfully'));
                _this.router.navigate(['']);
                //console.log('done');
                // jQuery("#execuserequest").hide();
                // $('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#execusemsgsuccess").slideDown("100");
            }
            else {
                _this.ShowExecuseErrormsg(_this.translate.getValue('AddExcuseErrorMsg'));
                // jQuery("#execuserequest").hide();
                // $('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#execusemsgerror").slideDown("100");
            }
        }, function (error) {
        });
        //console.log($event);
    };
    ExcuseComponent.prototype.onOpenAlert = function () { };
    ExcuseComponent.prototype.onDismissAlert = function () { };
    ExcuseComponent.prototype.CalculateExecuseHours = function () {
        try {
            //var exectype = jQuery('input[name="execusetype"]:checked', '.filterradio').val();
            //if (exectype == 2)
            //    return "يوم كامل";
            // let ftime = jQuery('#exc_ftime').val();
            // let ttime = jQuery('#exc_ttime').val();
            var d1 = $('#exc_ftime').timepicker('getTime');
            var d2 = $('#exc_ttime').timepicker('getTime');
            if (d1 == null || d2 == null)
                return "";
            if (d1 > d2) {
                d2 = d2.add({ days: 1 });
            }
            var millis = (d2 - d1);
            var hours = Math.floor(millis / 36e5), mins = Math.floor((millis % 36e5) / 6e4);
            //if (mins < 0 || hours < 0)
            //    return "";
            return this.Zeropad(hours, 2) + ":" + this.Zeropad(mins, 2);
        }
        catch (e) {
            return "";
        }
    };
    ExcuseComponent.prototype.Zeropad = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], ExcuseComponent.prototype, "alert", void 0);
    ExcuseComponent = __decorate([
        core_1.Component({
            selector: 'excuse',
            template: __webpack_require__("../../../../../src/app/excuse/excuse.component.html"),
            styles: [__webpack_require__("../../../../../src/app/excuse/excuse.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService,
            notifications_1.Notifications, TranslateService_1.TranslateService])
    ], ExcuseComponent);
    return ExcuseComponent;
}());
exports.ExcuseComponent = ExcuseComponent;


/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"topImg\">\n\n</div>\n<div class=\"AllBtnBox\">\n  <div class=\"col-md-3\"><a class=\"HBtnBox animated zoomIn dl1\"   routerLink=\"report\"><span>{{'TimeSheetManagmentTitle' | translate}}</span></a></div>\n  <div class=\"col-md-3\"><a class=\"HBtnBox animated zoomIn dl12\" routerLink=\"excuce\"><span>{{'ExcuseReq' | translate}}</span></a></div>\n  <div class=\"col-md-3\"><a class=\"HBtnBox animated zoomIn dl14\" routerLink=\"fingerprint\"><span>{{'FingerPrintReq' | translate}}</span></a></div>\n  <div class=\"col-md-3\"><a class=\"HBtnBox animated zoomIn dl16\" routerLink=\"myrequests\"><span>{{'MyRequestlbl' | translate}}</span></a></div>\n  <div class=\"col-md-3\"><a class=\"HBtnBox animated zoomIn dl18\" routerLink=\"mytasks\"><span>{{'MyTaskslbl' | translate}}</span></a></div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div dir=\"ltr\" class=\"container\" *ngIf=\"!pleaseWait\">\n    <div class=\"parent-form_login\">\n        <div class=\"row\">\n            <div class=\"\">\n                <h1 class=\"text-center login-title\">\n                    Log In\n                </h1>\n                <div class=\"account-wall\">\n                    <img class=\"profile-img\" src=\"assets/img/male.png\" alt=\"\">\n                    <form [formGroup]='hfloginpage' (ngSubmit)=\"login()\" id=\"login-form\" class=\"form-signin\" novalidate=\"novalidate\">\n                        <div *ngIf=\"UserInfo\">\n                          \n                            <span class=\"profile-email\">{{UserInfo.UserName}}</span>\n\n                            <div class=\"form-group\" [ngClass]=\"{'has-error alert alert-danger':!hfloginpage.controls.Password.valid && hfloginpage.controls.Password.touched}\">\n                                <input type=\"password\" class=\"form-control\" #password formControlName=\"Password\" required placeholder=\"Password/ كلمة المرور\">\n                            </div>\n\n\n                        </div>\n                        <div *ngIf=\"!UserInfo\">\n                            <div class=\"form-group\" [ngClass]=\"{'has-error alert alert-danger':!hfloginpage.controls.Username.valid && hfloginpage.controls.Username.touched}\">\n\n                                <input autocomplete=\"on\" class=\"form-control\" autofocus type=\"text\" #email formControlName=\"Username\" required placeholder=\"Username/اسم المستخدم\">\n                            </div>\n                            <div class=\"form-group\" [ngClass]=\"{'has-error alert alert-danger':!hfloginpage.controls.Password.valid && hfloginpage.controls.Password.touched}\">\n                                <input type=\"password\" class=\"form-control\" #password formControlName=\"Password\" required placeholder=\"Password/كلمة المرور\">\n                            </div>\n                        </div>\n                        <div class=\"checkbox\">\n                            <label> <input type=\"checkbox\"  formControlName=\"RememberMe\" >\n                                <span class=\"cr\">\n                                  <i class=\"cr-icon glyphicon glyphicon-ok\"></i>\n                                </span>Remember Me/تذكرني</label>\n                        </div>\n\n\n\n\n                        <button type=\"submit\" [disabled]=\"!hfloginpage.valid\" class=\"btn btn-lg btn-primary btn-block\">\n\t\t\t\t\t\t\t\t\t\tLog in/تسجيل الدخول\n\t\t\t\t\t\t\t\t\t</button>\n                        <!-- <a href=\"#\" class=\"need-help\">Forgot password?/نسيت كلمة المرور؟ </a><span class=\"clearfix\"></span> -->\n                    </form>\n\n\n                </div>\n                <div *ngIf=\"UserInfo\">\n                    <a href=\"#\" (click)=\"signwithDiff($event)\" class=\"text-center new-account\">Sign in with a different account/التسجيل بحساب آخر</a>\n                </div>\n                <div [ngBusy]=\"busy\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n<div id=\"preloader\" *ngIf=\"pleaseWait\">\n    <div></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var notifications_1 = __webpack_require__("../../../../../src/app/shared/notifications.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var LoginComponent = (function () {
    function LoginComponent(router, authService, fb, _notifcation) {
        this.router = router;
        this.authService = authService;
        this.fb = fb;
        this._notifcation = _notifcation;
        this.pleaseWait = false;
    }
    LoginComponent.prototype.startIdleTimer = function () {
        var _this = this;
        var timer = Rx_1.Observable.timer(2000, 1000);
        this.subscription = timer.subscribe(function (t) { return _this.ProcessCheck(); });
    };
    LoginComponent.prototype.ProcessCheck = function () {
        var user = this.authService.UserInfo();
        if (user) {
            this.subscription.unsubscribe();
            this.router.navigate(['/']);
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.logout();
        this.UserInfo = this.authService.UserInfForLogin();
        this.hfloginpage = this.fb.group({
            Username: [(this.UserInfo ? this.UserInfo.UserName : ''), forms_1.Validators.required],
            Password: ['', forms_1.Validators.required],
            RememberMe: [false],
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.busy) {
            this.busy.unsubscribe();
        }
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        // this.email.nativeElement.focus();
        this.startIdleTimer();
    };
    LoginComponent.prototype.signwithDiff = function (e) {
        e.preventDefault();
        this.UserInfo = null;
        localStorage.setItem('userInfo', null);
    };
    LoginComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout()
            .subscribe(function (res) {
            if (res.Status) {
                //   this._notifcation.showSuccess('Logout', 'you are loged out');
            }
            else {
                _this._notifcation.showError('Logout Error', res.Msg);
            }
        }, function (error) {
            _this._notifcation.showError('Logout Error', error);
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.busy = this.authService.login(this.hfloginpage.value)
            .subscribe(function (res) {
            if (res.Status) {
                _this.pleaseWait = true;
                global_settings_1.AppSettings.resourceBundle = null;
                _this.subscription.unsubscribe();
                setTimeout(function () {
                    this.router.navigate(['/']);
                }.bind(_this), 1000);
                // this._notifcation.showSuccess('Login Succsess', 'You are logged in');
            }
            else {
                _this._notifcation.showError('', res.Msg);
            }
        }, function (error) {
            _this._notifcation.showError('Login Error', error);
        });
    };
    __decorate([
        core_1.ViewChild('email'),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "email", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        }),
        __metadata("design:paramtypes", [router_1.Router,
            auth_service_1.AuthService,
            forms_1.FormBuilder,
            notifications_1.Notifications])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/myrequests/myrequests.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/myrequests/myrequests.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n\n    <div class=\"form-input\">\n        <label>{{ 'lbl_ReqStatus' | translate }}</label>\n        <select id=\"ddlTaskStatus\" name=\"taskStatus\" [(ngModel)]=\"taskStatus\" (change)=\"GetMyRequests() \">\n            <option [value]=\"null\">{{ 'lbl_All' | translate }}</option>\n            <option *ngFor=\"let row of taskStatusList\" [value]=\"row.STID\">{{(this.cultureLang == 'ar' ? row.STName_Ar : row.STName_En)}}</option>\n        </select>\n    </div>\n    <div class=\"TBL_Wrapper\">\n        <table id=\"MyRequestTable\" datatable #MyRequestTable=datatable class=\"dataTable table table-striped table-bordered table-hover  no-footer\" cellspacing=\"1\" [dtOptions]=\"dtOptionsMyRequestTable\"\n            [dtTrigger]=\"dtTriggerMyRequestTable\">\n            <thead>\n                <tr>\n                    <th>{{\"RequestNumber\" | translate }}</th>\n                    <th>{{\"RequestTitle\" | translate }} </th>\n                    <th>{{\"RequestType\" | translate }}</th>\n                    <th>{{\"StatusRequest\" | translate }}</th>\n                    <th>{{\"RequestDate\" | translate }}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let row of myRequestsList\">\n                    <td>\n                        <a [routerLink]=\"['/myrequests', row.TaskID]\">{{row.TaskNo}}</a>\n                    </td>\n                    <td>{{(this.cultureLang == 'ar' ? row.Title : row.TitleEN) }}</td>\n                    <td>{{(this.cultureLang == 'ar' ? row.RequestType_Ar : row.RequestType_En)}}</td>\n                    <td>{{(this.cultureLang == 'ar' ? row.TaskStatus_Ar : row.TaskStatus_En)}}</td>\n                    <td>{{row.Created | date: 'dd/MM/yyyy'}} </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</form>\n\n\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/myrequests/myrequests.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var angular_datatables_directive_1 = __webpack_require__("../../../../../src/app/datatable/angular-datatables.directive.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var MyrequestsComponent = (function () {
    function MyrequestsComponent(api, router, authService) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this.taskStatus = null;
        this.dtOptionsMyRequestTable = {};
        this.dtTriggerMyRequestTable = new Rx_1.Subject();
        this.isRenderMyRequestTable = false;
    }
    Object.defineProperty(MyrequestsComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    MyrequestsComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
        // else
        //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
    };
    MyrequestsComponent.prototype.ngAfterViewInit = function () {
        this.GetTaskStatus();
        this.dtOptionsMyRequestTable = {
            pagingType: 'full_numbers',
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
            rowId: 'user_id',
            dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            language: global_settings_1.AppSettings.DataTableLanguage,
            searching: true,
            info: true,
            autoWidth: false,
            ordering: false,
        };
    };
    MyrequestsComponent.prototype.GetTaskStatus = function () {
        var _this = this;
        this.busy = this.api.getRequest(global_settings_1.AppSettings.WebApiUrl + 'workflow/GetTaskStatus').subscribe(function (res) {
            if (res.Status) {
                _this.taskStatusList = res.Result;
                _this.GetMyRequests();
            }
            //console.log(this.reasons);
        });
        // console.log(this.excuseForm);
    };
    MyrequestsComponent.prototype.GetMyRequests = function () {
        var _this = this;
        this.busy = this.api.getRequest(global_settings_1.AppSettings.WebApiUrl + 'workflow/GetMyAllRequest/' + this.taskStatus).subscribe(function (res) {
            if (res.Status) {
                _this.myRequestsList = res.Result;
                if (!_this.isRenderMyRequestTable) {
                    _this.dtTriggerMyRequestTable.next();
                    _this.isRenderMyRequestTable = true;
                }
                else {
                    _this.MyRequestTable.dtInstance.then(function (dtInstance) {
                        // Destroy the table first
                        dtInstance.rows().clear();
                        dtInstance.destroy();
                        // Call the dtUGTrigger to rerender Group Table again
                        setTimeout(function () {
                            this.dtTriggerMyRequestTable.next();
                        }.bind(_this), 300);
                    });
                }
            }
            //console.log(this.reasons);
        });
        // console.log(this.excuseForm);
    };
    MyrequestsComponent.prototype.onCloseAlert = function ($event) { };
    MyrequestsComponent.prototype.onOpenAlert = function () { };
    MyrequestsComponent.prototype.onDismissAlert = function () { };
    __decorate([
        core_1.ViewChild('MyRequestTable'),
        __metadata("design:type", angular_datatables_directive_1.DataTableDirective)
    ], MyrequestsComponent.prototype, "MyRequestTable", void 0);
    MyrequestsComponent = __decorate([
        core_1.Component({
            selector: 'app-myrequests',
            template: __webpack_require__("../../../../../src/app/myrequests/myrequests.component.html"),
            styles: [__webpack_require__("../../../../../src/app/myrequests/myrequests.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService])
    ], MyrequestsComponent);
    return MyrequestsComponent;
}());
exports.MyrequestsComponent = MyrequestsComponent;


/***/ }),

/***/ "../../../../../src/app/mytasks/mytasks.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/mytasks/mytasks.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n\n    <div class=\"form-input\">\n        <label>{{ 'lbl_ReqStatus' | translate }}</label>\n        <select id=\"ddlTaskStatus\" name=\"taskStatus\" [(ngModel)]=\"taskStatus\" (change)=\"GetMyAllTasks() \">\n            <option [value]=\"null\">{{ 'lbl_All' | translate }}</option>\n            <option *ngFor=\"let row of taskStatusList\" [value]=\"row.STID\">{{(this.cultureLang == 'ar' ? row.STName_Ar : row.STName_En)}}</option>\n        </select>\n    </div>\n    <div class=\"TBL_Wrapper\">\n        <table id=\"MyTasksTable\" datatable #MyTasksTable=datatable class=\"dataTable table table-striped table-bordered table-hover  no-footer\" cellspacing=\"1\" [dtOptions]=\"dtOptionsMyTasksTable\"\n            [dtTrigger]=\"dtTriggerMyTasksTable\">\n            <thead>\n                <tr>\n                    <th>{{\"RequestNumber\" | translate }}</th>\n                    <th>{{\"RequestTitle\" | translate }} </th>\n                    <th>{{\"RequestType\" | translate }}</th>\n                    <th>{{\"StatusRequest\" | translate }}</th>\n                    <th>{{\"RequestDate\" | translate }}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let row of myRequestsList\">\n                    <td>\n                        <a [routerLink]=\"['/mytasks', row.TaskID]\">{{row.TaskNo}}</a>\n                    </td>\n                    <td>{{(this.cultureLang == 'ar' ? row.Title : row.TitleEN) }}</td>\n                    <td>{{(this.cultureLang == 'ar' ? row.RequestType_Ar : row.RequestType_En)}}</td>\n                    <td>{{(this.cultureLang == 'ar' ? row.TaskStatus_Ar : row.TaskStatus_En)}}</td>\n                    <td>{{row.Created | date: 'dd/MM/yyyy'}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</form>\n\n\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/mytasks/mytasks.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var angular_datatables_directive_1 = __webpack_require__("../../../../../src/app/datatable/angular-datatables.directive.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var MytasksComponent = (function () {
    function MytasksComponent(api, router, authService) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this.taskStatus = null;
        this.dtOptionsMyTasksTable = {};
        this.dtTriggerMyTasksTable = new Rx_1.Subject();
        this.isRenderMyTasksTable = false;
    }
    Object.defineProperty(MytasksComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    MytasksComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
        // else
        //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
    };
    MytasksComponent.prototype.ngAfterViewInit = function () {
        this.GetTaskStatus();
        this.dtOptionsMyTasksTable = {
            pagingType: 'full_numbers',
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
            rowId: 'user_id',
            dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            language: global_settings_1.AppSettings.DataTableLanguage,
            searching: true,
            info: true,
            autoWidth: false,
            ordering: false,
        };
    };
    MytasksComponent.prototype.onCloseAlert = function ($event) { };
    MytasksComponent.prototype.GetTaskStatus = function () {
        var _this = this;
        this.busy = this.api.getRequest(global_settings_1.AppSettings.WebApiUrl + 'workflow/GetWorkFlowStatus').subscribe(function (res) {
            if (res.Status) {
                _this.taskStatusList = res.Result;
                _this.GetMyAllTasks();
            }
            //console.log(this.reasons);
        });
        // console.log(this.excuseForm);
    };
    MytasksComponent.prototype.GetMyAllTasks = function () {
        var _this = this;
        this.busy = this.api.getRequest(global_settings_1.AppSettings.WebApiUrl + 'workflow/GetMyAllTasks/' + this.taskStatus).subscribe(function (res) {
            if (res.Status) {
                _this.myRequestsList = res.Result;
                if (!_this.isRenderMyTasksTable) {
                    _this.dtTriggerMyTasksTable.next();
                    _this.isRenderMyTasksTable = true;
                }
                else {
                    _this.MyTasksTable.dtInstance.then(function (dtInstance) {
                        // Destroy the table first
                        dtInstance.rows().clear();
                        dtInstance.destroy();
                        // Call the dtUGTrigger to rerender Group Table again
                        setTimeout(function () {
                            this.dtTriggerMyTasksTable.next();
                        }.bind(_this), 300);
                    });
                }
            }
            //console.log(this.reasons);
        });
        // console.log(this.excuseForm);
    };
    MytasksComponent.prototype.onOpenAlert = function () { };
    MytasksComponent.prototype.onDismissAlert = function () { };
    __decorate([
        core_1.ViewChild('MyTasksTable'),
        __metadata("design:type", angular_datatables_directive_1.DataTableDirective)
    ], MytasksComponent.prototype, "MyTasksTable", void 0);
    MytasksComponent = __decorate([
        core_1.Component({
            selector: 'app-mytasks',
            template: __webpack_require__("../../../../../src/app/mytasks/mytasks.component.html"),
            styles: [__webpack_require__("../../../../../src/app/mytasks/mytasks.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService])
    ], MytasksComponent);
    return MytasksComponent;
}());
exports.MytasksComponent = MytasksComponent;


/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "\n    <nav class=\"navbar navbar-inverse\">\n      <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n          <button aria-expanded=\"false\" class=\"navbar-toggle collapsed\" data-target=\"#bs-example-navbar-collapse-9\" data-toggle=\"collapse\" type=\"button\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span><span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span></button>\n        </div>\n        <div id=\"bs-example-navbar-collapse-9\" aria-expanded=\"false\" class=\"navbar-collapse collapse\" style=\"height: 1px;\">\n          <div class=\"row\">\n              <div class=\"col-md-4 col-md-push-8 navInfodiv\">\n                  <ul class=\"navInfo\">\n                      <li class=\"usrInfo\">\n                          {{'HelloUser' | translate }} {{UserInfoData}}\n                        </li>\n                      <li >\n                        <a class=\"Lang\" (click)=\"ChangeLang()\">\n                          <div [ngClass]=\"this.cultureLang == 'ar'? 'enlangimag' : 'arlangimag'\" [title]=\"this.cultureLang == 'ar'? 'English version' : 'النسخة العربية'\">\n                          </div>\n                        </a>\n                      </li>\n    \n                    </ul>\n              </div>\n              <div class=\"col-md-8 col-md-pull-4\">\n              <ul class=\"nav navbar-nav\">\n                    <li routerLinkActive=\"active\">\n                      <a routerLink=\"report\">{{'TimeSheetManagmentTitle' | translate}}</a>\n                    </li>\n                    <li routerLinkActive=\"active\">\n                      <a routerLink=\"excuce\">{{'ExcuseReq' | translate}}</a>\n                    </li>\n                    <li routerLinkActive=\"active\">\n                      <a routerLink=\"fingerprint\">{{'FingerPrintReq' | translate}}</a>\n                    </li>\n                    <!-- <a routerLinkActive=\"active\"><a routerLink=\"vacation\">طلب اجازة</a></a> -->\n                    <li routerLinkActive=\"active\">\n                      <a routerLink=\"myrequests\">{{'MyRequestlbl' | translate}}</a>\n                    </li>\n                    <li routerLinkActive=\"active\">\n                      <a routerLink=\"mytasks\">{{'MyTaskslbl' | translate}}</a>\n                    </li>\n              </ul>\n            </div>\n\n          </div>\n  \n\n        </div>\n      </div>\n    </nav>\n"

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var NavbarComponent = (function () {
    function NavbarComponent(authService) {
        this.authService = authService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        // this.UserInfo = this.authService.UserInfo();
    };
    Object.defineProperty(NavbarComponent.prototype, "UserInfoData", {
        get: function () {
            return this.authService.getEmployeeName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavbarComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    NavbarComponent.prototype.ChangeLang = function () {
        if (this.cultureLang == 'ar') {
            jQuery.cookie("_culture", 'en', { domain: global_settings_1.AppSettings.CookiDomain, path: '/' });
            //setTimeout(() => {
            window.location.reload();
            // }, 1000);
        }
        else {
            jQuery.cookie("_culture", 'ar', { domain: global_settings_1.AppSettings.CookiDomain, path: '/' });
            //setTimeout(() => {
            window.location.reload();
            // }, 1000);
        }
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            template: __webpack_require__("../../../../../src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;


/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  not-found works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/not-found/not-found.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        core_1.Component({
            selector: 'app-not-found',
            template: __webpack_require__("../../../../../src/app/not-found/not-found.component.html"),
            styles: [__webpack_require__("../../../../../src/app/not-found/not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());
exports.NotFoundComponent = NotFoundComponent;


/***/ }),

/***/ "../../../../../src/app/reports/mgr-report/mgr-report.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reports/mgr-report/mgr-report.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n    <div class=\"panel-body\" id=\"pn_dailybody\">\n        <div class=\"row\">\n        <div class=\"col-md-6\">\n            <div class=\"form-group\">\n                <div [ngClass]=\"{'has-error':!f?.controls?.fdateF?.valid && f?.controls?.fdateF?.touched}\">\n                    <label for=\"\">{{\"FromLable\" | translate }}</label>\n                    <div>\n                        <datepicker-popup (dateSelected)=\"onDateChange($event,'PS')\" name=\"fdateF\" [(ngModel)]=\"mgrReportForm.fdateF\" required>\n                        </datepicker-popup>\n                    </div>\n                </div>\n                <div [ngClass]=\"{'has-error':!f?.controls?.tdateF?.valid && f?.controls?.tdateF?.touched}\">\n                    <label for=\"\">{{\"ToLable\" | translate }}</label>\n                    <div>\n                        <datepicker-popup (dateSelected)=\"onDateChange($event,'PS')\" name=\"tdateF\" [(ngModel)]=\"mgrReportForm.tdateF\" required>\n                        </datepicker-popup>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label>{{ \"ExcuseTypeLable\" | translate}}</label>\n                <ul class=\"list-group\">\n                    <li class=\"list-group-item\">\n                        <!-- -->\n                        <input id=\"repdailymanager\" name=\"reportType\" [(ngModel)]=\"reportType\" value=\"1\" type=\"radio\" (change)=\"ViewSelectedDiv(1)\" required>\n                        <label for=\"repdailymanager\">{{ \"DailyReport\" | translate}} </label>\n                    </li>\n                    <li class=\"list-group-item\">\n                        <input id=\"repdailymanager\" name=\"reportType\" [(ngModel)]=\"reportType\" value=\"2\" type=\"radio\" (change)=\"ViewSelectedDiv(2)\" required>\n                        <label for=\"repdailymanager\">{{ \"MonthlyReport\" | translate}}</label>\n                    </li>\n                </ul>\n                <!-- <div class=\"alert alert-danger\" *ngIf=\"type.touched && !type.valid\">الرجاء اختيار نوع الطلب</div> -->\n            </div>\n            <div class=\"col-centered\">\n                <button class=\"btn btn-primary btn-lg\" id=\"DailybtSearch\" (click)=\"GetReport()\">{{'btSearch' | translate}} </button>\n                <button class=\"btn btn-lg\" id=\"printDaily\">{{'PrintModeTitle' | translate }}</button>\n            </div>\n        </div>\n    </div>\n        <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div id=\"divDailySummary\" class=\"TBL_Wrapper\" >\n                <table id=\"MGRTimeSheetSummaryTable\" datatable #MGRTimeSheetSummaryTable=datatable width=\"100%\" class=\"table table-striped table-bordered table-hover no-footer\"\n                    [dtOptions]=\"dtOptionsSummaryTable\" [dtTrigger]=\"dtTriggerSummaryTable\">\n                    <thead>\n                        <tr>\n                            <th>{{'ClmEmpNo' | translate}} </th>\n                            <th>{{'EmployeeNameLable' | translate}} </th>\n                            <th>{{'ClmSectionName' | translate}} </th>\n                            <th>{{'ClmDate' | translate}} </th>\n                            <th>{{'ClmIN' | translate}}</th>\n                            <th>{{'ClmOut' | translate}}</th>\n                            <th>{{'LateInLable' | translate}}</th>\n                            <th>{{'ClmEarlyOut' | translate}}</th>\n                            <th>{{'ClmTimeTotal' | translate}}</th>\n                            <th>{{'Clmac_work' | translate}}</th>\n                            <th>{{'ClmLateHours' | translate}}</th>\n                            <th>{{'ClmOverHours' | translate}}</th>\n                            <th>{{'ClmExecuse' | translate}}</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let row of empDailyList; let i = index\" (click)='UserSelectiontoviewDailyDetails(row.emp_id, row.m_dateno)'>\n\n                            <td>{{row.emp_no }} </td>\n                            <td>{{row.emp_name}} </td>\n                            <td>{{row.sec_Name}} </td>\n                            <td>{{row.m_date}} </td>\n                            <td>{{row.timefin}}</td>\n                            <td>{{row.timefout}}</td>\n                            <td>{{row.LateIn}}</td>\n                            <td>{{row.Earlyout}}</td>\n                            <td>{{row.timeTotal}}</td>\n                            <td>{{row.ActualTime}}</td>\n                            <td>{{row.TotalLate}}</td>\n                            <td>{{row.OverTime}}</td>\n                            <td>\n                                <div [ngClass]=\"row.exc_id != 0 ? 'alertIco-on' : 'alertIco-off'\"></div>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n\n            <div id=\"divMonthlySummary\" style=\"display:none\" class=\"TBL_Wrapper\">\n                <table id=\"TimeSheetForManagerTableMonthlySummaryTable\" datatable #TimeSheetForManagerTableMonthlySummaryTable=datatable width=\"100%\" class=\"table table-striped table-bordered table-hover no-footer\"\n                    [dtOptions]=\"dtOptionsMonthlyTable\" [dtTrigger]=\"dtTriggerMonthlyTable\">\n                    <thead>\n                        <tr>\n                            <th>{{'EmployeeNameLable' | translate}} </th>\n                            <th>{{'ClmSectionName' | translate}} </th>\n                            <th>{{'Clmdaysno' | translate}} </th>\n                            <th>{{'Clmdaysabsent' | translate}}</th>\n                            <th>{{'Clmdaysoff' | translate}}</th>\n                            <th>{{'Clmdaysvication' | translate}}</th>\n                            <th>{{'ClmTimeTotal' | translate}}</th>\n                            <th>{{'Clmac_work' | translate}}</th>\n                            <th>{{'ClmLateHours' | translate}}</th>\n                            <th>{{'ClmOverHours' | translate}}</th>\n                            <th>{{'ClmtotalExecuse' | translate}}</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let row of empMonthlyList; let i = index\" (click)=\"UserSelectiontoviewMS(row.emp_id,row.fdateno,row.tdateno)\">\n                                \n                        <td>{{row.emp_name}} </td>\n                            <td>{{row.sec_name}} </td>\n                            <td>{{row.daysno}} </td>\n\n                            <td>{{row.daysabsent}}</td>\n                            <td>{{row.daysoff}}</td>\n                            <td>{{row.daysvication}}</td>\n                            <td>{{row.totalwork}}</td>\n                            <td>{{row.ac_work}}</td>\n                            \n                            <td>{{row.totallate}}</td>\n                            <td>{{row.totalover}}</td>\n                            <td>{{row.totalExecuse}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n\n\n    </div>\n    <!-- Popup Monthly-->\n    <div style=\"display:none\">\n        <div id=\"MonthlyDiv\">\n            <div class=\"col-md-12 float-none\">\n\n                    <div class=\"PopDate\">\n                        <h4 class=\"cntr\" id=\"transactiondateM\">{{transDetails?.m_date}}</h4>\n                    </div>\n                    <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\"><h4>{{'EmployeeInformation' | translate}}</h4></div>\n                        <div class=\"panel-body\">\n                            <div class=\"form-detail\">\n                                <label class=\"cell-2 pr0\">{{'EmployeeNo' | translate}} :</label>\n                                <span id=\"timesheetmpno\">{{transDetails?.emp_no}}</span>\n                            </div>\n                            <div class=\"form-detail\">\n                                <label class=\"cell-2 pr0\">{{'EmployeeName' | translate}} :</label>\n                                <span id=\"timesheetempname\">{{transDetails?.emp_name}}</span>\n                            </div>\n                            <div class=\"form-detail\">\n                                <label class=\"cell-2 pr0\">{{'DepartmentName' | translate}} :</label>\n                                <span id=\"timesheetsecname\">{{transDetails?.sec_name}}</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div id=\"Timesheetformanagerdiv\">\n                        <h4>{{'AttendanceInformations' | translate}}</h4>\n                        <button type=\"button\" id=\"bt_PrintForEmployeeMGR\" class=\"btn btn-primary  float-left\" value=\"\">\n                            <i class=\"fa fa-print\"></i>\n                            <span>{{'PrintReport' | translate}}</span>\n                        </button>\n                        <table id=\"timesheetdetailsformanager\" class=\"dataTable table table-striped table-bordered table-hover no-footer\" cellspacing=\"1\" >\n                            <thead>\n                                <tr>\n                                    <th class=\"essential persist\">{{'Date' | translate}}</th>\n                                    <th>{{'CheckInTime' | translate}}</th>\n                                    <th>{{'CheckOutTime' | translate}}</th>\n                                    <th>{{'DelayedCheck' | translate}}</th>\n                                    <th>{{'CheckOutEarly' | translate}}</th>\n                                    <th>{{'WorkHours' | translate}}</th>\n                                    <th class=\"essential persist\">{{'HoursRequired' | translate}}</th>\n                                    <th class=\"essential persist\">{{'HoursDelay' | translate}}</th>\n                                    <th class=\"essential persist\">{{'OvertimeAfterWork' | translate}}</th>\n                                    <th>إذن</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr *ngFor=\"let row of transDetails?.TransData; let i = index\">\n                                    <td>{{row.m_date}}</td>\n                                    <td>{{row.timefin}}</td>\n                                    <td>{{row.timefout}}</td>\n                                    <td>{{row.LateIn}}</td>\n                                    <td>{{row.Earlyout}}</td>\n                                    <td>{{row.timeTotal}}</td>\n                                    <td>{{row.ActualTime}}</td>\n                                    <td>{{row.TotalLate}}</td>\n                                    <td>{{row.OverTime}}</td>\n                                    <td>{{row.Excuseinfo}}</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                        <table id=\"timesheetsummaryformanager\" class=\"Vlt dataTable table table-striped table-bordered table-hover no-footer\" cellspacing=\"1\">\n                            <thead>\n                                <tr>\n                                    <th class=\"essential persist\">{{'WorkingDay' | translate}}</th>\n                                    <th class=\"essential persist\">{{'AbsenceDays' | translate}}</th>\n                                    <th>{{'Holidays' | translate}}</th>\n                                    <th class=\"essential persist\">{{'VacationDays' | translate}}</th>\n                                    <th>{{'WorkHours' | translate}}</th>\n                                    <th>{{'HoursRequired' | translate}}</th>\n                                    <th>{{'HoursDelay' | translate}}</th>\n                                    <th>{{'OvertimeAfterWork' | translate}}</th>\n                                    <th class=\"essential persist\">{{'HoursPermission' | translate}}</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td>{{transDetails?.daysno}}</td>\n                                    <td>{{transDetails?.daysabsent}}</td>\n                                    <td>{{transDetails?.daysoff}}</td>\n                                    <td>{{transDetails?.daysvication}}</td>\n                                    <td>{{transDetails?.totalwork}}</td>\n                                    <td>{{transDetails?.ac_work}}</td>\n                                    <td>{{transDetails?.totallate}}</td>\n                                    <td>{{transDetails?.totalover}}</td>\n                                    <td>{{transDetails?.totalExecuse}}</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n               \n            </div>\n        </div>\n    </div>\n    <!-- End Popup -->\n    <!-- Popup Daily -->\n    <div style=\"display:none\">\n        <div class=\"col-md-12 float-none\" id='MGRTransDetailsDialog'>\n            <div class=\"PopDate\">\n                <h4 class=\"cntr\" id=\"transactiondate\">{{transDetailsDay?.m_date}}</h4>\n            </div>\n            <!-- معلومات الموظف -->\n            <div class=\"panel panel-default\">\n                \n                    <div class=\"panel-heading\"><h4>{{'EmployeeInformation' | translate}}</h4></div>\n                    <div class=\"panel-body\">\n                        <div class=\"form-detail\">\n                            <label class=\"cell-2 pr0\">{{'EmployeeNo' | translate}} :</label>\n                            <span id=\"transactionempno\">{{transDetailsDay?.emp_no}}</span>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-2 pr0\">{{'EmployeeName' | translate}} :</label>\n                            <span id=\"transactionempname\">{{transDetailsDay?.emp_name}}</span>\n                        </div>\n                        <div class=\"form-detail\">\n                            <label class=\"cell-2 pr0\">{{'DepartmentName' | translate}} :</label>\n                            <span id=\"transactionsecname\">{{transDetailsDay?.sec_name}}</span>\n                        </div>\n                    </div>\n            </div>\n            <!-- معلومات الوردية -->\n            <div class=\"alert alert-warning col-md-12 float-none\">\n                <label class=\"cell-2 pr0\">{{'ShiftTitle'| translate}}</label>\n                <label id=\"txt_transshift\">{{transDetailsDay?.shiftinfo + ' ' + transDetailsDay?.shift_name}}</label>\n            </div>\n            <div class=\"Transinfo\"><!-- معلومات الحركات -->\n                <h4>{{'TransactioninfoTitle'| translate}}</h4>\n                <div class=\"Transinfodiv TBL_Wrapper\" *ngIf=\"transDetailsDay?.TransData?.length != 0\">\n                    <table id=\"transmanagerdalydetails\" width=\"100%\" class=\"dataTable table table-striped table-bordered table-hover no-footer\">\n                        <thead>\n                            <tr>\n                                <th>{{'ClmTime'| translate}}</th>\n                                <th>{{'ClmStatus'| translate}}</th>\n                                <th>{{'DeviceNameLabel'| translate}}</th>\n                                <th>{{'ReasonNameLable'| translate}}</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let row of transDetailsDay?.TransData; let i = index\">\n                                <td>{{row.m_time}}</td>\n                                <td>{{row.m_unit}}</td>\n                                <td>{{row.AStatus}}</td>\n                                <td>{{row.TransReason}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <!-- لا يوجد الحركات -->\n                <div class=\"col-md-12 alert alert-danger\" id=\"Transinfodiv_nodata\" *ngIf=\"transDetailsDay?.TransData == null && transDetailsDay?.TransData?.length == 0\">\n                    <div>{{'NoMovements'| translate}}</div>\n                </div>\n            </div>\n            <!-- معلومات الإستئذان -->\n            <div class=\"execuseinfo\" *ngIf=\" transDetailsDay?.exc_id != 0\">\n                <h4>{{'ExcuseInfoTitle'| translate}}</h4>\n                <div class=\"col-md-12 alert alert-info float-none\">\n                    <span id=\"txt_transexecuse\">{{ transDetailsDay?.Excuseinfo }}</span>\n                </div>\n            </div>\n            <!-- معلومات الإجازة -->\n            <div class=\"vacationinfo\" *ngIf=\" transDetailsDay?.m_vac_id != 0\">\n                <h4>{{'VacationInfoTitle'| translate}}</h4>\n                <div class=\"col-md-12 alert alert-info float-none\">\n                    <span id=\"txt_transvacation\">{{ transDetailsDay?.vacinfo }}</span>\n                </div>\n            </div>\n            <!-- تفاصيل الدوام -->\n            <div class=\"attendanceinfo\" *ngIf=\" transDetailsDay?.TotalLate != '--:--' || transDetailsDay?.LateIn != '--:--' || transDetailsDay?.Earlyout != '--:--'\">\n                <h4>{{'DutyDetails'| translate}}</h4>\n                <div class=\"TBL_Wrapper\">\n                <table class=\"Vlt dataTable table table-striped table-bordered table-hover no-footer\" cellspacing=\"1\">\n                        <thead>\n                    <tr>\n                        <th colspan=\"2\">{{'LoginTitle'| translate}}</th>\n                        <th colspan=\"2\">{{'LinkLogoff'| translate}}</th>\n                        <th rowspan=\"2\">{{'Clmtotallate'| translate}}</th>\n                    </tr>\n                    <tr>\n                        <th>{{'LoginTitle'| translate}}</th>\n                        <th>{{'Delayed'| translate}}</th>\n                        <th>{{'ActualTime'| translate}} </th>\n                        <th>{{'Early'| translate}}</th>\n                    </tr>\n                </thead>\n                    <tr>\n                        <td>\n                            <span id=\"txt_transtimefin\">{{ transDetailsDay?.timefin }}</span>\n                        </td>\n                        <td>\n                            <span id=\"txt_transLateIn\">{{ transDetailsDay?.LateIn }}</span>\n                        </td>\n                        <td>\n                            <span id=\"txt_transtimefout\">{{ transDetailsDay?.timefout }}</span>\n                        </td>\n                        <td>\n                            <span id=\"txt_transEarlyout\">{{ transDetailsDay?.Earlyout }}</span>\n                        </td>\n                        <td>\n                            <span id=\"txt_transTotalLate\">{{ transDetailsDay?.TotalLate }}</span>\n                        </td>\n                    </tr>\n                </table>\n            </div>\n            </div>\n        </div>\n    </div>\n    <!-- End Popup -->\n</form>\n\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/reports/mgr-report/mgr-report.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var angular_datatables_directive_1 = __webpack_require__("../../../../../src/app/datatable/angular-datatables.directive.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var MgrReportComponent = (function () {
    function MgrReportComponent(api, router, authService, translate) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this.translate = translate;
        this.reportType = '1';
        this.mgrReportForm = { fdate: 0, tdate: 0, fdateF: '', tdateF: '' };
        this.dtOptionsSummaryTable = {};
        this.dtTriggerSummaryTable = new Rx_1.Subject();
        this.isRenderSummaryTable = false;
        this.dtOptionsMonthlyTable = {};
        this.dtTriggerMonthlyTable = new Rx_1.Subject();
        this.isRenderMonthlyTable = false;
        this.transDetails = null;
        this.transDetailsDay = null;
    }
    MgrReportComponent.prototype.ngOnInit = function () {
        var today = new Date();
        var dd = today.getDate().toString();
        var mm = (today.getMonth() + 1).toString(); //January is 0!
        var yyyy = today.getFullYear().toString();
        if (parseInt(dd) < 10) {
            dd = '0' + dd;
        }
        if (parseInt(mm) < 10) {
            mm = '0' + mm;
        }
        this.mgrReportForm.fdateF = yyyy + '-' + mm + '-' + dd;
        this.mgrReportForm.tdateF = yyyy + '-' + mm + '-' + dd;
    };
    MgrReportComponent.prototype.ngAfterViewInit = function () {
        this.dtOptionsSummaryTable = {
            pagingType: 'full_numbers',
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
            rowId: 'user_id',
            dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            language: global_settings_1.AppSettings.DataTableLanguage,
            searching: true,
            info: true,
            autoWidth: false,
            ordering: false,
        };
        this.dtOptionsMonthlyTable = {
            pagingType: 'full_numbers',
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
            rowId: 'user_id',
            dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            language: global_settings_1.AppSettings.DataTableLanguage,
            searching: true,
            info: true,
            autoWidth: false,
            ordering: false,
        };
        this.dtTriggerSummaryTable.next();
        this.isRenderSummaryTable = true;
        this.dtTriggerMonthlyTable.next();
        this.isRenderMonthlyTable = true;
    };
    MgrReportComponent.prototype.onDateChange = function (e, d) {
    };
    MgrReportComponent.prototype.GetReport = function () {
        var _this = this;
        this.mgrReportForm.fdate = (new Date(this.mgrReportForm.fdateF)).ToOADate();
        this.mgrReportForm.tdate = (new Date(this.mgrReportForm.tdateF)).ToOADate();
        if (this.reportType === '1') {
            this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetDailyTimeSheetForManager/' + this.mgrReportForm.fdate + '/' + this.mgrReportForm.tdate + '/-1').subscribe(function (res) {
                if (res.Status == 1) {
                    _this.empDailyList = res.Result;
                    if (!_this.isRenderSummaryTable) {
                        _this.dtTriggerSummaryTable.next();
                        _this.isRenderSummaryTable = true;
                    }
                    else {
                        _this.MGRTimeSheetSummaryTable.dtInstance.then(function (dtInstance) {
                            // Destroy the table first
                            dtInstance.rows().clear();
                            dtInstance.destroy();
                            // Call the dtUGTrigger to rerender Group Table again
                            setTimeout(function () {
                                this.dtTriggerSummaryTable.next();
                            }.bind(_this), 300);
                        });
                    }
                }
                //console.log(this.reasons);
            });
        }
        else if (this.reportType === '2') {
            this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetMonthlySummaryTimeSheetForManager/-1/' + this.mgrReportForm.fdate + '/' + this.mgrReportForm.tdate).subscribe(function (res) {
                if (res.Status == 1) {
                    _this.empMonthlyList = res.Result;
                    if (!_this.isRenderMonthlyTable) {
                        _this.dtTriggerMonthlyTable.next();
                        _this.isRenderMonthlyTable = true;
                    }
                    else {
                        _this.TimeSheetForManagerTableMonthlySummaryTable.dtInstance.then(function (dtInstance) {
                            // Destroy the table first
                            dtInstance.rows().clear();
                            dtInstance.destroy();
                            // Call the dtUGTrigger to rerender Group Table again
                            setTimeout(function () {
                                this.dtTriggerMonthlyTable.next();
                            }.bind(_this), 300);
                        });
                    }
                }
                //console.log(this.reasons);
            });
        }
    };
    MgrReportComponent.prototype.ViewSelectedDiv = function (val) {
        if (val === 1) {
            jQuery("#divDailySummary").fadeIn(200);
            jQuery("#divMonthlySummary").hide();
        }
        else {
            jQuery("#divMonthlySummary").fadeIn(200);
            jQuery("#divDailySummary").hide();
        }
    };
    MgrReportComponent.prototype.UserSelectiontoviewMS = function (emp_id, fdateno, tdateno) {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetTimeSheetMonthlyDetailsForManager/' + emp_id + '/' + fdateno + '/' + tdateno).subscribe(function (res) {
            if (res.Status == 1) {
                _this.transDetails = res.Result;
                if (_this.transDetails != null) {
                    setTimeout(function () {
                        this.message = jQuery("#MonthlyDiv").html();
                        this.openForm();
                    }.bind(_this), 200);
                }
            }
            //console.log(this.reasons);
        });
    };
    MgrReportComponent.prototype.UserSelectiontoviewDailyDetails = function (empid, mdate) {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + "SelfServices/TimeSheet/GetTransDetailsForManager/" + empid + "/" + mdate).subscribe(function (res) {
            if (res.Status == 1) {
                _this.transDetailsDay = res.Result;
                if (_this.transDetailsDay != null) {
                    setTimeout(function () {
                        this.message = jQuery("#MGRTransDetailsDialog").html();
                        this.openForm();
                    }.bind(_this), 500);
                }
            }
        });
    };
    MgrReportComponent.prototype.openForm = function () {
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.message;
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = false; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Close";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'lg'); //md,sm,lg
        }.bind(this), 200);
    };
    MgrReportComponent.prototype.onDismissAlert = function () { };
    MgrReportComponent.prototype.SelectSection = function (sec_ID, sec_Name) {
    };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], MgrReportComponent.prototype, "alert", void 0);
    __decorate([
        core_1.ViewChild('MGRTimeSheetSummaryTable'),
        __metadata("design:type", angular_datatables_directive_1.DataTableDirective)
    ], MgrReportComponent.prototype, "MGRTimeSheetSummaryTable", void 0);
    __decorate([
        core_1.ViewChild('TimeSheetForManagerTableMonthlySummaryTable'),
        __metadata("design:type", angular_datatables_directive_1.DataTableDirective)
    ], MgrReportComponent.prototype, "TimeSheetForManagerTableMonthlySummaryTable", void 0);
    MgrReportComponent = __decorate([
        core_1.Component({
            selector: 'MgrAttReport',
            template: __webpack_require__("../../../../../src/app/reports/mgr-report/mgr-report.component.html"),
            styles: [__webpack_require__("../../../../../src/app/reports/mgr-report/mgr-report.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService, TranslateService_1.TranslateService])
    ], MgrReportComponent);
    return MgrReportComponent;
}());
exports.MgrReportComponent = MgrReportComponent;


/***/ }),

/***/ "../../../../../src/app/reports/my-report/my-report.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reports/my-report/my-report.component.html":
/***/ (function(module, exports) {

module.exports = "<div [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n    <div class=\"Filters_Select\">\n        <div class=\"col-md-9\">\n            <select id=\"ddlYear\" class=\"width-80\">\n            </select>\n            <select id=\"ddlMonth\" class=\"width-130\">\n\n            </select>\n        </div>\n        <div class=\"col-md-3\">\n            <button class=\"btn btn-primary btn-lg\" id=\"MonthlybtSearch\" (click)=\"getMyAtt()\">{{'btSearch' | translate}}</button>\n            <button class=\"btn btn-lg\" id=\"printMonthly\">{{'PrintModeTitle' | translate }}</button>\n        </div>\n\n    </div>\n    <div class=\"col-centered\">\n        <hr>\n\n    </div>\n    <div class=\"TBL_Wrapper\">\n        <table id=\"Mytimesheetdetails\" width=\"100%\" class=\"dataTable table table-striped table-bordered table-hover  no-footer\">\n            <thead>\n                <tr>\n                    <th>{{'ClmDate' | translate}} </th>\n                    <th>{{'ClmIN' | translate}} </th>\n                    <th>{{'ClmOut' | translate}} </th>\n                    <th>{{'ClmLateIn' | translate}}</th>\n                    <th>{{'EarlyOutLable' | translate}}</th>\n                    <th>{{'ClmTimeTotal' | translate}}</th>\n                    <th>{{'Clmac_work' | translate}}</th>\n                    <th>{{'ClmLateHours' | translate}}</th>\n                    <th>{{'ClmOverHours' | translate}}</th>\n                    <th>{{'ClmExecuse' | translate}}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let row of MyAttDetails; let i = index\" (click)='UserSelectiontoviewDailyDetailsEMP(row.emp_id, row.m_dateno)' [style.background]=\"returnRowColor(row)\">\n                    <td>{{row.m_date}}</td>\n                    <td>{{row.timefin}}</td>\n                    <td>{{row.timefout}}</td>\n                    <td>{{row.LateIn}}</td>\n                    <td>{{row.Earlyout}}</td>\n                    <td>{{row.timeTotal}}</td>\n                    <td>{{row.ActualTime}}</td>\n                    <td>{{row.TotalLate}}</td>\n                    <td>{{row.OverTime}}</td>\n                    <td>\n                        <div [ngClass]=\"row.exc_id != 0 ? 'alertIco-on' : 'alertIco-off'\"></div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>   \n    </div>\n    <div class=\"TBL_Wrapper\">\n        <table id=\"MyTimeSheetSummaryTable\" width=\"100%\" class=\"Vlt dataTable table table-striped table-bordered table-hover no-footer\">\n            <thead>\n                <tr>\n                    <th>{{'Clmdaysno' | translate}} </th>\n                    <th>{{'Clmdaysabsent' | translate}} </th>\n                    <th>{{'Clmdaysoff' | translate}} </th>\n                    <th>{{'Clmdaysvication' | translate}}</th>\n                    <th>{{'ClmTimeTotal' | translate}}</th>\n                    <th>{{'Clmac_work' | translate}}</th>\n                    <th>{{'ClmLateHours' | translate}}</th>\n                    <th>{{'ClmOverHours' | translate}}</th>\n                    <th>{{'ClmtotalExecuse' | translate}}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let row of MyAttSummary; let i = index\">\n                    <td>{{row.daysno}}</td>\n                    <td>{{row.daysabsent}}</td>\n                    <td>{{row.daysoff}}</td>\n                    <td>{{row.daysvication}}</td>\n                    <td>{{row.totalwork}}</td>\n                    <td>{{row.ac_work}}</td>\n                    <td>{{row.totallate}}</td>\n                    <td>{{row.totalover}}</td>\n                    <td>{{row.totalExecuse}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n<!-- Popup -->\n<div style=\"display:none\">\n    <div class=\"col-md-12 float-none\" id='TransDetailsDialog'>\n        <div class=\" PopDate\">\n            <h4 class=\"cntr\" id=\"transactiondate\">{{transDetails?.m_date}}</h4>\n        </div>\n        <div class=\"alert alert-warning col-md-12 float-none\"><!-- معلومات الوردية -->\n            <label>{{'ShiftTitle'| translate}}</label>\n            <label id=\"txt_transshift\">{{transDetails?.shiftinfo + ' ' + transDetails?.shift_name}}</label>\n        </div>\n        <div class=\"Transinfo\"><!-- معلومات الحركات -->\n            <h4>{{'TransactioninfoTitle'| translate}}</h4>\n            <div class=\"Transinfodiv\" *ngIf=\"transDetails?.TransData?.length != 0\">\n                <div class=\"TBL_Wrapper\">\n                    <table id=\"transmanagerdalydetails\" width=\"100%\" class=\"dataTable table table-striped table-bordered table-hover no-footer\">\n                        <thead>\n                            <tr>\n                                <th>{{'ClmTime'| translate}}</th>\n                                <th>{{'ClmStatus'| translate}}</th>\n                                <th>{{'DeviceNameLabel'| translate}}</th>\n                                <th>{{'ReasonNameLable'| translate}}</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let row of transDetails?.TransData; let i = index\">\n                                <td>{{row.m_time}}</td>\n                                <td>{{row.m_unit}}</td>\n                                <td>{{row.AStatus}}</td>\n                                <td>{{row.TransReason}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n            <!-- لا يوجد الحركات -->\n            <div class=\"col-md-12 alert alert-danger\" id=\"Transinfodiv_nodata\" *ngIf=\"transDetails?.TransData == null || transDetails?.TransData?.length == 0\">\n                <div class=\"E-alert-s1\">{{'NoMovements'| translate}}</div>\n            </div>\n        </div>\n        <!-- معلومات الإستئذان -->\n        <div class=\"execuseinfo  \" *ngIf=\" transDetails?.exc_id != 0\">\n            <h4>{{'ExcuseInfoTitle'| translate}}</h4>\n            <div class=\"col-md-12 alert alert-info float-none\">\n                <span id=\"txt_transexecuse\">{{ transDetails?.Excuseinfo }}</span>\n            </div>\n        </div>\n        <!-- معلومات الإجازة -->\n        <div class=\"vacationinfo \" *ngIf=\" transDetails?.m_vac_id != 0\">\n            <h4>{{'VacationInfoTitle'| translate}}</h4>\n            <div class=\"col-md-12 alert alert-info float-none\">\n                <span id=\"txt_transvacation\">{{ transDetails?.vacinfo }}</span>\n            </div>\n        </div>\n        <!-- تفاصيل الدوام -->\n        <div class=\"attendanceinfo\" *ngIf=\" transDetails?.TotalLate != '--:--' || transDetails?.LateIn != '--:--' || transDetails?.Earlyout != '--:--'\">\n            <h4>{{'DutyDetails'| translate}}</h4>\n            <div class=\"TBL_Wrapper\">\n            <table class=\"Vlt dataTable table table-striped table-bordered table-hover no-footer\" cellspacing=\"1\">\n                <thead>\n                    <tr>\n                        <th colspan=\"2\">{{'LoginTitle'| translate}}</th>\n                        <th colspan=\"2\">{{'LinkLogoff'| translate}}</th>\n                        <th rowspan=\"2\">{{'Clmtotallate'| translate}}</th>\n                    </tr>\n                    <tr>\n                        <th>{{'LoginTitle'| translate}}</th>\n                        <th>{{'Delayed'| translate}}</th>\n                        <th>{{'ActualTime'| translate}} </th>\n                        <th>{{'Early'| translate}}</th>\n                    </tr>\n                </thead>\n                <tr>\n                    <td>\n                        <span id=\"txt_transtimefin\">{{ transDetails?.timefin }}</span>\n                    </td>\n                    <td>\n                        <span id=\"txt_transLateIn\">{{ transDetails?.LateIn }}</span>\n                    </td>\n                    <td>\n                        <span id=\"txt_transtimefout\">{{ transDetails?.timefout }}</span>\n                    </td>\n                    <td>\n                        <span id=\"txt_transEarlyout\">{{ transDetails?.Earlyout }}</span>\n                    </td>\n                    <td>\n                        <span id=\"txt_transTotalLate\">{{ transDetails?.TotalLate }}</span>\n                    </td>\n                </tr>\n            </table>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- END Popup -->\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/reports/my-report/my-report.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var MyReportComponent = (function () {
    function MyReportComponent(api, router, authService, translate, zone) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this.translate = translate;
        this.zone = zone;
        this.MyAttDetails = []; //: Users;
        this.MyTimeForm = { Emp_ID: 0, FromDate: 0, ToDate: 0 };
        this.transDetails = null;
    }
    MyReportComponent.prototype.ngOnInit = function () {
    };
    MyReportComponent.prototype.ngAfterViewInit = function () {
        // let date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate()
        // let firstDay = new Date(y, m, 1);
        // let lastDay = new Date(y, m + 1, 0);
        //this.getMyAtt();
    };
    MyReportComponent.prototype.onDateChange = function (e, d) {
    };
    MyReportComponent.prototype.LoadEvent = function () {
        var _this = this;
        jQuery("#ddlYear option").remove();
        jQuery("#ddlYear").append('<option value="' + new Date().getFullYear() + '">' + new Date().getFullYear() + '</option>');
        jQuery("#ddlYear").append('<option value="' + (new Date().getFullYear() - 1) + '">' + (new Date().getFullYear() - 1) + '</option>');
        $('#ddlYear option[value="' + new Date().getFullYear() + '"]').attr('selected', 'selected');
        $("#ddlYear").change(function (x) {
            _this.bindMonths();
        });
        this.bindMonths();
    };
    MyReportComponent.prototype.getMyAtt = function () {
        var _this = this;
        var selectYear = jQuery("#ddlYear option:selected").val().toString();
        var selectedMonth = jQuery("#ddlMonth option:selected").val().toString();
        var date = new Date(parseInt(selectYear, 10), parseInt(selectedMonth, 10) - 1, 1);
        var fdateF = new Date(date.getFullYear(), date.getMonth(), 1);
        var tdateF = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.MyTimeForm.FromDate = (new Date(fdateF)).ToOADate();
        this.MyTimeForm.ToDate = (new Date(tdateF)).ToOADate();
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetMonthDetails', this.MyTimeForm, true).subscribe(function (res) {
            _this.MyAttDetails = res.Result.Details;
            _this.MyAttSummary = res.Result.Summary;
        });
    };
    MyReportComponent.prototype.bindMonths = function () {
        jQuery("#ddlMonth option").remove();
        //$('#ddlLetter_Type option[value!="-1"]').remove();
        var xx = [
            { val: "<option value='1'>" + this.translate.getValue('JanMonth') + "</option>" },
            { val: "<option value='2'>" + this.translate.getValue('FebMonth') + "</option>" },
            { val: "<option value='3'>" + this.translate.getValue('MarMonth') + "</option>" },
            { val: "<option value='4'>" + this.translate.getValue('AprMonth') + "</option>" },
            { val: "<option value='5'>" + this.translate.getValue('MayMonth') + "</option>" },
            { val: "<option value='6'>" + this.translate.getValue('JuneMonth') + "</option>" },
            { val: "<option value='7'>" + this.translate.getValue('JulyMonth') + "</option>" },
            { val: "<option value='8'>" + this.translate.getValue('AugustMonth') + "</option>" },
            { val: "<option value='9'>" + this.translate.getValue('SeptemberMonth') + "</option>" },
            { val: "<option value='10'>" + this.translate.getValue('OctoberMonth') + "</option>" },
            { val: "<option value='11'>" + this.translate.getValue('NovemberMonth') + "</option>" },
            { val: "<option value='12'>" + this.translate.getValue('DecemberMonth') + "</option>" }
        ];
        var i = 1;
        var selectedYear = $("#ddlYear option:selected").val();
        if (selectedYear < new Date().getFullYear())
            var currMonth = 12;
        else
            var currMonth = new Date().getMonth() + 1;
        while (i <= currMonth) {
            jQuery("#ddlMonth").append(xx[i - 1].val);
            i++;
        }
        $('#ddlMonth option[value="' + (new Date().getMonth() + 1) + '"]').attr('selected', 'selected');
    };
    MyReportComponent.prototype.returnRowColor = function (row) {
        if (row.vac_id > 0)
            return '#c2f1b7';
        if (row.TotalLate != '--:--')
            return '#ffcf9e';
        if (row.ActualTime != '00:00' && row.timefin == '--:--' && row.timefout == '--:--')
            return '#ffe2da';
        if (row.timefin != '--:--' && row.timefout == '--:--')
            return '#fff7c0';
        if (row.ActualTime == '00:00')
            return '#e8e8e8';
    };
    MyReportComponent.prototype.UserSelectiontoviewDailyDetailsEMP = function (empid, mdate) {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + "SelfServices/TimeSheet/GetTransDetailsForEmployee/" + empid + "/" + mdate).subscribe(function (res) {
            if (res.Status == 1) {
                _this.transDetails = res.Result;
                if (_this.transDetails != null) {
                    setTimeout(function () {
                        this.openForm();
                    }.bind(_this), 200);
                }
            }
        });
    };
    MyReportComponent.prototype.openForm = function () {
        this.message = jQuery("#TransDetailsDialog").html();
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.message;
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = false; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Close";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'md'); //md,sm,lg
        }.bind(this), 200);
    };
    MyReportComponent.prototype.onDismissAlert = function () { };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], MyReportComponent.prototype, "alert", void 0);
    MyReportComponent = __decorate([
        core_1.Component({
            selector: 'myattreport',
            template: __webpack_require__("../../../../../src/app/reports/my-report/my-report.component.html"),
            styles: [__webpack_require__("../../../../../src/app/reports/my-report/my-report.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService, TranslateService_1.TranslateService, core_1.NgZone])
    ], MyReportComponent);
    return MyReportComponent;
}());
exports.MyReportComponent = MyReportComponent;


/***/ }),

/***/ "../../../../../src/app/reports/reports.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.html":
/***/ (function(module, exports) {

module.exports = "<ngb-tabset (tabChange)=\"TabChange($event)\" >\n    <ngb-tab index=\"0\">\n\n        <ng-template ngbTabTitle>\n            <b>{{'MyAttendanceReport' | translate}}</b>\n        </ng-template>\n        <ng-template ngbTabContent>\n            <myattreport></myattreport>\n\n        </ng-template>\n    </ngb-tab>\n    <ngb-tab index=\"1\" *ngIf=\"isManager\">\n        <ng-template ngbTabTitle>\n            <b>{{'MyEmpAttReport' | translate}}</b>\n        </ng-template>\n        <ng-template ngbTabContent>\n            <MgrAttReport></MgrAttReport>\n        </ng-template>\n    </ngb-tab>\n</ngb-tabset>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var tab_component_1 = __webpack_require__("../../../../../src/app/Tap/tab.component.ts");
var my_report_component_1 = __webpack_require__("../../../../../src/app/reports/my-report/my-report.component.ts");
var mgr_report_component_1 = __webpack_require__("../../../../../src/app/reports/mgr-report/mgr-report.component.ts");
var ReportsComponent = (function () {
    function ReportsComponent(router, api, authService) {
        this.router = router;
        this.api = api;
        this.authService = authService;
        this.isManager = false;
    }
    ReportsComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
    };
    ReportsComponent.prototype.ngAfterViewInit = function () {
        //if (this.UserInfo != null) {
        this.myattreport.MyTimeForm.Emp_ID = this.UserInfo.UserEmpID;
        this.myattreport.LoadEvent();
        this.myattreport.getMyAtt();
        this.IsManager();
        //}
    };
    ReportsComponent.prototype.onDateChange = function (e, d) {
    };
    ReportsComponent.prototype.IsManager = function () {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/IsManager').subscribe(function (res) {
            // if (res.Status == 1) {
            _this.isManager = res.Result;
            // }
        });
    };
    ReportsComponent.prototype.TabChange = function ($event) {
    };
    __decorate([
        core_1.ViewChild(mgr_report_component_1.MgrReportComponent),
        __metadata("design:type", mgr_report_component_1.MgrReportComponent)
    ], ReportsComponent.prototype, "mgrattreport", void 0);
    __decorate([
        core_1.ViewChild(my_report_component_1.MyReportComponent),
        __metadata("design:type", my_report_component_1.MyReportComponent)
    ], ReportsComponent.prototype, "myattreport", void 0);
    __decorate([
        core_1.ViewChild(tab_component_1.NgbTabset),
        __metadata("design:type", tab_component_1.NgbTabset)
    ], ReportsComponent.prototype, "Tabset", void 0);
    ReportsComponent = __decorate([
        core_1.Component({
            selector: 'app-reports',
            template: __webpack_require__("../../../../../src/app/reports/reports.component.html"),
            styles: [__webpack_require__("../../../../../src/app/reports/reports.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.Router, apiRestful_service_1.APIRestFulService,
            auth_service_1.AuthService])
    ], ReportsComponent);
    return ReportsComponent;
}());
exports.ReportsComponent = ReportsComponent;


/***/ }),

/***/ "../../../../../src/app/shared/TranslateLoader.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var TranslateLoader = (function () {
    function TranslateLoader(dataService) {
        this.dataService = dataService;
    }
    TranslateLoader.prototype.getTranslation = function () {
        var WebApiUrl = global_settings_1.AppSettings.ResourceUrl;
        return this.dataService.getRequestAS(WebApiUrl);
    };
    TranslateLoader = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService])
    ], TranslateLoader);
    return TranslateLoader;
}());
exports.TranslateLoader = TranslateLoader;


/***/ }),

/***/ "../../../../../src/app/shared/TranslateModule.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var TranslatePipe_1 = __webpack_require__("../../../../../src/app/shared/TranslatePipe.ts");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var TranslateLoader_1 = __webpack_require__("../../../../../src/app/shared/TranslateLoader.ts");
__export(__webpack_require__("../../../../../src/app/shared/TranslatePipe.ts"));
__export(__webpack_require__("../../../../../src/app/shared/TranslateService.ts"));
__export(__webpack_require__("../../../../../src/app/shared/TranslateLoader.ts"));
// for angular-cli
exports.default = {
    pipes: [TranslatePipe_1.TranslatePipe],
    providers: [TranslateService_1.TranslateService]
};
function translateLoaderFactory(http) {
    return new TranslateLoader_1.TranslateLoader(http);
}
exports.translateLoaderFactory = translateLoaderFactory;
var TranslateModule = (function () {
    function TranslateModule() {
    }
    TranslateModule_1 = TranslateModule;
    TranslateModule.forRoot = function (providedLoader) {
        if (providedLoader === void 0) { providedLoader = {
            provide: TranslateLoader_1.TranslateLoader,
            useFactory: translateLoaderFactory,
            deps: [apiRestful_service_1.APIRestFulService]
        }; }
        return {
            ngModule: TranslateModule_1,
            providers: [TranslateService_1.TranslateService,
                providedLoader
            ]
        };
    };
    TranslateModule = TranslateModule_1 = __decorate([
        core_1.NgModule({
            declarations: [
                TranslatePipe_1.TranslatePipe
            ],
            exports: [
                TranslatePipe_1.TranslatePipe
            ]
        })
    ], TranslateModule);
    return TranslateModule;
    var TranslateModule_1;
}());
exports.TranslateModule = TranslateModule;


/***/ }),

/***/ "../../../../../src/app/shared/TranslatePipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var TranslatePipe = (function () {
    function TranslatePipe() {
    }
    TranslatePipe.prototype.transform = function (value, args) {
        if (global_settings_1.AppSettings.resourceBundle) {
            var d = global_settings_1.AppSettings.resourceBundle[value];
            if (!d || d === undefined)
                return value && value.length > 0 ? '[Missing Translate]' : '';
            else
                return d;
        }
        else
            return '[Waiting Translate]';
    };
    TranslatePipe = __decorate([
        core_1.Pipe({
            name: 'translate',
            pure: false
        }),
        __metadata("design:paramtypes", [])
    ], TranslatePipe);
    return TranslatePipe;
}());
exports.TranslatePipe = TranslatePipe;


/***/ }),

/***/ "../../../../../src/app/shared/TranslateService.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var TranslateLoader_1 = __webpack_require__("../../../../../src/app/shared/TranslateLoader.ts");
var TranslateService = (function () {
    function TranslateService(_TranslateLoader) {
        this._TranslateLoader = _TranslateLoader;
    }
    TranslateService.prototype.setTranslate = function () {
        return this._TranslateLoader.getTranslation();
    };
    TranslateService.prototype.getValue = function (key) {
        if (global_settings_1.AppSettings.resourceBundle) {
            var value = global_settings_1.AppSettings.resourceBundle[key];
            if (!value || value === undefined)
                return key && key.length > 0 ? '[Missing Translate]' : '';
            else
                return value;
        }
        else
            return '[Waiting Translate]';
    };
    TranslateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [TranslateLoader_1.TranslateLoader])
    ], TranslateService);
    return TranslateService;
}());
exports.TranslateService = TranslateService;


/***/ }),

/***/ "../../../../../src/app/shared/apiRestful.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var Observable_1 = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var customhttp_service_1 = __webpack_require__("../../../../../src/app/shared/customhttp.service.ts");
var responseresult_1 = __webpack_require__("../../../../../src/app/shared/responseresult.ts");
__webpack_require__("../../../../../src/app/shared/rxjs-operatiors.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var APIRestFulService = (function () {
    function APIRestFulService(http, _router) {
        this.http = http;
        this._router = _router;
    }
    APIRestFulService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    //   private handleError = (error: Response) => {
    //      if (error.status === 401 || error.status === 403) {
    //         this._router.navigate(['login']);
    //    this._router.navigate(['Login']);
    //    return Observable.of([]);
    // }
    APIRestFulService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = error.status ? error.status + " - " + error.statusText : 'Server error';
        // console.error(errMsg); // log to console instead
        return Observable_1.Observable.of(new responseresult_1.ResponseResult());
        // return Observable.throw(error);
    };
    // getPromise(uri: string) {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   this.createAuthorizationHeader(headers);
    //   return this.http.get(uri, {
    //     headers: headers
    //   }).toPromise()
    //     .then(this.extractData)
    //     .catch(this.handleError);
    // }
    APIRestFulService.prototype.getRequestAS = function (uri) {
        return this.http.get(uri).map(function (res) { return res.json(); });
    };
    APIRestFulService.prototype.getRequest = function (uri) {
        var responseresult = new responseresult_1.ResponseResult();
        return this.http.get(uri).map(function (res) {
            if (!res.ok) {
                throw new Error(res.toString());
            }
            else {
                responseresult.mapResult(res.json());
                return responseresult;
            }
        }).catch(this.handleError);
    };
    APIRestFulService.prototype.post = function (uri, data, mapJson) {
        if (mapJson === void 0) { mapJson = true; }
        var responseresult = new responseresult_1.ResponseResult();
        if (mapJson) {
            return this.http.post(uri, data)
                .map(function (response) {
                if (!response.ok) {
                    throw new Error(response.toString());
                }
                else {
                    responseresult.mapResult((response).json());
                    return responseresult;
                }
            }).catch(this.handleError);
        }
        else {
            return this.http.post(uri, data).catch(this.handleError);
        }
    };
    APIRestFulService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [customhttp_service_1.CustomHttp, router_1.Router])
    ], APIRestFulService);
    return APIRestFulService;
}());
exports.APIRestFulService = APIRestFulService;


/***/ }),

/***/ "../../../../../src/app/shared/auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var usertokeninfo_1 = __webpack_require__("../../../../../src/app/shared/usertokeninfo.ts");
var AuthService = (function () {
    function AuthService(httRequest) {
        this.httRequest = httRequest;
        this.userInfo = null;
        this.authenticated = false;
    }
    AuthService.prototype.getUserInfo = function () {
        try {
            var userinfoLS = localStorage.getItem('userInfo');
            var userjson = void 0;
            if (userinfoLS && userinfoLS.length > 0) {
                userjson = JSON.parse(userinfoLS);
            }
            else {
                userjson = null;
            }
            if (userjson) {
                this.userInfo = new usertokeninfo_1.UserTokenInfo(userjson);
            }
            else {
                this.userInfo = null;
            }
            return this.userInfo;
        }
        catch (ex) {
            return null;
        }
    };
    AuthService.prototype.UserInfForLogin = function () {
        return this.getUserInfo();
    };
    AuthService.prototype.UserInfo = function () {
        if (this.IsAuthCookieExist())
            return this.getUserInfo();
        return null;
    };
    AuthService.prototype.getUserName = function () {
        this.getUserInfo();
        return this.userInfo ? this.userInfo.UserName : '';
    };
    AuthService.prototype.getEmployeeNumber = function () {
        this.getUserInfo();
        return this.userInfo ? this.userInfo.EmployeeNumber : '';
    };
    AuthService.prototype.getUserEmpID = function () {
        this.getUserInfo();
        return this.userInfo ? this.userInfo.UserEmpID : '';
    };
    AuthService.prototype.getEmployeeName = function () {
        this.getUserInfo();
        return this.userInfo ? this.userInfo.EmployeeName : '';
    };
    AuthService.prototype.login = function (creds) {
        var url = global_settings_1.AppSettings.WebApiUrl + 'Anonymous/login';
        return this.httRequest.post(url, creds);
    };
    AuthService.prototype.logout = function () {
        var url = global_settings_1.AppSettings.WebApiUrl + 'Anonymous/logout';
        this.authenticated = false;
        //this.logoutPromisies();
        //  localStorage.setItem('userInfo', null);
        return this.httRequest.post(url);
    };
    AuthService.prototype.contnueLogin = function () {
        return this.httRequest.getRequest(global_settings_1.AppSettings.IamHereUrl);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.httRequest.getRequest(global_settings_1.AppSettings.IamHereUrl);
    };
    AuthService.prototype.IsAuthCookieExist = function () {
        try {
            // if(jQuery.cookie("ASPXAUTH") != null && !jQuery.cookie("ASPXAUTH")) 
            var cookie = document.cookie;
            if (cookie && cookie.length > 0 && cookie.indexOf("ASPXAUTH") >= 0) {
                return true;
            }
            else
                return false;
        }
        catch (ex) {
            return false;
        }
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "../../../../../src/app/shared/authguard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var AuthGuard = (function () {
    function AuthGuard(router, authService, translate, httRequest) {
        this.router = router;
        this.authService = authService;
        this.translate = translate;
        this.httRequest = httRequest;
        this.AllIsOK = true;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!global_settings_1.AppSettings.resourceBundle) {
                _this.translate.setTranslate().subscribe(function (res2) {
                    global_settings_1.AppSettings.resourceBundle = res2;
                    var isAuth = _this.authService.IsAuthCookieExist();
                    resolve(isAuth);
                    if (!isAuth)
                        _this.router.navigate(['login']);
                    return isAuth;
                });
            }
            else {
                var isAuth = _this.authService.IsAuthCookieExist();
                resolve(isAuth);
                if (!isAuth)
                    _this.router.navigate(['login']);
                return isAuth;
            }
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService,
            TranslateService_1.TranslateService, apiRestful_service_1.APIRestFulService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "../../../../../src/app/shared/customhttp.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var Observable_1 = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
__webpack_require__("../../../../../src/app/shared/rxjs-operatiors.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var CustomHttp = (function (_super) {
    __extends(CustomHttp, _super);
    function CustomHttp(backend, defaultOptions, _router, _route) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this._router = _router;
        _this._route = _route;
        return _this;
    }
    CustomHttp.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, this.getRequestOptionArgs()).catch(this.catchErrors()));
    };
    CustomHttp.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs()).catch(this.catchErrors()));
    };
    CustomHttp.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs()).catch(this.catchErrors()));
    };
    CustomHttp.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs()).catch(this.catchErrors()));
    };
    CustomHttp.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, this.getRequestOptionArgs()).catch(this.catchErrors()));
    };
    CustomHttp.prototype.catchErrors = function () {
        var _this = this;
        return function (res) {
            if (res.status === 401 || res.status === 403) {
                //handle authorization errors
                //in this example I am navigating to logout route which brings the login screen
                _this._router.navigate(['accessdenied']);
            }
            return Observable_1.Observable.throw(res);
        };
    };
    CustomHttp.prototype.getRequestOptionArgs = function () {
        var options = new http_1.RequestOptions();
        options.headers = new http_1.Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept-Language', this.getCurrentLanguage());
        // options.headers.append('Authorization', 'Basic ' + btoa(AppSettings.AuthorizationHeader));
        options.withCredentials = true;
        return options;
    };
    CustomHttp.prototype.getCurrentLanguage = function () {
        var _culture = 'ar';
        var cookie = document.cookie;
        if (cookie && cookie.length > 0 && cookie.indexOf("_culture") >= 0) {
            var cookiearry = document.cookie.split(";");
            var userinfo = '';
            cookiearry.forEach(function (e) {
                if (e.indexOf("_culture") >= 0) {
                    _culture = e.split('_culture=')[1];
                }
            });
        }
        global_settings_1.AppSettings.CurrentLang = _culture;
        return _culture;
    };
    CustomHttp.prototype.getUserInfo = function () {
        try {
            var cookie = document.cookie;
            if (cookie && cookie.length > 0 && cookie.indexOf("UserInfo") >= 0) {
                var cookiearry = document.cookie.split(";");
                var userinfo_1 = '';
                cookiearry.forEach(function (e) {
                    if (e.indexOf("UserInfo") >= 0) {
                        userinfo_1 = e;
                    }
                });
                return userinfo_1.split("UserInfo=")[1]; //document.cookie.split(";")[1].split("UserInfo=")[1];
            }
            else
                return null;
        }
        catch (ex) {
            return null;
        }
        // let user = AppSettings.AuthorizationHeader.split(':')[0];
        // return '{"Username":"' + user + '","Shortname":"HANDOUMEH",' +
        //   '"CreatedDate":"2016-09-30","CreatedTime":"0:47:55","ExpiryDate":"2017-09-30","ExpiryTime":"0:49:55"}';
    };
    CustomHttp.prototype.intercept = function (observable) {
        var _this = this;
        // 403  Forbidden
        // 401 Unauthorized
        return observable.do(function (res) {
            var userInfo = _this.getUserInfo();
            if (userInfo) {
                localStorage.setItem('userInfo', userInfo);
            }
        }).
            catch(function (err, source) {
            if (err.status === 403 || err.status === 401) {
                if (!err.url.toLowerCase().endsWith('login')) {
                    _this._router.navigate(['login'], { relativeTo: _this._route });
                    return Observable_1.Observable.empty();
                }
            }
            return Observable_1.Observable.throw(err);
        });
    };
    CustomHttp = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.ConnectionBackend, http_1.RequestOptions, router_1.Router, router_1.ActivatedRoute])
    ], CustomHttp);
    return CustomHttp;
}(http_1.Http));
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "../../../../../src/app/shared/global.settings.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = (function () {
    function AppSettings() {
    }
    Object.defineProperty(AppSettings, "CookiDomain", {
        // public static get WebApiUrl(): string { return 'http://twapi.logicaplus.net/'; }
        // public static get ResourceUrl(): string { return 'http://twapi.logicaplus.net/Anonymous/GetResources'; }
        // public static get IamHereUrl(): string { return 'http://twapi.logicaplus.net/Anonymous/IamHere'; }
        get: function () { return 'logicaplus.net'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettings, "WebApiUrl", {
        get: function () { return 'http://timewebapi.timeatt.local/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettings, "ResourceUrl", {
        get: function () { return 'http://timewebapi.timeatt.local/Anonymous/GetResources'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettings, "IamHereUrl", {
        get: function () { return 'http://timewebapi.timeatt.local/Anonymous/IamHere'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettings, "DataTableLanguage", {
        get: function () {
            return this.CurrentLang === 'ar' ? this.DataTableARLanguage : this.DataTableENLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSettings, "getCurrentLanguage", {
        get: function () {
            var _culture = 'ar';
            var cookie = document.cookie;
            if (cookie && cookie.length > 0 && cookie.indexOf("_culture") >= 0) {
                var cookiearry = document.cookie.split(";");
                var userinfo = '';
                cookiearry.forEach(function (e) {
                    if (e.indexOf("_culture") >= 0) {
                        _culture = e.split('_culture=')[1];
                    }
                });
            }
            return _culture;
        },
        enumerable: true,
        configurable: true
    });
    AppSettings.CurrentLang = 'ar';
    AppSettings.resourceBundle = null;
    AppSettings.DataTableARLanguage = {
        "decimal": "",
        "emptyTable": "لا يوجد بيانات",
        "info": "عرض من _START_ إلى _END_ من أصل _TOTAL_",
        "infoEmpty": "",
        "infoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "_MENU_",
        "loadingRecords": "تحميل....",
        "processing": "جاري التنفيذ....",
        "search": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
        "zeroRecords": "لم يتم العثور على سجلات",
        "paginate": {
            "first": "الأول",
            "last": "الأخير",
            "next": "التالي",
            "previous": "السابق"
        },
        "aria": {
            "sortAscending": ": فرز تصاعدي",
            "sortDescending": ": فرز تنازلي"
        },
        "searchPlaceholder": "بحث..."
    };
    AppSettings.DataTableENLanguage = {
        "decimal": "",
        "emptyTable": "No data available in table",
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoEmpty": "",
        "infoFiltered": "(filtered from _MAX_ total entries)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "_MENU_",
        "loadingRecords": "Loading...",
        "processing": "Processing...",
        "search": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
        "zeroRecords": "No matching records found",
        "paginate": {
            "first": "First",
            "last": "Last",
            "next": "Next",
            "previous": "Previous"
        },
        "aria": {
            "sortAscending": ": sort ascending",
            "sortDescending": ": sort descending"
        },
        "searchPlaceholder": "Search..."
    };
    return AppSettings;
}());
exports.AppSettings = AppSettings;


/***/ }),

/***/ "../../../../../src/app/shared/notifications.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var angular2_notifications_1 = __webpack_require__("../../../../angular2-notifications/angular2-notifications.umd.js");
var Notifications = (function () {
    function Notifications(_notifcation) {
        this._notifcation = _notifcation;
    }
    Notifications.prototype.showSuccess = function (title, body) {
        return this._notifcation.success(title, body).id;
    };
    Notifications.prototype.showError = function (title, body) {
        return this._notifcation.error(title, body).id;
    };
    Notifications = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angular2_notifications_1.NotificationsService])
    ], Notifications);
    return Notifications;
}());
exports.Notifications = Notifications;


/***/ }),

/***/ "../../../../../src/app/shared/responseresult.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResponseResult = (function () {
    function ResponseResult() {
    }
    ResponseResult.prototype.mapResult = function (res) {
        this.Status = (res.Status === '1');
        this.Msg = res.Msg;
        this.Result = res.Result;
        this.AdditionalInformation = res.AdditionalInformation;
    };
    return ResponseResult;
}());
exports.ResponseResult = ResponseResult;


/***/ }),

/***/ "../../../../../src/app/shared/rxjs-operatiors.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Observable class extensions
__webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
__webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
// Observable operators
__webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/distinctUntilChanged.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/do.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/filter.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/share.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/merge.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toArray.js");


/***/ }),

/***/ "../../../../../src/app/shared/safehtml.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = __decorate([
        core_1.Pipe({ name: 'safeHtml' }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());
exports.SafeHtmlPipe = SafeHtmlPipe;


/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var authguard_1 = __webpack_require__("../../../../../src/app/shared/authguard.ts");
var customhttp_service_1 = __webpack_require__("../../../../../src/app/shared/customhttp.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
function CustomHttpFactory(backend, defaultOptions, router, route) {
    return new customhttp_service_1.CustomHttp(backend, defaultOptions, router, route);
}
exports.CustomHttpFactory = CustomHttpFactory;
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function (providedCustomHttp) {
        if (providedCustomHttp === void 0) { providedCustomHttp = {
            provide: customhttp_service_1.CustomHttp, useFactory: CustomHttpFactory,
            deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router, router_1.ActivatedRoute]
        }; }
        return {
            ngModule: SharedModule_1,
            providers: [
                providedCustomHttp, apiRestful_service_1.APIRestFulService, auth_service_1.AuthService, authguard_1.AuthGuard
            ]
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule]
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());
exports.SharedModule = SharedModule;


/***/ }),

/***/ "../../../../../src/app/shared/stringformat.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var StringFormatPipe = (function () {
    function StringFormatPipe() {
    }
    StringFormatPipe.prototype.transform = function (value, args) {
        if (typeof args === 'string')
            args = [args];
        return value.stringFormat(args);
    };
    StringFormatPipe = __decorate([
        core_1.Pipe({
            name: 'formatstring',
            pure: false
        }),
        __metadata("design:paramtypes", [])
    ], StringFormatPipe);
    return StringFormatPipe;
}());
exports.StringFormatPipe = StringFormatPipe;


/***/ }),

/***/ "../../../../../src/app/shared/usertokeninfo.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserTokenInfo = (function () {
    function UserTokenInfo(data) {
        this.UserId = data.UserId;
        this.UserName = data.UserName;
        this.UserPer = data.UserPer;
        this.UserEmpID = data.UserEmpID;
        this.IsActive = data.IsActive;
        this.Email = data.Email;
        this.PasswordHash = data.PasswordHash;
        this.EmployeeName = data.EmployeeName;
        this.EmployeeNumber = data.EmployeeNumber;
        this.Created = data.Created;
        this.AuthType = data.AuthType;
        this.MustChangePassword = data.MustChangePassword;
    }
    return UserTokenInfo;
}());
exports.UserTokenInfo = UserTokenInfo;
var User = (function () {
    function User(username, password) {
        this.Username = username;
        this.Password = password;
        this.RememberMe = false;
    }
    return User;
}());
exports.User = User;


/***/ }),

/***/ "../../../../../src/app/task-action/task-action.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/task-action/task-action.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" [ngClass]=\"this.cultureLang == 'ar'? 'form-ar' : 'form-en'\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\r\n    <div>\r\n        <div class=\"col-md-12\">\r\n            <div id=\"Actiondetailsdiv\">\r\n                <div id=\"Task_formdetails\"  *ngIf=\"TaskInfo?.Response?.Status == 'OK'\">\r\n                    <div id=\"dataform\">\r\n                        <div class=\"Tlf\">\r\n                            <div class=\"Serv-detail\">\r\n                                <div class=\"serv-title\">\r\n                                    <label class=\"serv-nam\" id=\"Task_title\">{{'RequestTitle' | translate}}:{{TaskDetails?.Title}}</label>\r\n                                    <div class=\"rq-num\">\r\n                                        <label>{{'RequestNumber' | translate}}</label>\r\n                                        <label id=\"Task_taskno\">{{TaskDetails?.TaskNo}}</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"servDetialTBL\">\r\n                                    <div class=\"servDetialHD\">\r\n                                        <div class=\"User\">\r\n                                            <label id=\"Task_ReqEmpID\">{{TaskDetails?.Requester_empid}}</label>\r\n                                            <span>-</span>\r\n                                            <label id=\"Task_requestername\">{{TaskDetails?.Requester_fullname}}</label>\r\n                                        </div>\r\n                                        <div class=\"date\">\r\n                                            <label id=\"Task_createddate\">{{TaskDetails?.Created | date: 'dd/MM/yyyy hh:MM a'}}</label>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-detail\">\r\n                                        <label class=\"cell-3 pr0\">{{'LastModifiedReq' | translate}}</label>\r\n                                        <label id=\"Task_lastupdate\">{{TaskDetails?.Updated | date: 'dd/MM/yyyy hh:MM a'}}</label>\r\n                                    </div>\r\n                                    <span id=\"TaskDetailsBody\" [innerHtml]=\"TaskDetails?.TaskDetailsBody\"></span>\r\n                                </div>\r\n                            </div>\r\n                            <div id=\"Task_HDIV\">\r\n                                <div *ngFor=\"let row of TaskHistory\" class='TaskTBL' [ngClass]=\"GetClassName(row.WFStatus)\">\r\n                                    <div class=\"TaskAll\">\r\n                                        <!-- <span [innerHtml]=\"row.Userimg\"></span> -->\r\n                                        <div class=\"TaskHD\">\r\n                                            <div class=\"ACTNam\">\r\n                                                <label>{{row.AName}} :</label>\r\n                                                <span> {{row.CurrentUser}} </span>\r\n                                            </div>\r\n                                            <span [innerHtml]=\"row.Created\"> </span>\r\n                                            <div class=\"ACTSts hidden-xs\">\r\n                                                <label>{{(this.cultureLang == 'ar'? row.WFStatus_ar: row.WFStatus_en)}}</label>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"TaskCon\">\r\n                                            <div class=\"ACTNot\">\r\n                                                <label>{{row.TaskNote}} </label>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"alert alert-warning\">\r\n                            <label id=\"Task_desc\">{{'TakeAction' | translate}}</label>\r\n                        </div>\r\n                        <div class=\"form-input\">\r\n                            <label>{{'NotesLable' | translate}}</label>\r\n                            <textarea name=\"tasknote\" id=\"Task_txt_tasknote\" [(ngModel)]=\"tasknote\" col=\"30\" rows=\"10\" class=\"form-control\"></textarea>\r\n                            <!-- <asp:TextBox runat=\"server\" ID=\"Task_txt_tasknote\" TextMode=\"MultiLine\" CssClass=\"multiline\" res-type=\"T\" res-name=\"NotesRejection\" ClientIDMode=\"Static\"></asp:TextBox> -->\r\n                        </div>\r\n                        <div class=\"form-input form-btn\" id=\"clientbutton\">\r\n                            <button id=\"Task_bt_approve\" class=\"btn btn-primary btn-lg\" (click)=\"btnApproveAction()\" >{{'ApproveRequest' | translate}}</button>\r\n                            <button id=\"Task_bt_reject\" class=\"btn btn-lg\" (click)=\"btnRejectAction()\">{{'RejectRequest' | translate}}</button>\r\n                            <!-- <input type=\"button\" id=\"Task_bt_approve\" res-type=\"V\" res-name=\"ApproveRequest\" class=\"btn btn-gold btn-large\" >\r\n                            <input type=\"button\" id=\"Task_bt_reject\" res-type=\"V\" res-name=\"RejectRequest\" class=\"btn btn-gray btn-large\" /> -->\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div id=\"Task_accessdenaied\" class=\"alert alert-danger\" *ngIf=\"TaskInfo?.Response?.Status != 'OK'\">\r\n                    <span>{{'NotHavePermissionView' | translate}}</span>\r\n\r\n                    <label id=\"Task_msgerr\">{{responseMSG}}</label>\r\n                </div>\r\n\r\n            </div>\r\n            <div id=\"TaskActionmsgsuccess\" style=\"display: none\">\r\n                <div class=\"S-alert-s1\">\r\n                    <span id=\"tasksuccesscontent\"></span>\r\n                    <!-- <div>\r\n                        <div class=\"cell-6\">\r\n                            <p><a href=\"/\" res-type=\"H\" res-name=\"HomePage\"></a></p>\r\n                        </div>\r\n                        <div class=\"cell-6\">\r\n                            <p class=\"left\"><a href=\"/Tasks/Pages/Tasks.aspx\" res-type=\"H\" res-name=\"PageAssignTask\"></a></p>\r\n                        </div>\r\n                    </div> -->\r\n                </div>\r\n            </div>\r\n            <div id=\"TaskActionmsgerror\" style=\"display: none\">\r\n                <div class=\"E-alert-s1\">\r\n                    <span res-type=\"H\" res-name=\"OopsErrorExecutionRequest\"></span>\r\n                    <span id=\"taskerrorcontent\"></span>\r\n                    <!-- <div>\r\n                        <b>\r\n                            <a href=\"javascript:location.reload(false)\" res-type=\"H\" res-name=\"Clickheretorefreshpageandtryagain\"></a>\r\n                        </b>\r\n                    </div> -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n<div style=\"display: none\">\r\n    <div id=\"Task_dialog-confirm-app\" [ngClass]=\"this.cultureLang == 'ar'? 'form-ar' : 'form-en'\" class=\"sp-form\">\r\n        <div id=\"Task_appmsg\" class=\"I-alert-s1\">{{'SureApprove' | translate}}</div>\r\n    </div>\r\n</div>\r\n<div style=\"display: none\">\r\n    <div id=\"Task_dialog-confirm-rej\" [ngClass]=\"this.cultureLang == 'ar'? 'form-ar' : 'form-en'\" class=\"sp-form\">\r\n        <div id=\"rejmsg\" class=\"E-alert-s1\">{{'SureReject' | translate}}</div>\r\n    </div>\r\n</div>\r\n\r\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\r\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/task-action/task-action.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var isNumeric_1 = __webpack_require__("../../../../rxjs/_esm5/util/isNumeric.js");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var notifications_1 = __webpack_require__("../../../../../src/app/shared/notifications.ts");
//import { ActivatedRoute } from '@angular/router/src/router_state';
var TaskActionComponent = (function () {
    function TaskActionComponent(api, router, actRouter, authService, translate, _notifcation) {
        this.api = api;
        this.router = router;
        this.actRouter = actRouter;
        this.authService = authService;
        this.translate = translate;
        this._notifcation = _notifcation;
        this.tasknote = '';
    }
    TaskActionComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
    };
    TaskActionComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.actRouter.paramMap.subscribe(function (params) {
            if (isNumeric_1.isNumeric(params.get('taskid'))) {
                _this.taskID = parseInt(params.get('taskid'));
            }
            else
                _this.router.navigate(['**']);
        });
        this.FillActionTaskDetails();
        // else
        //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
    };
    TaskActionComponent.prototype.GetClassName = function (val) {
        switch (val) {
            case 7:
                return "TaskApp";
            case 8:
                return "TaskRej";
            case 10:
                return "TaskCan";
            case 2:
                return "TaskPen";
            case 3:
                return "TaskRej";
            case 2:
                return "TaskApp";
        }
    };
    Object.defineProperty(TaskActionComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    TaskActionComponent.prototype.FillActionTaskDetails = function () {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'workflow/GetTaskDetails/' + this.taskID).subscribe(function (res) {
            if (res.Status == 1) {
                _this.TaskInfo = res.Result;
                _this.TaskHistory = _this.TaskInfo.TaskHistoryDetails;
                _this.TaskDetails = _this.TaskInfo.TaskDetails;
            }
            else {
                _this.responseMSG = res.Msg;
            }
        });
    };
    TaskActionComponent.prototype.btnApproveAction = function () {
        this.actionType = 'approve';
        this.message = this.translate.getValue('SureApprove');
        this.openForm();
    };
    TaskActionComponent.prototype.btnRejectAction = function () {
        if (this.tasknote == '') {
            return;
        }
        this.actionType = 'reject';
        this.message = this.translate.getValue('SureReject');
        this.openForm();
    };
    TaskActionComponent.prototype.RejectAction = function () {
        var _this = this;
        var TaskData = {
            TaskID: this.taskID,
            TaskNote: this.tasknote,
        };
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'workflow/RejectActivity', TaskData, true).subscribe(function (res) {
            if (res.Status) {
                // jQuery("#Actiondetailsdiv").hide();
                // jQuery("#taskerrorcontent").html(this.translate.getValue('RejectCompleteOK'));
                // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#TaskActionmsgerror").fadeIn(50);
                _this._notifcation.showSuccess('', _this.translate.getValue('RejectCompleteOK'));
                _this.router.navigate(['mytasks']);
            }
            else {
                // jQuery("#Actiondetailsdiv").hide();
                // jQuery("#taskerrorcontent").html(res.Msg);
                // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#TaskActionmsgerror").fadeIn(50);
                _this._notifcation.showError('', res.Msg);
            }
        });
    };
    TaskActionComponent.prototype.ApproveAction = function () {
        var _this = this;
        var TaskData = {
            TaskID: this.taskID,
            TaskNote: this.tasknote
        };
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'workflow/ApproveActivity', TaskData, true).subscribe(function (res) {
            if (res.Status) {
                // jQuery("#Actiondetailsdiv").hide();
                // jQuery("#taskerrorcontent").html(this.translate.getValue('ApproveCompleteOK'));
                // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#TaskActionmsgerror").fadeIn(50);
                _this._notifcation.showSuccess('', _this.translate.getValue('ApproveCompleteOK'));
                _this.router.navigate(['mytasks']);
            }
            else {
                // jQuery("#Actiondetailsdiv").hide();
                // jQuery("#taskerrorcontent").html(res.Msg);
                // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#TaskActionmsgerror").fadeIn(50);
                _this._notifcation.showError('', res.Msg);
            }
        });
    };
    TaskActionComponent.prototype.openForm = function () {
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.message;
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = true; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Cancel";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'md'); //md,sm,lg
        }.bind(this), 200);
    };
    TaskActionComponent.prototype.onCloseAlert = function ($event) {
        if (this.actionType == 'approve')
            this.ApproveAction();
        else if (this.actionType == 'reject')
            this.RejectAction();
    };
    TaskActionComponent.prototype.onOpenAlert = function () { };
    TaskActionComponent.prototype.onDismissAlert = function () { };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], TaskActionComponent.prototype, "alert", void 0);
    TaskActionComponent = __decorate([
        core_1.Component({
            selector: 'app-task-action',
            template: __webpack_require__("../../../../../src/app/task-action/task-action.component.html"),
            styles: [__webpack_require__("../../../../../src/app/task-action/task-action.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router, router_1.ActivatedRoute,
            auth_service_1.AuthService, TranslateService_1.TranslateService, notifications_1.Notifications])
    ], TaskActionComponent);
    return TaskActionComponent;
}());
exports.TaskActionComponent = TaskActionComponent;


/***/ }),

/***/ "../../../../../src/app/task-details/task-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/task-details/task-details.component.html":
/***/ (function(module, exports) {

module.exports = "<form [ngClass]=\"this.cultureLang == 'ar'? 'form-ar' : 'form-en'\" id=\"WFAcctionPage\" class=\"sp-form\">\r\n  <div>\r\n    <div class=\"col-md-12\" >\r\n      <div id=\"canceleddiv\" class=\"alert alert-warning\" *ngIf=\"TaskDetails?.TaskStatus == 6\">\r\n        <span id=\"taskerrorcontent\"></span>\r\n        <span>{{'CancelRequest' | translate}}</span>\r\n      </div>\r\n      <div id=\"Actiondetailsdiv\">\r\n        <div id=\"Task_formdetails\" *ngIf=\"TaskInfo?.Response?.Status == 'OK'\">\r\n          <div id=\"dataform\">\r\n            <div class=\"Tlf\">\r\n              <div class=\"Serv-detail\">\r\n                <div class=\"serv-title\">\r\n                  <label class=\"serv-nam\" id=\"Task_title\">{{'RequestTitle' | translate}}:{{TaskDetails.Title}}</label>\r\n                  <div class=\"rq-num\">\r\n                    <label>{{'RequestNumber' | translate}}</label>\r\n                    <label id=\"Task_taskno\">{{TaskDetails?.TaskNo}}</label>\r\n                  </div>\r\n                </div>\r\n                <div class=\"servDetialTBL\">\r\n                  <div class=\"servDetialHD\">\r\n                    <div class=\"User\">\r\n                      <label id=\"Task_ReqEmpID\">{{TaskDetails?.Requester_empid}}</label>\r\n                      <span>-</span>\r\n                      <label id=\"Task_requestername\">{{TaskDetails?.Requester_fullname}}</label>\r\n                    </div>\r\n                    <div class=\"date\">\r\n                      <label id=\"Task_createddate\">{{TaskDetails?.Created | date: 'dd/MM/yyyy hh:MM a'}}</label>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"form-detail\">\r\n                    <label class=\"cell-3 pr0\">{{'LastModifiedReq' | translate}}</label>\r\n                    <label id=\"Task_lastupdate\">{{TaskDetails?.Updated | date: 'dd/MM/yyyy hh:MM a'}}</label>\r\n                  </div>\r\n                  <span id=\"TaskDetailsBody\" [innerHtml]=\"TaskDetails?.TaskDetailsBody  | safeHtml\"></span>\r\n                </div>\r\n              </div>\r\n              <div id=\"Task_HDIV\">\r\n                <div *ngFor=\"let row of TaskHistory\" class='TaskTBL' [ngClass]=\"GetClassName(row.WFStatus)\">\r\n                  <div class=\"TaskAll\">\r\n                    <!-- <span [innerHtml]=\"row.Userimg\"></span> -->\r\n                    <div class=\"TaskHD\">\r\n                      <div class=\"ACTNam\">\r\n                        <label>{{row.AName}} :</label>\r\n                        <span> {{row.CurrentUser}} </span>\r\n                      </div>\r\n                      <span [innerHtml]=\"row.Created\"> </span>\r\n                      <div class=\"ACTSts hidden-xs\">\r\n                        <label>{{(this.cultureLang == 'ar'? row.WFStatus_ar: row.WFStatus_en)}}</label>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"TaskCon\">\r\n                      <div class=\"ACTNot\">\r\n                        <label>{{row.TaskNote}} </label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div id=\"clientbutton\" class=\"form-input form-btn\">\r\n              <button id=\"Task_bt_cancel\" (click)=\"openForm()\" class=\"btn btn-primary\" *ngIf=\"TaskDetails.CanCancel\">{{'CancelRequestTitle' | translate}}</button>\r\n              <!-- <input type=\"button\"  res-type=\"V\" res-name=\"CancelRequestTitle\" class=\"btn btn-gray btn-large\" /> -->\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div id=\"Task_accessdenaied\" class=\"alert alert-danger\" *ngIf=\"TaskInfo?.Response?.Status != 'OK'\">\r\n          <span>{{'NotHavePermissionView' | translate}}</span>\r\n          <label id=\"Task_msgerr\">{{responseMSG}}</label>\r\n        </div>\r\n      </div>\r\n      <div id=\"TaskActionmsgsuccess\" style=\"display: none\">\r\n        <div class=\"S-alert-s1\">\r\n          <span id=\"tasksuccesscontent\"></span>\r\n          <!-- <div>\r\n                        <div class=\"cell-6\">\r\n                            <p><a href=\"/\" res-type=\"H\" res-name=\"HomePage\"></a></p>\r\n                        </div>\r\n                        <div class=\"cell-6\">\r\n                            <p class=\"left\"><a href=\"/Tasks/Pages/Requests.aspx\" res-type=\"H\" res-name=\"PageMyRequest\"></a></p>\r\n                        </div>\r\n                    </div> -->\r\n        </div>\r\n      </div>\r\n      <div id=\"TaskActionmsgerror\" style=\"display: none\">\r\n        <div class=\"E-alert-s1\">\r\n          <span>{{'OopsErrorExecutionRequest' | translate}}</span>\r\n          <span id=\"taskerrorcontent\"></span>\r\n          <!-- <div>\r\n                        <b>\r\n                            <a href=\"javascript:location.reload(false)\" res-type=\"H\" res-name=\"Clickheretorefreshpageandtryagain\"></a>\r\n                        </b>\r\n                    </div> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\r\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/task-details/task-details.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var isNumeric_1 = __webpack_require__("../../../../rxjs/_esm5/util/isNumeric.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var notifications_1 = __webpack_require__("../../../../../src/app/shared/notifications.ts");
var TaskDetailsComponent = (function () {
    function TaskDetailsComponent(api, router, actRouter, authService, translate, _notifcation) {
        this.api = api;
        this.router = router;
        this.actRouter = actRouter;
        this.authService = authService;
        this.translate = translate;
        this._notifcation = _notifcation;
    }
    TaskDetailsComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
    };
    TaskDetailsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.actRouter.paramMap.subscribe(function (params) {
            if (isNumeric_1.isNumeric(params.get('taskid'))) {
                _this.taskID = parseInt(params.get('taskid'));
            }
            else
                _this.router.navigate(['**']);
        });
        this.FillActionTaskDetails();
        // else
        //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
    };
    TaskDetailsComponent.prototype.GetClassName = function (val) {
        switch (val) {
            case 7:
                return "TaskApp";
            case 8:
                return "TaskRej";
            case 10:
                return "TaskCan";
            case 2:
                return "TaskPen";
            case 3:
                return "TaskRej";
            case 2:
                return "TaskApp";
        }
    };
    TaskDetailsComponent.prototype.readResource = function (con) {
        con.children().each(function () {
            if ($(this).attr('res-type') == 'H')
                $(this).html(this.translate.getValue([$(this).attr('res-name')]));
            else if ($(this).attr('res-type') == 'P')
                $(this).attr('placeholder', this.translate.getValue[$(this).attr('res-name')]);
            else if ($(this).attr('res-type') == 'T')
                $(this).attr('title', this.translate.getValue[$(this).attr('res-name')]);
            else if ($(this).attr('res-type') == 'V')
                $(this).val(this.translate.getValue[$(this).attr('res-name')]);
            else if ($(this).attr('res-type') == 'C')
                $(this).addClass(this.translate.getValue[$(this).attr('res-name')]);
            this.readResource($(this));
        });
    };
    Object.defineProperty(TaskDetailsComponent.prototype, "cultureLang", {
        get: function () {
            return global_settings_1.AppSettings.getCurrentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    TaskDetailsComponent.prototype.FillActionTaskDetails = function () {
        var _this = this;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'workflow/GetYourTaskDetails/' + this.taskID).subscribe(function (res) {
            if (res.Status == 1) {
                _this.TaskInfo = res.Result;
                _this.TaskHistory = _this.TaskInfo.TaskHistoryDetails;
                _this.TaskDetails = _this.TaskInfo.TaskDetails;
                setTimeout(function () {
                    _this.readResource($('#TaskBodyDetails'));
                }, 200);
            }
            else {
                _this.responseMSG = res.Msg;
            }
        });
    };
    TaskDetailsComponent.prototype.CancelRequest = function () {
        var _this = this;
        //this.api.post(AppSettings.WebApiUrl + 'Excuses/AddByEmp', this.excuseForm, true).subscribe((res: ResponseResult) => {
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'workflow/CancelActivity', this.taskID, true).subscribe(function (res) {
            if (res.Status) {
                // jQuery("#Actiondetailsdiv").hide();
                // jQuery("#tasksuccesscontent").html(this.translate.getValue('CancelCompleteOK'));
                // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#TaskActionmsgsuccess").slideDown("100");
                _this.TaskDetails.CanCancel = false;
                _this.TaskDetails.TaskStatus = 6;
                _this._notifcation.showSuccess('', _this.translate.getValue('CancelCompleteOK'));
            }
            else {
                // jQuery("#Actiondetailsdiv").hide();
                // jQuery("#taskerrorcontent").html(res.Msg);
                // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                // jQuery("#TaskActionmsgerror").fadeIn(50);
                _this._notifcation.showSuccess('', res.Msg);
            }
        });
    };
    TaskDetailsComponent.prototype.openForm = function () {
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.translate.getValue('SureCncelRequest');
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = true; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Cancel";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'md'); //md,sm,lg
        }.bind(this), 200);
    };
    TaskDetailsComponent.prototype.onCloseAlert = function ($event) {
        this.CancelRequest();
    };
    TaskDetailsComponent.prototype.onOpenAlert = function () { };
    TaskDetailsComponent.prototype.onDismissAlert = function () { };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], TaskDetailsComponent.prototype, "alert", void 0);
    TaskDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-task-details',
            template: __webpack_require__("../../../../../src/app/task-details/task-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/task-details/task-details.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router, router_1.ActivatedRoute,
            auth_service_1.AuthService, TranslateService_1.TranslateService, notifications_1.Notifications])
    ], TaskDetailsComponent);
    return TaskDetailsComponent;
}());
exports.TaskDetailsComponent = TaskDetailsComponent;


/***/ }),

/***/ "../../../../../src/app/timepicker/timepicker.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var timepicker_1 = __webpack_require__("../../../../../src/app/timepicker/timepicker.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var TimepickerModule = (function () {
    function TimepickerModule() {
    }
    TimepickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [timepicker_1.TimePicker],
            exports: [timepicker_1.TimePicker]
        })
    ], TimepickerModule);
    return TimepickerModule;
}());
exports.TimepickerModule = TimepickerModule;


/***/ }),

/***/ "../../../../../src/app/timepicker/timepicker.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
/**
 * Acts as a private class
 */
var TimepickerConfig = (function () {
    function TimepickerConfig() {
        //Override where the dropdown is appended.
        //Takes either a string to use as a selector, a function that gets passed the clicked input element as argument or a jquery object to use directly.
        this.appendTo = "body";
        //Close the timepicker when the window is scrolled. (Replicates <select> behavior.)
        this.closeOnWindowScroll = false;
        //Disable typing in the timepicker input box; force users to select from list. More information here.
        this.disableTextInput = false;
        //Disable the onscreen keyboard for touch devices. There can be instances where Firefox or Chrome have touch events enabled (such as on Surface tablets but not actually be a touch device. In this case disableTouchKeyboard will prevent the timepicker input field from being focused. More information here.
        this.disableTouchKeyboard = false;
        //Force update the time to step settings as soon as it loses focus.
        this.forceRoundTime = false;
        //Language constants used in the timepicker. Can override the defaults by passing an object with one or more of the following properties: decimal, mins, hr, hrs.
        this.lang = { am: 'am', pm: 'pm', AM: 'AM', PM: 'PM', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' };
        //The time that should appear first in the dropdown list.
        this.minTime = "12:00am";
        this.selectOnBlur = false;
        //Update the input with the currently highlighted time value when the timepicker loses focus.
        //Show "24:00" as an option when using 24-hour time format. You must also set timeFormat for this option to work.
        this.show2400 = false;
        //Shows the relative time for each item in the dropdown. minTime or durationTime must be set.
        this.showDuration = false;
        //The amount of time, in minutes, between each item in the dropdown. Alternately, you can specify a function to generate steps dynamically. The function will receive a count integer (0, 1, 2...) and is expected to return a step integer.
        this.step = 30;
        //When scrolling on the edge of the picker, it prevent parent containers () to scroll. default: false
        this.stopScrollPropagation = false;
        //Highlight the nearest corresponding time option as a value is typed into the form input.
        this.typeaheadHighlight = true;
        //Convert the input to an HTML <SELECT> control. This is ideal for small screen devices, or if you want to prevent the user from entering arbitrary values. This option is not compatible with the following options: appendTo, closeOnWindowScroll, disableTouchKeyboard, forceRoundTime, scrollDefault, selectOnBlur, typeAheadHighlight.
        this.useSelect = false;
        //If a time greater than 24 hours (27:30, for example) is entered, apply modolo 24 to create a valid time. Setting this to false will cause an input of 27:30 to result in a timeFormatError event.
        this.wrapHours = true;
    }
    return TimepickerConfig;
}());
exports.CALENDAR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TimePicker; }),
    multi: true
};
exports.CALENDAR_VALUE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return TimePicker; }),
    multi: true
};
var TimePicker = (function () {
    function TimePicker(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.changeTime = new core_1.EventEmitter();
        this.timeFormatError = new core_1.EventEmitter();
        this.hideTimepicker = new core_1.EventEmitter();
        this.selectTime = new core_1.EventEmitter();
        this.showTimepicker = new core_1.EventEmitter();
        this.timeRangeError = new core_1.EventEmitter();
        this.validateFn = function () { };
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    // implements functions
    TimePicker.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    TimePicker.prototype.ngOnChanges = function () {
        var self = this;
        var el = jQuery(this._elementRef.nativeElement);
        // Unbinding if timepicker present
        el.timepicker('remove');
        el.timepicker(this.options);
        el.on('changeTime', function (event) {
            self.onUpdate(event);
            self.changeTime.emit(event);
        });
        el.on('timeFormatError', function (event) {
            el.val('');
            el.focus();
            self.onUpdate(event);
            self.timeFormatError.emit(event);
        });
        el.on('hideTimepicker', function (event) {
            self.onTouchedCallback();
            self.hideTimepicker.emit(event);
        });
        el.on('selectTime', function (event) {
            self.selectTime.emit(event);
        });
        el.on('showTimepicker', function (event) {
            self.showTimepicker.emit(event);
        });
        el.on('timeRangeError', function (event) {
            el.val('');
            el.focus();
            self.onUpdate(event);
            self.timeRangeError.emit(event);
        });
    };
    TimePicker.prototype.onUpdate = function (event) {
        var value = this._elementRef.nativeElement.value;
        this.writeValue(value);
        //this._ngModel.viewToModelUpdate(value);
        //  this.onChangeCallback(value);
        // this._elementRef.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
    };
    TimePicker.prototype.writeValue = function (value) {
        this.onChangeCallback(value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
    };
    TimePicker.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TimePicker.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", TimepickerConfig)
    ], TimePicker.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimePicker.prototype, "changeTime", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimePicker.prototype, "timeFormatError", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimePicker.prototype, "hideTimepicker", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimePicker.prototype, "selectTime", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimePicker.prototype, "showTimepicker", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimePicker.prototype, "timeRangeError", void 0);
    TimePicker = __decorate([
        core_1.Directive({
            selector: 'input.timepicker[ngControl],input.timepicker[ngFormControl],input.timepicker[ngModel]',
            host: {
                '(change)': 'onChangeCallback($event.target.value)', '(blur)': 'onChangeCallback($event.target.value)'
            },
            providers: [exports.CALENDAR_VALUE_ACCESSOR, exports.CALENDAR_VALUE_VALIDATOR]
        }),
        __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
    ], TimePicker);
    return TimePicker;
}());
exports.TimePicker = TimePicker;


/***/ }),

/***/ "../../../../../src/app/vacation/vacation.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/vacation/vacation.component.html":
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" (ngSubmit)=\"submit()\" [ngBusy]=\"{busy: busy, message: 'Loading...', backdrop: true, delay: 1}\">\n  <div id=\"vacationrequest\">\n    <div class=\"cell-8\">\n      <div class=\"form-input\">\n        <label for=\"sel_VacationType\">{{\"VacationTypeClm\" | translate }}</label>\n        <select id=\"sel_VacationType\" name=\"vac_type\" [(ngModel)]=\"vacationForm.vac_type\" class=\"form-control\" #execuseReason_ID=\"ngModel\"\n          required>\n          <option [value]=\"null\" disabled>{{\"lb_PLZSelect\" | translate }}</option>\n          <option *ngFor=\"let type of vacationTypes\" [value]=\"type.vtype_id\">{{ type.vtype_name }}</option>\n        </select>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error':!f?.controls?.vac_fdateF?.valid && f?.controls?.vac_fdateF?.touched}\">\n        <label for=\"\">{{\"FromLable\" | translate }}</label>\n        <div>\n          <datepicker-popup (dateSelected)=\"onDateChange($event,'PS')\" name=\"vac_fdateF\" [(ngModel)]=\"vacationForm.vac_fdateF\" required>\n          </datepicker-popup>\n        </div>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error':!f?.controls?.vac_tdateF?.valid && f?.controls?.vac_tdateF?.touched}\">\n        <label for=\"\">{{\"ToLable\" | translate }}</label>\n        <div>\n          <datepicker-popup (dateSelected)=\"onDateChange($event,'PS')\" name=\"vac_tdateF\" [(ngModel)]=\"vacationForm.vac_tdateF\" required>\n          </datepicker-popup>\n        </div>\n      </div>\n      <div class=\"form-input form-btn\">\n        <button id=\"bt_AddVication\" class=\"btn btn-primary\" [disabled]=\"!f.valid\">{{\"AddRequest\" | translate }}</button>\n      </div>\n      <div id=\"errmsg\" class=\"E-alert-s1\" style=\"display: none\"></div>\n\n    </div>\n  </div>\n  <div id=\"msgsuccess\" style=\"display: none\">\n    <div class=\"S-alert-s1\">\n      <span>{{\"Yourrequestimplementedsuccessfully\" | translate }}</span>\n      <br />\n      <br />\n      <!-- <div> \n        <b>\n          <a href=\"javascript:location.reload(false)\" res-type=\"H\" res-name=\"ClickHeretoRefreshPage\"></a>\n        </b>\n      </div>-->\n    </div>\n  </div>\n  <div id=\"ErrorMsg\" style=\"display: none\">\n    <div class=\"E-alert-s1\">\n      <span>{{\"AddVactionErrorMsg\" | translate }}</span>\n      <br />\n      <span id=\"Vacationerrorcontent\"></span>\n      <br />\n      <!-- <div> \n        <b>\n          <a href=\"javascript:location.reload(false)\" res-type=\"H\" res-name=\"ClickHeretoRefreshPage\"></a>\n        </b>\n      </div>-->\n    </div>\n  </div>\n  <div style=\"display: none\">\n    <div id=\"VacationConfairmDiv\">\n      <div>\n        <span>{{\"VacationConfairmMSG\" | translate }}</span>\n\n      </div>\n      <div id=\"VacationBodyDiv\">\n        <div class=\"row\">\n          <div class=\"panel-12\">\n            <div class=\"form-detail\">\n              <label class=\"cell-3 pr0\">{{\"VacationTypeClm\" | translate }}</label>\n              <span id=\"lb_execdate\"> {{this.getSelectedTypeText()}} </span>\n            </div>\n            <div class=\"form-detail\">\n              <label class=\"cell-3 pr0\">{{\"FromLable\" | translate }}</label>\n              <span id=\"lb_exectype\">{{this.vacationForm.vac_fdateF}}</span>\n            </div>\n            <div class=\"form-detail\">\n              <label class=\"cell-3 pr0\">{{\"ToLable\" | translate }}</label>\n              <span id=\"lb_execreseon\">{{this.vacationForm.vac_tdateF}} </span>\n            </div>\n            <div class=\"form-detail\">\n              <label class=\"cell-3 pr0\">{{\"TotalDaysLable\" | translate }}</label>\n              <span id=\"lb_exectime\"> {{this.getTotalDays()}} </span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n\n<alertmsg #alert backdropModal='static' show-close=\"true\" (onClose)=\"onCloseAlert($event)\" (onOpened)=\"onOpenAlert()\" (onDismissed)=\"onDismissAlert()\">\n</alertmsg>"

/***/ }),

/***/ "../../../../../src/app/vacation/vacation.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_settings_1 = __webpack_require__("../../../../../src/app/shared/global.settings.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/shared/auth.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var apiRestful_service_1 = __webpack_require__("../../../../../src/app/shared/apiRestful.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var alert_component_1 = __webpack_require__("../../../../../src/app/Modals/alert.component.ts");
var TranslateService_1 = __webpack_require__("../../../../../src/app/shared/TranslateService.ts");
var VacationComponent = (function () {
    function VacationComponent(api, router, authService, translate) {
        this.api = api;
        this.router = router;
        this.authService = authService;
        this.translate = translate;
        this.vacationForm = { vac_fdate: 0, vac_tdate: 0, vac_fdateF: '', vac_tdateF: '', vac_type: null, vac_empid: 0, vac_typeT: '' };
    }
    VacationComponent.prototype.ngAfterViewInit = function () {
        this.GetVacationTypes();
    };
    VacationComponent.prototype.ngOnInit = function () {
        this.UserInfo = this.authService.UserInfo();
        // if (this.UserInfo == null) {
        //   this.router.navigate(['login']);
        // }
        // else
        this.vacationForm.vac_empid = this.UserInfo.UserEmpID;
    };
    VacationComponent.prototype.ShowErrormsg = function (msg) {
        jQuery("#errmsg").html(msg);
        jQuery("#errmsg").fadeIn(200);
    };
    VacationComponent.prototype.HideErrormsg = function () {
        jQuery("#errmsg").hide();
    };
    VacationComponent.prototype.onDateChange = function (e, d) {
    };
    VacationComponent.prototype.GetVacationTypes = function () {
        var _this = this;
        this.vacationForm.vac_type = null;
        this.busy = this.api.getRequestAS(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Vacations/Types/GetAll').subscribe(function (res) {
            if (res.Status == 1) {
                _this.vacationTypes = res.Result;
            }
            console.log(_this.vacationTypes);
        });
        // console.log(this.excuseForm);
    };
    VacationComponent.prototype.getSelectedTypeText = function () {
        return jQuery("#sel_VacationType option:selected").text();
    };
    VacationComponent.prototype.getTotalDays = function () {
        var vac_fdate = (new Date(this.vacationForm.vac_fdateF)).ToOADate();
        var vac_tdate = (new Date(this.vacationForm.vac_tdateF)).ToOADate();
        if (vac_fdate > vac_tdate)
            return 0;
        else
            return (vac_tdate - vac_fdate) + 1;
    };
    VacationComponent.prototype.openForm = function () {
        this.alert.refID = 11;
        this.alert.actionName = 'add';
        this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');
        this.alert.modalFooter = true; //show footer
        this.alert.modalMessage = true; //display message
        this.alert.message = this.message;
        // this.accountChartAction.cssModal = 'fade';
        this.alert.okButton = true; //show Ok Button
        this.alert.cancelButton = true; //show cancel Button
        this.alert.okButtonText = "OK";
        this.alert.cancelButtonText = "Cancel";
        this.alert.backdropModal = 'static';
        // let componentData = {
        //     component: AccountChartActionComponent,
        //     inputs: {
        //         fromAccountID: fromID,
        //         toAccountID: toID,
        //         toAccountIsType: typeID,
        //         action: action,
        //         accountType: this.accountType,
        //         accountClasses: this.accountClasses,
        //         accountFsItems: this.accountFsItems,
        //         title: ''
        //     }
        //};
        setTimeout(function () {
            this.alert.openDynamic(null, 'md'); //md,sm,lg
        }.bind(this), 200);
    };
    VacationComponent.prototype.onCloseAlert = function ($event) {
        this.vacationForm.vac_fdate = (new Date(this.vacationForm.vac_fdateF)).ToOADate();
        this.vacationForm.vac_tdate = (new Date(this.vacationForm.vac_tdateF)).ToOADate();
        this.busy = this.api.post(global_settings_1.AppSettings.WebApiUrl + 'SelfServices/Vacations/Add', this.vacationForm, true).subscribe(function (res) {
            if (res.Status) {
                console.log('done');
                jQuery("#vacationrequest").hide();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                jQuery("#msgsuccess").slideDown("100");
            }
            else {
                jQuery("#vacationrequest").hide();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                jQuery("#Vacationerrorcontent").html(res.Msg);
                jQuery("#ErrorMsg").slideDown("100");
            }
        }, function (error) {
            // if (error.status === 500) {
            //console.log(xhr.responseText);
            jQuery("#vacationrequest").hide();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            jQuery("#ErrorMsg").slideDown("100");
            //}
        });
        //console.log($event);
    };
    VacationComponent.prototype.onOpenAlert = function () { };
    VacationComponent.prototype.onDismissAlert = function () { };
    VacationComponent.prototype.submit = function () {
        this.HideErrormsg();
        var totexecTime = this.getTotalDays();
        //console.log(totexecTime);
        if (totexecTime == 0) {
            this.ShowErrormsg("الرجاء التحقق من تاريخ الإجازة");
            return;
        }
        else {
            console.log(this.vacationForm);
            this.message = jQuery("#VacationBodyDiv").html();
            this.openForm();
        }
    };
    __decorate([
        core_1.ViewChild('alert'),
        __metadata("design:type", alert_component_1.AlertMsgComponent)
    ], VacationComponent.prototype, "alert", void 0);
    VacationComponent = __decorate([
        core_1.Component({
            selector: 'app-vacation',
            template: __webpack_require__("../../../../../src/app/vacation/vacation.component.html"),
            styles: [__webpack_require__("../../../../../src/app/vacation/vacation.component.css")]
        }),
        __metadata("design:paramtypes", [apiRestful_service_1.APIRestFulService, router_1.Router,
            auth_service_1.AuthService, TranslateService_1.TranslateService])
    ], VacationComponent);
    return VacationComponent;
}());
exports.VacationComponent = VacationComponent;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map