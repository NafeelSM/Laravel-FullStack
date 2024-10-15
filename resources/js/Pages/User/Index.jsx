import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams = null , success }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("user.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction =
                queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("user.index"), queryParams);
    };

    const deleteUser = (user) =>{
        if (!window.confirm("Are you want to delete ?"))
        {
            return;
        }
        router.delete(route("user.destroy", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
                <Link href={route("user.create")} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover: bg-emerald-600">
                    Add New
                </Link>
                </div>
            }
        >
            <Head title="Users" />



            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                { success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
               {success}
            </div>
            )};
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr>
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>



                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>

                                            <TableHeading
                                                name="email"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Email
                                            </TableHeading>

                                            <TableHeading
                                                name="created_date"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>




                                            <th className="px-3 py-3 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Filtering */}
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr>
                                            <th className="px-8 py-3"></th>
                                            <th className="px-8 py-3"></th>
                                            <th className="px-8 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="User Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.email
                                                    }
                                                    placeholder="User Email"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("email", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">

                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={user.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {user.id}
                                                </td>

                                                <td className="px-3 py-2 text-gray-100 text-white text-nowrap">

                                                        {user.name}

                                                </td>
                                                <td className="px-3 py-2">
                                                {user.email}
                                                </td>
                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    {user.created_at}
                                                </td>


                                                <td className="px-3 py-2 text-right text-nowrap">
                                                    <div className="inline-flex items-center space-x-2">
                                                        <Link
                                                            href={route(
                                                                "user.edit",
                                                                user.id
                                                            )}
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={(e) => deleteUser(user)}
                                                            href={route(
                                                                "user.destroy",
                                                                user.id
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
