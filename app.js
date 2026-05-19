// ============================================
// СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ============================================
const state = {
    screen: 'archetype',
    archetype: null,
    name: '',
    stats: { strength: 1, agility: 1, intelligence: 1 },
    earnedPoints: 0,
    quizIndex: 0,
    correctAnswers: 0,
    quizTimer: null,
    quizAnswered: false,
};

const MAX_POINTS = 5;
const TOTAL_QUESTIONS = 15;
const QUESTION_TIME = 15;

// ============================================
// ВОПРОСЫ
// ============================================
const allQuestions = [
    { text: 'Сколько планет в Солнечной системе?', answers: ['7', '8', '9', '10'], correct: 1 },
    { text: 'Какой элемент обозначается символом O?', answers: ['Золото', 'Олово', 'Кислород', 'Осмий'], correct: 2 },
    { text: 'Сколько сторон у куба?', answers: ['4', '6', '8', '12'], correct: 1 },
    { text: 'Какая самая длинная река в мире?', answers: ['Амазонка', 'Нил', 'Волга', 'Янцзы'], correct: 0 },
    { text: 'Что измеряется в Ньютонах?', answers: ['Масса', 'Сила', 'Скорость', 'Давление'], correct: 1 },
    { text: 'Сколько градусов в прямом угле?', answers: ['45', '60', '90', '180'], correct: 2 },
    { text: 'Какое самое быстрое наземное животное?', answers: ['Лев', 'Гепард', 'Антилопа', 'Страус'], correct: 1 },
    { text: 'Сколько цветов в радуге?', answers: ['5', '6', '7', '8'], correct: 2 },
    { text: 'Какой газ мы выдыхаем?', answers: ['Кислород', 'Азот', 'Водород', 'Углекислый газ'], correct: 3 },
    { text: 'Сколько лап у паука?', answers: ['6', '8', '10', '12'], correct: 1 },
    { text: 'Какая планета самая большая?', answers: ['Земля', 'Марс', 'Юпитер', 'Сатурн'], correct: 2 },
    { text: 'Сколько часов в сутках?', answers: ['24', '12', '36', '48'], correct: 0 },
    { text: 'Как называется столица России?', answers: ['Казань', 'Сочи', 'Санкт-Петербург', 'Москва'], correct: 3 },
    { text: 'Сколько нот в музыке?', answers: ['5', '7', '6', '8'], correct: 1 },
    { text: 'Какое животное самое большое на Земле?', answers: ['Слон', 'Жираф', 'Белый медведь', 'Синий кит'], correct: 3 },
    { text: 'Сколько материков на Земле?', answers: ['5', '6', '7', '8'], correct: 1 },
    { text: 'Какой океан самый большой?', answers: ['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый'], correct: 2 },
    { text: 'Сколько зубов у взрослого человека?', answers: ['28', '30', '32', '34'], correct: 2 },
    { text: 'Какая птица не умеет летать?', answers: ['Орёл', 'Попугай', 'Пингвин', 'Воробей'], correct: 2 },
    { text: 'Сколько дней в году?', answers: ['360', '365', '370', '375'], correct: 1 },
    { text: 'Как называется самая высокая гора в мире?', answers: ['Эверест', 'Килиманджаро', 'Эльбрус', 'Монблан'], correct: 0 },
    { text: 'Сколько костей в теле человека?', answers: ['186', '196', '206', '216'], correct: 2 },
    { text: 'Какой металл самый лёгкий?', answers: ['Железо', 'Алюминий', 'Литий', 'Медь'], correct: 2 },
    { text: 'Сколько клавиш у пианино?', answers: ['66', '76', '88', '96'], correct: 2 },
    { text: 'Какая страна самая большая по площади?', answers: ['Китай', 'США', 'Канада', 'Россия'], correct: 3 },
    { text: 'Сколько процентов поверхности Земли покрыто водой?', answers: ['50%', '60%', '71%', '80%'], correct: 2 },
    { text: 'Как называется ближайшая к Солнцу планета?', answers: ['Венера', 'Меркурий', 'Марс', 'Земля'], correct: 1 },
    { text: 'Сколько струн у гитары?', answers: ['4', '5', '6', '7'], correct: 2 },
    { text: 'Какое дерево самое высокое в мире?', answers: ['Дуб', 'Секвойя', 'Сосна', 'Эвкалипт'], correct: 1 },
    { text: 'Сколько букв в русском алфавите?', answers: ['30', '31', '33', '35'], correct: 2 },
];
let questions = [];


