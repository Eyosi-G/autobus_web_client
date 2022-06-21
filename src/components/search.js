import React from "react";

const Search = ({search, onSearchChange, placeholder="e.g abebe"}) => {
  return (
    <div className="p-2 border rounded-md bg-white mb flex space-x-2 items-center">
      <span className="text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <input
        type="text"
        className="w-full outline-none"
        placeholder={placeholder}
        value={search}
        onChange={(e)=>{
          onSearchChange(e.target.value)
        }}
      />
    </div>
  );
};

export default Search;
