import Item from "../Item/Item";
import PropTypes from "prop-types";

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

Items.propTypes = {
    items: PropTypes.array,
    onUpdateItemList: PropTypes.func
}

export default Items;