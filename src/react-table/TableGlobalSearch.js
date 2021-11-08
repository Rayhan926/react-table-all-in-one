import { useContext, useState } from 'react';
import { reactTableContext } from './Table';

function TableGlobalSearch() {
    const { queryString, setSearchParams, setPage, searchParams, pageString, loading } =
        useContext(reactTableContext);
    const [inputValue, setInputValue] = useState(searchParams[queryString] || '');

    const globalSearchHandler = (e) => {
        e.preventDefault();

        if (!inputValue?.trim()) return;

        setSearchParams((prevState) => {
            if (prevState[queryString] === inputValue) return prevState; // Preventing unwanted network request
            return {
                ...prevState,
                [queryString]: inputValue,
                [pageString]: 1,
            };
        });
        setPage(1);
    };

    const clearSearch = () => {
        setInputValue('');
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
        const value = e.target.value;

        if (value.length <= 0 && searchParams[queryString]) clearSearch();
        else setInputValue(value);
    };

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

                    {loading && searchParams[queryString] ? (
                        <div className='_s_clear_global_search_wrapper loading_search_indicator'>
                            <div class='lds-dual-ring'></div>
                        </div>
                    ) : searchParams[queryString] ? (
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
                    ) : (
                        <button
                            type='submit'
                            className='_s_clear_global_search_wrapper'
                            style={{ border: 'none', outline: 'none' }}
                        >
                            <svg
                                stroke='currentColor'
                                fill='currentColor'
                                strokeWidth='0'
                                viewBox='0 0 512 512'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fill='none'
                                    strokeMiterlimit='10'
                                    strokeWidth='32'
                                    d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                                ></path>
                                <path
                                    fill='none'
                                    strokeLinecap='round'
                                    strokeMiterlimit='10'
                                    strokeWidth='32'
                                    d='M338.29 338.29L448 448'
                                ></path>
                            </svg>
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}

export default TableGlobalSearch;
