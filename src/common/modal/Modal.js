import React, {useState} from 'react';
import {AppBar} from "@material-ui/core";
import ReactModal from 'react-modal';
import './Modal.css';
import TabContainer from "../tabContainer/TabContainer";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0
    },
};

export const Modal = ({open, close, title, tabs, tabActions}) => {
    const [action, setAction] = useState(tabActions[tabs[0]]);

    const setTabAction = (e) => {
       setAction(tabActions[e]);
    }

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={open}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <AppBar className={"modal-header"} position={"sticky"}>{title}</AppBar>
            <div className={"modal-tabs"}>
               <TabContainer
                   tabs={tabs}
                   setAction={setTabAction}
                   tabIndicatorColor={'red'}
               />
            </div>
            {action}
        </ReactModal>
    );
}

export default Modal;