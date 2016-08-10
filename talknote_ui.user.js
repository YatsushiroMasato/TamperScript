// ==UserScript==
// @name         Talknote UI 変更
// @namespace    https://github.com/YatsushiroMasato/TamperScript
// @version      0.1
// @description  UIを変えちゃう
// @include      https://company.talknote.com/mediba.jp/*
// @author       Yatsushiro
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @grant        none
// ==/UserScript==
$('.container_table').ready(function(){
        $(this).css({
            'padding-top': '10px'
        });
    });
$(function() {
    // 背景変更
    $('body').css({
        'background-image': 'url(http://freebies-db.com/wp-content/uploads/2014/02/free-textures-seamless-polygon-backgrounds-graphicburger.jpg)',
        'background-size': 'cover',
        'background-position': 'left top'
    });

    // 左サイドメニューの位置修正と背景透過
    $('#left_nav').css({
        'background-color': 'rgba(255,255,255,0.5)',
        'padding-top': '15px'
    });
    $('div').removeClass('dm_group_list');

    // メインコンテンツの背景透過
    $('#wrapper #container').css({
        'background-color': 'rgba(255,255,255,0.6)',
    });

    $('.comment_status, .good_status').css({
        'background-color': 'rgba(255,255,255,0.2)'
    }); // TODO: 画面遷移した際に変更されない

    // 右サイドメニューのコンテンツ削除( ご意見ご要望欄 )
    $('.right-nav-content-header, .right_nav_cont').css({'display': 'none'}); // TODO: 画面遷移した際に変更されない

    // right_nav_tasks
    $('.comment_status_now, #task_list_box').css({
        'background': 'rgba(255,255,255,0.4)'
    }); // TODO: 画面遷移した際に変更されない

    $('dl').removeClass('comment_status_readmore_container'); // TODO: 画面遷移した際に変更されない
})();
