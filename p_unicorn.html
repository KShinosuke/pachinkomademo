function runSimulation() {
    const random_hit = [39, 233, 451, 893, 1836, 2143, 2628, 2742, 2811, 3055];

    let limittime = parseFloat(document.getElementById("limittime").value);
    let rotate_ave = parseInt(document.getElementById("rotate_ave").value);
    let kankinritu = parseFloat(document.getElementById("kankinritu").value);

    let usetime = 0;
    let total_route = 0;
    //総回転数=total_route
    let hit = 0;
    let kakuhen_hit = 0;
    let hit2 = 0;
    let kakuhen_total_hit = 0;
    let route = 1;

    const output = document.getElementById("output");
    output.textContent = '';

    let hasHit = false; // 大当たりが一度も出なかったかどうかのフラグ

    while (usetime < limittime) {
        let route = 1;
        //当たったら1に戻す。
        while (true) {
            let one_route = Math.floor(Math.random() * 3197) + 1;
            if (random_hit.includes(one_route)) {
                hasHit = true; // 大当たりが出たことを記録
                output.textContent += "大当たり！！\n";
                output.textContent += "初当たりまで" + route + "回転\n";
                total_route += route;//当たったのでrouteをtotal_routeに加算
                route = 0;//当たりが出たのでリセット
                hit += 1;

                if (random_hit.slice(0, 5).includes(one_route)) {
                    output.textContent += "確変突入！！\n";
                    if (random_hit[0] === one_route) {
                        output.textContent += "3000FEVER\n";
                        hit2 += 1;
                    }
                    //random_hit2の1~13番目は転落、14~61番目は継続
                    const random_hit2 = [1550, 893, 1007, 711, 1658, 971, 1492, 896, 396, 390, 892, 18, 268, 1282, 1289, 1723, 867, 1243, 611, 248, 376, 1497, 608, 381, 1801, 1825, 1461, 955, 290, 1567, 1802, 803, 92, 1487, 307, 658, 317, 1499, 1371, 1353, 1028, 1403, 1958, 1445, 1008, 44, 296, 397, 1152, 840, 1662, 10, 795, 1507, 1291, 1687, 185, 1381, 799, 715, 1831];

                    let route2 = 0;
                    //route2は確変中の回転数
                    kakuhen_hit = 0;

                    while (true) {
                        let one_route2 = Math.floor(Math.random() * 2000) + 1;
                        if (random_hit2.slice(0, 12).includes(one_route2)) {
                            output.textContent += "転落、人がどれだけ足掻こうと結末は変わらない\n";
                            output.textContent += "転落は" + route2 + "回転目\n";
                            usetime += 2 / 60;

                            let one_route3 = Math.floor(Math.random() * 2000) + 1;
                            let one_route4 = Math.floor(Math.random() * 2000) + 1;
                            let one_route5 = Math.floor(Math.random() * 2000) + 1;
                            let one_route6 = Math.floor(Math.random() * 2000) + 1;

                            if (random_hit2.slice(13, 60).includes(one_route3) || random_hit2.slice(13, 60).includes(one_route4) || random_hit2.slice(13, 60).includes(one_route5) || random_hit2.slice(13, 60).includes(one_route6)) {
                                output.textContent += "それでも！！！『引き戻し成功』\n";
                                kakuhen_hit += 1;
                                continue;
                            }

                            kakuhen_total_hit += kakuhen_hit;
                            break;
                        }

                        route2 += 1;
                        if (random_hit2.slice(13, 60).includes(one_route2)) {
                            output.textContent += "ユニコーン！！！！！\n";
                            output.textContent += route2 + "回転目あたり\n";
                            usetime += 2 / 60;// 確変中の1回転あたり2秒を時間に加算
                            route2 = 1;
                            kakuhen_hit += 1;

                        }

                    }

                    output.textContent += "確変中" + kakuhen_hit + "回当たり\n";
                } else {
                    output.textContent += "確変失敗\n";
                }
                break;
            }

            route += 1;
            usetime += 14 / 60 / 60; // 通常時の1回転あたり14秒を時間に加算
            if (usetime >= limittime) {
                total_route +=  route; // 大当たりが出なかった場合も回転数を加算
                fin_route = route
                break;
            }
        }
    }

    if (!hasHit) {
        output.textContent += "大当たりは出ませんでした。\n";
    }

    output.textContent += "       \n";
    output.textContent += "遊戯終了\n";
    output.textContent += "通常時最終回転は"　+ fin_route + "回転でした\n";
    output.textContent += "通常時の総回転数は" + total_route + "回転でした\n";
    output.textContent += "初当たり回数は" + hit + "回でした\n";
    output.textContent += "確変中当たり回数は" + kakuhen_total_hit + "回でした\n";
    let invest = total_route / rotate_ave * 1000;
    let income = hit * 450 * kankinritu + kakuhen_total_hit * 1500 * kankinritu + hit2 * (3000 - 450) * kankinritu;

    output.textContent += "投資: " + Math.floor(invest) + "円\n";
    output.textContent += "収入: " + Math.floor(income) + "円\n";
    let total = income - invest;
    output.textContent += "今回の収支は" + Math.floor(total) + "円です\n";
}
