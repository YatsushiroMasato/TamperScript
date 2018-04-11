// ==UserScript==
// @name         おぞにっぽー(ﾟ∀ﾟ)
// @namespace    https://github.com/YatsushiroMasato/TamperScript
// @version      ばーじょんつー！
// @description  OZOの勤怠情報をよしなに日報反映させるかんじのやつ
// @author       Masato Yatsushiro <yatsushiro@mediba.jp>
// @match        https://manage.ozo-cloud.jp/mediba/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // getパラメータを取得
    var param_arr = {};
    var get_params = location.search.substring(1).split('&');
    for(var i = 0; i < get_params.length; i++) {
        var keySearch = get_params[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = get_params[i].slice(0, keySearch);
        var val = get_params[i].slice(get_params[i].indexOf('=', 0) + 1);
        if(key != '') param_arr[key] = decodeURI(val);
    }

    // 日報入力時の画面に遷移した際のみ処理する
    if(param_arr.fuseaction === 'clz_TemplateProcessRequest') {
        // 画面ロードされるまで処理まちさせる
        var wait_page = setInterval(function(){
            if (document.getElementById('layer').className == "layer complete") {
                console.log("page loaded!");
                // ループ処理clear
                clearInterval(wait_page);
                // 実処理
                nippo();
            }
        },1000);
    }

    // 日報計算処理などなど
    function nippo() {
        // iframeのコンテンツを取得
        var contents = document.getElementById('exiframe').contentDocument;

        // debug
        console.log(contents.getElementById('fidProjectCode_1'));
    }

})();
