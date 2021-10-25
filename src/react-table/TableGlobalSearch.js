import { useContext, useState } from 'react';
import { reactTableContext } from './Table';

function TableGlobalSearch() {
    const { queryString, setSearchParams, setPage, searchParams, pageString } =
        useContext(reactTableContext);
    const [inputValue, setInputValue] = useState(searchParams[queryString] || '')

    const globalSearchHandler = (e) => {
        e.preventDefault();

        if (!inputValue?.trim()) return;

        setSearchParams((prevState) => {
            return {
                ...prevState,
                [queryString]: inputValue,
                [pageString]: 1,
            };
        });
        setPage(1);
    };

    const clearSearch = () => {
        setInputValue('')
        setSearchParams((prevState) => {
            delete prevState[queryString];
            return {
                ...prevState,
                [pageString]: 1,
            };
        });
        setPage(1);
    };

    const inputOnChangeHandler = (e) => {
        const value = e.target.value

        if (value.length <= 0 && searchParams[queryString]) clearSearch()
        else setInputValue(value)
    }

    return (
        <>
            <form onSubmit={globalSearchHandler}>
                <div className='_s_global_search_wrapper'>
                    <input
                        type='text'
                        className='_s_global_search_input'
                        value={inputValue}
                        onChange={inputOnChangeHandler}
                        placeholder='Search'
                    />

                    {searchParams[queryString] && (
                        <div className='_s_clear_global_search_wrapper' onClick={clearSearch}>
                            <svg
                                stroke='currentColor'
                                fill='currentColor'
                                strokeWidth='0'
                                viewBox='0 0 512 512'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z'></path>
                            </svg>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
}

export default TableGlobalSearch;
