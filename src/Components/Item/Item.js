import axios from "axios";
import {useState} from "react";
import UpdateItem from "../UpdateItem/UpdateItem";

function Item({item, onUpdateItemList}) {
    const [isInEditMode, setIsInEditMode] = useState(false);

    const handleCompleteClick = () => {
        axios.patch(`http://localhost:3001/api/items/${item.id}`, {completed: !item.completed})
            .then(() => axios.get("http://localhost:3001/api/items"))
            .then(results => onUpdateItemList(results.data))
    };

    const handleDeleteClick = () => {
        axios.delete(`http://localhost:3001/api/items/${item.id}`)
            .then(() => axios.get("http://localhost:3001/api/items"))
            .then(results => onUpdateItemList(results.data))
    };

    const handleEditClick = () => {
        setIsInEditMode(true)
    };

    const handleUpdateItemList = (newList) => {
      setIsInEditMode(false)
        onUpdateItemList(newList)
    }

    const renderContent = () => item.completed ? <del>{item.content}</del> : item.content

    const renderItemView = () => {
        return (
            <>
                <span>{renderContent()}</span>
                <input type="checkbox" checked={item.completed} onChange={handleCompleteClick}/>
                <button onClick={handleEditClick}>Edit</button>
            </>
        )
    }

    const renderEditView = () => {
        return <UpdateItem item={item} onUpdateItemList={handleUpdateItemList}/>
    }

    return (
        <li>
            {isInEditMode ? renderEditView() : renderItemView()}
            <button onClick={handleDeleteClick}>Delete</button>
        </li>
    )
}

export default Item;