import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewProjects from './components/TaskCreation/newProjects';
import AddProj from './components/TaskCreation/AddProj';
import EditProj from './components/TaskCreation/editProj';
import './App.css';

function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });

  // 🆕 Estado global del paginado
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("lastPage");
    return savedPage ? Number(savedPage) : 1;
  });

  // Actualiza los proyectos en localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const deleteProject = (index) => {
    const filteredProjects = projects.filter((_, i) => i !== index);
    setProjects(filteredProjects);
  };

  return (
    <Router>
      <div className='container'>
        <div className='appContainer'>
          <Routes>
            <Route
              path='/'
              element={
                <NewProjects
                  projects={projects}
                  deleteProject={deleteProject}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              }
            />
            <Route
              path='/create-project'
              element={
                <AddProj
                  addProject={addProject}
                  currentPage={currentPage}
                />
              }
            />
            <Route
              path='/edit-project/:index'
              element={
                <EditProj
                  projects={projects}
                  setProjects={setProjects}
                  currentPage={currentPage}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;