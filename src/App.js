import TodoCreator from "./Components/TodoCreator/TodoCreator";
import Items from "./Components/Items/Items";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [items, setItems] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/api/items")
            .then(results => setItems(results.data) && setIsInitialRender(false))
    }, [isInitialRender])

    const handleUpdateItemList = (newItemsList) => {
        setItems(newItemsList)
    };

    return (
        <div>
            <TodoCreator onUpdateItemList={handleUpdateItemList}/>
            <Items items={items} onUpdateItemList={handleUpdateItemList}/>
        </div>
    );
}

export default App;
