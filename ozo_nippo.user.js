// ==UserScript==
// @name         おぞにっぽー(ﾟ∀ﾟ)
// @namespace    https://github.com/YatsushiroMasato/TamperScript
// @version      ばーじょんわん！
// @description  OZOから勤怠情報をしてきて日報に反映させるかんじのやつ
// @author       Masato Yatsushiro <yatsushiro@mediba.jp>
// @match        https://manage.ozo-cloud.jp/mediba/*
// @match        http://mediba-pjtweb01/ip_web/scripts/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.href.indexOf('https://manage.ozo-cloud.jp/mediba/') == 0) {

        if (document.getElementsByClassName('BaseFontFam')[1].textContent == "簡易表示") {
            getKintai();
        }

        function getKintai() {
            var target_id = 'db_NIPPOU_SINSEI_DATE_';
            var target_date = 0;

            var work_time = [];
            var work_in, work_out, work_date;
            var table = document.getElementById(target_id+1).parentNode.parentNode.parentNode.parentNode.rows;
            for (var i = 0; i < table.length; i++) {
                if (table[i].firstElementChild.firstElementChild) {
                    target_date++;
                    var element = document.getElementById(target_id+target_date);

                    work_date = element.value;
                    work_in = element.parentNode.parentNode.parentNode.nextElementSibling.children[2].textContent.trim();
                    work_out = element.parentNode.parentNode.parentNode.nextElementSibling.children[3].textContent.trim();

                    work_time.push(work_date+"@"+work_in+","+work_out);
                }
            }

            GM_setValue('work_time', work_time);
            console.log(GM_getValue('work_time'));
        }

    } else if (window.location.href.indexOf('http://mediba-pjtweb01/ip_web/scripts/') == 0) {
        var work_time = GM_getValue('work_time');
        var keisan = document.getElementById('btnCalcJitsudouJikan');

        if (work_time && keisan) {
            var chkdate = document.getElementById('txtKaishiJikan').parentNode.parentNode.previousElementSibling.previousElementSibling.children[1].textContent.trim();
            for (var i in work_time) {
                var work_date = work_time[i].split('@')[0];

                if (chkdate == work_date) {
                    var kaishi = document.getElementById('txtKaishiJikan');
                    var shuryo = document.getElementById('txtShuryoJikan');
                    var kyukei = document.getElementById('txtKyukeiJikan');

                    kaishi.value = work_time[i].split('@')[1].split(',')[0];
                    shuryo.value = work_time[i].split('@')[1].split(',')[1];
                    kyukei.value = "1:00";

                    if (document.getElementById('btnCalcJitsudouJikan').parentNode.textContent.slice(-5).trim() == '時間 ：') {
                        keisan.click();
                    }
                    break;
                }
            }
        }
    }
})();
