import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare"
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash"
import './newProjMobile.css'
import './newProjDesktop.css'

//imagenes manager
import jamesImage from '../../img/James.jpg';
import ethanImage from '../../img/Ethan.jpg';
import robertImage from '../../img/Robert.jpg';

//imagenes asignados
import danielImage from '../../img/Daniel.jpg';
import alexImage from '../../img/Alex.jpg';
import emmaImage from '../../img/Emma.jpg';


function NewProjects({ projects, deleteProject }) {
    const navigate = useNavigate();

    const [editIndex, setEditIndex] = useState(null);

    const handleEdit = (index) => {
        setEditIndex(editIndex === index ? null : index);
    };

    const handleNavigateEdit = (index) => {
        navigate(`/edit-project/${index}`);
    };


    const handleDelete = (index) => {
        const confirmed = window.confirm("Estás seguro de borrar éste proyecto?");
        if (confirmed) {
            deleteProject(index);
        }
    };


    const mangerImages = {
        james: jamesImage,
        ethan: ethanImage,
        robert: robertImage,
    };

    const assignedImages = {
        daniel: danielImage,
        alex: alexImage,
        emma: emmaImage,
    };

    const managerNames = {
        james: "James Harrington",
        ethan: "Ethan Mitchell",
        robert: "Robert Caldwell"
    };

    const assignedNames = {
        daniel: "Daniel Carter",
        alex: "Alex Reed",
        emma: "Emma Collins"
    };
    return (
        <div className="container">
            <div className="header">
                <h2>My projects</h2>
                <button className="addProj" onClick={() => navigate('create-project')}><FontAwesomeIcon icon={faPlus} className="" /> Add project</button>
            </div>

            <div className="infoHeaders">
                <p className="projectInfo">Project info</p>
                <p className="projectMan">Project Manager</p>
                <p className="assignedTitle">Assigned To</p>
                <p className="status">Status</p>
                <p className="action">Action</p>
            </div>

            <ul className="projectsList">
                {projects.map((project, index) => (
                    <li className="proj" key={index}>


                        <div className="nameProject">
                            <h2>{project.projName}</h2>
                            {project.creationDate && <p>Creation date: {project.creationDate}</p>}
                        </div>


                        <div className="managerCont">
                            <img src={mangerImages[project.manager]} alt={project.manager} className="profilePicManager" />
                            <p>{managerNames[project.manager]}</p></div>

                        <div className="assignedCont">
                            <img src={assignedImages[project.assigned]} alt={project.assigned} className="profilePicAssigned" />
                            <p>{assignedNames[project.assigned]}</p>
                        </div>

                        <div className="statusView">
                            <p>{project.status}</p>
                        </div>
                        <div className="contButton">
                            <button
                                className="points"
                                onClick={() => handleEdit(index)}
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            {editIndex === index && (
                                <div className="pointsOption">
                                    <button
                                        className="buttonEdit"
                                        onClick={() => handleNavigateEdit(index)}
                                    > <FontAwesomeIcon icon={faPenToSquare} className="faPenToSquare" />Edit</button>
                                    <button
                                        className="buttonDelete"
                                        onClick={() => handleDelete(index)}
                                    > <FontAwesomeIcon icon={faTrash} className="faTrash" />Delete</button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>


    );
}

export default NewProjects;