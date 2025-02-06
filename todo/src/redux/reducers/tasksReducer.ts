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
  ADD_PROJECT,
  DELETE_PROJECT,
} from "../constants";
import { TasksActionTypes, ITask, IComment } from "../types/tasksTypes";

interface ITasksState {
  projects: any;
  tasks: ITask[];
  searchQuery: string;
}

const initialState: ITasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  searchQuery: "",
  projects: undefined,
};

const updateComments = (
  comments: IComment[],
  commentId: number,
  newComment?: Partial<IComment>
): IComment[] => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      if (newComment) {
        return { ...comment, ...newComment };
      }
      return { ...comment, isDeleted: true };
    }

    return {
      ...comment,
      replies: updateComments(comment.replies, commentId, newComment),
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

        if (parentId) {
          return {
            ...task,
            comments: updateComments(task.comments, parentId, comment),
          };
        }

        return {
          ...task,
          comments: [...task.comments, comment],
        };
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    }

    case EDIT_COMMENT: {
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
      return { ...state, searchQuery: action.payload };
    }

    case TOGGLE_TASK_COMPLETION: {
      const { taskId, isCompleted } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        const newStatus = isCompleted
          ? "Done"
          : task.status === "Done"
            ? "Development"
            : task.status;

        return {
          ...task,
          isCompleted,
          status: newStatus,
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

    case ADD_PROJECT: {
      const newProjects = [...state.projects, action.payload];
      localStorage.setItem("projects", JSON.stringify(newProjects));
      return { ...state, projects: newProjects };
    }

    case DELETE_PROJECT: {
      const filteredProjects = state.projects.filter(
        (project: any) => project.id !== action.payload
      );
      localStorage.setItem("projects", JSON.stringify(filteredProjects));
      return { ...state, projects: filteredProjects };
    }

    default:
      return state;
  }
};

export default tasksReducer;
