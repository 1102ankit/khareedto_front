<!DOCTYPE html>
<html data-ng-app="Creators">
<head>
    <base href="/"></base> 
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, minimal-ui"/>


    <title data-ng-bind="::pageTitle()"> KharidTo </title>
    <meta name="description" content="">

    <meta name="keywords" content="">

    <!-- General Meta Tags -->
    <meta property="og:locale" content="" />
    <meta property="og:title" content=""/>
    <meta property="og:description" content="" />
    <meta property="og:site_name" content="">
    <meta property="og:url" content="" />
    <meta property="og:image" content="" />

    <!-- Facebook Share Tags -->
    <meta property="fb:app_id" content="{{ config('tst.social.facebook.pageId') }}" />  
    <meta property="article:publisher" content="{{ config('tst.social.facebook.url') }}" />

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content="{{ '@' . config('tst.social.twitter.username') }}"/>
    <meta name="twitter:creator" content="{{ '@' . config('tst.social.twitter.username') }}"/>
    <meta name="twitter:title" content="@yield('title', config('tst.info.title') )"/>
    <meta name="twitter:description" content="@yield('description', config('tst.info.description') )"/>
    <meta name="twitter:image" content="@yield('image', config('tst.info.image') )"/>


    <!-- Standard Favicons -->
    <link rel="icon" type="image/x-icon" href="../favicon.ico" />
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('icons/favicon-32x32.png') }}">

    <!-- Opera Speed Dial Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('icons/favicon-32x32.png') }}" />

    <!-- iPhone/iPad icons: -->
    <link rel="apple-touch-icon" sizes="57x57" href="{{ asset('icons/apple-icon-57x57.png') }}">
    <link rel="apple-touch-icon" sizes="60x60" href="{{ asset('icons/apple-icon-60x60.png') }}">
    <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('icons/apple-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('icons/apple-icon-76x76.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ asset('icons/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('icons/apple-icon-120x120.png') }}">
    <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('icons/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('icons/apple-icon-152x152.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('icons/apple-icon-180x180.png') }}">

    <!-- General icons -->
    <link rel="icon" type="image/png" sizes="192x192"  href="{{ asset('icons/android-icon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('icons/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('icons/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('icons/favicon-16x16.png') }}">

    <!-- Other Stuff -->
    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <meta name="msapplication-TileColor" content="#1f82a7">
    <meta name="msapplication-TileImage" content="{{ asset('icons/ms-icon-144x144.png') }}">
    <meta name="theme-color" content="#1f82a7">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#1f82a7">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-status-bar-style" content="#1f82a7">

    <!-- Google Fonts  -->
<!--     <link href='http://fonts.googleapis.com/css?family=Dancing+Script%7CLato:400,700,900' rel='stylesheet' type='text/css' />
 -->
    <!-- Stylesheets -->
 <link href="styles/app.css" rel="stylesheet" type="text/css" />

</head>

<body class="" itemscope itemtype="http://schema.org/WebPage" >
    <!-- top navbar-->
    <header ng-include="'views/partials/navbar.html'" class="topnavbar-wrapper"></header>

    <div ui-view='' data-autoscroll="false" class="wrapper"> </div>

    <script src="scripts/vendors.js"></script>
    <script src="scripts/app.js"></script>

</body>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-73984308-1', 'auto');
  ga('send', 'pageview');

</script>
</html>
