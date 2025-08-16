# DomShort

A lightweight vanilla JavaScript library that provides shortened wrappers for common `document` methods and utility functions for DOM manipulation. Inspired by jQuery's simplicity, but without any dependencies. Perfect for small projects or when you want to avoid heavy libraries.

## Features
- Shortened aliases for `document` methods (e.g., `d.id('element')` for `document.getElementById('element')`).
- Utility functions for class manipulation, events, styles, AJAX, and more.
- Modular and ES6-compatible for modern workflows.
- No external dependencies; pure vanilla JS.
- Tested in modern browsers (Chrome, Firefox, etc.).

## Installation

### Direct Download
Download `domshort.js` from the [releases](https://github.com/hypernumbernet/domshort/releases) and include it in your project:

```html
<script type="module" src="path/to/domshort.js"></script>
```

## Usage

Import the library and use a short alias like `d` for brevity:

```javascript
import d from './domshort.js';

// Example: Create and manipulate an element
const div = d.create('div');
d.text(div, 'Hello, World!');
d.addClass(div, 'greeting');
document.body.appendChild(div);

// Add event listener
d.on('.greeting', 'click', () => {
    d.toggleClass('.greeting', 'active');
});

// AJAX example
d.get('https://jsonplaceholder.typicode.com/todos/1', data => {
    console.log(data);
});
```

For non-module environments, expose globally by adding `window.DomShort = DomShort;` at the end of `domshort.js`.

## API Reference

### DOM Methods
These are bound shortcuts to `document` methods.

| Method | Description | Example |
|--------|-------------|---------|
| `d.id(id)` | Get element by ID | `d.id('myElement')` |
| `d.tag(tagName)` | Get elements by tag name | `d.tag('div')` |
| `d.class(className)` | Get elements by class name | `d.class('active')` |
| `d.name(name)` | Get elements by name attribute | `d.name('inputName')` |
| `d.query(selector)` | Query single element | `d.query('.selector')` |
| `d.queryAll(selector)` | Query all elements | `d.queryAll('.selector')` |
| `d.create(tag)` | Create element | `d.create('span')` |
| `d.createNS(namespace, tag)` | Create namespaced element | `d.createNS('http://www.w3.org/2000/svg', 'svg')` |
| `d.fragment()` | Create document fragment | `d.fragment()` |
| `d.textNode(text)` | Create text node | `d.textNode('Text')` |
| `d.comment(text)` | Create comment node | `d.comment('Comment')` |
| `d.attr(name)` | Create attribute node | `d.attr('data-id')` |
| `d.event(type)` | Create event | `d.event('click')` |
| `d.import(node, deep)` | Import node | `d.import(externalNode, true)` |
| `d.adopt(node)` | Adopt node | `d.adopt(externalNode)` |
| `d.elemPoint(x, y)` | Element at point | `d.elemPoint(100, 200)` |
| `d.elemsPoint(x, y)` | Elements at point | `d.elemsPoint(100, 200)` |
| `d.selection()` | Get selection | `d.selection()` |
| `d.focus()` | Check focus | `d.focus()` |
| `d.exec(command, showUI, value)` | Execute command (deprecated) | `d.exec('copy')` |

### Utility Methods
Helper functions for common tasks.

| Method | Description | Example |
|--------|-------------|---------|
| `d.foreach(selector, func)` | Apply function to elements | `d.foreach('.item', el => el.style.color = 'red')` |
| `d.addClass(selector, className)` | Add class | `d.addClass('.item', 'active')` |
| `d.removeClass(selector, className)` | Remove class | `d.removeClass('.item', 'active')` |
| `d.toggleClass(selector, className)` | Toggle class | `d.toggleClass('.item', 'active')` |
| `d.on(selector, event, callback)` | Add event listener | `d.on('.btn', 'click', () => {})` |
| `d.css(selector, property, value)` | Set style | `d.css('.item', 'color', 'blue')` |
| `d.show(selector)` | Show element | `d.show('.modal')` |
| `d.hide(selector)` | Hide element | `d.hide('.modal')` |
| `d.toggle(selector)` | Toggle visibility | `d.toggle('.modal')` |
| `d.text(selector, text)` | Set text | `d.text('#header', 'Hello')` |
| `d.html(selector, html)` | Set HTML | `d.html('#content', '<b>World</b>')` |
| `d.attr(selector, attr, value?)` | Get/set attribute | `d.attr('img', 'src', 'img.jpg')` or `d.attr('img', 'src')` |
| `d.val(selector, value?)` | Get/set value | `d.val('#input', 'value')` or `d.val('#input')` |
| `d.parent(selector)` | Get parent | `d.parent('#child')` |
| `d.children(selector)` | Get children | `d.children('#parent')` |
| `d.get(url, callback)` | AJAX GET | `d.get('url', data => {})` |
| `d.exists(selector)` | Check existence | `d.exists('.item')` |
| `d.delegate(parent, event, child, callback)` | Event delegation | `d.delegate('#parent', 'click', '.child', () => {})` |
| `d.fadeIn(selector, duration?)` | Fade in animation | `d.fadeIn('.item', 400)` |

## Performance Notes
- Cache selectors for repeated use: `const items = d.queryAll('.item');`.
- Minimal overhead; uses native APIs under the hood.

## Testing
Run tests with `test.js`:

1. Include in HTML: `<script type="module" src="test.js"></script>`.
2. Open in browser and check console for PASS/FAIL logs.

All methods are unit-tested.

## Contributing
Pull requests welcome! Fork the repo and submit changes.

1. Fork it.
2. Create your feature branch (`git checkout -b feature/newFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/newFeature`).
5. Create a new Pull Request.

## License
MIT License. See [LICENSE](LICENSE) for details.

---

Copyright © 2025 hypernumbernet. Built with ❤️ for simpler DOM handling.