import d from './../domshort.js';

// ボールの管理
const balls = [];
const canvas = d.id('canvas');
const ballCountDisplay = d.id('ball-count');
const maxBalls = 100; // 最大ボール数（パフォーマンス考慮）

// ランダムな値生成ヘルパー
const random = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => `hsl(${random(0, 360)}, 70%, 50%)`;

// ボールオブジェクトの作成
function createBall() {
    if (balls.length >= maxBalls) {
        console.warn('最大ボール数に達しました');
        return;
    }

    const size = random(20, 50);
    const ball = d.create('div');
    ball.className = 'ball';
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.background = randomColor();
    ball.style.left = `${random(0, window.innerWidth - size)}px`;
    ball.style.top = `${random(0, window.innerHeight - size)}px`;

    // ボールの速度と方向
    ball.dataset.vx = random(-5, 5); // X方向の速度
    ball.dataset.vy = random(-5, 5); // Y方向の速度

    // イベントリスナー
    ball.addEventListener('mouseenter', () => {
        ball.dataset.paused = 'true'; // ホバーで一時停止
    });
    ball.addEventListener('mouseleave', () => {
        ball.dataset.paused = 'false';
    });
    ball.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        removeBall(ball);
    });

    // DocumentFragmentを使って効率的に追加
    const frag = d.fragment();
    frag.appendChild(ball);
    canvas.appendChild(frag);

    balls.push(ball);
    updateBallCount();
}

// ボールの削除
function removeBall(ball) {
    const index = balls.indexOf(ball);
    if (index > -1) {
        balls.splice(index, 1);
        ball.remove();
        updateBallCount();
    }
}

// ボール数表示の更新
function updateBallCount() {
    ballCountDisplay.textContent = `ボール数: ${balls.length}`;
}

// アニメーションループ
function animate() {
    const { innerWidth: w, innerHeight: h } = window;

    balls.forEach((ball) => {
        if (ball.dataset.paused === 'true') return;

        let x = parseFloat(ball.style.left);
        let y = parseFloat(ball.style.top);
        let vx = parseFloat(ball.dataset.vx);
        let vy = parseFloat(ball.dataset.vy);
        const size = parseFloat(ball.style.width);

        // 移動
        x += vx;
        y += vy;

        // バウンス処理
        if (x <= 0 || x >= w - size) {
            vx = -vx;
            ball.dataset.vx = vx;
            x = Math.max(0, Math.min(x, w - size));
        }
        if (y <= 0 || y >= h - size) {
            vy = -vy;
            ball.dataset.vy = vy;
            y = Math.max(0, Math.min(y, h - size));
        }

        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
    });

    requestAnimationFrame(animate);
}

// 初期化
function init() {
    // 初期ボール生成
    for (let i = 0; i < 20; i++) createBall();

    // イベントリスナー
    d.id('add-ball').addEventListener('click', createBall);
    d.id('clear-balls').addEventListener('click', () => {
        balls.forEach((ball) => ball.remove());
        balls.length = 0;
        updateBallCount();
    });

    // キャンバスクリックでボール追加
    canvas.addEventListener('click', (e) => {
        const clickedBall = d.element(e.clientX, e.clientY);
        if (clickedBall && clickedBall.classList.contains('ball')) return; // ボールクリックは無視
        createBall();
    });

    // アニメーション開始
    requestAnimationFrame(animate);
}

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
    balls.forEach((ball) => {
        const size = parseFloat(ball.style.width);
        ball.style.left = `${Math.min(parseFloat(ball.style.left), window.innerWidth - size)}px`;
        ball.style.top = `${Math.min(parseFloat(ball.style.top), window.innerHeight - size)}px`;
    });
});

// エラーハンドリング
try {
    init();
} catch (error) {
    console.error('初期化エラー:', error);
}