import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/actions/tasksActions";
import { TasksActionTypes } from "../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { FiX } from "react-icons/fi";

const SearchBar = () => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const searchQuery = useSelector((state: any) => state.tasks.searchQuery);

  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    dispatch(setSearchQuery(localQuery));
  }, [localQuery, dispatch]);

  const handleClearSearch = () => {
    setLocalQuery("");
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск по номеру или заголовку..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="search-input"
        />
        {localQuery && (
          <button
            className="clear-search-button"
            onClick={handleClearSearch}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <FiX size={20} color="#6c757d" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
