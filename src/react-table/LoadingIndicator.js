function LoadingIndicator({ data }) {
    return (
        <div className={`_s_table_loading_indicator_wrapper ${data?.length > 0 ? '_s_loading_absolute' : ''}`}>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoadingIndicator
