<?php

namespace App\Support\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class Currencies
 * @package MosseboShopCore\Support\Facades
 */
class Cart extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'cart';
    }
}
