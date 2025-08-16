import d from './domshort.js';  // dとしてインポート（一文字変数）

// テストヘルパー
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

    // Test: queryAll
    createTestElement('div', '', 'test-query-all');
    createTestElement('div', '', 'test-query-all');
    assert(d.queryAll('.test-query-all').length === 2, 'queryAll: Selects all elements');

    // Test: create
    const created = d.create('div');
    assert(created.tagName === 'DIV', 'create: Creates element');

    // Test: createNS
    const nsEl = d.createNS('http://www.w3.org/2000/svg', 'svg');
    assert(nsEl.tagName === 'svg', 'createNS: Creates namespaced element');

    // Test: fragment
    const frag = d.fragment();
    assert(frag instanceof DocumentFragment, 'fragment: Creates document fragment');

    // Test: textNode
    const text = d.textNode('Hello');
    assert(text.textContent === 'Hello', 'textNode: Creates text node');

    // Test: comment
    const comment = d.comment('Test');
    assert(comment.nodeValue === 'Test', 'comment: Creates comment node');

    // Test: attr (createAttribute)
    const attr = d.attr('data-test');
    assert(attr.name === 'data-test', 'attr (createAttribute): Creates attribute');

    // Test: event
    const evt = d.event('click');
    assert(evt instanceof Event, 'event: Creates event');

    // Test: import
    const externalDoc = document.implementation.createDocument('', 'root', null);
    const externalNode = externalDoc.createElement('div');
    const imported = d.import(externalNode, true);
    assert(imported instanceof Element, 'import: Imports node');

    // Test: adopt
    const adopted = d.adopt(externalNode);
    assert(adopted.ownerDocument === document, 'adopt: Adopts node');

    // Test: elemPoint
    const pointEl = createTestElement('div', 'test-point');
    pointEl.style.position = 'absolute';
    pointEl.style.left = '0';
    pointEl.style.top = '0';
    assert(d.elemPoint(0, 0)?.id === 'test-point', 'elemPoint: Gets element at point');

    // Test: elemsPoint
    assert(d.elemsPoint(0, 0).length >= 1, 'elemsPoint: Gets elements at point');

    // Test: selection
    assert(d.selection() instanceof Selection, 'selection: Gets selection object');

    // Test: focus
    assert(typeof d.focus() === 'boolean', 'focus: Checks document focus');

    // Test: exec (非推奨だがテスト)
    createTestElement('div', 'test-exec', '', 'Test');
    d.exec('copy', false, null);
    assert(true, 'exec: Executes command (no error)');

    // ユーティリティのテスト
    createTestElement('div', 'test-util', 'util');
    d.addClass('.util', 'active');
    assert(document.querySelector('.util').classList.contains('active'), 'addClass: Adds class');
    d.text('#test-util', 'Hello');
    assert(document.querySelector('#test-util').textContent === 'Hello', 'text: Sets text');
    d.css('#test-util', 'color', 'red');
    assert(document.querySelector('#test-util').style.color === 'red', 'css: Sets style');

    cleanupTestElements();
}

runTests();