import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProjectsPage from "./components/pages/ProjectsPage";
import TasksPage from "./components/pages/TasksPage";
import "./styles/taskStyles.css";
import "./styles/projectsStyles.scss";
import "./styles/formStyles.scss";
import "./styles/globalStyles.scss";

const App = () => (
  <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" Component={ProjectsPage} />
        <Route path="/tasks/:projectId" Component={TasksPage} />
      </Routes>
    </Router>
  </HelmetProvider>
);

export default App;
