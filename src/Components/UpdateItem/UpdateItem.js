import {useState} from "react";
import {patch, get} from "axios";

function UpdateItem({item, onUpdateItemList}) {
    const [input, setInput] = useState(item.content);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleSaveClick = () => {
        patch(`http://localhost:3001/api/items/${item.id}`, {content: input})
            .then(() => get("http://localhost:3001/api/items"))
            .then(results => onUpdateItemList(results.data))
    };

    return <>
            <input value={input} onChange={handleInputChange}/>
            <button onClick={handleSaveClick}>Save</button>
        </>
}

export default UpdateItem;