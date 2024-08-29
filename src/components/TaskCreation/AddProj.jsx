import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from 'moment';
import './AddProj.css'
import './AddProjDesktop.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";



function AddProj({ addProject }) {
    const navigate = useNavigate();



    const [projName, setProjName] = useState("");
    const [description, setDescription] = useState("");
    const [manager, setManager] = useState("");
    const [assigned, setAssigned] = useState("");
    const [status, setStatus] = useState("");


    const hundleSubmit = () => {
        const newProject = {
            projName,
            description,
            manager,
            assigned,
            status,
            creationDate: moment().format('lll')
        };

        addProject(newProject);

        navigate('/');
    };


    const isFormValid = projName && description && manager && assigned && status;




    return (
        <div className="containerAdd">
            <div className="headerAdd">
                <button className="buttonBack" onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                <h2>Add project</h2>
            </div>

            <div className="inputContainer">
                <h4 className="titleInput">Project name</h4>
                <div className="input">
                    <input
                        className="insideInput"
                        id="projName"
                        type="text"
                        onChange={(e) => setProjName(e.target.value)}
                    />
                </div>



                <h4 className="titleInput">Description</h4>
                <div className="input">
                    <input
                        className="insideInput"
                        type="text"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <h4 className="titleInput">Project manager</h4>
                <div className="input">
                    <select
                        className="insideInput"
                        name=""
                        id="manager"
                        onChange={(e) => setManager(e.target.value)}
                    >
                        <option value="" hidden>
                            Select a person
                        </option>
                        <option value="james">James Harrington</option>
                        <option value="ethan">Ethan Mitchell</option>
                        <option value="robert">Robert Caldwell</option>
                    </select>
                </div>

                <h4 className="titleInput">Assigned to</h4>
                <div className="input">
                    <select
                        className="insideInput"
                        name=""
                        id="assigned"
                        onChange={(e) => setAssigned(e.target.value)}
                    >
                        <option value="" hidden>
                            Select a person
                        </option>
                        <option value="daniel">Daniel Carter</option>
                        <option value="alex">Alex Reed</option>
                        <option value="emma">Emma Collins</option>
                    </select>
                </div>

                <h4 className="titleInput">Status</h4>
                <div className="input">
                    <select
                        className="insideInput"
                        name=""
                        id="status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="" hidden>
                            Select status
                        </option>
                        <option value="Enabled"> Enabled</option>
                        <option value="Disabled"> Disabled</option>
                    </select>
                </div>
                <br />
                <button id="buttonCreate" onClick={hundleSubmit} disabled={!isFormValid}>Create project</button>
            </div>

        </div>
    );

}

export default AddProj;