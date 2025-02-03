// src/components/tasks/SearchBar.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  //@ts-ignore
  TasksActionTypes,
} from "../../../redux/actions/tasksActions";
import { Dispatch } from "redux";
import { FiX } from "react-icons/fi"; // Импортируем иконку "крестик"

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const searchQuery = useSelector((state: any) => state.tasks.searchQuery);

  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Обновляем Redux-состояние при изменении локального состояния
  useEffect(() => {
    dispatch(setSearchQuery(localQuery));
  }, [localQuery, dispatch]);

  // Функция очистки поиска
  const handleClearSearch = () => {
    setLocalQuery(""); // Очищаем локальное состояние
    dispatch(setSearchQuery("")); // Очищаем Redux-состояние
  };

  return (
    <div className="search-bar">
      {/* Поисковая строка с иконкой "крестик" */}
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск по номеру или заголовку..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="search-input"
        />
        {/* Иконка "крестик" показывается только если есть текст в инпуте */}
        {localQuery && (
          <button
            className="clear-search-button"
            onClick={handleClearSearch}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <FiX size={20} color="#6c757d" /> {/* Иконка "крестик" */}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
