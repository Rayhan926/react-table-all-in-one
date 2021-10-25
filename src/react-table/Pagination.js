import { useMemo } from 'react';

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
    if (!count) throw new Error('count property is required');
    if (!page) throw new Error('page property is required');
    if (!onChange) throw new Error('onChange function is required');
    if (typeof onChange !== 'function') throw new Error('onChange must be a function');
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
                { length: page >= boundaryCount ? boundaryCount + 3 : boundaryCount },
                (_, i) => i + (page >= boundaryCount ? page - (boundaryCount - 1) : 1)
            );

            const dotSeparator = page + boundaryCount >= count ? null : '...';

            const lastPortion = Array.from(
                { length: boundaryCount },
                (_, i) => i + (count - (boundaryCount - 1))
            );

            return [...new Set([...firstPortion, dotSeparator, ...lastPortion])].filter(
                (e) => e && (e <= count || e === '...')
            );
        }

        return Array.from({ length: count }, (_, i) => i + 1);
    }, [count, page, boundaryCount]);

    return (
        <div className="_s_pagination_btn_wrapper">
            {/* First page button ----Start---- */}
            {!hideFirstButton && <button
                onClick={firstPageHandler}
                disabled={page <= 1}
            >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M24 0v24H0V0h24z" opacity=".87"></path><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"></path></svg>
            </button>}
            {/* First page button ----End---- */}

            {/* Previous page button ----Start---- */}
            {!hidePrevButton && <button
                disabled={page <= 1}
                onClick={previousPageHandler}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>}
            {/* Previous page button ----End---- */}


            {/* Go to page button ----Start---- */}
            {paginationArray.map((currentPage) => {
                return (
                    <button
                        className={page === currentPage ? '_s_active_page' : ''}
                        onClick={() => goToPageHandler(currentPage)}
                        key={currentPage}
                    >
                        {currentPage}
                    </button>
                );
            })}
            {/* Go to page button ----End---- */}

            {/* Next page button ----Start---- */}
            {!hideNextButton && <button
                disabled={page >= count}
                onClick={nextPageHandler}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>}
            {/* Next page button ----End---- */}

            {/* Last page button ----Start---- */}
            {!hideLastButton && <button
                disabled={page >= count}
                onClick={lastPageHandler}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" opacity=".87"></path><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z"></path></svg>
            </button>}
            {/* Last page button ----End---- */}

        </div>
    );
}

export default Pagination;
