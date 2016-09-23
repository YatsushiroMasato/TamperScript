// ==UserScript==
// @name         Sparrow Issue Template
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Yatsushiro Masato
// @match        https://github.com/*
// @match        https://waffle.io/mediba-system/sparrow-*
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(function($) {
    'use strict';

    var githubRegex = /^https:\/\/github\.com\/(mediba-system)\/(.*sparrow.*)\/issues\/new$/;
    var waffleRegex = /^https:\/\/waffle\.io\/(mediba-system)\/(.*sparrow.*)$/;
    var template = `概要
---------------

* ○○して欲しい
* ☓☓する機能を作成する

ゴール
---------------

* ダッシュボードの☓☓の機能が作成されること
* ○○の機能に関しては別issueで。（issueID: #1 )

資料
---------------

* https://creative-m.backlog.jp/alias/file/5453478

関連
---------------

* #1 (なければ なし と記載)

ToDo
---------------

- [ ] タスク1
- [ ] タスク2
`;

    if (githubRegex.exec(location.href) || waffleRegex.exec(location.href)) {
        // 新規作成時にテンプレートを埋める
        $('#issue_body').val(template);
    }

})(jQuery.noConflict(true));

