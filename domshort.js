const DomShort = {};

// DOM操作メソッド
DomShort.id = document.getElementById.bind(document);
DomShort.tag = document.getElementsByTagName.bind(document);
DomShort.class = document.getElementsByClassName.bind(document);
DomShort.name = document.getElementsByName.bind(document);
DomShort.query = document.querySelector.bind(document);
DomShort.queryAll = document.querySelectorAll.bind(document);
DomShort.create = document.createElement.bind(document);
DomShort.createNS = document.createElementNS.bind(document);
DomShort.fragment = document.createDocumentFragment.bind(document);
DomShort.textNode = document.createTextNode.bind(document);
DomShort.comment = document.createComment.bind(document);
DomShort.attr = document.createAttribute.bind(document);
DomShort.event = document.createEvent.bind(document);
DomShort.import = document.importNode.bind(document);
DomShort.adopt = document.adoptNode.bind(document);
DomShort.elemPoint = document.elementFromPoint.bind(document);
DomShort.elemsPoint = document.elementsFromPoint.bind(document);
DomShort.selection = document.getSelection.bind(document);
DomShort.focus = document.hasFocus.bind(document);
DomShort.exec = document.execCommand.bind(document);

// ユーティリティメソッド
DomShort.foreach = function(selector, func) {
    Array.from(document.querySelectorAll(selector)).forEach(func);
};
DomShort.addClass = function(selector, className) {
    DomShort.foreach(selector, el => el.classList.add(className));
};
DomShort.removeClass = function(selector, className) {
    DomShort.foreach(selector, el => el.classList.remove(className));
};
DomShort.toggleClass = function(selector, className) {
    DomShort.foreach(selector, el => el.classList.toggle(className));
};
DomShort.on = function(selector, event, callback) {
    DomShort.foreach(selector, el => el.addEventListener(event, callback));
};
DomShort.css = function(selector, property, value) {
    DomShort.foreach(selector, el => el.style[property] = value);
};
DomShort.show = function(selector) {
    DomShort.css(selector, 'display', 'block');
};
DomShort.hide = function(selector) {
    DomShort.css(selector, 'display', 'none');
};
DomShort.toggle = function(selector) {
    DomShort.foreach(selector, el => {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    });
};
DomShort.text = function(selector, text) {
    DomShort.foreach(selector, el => el.textContent = text);
};
DomShort.html = function(selector, html) {
    DomShort.foreach(selector, el => el.innerHTML = html);
};
DomShort.attr = function(selector, attr, value) {
    if (value === undefined) {
        const el = document.querySelector(selector);
        return el ? el.getAttribute(attr) : null;
    }
    DomShort.foreach(selector, el => el.setAttribute(attr, value));
};
DomShort.val = function(selector, value) {
    if (value === undefined) {
        const el = document.querySelector(selector);
        return el ? el.value : null;
    }
    DomShort.foreach(selector, el => el.value = value);
};
DomShort.parent = function(selector) {
    const el = document.querySelector(selector);
    return el ? el.parentNode : null;
};
DomShort.children = function(selector) {
    const el = document.querySelector(selector);
    return el ? Array.from(el.children) : [];
};
DomShort.get = function(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
};
DomShort.exists = function(selector) {
    return !!document.querySelector(selector);
};
DomShort.delegate = function(parentSelector, event, childSelector, callback) {
    DomShort.on(parentSelector, event, e => {
        if (e.target.matches(childSelector)) {
            callback(e);
        }
    });
};
DomShort.fadeIn = function(selector, duration = 400) {
    DomShort.foreach(selector, el => {
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = 1;
    });
};

export default DomShort;