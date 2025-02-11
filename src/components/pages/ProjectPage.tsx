import { useParams } from "react-router-dom";
import { TaskBoard } from "../tasks/TaskBoard";
import { SearchBar } from "../SearchBar";
import { AddTaskButton } from "../AddTaskButton";
import { useSelector } from "react-redux";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import "../../styles/taskStyles.scss";
import { useEffect } from "react";
import { setCurrentProject } from "../../redux/actions/tasksActions";

export const ProjectPage = () => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const { projectId } = useParams<{ projectId: string }>();
  useEffect(() => {
    //@ts-ignore
    dispatch(setCurrentProject(parseInt(projectId)));
  }, [projectId]);
  const projects = useSelector((state: any) => state.tasks.projects);
  const project = projects?.find((p: any) => p.id === parseInt(projectId || "0", 10));

  if (!project) {
    return (
      <div className="tasks-page">
        <h1 className="tasks-title">Проект не найден</h1>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1 className="tasks-title">Задачи проекта: {project.name}</h1>
        <div className="tasks-actions">
          <SearchBar />
          <AddTaskButton projectId={parseInt(projectId || "0", 10)} />
        </div>
      </header>
      <TaskBoard tasks={project.tasks} projectId={parseInt(projectId || "0", 10)} />
    </div>
  );
};
