import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({ auth, project }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2
                    className="text-xl font-semibold leading-tight
            text-gray-800 dark:text-gray-200 leading-tight"
                >
                    {`Project "${project.name}"`}
                </h2>
            }
        >
            <Head title={`Project "${project.name}"`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div>
                                <img
                                    src={project.image_path}
                                    alt=""
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="grid gap-1 grid-cols-2 mt-2 ">
                                {/* 1st coloumn */}
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Project ID
                                        </label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Name
                                        </label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project.status
                                                    ]
                                                }`}
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created By
                                        </label>
                                        <p className="mt-1">
                                            {project.createdBy.name}
                                        </p>
                                    </div>
                                </div>
                                {/* 2nd coloumn */}
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">
                                            {project.due_date}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created Date
                                        </label>
                                        <p className="mt-1">
                                            {project.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {project.updatedBy.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Descriotion
                                        </label>
                                        <p className="mt-1">{project.description}</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* colied */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900 dark:text-gray-100">

                         Table Gose Here..
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
