<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Support\Traits\Controllers\HasRedirectToReferer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers, HasRedirectToReferer;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'phone'      => $data['phone'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'api_token'  => str_random(60)
        ]);

        // Если при входе была авторизация через соцсеть
        if (isset($data['provider_user_id']) && isset($data['provider'])) {
            $user->socialProviders()->create([
                'provider_user_id' => $data['provider_user_id'],
                'provider' => $data['provider']
            ]);
        }

        // todo: возможно не лучшее место для вызова этого метода
        $user->sendRegistrationNotification();

        return $user;
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        $this->storeReferer();

        return view('auth.register', [
            'socialUser' => false,
            'provider' => false,
        ]);
    }

    protected function registered(Request $request, $user)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'success',
                '_redirect' => $this->getRedirectUrl()
            ]);
        }
    }
}
