<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreprojectRequest;
use App\Http\Requests\UpdateprojectRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%". request("name") ."%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Project/Index",[
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),

        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreprojectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data ['created_by'] = Auth::id();
        $data ['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('project/'.Str::random
            (), 'public');
        }
        Project::create($data);

        return to_route('project.index')
            ->with('success', 'Project Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
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
        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit',[
            'project' => new projectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
        public function update(UpdateProjectRequest $request, Project $project)
        {
            $data = $request->validated();
            $image = $request->file('image');  // Use request->file() for image
            $data['updated_by'] = Auth::id();

            if ($image) {
                // Delete the old image if it exists
                if ($project->image_path) {
                    Storage::disk('public')->delete($project->image_path);
                }

                // Store the new image and get its path
                $data['image_path'] = $image->store('project/' . Str::random(), 'public');
            }

            $project->update($data);

            return to_route('project.index')->with('success', "Project \"{$project->name}\" was updated");
        }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(project $project)
    {
        $name = $project->name;
        $project->delete();
        return to_route('project.index')->with('success', "Project \"$name\"was deleted");
    }
}
