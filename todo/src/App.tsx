import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MainPage } from "./components/pages/MainPage";
import { ProjectPage } from "./components/pages/ProjectPage";
import "./styles/taskStyles.css";
import "./styles/projectsStyles.scss";
import "./styles/formStyles.scss";
import "./styles/globalStyles.scss";

const App = () => (
  <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/project/:projectId" Component={ProjectPage} />
      </Routes>
    </Router>
  </HelmetProvider>
);

export default App;
