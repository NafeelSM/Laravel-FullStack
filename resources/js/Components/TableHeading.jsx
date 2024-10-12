import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
export default function TableHeading({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
    children,
}) {
    return (
        <th
            onClick={(e) => sortChanged("name")}
            className="px-3 py-3
            flex items-center justify-between gap-1"
        >
            <div className="flex items-center space-x-1 cursor-pointer">
                {children}
                {sortable && (
                    <span className="flex flex-col">
                    <ChevronUpIcon
                        className={
                            "w-4 " +
                            (sort_field === "id" &&
                            sort_direction === "asc"
                                ? "text-white"
                                : "")
                        }
                    />
                    <ChevronDownIcon
                        className={
                            "w-4 mt-2 " +
                            (sort_field === "id" &&
                            sort_direction === "desc"
                                ? "text-white"
                                : "")
                        }
                    />
                </span>
                )}
            </div>
        </th>
    );
}
