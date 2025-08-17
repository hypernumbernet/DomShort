import d from './../domshort.js';

// グローバル定数と変数
let totalRows = 10000000; // 例: 10,000,000行（動的拡張可能）
let totalCols = 100; // 例: 100列（A-Z, AA-AZなど）
const rowHeight = 30; // CSSと同期（px）
const colWidth = 80; // CSSと同期（px）
let visibleRows = 50; // デフォルト表示行数
let visibleCols = 20; // デフォルト表示列数
const bufferRows = 0; // 上下バッファ（値を小さく調整）
const bufferCols = 0; // 左右バッファ
let currentRow = 0;
let currentCol = 0;

// Sparse Map for data
const data = new Map(); // Map<row: number, Map<col: number, string>>

// DOMキャッシュ
let table = null;
let rowHeaders = [];
let cells = []; // 2D array of td elements
let gridContainer = null;
let verticalScrollbar = null;
let verticalThumb = null;
let horizontalScrollbar = null;
let horizontalThumb = null;
let verticalRange = null; // 隠しinput range (垂直)
let horizontalRange = null; // 隠しinput range (水平)

// 列ラベル生成関数 (A, B, ..., Z, AA, AB, ...)
function getColLabel(colIndex) {
    let label = '';
    let index = colIndex;
    while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
    }
    return label;
}

// データアクセスヘルパー
function getData(row, col) {
    const rowMap = data.get(row);
    return rowMap ? rowMap.get(col) || '' : '';
}

function setData(row, col, value) {
    if (!data.has(row)) {
        data.set(row, new Map());
    }
    data.get(row).set(col, value);
}

// 仮想範囲計算
function getMaxScrollRow() {
    return Math.max(0, totalRows - visibleRows);
}

function getMaxScrollCol() {
    return Math.max(0, totalCols - visibleCols);
}

// テーブル作成関数 (初回/リサイズ時のみ)
function createTable() {
    const totalDisplayRows = visibleRows + 2 * bufferRows;
    const totalDisplayCols = visibleCols + 2 * bufferCols;

    // 既存テーブルがあれば削除
    if (table) {
        table.remove();
    }

    table = d.create('table');
    table.className = 'data-sheet';
    table.style.borderCollapse = 'collapse'; // インラインでバックアップ

    const fragment = d.fragment();

    // ヘッダー行
    const thead = d.create('thead');
    const headerRow = d.create('tr');
    const emptyHeader = d.create('th');
    emptyHeader.className = 'empty-header';
    headerRow.appendChild(emptyHeader);

    for (let c = 0; c < totalDisplayCols; c++) {
        const th = d.create('th');
        th.className = 'header-cell';
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    fragment.appendChild(thead);

    // ボディ行
    const tbody = d.create('tbody');
    rowHeaders = [];
    cells = [];

    for (let r = 0; r < totalDisplayRows; r++) {
        const tr = d.create('tr');
        const rowHeader = d.create('th');
        rowHeader.className = 'row-header';
        tr.appendChild(rowHeader);
        rowHeaders.push(rowHeader);

        const rowCells = [];
        for (let c = 0; c < totalDisplayCols; c++) {
            const td = d.create('td');
            td.className = 'data-cell';
            td.contentEditable = true;
            td.addEventListener('input', (e) => handleCellEdit(r, c, e.target.textContent));
            tr.appendChild(td);
            rowCells.push(td);
        }
        cells.push(rowCells);
        tbody.appendChild(tr);
    }
    fragment.appendChild(tbody);

    table.appendChild(fragment);
    gridContainer.appendChild(table);

    // キャッシュ構築後、データバインド
    bindData();
}

// データバインド関数 (ヘッダーとセル内容更新)
function bindData() {
    const totalDisplayRows = visibleRows + 2 * bufferRows;
    const totalDisplayCols = visibleCols + 2 * bufferCols;

    // 列ヘッダー更新
    const headerCells = d.all('thead th.header-cell');
    for (let c = 0; c < totalDisplayCols; c++) {
        const virtualCol = Math.max(0, Math.min(totalCols - 1, currentCol + c - bufferCols));
        if (headerCells[c]) {
            headerCells[c].textContent = getColLabel(virtualCol);
        }
    }

    // 行ヘッダーとデータセル更新
    for (let r = 0; r < totalDisplayRows; r++) {
        const virtualRow = Math.max(0, Math.min(totalRows - 1, currentRow + r - bufferRows));
        rowHeaders[r].textContent = virtualRow + 1;

        for (let c = 0; c < totalDisplayCols; c++) {
            const virtualCol = Math.max(0, Math.min(totalCols - 1, currentCol + c - bufferCols));
            cells[r][c].textContent = getData(virtualRow, virtualCol);
        }
    }
}

// セル編集ハンドラ
function handleCellEdit(physicalRow, physicalCol, newValue) {
    const virtualRow = Math.max(0, Math.min(totalRows - 1, currentRow + physicalRow - bufferRows));
    const virtualCol = Math.max(0, Math.min(totalCols - 1, currentCol + physicalCol - bufferCols));
    setData(virtualRow, virtualCol, newValue);
}

// スクロールバー更新関数 (thumb位置とサイズ)
function updateScrollbars() {
    // 垂直
    const verticalBarHeight = verticalScrollbar.clientHeight;
    const verticalThumbHeight = Math.max(20, (visibleRows / totalRows) * verticalBarHeight);
    verticalThumb.style.height = `${verticalThumbHeight}px`;
    const verticalRatio = currentRow / getMaxScrollRow();
    verticalThumb.style.top = `${verticalRatio * (verticalBarHeight - verticalThumbHeight)}px`;

    verticalRange.max = getMaxScrollRow();
    verticalRange.value = currentRow;

    // 水平
    const horizontalBarWidth = horizontalScrollbar.clientWidth;
    const horizontalThumbWidth = Math.max(20, (visibleCols / totalCols) * horizontalBarWidth);
    horizontalThumb.style.width = `${horizontalThumbWidth}px`;
    const horizontalRatio = currentCol / getMaxScrollCol();
    horizontalThumb.style.left = `${horizontalRatio * (horizontalBarWidth - horizontalThumbWidth)}px`;

    horizontalRange.max = getMaxScrollCol();
    horizontalRange.value = currentCol;
}

// スクロールハンドラ (データ更新とバー更新)
function handleScroll(isVertical, newValue) {
    const max = isVertical ? getMaxScrollRow() : getMaxScrollCol();
    const clamped = Math.max(0, Math.min(max, parseInt(newValue, 10)));
    if (isVertical) {
        currentRow = clamped;
    } else {
        currentCol = clamped;
    }
    bindData();
    updateScrollbars();
}

// カスタムスクロールバーイベントセットアップ
function setupScrollbarEvents() {
    // 垂直ドラッグ
    let verticalDragging = false;
    verticalThumb.addEventListener('mousedown', (e) => {
        verticalDragging = true;
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (verticalDragging) {
            const barRect = verticalScrollbar.getBoundingClientRect();
            const thumbHeight = verticalThumb.clientHeight;
            const newTop = Math.max(0, Math.min(barRect.height - thumbHeight, e.clientY - barRect.top));
            const ratio = newTop / (barRect.height - thumbHeight);
            handleScroll(true, Math.round(ratio * getMaxScrollRow()));
        }
    });
    document.addEventListener('mouseup', () => {
        verticalDragging = false;
    });

    // 水平ドラッグ
    let horizontalDragging = false;
    horizontalThumb.addEventListener('mousedown', (e) => {
        horizontalDragging = true;
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (horizontalDragging) {
            const barRect = horizontalScrollbar.getBoundingClientRect();
            const thumbWidth = horizontalThumb.clientWidth;
            const newLeft = Math.max(0, Math.min(barRect.width - thumbWidth, e.clientX - barRect.left));
            const ratio = newLeft / (barRect.width - thumbWidth);
            handleScroll(false, Math.round(ratio * getMaxScrollCol()));
        }
    });
    document.addEventListener('mouseup', () => {
        horizontalDragging = false;
    });

    // 隠しrangeのchangeイベント (ホイールやキー用)
    verticalRange.addEventListener('input', (e) => handleScroll(true, e.target.value));
    horizontalRange.addEventListener('input', (e) => handleScroll(false, e.target.value));

    // ホイールイベント (コンテナ上で)
    gridContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 : -1;
        handleScroll(true, currentRow + delta * 5); // ステップ調整
    });
}

