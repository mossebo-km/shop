<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>

    @include('layouts.meta')

    <link href="{{ mix('assets/css/app.css') }}" rel="stylesheet">

</head>
<body>

<div id="app">

    @include('layouts.header')
    @include('layouts.nav')

    @yield('content')

    @include('layouts.footer')

</div>

<script src="{{ mix('assets/js/manifest.js') }}" defer></script>
<script src="{{ mix('assets/js/vendor.js') }}" defer></script>
<script src="{{ mix('assets/js/app.js') }}" defer></script>

</body>
</html>