// Функция выбора 15 случайных вопросов
function getRandomQuestions() {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
}

// ============================================
// ЭКРАНЫ
// ============================================
function showScreen(name) {
    state.screen = name;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (name === 'stats' || name === 'distribute') {
        document.getElementById('screen-stats').classList.add('active');
        if (name === 'stats') initStatsScreen();
        if (name === 'distribute') initDistributeScreen();
        return;
    }
    document.getElementById(`screen-${name}`).classList.add('active');
    if (name === 'quiz') startQuiz();
    if (name === 'card') showCard();
}

// ============================================
// АРХЕТИП
// ============================================
document.querySelectorAll('.archetype-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.archetype-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.archetype = btn.dataset.archetype;
        showScreen('stats');
    });
});

// ============================================
// СТАТЫ
// ============================================
const sliders = {
    strength: document.getElementById('stat-strength'),
    agility: document.getElementById('stat-agility'),
    intelligence: document.getElementById('stat-intelligence'),
};
const valueDisplays = {
    strength: document.querySelector('#stat-strength + .stat-value'),
    agility: document.querySelector('#stat-agility + .stat-value'),
    intelligence: document.querySelector('#stat-intelligence + .stat-value'),
};

function getTotalPoints() {
    return state.stats.strength + state.stats.agility + state.stats.intelligence;
}

function initStatsScreen() {
    state.name = '';
    state.stats = { strength: 1, agility: 1, intelligence: 1 };
    document.querySelector('#screen-stats .title').textContent = 'Характеристики';
    document.querySelector('#screen-stats .subtitle').textContent = 'Базовые навыки (по 1 очку)';
    document.querySelector('#screen-stats .points-left').innerHTML = 'Заработайте баллы в квизе';
    Object.keys(sliders).forEach(stat => {
        sliders[stat].value = 1;
        sliders[stat].disabled = true;
        valueDisplays[stat].textContent = '1';
    });
    document.getElementById('hero-name').value = '';
    const btn = document.getElementById('btn-start-quiz');
    btn.textContent = 'Начать квиз';
    btn.disabled = true;
    btn.onclick = startFromStats;
    drawRadar('radar-preview', state.stats);
}

document.getElementById('hero-name').addEventListener('input', function () {
    state.name = this.value.trim();
    document.getElementById('btn-start-quiz').disabled = state.name.length < 1;
});

function startFromStats() {
    if (!state.name) return;
    state.quizIndex = 0;
    state.correctAnswers = 0;
    state.earnedPoints = 0;
    showScreen('quiz');
}

// ============================================
// РАДАРНАЯ ДИАГРАММА
// ============================================
function drawRadar(canvasId, stats) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const maxR = Math.min(w, h) * 0.20;
    const labels = ['Сила', 'Ловкость', 'Интеллект'];
    const values = [stats.strength, stats.agility, stats.intelligence];
    const angles = [-Math.PI / 2, Math.PI / 6, Math.PI - Math.PI / 6];
    ctx.clearRect(0, 0, w, h);
    for (let level = 1; level <= 5; level++) {
        const r = (level / 5) * maxR;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const x = cx + r * Math.cos(angles[i]), y = cy + r * Math.sin(angles[i]);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#2a2a3a';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxR * Math.cos(angles[i]), cy + maxR * Math.sin(angles[i]));
        ctx.strokeStyle = '#2a2a3a';
        ctx.stroke();
    }
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        const r = (values[i] / 5) * maxR;
        const x = cx + r * Math.cos(angles[i]), y = cy + r * Math.sin(angles[i]);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(240,240,240,0.12)';
    ctx.fill();
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 2;
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
        const r = (values[i] / 5) * maxR;
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(angles[i]), cy + r * Math.sin(angles[i]), 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f0f0';
        ctx.fill();
    }
    ctx.fillStyle = '#707080';
    ctx.font = '10px Inter, Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(labels[0], cx, cy - maxR - 6);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[1], cx + maxR * Math.cos(angles[1]) + 14, cy + maxR * Math.sin(angles[1]));
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[2], cx + maxR * Math.cos(angles[2]) - 14, cy + maxR * Math.sin(angles[2]));
}

