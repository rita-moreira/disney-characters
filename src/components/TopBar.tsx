import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SearchBar from "./SearchBar";

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  all: boolean;
  setAll: React.Dispatch<React.SetStateAction<boolean>>;
}
const TopBar: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  all,
  setAll,
}) => {
  const windowDimensions = useWindowDimensions();
  return (
    <>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div style={{ flexGrow: 1 }} />
      {windowDimensions.width > 400 ? (
        <>
          <button
            className={all ? "btn-selected" : ""}
            onClick={() => setAll(true)}
          >
            all
          </button>
          <button
            className={!all ? "btn-selected" : ""}
            onClick={() => setAll(false)}
          >
            favorites
          </button>
        </>
      ) : (
        <div
          className={!all ? "fav-selected" : ""}
          onClick={() => setAll(!all)}
        >
          <svg
            width={"32px"}
            height={"32px"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default TopBar;
