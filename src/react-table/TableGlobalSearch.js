import { useContext, useRef } from "react";
import { reactTableContext } from "./Table";

function TableGlobalSearch() {
  const { queryString, setSearchParams, searchParams } =
    useContext(reactTableContext);
  const inputRef = useRef(null);

  const globalSearchHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;

    if (!value?.trim()) return;

    setSearchParams((prevState) => {
      return [
        ...prevState.filter((e) => e[0] !== queryString),
        [queryString, value],
      ];
    });
  };

  return (
    <>
      <form onSubmit={globalSearchHandler}>
        <input
          type="text"
          ref={inputRef}
          defaultValue={searchParams.filter(
            (e) => e[1] && e[0] === queryString
          )}
          placeholder="Search"
        />
      </form>
    </>
  );
}

export default TableGlobalSearch;
