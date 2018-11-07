"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_modal_1 = __importDefault(require("react-modal"));
require("./modal.scss");
var closeTimeoutMS = 500;
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        if (props.ariaHideApp) {
            react_modal_1.default.setAppElement(props.setAppElement);
        }
        return _this;
    }
    Modal.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.directionFrom, directionFrom = _b === void 0 ? 'right' : _b, className = _a.className, overlayClassName = _a.overlayClassName, CloseComponent = _a.closeComponent, props = __rest(_a, ["children", "directionFrom", "className", "overlayClassName", "closeComponent"]);
        var directionClass = "slide-pane--" + directionFrom;
        return (react_1.default.createElement(react_modal_1.default, __assign({ ariaHideApp: false, contentLabel: 'Modal', closeTimeoutMS: closeTimeoutMS }, props, { className: "slide-pane " + directionClass + " " + (className || ''), overlayClassName: "slide-pane--overlay " + (overlayClassName || ''), style: {
                content: { width: this.props.width || '80%' },
            } }),
            react_1.default.createElement("div", null,
                children,
                CloseComponent ? (react_1.default.createElement(CloseComponent, null)) : (react_1.default.createElement("button", { className: 'slide-pane--close', "aria-label": 'close', onClick: this.props.onRequestClose },
                    react_1.default.createElement("img", { src: '/close.svg' }))))));
    };
    Modal.defaultProps = {
        isOpen: false,
    };
    return Modal;
}(react_1.default.Component));
exports.default = Modal;
