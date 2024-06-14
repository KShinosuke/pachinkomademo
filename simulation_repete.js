function runSimulation() {
    const random_hit = [39, 233, 451, 893, 1836, 2143, 2628, 2742, 2811, 3055];

    let limittime = parseFloat(document.getElementById("limittime").value);
    let rotate_ave = parseInt(document.getElementById("rotate_ave").value);
    let kankinritu = parseFloat(document.getElementById("kankinritu").value);
    let simulations = parseInt(document.getElementById("simulations").value);

    const output = document.getElementById("output");
    output.textContent = '';

    let results = [];

    for (let i = 0; i < simulations; i++) {
        let usetime = 0;
        let total_route = 0;
        let hit = 0;
        let kakuhen_hit = 0;
        let hit2 = 0;
        let kakuhen_total_hit = 0;
        let route = 1;
        let hasHit = false;

        while (usetime < limittime) {
            let route = 1;
            while (true) {
                let one_route = Math.floor(Math.random() * 3197) + 1;
                if (random_hit.includes(one_route)) {
                    hasHit = true;
                    total_route += route;
                    route = 0;
                    hit += 1;

                    if (random_hit.slice(0, 5).includes(one_route)) {
                        if (random_hit[0] === one_route) {
                            hit2 += 1;
                        }
                        const random_hit2 = [1550, 893, 1007, 711, 1658, 971, 1492, 896, 396, 390, 892, 18, 268, 1282, 1289, 1723, 867, 1243, 611, 248, 376, 1497, 608, 381, 1801, 1825, 1461, 955, 290, 1567, 1802, 803, 92, 1487, 307, 658, 317, 1499, 1371, 1353, 1028, 1403, 1958, 1445, 1008, 44, 296, 397, 1152, 840, 1662, 10, 795, 1507, 1291, 1687, 185, 1381, 799, 715, 1831];

                        let route2 = 0;
                        kakuhen_hit = 0;

                        while (true) {
                            let one_route2 = Math.floor(Math.random() * 2000) + 1;
                            if (random_hit2.slice(0, 12).includes(one_route2)) {
                                usetime += 2 / 60;

                                let one_route3 = Math.floor(Math.random() * 2000) + 1;
                                let one_route4 = Math.floor(Math.random() * 2000) + 1;
                                let one_route5 = Math.floor(Math.random() * 2000) + 1;
                                let one_route6 = Math.floor(Math.random() * 2000) + 1;

                                if (random_hit2.slice(13, 60).includes(one_route3) || random_hit2.slice(13, 60).includes(one_route4) || random_hit2.slice(13, 60).includes(one_route5) || random_hit2.slice(13, 60).includes(one_route6)) {
                                    kakuhen_hit += 1;
                                    continue;
                                }

                                kakuhen_total_hit += kakuhen_hit;
                                break;
                            }

                            route2 += 1;
                            if (random_hit2.slice(13, 60).includes(one_route2)) {
                                usetime += 2 / 60;
                                route2 = 1;
                                kakuhen_hit += 1;
                            }
                        }
                    }
                    break;
                }

                route += 1;
                usetime += 14 / 60 / 60;
                if (usetime >= limittime) {
                    total_route += route;
                    break;
                }
            }
        }

        let invest = total_route / rotate_ave * 1000;
        let income = hit * 450 * kankinritu + kakuhen_total_hit * 1500 * kankinritu + hit2 * (3000 - 450) * kankinritu;
        let total = income - invest;
        results.push(total);
    }

    // 結果の集計
    const bins = {};
    for (const result of results) {
        const bin = Math.floor(result / 50000) * 50000;
        bins[bin] = (bins[bin] || 0) + 1;
    }

    const labels = [];
    const data = [];
    for (const bin in bins) {
        labels.push(bin);
        data.push(bins[bin]);
    }

    // ラベルをソートしてからグラフを描画
    const sortedLabels = labels.sort((a, b) => a - b);
    const sortedData = sortedLabels.map(label => bins[label]);

    // グラフの表示
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'シミュレーション回数',
                data: sortedData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '金額 (円)'
                    },
                    ticks: {
                        stepSize: 50000
                    }
                
                },
                y: {
                    title: {
                        display: true,
                        text: 'シミュレーション回数'
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    // HTMLの出力をコメントアウト
    // output.textContent += "遊戯終了\n";
    // output.textContent += "通常時最終回転は"　+ fin_route + "回転でした\n";
    // output.textContent += "通常時の総回転数は" + total_route + "回転でした\n";
    // output.textContent += "初当たり回数は" + hit + "回でした\n";
    // output.textContent += "確変中当たり回数は" + kakuhen_total_hit + "回でした\n";
    // output.textContent += "投資: " + Math.floor(invest) + "円\n";
    // output.textContent += "収入: " + Math.floor(income) + "円\n";
    // let total = income - invest;
    // output.textContent += "今回の収支は" + Math.floor(total) + "円です\n";
}

    // HTMLの出力をコメントアウト
    // output.textContent += "遊戯終了\n";
    // output.textContent += "通常時最終回転は"　+ fin_route + "回転でした\n";
    // output.textContent += "通常時の総回転数は" + total_route + "回転でした\n";
    // output.textContent += "初当たり回数は" + hit + "回でした\n";
    // output.textContent += "確変中当たり回数は" + kakuhen_total_hit + "回でした\n";
    // output.textContent += "投資: " + Math.floor(invest) + "円\n";
    // output.textContent += "収入: " + Math.floor(income) + "円\n";
    // let total = income - invest;
    // output.textContent += "今回の収支は" + Math.floor(total) + "円です\n";
}
