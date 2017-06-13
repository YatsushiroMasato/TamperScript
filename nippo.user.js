// ==UserScript==
// @name         にっぽうをてきとうに。
// @namespace    https://github.com/YatsushiroMasato/TamperScript
// @version      0.1
// @description  日報を簡単につけることができるかんじのやつ
// @author       Masato Yatsushiro <yatsushiro@mediba.jp>
// @match        http://mediba-pjtweb01/ip_web/scripts/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(function($) {

  // jquery-ui-css
  var jquery_ui_css = `
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  `;
  $('head').append(jquery_ui_css);

  // jquery-ui
  var jquery_ui = `
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
  `;
  $('head').append(jquery_ui);

  // CSS
  var css_style = `
  body {
    /*background-color: #87ceeb;*/
    background-color: #CCC;
    background-size: cover;
    background-position: left top;
  }
  #wrapper #container{
    background-color: rgba(255,255,255,0.6);
  }
  `;
  $('<style/>').text(css_style).appendTo($('head'));

  var save_strage_contents = `
  <div id="add_pj">PJ登録</div>
  <div class="list-group list-group-flush" id="PJsave" style="display: none;">
    <div class="list-group-item">
      <input type="text" class="form-control mb-3" id="pj_code" placeholder="プロジェクトコード">
      <input type="text" class="form-control mb-3" id="pj_name" placeholder="プロジェクト名">
      <a class="text-right btn btn-primary">追加</a>
      <label class="pull-right btn btn-danger">PJ全削除</label>
    </div>
  </div>
  `;
  $('body').append(save_strage_contents);

  var contents = `
  <div class="list-group list-group-flush" id="PJnum">
  </div>
  <div class="btn-toolbar" id="work_time">
    <div class="btn-group" role="group">
      <a class='btn btn-info'>00:30</a>
    </div>
    <div class="btn-group" role="group">
      <a class='btn btn-info'>01:00</a>
      <a class='btn btn-info'>01:30</a>
    </div>
    <div class="btn-group" role="group">
      <a class='btn btn-info'>02:00</a>
      <a class='btn btn-info'>02:30</a>
    </div>
    <div class="btn-group" role="group">
      <a class='btn btn-info'>03:00</a>
      <a class='btn btn-info'>03:30</a>
    </div>
    <div class="btn-group" role="group">
      <a class='btn btn-info'>04:00</a>
      <a class='btn btn-info'>04:30</a>
    </div>
    <div class="btn-group" role="group">
      <a class='btn btn-info'>05:00</a>
    </div>
    <div class="btn-group" role="group">
      <a class='btn btn-success' id='all_time'></a>
    </div>
  </div>
  `;
  $('#txtProNo1').parent().parent().parent().parent().after(contents);

  // webStrageから自分のPJコードを取得
  var get_my_pj = window.localStorage.getItem('myPJ');

  if (!get_my_pj) {
    // PJがwebStrageから取り出せなかった場合
    $('#PJnum').append('<div class="list-group-item">プロジェクトコードが存在しません。設定してください。</div>');

    // var my_pj = 'KK-16008103@Cygnus 開発;KH-00014010@販管費：広告システム開発部;JU-00000001-0xx@2017年度auサービス運用保守業務;';

    // webStrageに保存
    // window.localStorage.setItem('myPJ', my_pj);

  } else {
    // PJがwebStrageから取り出せた場合
    // 行末の ; を削除した後、配列化
    var pj_list = get_my_pj.substr(0, get_my_pj.length-1).split(";");

    // PJコードを表示させる
    $.each(pj_list, function() {
      var pj_data = this.split("@");
      var text = `
      <a class="list-group-item">
        <span>`+ pj_data[0] +`</span>
        <div>`+ pj_data[1] +`</div>
      </a>`;
      $('#PJnum').append(text);
    });
  }

  // 実働時間を取得
  var work_time_str = $('#btnCalcJitsudouJikan').parent().text().slice(-5).trim();
  var work_time_arr = work_time_str.split(":");
  var work_time_int = 60*parseInt(work_time_arr[0])+parseInt(work_time_arr[1]);

  // 合計作業時間を取得
  var sum_work_time_str = $('#Form1 table:last-child td:last-child').text();
  var sum_work_time_arr = sum_work_time_str.split(":");
  var sum_work_time_int = 60*parseInt(sum_work_time_arr[0])+parseInt(sum_work_time_arr[1]);

  // 計算
  var time = Math.abs(work_time_int - sum_work_time_int);

  // hh:mm の形に戻す
  xhh=Math.floor( time/60 );
  xmm=time%60;
  var result_time = (("0"+xhh).slice(-2))+":"+(("0"+xmm).slice(-2));

  // ボタンに反映
  $('#all_time').text(result_time);

  //---------- 以下、ユーザーアクションを起こしたときの処理 ----------

  $('#PJnum a').click(function() {
    console.log($(this).children('span').text());

    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    var mp_arr = $(this).children('span').text().split("-");
    if (mp_arr[2] != "0xx") {
      mp_arr[2] = "";
    } else {
      // ここの処理ロジックおかしいけど、放置してる。　なおしたいひと勝手になおして。
      mp_arr[2] = new Date().getMonth()-2;
    }
    $("input[name='txtProNo1']").val(mp_arr[0]);
    $("input[name='txtProNo2']").val(mp_arr[1]);
    $("input[name='txtProEdaNo']").val(mp_arr[2]);
  });

  $('#work_time a').click(function() {
    var time = $(this).text();
    $("input[name='txtSagyoJikan']").val(time);
    $('#btnTsuika').click();
  });

  $('#all_time').click(function() {
    var time = $(this).text();
    $("input[name='txtSagyoJikan']").val(time);
    $('#btnTsuika').click();
  });

  $('#add_pj').click(function() {
    $('#PJsave').show();
  });

  $('#PJsave a').click(function() {
    var pj_code = $('#pj_code').val();
    var pj_name = $('#pj_name').val();
    if (pj_code && pj_name) {
      var pj = pj_code + "@" + pj_name + ";";
      get_my_pj ? get_my_pj += pj : get_my_pj = pj;

      // webStrageに保存
      window.localStorage.setItem('myPJ', get_my_pj);
      location.reload();
    } else {
      console.log("なにもしない");
      $('.collapse').collapse('toggle');
    }
  });

  $('#PJsave label').click(function() {
    window.localStorage.removeItem('myPJ');
    location.reload();
  });

  // 登録ボタンクリックすら手間だと感じる人はコメントアウトを外して。
  if (result_time === '00:00') {
     // $('btnTouroku').click();
  };

})(jQuery.noConflict(true));
