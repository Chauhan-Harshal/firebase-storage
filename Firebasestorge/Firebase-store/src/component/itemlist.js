
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemsAsync,
  deleteItemAsync,
  createItemAsync,
  updateItemAsync,
} from "../features/items/itemsSlice";

const ItemList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  const handleAdd = () => {
    if (newItem) {
      dispatch(createItemAsync({ name: newItem }));
      setNewItem("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItemAsync(id));
  };

  const handleUpdate = (id) => {
    const updatedName = prompt("Enter new name:");
    if (updatedName) {
      dispatch(updateItemAsync({ id, data: { name: updatedName } }));
    }
  };

  return (
    <div>
      <h2>Item List</h2>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add item"
      />
      <button onClick={handleAdd}>Add</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            {item.name}
            <button onClick={() => handleUpdate(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemList;
