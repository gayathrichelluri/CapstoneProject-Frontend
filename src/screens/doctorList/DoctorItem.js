import React from 'react';
import {Button, Paper, Typography} from "@material-ui/core";
import './DoctorItem.css'
import {Rating} from "@material-ui/lab";

const DoctorItem = ({doctor, bookAppointmentClick, viewDetailsClick}) => {
    return (
        <Paper className={'doctor-item'}>
            <Typography variant={'body1'} style={{marginBottom: '15px'}}>{`Doctor Name : ${doctor.firstName} ${doctor.lastName}`}</Typography>
            <Typography variant={'body2'}>{`Speciality : ${doctor.speciality}`}</Typography>
            <div className={'doctor-rating'}>
                <Typography variant={'body2'}>{`Rating : `}</Typography>
                <Rating name="read-only" value={doctor.rating} size={'small'} readOnly />
            </div>
            <div className={'doctor-item-buttons'}>
                <Button
                    className={'button-book-appointment'}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => bookAppointmentClick(doctor)}
                >
                    <Typography variant={'caption'}>Book Appointment</Typography>
                </Button>
                <Button
                    className={'button-view-details'}
                    variant={"contained"}
                    onClick={() => viewDetailsClick(doctor)}
                >
                    <Typography variant={'caption'}>View Details</Typography>
                </Button>
            </div>
        </Paper>
    );
}

export default DoctorItem;