@component('mail::row', ['class' => 'product-row row-fw'])
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                @if ($image)
                    <td style="width: 112px">
                        <div class="product-image">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $url }}">
                                            <img src="{{ $image }}" alt="{{ $title }}" width="">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                @else
                    <td></td>
                @endif

                <td style="text-align: left">
                    <a href="{{ $url }}">
                        <span class="checkout-product-name">
                            {{ $title }}
                        </span>
                    </a>
                </td>

                @if ($price)
                    <td style="text-align: right">
                        <span class="price">
                            {{ $price }}
                        </span>
                    </td>
                @endif
            </tr>
        </tbody>
    </table>
@endcomponent


