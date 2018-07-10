<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class FormRequest extends BaseFormRequest
{
    public function authorize()
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        if ($validator->fails()) {
            $errors = [];

            foreach ($validator->errors()->messages() as $fieldName => $messages) {
                $errors[$fieldName] = $messages[0];
            }
        }

        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'errors' => $errors,
        ], 422));
    }
}
