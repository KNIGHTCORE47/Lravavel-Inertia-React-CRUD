<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $posts = Post::latest()->get();
        $posts = Post::latest()->paginate(5);


        return Inertia::render('post/index', [
            "posts" => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Authenticated user can create post
        if (!Auth::user()) {
            abort(403, "Unauthorized Action.");
        }

        return Inertia::render("post/create");

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Authenticated user can create post
        if (!Auth::user()) {
            abort(403, "Unauthorized Action.");
        }

        $response = $request->validate([
            "body" => "required | string | max:1000",
        ]);

        $completeData = [
            ...$response,
            "created_by" => now(),
            "updated_by" => now(),
        ];

        Post::create($completeData);

        return redirect()
            ->route("posts.index")
            ->with("message", "Post created successfully.");

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);

        return Inertia::render("post/show", [
            "post" => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (!Auth::user()) {
            abort(403, "Unauthorized Action.");
        }

        $post = Post::find($id);

        return Inertia::render("post/edit", [
            "post" => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (!Auth::user()) {
            abort(403, "Unauthorized Action.");
        }

        $response = $request->validate([
            "body" => "required | string | max:1000",
        ]);

        $completeData = [
            ...$response,
            "updated_by" => now(),
        ];

        Post::find($id)->update($completeData);

        return redirect()
            ->route("posts.index")
            ->with("message", "Post updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!Auth::user()) {
            abort(403, "Unauthorized Action.");
        }

        $post = Post::find($id);
        $post->delete();

        return redirect()
            ->route("posts.index")
            ->with("message", "Post deleted successfully.");
    }
}
