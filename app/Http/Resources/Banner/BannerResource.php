<?php

namespace App\Http\Resources\Banner;

use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->resource->id,
            'gradient' => json_decode($this->resource->gradient, true),
            'title_color' => $this->resource->title_color,
            'caption_color' => $this->resource->caption_color,
            'button_color' => $this->resource->button_color,
            'button_background_color' => $this->resource->button_background_color,

            'title' => $this->resource->currentI18n->title,
            'caption' => $this->resource->currentI18n->caption,
            'button' => $this->resource->currentI18n->button,
        ];

        $this->connectImages($data);

        $data['link'] = $this->getLink();
        $data['merged_title'] = $this->getMergedTitle();

        return $data;
    }

    protected function connectImages(& $data)
    {
        $lables = ['small_image', 'mobile_image', 'desktop_image', 'background_image'];

        foreach ($lables as $label) {
            $image = $this->resource->{$label};

            $data[$label] = $image ? imagePath($image) : '';
        }
    }

    public function getLink()
    {
        $link = $this->resource->currentI18n->link;

        if (! $link) {
            return $link;
        }

        if (strpos($link, 'http') === 0) {
            return $link;
        }

        return '/' . trim($link, '/');
    }

    public function getMergedTitle()
    {
        $acc = [];

        foreach(['title', 'caption'] as $label) {
            $text = $this->resource->currentI18n->{$label};

            if ($text) {
                $acc[] = $text;
            }
        }

        return implode(' ', $acc);
    }
}