import d from './domshort.js';  // dとしてインポート（一文字変数）

// Test Helpers
function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
    } else {
        console.error(`❌ FAIL: ${message}`);
    }
}

function createTestElement(tag, id, className, innerHTML = '') {
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (className) el.className = className;
    el.innerHTML = innerHTML;
    document.body.appendChild(el);
    return el;
}

function cleanupTestElements() {
    document.body.innerHTML = '';
}

function runTests() {
    cleanupTestElements();

    // Test: id
    createTestElement('div', 'test-id');
    assert(d.id('test-id')?.id === 'test-id', 'id: Gets element by ID');

    // Test: tag
    createTestElement('span', '', 'test-span');
    createTestElement('span', '', 'test-span');
    assert(d.tag('span').length === 2, 'tag: Gets elements by tag name');

    // Test: class
    createTestElement('div', '', 'test-class');
    assert(d.class('test-class').length === 1, 'class: Gets elements by class name');

    // Test: name
    const input = createTestElement('input');
    input.name = 'test-name';
    assert(d.name('test-name').length === 1, 'name: Gets elements by name');

    // Test: query
    createTestElement('div', 'test-query');
    assert(d.query('#test-query')?.id === 'test-query', 'query: Selects single element');

    // Test: all
    createTestElement('div', '', 'test-query-all');
    createTestElement('div', '', 'test-query-all');
    assert(d.all('.test-query-all').length === 2, 'all: Selects all elements');

    // Test: create
    const created = d.create('div');
    assert(created.tagName === 'DIV', 'create: Creates element');

    // Test: namespace
    const nsEl = d.namespace('http://www.w3.org/2000/svg', 'svg');
    assert(nsEl.tagName === 'svg', 'namespace: Creates namespaced element');

    // Test: fragment
    const frag = d.fragment();
    assert(frag instanceof DocumentFragment, 'fragment: Creates document fragment');

    // Test: text
    const text = d.text('Hello');
    assert(text.textContent === 'Hello', 'text: Creates text node');

    // Test: comment
    const comment = d.comment('Test');
    assert(comment.nodeValue === 'Test', 'comment: Creates comment node');

    // Test: element
    const pointEl = createTestElement('div', 'test-point');
    pointEl.style.position = 'absolute';
    pointEl.style.left = '0';
    pointEl.style.top = '0';
    pointEl.style.width = '100px';
    pointEl.style.height = '100px';
    assert(d.element(3, 3)?.id === 'test-point', 'element: Gets element at point');

    // Test: elements
    assert(d.elements(0, 0).length >= 1, 'elements: Gets elements at point');

    // Test: selection
    assert(d.selection() instanceof Selection, 'selection: Gets selection object');

    // Test: focus
    assert(typeof d.focus() === 'boolean', 'focus: Checks document focus');

    cleanupTestElements();
}

runTests();