var tent = tent || {};
tent.global = window;
tent.Namespace = function Namespace(parent, path) {
  if(!path) {
    if(!parent) {
      throw"must specify namespace path";
    }else {
      path = parent;
      parent = tent.global
    }
  }
  if(path === "..") {
    if(parent === tent.global) {
      throw"cannot use '..' at top level";
    }
    return parent.parent
  }
  var dot1 = path.indexOf(".");
  var dot2 = dot1 < 0 ? -1 : path.indexOf(".", dot1 + 1);
  var fullPath = parent === tent.global ? "" : parent.fullname + "";
  if(fullPath) {
    fullPath += "."
  }
  fullPath += path;
  if(dot1 < 0) {
    if(typeof parent[path] == "undefined") {
      this.fullname = fullPath;
      this.name = path;
      this.parent = parent;
      parent[path] = this
    }else {
      if(!parent[path] instanceof tent.Namespace) {
        throw'error creating namespace: "' + fullPath + '" is not a Namespace object';
      }else {
        return parent[path]
      }
    }
  }else {
    return new tent.Namespace(new tent.Namespace(parent, path.slice(0, dot1)), path.slice(dot1 + 1))
  }
  return this
};
tent.__tentTmp = new tent.Namespace("__tentTmp");
tent.__tentTmp.Namespace = tent.Namespace;
tent.__tentTmp.fullname = "tent";
tent.__tentTmp.name = "tent";
tent.__tentTmp.parent = tent.global;
tent.__tentTmp.global = tent.global;
tent.global.tent = tent.__tentTmp;
delete tent.__tentTmp;
try {
  delete tent.global.__tentTmp
}catch(ex) {
}
tent.Namespace.prototype.expand = function(expander) {
  expander(this);
  return this
};
tent.declare = function() {
  var ns;
  for(var i = 0;i < arguments.length;i++) {
    var a = arguments[i];
    if(a instanceof tent.Namespace) {
      ns = a
    }else {
      if(typeof a == "string") {
        if(!ns) {
          ns = new tent.Namespace(a)
        }else {
          ns = new tent.Namespace(ns, a)
        }
      }else {
        if(a instanceof Function) {
          if(!ns) {
            throw"no namespace provided";
          }
          ns.expand(a)
        }else {
          throw"invalid argument type at index " + i + ", expected Namespace, string, Function";
        }
      }
    }
  }
  return ns
};
tent.isDOMObject = function(obj) {
  if(typeof Node != "undefined" && obj instanceof Node || typeof Element != "undefined" && obj instanceof Element || typeof NodeList != "undefined" && obj instanceof NodeList || obj === window || obj === document) {
    return true
  }
  if(typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string") {
    return true
  }
  return false
};
tent.DOMPropertyNames = ["nextSibling", "onresizeend", "onrowenter", "aria-haspopup", "childNodes", "ondragleave", "canHaveHTML", "onbeforepaste", "ondragover", "onbeforecopy", "aria-disabled", "onpage", "recordNumber", "previousSibling", "nodeName", "onbeforeactivate", "accessKey", "currentStyle", "scrollLeft", "onbeforeeditfocus", "oncontrolselect", "aria-hidden", "onblur", "hideFocus", "clientHeight", "style", "onbeforedeactivate", "dir", "aria-expanded", "onkeydown", "nodeType", "ondragstart", 
"onscroll", "onpropertychange", "ondragenter", "id", "aria-level", "onrowsinserted", "scopeName", "lang", "onmouseup", "aria-busy", "oncontextmenu", "language", "scrollTop", "offsetWidth", "onbeforeupdate", "onreadystatechange", "onmouseenter", "filters", "onresize", "isContentEditable", "aria-checked", "aria-readonly", "oncopy", "onselectstart", "scrollHeight", "onmove", "ondragend", "onrowexit", "lastChild", "aria-secret", "onactivate", "canHaveChildren", "onfocus", "onfocusin", "isMultiLine", 
"onmouseover", "offsetTop", "oncut", "parentNode", "tagName", "className", "onmousemove", "title", "role", "behaviorUrns", "onfocusout", "onfilterchange", "disabled", "parentTextEdit", "ownerDocument", "offsetParent", "aria-posinset", "ondrop", "ondblclick", "onrowsdelete", "tabIndex", "onkeypress", "aria-relevant", "onlosecapture", "innerText", "aria-live", "parentElement", "ondeactivate", "aria-labelledby", "aria-pressed", "children", "ondatasetchanged", "ondataavailable", "aria-invalid", "onafterupdate", 
"nodeValue", "onmousewheel", "onkeyup", "readyState", "onmovestart", "aria-valuenow", "aria-selected", "onmouseout", "aria-owns", "aria-valuemax", "onmoveend", "contentEditable", "document", "firstChild", "sourceIndex", "outerText", "isTextEdit", "isDisabled", "oncellchange", "runtimeStyle", "scrollWidth", "aria-valuemin", "onlayoutcomplete", "onhelp", "attributes", "offsetHeight", "onerrorupdate", "onmousedown", "clientTop", "aria-setsize", "clientWidth", "onpaste", "tagUrn", "onmouseleave", "onclick", 
"outerHTML", "ondrag", "aria-controls", "onresizestart", "aria-flowto", "ondatasetcomplete", "aria-required", "clientLeft", "aria-describedby", "all", "onbeforecut", "innerHTML", "aria-activedescendant", "aria-multiselectable", "offsetLeft", "dataSrc", "dataFld", "dataFormatAs", "name", "nextSibling", "onresizeend", "onrowenter", "aria-haspopup", "childNodes", "ondragleave", "canHaveHTML", "onbeforepaste", "ondragover", "onbeforecopy", "aria-disabled", "onpage", "recordNumber", "previousSibling", 
"nodeName", "onbeforeactivate", "accessKey", "currentStyle", "scrollLeft", "onbeforeeditfocus", "oncontrolselect", "aria-hidden", "onblur", "hideFocus", "clientHeight", "style", "onbeforedeactivate", "dir", "aria-expanded", "onkeydown", "nodeType", "ondragstart", "onscroll", "onpropertychange", "ondragenter", "id", "aria-level", "onrowsinserted", "scopeName", "lang", "onmouseup", "aria-busy", "oncontextmenu", "language", "scrollTop", "offsetWidth", "onbeforeupdate", "onreadystatechange", "onmouseenter", 
"filters", "onresize", "isContentEditable", "aria-checked", "aria-readonly", "oncopy", "onselectstart", "scrollHeight", "onmove", "ondragend", "onrowexit", "lastChild", "aria-secret", "onactivate", "canHaveChildren", "onfocus", "onfocusin", "isMultiLine", "onmouseover", "offsetTop", "oncut", "parentNode", "tagName", "className", "onmousemove", "title", "role", "behaviorUrns", "onfocusout", "onfilterchange", "disabled", "parentTextEdit", "ownerDocument", "offsetParent", "aria-posinset", "ondrop", 
"ondblclick", "onrowsdelete", "tabIndex", "onkeypress", "aria-relevant", "onlosecapture", "innerText", "aria-live", "parentElement", "ondeactivate", "aria-labelledby", "aria-pressed", "children", "ondatasetchanged", "ondataavailable", "aria-invalid", "onafterupdate", "nodeValue", "onmousewheel", "onkeyup", "readyState", "onmovestart", "aria-valuenow", "aria-selected", "onmouseout", "aria-owns", "aria-valuemax", "onmoveend", "contentEditable", "document", "firstChild", "sourceIndex", "outerText", 
"isTextEdit", "isDisabled", "oncellchange", "runtimeStyle", "scrollWidth", "aria-valuemin", "onlayoutcomplete", "onhelp", "attributes", "offsetHeight", "onerrorupdate", "onmousedown", "clientTop", "aria-setsize", "clientWidth", "onpaste", "tagUrn", "onmouseleave", "onclick", "outerHTML", "ondrag", "aria-controls", "onresizestart", "aria-flowto", "ondatasetcomplete", "aria-required", "clientLeft", "aria-describedby", "all", "onbeforecut", "innerHTML", "aria-activedescendant", "aria-multiselectable", 
"offsetLeft", "dataSrc", "dataFld", "dataFormatAs", "name"];
tent.isDOMProperty = function(name) {
  if(!tent.DOMPropertyNames.indexOf) {
    tent.DOMPropertyNames.indexOf = tent.arrays.functions.indexOf
  }
  return tent.DOMPropertyNames.indexOf(name) >= 0
};
tent.domClone = function(obj, options) {
  if(obj === null) {
    return null
  }else {
    if(typeof obj == "undefined") {
      return undefined
    }else {
      if(typeof obj == "object") {
        if(options && options.onlyForTracking && tent.changes.getPropertyInterceptMode() != tent.changes.PropertyInterceptModes.DEFINEPROPERTYONLYDOM) {
          return obj
        }
        if(!options) {
          options = {}
        }else {
          if(options.deep && !options.deepStack) {
            options.deepStack = tent.arrays.addFunctions([])
          }
        }
        if(obj instanceof Array) {
          var cloneObj = [];
          for(var i = 0;i < obj.length;i++) {
            if(options.deep) {
              options.deepStack.push(obj);
              if(options.deepStack.lastIndexOf(obj[i]) < 0) {
                cloneObj.push(tent.domClone(obj[i], options))
              }
              options.deepStack.pop()
            }else {
              cloneObj.push(obj[i])
            }
          }
          return cloneObj
        }else {
          var cloneObj = document.createElement("span");
          for(var pname in obj) {
            if(!options.clonePrivates && pname.substr(0, 1) == "_") {
              cloneObj[pname] = obj[pname]
            }else {
              if(options.deep && typeof obj[pname] == "object") {
                options.deepStack.push(obj);
                if(options.deepStack.indexOf(obj[i]) < 0) {
                  cloneObj[pname] = tent.domClone(obj[pname], options)
                }
                options.deepStack.pop()
              }else {
                cloneObj[pname] = obj[pname]
              }
            }
          }
          return cloneObj
        }
      }
    }
  }
  return obj
};tent.declare("tent.arrays", function(exports) {
  exports.addFunctions = function(array, override) {
    for(var fname in exports.functions) {
      if(override || !(array[fname] instanceof Function)) {
        array[fname] = exports.functions[fname]
      }
    }
    return array
  };
  exports.functions = {indexOf:function(item) {
    for(var i = 0, l = this.length;i < l;i++) {
      if(this[i] === item) {
        return i
      }
    }
    return-1
  }, lastIndexOf:function(item) {
    for(var i = this.length - 1;i > 0;i--) {
      if(this[i] === item) {
        return i
      }
    }
    return-1
  }, filter:function(condition) {
    var filtered = [];
    for(var i = 0, l = this.length;i < l;i++) {
      if(condition(this[i])) {
        filtered.push(this[i])
      }
    }
    return filtered
  }, remove:function() {
    var removed;
    for(var i = 0, l = this.length;i < l;i++) {
      for(var ai = 0, al = arguments.length;ai < al;ai++) {
        if(this[i] == arguments[ai]) {
          this.splice(i, 1);
          removed = true;
          i--;
          l--;
          break
        }
      }
    }
    if(removed) {
      return true
    }
  }, set:function(i, item) {
    this.splice(i, 1, item)
  }, pushUnique:function() {
    if(arguments.length == 1) {
      var found = false;
      for(var i = 0, l = this.length;i < l;i++) {
        if(this[i] == arguments[0]) {
          found = true;
          break
        }
      }
      if(!found) {
        this.push(arguments[0])
      }
    }else {
      var exists = [];
      for(var i = 0, l = this.length;i < l;i++) {
        for(var ai = 0, al = arguments.length;ai < al;ai++) {
          if(this[i] == arguments[ai]) {
            exists[ai] = true
          }
        }
      }
      for(var ai = 0, al = arguments.length;ai < al;ai++) {
        if(!exists[ai]) {
          this.push(arguments[ai])
        }
      }
    }
    return this.length
  }, clone:function() {
    var cl = [];
    Array.prototype.push.apply(cl, this);
    return cl
  }, isCloneOf:function(array) {
    if(!array) {
      return false
    }
    if(this.length != array.length) {
      return false
    }
    if(this === array) {
      return false
    }
    for(var i = this.length;i >= 0;i--) {
      if(this[i] != array[i]) {
        return false
      }
    }
    return true
  }};
  return exports
});tent.declare("tent.coreTypes", function(exports) {
  exports.Enum = function Enum() {
    this.__names__ = [];
    this.__values__ = {};
    this.__flags__ = false;
    this.__enum = true;
    if(arguments.length > 0) {
      this.add.apply(this, arguments)
    }
  };
  exports.Enum.prototype.getName = function(value) {
    if(this.__names__) {
      if(this.__names__[value]) {
        return this.__names__[value]
      }else {
        if(this.__flags__) {
          var v = value, n = "";
          for(var name in this.__values__) {
            if(this.__values__[name] && (this.__values__[name] & v) === this.__values__[name]) {
              v -= this.__values__[name];
              if(n) {
                n += "|"
              }
              n += name
            }
          }
          if(n && v === 0) {
            return n
          }else {
            if(n) {
              return n + "|" + v
            }
          }
        }
      }
    }
  };
  exports.Enum.prototype.__freeValue__ = function() {
    var free = typeof this.__maxValue__ == "undefined" ? 1 : this.__maxValue__ + 1;
    if(this.__values__ && typeof this.__values__[free] != "undefined") {
      for(var n in this.__values__) {
        if(this.__values__[n] >= free) {
          this.__maxValue__ = this.__values__[n];
          free = this.__values__[n] + 1
        }
      }
    }
    if(this.__flags__) {
      if(free < 1) {
        free = 1
      }else {
        free = Math.pow(2, Math.ceil(Math.log(free) / Math.log(2)))
      }
    }
    return free
  };
  exports.Enum.prototype.useFlags = function(uf) {
    this.__flags__ = uf;
    return this
  };
  var __setNameValue__ = function(_enum, name, value) {
    _enum[name] = value;
    _enum.__values__[name] = value;
    if(typeof _enum.__names__[value] == "undefined") {
      _enum.__names__[value] = name
    }
    if(typeof _enum.__maxValue__ == "undefined" || _enum.__maxValue__ < value) {
      _enum.__maxValue__ = value
    }
  };
  exports.Enum.prototype.add = function() {
    if(arguments.length < 1) {
      return this
    }
    var names, name;
    for(var argi = 0, argl = arguments.length;argi < argl;argi++) {
      var data = arguments[argi];
      if(data instanceof Array) {
        this.add.apply(this, data)
      }else {
        if(typeof data == "object") {
          for(name in data) {
            if(data.hasOwnProperty(name)) {
              var v = this.__values__[name];
              if(!v instanceof Number || typeof this.__names__[v] != "undefined") {
                v = this.__freeValue__()
              }
              __setNameValue__(this, name, v)
            }
          }
        }
      }
      if(typeof data == "string") {
        if(data) {
          names = data.split(",");
          for(var i = 0, l = names.length;i < l;i++) {
            name = names[i].replace(/^\s+/g, "").replace(/\s+$/g, "");
            if(name == "_FLAGS") {
              this.useFlags(true)
            }else {
              if(typeof this.__values__[name] != "undefined") {
                if(this.__values__[name] instanceof Number) {
                  throw"Enum duplicate name found: " + name;
                }else {
                  throw"Enum invalid name (reserved): " + name;
                }
              }
              if(i == l - 1 && argi < argl - 1 && typeof arguments[argi + 1] == "number") {
                __setNameValue__(this, name, arguments[argi + 1]);
                argi++
              }else {
                __setNameValue__(this, name, this.__freeValue__())
              }
            }
          }
        }
      }
    }
    return this
  };
  var NameCounter_NodeToString = function() {
    var s = this._name + (this._count > 1 ? "(" + this._count + ")" : "");
    if(this._childrenCount) {
      s += "{";
      var i = 0;
      for(var n in this) {
        if(n.substr(0, 1) != "_" && typeof this[n] == "object") {
          if(i > 0) {
            s += ", "
          }
          s += this[n];
          i++
        }
      }
      s += "}"
    }
    return s
  };
  exports.NameCounter = function NameCounter(name) {
    this.root = {_name:name || "", _count:0, toString:NameCounter_NodeToString}
  };
  exports.NameCounter.prototype.__nodeAdd__ = function(node, inc) {
    node._count = (node._count || 0) + inc;
    if(node._parent) {
      if(node._count == 0 && !node._childrenCount) {
        if(node._parent._childrenCount) {
          node._parent._childrenCount--
        }
        delete node._parent[node._name]
      }
      this.__nodeAdd__(node._parent, inc)
    }
  };
  exports.NameCounter.prototype.add = function(name, inc) {
    if(typeof inc != "number") {
      inc = 1
    }
    var namePath = name.split(".");
    var node = this.root;
    for(var i = 0;i < namePath.length;i++) {
      if(typeof node[namePath[i]] == "undefined") {
        node._childrenCount = (node._childrenCount || 0) + 1;
        node[namePath[i]] = {_parent:node, _name:namePath[i], _count:0, toString:NameCounter_NodeToString}
      }
      node = node[namePath[i]]
    }
    this.__nodeAdd__(node, inc)
  };
  exports.NameCounter.prototype.reset = function() {
    this.root = {_name:this.root._name, _count:0, toString:NameCounter_NodeToString}
  };
  exports.NameCounter.prototype.toString = function() {
    return NameCounter_NodeToString.apply(this.root)
  };
  return exports
});tent.declare("tent.logging", function(exports) {
  exports.Levels = new tent.coreTypes.Enum("TRACE,DEBUG,INFO,WARN,ERROR,FATAL");
  exports.Log = function Log() {
    if(arguments.length > 0) {
      this.add.apply(this, arguments)
    }
    if(typeof console != "undefined") {
      this.out = {TRACE:function(msg) {
        if(console.trace) {
          console.trace(msg)
        }else {
          console.info(msg)
        }
      }, DEBUG:function(msg) {
        if(console.debug) {
          console.debug(msg)
        }else {
          console.info(msg)
        }
      }, INFO:function(msg) {
        console.info(msg)
      }, WARN:function(msg) {
        console.warn(msg)
      }, ERROR:function(msg) {
        console.error(msg)
      }, FATAL:function(msg) {
        console.error(msg)
      }}
    }
    this.listeners = []
  };
  tent.log = new exports.Log;
  exports.Log.prototype.bind = function(callback, level) {
    if(!callback instanceof Function) {
      throw"a callback Function must be provided";
    }
    var lvl = level;
    if(typeof lvl != "number") {
      if(typeof lvl == "undefined") {
        lvl = exports.Levels.TRACE
      }else {
        lvl = exports.Levels[lvl] || exports.Levels.TRACE
      }
    }
    this.listeners.push({callback:callback, level:lvl})
  };
  exports.Log.prototype.unbind = function(callback) {
    if(!callback instanceof Function) {
      throw"a callback Function must be provided";
    }
    for(var i = this.listeners.length;i >= 0;i--) {
      if(this.listeners[i].callback === callback) {
        this.listeners.splice(i, 1)
      }
    }
  };
  exports.Log.prototype.notify = function(message, level) {
    var lvl = level;
    if(typeof lvl != "number") {
      if(!lvl) {
        lvl = exports.Levels.INFO
      }else {
        lvl = exports.Levels[lvl] || exports.Levels.INFO
      }
    }
    for(var i = 0, l = this.listeners.length;i < l;i++) {
      var lst = this.listeners[i];
      if(lst.callback) {
        if(typeof lst.level == "undefined" || lst.level <= lvl) {
          lst.callback(message, level)
        }
      }
    }
  };
  exports.Log.prototype.__log__ = function(message, level) {
    level = level || exports.Levels.INFO;
    var levelName = exports.Levels.getName(level);
    if(this.out && this.out[levelName]) {
      this.out[levelName](exports.Levels.getName(level) + " " + message)
    }
    this.notify(message, level)
  };
  exports.Log.prototype.trace = function() {
    var message = this.stringOrStringify.apply(this, arguments);
    this.__log__(message, exports.Levels.TRACE)
  };
  exports.Log.prototype.debug = function() {
    var message = this.stringOrStringify.apply(this, arguments);
    this.__log__(message, exports.Levels.DEBUG)
  };
  exports.Log.prototype.info = function() {
    var message = this.stringOrStringify.apply(this, arguments);
    this.__log__(message, exports.Levels.INFO)
  };
  exports.Log.prototype.warn = function() {
    var message = this.stringOrStringify.apply(this, arguments);
    this.__log__(message, exports.Levels.WARN)
  };
  exports.Log.prototype.error = function() {
    var message = this.stringOrStringify.apply(this, arguments);
    this.__log__(message, exports.Levels.ERROR)
  };
  exports.Log.prototype.fatal = function() {
    var message = this.stringOrStringify.apply(this, arguments);
    this.__log__(message, exports.Levels.FATAL)
  };
  exports.Log.prototype.stringify = function() {
    var s = "";
    try {
      var options = arguments.length > 0 && arguments[arguments.length - 1] && arguments[arguments.length - 1]._options ? arguments[arguments.length - 1] : {_options:true};
      if(!options.deepStack) {
        options.deepStack = [];
        tent.arrays.addFunctions(options.deepStack)
      }
      for(var i = 0, l = arguments.length;i < l;i++) {
        if(arguments[i] && typeof arguments[i] == "object" && arguments[i]._options) {
          continue
        }
        if(arguments[i] instanceof Function) {
          continue
        }
        if(s) {
          s += ", "
        }
        if(options.deepStack.length > 3 || options.deepStack.lastIndexOf(arguments[i]) >= 0) {
          s += "#"
        }else {
          if(typeof arguments[i] == "undefined") {
            s += "undefined"
          }else {
            if(arguments[i] == null) {
              s += "null"
            }else {
              if(arguments[i] instanceof Array) {
                var arg = tent.arrays.functions.clone.apply(arguments[i]).filter(function(item) {
                  if(item instanceof Function) {
                    return false
                  }
                  if(options.deepStack.lastIndexOf(item >= 0)) {
                    return false
                  }
                  return true
                });
                arg.push(options);
                options.deepStack.push(arguments[i]);
                s += "[";
                if(options.deepStack.length < 4) {
                  s += this.stringify.apply(this, arg)
                }
                options.deepStack.pop();
                s += "]"
              }else {
                if(typeof arguments[i] == "string") {
                  s += '"' + arguments[i] + '"'
                }else {
                  if(arguments[i] instanceof Date) {
                    s += '"' + arguments[i] + '"'
                  }else {
                    if(typeof arguments[i] == "object") {
                      var so = "";
                      options.deepStack.push(arguments[i]);
                      if(options.deepStack.length < 4) {
                        for(var n in arguments[i]) {
                          if(arguments[i][n] instanceof Function) {
                            continue
                          }
                          if(options.deepStack.lastIndexOf(arguments[i][n]) >= 0) {
                            continue
                          }
                          if(so) {
                            so += ", "
                          }
                          so += '"' + n + '": ' + this.stringify.apply(this, [arguments[i][n], options])
                        }
                      }
                      options.deepStack.pop();
                      s += "{" + so + "}"
                    }else {
                      s += arguments[i]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }catch(err) {
      return"#err#"
    }
    return s
  };
  exports.Log.prototype.stringOrStringify = function() {
    if(arguments.length == 1 && typeof arguments[0] == "string") {
      return arguments[0]
    }else {
      return this.stringify.apply(this, arguments)
    }
  };
  return exports
});tent.declare("tent.changes", function(exports) {
  exports.EventTypes = new tent.coreTypes.Enum("ANY,MANYCHANGES,CHANGING,CHANGED,ADDING,ADDED,REMOVING,REMOVED");
  exports.InterceptorTypes = new tent.coreTypes.Enum("PROPERTY,FUNCTION");
  exports.PropertyInterceptModes = new tent.coreTypes.Enum("NONE,DEFINESETTER,DEFINEPROPERTY,DEFINEPROPERTYONLYDOM");
  var _PropertyInterceptMode;
  exports.getPropertyInterceptMode = function() {
    if(typeof _PropertyInterceptMode == "undefined") {
      var anobject = {};
      if(Object.defineProperty) {
        try {
          Object.defineProperty(anobject, "myproperty", {get:function() {
            return this._myproperty
          }, set:function(value) {
            this._myproperty = value
          }});
          anobject.myproperty = "my value";
          if(anobject.myproperty === "my value" && anobject._myproperty === "my value") {
            _PropertyInterceptMode = exports.PropertyInterceptModes.DEFINEPROPERTY
          }
        }catch(err) {
          if(document && document.createElement) {
            var adomobject = document.createElement("span");
            try {
              Object.defineProperty(adomobject, "myproperty", {get:function() {
                return this._myproperty
              }, set:function(value) {
                this._myproperty = value
              }});
              adomobject.myproperty = "my value";
              if(adomobject.myproperty === "my value" && adomobject._myproperty === "my value") {
                _PropertyInterceptMode = exports.PropertyInterceptModes.DEFINEPROPERTYONLYDOM
              }
            }catch(err) {
            }
          }
        }
      }
      if(typeof _PropertyInterceptMode == "undefined") {
        anobject = {};
        if(anobject.__defineSetter__) {
          try {
            anobject.__defineGetter__("myproperty", function() {
              return this._myproperty
            });
            anobject.__defineSetter__("myproperty", function(value) {
              this._myproperty = value
            });
            anobject.myproperty = "my value";
            if(anobject.myproperty === "my value" && anobject._myproperty === "my value") {
              _PropertyInterceptMode = exports.PropertyInterceptModes.DEFINESETTER
            }
          }catch(err) {
          }
        }
      }
      if(typeof _PropertyInterceptMode == "undefined") {
        _PropertyInterceptMode = exports.PropertyInterceptModes.NONE
      }
    }
    return _PropertyInterceptMode
  };
  exports.getPropertyInterceptModeName = function() {
    return exports.PropertyInterceptModes.getName(exports.getPropertyInterceptMode())
  };
  exports.Change = function Change(subject, eventType, data) {
    this.subject = subject;
    this.eventType = eventType;
    this.data = data
  };
  exports.ChangeStringifiers = [];
  exports.Change.prototype.toString = function() {
    if(typeof exports.ChangeStringifiers[this.eventType] != "undefined") {
      exports.ChangeStringifiers[this.eventType](this)
    }else {
      var change = this;
      var message = exports.EventTypes.getName(change.eventType);
      if(change.eventType == exports.EventTypes.MANYCHANGES) {
        message += ": ";
        if(change.data.length <= 3) {
          for(var i = 0, l = change.data.length;i < l;i++) {
            message += change.data[i].toString() + ","
          }
        }else {
          var et = {};
          for(var i = 0, l = change.data.length;i < l;i++) {
            et[change.data[i].eventType] = (et[change.data[i].eventType] || 0) + 1
          }
          for(var e in et) {
            message += exports.EventTypes.getName(e) + "(" + et[e] + "),"
          }
        }
      }else {
        if(change.data.propertyName) {
          message += " " + change.data.propertyName;
          if(change.eventType == exports.EventTypes.CHANGING) {
            message += " from " + change.data.current + " to " + change.data.newValue
          }else {
            if(change.eventType == exports.EventTypes.CHANGED) {
              message += " from " + change.data.oldValue + " to " + change.data.current
            }
          }
          message += " (on " + change.subject + ")"
        }
        if(change.data.items) {
          var items = change.data.items;
          message += " " + items.length + (items.length > 1 ? " items" : " item");
          if(typeof change.data.index != "undefined") {
            message += " at index " + change.data.index
          }
          if(change.data.propertyName) {
            message += " (" + change.subject.__parent__ + "." + change.data.propertyName + ")"
          }else {
            message += " ([" + items + "])"
          }
        }
      }
      return"[Change: " + message + "]"
    }
  };
  exports.Observable = function Observable(subject) {
    this.subject = subject;
    this.handlers = {};
    this.interceptors = {};
    this.suspended = false
  };
  var defaultBackPropertyPrefix = "_";
  exports.Observable.prototype.interceptFunction = function(name, override) {
    if(this.interceptors[name]) {
      return
    }
    var _name = defaultBackPropertyPrefix + name;
    var intercept = {name:name, _name:_name, type:exports.InterceptorTypes.FUNCTION};
    this.subject[_name] = this.subject[name];
    this.subject[name] = override;
    this.interceptors[name] = intercept
  };
  exports.parent.pset = function(subject, propertyName, value) {
    if(subject.__observable__ && subject.__observable__.interceptors && subject.__observable__.interceptors[propertyName]) {
      subject.__observable__.interceptors[propertyName].newsetter.call(subject, value)
    }else {
      subject[propertyName] = value
    }
  };
  exports.parent.pget = function(subject, propertyName) {
    if(subject.__observable__ && subject.__observable__.interceptors && subject.__observable__.interceptors[propertyName]) {
      return subject.__observable__.interceptors[propertyName].newgetter.call(subject)
    }else {
      return subject[propertyName]
    }
  };
  exports.Observable.prototype.interceptProperty = function(name, _name, getter, setter) {
    if(this.interceptors[name]) {
      return
    }
    var intercept = {name:name, type:exports.InterceptorTypes.PROPERTY, newsetter:setter, newgetter:getter};
    if(_name) {
      _name = defaultBackPropertyPrefix + name;
      try {
        this.subject[_name] = this.subject[name]
      }catch(error) {
        this.subject[_name] = null
      }
      intercept._name = _name
    }
    var mode = exports.getPropertyInterceptMode();
    if(mode == exports.PropertyInterceptModes.DEFINEPROPERTY || mode == exports.PropertyInterceptModes.DEFINEPROPERTYONLYDOM && tent.isDOMObject(this.subject)) {
      try {
        intercept.descriptor = Object.getOwnPropertyDescriptor(this.subject, name)
      }catch(err) {
      }
      var newDescriptor = {};
      if(getter) {
        newDescriptor.get = getter
      }
      if(setter) {
        newDescriptor.set = setter
      }
      try {
        Object.defineProperty(this.subject, name, newDescriptor)
      }catch(error) {
        tent.log.warn("Object.defineProperty for property '" + name + "' failed: " + error)
      }
    }else {
      if(mode == exports.PropertyInterceptModes.DEFINESETTER) {
        try {
          intercept.getter = this.subject.__lookupGetter__(name);
          intercept.setter = this.subject.__lookupSetter__(name)
        }catch(err) {
        }
        if(getter) {
          try {
            this.subject.__defineGetter__(name, getter)
          }catch(error) {
            tent.log.warn("Object.__defineGetter__ for property '" + name + "' failed: " + error)
          }
        }
        if(setter) {
          try {
            this.subject.__defineSetter__(name, setter)
          }catch(error) {
            tent.log.warn("Object.__defineSetter__ for property '" + name + "' failed: " + error)
          }
        }
      }else {
      }
    }
    if(intercept) {
      this.interceptors[name] = intercept
    }
  };
  var buildPropertySetter = function(propName, _propName) {
    return function(value) {
      var current = this[_propName];
      if(current != value) {
        this.__observable__.notifyChange(exports.EventTypes.CHANGING, {propertyName:propName, current:current, newValue:value});
        this[_propName] = value;
        this.__observable__.notifyChange(exports.EventTypes.CHANGED, {propertyName:propName, current:value, oldValue:current})
      }
    }
  };
  var buildPropertyGetter = function(propName, _propName) {
    return function() {
      return this[_propName]
    }
  };
  var defaultPropertyInterceptFilter = function(obj, propName) {
    return propName.substr(0, 1) != defaultBackPropertyPrefix
  };
  exports.Observable.prototype.interceptProperties = function(options) {
    if(!options) {
      options = {}
    }
    var filter = options.propertyFilter || defaultPropertyInterceptFilter;
    var backPropertyPrefix = options.backPropertyPrefix || defaultBackPropertyPrefix;
    var filterDomProps = !options.trackDomProperties && this.isDOMObject();
    for(var propName in this.subject) {
      if(tent.isDOMProperty(propName)) {
        continue
      }
      var valueType;
      try {
        if((valueType = typeof this.subject[propName]) != "function" && filter(this.subject, propName)) {
          var _propName = backPropertyPrefix + propName;
          this.interceptProperty(propName, _propName, buildPropertyGetter(propName, _propName), buildPropertySetter(propName, _propName))
        }
      }catch(error) {
        tent.log.warn("Error intercepting property '" + propName + "': " + error)
      }
    }
  };
  exports.Observable.prototype.isDOMObject = function() {
    if(typeof this._isDomObject == "undefined") {
      this._isDOMObject = tent.isDOMObject(this.subject)
    }
    return this._isDOMObject
  };
  exports.Observable.prototype.interceptArrayModifiers = function(options) {
    var array = this.subject;
    if(!array instanceof Array) {
      return false
    }
    this.interceptFunction("push", function() {
      var index = this.length;
      var itemsToAdd = itemsToAdd = Array.prototype.slice.call(arguments);
      this.__observable__.notifyChange(exports.EventTypes.ADDING, {items:itemsToAdd, index:index, propertyName:this.__propertyName__});
      this._push.apply(this, arguments);
      this.__observable__.notifyChange(exports.EventTypes.ADDED, {items:itemsToAdd, index:index, propertyName:this.__propertyName__})
    });
    this.interceptFunction("unshift", function() {
      var itemsToAdd = itemsToAdd = Array.prototype.slice.call(arguments);
      this.__observable__.notifyChange(exports.EventTypes.ADDING, {items:itemsToAdd, index:0, propertyName:this.__propertyName__});
      this._unshift.apply(this, arguments);
      this.__observable__.notifyChange(exports.EventTypes.ADDED, {items:itemsToAdd, index:0, propertyName:this.__propertyName__})
    });
    this.interceptFunction("pop", function() {
      var index = this.length - 1;
      this.__observable__.notifyChange(exports.EventTypes.REMOVING, {items:[this[index]], index:index, propertyName:this.__propertyName__});
      var item = this._pop();
      this.__observable__.notifyChange(exports.EventTypes.REMOVED, {items:[item], index:index, propertyName:this.__propertyName__});
      return item
    });
    this.interceptFunction("shift", function() {
      this.__observable__.notifyChange(exports.EventTypes.REMOVING, {items:[this[0]], index:0, propertyName:this.__propertyName__});
      var item = this._shift();
      this.__observable__.notifyChange(exports.EventTypes.REMOVED, {items:[item], index:0, propertyName:this.__propertyName__});
      return item
    });
    this.interceptFunction("splice", function(start, deleteCnt) {
      var itemsToAdd;
      if(deleteCnt && deleteCnt > 0) {
        this.__observable__.notifyChange(exports.EventTypes.REMOVING, {items:this.slice(start, start + deleteCnt), index:start, propertyName:this.__propertyName__})
      }
      if(arguments.length > 2) {
        itemsToAdd = Array.prototype.slice.call(arguments, 2);
        this.__observable__.notifyChange(exports.EventTypes.ADDING, {items:itemsToAdd, index:start, propertyName:this.__propertyName__})
      }
      if(itemsToAdd && itemsToAdd.length > 0) {
        var spliceArgs = itemsToAdd.slice(0);
        spliceArgs.unshift(start, deleteCnt);
        var removedItems = this._splice.apply(this, spliceArgs)
      }else {
        var removedItems = this._splice(start, deleteCnt)
      }
      if(removedItems && removedItems.length > 0) {
        this.__observable__.notifyChange(exports.EventTypes.REMOVED, {items:removedItems, index:start, propertyName:this.__propertyName__})
      }
      if(arguments.length > 2) {
        this.__observable__.notifyChange(exports.EventTypes.ADDED, {items:itemsToAdd, index:start, propertyName:this.__propertyName__})
      }
      return removedItems
    });
    array.setLength = function(l) {
      if(this.length > l) {
        this.splice(l, this.length - l)
      }else {
        this.lengh = l
      }
    };
    array.remove = tent.arrays.functions.remove;
    array.set = tent.arrays.functions.set;
    if(!array.indexOf) {
      array.indexOf = tent.arrays.functions.indexOf
    }
    if(!array.lastIndexOf) {
      array.lastIndexOf = tent.arrays.functions.lastIndexOf
    }
    return true
  };
  exports.Observable.prototype.removeInterceptor = function(name) {
    var interceptor = this.interceptors[name];
    if(interceptor._name) {
      if(interceptor.type != exports.InterceptorTypes.FUNCTION) {
        try {
          delete this.subject[interceptor.name]
        }catch(error) {
          tent.log.warn("Error deleting property interceptor '" + interceptor.name + "': " + error)
        }
        var mode = exports.getPropertyInterceptMode();
        if(mode == exports.PropertyInterceptModes.DEFINEPROPERTY || mode == exports.PropertyInterceptModes.DEFINEPROPERTYONLYDOM && tent.isDOMObject(this.subject)) {
          if(interceptor.descriptor && interceptor.descriptor.name) {
            Object.defineProperty(this.subject, name, interceptor.descriptor)
          }
        }else {
          if(mode == exports.PropertyInterceptModes.DEFINESETTER) {
            if(interceptor.getter) {
              this.subject.__defineGetter__(name, interceptor.getter)
            }
            if(interceptor.setter) {
              this.subject.__defineSetter__(name, interceptor.setter)
            }
          }else {
          }
        }
      }
      var domObject;
      try {
        this.subject[interceptor.name] = this.subject[interceptor._name]
      }catch(error) {
        domObject = tent.isDOMObject(this.subject);
        if(!domObject) {
          tent.log.warn("Error restoring property '" + interceptor.name + "' value: " + error)
        }
      }
      try {
        delete this.subject[interceptor._name]
      }catch(error) {
        tent.log.warn("Error deleting back storage property '" + interceptor._name + "': " + error)
      }
    }else {
      if(interceptor.type != exports.InterceptorTypes.FUNCTION) {
        var val = this.subject[interceptor.name];
        delete this.subject[interceptor.name];
        this.subject[interceptor.name] = val
      }
    }
    delete interceptor[name]
  };
  exports.Observable.prototype.removeInterceptors = function() {
    for(var propName in this.interceptors) {
      try {
        this.removeInterceptor(propName)
      }catch(error) {
        tent.log.warn("Error removing interceptor from property '" + propName + "': " + error)
      }
    }
    this.interceptors = {}
  };
  exports.Observable.prototype.suspend = function() {
    this.suspended = true
  };
  exports.Observable.prototype.resume = function() {
    this.suspended = false;
    if(this.changesWhileSuspended) {
      if(this.changesWhileSuspended.length < 5) {
        for(var i = 0, l = this.changesWhileSuspended.length;i < l;i++) {
          this.notifyChange(this.changesWhileSuspended[i])
        }
      }else {
        if(this.changesWhileSuspended.length > 1) {
          this.notifyChange(exports.EventTypes.MANYCHANGES, this.changesWhileSuspended)
        }
      }
      delete this.changesWhileSuspended
    }
  };
  exports.Observable.prototype.isValidHandler = function(handler) {
    if(!handler) {
      return false
    }
    if(typeof handler == "function" || typeof handler == "object" && typeof handler.handle == "function") {
      return true
    }
    return false
  };
  exports.Observable.prototype.bind = function(eventType, handler) {
    if(!handler) {
      if(this.isValidHandler(eventType)) {
        handler = eventType;
        eventType = exports.EventTypes.ANY
      }else {
        throw"must specify a handler: function (Change) or and object with a handle(Change) function";
      }
    }
    if(!this.isValidHandler(handler)) {
      throw"must specify a handler: function (Change) or and object with a handle(Change) function";
    }
    if(!eventType) {
      eventType = exports.EventTypes.ANY
    }
    var ehandlers = this.handlers[eventType];
    if(!ehandlers) {
      ehandlers = this.handlers[eventType] = []
    }
    for(var i = 0;i < ehandlers.length;i++) {
      if(ehandlers[i] == handler) {
        return false
      }
    }
    this.handlers[eventType].push(handler);
    return true
  };
  exports.Observable.prototype.unbind = function(eventType, handler) {
    if(!handler) {
      if(this.isValidHandler(eventType)) {
        handler = eventType;
        eventType = exports.EventTypes.ANY
      }else {
        throw"must specify a handler to remove";
      }
    }
    if(!this.isValidHandler(handler)) {
      throw"must specify a handler to remove";
    }
    if(!eventType) {
      eventType = exports.EventTypes.ANY
    }
    var ehandlers = this.handlers[eventType];
    var removed = false;
    if(ehandlers) {
      for(var i = 0, l = ehandlers.length;i < l;i++) {
        if(ehandlers[i] == handler) {
          ehandlers.splice(i, 1);
          i--;
          l--;
          removed = true
        }
      }
    }
    return removed
  };
  exports.Observable.prototype.unbindWhere = function(filter) {
    var changed = false;
    for(var eventType in this.handlers) {
      var ehandlers = this.handlers[eventType];
      for(var i = 0, l = ehandlers.length;i < l;i++) {
        if(filter(ehandlers[i])) {
          ehandlers.splice(i, 1);
          i--;
          l--;
          changed = true
        }
      }
    }
    return changed
  };
  exports.Observable.prototype.notifyHandler = function(change, handler) {
    try {
      if(typeof handler == "function") {
        return handler.call(this.subject, change)
      }else {
        return handler.handle(change)
      }
    }catch(err) {
      var message = "";
      if(err.stack) {
        message += err.stack
      }else {
        if(err.message) {
          message += err.message
        }
      }
      tent.log.error("Change Handler Error: " + err + (message ? "\n" + message : ""));
      return err
    }
  };
  exports.Observable.prototype.notifyChange = function(eventType, data) {
    if(this.suspended) {
      if(!this.changesWhileSuspended) {
        this.changesWhileSuspended = [];
        if(!this.changesWhileSuspended.filter) {
          this.changesWhileSuspended.filter = tent.arrays.functions.filter
        }
        this.changesWhileSuspended.findByEventType = function() {
          for(var i = 0, l = this.length;i < l;i++) {
            for(var ai = 0, al = arguments.length;ai < al;ai++) {
              if(this[i].eventType == arguments[ai]) {
                return this[i]
              }
            }
          }
        };
        this.changesWhileSuspended.findPropertyChanged = function(subject, propertyName) {
          for(var i = 0, l = this.length;i < l;i++) {
            if(this[i].subject == subject && this[i].eventType == exports.EventTypes.CHANGED && this[i].data.propertyName == propertyName) {
              return this[i]
            }
          }
        };
        this.changesWhileSuspended.findArrayChanged = function(array) {
          for(var i = 0, l = this.length;i < l;i++) {
            if(this[i].subject == subject && (this[i].eventType == exports.EventTypes.ADDED || this[i].eventType == exports.EventTypes.REMOVED)) {
              return this[i]
            }
          }
        }
      }
      this.changesWhileSuspended.push(new exports.Change(this.subject, eventType, data));
      return
    }
    var change;
    if(eventType instanceof exports.Change) {
      change = eventType
    }else {
      change = new exports.Change(this.subject, eventType, data)
    }
    var ehandlers = this.handlers[eventType];
    if(ehandlers) {
      for(var i = 0, l = ehandlers.length;i < l;i++) {
        this.notifyHandler(change, ehandlers[i])
      }
    }
    ehandlers = this.handlers[exports.EventTypes.ANY];
    if(ehandlers) {
      for(var i = 0, l = ehandlers.length;i < l;i++) {
        this.notifyHandler(change, ehandlers[i])
      }
    }
  };
  var defaultLogHandler;
  exports.Observable.prototype.log = function(enable) {
    if(enable) {
      if(!defaultLogHandler) {
        defaultLogHandler = exports.LogHandler()
      }
      return this.bind(defaultLogHandler)
    }else {
      if(defaultLogHandler) {
        return this.unbind(defaultLogHandler)
      }
    }
    return false
  };
  exports.LogHandler = function(prefix) {
    if(typeof prefix == "undefined") {
      prefix = ""
    }else {
      if(prefix && prefix[prefix.length - 1] != " ") {
        prefix += " "
      }
    }
    return function(change) {
      tent.log.info(prefix + change.toString())
    }
  };
  var buildLivePropagateHandler = function(options) {
    var propagateOptions = {};
    for(opName in options) {
      if(opName != "deepStack" && opName != "liveHandler") {
        propagateOptions[opName] = options[opName]
      }
    }
    var f = function(change) {
      if(change.eventType == exports.EventTypes.CHANGED) {
        if(typeof change.data.current == "object") {
          if(propagateOptions.deepOverDOM || !tent.isDOMObject(change.data.current)) {
            propagateOptions.deepStack = [change.data.subject];
            exports.track(change.data.current, propagateOptions);
            delete propagateOptions.deepStack
          }
        }
      }else {
        if(change.eventType == exports.EventTypes.ADDED) {
          for(var i = 0, l = change.data.items.length;i < l;i++) {
            if(typeof change.data.items[i] == "object") {
              if(propagateOptions.deepOverDOM || !tent.isDOMObject(change.data.current)) {
                propagateOptions.deepStack = [change.data.subject];
                exports.track(change.data.items[i], propagateOptions);
                delete propagateOptions.deepStack
              }
            }
          }
        }
      }
    };
    f.isLivePropagator = true;
    return f
  };
  exports.track = function(obj, options) {
    if(!options) {
      options = {}
    }
    if(typeof obj != "object") {
      if(!options.deepStack) {
        throw"Cannot track changes of " + typeof obj;
      }
      return false
    }else {
      if(obj == null) {
        if(!options.deepStack) {
          throw"Cannot track changes of null";
        }
        return false
      }
    }
    var isArray = obj instanceof Array;
    var changed = false;
    if(!options.remove && !options.removeAll && !obj.__observable__) {
      if(options.observable && (!options.observable.subject || options.observable.subject == obj)) {
        obj.__observable__ = options.observable;
        obj.__observable__.subject = obj
      }else {
        obj.__observable__ = new exports.Observable(obj)
      }
      changed = true;
      obj.getObservable = function() {
        return this.__observable__
      };
      if(!options.interceptOptions) {
        options.interceptOptions = {}
      }
      if(isArray) {
        obj.__observable__.interceptArrayModifiers(options.interceptOptions)
      }else {
        obj.__observable__.interceptProperties(options.interceptOptions)
      }
    }
    if(options.bindings) {
      for(var i = 0, l = options.bindings.length;i < l;i++) {
        var binding = options.bindings[i];
        if(isArray && binding.bindArrays != false || !isArray && binding.bindObjects != false) {
          if(options.remove) {
            if(obj.__observable__ && obj.__observable__.unbind(binding.eventType, binding.handler)) {
              changed = true
            }
          }else {
            if(obj.__observable__.bind(binding.eventType, binding.handler)) {
              changed = true
            }
          }
        }
      }
    }
    if(options.log) {
      if(obj.__observable__ && obj.__observable__.log(!options.remove)) {
        changed = true
      }
    }
    if(options.reverseProperties) {
      if(options.remove) {
        if(obj.__observable__ && obj.__observable__.unbind(tent.changes.reverseProperties.getHandler())) {
          changed = true
        }
      }else {
        if(obj.__observable__.bind(tent.changes.reverseProperties.getHandler())) {
          changed = true
        }
      }
    }
    if(options.removeAll && obj.__observable__) {
      obj.__observable__.removeInterceptors();
      delete obj.__observable__.subject;
      delete obj.__observable__;
      changed = true
    }
    if(options.deep && options.live && !options.remove) {
      if(options.remove) {
        if(obj.__observable__.unbindWhere(function(l) {
          return l.isLivePropagator
        })) {
          changed = true
        }
      }else {
        if(!options.liveHandler) {
          options.liveHandler = buildLivePropagateHandler(options)
        }
        if(obj.__observable__.bind(options.liveHandler)) {
          changed = true
        }
      }
    }
    if(options.deep) {
      if(!options.deepStack) {
        options.deepStack = [obj];
        if(!options.deepStack.lastIndexOf) {
          options.deepStack.lastIndexOf = tent.arrays.functions.lastIndexOf
        }
      }else {
        options.deepStack.push(obj)
      }
      if(isArray) {
        for(var i = 0, l = obj.length;i < l;i++) {
          var subObj = obj[i];
          if(subObj && typeof subObj == "object" && options.deepStack.lastIndexOf(subObj) < 0) {
            if(exports.track(subObj, options)) {
              changed = true
            }
          }
        }
      }else {
        var filter = options.propertyFilter || defaultPropertyInterceptFilter;
        var backPropertyPrefix = options.backPropertyPrefix || defaultBackPropertyPrefix;
        for(var propName in obj) {
          var valueType;
          if((valueType = typeof obj[propName]) != "function" && filter(obj, propName)) {
            var subObj = obj[propName];
            if(options.deepOverDOM || !tent.isDOMObject(subject)) {
              if(typeof subObj == "object" && options.deepStack.lastIndexOf(subObj) < 0) {
                if(exports.track(subObj, options)) {
                  changed = true
                }
              }
            }
          }
        }
      }
      options.deepStack.pop()
    }
    return changed
  };
  exports.untrack = function(obj, options) {
    if(!options) {
      options = {removeAll:true}
    }else {
      if(!options.removeAll) {
        options.removeAll = true
      }
    }
    return exports.track(obj, options)
  };
  exports.isTracked = function(obj) {
    return obj.__observable__ && obj.__observable__ instanceof exports.Observable
  };
  exports.bind = function(obj, options) {
    var eventType;
    if(typeof options == "string") {
      var eventType = options;
      options = {bindings:[]}
    }else {
      if(typeof options == "function") {
        options = {bindings:[{handler:options}]}
      }else {
        if(typeof options == "object" && typeof options.handle == "function") {
          options = {bindings:[{handler:options}]}
        }
      }
    }
    if(arguments.length > 2) {
      if(!options) {
        options = {bindings:[]}
      }else {
        if(!options.bindings) {
          options.bindings = []
        }
      }
      for(var i = 2;i < arguments.length;i++) {
        options.bindings.push({eventType:eventType, handler:arguments[i]})
      }
    }
    return exports.track(obj, options)
  };
  exports.unbind = function(obj, options) {
    var eventType;
    if(typeof options == "string") {
      var eventType = options;
      options = {bindings:[]}
    }else {
      if(typeof options == "function") {
        options = {bindings:[{handler:options}]}
      }else {
        if(typeof options == "object" && typeof options.handle == "function") {
          options = {bindings:[{handler:options}]}
        }
      }
    }
    if(arguments.length > 2) {
      if(!options) {
        options = {bindings:[]}
      }else {
        if(!options.bindings) {
          options.bindings = []
        }
      }
      for(var i = 2;i < arguments.length;i++) {
        options.bindings.push({eventType:eventType, handler:arguments[i]})
      }
    }
    if(!options) {
      options = {remove:true}
    }else {
      if(!options.remove) {
        options.remove = true
      }
    }
    return exports.track(obj, options)
  };
  return exports
});tent.declare("tent.databinding", function(exports) {
  var buildTargetUpdater = function(source, sourceProperty, target, targetProperty, options) {
    var handler = {};
    handler.handle = function(change) {
      var update = false;
      if(change.eventType == tent.changes.EventTypes.ADDED || change.eventType == tent.changes.EventTypes.REMOVED || change.eventType == tent.changes.EventTypes.CHANGED) {
        if(options.deep) {
          update = true
        }else {
          var sourceObj = source;
          if(change.subject == source) {
            update = true
          }else {
            var sourceProps = sourceProperty.split(".");
            for(var i = 0;i < sourceProps.length;i++) {
              var p = sourceProps[i];
              sourceObj = sourceObj[p];
              if(sourceObj == change.subject) {
                update = true;
                break
              }
            }
          }
        }
      }else {
        if(change.eventType == tent.changes.EventTypes.MANYCHANGES) {
          update = true
        }
      }
      if(update) {
        var currentValue = source;
        var currentValueParent = null;
        if(sourceProperty) {
          var sourceProps = sourceProperty.split(".");
          for(var i = 0;i < sourceProps.length;i++) {
            var p = sourceProps[i];
            currentValueParent = currentValue;
            currentValue = currentValue[p];
            if(currentValue == null || typeof currentValue == "undefined") {
              break
            }else {
              tent.changes.bind(currentValue, {live:options.live, log:options.log, deepStack:[currentValueParent], bindings:[{eventType:tent.changes.EventTypes.CHANGED, handler:this}]})
            }
          }
        }
        var tgt = target;
        var tgtProp = targetProperty;
        if(targetProperty) {
          var targetProps = targetProperty.split(".");
          for(var i = 0;i < targetProps.length;i++) {
            var tgtProp = targetProps[i];
            tgtParent = tgt;
            tgt = tgt[tgtProp];
            if(tgt == null || typeof tgt == "undefined") {
              if(i < targetProps.length - 1) {
                update = false
              }
              break
            }
          }
          tgt = tgtParent
        }
        if(update) {
          if(options.template) {
            exports.parseTemplate(options.template, currentValue, tgt, tgtProp)
          }else {
            if(typeof options.format == "function") {
              currentValue = options.format(currentValue)
            }
            if(tgt[tgtProp] != currentValue) {
              tgt[tgtProp] = currentValue
            }
          }
        }
      }
    };
    return handler
  };
  exports.bind = function(source, sourceProperty, target, targetProperty, options) {
    if(!options) {
      options = {}
    }
    var updater = buildTargetUpdater(source, sourceProperty, target, targetProperty, options);
    if(options.deep) {
      if(options.bidirectional) {
        throw"cannot use bidirectional databinding when using a deep tracking";
      }
      tent.changes.bind(source, {deep:true, live:options.live, log:options.log, bindings:[{handler:updater}]})
    }else {
      if(options.bidirectional) {
        if(options.template) {
          throw"cannot use bidirectional databinding when using a template";
        }
        var reverseUpdater = buildTargetUpdater(target, targetProperty, source, sourceProperty, options);
        tent.changes.bind(target, {live:options.live, log:options.log, bindings:[{eventType:tent.changes.EventTypes.CHANGED, handler:reverseUpdater}]})
      }
      tent.changes.bind(source, {live:options.live, log:options.log, bindings:[{eventType:tent.changes.EventTypes.CHANGED, handler:updater}]})
    }
    var currentValue = !sourceProperty ? source : source[sourceProperty];
    if(!options.template) {
      if(target[targetProperty] != currentValue) {
        target[targetProperty] = currentValue
      }
    }else {
      exports.parseTemplate(options.template, currentValue, target, targetProperty)
    }
  };
  var _tmplCache = {};
  exports.parseTemplate = function(template, data, target, targetProperty) {
    var str = template;
    var result;
    try {
      var func = _tmplCache[str];
      if(!func) {
        var strFunc = "var p=[],print=function (){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").replace(/'(?=[^#]*#>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g, "',$1,'").split("<#").join("');").split("#>").join("p.push('") + "');}return p.join('');";
        func = new Function("obj", strFunc);
        _tmplCache[str] = func
      }
      result = func(data)
    }catch(e) {
      result = "< # ERROR: " + e.message + " # >"
    }
    if(target) {
      if(targetProperty) {
        target[targetProperty] = result
      }else {
        target.innerHTML = result
      }
    }
    return result
  };
  return exports
});tent.declare("tent.changes.reverseProperties", function(exports) {
  exports.setReverseProperty = function(obj, name, prop) {
    if(!prop) {
      prop = {}
    }
    if(!prop.cardinality) {
      prop.cardinality = "11"
    }else {
      prop.cardinality = prop.cardinality.toLowerCase()
    }
    if(!prop.reverse) {
      prop.reverse = name + "Of"
    }
    var reverseProp = {name:prop.reverse, cardinality:prop.cardinality};
    if(prop.cardinality.substr(0, 1) === "n" || prop.cardinality.substr(0, 1) === "m") {
      reverseProp.isArray = true
    }
    if(!obj.__reverseProperties__) {
      obj.__reverseProperties__ = {}
    }
    if(prop.cardinality.substr(1, 1) === "n" || prop.cardinality.substr(1, 1) === "m") {
      if(typeof obj[name] == "undefined" || !(obj[name] instanceof Array)) {
        obj[name] = []
      }
      obj.__reverseProperties__[name] = reverseProp;
      obj[name].__parent__ = obj;
      obj[name].__reverseProperty__ = reverseProp
    }else {
      if(typeof obj[name] == "undefined") {
        obj[name] = null
      }
      obj.__reverseProperties__[name] = reverseProp
    }
  };
  exports.setReverseProperties = function(obj, properties) {
    if(properties) {
      for(var name in properties) {
        if(properties[name].reverse) {
          exports.setReverseProperty(obj, name, properties[name])
        }
      }
    }
  };
  exports.Set = function Set(properties) {
    this.properties = properties
  };
  exports.Set.prototype.create = function() {
    var obj = {};
    exports.setReverseProperties(obj, this.properties);
    return obj
  };
  exports.Set.prototype.applyTo = function() {
    var result = [];
    result.bind = function(options) {
      if(!options) {
        options = {}
      }
      options.reverseProperties = true;
      for(var i = 0;i < this.length;i++) {
        var obj = this[i];
        if(obj.__reverseProperties__) {
          tent.changes.bind(obj, options);
          var revProps = obj.__reverseProperties__;
          for(var propName in revProps) {
            if(revProps.hasOwnProperty(propName)) {
              if(revProps[propName].cardinality && (revProps[propName].cardinality[1] == "n" || revProps[propName].cardinality[1] == "m")) {
                if(!(obj[propName] instanceof Array)) {
                  obj[propName] = [];
                  obj[propName].__parent__ = obj;
                  obj[propName].__reverseProperty__ = obj.__reverseProperties__[propName]
                }
                tent.changes.bind(obj[propName], options)
              }
            }
          }
        }
      }
    };
    if(this.properties) {
      for(var i = 0;i < arguments.length;i++) {
        exports.setReverseProperties(arguments[i], this.properties)
      }
      result.push.apply(result, arguments)
    }
    return result
  };
  exports.Set.prototype.applyToAndBind = function() {
    if(this.properties && this.properties.length > 0) {
      for(var i = 0;i < arguments.length;i++) {
        exports.setReverseProperties(arguments[i], this.properties);
        tent.changes.bind(arguments[i], {deep:true, reverseProperties:true})
      }
    }
  };
  var reversePropertyHandler;
  exports.getHandler = function() {
    if(!reversePropertyHandler) {
      reversePropertyHandler = function(change) {
        if(change.eventType == tent.changes.EventTypes.ADDED) {
          var items = change.data.items;
          if(items && change.subject && change.subject.__reverseProperty__) {
            var reverseProp = change.subject.__reverseProperty__;
            var parent = change.subject.__parent__;
            for(var i = 0, l = items.length;i < l;i++) {
              var item = items[i];
              if(reverseProp.isArray) {
                if(!item[reverseProp.name]) {
                  item[reverseProp.name] = []
                }
                if(item[reverseProp.name].indexOf(parent) < 0) {
                  item[reverseProp.name].push(parent)
                }
              }else {
                if(item[reverseProp.name] != parent) {
                  if(typeof item[reverseProp.name] != "undefined" && item[reverseProp.name] != null) {
                    throw new Error("this." + reverseProp.name + " is set. Remove this from its current array before adding it to this array");
                  }
                  item[reverseProp.name] = parent
                }
              }
            }
          }
        }else {
          if(change.eventType == tent.changes.EventTypes.REMOVED) {
            var items = change.data.items;
            if(items && change.subject && change.subject.__reverseProperty__) {
              var reverseProp = change.subject.__reverseProperty__;
              var parent = change.subject.__parent__;
              for(var i = 0, l = items.length;i < l;i++) {
                var item = items[i];
                if(reverseProp.isArray) {
                  var reverseArray = item[reverseProp.name];
                  if(reverseArray) {
                    for(var ii = 0, ll = reverseArray.length;ii < ll;ii++) {
                      if(reverseArray[ii] === parent) {
                        reverseArray.splice(ii, 1);
                        ii--;
                        ll--
                      }
                    }
                  }
                }else {
                  if(item[reverseProp.name] === parent) {
                    item[reverseProp.name] = null
                  }
                }
              }
            }
          }else {
            if(change.eventType == tent.changes.EventTypes.CHANGED) {
              var items = change.data.items;
              if(change.data.propertyName && change.subject && change.subject.__reverseProperties__) {
                var reverseProp = change.subject.__reverseProperties__[change.data.propertyName];
                if(reverseProp) {
                  var item;
                  if(reverseProp.isArray) {
                    if(item = change.data.oldValue) {
                      var reverseArray = item[reverseProp.name];
                      if(reverseArray instanceof Array) {
                        for(var i = 0, l = reverseArray.length;i < l;i++) {
                          if(reverseArray[i] === change.subject) {
                            reverseArray.splice(i, 1);
                            i--;
                            l--
                          }
                        }
                      }
                    }
                    if(item = change.data.current) {
                      if(!item[reverseProp.name]) {
                        item[reverseProp.name] = []
                      }
                      if(item[reverseProp.name] instanceof Array) {
                        if(item[reverseProp.name].indexOf(change.subject) < 0) {
                          item[reverseProp.name].push(change.subject)
                        }
                      }
                    }
                  }else {
                    if(item = change.data.oldValue) {
                      if(item[reverseProp.name] == change.subject) {
                        item[reverseProp.name] = null
                      }
                    }
                    if(item = change.data.current) {
                      if(item[reverseProp.name] != change.subject) {
                        item[reverseProp.name] = change.subject
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return reversePropertyHandler
  };
  return exports
});tent.declare("tent.entities", function(exports) {
  exports.ChangeStates = new tent.coreTypes.Enum("DETACHED,UNCHANGED,ADDED,MODIFIED,DELETED");
  exports.Type = function Type(name, properties) {
    this.name = name;
    this.properties = properties;
    if(properties instanceof tent.changes.reverseProperties.Set) {
      this.reversePropertySet = properties
    }else {
      if(typeof properties == "object") {
        this.reversePropertySet = new tent.changes.reverseProperties.Set(properties)
      }else {
        throw"cannot create a Type without properties";
      }
    }
  };
  exports.Type.prototype.toString = function() {
    return"EntityType(" + this.name + ")"
  };
  exports.Type.prototype.applyTo = function() {
    this.reversePropertySet.applyTo.apply(this.reversePropertySet, arguments);
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i].__entityType__ != this) {
        arguments[i].__entityType__ = this
      }
      for(var n in this.properties) {
        var prop = this.properties[n];
        if(typeof arguments[i][n] == "undefined") {
          if(!prop.cardinality || prop.cardinality.substr(1, 1) === "1") {
            arguments[i][n] = null
          }else {
            arguments[i][n] = []
          }
        }
      }
    }
  };
  exports.Collection = function Collection(context, type, name) {
    this.context = context;
    this.type = type;
    this.name = name || type.name;
    this.items = [];
    tent.arrays.addFunctions(this.items)
  };
  exports.Collection.prototype.push = function() {
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i] instanceof Array) {
        this.push.apply(this, arguments[i])
      }else {
        if(arguments[i].__collection__) {
          if(arguments[i].__collection__ != this) {
            throw"cannot add this object, it already belongs to another Collection";
          }
          continue
        }else {
          if(arguments[i].__entityType__) {
            if(arguments[i].__entityType__ != this.type) {
              throw'cannot add an object with EntityType "' + arguments[i].__entityType__.name + '" to this collection';
            }
          }else {
            if(this.type) {
              this.type.applyTo(arguments[i])
            }
          }
          if(this.items.lastIndexOf(arguments[i]) < 0) {
            arguments[i].__collection__ = this;
            this.items.push(arguments[i]);
            if(this.context.changeHandler) {
              this.context.changeHandler.itemAdded(arguments[i])
            }
            if(this.type) {
              this.context.__cascadePush__(arguments[i])
            }
          }
        }
      }
    }
    return this.items.length
  };
  exports.Collection.prototype.attach = function() {
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i] instanceof Array) {
        throw"cannot attach arrays to a Collection";
      }else {
        if(arguments[i].__collection__) {
          if(arguments[i].__collection__ != this) {
            throw"cannot attach this object, it already belongs to another Collection";
          }
          continue
        }else {
          if(arguments[i].__entityType__) {
            if(arguments[i].__entityType__ != this.type) {
              throw'cannot add an object with EntityType "' + arguments[i].__entityType__.name + '" to this collection';
            }
          }else {
            if(this.type) {
              this.type.applyTo(arguments[i])
            }
          }
          if(this.items.lastIndexOf(arguments[i]) < 0) {
            arguments[i].__collection__ = this;
            if(arguments[i].__changeState__ != exports.ChangeStates.DELETED) {
              this.items.push(arguments[i])
            }
            if(this.context.changeHandler) {
              this.context.changeHandler.itemAttached(arguments[i])
            }
            if(this.type) {
              this.context.__cascadeAttach__(arguments[i])
            }
          }
        }
      }
    }
    return this.items.length
  };
  exports.Collection.prototype.remove = function() {
    var removed = false;
    for(var i = 0, l = arguments.length;i < l;i++) {
      var item = arguments[i];
      if(this.items.remove(item)) {
        removed = true;
        if(this.context.changeHandler) {
          this.context.changeHandler.itemRemoved(arguments[i])
        }
        if(this.type) {
          this.context.__cascadeRemove__(item)
        }
      }
    }
    return removed
  };
  exports.Collection.prototype.detach = function() {
    var removed = false;
    for(var i = 0, l = arguments.length;i < l;i++) {
      var item = arguments[i];
      if(this.items.remove(item) || item.__changeState__ == exports.ChangeStates.DELETED) {
        removed = true;
        if(this.context.changeHandler) {
          this.context.changeHandler.itemDetached(item)
        }
        delete item.__collection__;
        if(item.__entityType__) {
          this.context.__cascadeDetach__(item)
        }
      }
    }
    return removed
  };
  exports.Collection.prototype.detachAll = function() {
    if(this.items.length < 1) {
      return false
    }
    var item = this.items.pop();
    while(typeof item != "undefined") {
      if(this.context.changeHandler) {
        this.context.changeHandler.itemDetached(item)
      }
      delete item.__collection__;
      if(item.__entityType__) {
        this.context.__cascadeDetach__(item)
      }
      item = this.items.pop()
    }
    this.items.length = 0;
    return true
  };
  exports.Context = function Context(trackChanges) {
    this.__collections__ = {};
    this.__types__ = {};
    if(trackChanges === true) {
      this.trackChanges()
    }
  };
  exports.MyContext = new exports.Context;
  exports.Context.prototype.all = function() {
    var items = [];
    for(var collname in this.__collections__) {
      items.push.apply(items, this.__collections__[collname].items)
    }
    return items
  };
  exports.Context.prototype.filter = function(condition) {
    var items = [];
    for(var collname in this.__collections__) {
      items.push.apply(items, this.__collections__[collname].items.filter(condition))
    }
    return items
  };
  exports.Context.prototype.contains = function() {
    for(var ai = 0;ai < arguments.length;ai++) {
      var item = arguments[ai];
      if(!item) {
        return false
      }else {
        if(item.__collection__) {
          if(this.__collections__[item.__collection__.name] != item.__collection__) {
            return false
          }
        }else {
          if(item instanceof exports.Type) {
            if(this.__types__[item.name] != item) {
              return false
            }
          }else {
            if(item instanceof exports.Collection) {
              if(this != item.context) {
                return false
              }
            }else {
              return false
            }
          }
        }
      }
    }
    return true
  };
  exports.Context.prototype.createCollection = function(type, name) {
    if(!name) {
      if(!type) {
        name = "_Object"
      }else {
        if(type instanceof exports.Type) {
          name = type.name
        }else {
          if(typeof type == "string") {
            name = type;
            type = null
          }else {
            throw"provide a Type or name to create a Collection";
          }
        }
      }
    }else {
      if(type && !type instanceof exports.Type) {
        throw"provided type is not a Type instance";
      }
    }
    if(!this.__collections__[name]) {
      this.__collections__[name] = new exports.Collection(this, type, name);
      var shortcutName = name;
      while(this[shortcutName]) {
        shortcutName += "_"
      }
      this[shortcutName] = this.__collections__[name]
    }
    return this.__collections__[name]
  };
  exports.Context.prototype.pushModel = function(model) {
    if(model) {
      if(model.types) {
        for(var typeName in model.types) {
          this.push(new exports.Type(typeName, model.types[typeName]))
        }
      }
    }
  };
  exports.Context.prototype.push = function() {
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i] instanceof Array) {
        throw"cannot push arrays into a Context";
      }else {
        if(arguments[i].__collection__) {
          if(arguments[i].__collection__.context == this) {
            continue
          }else {
            throw"cannot push this item, it belongs to another Context";
          }
        }else {
          if(arguments[i] instanceof exports.Type) {
            if(!arguments[i].name) {
              throw"cannot add an EntityType without name";
            }
            if(this.__types__[arguments[i].name]) {
              if(this.__types__[arguments[i].name] == arguments[i]) {
                continue
              }else {
                throw'EntityType "' + arguments[i].name + '" already exists';
              }
            }
            this.__types__[arguments[i].name] = arguments[i];
            this.createCollection(arguments[i])
          }else {
            if(arguments[i] instanceof exports.Context) {
              throw"cannot add an EntityContext to an EntityContext";
            }else {
              if(typeof arguments[i] == "object") {
                var type = arguments[i].__entityType__;
                if(type) {
                  if(this.__types__[type.name]) {
                    if(this.__types__[type.name] != type) {
                      throw'cannot add, object EntityType "' + type.name + '" differs from the Context one';
                    }
                  }else {
                    this.__types__[type.name] = type
                  }
                }
                var coll = this.createCollection(type);
                coll.push(arguments[i])
              }
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.attach = function() {
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i] instanceof Array) {
        throw"cannot attach arrays";
      }else {
        if(arguments[i].__collection__ && arguments[i].__collection__.context == this) {
          continue
        }else {
          if(arguments[i] instanceof exports.Type) {
            throw"cannot attach EntityTypes";
          }else {
            if(arguments[i] instanceof exports.Context) {
              throw"cannot attach an EntityContext to an EntityContext";
            }else {
              if(typeof arguments[i] == "object") {
                var type = arguments[i].__entityType__;
                if(type) {
                  if(this.__types__[type.name]) {
                    if(this.__types__[type.name] != type) {
                      throw'cannot add, object EntityType "' + type.name + '" differs from the Context one';
                    }
                  }else {
                    this.__types__[type.name] = type
                  }
                }
                var coll = this.createCollection(type);
                coll.attach(arguments[i])
              }
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.remove = function() {
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i] instanceof exports.Type) {
        throw"cannot remove EntityTypes";
      }else {
        if(arguments[i] instanceof exports.Context) {
          throw"cannot remove an EntityContext from an EntityContext";
        }else {
          if(typeof arguments[i] == "object") {
            if(arguments[i].__collection__) {
              arguments[i].__collection__.remove(arguments[i])
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.detach = function() {
    for(var i = 0;i < arguments.length;i++) {
      if(arguments[i] instanceof Array) {
        throw"cannot detach arrays";
      }
      if(arguments[i] instanceof exports.Type) {
        throw"cannot detach EntityTypes";
      }else {
        if(arguments[i] instanceof exports.Context) {
          throw"cannot detach an EntityContext from an EntityContext";
        }else {
          if(typeof arguments[i] == "object") {
            if(arguments[i].__collection__) {
              arguments[i].__collection__.detach(arguments[i])
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.detachAll = function() {
    var removed = false;
    for(var i = 0;i < this.__collections__.length;i++) {
      if(this.__collections__[i].detachAll()) {
        removed = true
      }
    }
    return removed
  };
  exports.Context.prototype.touch = function() {
    if(this.changeHandler) {
      return this.changeHandler.touch.apply(this.changeHandler, arguments)
    }
  };
  exports.Context.prototype.__cascadePush__ = function() {
    for(var i = 0;i < arguments.length;i++) {
      var item = arguments[i];
      if(item.__entityType__) {
        for(var n in item.__entityType__.properties) {
          if(item[n] !== null && typeof item[n] == "object") {
            var prop = item.__entityType__.properties[n];
            if(prop.cascadePush) {
              var coll = null;
              if(prop.collection) {
                var coll = this.__collections__[prop.collection] || this.createCollection(prop.collection)
              }
              if(item[n] instanceof Array) {
                if(prop.cardinality && prop.cardinality[1] != "1") {
                  if(coll) {
                    coll.push.apply(coll, item[n])
                  }else {
                    this.push.apply(this, item[n])
                  }
                }
              }else {
                if(coll) {
                  coll.push(item[n])
                }else {
                  this.push(item[n])
                }
              }
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.__cascadeAttach__ = function() {
    for(var i = 0;i < arguments.length;i++) {
      var item = arguments[i];
      if(item.__entityType__) {
        for(var n in item.__entityType__.properties) {
          if(item[n] !== null && typeof item[n] == "object") {
            var prop = item.__entityType__.properties[n];
            if(prop.cascadeAttach) {
              var coll = null;
              if(prop.collection) {
                var coll = this.__collections__[prop.collection] || this.createCollection(prop.collection)
              }
              if(item[n] instanceof Array) {
                if(prop.cardinality && prop.cardinality[1] != "1") {
                  if(coll) {
                    coll.attach.apply(coll, item[n])
                  }else {
                    this.attach.apply(this, item[n])
                  }
                }
              }else {
                if(coll) {
                  coll.attach(item[n])
                }else {
                  this.attach(item[n])
                }
              }
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.__cascadeRemove__ = function() {
    for(var i = 0;i < arguments.length;i++) {
      var item = arguments[i];
      if(item.__entityType__) {
        for(var n in item.__entityType__.properties) {
          if(item[n] !== null && typeof item[n] == "object") {
            var prop = item.__entityType__.properties[n];
            if(prop.cascadeRemove) {
              if(item[n] instanceof Array) {
                if(prop.cardinality && prop.cardinality[1] != "1") {
                  this.remove.apply(this, item[n])
                }
              }else {
                this.remove(item[n])
              }
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.__cascadeDetach__ = function() {
    for(var i = 0;i < arguments.length;i++) {
      var item = arguments[i];
      if(item.__entityType__) {
        for(var n in item.__entityType__.properties) {
          if(item[n] !== null && typeof item[n] == "object") {
            var prop = item.__entityType__.properties[n];
            if(prop.cascadeDetach) {
              if(item[n] instanceof Array) {
                if(prop.cardinality && prop.cardinality[1] != "1") {
                  this.detach.apply(this, item[n])
                }
              }else {
                this.detach(item[n])
              }
            }
          }
        }
      }
    }
  };
  exports.Context.prototype.trackChanges = function() {
    if(!this.changeHandler) {
      this.changeHandler = new exports.ContextChangeHandler(this);
      this.changeHandler.init()
    }
  };
  exports.Context.prototype.hasChanges = function() {
    return!!(this.changes && this.changes.items.length > 0)
  };
  exports.Context.prototype.acceptChanges = function() {
    if(this.changeHandler) {
      this.changeHandler.acceptChanges()
    }
  };
  exports.EntityLink = function EntityLink(from, to, propertyName, changeState) {
    this.from = from;
    this.to = to;
    this.propertyName = propertyName;
    this.__changeState__ = changeState || exports.ChangeStates.DETACHED
  };
  exports.ContextChanges = function ContextChanges(context) {
    this.context = context;
    this.items = [];
    tent.arrays.addFunctions(this.items)
  };
  exports.ContextChanges.prototype.toString = function() {
    var count = new tent.coreTypes.NameCounter;
    for(var i = 0, l = this.items.length;i < l;i++) {
      count.add(exports.ChangeStates.getName(this.items[i].__changeState__) + "." + this.items[i].__collection__.name)
    }
    return count.toString()
  };
  exports.ContextChangeHandler = function ContextChangeHandler(context) {
    this.context = context
  };
  exports.ContextChangeHandler.prototype.isDetached = function(item) {
    return!item.__changeState__ || item.__changeState__ == exports.ChangeStates.DETACHED
  };
  exports.ContextChangeHandler.prototype.bindArrayProperties = function(item) {
    if(item.__entityType__) {
      for(var n in item.__entityType__.properties) {
        var prop = item.__entityType__.properties[n];
        if(prop.cardinality && prop.cardinality[1] != "1" && item[n] instanceof Array) {
          item[n].__parent__ = item;
          item[n].__propertyName__ = n;
          tent.changes.bind(item[n], this)
        }
      }
    }
  };
  exports.ContextChangeHandler.prototype.unbindArrayProperties = function(item) {
    if(item.__entityType__) {
      for(var n in item.__entityType__.properties) {
        var prop = item.__entityType__.properties[n];
        if(prop.cardinality && prop.cardinality[1] != "1" && item[n] instanceof Array) {
          tent.changes.unbind(item[n], this)
        }
      }
    }
  };
  exports.ContextChangeHandler.prototype.setAdded = function(item) {
    if(item.__changeState__ == exports.ChangeStates.ADDED) {
      return
    }
    if(!item.__collection__) {
      item.__changeState__ = exports.ChangeStates.ADDED
    }else {
      if(item.__collection__.context == this.context) {
        item.__changeState__ = exports.ChangeStates.ADDED;
        if(!this.context.changes) {
          this.context.changes = new exports.ContextChanges(this.context)
        }
        this.context.changes.items.pushUnique(item)
      }else {
        throw"cannot set this item as ADDED, it belongs to another Context";
      }
    }
  };
  exports.ContextChangeHandler.prototype.setRemoved = function(item) {
    if(this.isDetached(item) || item.__changeState__ == exports.ChangeStates.DELETED) {
      return
    }
    if(!item.__collection__) {
      item.__changeState__ = exports.ChangeStates.DELETED
    }else {
      if(item.__collection__.context == this.context) {
        if(item.__changeState__ == exports.ChangeStates.UNCHANGED || item.__changeState__ == exports.ChangeStates.MODIFIED) {
          item.__changeState__ = exports.ChangeStates.DELETED;
          if(!this.context.changes) {
            this.context.changes = new exports.ContextChanges(this.context)
          }
          this.context.changes.items.pushUnique(item)
        }else {
          if(item.__changeState__ == exports.ChangeStates.ADDED) {
            item.__changeState__ = exports.ChangeStates.DETACHED;
            delete item.__collection__;
            if(!this.context.changes) {
              this.context.changes = new exports.ContextChanges(this.context)
            }
            this.context.changes.items.remove(item)
          }
        }
      }else {
        throw"cannot set this item as DELETED, it belongs to another Context";
      }
    }
  };
  exports.ContextChangeHandler.prototype.touch = function() {
    for(var i = 0, l = arguments.length;i < l;i++) {
      if(arguments[i] && arguments[i].__changeState__ == exports.ChangeStates.UNCHANGED && arguments[i].__collection__ && arguments[i].__collection__.context == this.context) {
        if(!this.context.changes) {
          this.context.changes = new exports.ContextChanges(this)
        }
        arguments[i].__changeState__ = exports.ChangeStates.MODIFIED;
        this.context.changes.items.pushUnique(arguments[i])
      }
    }
  };
  exports.ContextChangeHandler.prototype.itemAdded = function(item) {
    if(this.isDetached(item)) {
      this.setAdded(item)
    }else {
      if(item.__changeState__ != exports.ChangeStates.UNCHANGED) {
        if(!this.context.changes) {
          this.context.changes = new exports.ContextChanges(this.context)
        }
        this.context.changes.items.pushUnique(item)
      }
    }
    if(item.__changeState__ != exports.ChangeStates.DELETED) {
      tent.changes.bind(item, this);
      this.bindArrayProperties(item)
    }
  };
  exports.ContextChangeHandler.prototype.itemAttached = function(item) {
    if(this.isDetached(item)) {
      item.__changeState__ = exports.ChangeStates.UNCHANGED
    }
    this.itemAdded(item)
  };
  exports.ContextChangeHandler.prototype.itemRemoved = function(item) {
    this.setRemoved(item);
    tent.changes.unbind(item, this);
    this.unbindArrayProperties(item)
  };
  exports.ContextChangeHandler.prototype.itemDetached = function(item) {
    var changes = this.context.changes;
    if(item.__changeState__ != exports.ChangeStates.UNCHANGED) {
      if(changes) {
        changes.items.remove(item)
      }
    }
    delete item.__changeState__;
    tent.changes.unbind(item, this);
    this.unbindArrayProperties(item)
  };
  exports.ContextChangeHandler.prototype.objectLinked = function(subject, propertyName, property, obj) {
    if(typeof obj != "object") {
      return
    }
    if(obj instanceof Array) {
      if(obj.__parent__ != subject) {
        if(obj.__parent__) {
          throw"this array already has another parent object";
        }
        obj.__parent__ = subject
      }
      if(obj.__propertyName__ != propertyName) {
        obj.__propertyName__ = propertyName
      }
      tent.changes.bind(obj, this);
      if(property.onLinkPush) {
        this.context.attach.push(this.context, obj)
      }
    }else {
      if(obj !== null && typeof obj != "undefined") {
        if(obj.__changeState__ == exports.ChangeStates.DELETED) {
          throw'cannot link a DELETED object to property "' + property + '"';
        }
        if(obj.__collection__) {
          if(obj.__collection__.context != this.context) {
            throw"cannot link this object, it belongs to another Context";
          }
          if(property.collection && obj.__collection__.name != property.collection) {
            throw"cannot link an object of collection " + property.collection + ' to property "' + property + '"';
          }
        }
        if(!obj.__collection__ && property.onLinkPush) {
          if(obj.__entityType__) {
            this.context.push(obj.__entityType__)
          }
          if(property.collection) {
            if(!this.context.__collections__[property.collection]) {
              throw new Error('Collection "' + property.collection + '" not found in this Context');
            }
            this.context.__collections__[property.collection].push(obj)
          }else {
            this.context.push(obj)
          }
        }
        if(property.trackLinks) {
          var elink = null, elinki = -1;
          for(var i = this.context.changes.items.length - 1;i >= 0;i--) {
            var chg = this.context.changes.items[i];
            if(chg instanceof exports.EntityLink && chg.from === subject && chg.to === obj && chg.propertyName == propertyName) {
              elink = chg;
              elinki = i;
              break
            }
          }
          if(!elink) {
            elink = new exports.EntityLink(subject, obj, propertyName, exports.ChangeStates.ADDED);
            this.context.changes.items.push(elink)
          }else {
            if(elink.__changeState__ == exports.ChangeStates.DELETED) {
              elink.__changeState__ = exports.ChangeStates.UNCHANGED
            }
          }
        }
      }
    }
  };
  exports.ContextChangeHandler.prototype.objectUnlinked = function(subject, propertyName, property, obj) {
    if(typeof obj != "object") {
      return
    }
    if(obj instanceof Array) {
      delete obj.__parent__;
      delete obj.__propertyName__;
      tent.changes.unbind(obj, this);
      if(property.onUnlinkRemove) {
        this.context.remove.apply(this.context, obj)
      }
    }else {
      if(obj !== null && typeof obj != "undefined") {
        if(property.onUnlinkRemove) {
          if(obj.__collection__) {
            obj.__collection__.remove(obj)
          }
        }
        if(property.trackLinks) {
          var elink = null, elinki = -1;
          for(var i = this.context.changes.items.length - 1;i >= 0;i--) {
            var chg = this.context.changes.items[i];
            if(chg instanceof exports.EntityLink && chg.from === subject && chg.to === obj && chg.propertyName == propertyName) {
              elink = chg;
              elinki = i;
              break
            }
          }
          if(!elink) {
            elink = new exports.EntityLink(subject, obj, propertyName, exports.ChangeStates.DELETED);
            this.context.changes.items.push(elink)
          }else {
            if(elink.__changeState__ == exports.ChangeStates.ADDED) {
              this.context.changes.items.splice(elinki, 1)
            }else {
              if(elink.__changeState__ != exports.ChangeStates.DELETED) {
                elink.__changeState__ = exports.ChangeStates.DELETED
              }
            }
          }
        }
      }
    }
  };
  exports.ContextChangeHandler.prototype.getTrackedProperty = function(subject, propertyName) {
    var prop;
    if(subject.__entityType__ && subject.__changeState__ && subject.__changeState__ != exports.ChangeStates.DELETED && subject.__changeState__ != exports.ChangeStates.DETACHED && subject.__collection__ && subject.__collection__.context == this.context && (prop = subject.__entityType__.properties[propertyName])) {
      return prop
    }
  };
  exports.ContextChangeHandler.prototype.handle = function(change) {
    if(!change.subject) {
      return
    }
    var prop;
    if(change.eventType == tent.changes.EventTypes.CHANGED) {
      var canBeModified;
      if(!change.subject.__entityType__) {
        this.context.touch(change.subject)
      }else {
        if(prop = this.getTrackedProperty(change.subject, change.data.propertyName)) {
          this.context.touch(change.subject);
          this.objectUnlinked(change.subject, change.data.propertyName, prop, change.data.oldValue);
          this.objectLinked(change.subject, change.data.propertyName, prop, change.data.current)
        }
      }
    }else {
      if(change.eventType == tent.changes.EventTypes.ADDED) {
        var parent = change.subject.__parent__;
        if(parent && (prop = this.getTrackedProperty(parent, change.data.propertyName))) {
          for(var i = 0, l = change.data.items.length;i < l;i++) {
            this.objectLinked(parent, change.data.propertyName, prop, change.data.items[i])
          }
        }
      }else {
        if(change.eventType == tent.changes.EventTypes.REMOVED) {
          var parent = change.subject.__parent__;
          if(parent && (prop = this.getTrackedProperty(parent, change.data.propertyName))) {
            for(var i = 0, l = change.data.items.length;i < l;i++) {
              this.objectUnlinked(parent, change.data.propertyName, prop, change.data.items[i])
            }
          }
        }
      }
    }
    tent.changes.reverseProperties.getHandler()(change)
  };
  exports.ContextChangeHandler.prototype.init = function() {
    if(this.context.log) {
      var rec = new tent.coreTypes.NameCounter
    }
    for(var n in this.context.__collections__) {
      var coll = this.context.__collections__[n];
      for(var j = 0, jl = coll.items.length;j < jl;j++) {
        this.itemAttached(coll.items[j])
      }
      if(rec) {
        rec.add(n, coll.items.length)
      }
    }
    if(this.context.log) {
      if(rec && rec.root._count > 0) {
        tent.log.debug("Context: initialized with " + rec)
      }else {
        tent.log.debug("Context: initialized empty")
      }
    }
  };
  exports.ContextChangeHandler.prototype.acceptChanges = function() {
    if(this.context.hasChanges()) {
      if(this.context.log) {
        tent.log.debug("Context: accepting changes, " + this.context.changes)
      }
      var items = this.context.changes.items;
      for(var i = 0, l = items.length;i < l;i++) {
        items[i].__changeState__ = exports.ChangeStates.UNCHANGED
      }
      items.length = 0;
      if(this.context.log) {
        tent.log.debug("Context: all changes accepted")
      }
    }
  };
  return exports
});
