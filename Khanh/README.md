# 開発環境の使い方（Gulp Expert）
全てコマンドプロンプトから実行します。  

## How to use Gulp
use the command prompt


## 初期設定
###node.jsのインストール
インストールされていれば不要です。
コマンドプロンプトを開いて`node -v`と入力・実行し、バージョン表記が表示されればインストールされています。  
インストールされていない場合は <a href="https://nodejs.org/" target="_blank">node.js</a> 公式サイトからダウンロードしてインストールしてください。

## Install node.js
checking by using Terminal as below.
$ node -v
If in case that version information isn’t displayed, please install Node.js for Mac.Please refer to ( http://qiita.com/akakuro43/items/600e7e4695588ab2958d) or [the official site of Node.js (https://nodejs.org/en/download/)]


## gulpのインストール
コマンドプロンプトで`npm install gulp -g`と入力・実行してください。

## Install gulp
npm install gulp -g


## モジュールのインストール
package.json があるフォルダで[Shift+右クリック]→[コマンドウィンドウでここを開く]を選択してコマンドプロンプトを開き、npm install と入力・実行してください。  
node_modules というフォルダが作成され、その中にインストールされます。
この操作は案件が変わり別のディレクトリなった場合にはもう一度必要になります。

## command
<dl>
<dt>gulp clean</dt>
<dd>remove httpdocs</dd>

<dt>gulp sass</dt>
<dd>Compile sass to css in httpdocs</dd>

<dt>gulp ejs</dt>
<dd>Compile ejs to html in httpdocs</dd>

<dt>gulp imagemin</dt>
<dd>image compression in httpdocs</dd>

<dt>gulp cssminify</dt>
<dd>httpdocs/assets/css/ の中にある .css ファイルをミニファイして上書きする。<br>
      デフォルトでは無効にしているので、使用する際はsetting.minify.cssを true にする。</dd>

<dt>gulp jsminify</dt>
<dd>httpdocs/assets/js/ の中にある .js ファイルをミニファイして上書きする。<br>
      デフォルトでは無効にしているので、使用する際はsetting.minify.jsを true にする。</dd>

<dt>gulp cssbeautify</dt>
<dd>httpdocs/assets/css/ の中にある .css ファイルのコードを整形して上書きする。<br>
      デフォルトでは無効にしているので、使用する際は setting.cssbeautify.disabled を false にする。
      ※cssminify が有効な場合は使用できない。</dd>

<dt>gulp csscomb</dt>
<dd>httpdocs/assets/css/ の中にある .css ファイルのCSSプロパティをソートして上書きする。<br>
      デフォルトでは無効にしているので、使用する際は setting.csscomb.disabled を false にする。<br>
      cssminify が有効な場合は使用できない。</dd>

<dt>gulp build</dt>
<dd>src フォルダを元にコンパイルしたファイルを httpdocs フォルダに出力する。<br>
      すでに httpdocs がある場合は一度削除するため、httpdocs に直接ファイルを置かないように気をつける。<br>
      上記で紹介しているコマンドを一括で実行する。</dd>

<dt>gulp</dt>
<dd>httpdocsフォルダをルートにWebサーバを立ち上げる。<br>
      ローカルとイントラネット内で確認できるAccess URLsを発行してくれる。<br>
      PHPを使用する場合は、setting.browserSync.server をコメントアウトし、<br>
      setting.browserSync.proxyにxamppで作成したローカルテスト環境のドメインを指定する。</dd>
</dl>

## ディレクトリルール
<dl>
<dt>src</dt>
<dd>For development</dd>
<dt>httpdocs</dt>
<dd>For Output</dd>
</dl>

src  
┣assets  
┃┠img     - jpg|png|gif|svg  
┃┠sass    - scss  
┃┠js      - js  
┃┠lib     - jQuery Plugin etc... 
┃┠include - include file   
┃┗etc     - many other  
┠sitemap.xml  
┗index.html|.php

※外部ファイルは全てassetsフォルダに入れる。
※上記のフォルダ以外のフォルダに入ったファイルは全てコピーされます。
※複数のディレクトリにCSSや画像が入る場合にはgulpfile.jsのsetting変数の変更が必要です。

## 最後に
gulpfile.js で何を行っているのか、package.json にあるモジュールは何かを事前に把握して使用してください。  
