<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepoServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('languages', function() {
            return new \MosseboShopCore\Repositories\LanguageRepository(
                \App\Models\Language::class
            );
        });

        $this->app->singleton('attributes', function() {
            return new \MosseboShopCore\Repositories\AttributeRepository(
                \App\Models\Shop\Attribute::class
            );
        });

        $this->app->singleton('categories', function() {
            return new \MosseboShopCore\Repositories\CategoryRepository(
                \App\Models\Shop\Category::class
            );
        });

        $this->app->singleton('rooms', function() {
            return new \MosseboShopCore\Repositories\RoomRepository(
                \App\Models\Shop\Room::class
            );
        });

        $this->app->singleton('styles', function() {
            return new \MosseboShopCore\Repositories\StyleRepository(
                \App\Models\Shop\Style::class
            );
        });

        $this->app->singleton('currencies', function() {
            return new \MosseboShopCore\Repositories\CurrencyRepository(
                \App\Models\Shop\Currency::class
            );
        });

        $this->app->singleton('delivery-types', function() {
            return new \MosseboShopCore\Repositories\LanguageRepository(
                \App\Models\Shop\DeliveryType::class
            );
        });

//        $this->app->singleton('price-types', function() {
//            return new \MosseboShopCore\Repositories\PriceTypeRepository(
//                \App\Models\Shop\PriceType::class
//            );
//        });

        $this->app->singleton('pay-types', function() {
            return new \MosseboShopCore\Repositories\LanguageRepository(
                \App\Models\Shop\PayType::class
            );
        });

        $this->app->singleton('order-statuses', function() {
            return new \MosseboShopCore\Repositories\LanguageRepository(
                \App\Models\Shop\OrderStatus::class
            );
        });

        $this->app->singleton('cities', function() {
            return new \MosseboShopCore\Repositories\CityRepository(
                \App\Models\City::class
            );
        });

        $this->app->singleton('countries', function() {
            return new \MosseboShopCore\Repositories\CountryRepository(
                \App\Models\Country::class
            );
        });

        $this->app->singleton('settings', function() {
            return new \MosseboShopCore\Repositories\SettingsRepository(
                \App\Models\Settings::class
            );
        });
    }
}
