import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import './newProjMobile.css';
import './newProjDesktop.css';

//modal
import Modal from './Modal/Modal';

// imágenes manager
import jamesImage from '../../img/James.jpg';
import ethanImage from '../../img/Ethan.jpg';
import robertImage from '../../img/Robert.jpg';

// imágenes asignados
import danielImage from '../../img/Daniel.jpg';
import alexImage from '../../img/Alex.jpg';
import emmaImage from '../../img/Emma.jpg';

function NewProjects({ projects, deleteProject, currentPage, setCurrentPage }) {

    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const navigate = useNavigate();

    const [editIndex, setEditIndex] = useState(null);
    const menuRef = useRef(null);


    const itemsPerPage = 6;

    useEffect(() => {
        function handleClickOutside(event) {

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setEditIndex(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleEdit = (index) => {
        setEditIndex(editIndex === index ? null : index);
    };

    const handleNavigateEdit = (index) => {
        navigate(`/edit-project/${index}`);
    };

    const confirmDelete = () => {
        deleteProject(deleteIndex);
        setShowModal(false);
        setDeleteIndex(null);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setDeleteIndex(null);
    };

    const promptDelete = (index) => {
        setDeleteIndex(index);
        setShowModal(true);
    };

    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };



    const managerImages = {
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
        robert: "Robert Caldwell",
    };

    const assignedNames = {
        daniel: "Daniel Carter",
        alex: "Alex Reed",
        emma: "Emma Collins",
    };


    return (
        <div className="widthContainer">
            <div className="containerProjects">
                <div className="header">
                    <h2>My projects</h2>
                    <button className="addProj" onClick={() => navigate('create-project')}>
                        <FontAwesomeIcon icon={faPlus} /> Add project
                    </button>
                </div>

                <table className="projectsTable">
                    <thead>
                        <tr>
                            <th className="textLeft">Project info</th>
                            <th className="textLeft">Project Manager</th>
                            <th className="textLeft">Assigned To</th>
                            <th className="textLeft">Status</th>
                            <th className="textCenter">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProjects.map((project, i) => {
                            const realIndex = startIndex + i;
                            return (
                                <tr key={realIndex}>
                                    <td>
                                        <div className="nameProject">
                                            <h3>{project.projName}</h3>
                                            {project.creationDate && <p>{project.creationDate}</p>}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="managerCont">
                                            <div className="imgContainer">
                                                <img src={managerImages[project.manager]} alt={project.manager} className="profilePicManager" />
                                            </div>
                                            <p>{managerNames[project.manager]}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="assignedCont">
                                            <div className="imgContainer">
                                                <img src={assignedImages[project.assigned]} alt={project.assigned} className="profilePicAssigned" />
                                            </div>
                                            <p>{assignedNames[project.assigned]}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="statusView">
                                            <p>{project.status}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contButton">
                                            <button
                                                className="points"
                                                onClick={() => handleEdit(realIndex)}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </button>
                                            {editIndex === realIndex && (
                                                <div className="pointsOption" ref={menuRef}>
                                                    <div className="relativeContainer">
                                                        <button
                                                            className="buttonEdit"
                                                            onClick={() => handleNavigateEdit(realIndex)}
                                                        >
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </button>
                                                        <button
                                                            className="buttonDelete"
                                                            onClick={() => promptDelete(realIndex)}

                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {window.innerWidth <= 767 && currentProjects.map((project, i) => {
                    const realIndex = startIndex + i;
                    return (
                        <div key={realIndex} className="projectCardMobile">
                            <div className="cardHeader">
                                <h3>{project.projName}</h3>
                                <p className="creationDate">{project.creationDate}</p>
                            </div>

                            <div className="cardDetails">
                                <p><strong>Manager:</strong> {managerNames[project.manager]}</p>
                                <p><strong>Assigned:</strong> {assignedNames[project.assigned]}</p>
                                <p><strong>Status:</strong> {project.status}</p>
                            </div>

                            <div className="cardActions">
                                <button onClick={() => handleNavigateEdit(realIndex)}>Edit</button>
                                <button onClick={() => promptDelete(realIndex)}>Delete</button>
                            </div>
                        </div>
                    );
                })}
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    {/* {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "activePage" : ""}
                            onClick={() => goToPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))} */}

                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>

            </div>
            {showModal && (
                <Modal
                    message="¿Estás seguro de eliminar este proyecto?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}

export default NewProjects;
