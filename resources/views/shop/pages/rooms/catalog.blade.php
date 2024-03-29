@extends('shop.layouts.html')

@section('content')
    {{ Breadcrumbs::render('room-catalog', $room, $category) }}

    <div class="container">
        <h1 class="title-h1">
            @if ($category)
                {{ $category->title }}
            @else
                {{ $room->title }}
            @endif
        </h1>
    </div>

    @include('shop.layouts.structure-popular', [
        'items' => $categories
    ])

    <div class="container mt-60">
        <catalog></catalog>
    </div>
@endsection
