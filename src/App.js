import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import CreatorMain from './Pages/CreatorMain';
import WatcherMain from './Pages/WatcherMain';
import CreateProject from './Pages/CreateProject';
import ProjectList from './Pages/ProjectList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="creator_main" element={<CreatorMain />} />
        <Route path="watcher_main" element={<WatcherMain />} />
        <Route path="project_list" element={<ProjectList />} />
        <Route path="create_project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
