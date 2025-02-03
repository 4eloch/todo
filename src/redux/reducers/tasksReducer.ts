import { TasksActionTypes, Task, Comment } from "../types/tasksTypes";

interface TasksState {
  tasks: Task[];
  searchQuery: string;
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  searchQuery: "",
};

const updateComments = (
  comments: Comment[],
  parentId: number,
  newReply: Comment
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...comment.replies, newReply], // Добавляем новый ответ
      };
    }

    // Если родительский комментарий находится глубже, продолжаем рекурсию
    return {
      ...comment,
      replies: updateComments(comment.replies, parentId, newReply),
    };
  });
};

const tasksReducer = (
  state = initialState,
  action: TasksActionTypes
): TasksState => {
  switch (action.type) {
    case "ADD_TASK":
      const newTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

    case "EDIT_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case "DELETE_TASK":
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };

    case "ADD_COMMENT": {
      const { taskId, parentId, comment } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        // Если parentId указан, добавляем комментарий как ответ
        if (parentId) {
          return {
            ...task,
            comments: updateComments(task.comments, parentId, comment),
          };
        }

        // Если parentId не указан, добавляем комментарий в основной список
        return {
          ...task,
          comments: [...task.comments, comment],
        };
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case "SET_SEARCH_QUERY": {
      return { ...state, searchQuery: action.payload }; // Обновляем поисковый запрос
    }

    case "TOGGLE_TASK_COMPLETION": {
      const { taskId, isCompleted } = action.payload;

      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case "UPDATE_TASK_TIME": {
      const { taskId, timeSpent } = action.payload;

      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, timeSpent } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
};

export default tasksReducer;
