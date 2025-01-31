<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Log;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        Log::warning('Unauthenticated access attempt to URI: ' . $request->getPathInfo(), [
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
        ]);

        if ($request->expectsJson()) {
            return null;
        }

        return route('login');
    }
}
