// ==UserScript==
// @name         Talknote UI 変更
// @namespace    https://github.com/YatsushiroMasato/TamperScript
// @version      0.1
// @description  UIを変えちゃう
// @include      https://company.talknote.com/mediba.jp/*
// @author       Yatsushiro
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==
(function($) {
  // $(document).ajaxComplete(function(){
  //
  //   // タイムライン削除
  //   $('#left_menu_allfeed').css({
  //       'display': 'none',
  //   });
  //
  //   // コメント部分の半透明化
  //   $('.comment_status, .good_status').css({
  //       'background-color': 'rgba(255,255,255,0.2)'
  //   });
  //
  //   // 右サイドメニューのコンテンツ削除( ご意見ご要望欄 )
  //   $('.right-nav-content-header, .right_nav_cont').css({'display': 'none'});
  //
  //   // right_nav_tasks
  //   $('.comment_status_now, #task_list_box').css({
  //       'background': 'rgba(255,255,255,0.4)'
  //   });
  //
  //   $('dl').removeClass('comment_status_readmore_container');
  //
  // });


  // GM_setValue("imageString", null);

  // if(!GM_getValue('imageString')) {
  //
  //   $("head").append('<link rel="stylesheet" type="text/css" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.min.css" >');
  //   /*jshint multistr: true */
  //   $("body").append('\
  //   <div id=dialog style=display:none>\
  //   <form>\
  //     <fieldset>\
  //       <label for="text">背景画像URL</label>\
  //         <input type="text" name="url" id="url">\
  //     </fieldset>\
  //   </form>\
  //   </div>\
  //   ');
  //
  //   // dialog表示
  //   $('#dialog').dialog({
  //     title: "背景画像選択",
  //     buttons: {
  //       "OK": function() {
  //         $(this).dialog( "close" );
  //         GM_setValue('imageString', $('#url').val());
  //         alert('背景画像を適応しました。リロードしてください。');
  //       },
  //     },
  //   });
  //
  // }

  imageUrl = GM_getValue('imageString')

  if(imageUrl) {
    // 背景変更
    $('body').css({
        'background-image': 'url('+ imageUrl +')',
        'background-size': 'cover',
        'background-position': 'left top'
    });
  }

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

})(jQuery.noConflict(true));



$(document).ajaxComplete(function(){

  // タイムライン削除
  $('#left_menu_allfeed').css({
      'display': 'none',
  });

  // コメント部分の半透明化
  $('.comment_status, .good_status').css({
      'background-color': 'rgba(255,255,255,0.2)'
  });

  // 右サイドメニューのコンテンツ削除( ご意見ご要望欄 )
  $('.right-nav-content-header, .right_nav_cont').css({'display': 'none'});

  // right_nav_tasks
  $('.comment_status_now, #task_list_box').css({
      'background': 'rgba(255,255,255,0.4)'
  });

  $('dl').removeClass('comment_status_readmore_container');

});
