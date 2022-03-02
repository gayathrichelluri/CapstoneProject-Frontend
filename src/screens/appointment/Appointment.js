import React, {useEffect, useState} from 'react';
import './Appointment.css';
import {getUserAppointments} from "../../api/users";
import {Button, Paper, Typography} from "@material-ui/core";
import RateAppointment from "./RateAppointment";

const Appointment = () => {
    const accessToken = sessionStorage.getItem('access-token');
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState(<></>);

    useEffect(() => {
        (async () => {
            !!accessToken && setAppointments(await getUserAppointments({
                id: sessionStorage.getItem('uuid'),
                accessToken
            }));
        })();
    }, [accessToken])

    const onRateAppointmentClick = (appointment) => {
        setAction(<RateAppointment open={true} close={closeModal} appointment={appointment}/>)
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            {!!accessToken ?
                <div>
                    <div className={'appointments-list'}>
                        {!appointments.length ? <div className={'appointment-login-msg'}>No appointments!</div> :
                            appointments.map((appointment, idx) =>
                            <Paper className={'appointment-item'} key={idx}>
                                <Typography variant={'body1'}>{`Dr: ${appointment.doctorName}`}</Typography>
                                <Typography variant={'body2'}>{`Date: ${appointment.appointmentDate}`}</Typography>
                                <Typography variant={'body2'}>{`Symptoms: ${appointment.symptoms}`}</Typography>
                                <Typography variant={'body2'}>{`Prior medical history: ${appointment.priorMedicalHistory}`}</Typography>
                                <Button
                                    className={'rate-appointment'}
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={() => onRateAppointmentClick(appointment)}
                                >
                                    <Typography variant={'caption'}>Rate Appointment</Typography>
                                </Button>
                            </Paper>
                        )}
                    </div>
                    {showModal && action}
                </div>
                : <div className={'appointment-login-msg'}> Login to see appointments </div>
            }
        </>
    );
}

export default Appointment;