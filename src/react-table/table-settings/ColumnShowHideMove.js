import { arrayMoveImmutable } from 'array-move';
import { useContext, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { reactTableContext } from '../Table';

function ColumnShowHideMove() {
    const { allColumns, setColumnOrder } = useContext(reactTableContext);
    const columnIds = allColumns.map(column => column.id)
    const [items, setItems] = useState(columnIds)

    const sortEndHandler = ({ oldIndex, newIndex }) => {
        setItems(prevItems => {
            const newColumnOrder = arrayMoveImmutable(prevItems, oldIndex, newIndex)
            console.log(newColumnOrder);
            setColumnOrder(newColumnOrder)
            return newColumnOrder
        });
    }

    return (
        <div style={{ padding: "6px 0" }}>
            <SortableList
                axis="y"
                lockAxis="y"
                items={items}
                allColumns={allColumns}
                onSortEnd={sortEndHandler}
                useDragHandle
            />
        </div>
    )
}

export default ColumnShowHideMove




const DragHandle = SortableHandle(() => (
    <div className="_s_drag_handler">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></svg>
    </div>
));

const SortableItem = SortableElement(({ column }) => {
    return (
        <div className="_s_column_show_hide_list">
            <label tabIndex={0}>
                <input {...column.getToggleHiddenProps()} type='checkbox' />
                <p>{column.Header}</p>
            </label>
            <DragHandle />
        </div>
    )
});



const SortableList = SortableContainer(({ items, allColumns }) => {
    const columns = items.map((item) => allColumns.filter(column => column.id === item)[0]);
    return (
        <div>
            {
                columns.map((column, index) => items.includes(column.id) &&
                    <SortableItem key={index} index={index} column={column} />)
            }
        </div>
    );
});