<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Throwable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Sentry\State\HubInterface;
use Sentry\Laravel\Integration;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */


    public function register(): void
    {
        $this->reportable(function (Throwable $e, Request $request) {
            if (app()->bound(HubInterface::class)) {
                $hub = app(HubInterface::class);

                $hub->withScope(function (\Sentry\State\Scope $scope) use ($hub, $request, $e) {
                    $scope->setExtra('request', [
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                        'headers' => $request->headers->all(),
                        'body' => $request->all(),
                        'ip' => $request->ip(),
                    ]);

                    if ($request->user()) {
                        $scope->setUser([
                            'id' => $request->user()->id,
                            'email' => $request->user()->email,
                        ]);
                    }

                    $hub->captureException($e);
                });
            }
        });
    }


    protected function unauthenticated($request, AuthenticationException $exception)
    {
        Log::warning('Unauthenticated access attempt.', [
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
            'requested_url' => $request->fullUrl(),
            'route' => $request->route() ? $request->route()->getName() : 'N/A',
            'guards' => $exception->guards(),
        ]);

        return response()->json(['message' => 'Unauthorized.'], 401);
    }


}
