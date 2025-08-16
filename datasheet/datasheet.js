import d from './../domshort.js';

// データシートの作成関数
function createDataSheet(rows = 1000, cols = 26) {
    // エラー処理: 行数や列数が不正の場合
    if (rows <= 0 || cols <= 0) {
        console.error('行数または列数は1以上を指定してください。');
        return;
    }

    // テーブル要素を作成
    const table = d.create('table');
    table.className = 'data-sheet'; // CSSクラス適用

    // DocumentFragmentでバッチ処理
    const fragment = d.fragment();

    // ヘッダー行を作成 (列ラベル: A-Z)
    const thead = d.create('thead');
    const headerRow = d.create('tr');
    const emptyHeader = d.create('th');
    emptyHeader.className = 'empty-header'; // CSSクラス適用
    headerRow.appendChild(emptyHeader);

    for (let col = 0; col < cols; col++) {
        const th = d.create('th');
        th.textContent = String.fromCharCode(65 + col); // A=65, B=66, ..., Z=90
        th.className = 'header-cell'; // CSSクラス適用
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    fragment.appendChild(thead);

    // ボディ行を作成 (行数: 1000)
    const tbody = d.create('tbody');
    for (let row = 1; row <= rows; row++) {
        const tr = d.create('tr');

        // 行番号セル
        const rowHeader = d.create('th');
        rowHeader.textContent = row;
        rowHeader.className = 'row-header'; // CSSクラス適用
        tr.appendChild(rowHeader);

        // データセル (編集可能)
        for (let col = 0; col < cols; col++) {
            const td = d.create('td');
            td.contentEditable = true; // 編集可能にする
            td.className = 'data-cell'; // CSSクラス適用
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    fragment.appendChild(tbody);

    // テーブルにfragmentを追加
    table.appendChild(fragment);

    // bodyにテーブルを追加 (キャッシュして追加)
    document.body.appendChild(table);
}

// 実行
try {
    createDataSheet(1000, 26);
} catch (error) {
    console.error('データシートの作成に失敗しました:', error);
}