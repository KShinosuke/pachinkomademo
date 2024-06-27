document.getElementById('playButton').addEventListener('click', playPachinko);

const NORMAL_HIT_PROBABILITY = 1 / 319.7;
const KAKUHEN_HIT_PROBABILITY = 1 / 99.5;
const KAKUHEN_SPINS = 163;
const JITAN_SPINS = 100;
const NORMAL_SPIN_TIME = 14;  // 通常時の1回転ごとの消費時間（秒）
const KAKUHEN_HIT_TIME = 180;  // 確変時の大当たり1回ごとの消費時間（秒）

let resultChart;  // 既存のチャートを保持するための変数

function playPachinko() {
    const ballPrice = parseFloat(document.getElementById('ballPrice').value);
    const averageSpins = parseFloat(document.getElementById('averageSpins').value);
    const playTime = parseFloat(document.getElementById('playTime').value) * 3600;  // 時間を秒に変換
    const simulationCount = parseInt(document.getElementById('simulationCount').value);

    let balances = [];

    for (let i = 0; i < simulationCount; i++) {
        let spins = 0;
        let state = 'normal';
        let balls = 0;
        let normalSpins = 0;
        let kakuhenSpins = 0;
        let jitanSpins = 0;
        let consumedTime = 0;

        while (true) {
            if (state === 'normal') {
                consumedTime += NORMAL_SPIN_TIME;
                if (consumedTime >= playTime && state === 'normal') {
                    break;
                }

                normalSpins++;
                spins++;
                if (Math.random() < NORMAL_HIT_PROBABILITY) {
                    const hitType = getNormalHitType();
                    if (hitType === 'mostHigh') {
                        balls += 1500;
                        state = 'kakuhen';
                        kakuhenSpins = 0;
                    } else if (hitType === 'middle') {
                        balls += 300;
                        state = 'kakuhen';
                        kakuhenSpins = 0;
                    } else {
                        balls += 300;
                        state = 'jitan';
                        jitanSpins = 0;
                    }
                }
            } else if (state === 'kakuhen') {
                kakuhenSpins++;
                spins++;
                if (kakuhenSpins > KAKUHEN_SPINS) {
                    state = 'normal';
                    continue;
                }
                if (Math.random() < KAKUHEN_HIT_PROBABILITY) {
                    balls += 1500;
                    consumedTime += KAKUHEN_HIT_TIME;
                    kakuhenSpins = 0;  // 確変が継続するのでリセット
                }
            } else if (state === 'jitan') {
                jitanSpins++;
                spins++;
                if (jitanSpins > JITAN_SPINS) {
                    state = 'normal';
                    continue;
                }
                if (Math.random() < NORMAL_HIT_PROBABILITY) {
                    balls += 1500;
                    state = 'kakuhen';
                    kakuhenSpins = 0;
                }
            }

            if (consumedTime >= playTime && state === 'normal') {
                break;
            }
        }

        const revenue = balls * ballPrice;
        const expenditure = (normalSpins / averageSpins) * 1000;
        const balance = revenue - expenditure;
        balances.push(balance);
    }

    displayResults(balances, playTime);
}

function getNormalHitType() {
    const rand = Math.random();
    if (rand < 0.01) {
        return 'mostHigh';
    } else if (rand < 0.63) { // 0.01 + 0.62 = 0.63
        return 'middle';
    } else {
        return 'lower';
    }
}

function displayResults(balances, playTime) {
    const ctx = document.getElementById('resultChart').getContext('2d');
    
    // 既存のチャートが存在する場合は破棄する
    if (resultChart) {
        resultChart.destroy();
    }

    const data = [];
    const labels = [];
    const minBalance = Math.min(...balances);
    const maxBalance = Math.max(...balances);
    const stepSize = 20000;
    const rangeStart = Math.floor(minBalance / stepSize) * stepSize;
    const rangeEnd = Math.ceil(maxBalance / stepSize) * stepSize;

    for (let i = rangeStart; i <= rangeEnd; i += stepSize) {
        labels.push(i);
        data.push(balances.filter(balance => balance >= i && balance < i + stepSize).length);
    }

    resultChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map((label, index) => `${label.toLocaleString()}円 (${data[index]}回)`),
            datasets: [{
                label: 'シミュレーション回数',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '収支 (円)'
                    },
                    ticks: {
                        stepSize: stepSize
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'シミュレーション回数'
                    }
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                    formatter: (value, context) => {
                        return value;
                    }
                }
            }
        }
    });

    // 中央値の計算
    const median = calculateMedian(balances);
    // 平均値の計算
    const average = calculateAverage(balances);
    // 時給の計算
    const hourlyRate = Math.floor(average / (playTime / 3600));
    
    document.getElementById('medianResult').innerText = `中央値: ${Math.floor(median).toLocaleString()}円`;
    document.getElementById('averageResult').innerText = `平均値: ${Math.floor(average).toLocaleString()}円`;
    document.getElementById('hourlyRateResult').innerText = `時給: ${hourlyRate.toLocaleString()}円`;
}

function calculateMedian(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
        return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
        return sortedArr[middle];
    }
}

function calculateAverage(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}
