<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    $name = Auth::user() ? Auth::user()->name : 'John Doe';

    sleep(2);
    return Inertia::render('about/index', compact('name'));
})->name('about');

Route::get('/posts', [PostController::class, 'index'])
    ->name('posts.index');

Route::resource('posts', PostController::class)
    ->middleware(['auth', 'verified'])
    ->names('posts')
    ->except('index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
