import { useMemo } from "react";

function Pagination({
  count = 50,
  boundaryCount = 3,
  hideFirstButton = false,
  hideLastButton = false,
  hidePrevButton = false,
  hideNextButton = false,
  page = 1,
  onChange,
}) {
  // Simple validation
  if (!count) throw new Error("count property is required");
  if (!page) throw new Error("page property is required");
  if (!onChange) throw new Error("onChange function is required");
  if (typeof onChange !== "function")
    throw new Error("onChange must be a function");
  //xxxxxxxxxxxx//
  const goToPageHandler = (page) => {
    if (page >= 1 && page <= count) onChange(page);
  };
  const firstPageHandler = () => {
    onChange(1);
  };
  const lastPageHandler = () => {
    onChange(count);
  };

  const nextPageHandler = () => {
    if (page < count) onChange(page + 1);
  };
  const previousPageHandler = () => {
    if (page > 1) onChange(page - 1);
  };

  const paginationArray = useMemo(() => {
    if (count > 10) {
      const firstPortion = Array.from(
        { length: page > boundaryCount ? boundaryCount + 3 : boundaryCount },
        (_, i) => i + (page > boundaryCount ? page - (boundaryCount - 1) : 1)
      );

      const dotSeparator = page + boundaryCount >= count ? null : "...";

      const lastPortion = Array.from(
        { length: boundaryCount },
        (_, i) => i + (count - (boundaryCount - 1))
      );

      return [
        ...new Set([...firstPortion, dotSeparator, ...lastPortion]),
      ].filter((e) => e && (e <= count || e === "..."));
    }

    return Array.from({ length: count }, (_, i) => i + 1);
  }, [count, page, boundaryCount]);

  return (
    <div>
      {!hideFirstButton && <button onClick={firstPageHandler}>{"<<"}</button>}
      {!hidePrevButton && <button onClick={previousPageHandler}>{"<"}</button>}
      {paginationArray.map((currentPage) => {
        return (
          <button
            style={{
              ...(page === currentPage && {
                background: "red",
                color: "#fff",
              }),
            }}
            onClick={() => goToPageHandler(currentPage)}
            key={currentPage}
          >
            {currentPage}
          </button>
        );
      })}
      {!hideNextButton && <button onClick={nextPageHandler}>{">"}</button>}
      {!hideLastButton && <button onClick={lastPageHandler}>{">>"}</button>}
    </div>
  );
}

export default Pagination;
