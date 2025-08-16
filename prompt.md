# JavaScript Library Instructions for DomShort

## Overview
The following code uses a custom library called DomShort, which provides shortened wrappers for common DOM operations and utilities in vanilla JavaScript. This library shortens `document` object methods and offers jQuery-like APIs. As an LLM like Grok, use this library to generate code.

Import it as a short variable like `d` for brevity: `import d from './domshort.js';`.

## Library Specification: domshort.js
Use the methods from the DomShort object (after import: d.id(), etc.). All methods are bound to `document` and work in browser environments.

### DOM Operation Methods
| Method | Description | Native API Equivalent |
|--------|-------------|-----------------------|
| `d.id(id)` | Get element by ID | `document.getElementById(id)` |
| `d.tag(tagName)` | Get elements by tag name | `document.getElementsByTagName(tagName)` |
| `d.class(className)` | Get elements by class name | `document.getElementsByClassName(className)` |
| `d.name(name)` | Get elements by name attribute | `document.getElementsByName(name)` |
| `d.query(selector)` | Query single element by CSS selector | `document.querySelector(selector)` |
| `d.all(selector)` | Query all elements by CSS selector | `document.querySelectorAll(selector)` |
| `d.create(tag)` | Create an element | `document.createElement(tag)` |
| `d.createNS(namespace, tag)` | Create a namespaced element | `document.createElementNS(namespace, tag)` |
| `d.fragment()` | Create a document fragment | `document.createDocumentFragment()` |
| `d.textNode(text)` | Create a text node | `document.createTextNode(text)` |
| `d.comment(text)` | Create a comment node | `document.createComment(text)` |
| `d.elemPoint(x, y)` | Get element at coordinates | `document.elementFromPoint(x, y)` |
| `d.elemsPoint(x, y)` | Get elements at coordinates | `document.elementsFromPoint(x, y)` |
| `d.selection()` | Get selection range | `document.getSelection()` |
| `d.focus()` | Check focus state | `document.hasFocus()` |

### Utility Methods
| Method | Description | Example |
|--------|-------------|---------|
| `d.foreach(selector, func)` | Apply function to all matching elements | `d.foreach('.item', el => el.style.color = 'red')` |
| `d.addClass(selector, className)` | Add class to elements | `d.addClass('.item', 'active')` |
| `d.removeClass(selector, className)` | Remove class from elements | `d.removeClass('.item', 'active')` |
| `d.toggleClass(selector, className)` | Toggle class on elements | `d.toggleClass('.item', 'active')` |
| `d.on(selector, event, callback)` | Add event listener | `d.on('.btn', 'click', () => alert('Clicked'))` |
| `d.css(selector, property, value)` | Set style property | `d.css('.item', 'color', 'blue')` |
| `d.show(selector)` | Show elements | `d.show('.modal')` |
| `d.hide(selector)` | Hide elements | `d.hide('.modal')` |
| `d.toggle(selector)` | Toggle visibility | `d.toggle('.modal')` |
| `d.text(selector, text)` | Set text content | `d.text('#header', 'Hello')` |
| `d.html(selector, html)` | Set HTML content | `d.html('#content', '<b>World</b>')` |
| `d.attr(selector, attr, value?)` | Get/set attribute | `d.attr('img', 'src', 'image.jpg')` or `d.attr('img', 'src')` |
| `d.val(selector, value?)` | Get/set form value | `d.val('#input', 'value')` or `d.val('#input')` |
| `d.parent(selector)` | Get parent element | `d.parent('#child')` |
| `d.children(selector)` | Get child elements | `d.children('#parent')` |
| `d.get(url, callback)` | AJAX GET request | `d.get('https://api.example.com', data => console.log(data))` |
| `d.exists(selector)` | Check if element exists | `d.exists('.item')` |
| `d.delegate(parentSelector, event, childSelector, callback)` | Event delegation | `d.delegate('#container', 'click', '.btn', e => console.log(e))` |
| `d.fadeIn(selector, duration?)` | Fade in animation | `d.fadeIn('.item', 400)` |

## Constraints and Notes
- The library runs on vanilla JavaScript with no external dependencies.
- `d.exec` is a deprecated API (included for compatibility).
- `d.elemPoint` and `d.elemsPoint` depend on element positions.
- For performance, cache selectors when used repeatedly (e.g., `const items = d.queryAll('.item')`).
- Non-shortened `document` methods (e.g., `document.open`, `document.write`) should be used directly.

## Project Requirements
[Describe project-specific requirements here]
Example:
- Create a dynamic list UI where items are added on button click.
- Toggle classes on click events.
- Fetch data via AJAX and update the DOM.

## Instructions
- Prioritize DomShort library methods (after import: d.).
- Generate code that is concise, readable, and includes error handling.
- Optimize performance with selector caching or batch processing where needed.
- Assume a browser environment (e.g., Chrome, Firefox).
- [Add any project-specific instructions here]

## Usage Examples
```javascript
import d from './domshort.js';

// Add a list item
const ul = d.id('list');
const li = d.create('li');
d.text(li, 'New Item');
d.addClass(li, 'item');
ul.appendChild(li);

// Event listener
d.on('.item', 'click', e => {
    d.toggleClass(e.target, 'active');
});

// AJAX data fetch
d.get('https://api.example.com/data', data => {
    d.foreach('.item', el => d.text(el, data.name));
});
```

## Additional Settings
- [Describe custom methods or project-specific settings here]
- Example: Add a custom fade-out function:
  ```javascript
  d.fadeOut = function(selector, duration = 400) {
      d.foreach(selector, el => {
          el.style.transition = `opacity ${duration}ms`;
          el.style.opacity = 0;
      });
  };
  ```