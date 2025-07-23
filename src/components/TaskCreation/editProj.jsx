import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddProj.css'
import './AddProjDesktop.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

function EditProj({ projects, setProjects, currentPage }) {
    const { index } = useParams();
    const navigate = useNavigate();

    const [projName, setProjName] = useState("");
    const [description, setDescription] = useState("");
    const [manager, setManager] = useState("");
    const [assigned, setAssigned] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const project = projects[index];
        if (project) {
            setProjName(project.projName);
            setDescription(project.description || "");
            setManager(project.manager || "");
            setAssigned(project.assigned || "");
            setStatus(project.status || "");
        }
    }, [index, projects]);

    const handleSave = () => {
        const updatedProject = {
            projName,
            description,
            manager,
            assigned,
            status,
            creationDate: projects[index].creationDate
        };

        const updatedProjects = [...projects];
        updatedProjects[index] = updatedProject;

        // 🛠️ Guardar en localStorage directamente
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);

        // 🆕 Guardar página actual
        localStorage.setItem("lastPage", currentPage);

        navigate('/');
    };

    return (
        <div className="containerAddWidth">
            <div className="containerAdd">
                <div className="headerAdd">
                    <button className="buttonBack" onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                    <h2>Edit project</h2>
                </div>

                <div className="inputContainer">
                    <div className="nameInput">
                        <h4 className='titleInput'>Project name</h4>
                        <div className="input">
                            <input
                                className='insideInput'
                                type="text"
                                value={projName}
                                onChange={(e) => setProjName(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className="nameInput">
                        <h4 className='titleInput'>Description</h4>
                        <div className="input">
                            <input
                                className='insideInput'
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className="nameInput">
                        <h4 className='titleInput'>Project manager</h4>
                        <div className="input">
                            <select
                                className='insideInput'
                                value={manager}
                                onChange={(e) => setManager(e.target.value)}
                            >
                                <option value="james">James Harrington</option>
                                <option value="ethan">Ethan Mitchell</option>
                                <option value="robert">Robert Caldwell</option>
                            </select>
                        </div>
                    </div>


                    <div className="nameInput">
                        <h4 className='titleInput'>Assigned to</h4>
                        <div className="input">
                            <select
                                className='insideInput'
                                value={assigned}
                                onChange={(e) => setAssigned(e.target.value)}
                            >
                                <option value="daniel">Daniel Carter</option>
                                <option value="alex">Alex Reed</option>
                                <option value="emma">Emma Collins</option>
                            </select>
                        </div>
                    </div>


                    <div className="nameInput">
                        <h4 className='titleInput'>Status</h4>
                        <div className="input">
                            <select
                                className='insideInput'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>
                    </div>

                    <div className="buttonContainerProject">
                        <button id='buttonCreate' onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProj;