// ============================================
// КВИЗ
// ============================================
function startQuiz() {
    questions = getRandomQuestions();
    state.quizIndex = 0;
    state.correctAnswers = 0;
    state.earnedPoints = 0;
    showQuestion();
}

function showQuestion() {
    if (state.quizIndex >= TOTAL_QUESTIONS) { showScreen('distribute'); return; }
    state.quizAnswered = false;
    clearTimeout(state.quizTimer);
    const q = questions[state.quizIndex % questions.length];
    document.getElementById('quiz-current').textContent = state.quizIndex + 1;
    document.getElementById('quiz-question').textContent = q.text;
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-feedback').classList.remove('show');
    const answersDiv = document.getElementById('quiz-answers');
    answersDiv.innerHTML = '';
    q.answers.forEach((answer, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer-btn';
        btn.textContent = answer;
        btn.addEventListener('click', () => onAnswer(i, q.correct));
        answersDiv.appendChild(btn);
    });
    let timeLeft = QUESTION_TIME;
    const timerFill = document.getElementById('quiz-timer-fill');
    timerFill.style.width = '100%';
    timerFill.classList.remove('warning');
    state.quizTimer = setInterval(() => {
        timeLeft--;
        timerFill.style.width = (timeLeft / QUESTION_TIME) * 100 + '%';
        if (timeLeft <= 5) timerFill.classList.add('warning');
        if (timeLeft <= 0) { clearInterval(state.quizTimer); if (!state.quizAnswered) onAnswer(-1, q.correct); }
    }, 1000);
}

function onAnswer(chosen, correct) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;
    clearTimeout(state.quizTimer);
    const buttons = document.querySelectorAll('.quiz-answer-btn');
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add('correct');
        if (i === chosen && chosen !== correct) btn.classList.add('wrong');
    });
    const feedback = document.getElementById('quiz-feedback');
    if (chosen === correct) {
        state.correctAnswers++;
        state.earnedPoints++;
        feedback.textContent = '✓ Верно! +1 балл';
        feedback.style.color = '#44ff44';
    } else {
        feedback.textContent = '✗ Неверно';
        feedback.style.color = '#ff4444';
    }
    feedback.classList.add('show');
    setTimeout(() => { state.quizIndex++; showQuestion(); }, 1200);
}

// ============================================
// РАСПРЕДЕЛЕНИЕ
// ============================================
function initDistributeScreen() {
    document.querySelector('#screen-stats .title').textContent = 'Распределите баллы';
    document.querySelector('#screen-stats .subtitle').textContent = 'Вы заработали ' + state.earnedPoints + ' балл' + getPointsWord(state.earnedPoints);
    document.querySelector('#screen-stats .points-left').innerHTML = 'Осталось: <span id="points-remaining">' + state.earnedPoints + '</span>';
    document.getElementById('hero-name').disabled = true;
    const btn = document.getElementById('btn-start-quiz');
    btn.textContent = 'Сохранить героя';
    btn.disabled = false;
    btn.onclick = finishDistribution;
    state.stats = { strength: 1, agility: 1, intelligence: 1 };
    Object.keys(sliders).forEach(stat => {
        sliders[stat].disabled = false;
        sliders[stat].min = 1;
        sliders[stat].max = 1 + state.earnedPoints;
        sliders[stat].value = 1;
        valueDisplays[stat].textContent = '1';
    });
    setupDistributeSliders();
    drawRadar('radar-preview', state.stats);
}

