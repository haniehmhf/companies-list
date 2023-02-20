import React, { useRef, useState } from "react";
const DEBOUNCE_TIME = 300;

const SearchForm = ({
  onSearch,
}: {
  onSearch: (searchText: string) => void;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout>();

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch(e.target.value);
    }, DEBOUNCE_TIME);
  };

  return (
    <form className="search-form" data-testid="search-form">
      <input
        type="search"
        placeholder="Search for "
        value={searchText}
        onChange={search}
        data-testid="search-input"
      />
    </form>
  );
};

export default SearchForm;
