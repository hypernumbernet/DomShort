# JavaScript Library Instructions for DomShort

## Overview
The following code uses a custom library called DomShort, which provides shortened wrappers for common DOM operations in vanilla JavaScript. This library shortens `document` object methods. As an LLM like Grok, use this library to generate code.

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
| `d.namespace(namespace, tag)` | Create a namespaced element | `document.createElementNS(namespace, tag)` |
| `d.fragment()` | Create a document fragment | `document.createDocumentFragment()` |
| `d.text(text)` | Create a text node | `document.createTextNode(text)` |
| `d.comment(text)` | Create a comment node | `document.createComment(text)` |
| `d.elemPoint(x, y)` | Get element at coordinates | `document.elementFromPoint(x, y)` |
| `d.elemsPoint(x, y)` | Get elements at coordinates | `document.elementsFromPoint(x, y)` |
| `d.selection()` | Get selection range | `document.getSelection()` |
| `d.focus()` | Check focus state | `document.hasFocus()` |

## Constraints and Notes
- The library runs on vanilla JavaScript with no external dependencies.
- `d.elemPoint` and `d.elemsPoint` depend on element positions.
- For performance, cache selectors when used repeatedly (e.g., `const items = d.all('.item')`).
- Non-shortened `document` methods (e.g., `document.open`, `document.write`) should be used directly.

## Instructions
- Prioritize DomShort library methods (after import: d.).
- Generate code that is concise, readable, and includes error handling.
- Optimize performance with selector caching or batch processing where needed.
- Assume a browser environment (e.g., Chrome, Firefox).

## Usage Examples
```javascript
import d from './domshort.js';

// Add a list item
const ul = d.id('list');
const li = d.create('li');
li.textContent = 'New Item';
li.className = 'class1';
ul.appendChild(li);
```