import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewProjects from './components/TaskCreation/newProjects';
import AddProj from './components/TaskCreation/AddProj';
import logo from './img/logo.png'
import EditProj from './components/TaskCreation/editProj'
import './App.css'

function App() {

  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  }

  const deleteProject = (index) => {
    const filteredProjects = projects.filter((_, i) => i !== index);
    setProjects(filteredProjects);
  }

  return (
    <Router>
      <div className='container'>
        <div className='imgContainer'>
          <img src={logo} alt="logo" />
        </div>
        <div className='appContainer'>
          <Routes>
            <Route
              path='/'
              element={<NewProjects projects={projects} deleteProject={deleteProject} />}
            />
            <Route
              path='/create-project'
              element={<AddProj addProject={addProject} />}
            />
            <Route
              path='/edit-project/:index'
              element={<EditProj projects={projects} setProjects={setProjects} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
