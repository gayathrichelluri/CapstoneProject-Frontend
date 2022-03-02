import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import {
    AppBar,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    NativeSelect,
    TextField, Typography
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './BookAppointment.css';
import {getDoctorTimeslots} from "../../api/doctors";
import {postAppointments} from "../../api/appointment";
import {getUser} from "../../api/users";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        width: '50%'
    },
};

const BookAppointment = ({open, close, doctor}) => {
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date());
    const [timeslot, setTimeslot] = useState('None');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [doctorTimeslots, setDoctorTimeslots] = useState([]);
    const [user, setUser] = useState('');

    const formattedDate = (d) => {
        let month = d.getMonth() + 1;
        let date = d.getDate();
        if(month > 0 && month < 10) month = '0' + month;
        if(date > 0 && date < 10) date = '0' + date;

        return `${d.getFullYear()}-${month}-${date}`
    }

    useEffect(() => {
        (async () => {
            setDoctorTimeslots(await getDoctorTimeslots(
                doctor.id,
                formattedDate(date)
            ));
            if(!sessionStorage.getItem('access-token'))
                setMessage('Please login to book an appointment!');
            else {
                setUser(await getUser(
                    sessionStorage.getItem('uuid'),
                    sessionStorage.getItem('access-token')
                ));
            }
        })();
    }, [date, doctor.id]);

    const onBookingSubmit = async () => {
        if(timeslot === 'None') {
            setMessage("Timeslot should not be none!");
            return;
        }

        const response = await postAppointments({
            data: {
                doctorId: doctor.id,
                doctorName: `${doctor.firstName} ${doctor.lastName}`,
                userId: user.emailId,
                userName: user.firstName,
                userEmailId: user.emailId,
                timeSlot: timeslot,
                appointmentDate: formattedDate(date),
                status: 'Open',
                symptoms: symptoms,
                priorMedicalHistory: medicalHistory === '' ? 'NA' : medicalHistory
            },
            accessToken: sessionStorage.getItem('access-token')
        });
        response.data ? setMessage('Booked an appointment successfully!') : alert('Either the slot is already booked or not available.');
    }

    return (
        <ReactModal
            ariaHideApp={open}
            isOpen={true}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <AppBar className={"booking-modal-header"} position={"sticky"}>Book an Appointment</AppBar>
            <div className='booking-form'>
                <div className='booking-form-fields'>
                    {/*Doctor Name*/}
                    <FormControl required className="booking-form-control">
                        <InputLabel htmlFor="doctorName">
                            Doctor Name
                        </InputLabel>
                        <Input
                            id="doctorName"
                            value={`${doctor.firstName} ${doctor.lastName}`}
                            disabled={true}
                        />
                    </FormControl>

                    {/* Date Picker */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            format="dd/MM/yyyy"
                            label="Date Picker"
                            variant="inline"
                            value={date}
                            onChange={(d)=>setDate(d)}
                            required={true}
                        />
                    </MuiPickersUtilsProvider>

                    {/* timeslot */}
                    <FormControl required variant="filled" className={'booking-timeslot'}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Timeslot
                        </InputLabel>
                        <NativeSelect
                            defaultValue={'None'}
                            inputProps={{
                                name: 'Timeslot',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => setTimeslot(e.target.value)}
                        >
                            {
                                ['None', ...doctorTimeslots].map((t, idx) => {
                                    return <option value={t} key={idx}>{t}</option>
                                })
                            }
                        </NativeSelect>
                    </FormControl>

                    {/*Medical history*/}
                    <FormControl className="booking-medical-history">
                        <FormLabel htmlFor="medical-history">
                            <Typography variant={'caption'}>Medical History</Typography>
                        </FormLabel>
                        <TextField
                            placeholder={''}
                            id="medical-history"
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                            multiline
                            minRows={2}
                            maxRows={10}
                        />
                    </FormControl>

                    {/*Symptoms*/}
                    <FormControl className="booking-symptoms">
                        <FormLabel htmlFor="symptoms">
                            <Typography variant={'caption'}>Symptoms</Typography>
                        </FormLabel>
                        <TextField
                            placeholder={''}
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            multiline
                            minRows={2}
                            maxRows={10}
                        />
                    </FormControl>

                    {setMessage && <div className='message'>{message}</div>}
                    <Button
                        variant="contained"
                        onClick={onBookingSubmit}
                        color="primary"
                        className={'booking-submit'}
                    >
                        BOOK APPOINTMENT
                    </Button>
                </div>
            </div>
        </ReactModal>
    );
}

export default BookAppointment;