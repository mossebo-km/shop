<?php

namespace App\Http\Controllers\Shop;

use Rooms;
use Categories;
use SeoProxy;
use App\Models\Shop\Product\Product;
use App\Http\Controllers\Shop\BaseStructure\BaseStructureController;

class RoomController extends BaseStructureController
{
    protected static $repository = Rooms::class;

    public function index()
    {
        SeoProxy::setTitle('Комнаты');
        SeoProxy::setDescription('Комнатные товары');

        return view('shop.pages.rooms.index', [
            'items' => static::all()
        ]);
    }

    public function catalog($slug)
    {
        $room = static::find($slug);

        $categories = Categories::where('parent_id', 0);

        return view('shop.pages.rooms.catalog', [
            'room' => $room,
            'category' => false,
            'categories' => static::makeCategoriesCollection($room, $categories)
        ]);
    }

    public function category($slug, $categorySlug)
    {
        $room = static::find($slug);

        $category = Categories::where('slug', $categorySlug)->first();

        if (!$category) {
            abort(404);
        }

        $categoryChildren = Categories::where('parent_id', $category->id);

        if ($categoryChildren->count() > 0) {
            return view('shop.pages.rooms.catalog', [
                'room' => $room,
                'category' => $category,
                'categories' => static::makeCategoriesCollection($room, $categoryChildren),
            ]);
        }

        $productsCount = Product::whereRoom($room->id)
            ->whereCategory($category->id)
            ->count();

        if ($productsCount === 0) {
            abort(404);
        }

        return view('shop.pages.rooms.category', [
            'room' => $room,
            'category' => $category,
        ]);
    }

    public static function all()
    {
        $rooms = static::$repository::getCollection()->sortBy('position');

        return static::makeStructureCollection(
            $rooms,
            function ($resource) {
                return $resource->link();
            }
        );
    }

    protected static function makeCategoriesCollection($room, $categories)
    {
        return static::makeStructureCollection(
            $categories,
            function ($resource) use($room) {
                return siteUrl('rooms/' . $room->slug . '/' . $resource->slug);
            },
            function($resource) use($room) {
                $row = $resource
                    ->productCounts
                    ->where('room_id', $room->id)
                    ->first();

                return $row ? $row->count : 0;
            }
        );
    }
}
