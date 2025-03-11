import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import CreatorMain from './Pages/CreatorMain';
import WatcherMain from './Pages/WatcherMain';
import CreateProject from './Pages/CreateProject';
import ProjectList from './Pages/ProjectList';
import WatcherUsers from './Pages/WatcherUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="creator_main" element={<CreatorMain />} />
        <Route path="watcher_main" element={<WatcherMain />} />
        <Route path="watcher_users/:id" element={<WatcherUsers />} />
        <Route path="project_list/:id" element={<ProjectList />} />
        <Route path="create_project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
