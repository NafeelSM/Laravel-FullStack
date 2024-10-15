<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->route("user");
        return [
            "name" => ["required", "string", "max:255"],
            "email" => [
                "required",
                "string",
                "email",
                "max:255",
                Rule::unique('users')->ignore($user->id),
            ],
            "password" => [
                "nullable",
                "confirmed",
                Password::min(8) // Ensures password has a minimum length of 8
                    ->letters()   // At least one letter
                    ->symbols()   // At least one symbol
                    ->numbers()   // At least one number
                    ->mixedCase() // Both uppercase and lowercase characters
            ],
        ];
    }
}
