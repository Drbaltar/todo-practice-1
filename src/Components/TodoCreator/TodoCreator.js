import {useState} from "react";
import axios from "axios";

function TodoCreator({onUpdateItemList}) {
    const [userInput, setUserInput] = useState('');

    const handleChange = (e) => setUserInput(e.target.value);

    const handleClick = () => {
        axios.post("http://localhost:3001/api/items", {content: userInput})
            .then(() => axios.get("http://localhost:3001/api/items"))
            .then(results => onUpdateItemList(results.data))
            .then(setUserInput(''))
    };

    return (
        <div>
            <label htmlFor="new-todo-input">Input New To-Do Item</label>
            <input id="new-todo-input" value={userInput} onChange={handleChange}/>
            <button onClick={handleClick}>Add Item</button>
        </div>
    );
}

export default TodoCreator;