import React, {useState} from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import ReactModal from 'react-modal';
import './Modal.css';

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
    const [tab, setTab] = useState({value: 0, action: tabActions[tabs[0]]});

    const onTabChange = (event, value) => {
        setTab({value, action: tabActions[tabs[value]]})
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
                <Tabs
                    value={tab.value}
                    onChange={onTabChange}
                    indicatorColor="primary"
                    variant="fullWidth"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: 'red',
                        }
                    }}

                >
                    {tabs.map((tab, idx) => <Tab key={idx} label={tab} /> )}
                </Tabs>
            </div>
            {tabActions[tabs[tab.value]]}
        </ReactModal>
    );
}

export default Modal;