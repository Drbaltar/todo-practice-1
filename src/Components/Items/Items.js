import Item from "../Item/Item";

function Items({items, onUpdateItemList}) {
    function renderItemsList() {
        return items.map(item => {
            return <Item key={item.id} item={item} onUpdateItemList={onUpdateItemList}/>
        });
    }

    return(
        <ul>{renderItemsList()}</ul>
    )
}

export default Items;