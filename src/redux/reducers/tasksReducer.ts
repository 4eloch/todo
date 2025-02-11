import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_SUBTASK,
  EDIT_SUBTASK,
  DELETE_SUBTASK,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_SEARCH_QUERY,
  TOGGLE_TASK_COMPLETION,
  UPDATE_TASK_TIME,
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_CURRENT_PROJECT,
} from "../constants";
import { TasksActionTypes, ITask, IComment, IProject } from "../types/tasksTypes";

interface ITasksState {
  tasks: ITask[];
  projects: IProject[];
  searchQuery: string;
  currentProjectId: number | null;
}

const initialState: ITasksState = {
  tasks: [],
  projects: JSON.parse(localStorage.getItem("projects") || "[]"),
  searchQuery: "",
  currentProjectId: null,
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

    const updatedReplies =
      comment.replies && Array.isArray(comment.replies)
        ? updateComments(comment.replies, commentId, newComment)
        : [];

    return {
      ...comment,
      replies: updatedReplies,
    };
  });
};

const tasksReducer = (state = initialState, action: TasksActionTypes): ITasksState => {
  switch (action.type) {
    case ADD_TASK: {
      const projectIndex = state.currentProjectId;
      if (projectIndex === null) return state;

      const newTask: ITask = {
        ...action.payload,
        id: Date.now(),
        projectId: projectIndex,
      };

      const updatedProjects = state.projects?.map((project) => {
        if (project.id !== projectIndex) return project;

        return {
          ...project,
          tasks: [...project.tasks, newTask],
        };
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case EDIT_TASK: {
      const currentProjectId = state.currentProjectId;
      if (currentProjectId === null) return state;

      const updatedProjects = state.projects?.map((project) => {
        if (project.id !== currentProjectId) return project;

        if (!project.tasks) {
          console.error("Error: project.tasks is undefined for project:", project);
          return project;
        }

        const updatedTasks = project.tasks?.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case DELETE_TASK: {
      const taskId = action.payload;
      const currentProjectId = state.currentProjectId;

      if (currentProjectId === null) return state;

      const updatedProjects = state.projects?.map((project) => {
        if (project.id !== currentProjectId) return project;

        const filteredTasks = project.tasks.filter((task) => task.id !== taskId);

        return {
          ...project,
          tasks: filteredTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case ADD_COMMENT: {
      const { taskId, parentId, comment } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.tasks.some((t) => t.id === taskId));
      if (projectIndex === -1) return state;

      const updatedProjects = state.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const updateComments = (comments: IComment[], commentId?: number): IComment[] => {
          return comments.map((c) => {
            if (commentId && c.id === commentId) {
              return {
                ...c,
                replies: [...c.replies, comment],
              };
            }
            return {
              ...c,
              replies: updateComments(c.replies, parentId),
            };
          });
        };

        const updatedTasks = project.tasks.map((task) => {
          if (task.id !== taskId) return task;

          return {
            ...task,
            comments: parentId
              ? updateComments(task.comments, parentId)
              : [...task.comments, comment],
          };
        });

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case EDIT_COMMENT: {
      const { taskId, commentId, newText } = action.payload;
      const currentProjectId = state.currentProjectId;

      if (currentProjectId === null) return state;

      const updatedProjects = state.projects.map((project) => {
        if (project.id !== currentProjectId) return project;

        const updatedTasks = project.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const updatedComments = updateComments(task.comments, commentId, { text: newText });
          return { ...task, comments: updatedComments };
        });
        return { ...project, tasks: updatedTasks };
      });

      localStorage.setItem("tasks", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case DELETE_COMMENT: {
      const { taskId, projectId, commentId } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = state.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const updateComments = (comments: IComment[]): IComment[] => {
          return comments.map((c) => {
            if (c.id === commentId) {
              if (c.replies.length === 0) {
                return {
                  ...c,
                  isDeleted: true,
                };
              } else {
                return {
                  ...c,
                  text: "Комментарий был удалён",
                  isDeleted: true,
                };
              }
            }
            return {
              ...c,
              replies: updateComments(c.replies),
            };
          });
        };

        const updateTask = (tasks: ITask[]): ITask[] => {
          return tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                comments: updateComments(task.comments),
              };
            }
            return {
              ...task,
              subtasks: updateTask(task.subtasks),
            };
          });
        };

        const updatedTasks = updateTask(project.tasks);

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case SET_SEARCH_QUERY: {
      return { ...state, searchQuery: action.payload };
    }

    case TOGGLE_TASK_COMPLETION: {
      const { taskId, projectId, isCompleted } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = state.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const updateTask = (tasks: ITask[]): ITask[] => {
          return tasks.map((task) => {
            if (task.id === taskId) {
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
            }
            return {
              ...task,
              subtasks: updateTask(task.subtasks),
            };
          });
        };

        const updatedTasks = updateTask(project.tasks);

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case UPDATE_TASK_TIME: {
      const { taskId, timeSpent } = action.payload;
      const updatedTasks = state.tasks?.map((task) =>
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

    case SET_CURRENT_PROJECT: {
      const projectId = action.payload;
      return { ...state, currentProjectId: projectId };
    }

    case ADD_SUBTASK: {
      const { taskId, projectId, subtask } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = state.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const updateTask = (tasks: ITask[]): ITask[] => {
          return tasks.map((task) => {
            if (task.id === taskId) {
              const newSubtask: ITask = {
                ...subtask,
                id: Date.now(),
              };
              return {
                ...task,
                subtasks: [...task.subtasks, newSubtask],
              };
            }
            return {
              ...task,
              subtasks: updateTask(task.subtasks),
            };
          });
        };

        const updatedTasks = updateTask(project.tasks);

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case EDIT_SUBTASK: {
      const { taskId, projectId, subtaskId, subtask } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = state.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const updateTask = (tasks: ITask[]): ITask[] => {
          return tasks.map((task) => {
            if (task.id === taskId) {
              const updatedSubtasks = task.subtasks.map((st) =>
                st.id === subtaskId ? subtask : st
              );
              return {
                ...task,
                subtasks: updatedSubtasks,
              };
            }
            return {
              ...task,
              subtasks: updateTask(task.subtasks),
            };
          });
        };

        const updatedTasks = updateTask(project.tasks);

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    case DELETE_SUBTASK: {
      const { taskId, projectId, subtaskId } = action.payload;
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = state.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const updateTask = (tasks: ITask[]): ITask[] => {
          return tasks.map((task) => {
            if (task.id === taskId) {
              const filteredSubtasks = task.subtasks.filter((st) => st.id !== subtaskId);
              return {
                ...task,
                subtasks: filteredSubtasks,
              };
            }
            return {
              ...task,
              subtasks: updateTask(task.subtasks),
            };
          });
        };

        const updatedTasks = updateTask(project.tasks);

        return {
          ...project,
          tasks: updatedTasks,
        };
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { ...state, projects: updatedProjects };
    }

    default:
      return state;
  }
};

export default tasksReducer;
