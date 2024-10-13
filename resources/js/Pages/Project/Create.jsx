import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Created({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("project.create"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create New Projects
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800
                            shadow sm:rounded-lg"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="project_image_path"
                                        value="Project Image"
                                    />
                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        value={data.image}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("image", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                <InputLabel htmlFor="project_name" value="Project Name" />

                                    <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                <InputLabel htmlFor="project_description" value="Project Description" />

                                    <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                            </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
