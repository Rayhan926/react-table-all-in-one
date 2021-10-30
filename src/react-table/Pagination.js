import { useMemo } from 'react';

function Pagination({
    count = 5,
    boundaryCount = 1,
    siblingCount = 1,
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

    function range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    const arrayRange = function (from, to, dotLast, dotFirst) {
        if (from > to || typeof from !== 'number' || typeof to !== 'number') return []
        const newArray = []
        for (let i = from; i <= to; i++) {
            newArray.push(i)
        }
        // dotFirst && newArray.shift('...')
        // dotLast && newArray.push('...')
        return newArray
    }

    const last = (arr) => arr[arr.length - 1]

    // const paginationArray = useMemo(() => {
    //     if (count > 7) {
    //         const siblingSQ = siblingCount + siblingCount
    //         const firstPortionLength = 2 + boundaryCount + siblingSQ
    //         const middlePortionLength = siblingSQ + 1
    //         const firstPortion = Array.from({ length: page >= firstPortionLength ? siblingSQ : firstPortionLength }, (_, i) => i + 1);

    //         const middlePortion = (page >= firstPortionLength && page + siblingSQ + 2 < count) ?
    //             [
    //                 '...',
    //                 page - 1,
    //                 page,
    //                 page + 1,
    //                 '...'
    //             ] : ['...'];
    //         // range((count - page) + siblingSQ, page - 1)

    //         const lastPortion =
    //             (page + siblingSQ + 2 < count) ?
    //                 Array.from({ length: boundaryCount }, (_, i) => count - (boundaryCount - (i + 1))) :
    //                 page + siblingSQ + 2 >= count ?
    //                     range(
    //                         count - (siblingSQ + boundaryCount + boundaryCount),
    //                         (count - (siblingSQ + boundaryCount + boundaryCount) + 1)
    //                     ) : []

    //         return [...firstPortion, ...middlePortion, ...lastPortion]
    //     }

    //     return Array.from({ length: count }, (_, i) => i + 1)
    // }, [count, boundaryCount, siblingCount, page])

    const paginationArray = useMemo(() => {
        const startPage = 1; // Start Page
        const startPageSQ = startPage + startPage
        const siblingSQ = siblingCount + siblingCount
        const boundarySQ = boundaryCount + boundaryCount
        const firstPortionLength = siblingSQ + boundaryCount + startPageSQ


        let firstPortion = arrayRange(
            startPage,
            firstPortionLength <= count ? firstPortionLength : count,
            true
        )

        const f = page + siblingCount >= firstPortion.length + 1

        if (f) {
            firstPortion = arrayRange(startPage, boundaryCount)
        }


        let middlePortion = f ?
            arrayRange(page - siblingCount, page + siblingCount) :
            []

        let lastPortion = firstPortion.length < count ? arrayRange(
            (count + 1) - boundaryCount,
            count
        ) : []

        if (last(firstPortion) + 2 <= lastPortion[0]) {
            firstPortion.push('...')
        }

        const lastOfMiddle = last(middlePortion)
        if (lastOfMiddle + 2 <= lastPortion[0]) {
            middlePortion.push('...')
        }

        if (lastOfMiddle + 2 >= lastPortion[0]) {
            middlePortion = []
            lastPortion = arrayRange(count - (siblingSQ + boundarySQ), count)
        }


        return [...firstPortion, ...middlePortion, ...lastPortion]
    }, [count, boundaryCount, siblingCount, page])

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
            {paginationArray.map((currentPage, i) => {
                if (!currentPage) return null;
                // if (currentPage === '...') return currentPage
                return (
                    <button
                        className={page === currentPage ? '_s_active_page' : ''}
                        onClick={() => goToPageHandler(currentPage)}
                        key={i}
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
