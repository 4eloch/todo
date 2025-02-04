import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_SEARCH_QUERY,
  TOGGLE_TASK_COMPLETION,
  UPDATE_TASK_TIME,
} from "../constants";
import { TasksActionTypes, ITask, IComment } from "../types/tasksTypes";

interface ITasksState {
  tasks: ITask[];
  searchQuery: string;
}

const initialState: ITasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  searchQuery: "",
};

const updateComments = (
  comments: IComment[],
  commentId: number,
  newComment?: Partial<IComment>
): IComment[] => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      if (newComment) {
        return { ...comment, ...newComment }; // Обновляем комментарий
      }
      return { ...comment, isDeleted: true }; // Помечаем комментарий как удаленный
    }

    return {
      ...comment,
      replies: updateComments(comment.replies, commentId, newComment), // Рекурсивно проверяем дочерние комментарии
    };
  });
};

const tasksReducer = (
  state = initialState,
  action: TasksActionTypes
): ITasksState => {
  switch (action.type) {
    case ADD_TASK:
      const newTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

    case EDIT_TASK: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case DELETE_TASK:
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };

    case ADD_COMMENT: {
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

    case "EDIT_COMMENT": {
      const { taskId, commentId, newText } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        return {
          ...task,
          comments: updateComments(task.comments, commentId, { text: newText }),
        };
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case DELETE_COMMENT: {
      const { taskId, commentId } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        return {
          ...task,
          comments: updateComments(task.comments, commentId),
        };
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case SET_SEARCH_QUERY: {
      return { ...state, searchQuery: action.payload }; // Обновляем поисковый запрос
    }

    case TOGGLE_TASK_COMPLETION: {
      const { taskId, isCompleted } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        // Определяем новый статус задачи
        const newStatus = isCompleted
          ? "Done"
          : task.status === "Done"
            ? "Development"
            : task.status;

        return {
          ...task,
          isCompleted,
          status: newStatus, // Обновляем статус задачи
        };
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case UPDATE_TASK_TIME: {
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