function setupDistributeSliders() {
    Object.keys(sliders).forEach(stat => {
        const newSlider = sliders[stat].cloneNode(true);
        sliders[stat].parentNode.replaceChild(newSlider, sliders[stat]);
        sliders[stat] = newSlider;
    });
    valueDisplays.strength = document.querySelector('#stat-strength + .stat-value');
    valueDisplays.agility = document.querySelector('#stat-agility + .stat-value');
    valueDisplays.intelligence = document.querySelector('#stat-intelligence + .stat-value');
    Object.keys(sliders).forEach(stat => {
        sliders[stat].addEventListener('input', function () {
            const desiredValue = parseInt(this.value);
            const oldValue = state.stats[stat];
            const diff = desiredValue - oldValue;
            const remaining = state.earnedPoints - (getTotalPoints() - 3);
            if (desiredValue < 1) { this.value = 1; return; }
            if (diff > 0 && remaining <= 0) { this.value = oldValue; return; }
            if (diff > 0 && diff > remaining) { this.value = oldValue + remaining; }
            state.stats[stat] = parseInt(this.value);
            valueDisplays[stat].textContent = state.stats[stat];
            document.getElementById('points-remaining').textContent = Math.max(0, state.earnedPoints - (getTotalPoints() - 3));
            drawRadar('radar-preview', state.stats);
        });
    });
}

function finishDistribution() {
    if (getTotalPoints() - 3 !== state.earnedPoints) { alert('Распределите все баллы!'); return; }
    showScreen('card');
}

function getPointsWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) return '';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'а';
    return 'ов';
}

// ============================================
// КАРТОЧКА
// ============================================
function showCard() {
    document.getElementById('card-name').textContent = state.name;

    // SVG-иконка архетипа
    const iconSpan = document.getElementById('card-archetype-icon');
    iconSpan.innerHTML = '';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    if (state.archetype === 'mage') {
        svg.setAttribute('viewBox', '0 0 150 150');
    } else {
       svg.setAttribute('viewBox', '0 0 100 100'); 
    }
    
    svg.style.width = '40px';
    svg.style.height = '40px';
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#svg-${state.archetype}`);
    svg.appendChild(use);
    iconSpan.appendChild(svg);

    document.getElementById('card-correct').textContent = state.correctAnswers;

    drawRadar('radar-final', state.stats);

    const maxStat = Math.max(state.stats.strength, state.stats.agility, state.stats.intelligence, 5);
    document.getElementById('bar-strength').style.width = (state.stats.strength / maxStat * 100) + '%';
    document.getElementById('bar-agility').style.width = (state.stats.agility / maxStat * 100) + '%';
    document.getElementById('bar-intelligence').style.width = (state.stats.intelligence / maxStat * 100) + '%';

    generateQR();
}

function generateQR() {
    const container = document.getElementById('qr-code');
    container.innerHTML = '';

    // Супер-сжатый формат: массив без ключей
    // [имя, архетип(m/w/i), сила, ловкость, интеллект, ответы]
    const data = [
        state.name.substring(0, 6),      // 0: name
        state.archetype[0],               // 1: archetype
        state.stats.strength,             // 2: strength
        state.stats.agility,              // 3: agility
        state.stats.intelligence,         // 4: intelligence
        state.correctAnswers              // 5: correctAnswers
    ];

    const text = JSON.stringify(data);
    console.log('QR data:', text, 'length:', text.length);

    try {
        new QRCode(container, {
            text: text,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.L,
        });
    } catch (e) {
        // Обрезаем имя до 3 букв
        data[0] = state.name.substring(0, 3);
        try {
            container.innerHTML = '';
            new QRCode(container, {
                text: JSON.stringify(data),
                width: 200,
                height: 200,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.L,
            });
        } catch (e2) {
            // Обрезаем имя до 1 буквы
            data[0] = state.name.substring(0, 1);
            try {
                container.innerHTML = '';
                new QRCode(container, {
                    text: JSON.stringify(data),
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.L,
                });
            } catch (e3) {
                container.innerHTML = '<p style="color:#ff4444;">Имя слишком длинное</p>';
            }
        }
    }
}

// ============================================
// ЗАПУСК
// ============================================
showScreen('archetype');