// リサイズハンドラ
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // visible再計算 (コンテナサイズベース)
        const containerRect = gridContainer.getBoundingClientRect();
        visibleRows = Math.ceil((containerRect.height - 30) / rowHeight); // ヘッダー分調整
        visibleCols = Math.ceil((containerRect.width - 80) / colWidth); // 行ヘッダー分調整

        createTable();
        updateScrollbars();
    }, 200);
}

// 初期化関数
function initDataSheet() {
    // コンテナ作成
    gridContainer = d.create('div');
    gridContainer.className = 'grid-container';
    document.body.appendChild(gridContainer);

    // スクロールバー作成
    verticalScrollbar = d.create('div');
    verticalScrollbar.className = 'vertical-scrollbar';
    verticalThumb = d.create('div');
    verticalThumb.className = 'vertical-thumb';
    verticalScrollbar.appendChild(verticalThumb);
    gridContainer.appendChild(verticalScrollbar);

    horizontalScrollbar = d.create('div');
    horizontalScrollbar.className = 'horizontal-scrollbar';
    horizontalThumb = d.create('div');
    horizontalThumb.className = 'horizontal-thumb';
    horizontalScrollbar.appendChild(horizontalThumb);
    gridContainer.appendChild(horizontalScrollbar);

    // 隠しrange作成
    verticalRange = d.create('input');
    verticalRange.type = 'range';
    verticalRange.style.display = 'none';
    gridContainer.appendChild(verticalRange);

    horizontalRange = d.create('input');
    horizontalRange.type = 'range';
    horizontalRange.style.display = 'none';
    gridContainer.appendChild(horizontalRange);

    // テーブル作成
    createTable();

    // イベントセットアップ
    setupScrollbarEvents();
    window.addEventListener('resize', handleResize);

    // 初期更新
    updateScrollbars();
}

// エラー処理ラッパー
try {
    initDataSheet();
} catch (error) {
    console.error('データシートの初期化に失敗しました:', error);
}