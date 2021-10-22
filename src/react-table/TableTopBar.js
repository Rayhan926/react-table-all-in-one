import TableSettings from "./table-settings/TableSettings";
import TableGlobalSearch from "./TableGlobalSearch";

function TableTopBar() {
  return (
    <div style={{ display: "flex" }}>
      <TableGlobalSearch />
      <TableSettings />
    </div>
  );
}

export default TableTopBar;
