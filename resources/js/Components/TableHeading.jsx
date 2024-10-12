import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) {
  const isActive = sort_field === name;

  return (
    <th
      onClick={() => sortable && sortChanged(name)}
      className="px-3 py-3 text-left cursor-pointer"
    >
      <div className="flex items-center gap-1">
        <span>{children}</span>
        {sortable && (
          <span className="flex flex-col">
            <ChevronUpIcon
              className={`w-4 h-4 ${
                isActive && sort_direction === "asc" ? "text-white" : "text-gray-400"
              }`}
            />
            <ChevronDownIcon
              className={`w-4 h-4 mt-1 ${
                isActive && sort_direction === "desc" ? "text-white" : "text-gray-400"
              }`}
            />
          </span>
        )}
      </div>
    </th>
  );
}
