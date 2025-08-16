# DomShort

A lightweight vanilla JavaScript library that provides shortened wrappers for common `document` methods without any dependencies. Perfect for small projects or when you want to avoid heavy libraries.

## Features
- Shortened aliases for `document` methods (e.g., `d.id('element')` for `document.getElementById('element')`).
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
li.textContent = 'Hello, World!';
li.className = 'greeting';
document.body.appendChild(div);
```

For non-module environments, expose globally by adding `window.DomShort = DomShort;` at the end of `domshort.js`.

## API Reference

### DOM Methods
These are bound shortcuts to `document` methods.

| Method | Native API Equivalent |
|--------|-----------------------|
| `d.id(id)` | `document.getElementById(id)` |
| `d.tag(tagName)` | `document.getElementsByTagName(tagName)` |
| `d.class(className)` | `document.getElementsByClassName(className)` |
| `d.name(name)` | `document.getElementsByName(name)` |
| `d.query(selector)` | `document.querySelector(selector)` |
| `d.all(selector)` | `document.querySelectorAll(selector)` |
| `d.create(tag)` | `document.createElement(tag)` |
| `d.namespace(namespace, tag)` | `document.createElementNS(namespace, tag)` |
| `d.fragment()` | `document.createDocumentFragment()` |
| `d.text(text)` | `document.createTextNode(text)` |
| `d.comment(text)` | `document.createComment(text)` |
| `d.elemPoint(x, y)` | `document.elementFromPoint(x, y)` |
| `d.elemsPoint(x, y)` | `document.elementsFromPoint(x, y)` |
| `d.selection()` | `document.getSelection()` |
| `d.focus()` | `document.hasFocus()` |

| Method | Description | Example |
|--------|-------------|---------|
| `d.id(id)` | Get element by ID | `d.id('myElement')` |
| `d.tag(tagName)` | Get elements by tag name | `d.tag('div')` |
| `d.class(className)` | Get elements by class name | `d.class('active')` |
| `d.name(name)` | Get elements by name attribute | `d.name('inputName')` |
| `d.query(selector)` | Query single element | `d.query('.selector')` |
| `d.all(selector)` | Query all elements | `d.all('.selector')` |
| `d.create(tag)` | Create element | `d.create('span')` |
| `d.namespace(namespace, tag)` | Create namespaced element | `d.namespace('http://www.w3.org/2000/svg', 'svg')` |
| `d.fragment()` | Create document fragment | `d.fragment()` |
| `d.text(text)` | Create text node | `d.text('Text')` |
| `d.comment(text)` | Create comment node | `d.comment('Comment')` |
| `d.elemPoint(x, y)` | Element at point | `d.elemPoint(100, 200)` |
| `d.elemsPoint(x, y)` | Elements at point | `d.elemsPoint(100, 200)` |
| `d.selection()` | Get selection | `d.selection()` |
| `d.focus()` | Check focus | `d.focus()` |

## Performance Notes
- Cache selectors for repeated use: `const items = d.all('.item');`.
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