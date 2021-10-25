import TableSettings from './table-settings/TableSettings';
import TableGlobalSearch from './TableGlobalSearch';

function TableTopBar() {
    return (
        <div className='_s_table_topbar'>
            {/* Table Title and Subtitle ----Start---- */}
            <div>
                <h3 className='_s_table_title'>React table</h3>
                <p className='_s_table_subtitle'>A powerfull all in one table</p>
            </div>
            {/* Table Title and Subtitle ----Starend---- */}
            {/* Table Global Search and Setting Modal Toggle Button ----Start---- */}
            <div className='_s_topbar_global_search_and_table_setting_wrapper'>
                <TableGlobalSearch />
                <TableSettings />
            </div>
            {/* Table Global Search and Setting Modal Toggle Button ----End---- */}
        </div>
    );
}

export default TableTopBar;
