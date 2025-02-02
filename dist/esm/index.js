import React, { Children } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            list: Children.toArray(_this.props.children)
        };
        return _this;
    }
    Menu.prototype.AddMenuItems = function () {
        var item = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            item[_i] = arguments[_i];
        }
        var d = this.state.list;
        item.forEach(function (i) {
            d.push(i);
        });
        this.setState({
            list: d
        });
    };
    Menu.prototype.ClearItems = function () {
        this.setState({
            list: []
        });
    };
    Menu.prototype.SpliceItems = function (start, count) {
        var d = {
            list: this.state.list,
        };
        d.list.splice(start, count);
        this.setState(d);
    };
    Menu.prototype.DeleteItemById = function (id) {
        var startIndex = -1;
        for (var i = 0; i < this.state.list.length; i++) {
            var it_1 = this.state.list[i];
            if (it_1) {
                var r = it_1;
                if (r) {
                    if (r.props.id === id) {
                        startIndex = i;
                        break;
                    }
                }
            }
        }
        if (startIndex !== -1) {
            this.SpliceItems(startIndex, 1);
        }
    };
    Menu.prototype.render = function () {
        var _a;
        return React.createElement("div", { className: (_a = this.props.className) !== null && _a !== undefined ? _a : "bsr-menu", style: this.props.style, id: this.props.id }, this.state.list);
    };
    return Menu;
}(React.Component));

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;
  return unsafeStringify(rnds);
}

var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.mRefPopup = React.createRef();
        _this.mRefMenuItem = React.createRef();
        _this.omMouseOver = _this.omMouseOver.bind(_this);
        _this.omMouseOut = _this.omMouseOut.bind(_this);
        _this.innerClick = _this.innerClick.bind(_this);
        _this.state = {
            isOpen: false,
            list: Children.toArray(_this.props.children)
        };
        _this.id = (_a = _this.props.id) !== null && _a !== undefined ? _a : v4();
        _this.href = _this.props.href;
        return _this;
    }
    MenuItem.prototype.AddIMenuItems = function () {
        var item = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            item[_i] = arguments[_i];
        }
        var d = {
            list: this.state.list,
            isOpen: this.state.isOpen
        };
        item.forEach(function (i) {
            d.list.push(i);
        });
        this.setState(d);
    };
    MenuItem.prototype.ClearItems = function () {
        var d = {
            list: [],
            isOpen: this.state.isOpen
        };
        this.setState(d);
    };
    MenuItem.prototype.GetHtmlDiv = function () {
        return this.mRefMenuItem.current;
    };
    MenuItem.prototype.SpliceItems = function (start, count) {
        var d = {
            isOpen: this.state.isOpen,
            list: this.state.list,
        };
        d.list.splice(start, count);
        this.setState(d);
    };
    MenuItem.prototype.DeleteItemById = function (id) {
        var startIndex = -1;
        for (var i = 0; i < this.state.list.length; i++) {
            var it_1 = this.state.list[i];
            if (it_1) {
                var r = it_1;
                if (r) {
                    if (r.props.id === id) {
                        startIndex = i;
                        break;
                    }
                }
            }
        }
        if (startIndex !== -1) {
            this.SpliceItems(startIndex, 1);
        }
    };
    MenuItem.prototype.innerClick = function () {
        if (this.props.onClick) {
            this.props.onClick(this);
        }
    };
    MenuItem.prototype.getContent = function () {
        if (this.props.href) {
            return (React.createElement("a", { onClick: this.innerClick, style: this.props.style, className: 'bsr-menu-link', href: this.props.href }, this.props.content));
        }
        else {
            return React.createElement("div", { onClick: this.innerClick, style: this.props.style, className: 'bsr-menu-link' }, this.props.content);
        }
    };
    MenuItem.prototype.omMouseOver = function () {
        var _a, _b, _c, _d;
        if (this.mRefPopup.current) {
            this.mRefPopup.current.style.visibility = 'visible';
            if (this.props.dropPosition === 'right' && this.mRefMenuItem.current) {
                var d = "" + ((_a = this.mRefMenuItem.current) === null || _a === undefined ? undefined : _a.offsetWidth) + "px";
                var h = "" + ((_b = this.mRefMenuItem.current) === null || _b === undefined ? undefined : _b.offsetTop) + "px";
                this.mRefPopup.current.style.marginLeft = d;
                this.mRefPopup.current.style.top = h;
            }
            if (this.props.dropPosition === 'left' && this.mRefMenuItem.current) {
                var d = "-" + ((_c = this.mRefPopup.current) === null || _c === undefined ? undefined : _c.offsetWidth) + "px";
                var h = "" + ((_d = this.mRefMenuItem.current) === null || _d === undefined ? undefined : _d.offsetTop) + "px";
                this.mRefPopup.current.style.marginLeft = d;
                this.mRefPopup.current.style.top = h;
            }
            if (this.props.iconOpen && this.props.iconClose) {
                this.setState({
                    isOpen: true
                });
            }
        }
    };
    MenuItem.prototype.omMouseOut = function () {
        if (this.mRefPopup.current) {
            this.mRefPopup.current.style.visibility = 'hidden';
            if (this.props.iconOpen && this.props.iconClose) {
                this.setState({
                    isOpen: false
                });
            }
        }
    };
    MenuItem.prototype.getInnerLi = function () {
        if (this.props.dropPosition === 'left') {
            return React.createElement(React.Fragment, null,
                this.state.isOpen ? this.props.iconOpen : this.props.iconClose,
                React.createElement("div", { style: { width: "100%" } }, this.getContent()));
        }
        else {
            return React.createElement(React.Fragment, null,
                React.createElement("div", { style: { width: "100%" } }, this.getContent()),
                this.state.isOpen ? this.props.iconOpen : this.props.iconClose);
        }
    };
    MenuItem.prototype.getLi = function () {
        var _a;
        if (this.props.iconOpen && this.props.iconClose) {
            return React.createElement("div", { ref: this.mRefMenuItem, id: this.id, onMouseOver: this.omMouseOver, onMouseOut: this.omMouseOut, className: 'menu-item bsr-container-item' }, this.getInnerLi());
        }
        else {
            return React.createElement("div", { ref: this.mRefMenuItem, className: (_a = this.props.className) !== null && _a !== undefined ? _a : "menu-item", id: this.id, onMouseOver: this.omMouseOver, onMouseOut: this.omMouseOut }, this.getContent());
        }
    };
    MenuItem.prototype.getRoot = function () {
        var _a;
        if (this.state.list.length === 0) {
            return React.createElement("div", { ref: this.mRefMenuItem, id: this.id, className: (_a = this.props.className) !== null && _a !== undefined ? _a : "menu-item" }, this.getContent());
        }
        else {
            return React.createElement("div", { id: this.id, style: { height: "100%" } },
                this.getLi(),
                React.createElement("div", { ref: this.mRefPopup, className: 'bsr-popup', style: { visibility: "hidden" }, onMouseOut: this.omMouseOut, onMouseOver: this.omMouseOver }, this.state.list));
        }
    };
    MenuItem.prototype.render = function () {
        return React.createElement(React.Fragment, null, this.getRoot());
    };
    return MenuItem;
}(React.Component));

export { Menu, MenuItem };
