<?php

if (!function_exists('formatPrice')) {
    function formatPrice($price, $currencyCode): string
    {
        return \MosseboShopCore\Shop\Price::formatPrice($price, $currencyCode);
    }
}


if (!function_exists('productsToResource')) {
    function productsToResource(\Illuminate\Support\Collection $products): array
    {
        return $products->reduce(function ($carry, $product) {
            if ($product->canBeShowed()) {
                $carry[] = new \App\Http\Resources\ProductResource($product);
            }

            return $carry;
        }, []);
    }
}


