import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import CreatorMain from './Pages/CreatorMain';
import WatcherMain from './Pages/WatcherMain';
import ProjectList from './Pages/ProjectList';
import UserList from './Pages/UserList';
import WatcherUsers from './Pages/WatcherUsers';
import GraphData from './Pages/GraphData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="creator_main/:id" element={<CreatorMain />} />
        <Route path="watcher_main/:id" element={<WatcherMain />} />
        <Route path="watcher_users/:id" element={<WatcherUsers />} />
        <Route path="user_list/:id" element={<UserList />} />
        <Route path="project_list/:id" element={<ProjectList />} />
        <Route path="graph_data/:id/:type" element={<GraphData />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
