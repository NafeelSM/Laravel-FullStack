<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


use App\Http\Resources\TaskResource; // Import the TaskResource

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Task/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data ['created_by'] = Auth::id();
        $data ['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/'.Str::random
            (), 'public');
        }
        Task::create($data);

        return to_route('task.index')
            ->with('success', 'Task Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $task->tasks();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit',[
            'task' => new taskResource($task)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $request->file('image');  // Use request->file() for image
        $data['updated_by'] = Auth::id();

        if ($image) {
            // Delete the old image if it exists
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory (dirname($task->image_path));
            }

            // Store the new image and get its path
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        $task->update($data);

        return to_route('task.index')->with('success', "Task \"{$task->name}\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if($task->image_path){
            Storage::disk('public')->deleteDirectory (dirname( $task->image_path));
        }
        return to_route('task.index')->with('success', "Task \"$name\"was deleted");
    }
}
