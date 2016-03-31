<?php
/* Smarty version 3.1.29, created on 2016-03-31 02:56:41
  from "/Users/niweiguo/origami/NEXT/views/home.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56fc91e94da701_44883111',
  'file_dependency' => 
  array (
    'a250b9a3ba2d5610c0bbdfd8bcd7f7bc9587ce42' => 
    array (
      0 => '/Users/niweiguo/origami/NEXT/views/home.tpl',
      1 => 1459392999,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56fc91e94da701_44883111 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="zh-Hans" class="no-js core" data-next-app="front-page">
<head> 
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>FTC Next Home Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#333333">
  <meta name="description" content="<?php echo '<%';?>$p.meta.description<?php echo '%>';?>" />
  <meta name="copyright" content="FT中文网">
  <meta name="robots" content="index,follow">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="msapplication-TileColor" content="#fff1e0" />
  <meta name="msapplication-TileImage" content="https://next-geebee.ft.com/assets/brand-alpha/icons/mstile-144x144.png" />

  <link rel="apple-touch-icon" sizes="180x180" href="/bower_components/ftc-icons/favicons/apple-touch-icon-180x180.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/bower_components/ftc-icons/favicons/apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/bower_components/ftc-icons/favicons/apple-touch-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/bower_components/ftc-icons/favicons/apple-touch-icon-76x76.png">
  <link href="/bower_components/ftc-icons/favicons/favicon.ico" type="image/x-icon" rel="shortcut icon" />
  <link rel="preconnect" href="http://static.ftchinese.com" />
  <link rel="preconnect" href="http://i.ftimg.net" />
  <?php echo '<script'; ?>
>
   window.errorBuffer = window.errorBuffer || [];
   function beaconCssError(e) {
   window.errorBuffer.push({
   error: e ? e : new Error('CSS failed to load.'),
   context: {
   isMobileNetork: document.cookie.replace(/(?:(?:^|.*;\s*)h2_isMobile\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '' ? false : true
   }
   });
   }
   <?php echo '</script'; ?>
>

  <?php echo '<script'; ?>
>
  window.cutsTheMustard = (typeof Function.prototype.bind !== 'undefined');
  if (window.cutsTheMustard) {
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js').replace(/\bcore\b/, 'enhanced');
  }
  <?php echo '</script'; ?>
>

  <!--[if lte IE 8]>
      <?php echo '<script'; ?>
>
          document.documentElement.className += ' is-ie-8';
          document.createElement('figure');
          document.createElement('header');
          document.createElement('nav');
          document.createElement('section');
          document.createElement('article');
          document.createElement('aside');
          document.createElement('footer');
      <?php echo '</script'; ?>
>
      <?php echo '<script'; ?>
 src="bower_components/svg4everybody/dist/svg4everybody.legacy.min.js"><?php echo '</script'; ?>
>
      <?php echo '<script'; ?>
>
svg4everybody();
      <?php echo '</script'; ?>
>
  <![endif]-->
  <!-- build:css styles/bundle.min.css -->
  <link rel="stylesheet" type="text/css" href="styles/main.css">
  <!-- endbuild -->
  <!-- build:css styles/ie-XL.css -->
  <link rel="stylesheet" href="styles/ie-XL.css">
  <!-- endbuild -->

  <?php echo '<script'; ?>
 type="text/javascript">
  if(typeof startTime === "undefined"){
  var startTime=new Date().getTime();
  }
  var adchID = '1000';
  var dolRand = Math.round(Math.random()*1000000000);//定义slot随机数实现联动互斥功能
  <?php echo '</script'; ?>
>
  <!-- build:js scripts/key.js -->
  <?php echo '<script'; ?>
 type="text/javascript" src="scripts/key.js"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 type="text/javascript" src="scripts/ad.js"><?php echo '</script'; ?>
>
  <!-- endbuild -->
   <?php echo '<script'; ?>
>
   window.cutsTheMustard = (typeof Function.prototype.bind !== 'undefined');
   if (window.cutsTheMustard) {
   document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'js').replace(/\bcore\b/, 'enhanced');
   }
   <?php echo '</script'; ?>
>

</head>

<body>




<!--[if lte IE 8]>
<?php echo '<script'; ?>
 src="https://cdn.polyfill.io/v2/polyfill.min.js"><?php echo '</script'; ?>
>
<![endif]-->

<!-- build:js scripts/main.js -->
<?php echo '<script'; ?>
 src="scripts/bundle.js"><?php echo '</script'; ?>
>
<!-- endbuild -->


</body>
</html><?php }
}
