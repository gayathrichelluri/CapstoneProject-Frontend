import React from 'react';
import ReactModal from 'react-modal';
import {
    AppBar, Typography,
} from "@material-ui/core";
import './DoctorDetails.css';
import {Rating} from "@material-ui/lab";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        width: '25%'
    },
};

const DoctorDetails = ({open, close, doctor}) => {
    return (
        <ReactModal
            ariaHideApp={open}
            isOpen={true}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <AppBar className={"modal-header"} position={"sticky"}>Doctor Details</AppBar>
            <div className={'doctor-details'}>
                <Typography variant={'body1'}>{`Dr: ${doctor.firstName} ${doctor.lastName}`}</Typography>
                <Typography variant={'body2'}>{`Total Experience: ${doctor.totalYearsOfExp} years`}</Typography>
                <Typography variant={'body2'}>{`Speciality: ${doctor.speciality}`}</Typography>
                <Typography variant={'body2'}>{`Date of Birth: ${doctor.dob}`}</Typography>
                <Typography variant={'body2'}>{`City: ${doctor.address?.city}`}</Typography>
                <Typography variant={'body2'}>{`Email: ${doctor.emailId}`}</Typography>
                <Typography variant={'body2'}>{`Mobile: ${doctor.mobile}`}</Typography>
                <div className={'doctor-rating'}>
                    <Typography variant={'body2'}>{`Rating: `}</Typography>
                    <Rating name="read-only" value={doctor.rating} size={'small'} readOnly />
                </div>
            </div>

        </ReactModal>
    );
}

export default DoctorDetails;