import { useContext, useRef, useState } from 'react';
import { reactTableContext } from './Table';

function TableGlobalSearch() {
    const { queryString, setSearchParams, setPage, searchParams, pageString, loading } =
        useContext(reactTableContext);
    const [inputValue, setInputValue] = useState(searchParams[queryString] || '');

    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const globalInputRef = useRef(null);

    const closeMobileSearch = () => {
        setInputValue('');
        setShowMobileSearch(false);
    };

    const globalSearchHandler = (e) => {
        e.preventDefault();
        setShowMobileSearch(true);
        setTimeout(() => {
            globalInputRef.current.focus();
        }, 100);

        if (!inputValue?.trim()) return;
        closeMobileSearch();

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
            <div
                className={`_s_global_search_container ${
                    showMobileSearch ? '_s_show_mobile_search_modal' : ''
                }`}
            >
                <form onSubmit={globalSearchHandler}>
                    <div className='_s_global_search_wrapper'>
                        {/* Close Search Modal -- Visible in mobile */}
                        <div className='_s_close_search_modal' onClick={closeMobileSearch}>
                            <svg
                                stroke='currentColor'
                                fill='currentColor'
                                strokeWidth='0'
                                viewBox='0 0 16 16'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fill-rule='evenodd'
                                    clip-rule='evenodd'
                                    d='M7 3.093l-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z'
                                ></path>
                            </svg>
                        </div>
                        {/* Close Search Modal -- Visible in mobile */}
                        <input
                            ref={globalInputRef}
                            type='text'
                            className='_s_global_search_input'
                            value={inputValue}
                            onChange={inputOnChangeHandler}
                            placeholder='Search'
                        />

                        <div>
                            {loading && searchParams[queryString] ? (
                                <div className='_s_clear_global_search_wrapper loading_search_indicator'>
                                    <div className='lds-dual-ring'></div>
                                </div>
                            ) : searchParams[queryString] ? (
                                <div
                                    className='_s_clear_global_search_wrapper'
                                    onClick={clearSearch}
                                >
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
                    </div>
                </form>
            </div>
        </>
    );
}

export default TableGlobalSearch;
