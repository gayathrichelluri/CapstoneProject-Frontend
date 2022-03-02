import React, {useEffect, useState} from 'react';
import {getDoctors, getSpecialities} from "../../api/doctors";
import {FormControl, InputLabel, NativeSelect} from "@material-ui/core";
import './DoctorList.css';
import DoctorItem from "./DoctorItem";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [showModal, setShowModal] = useState({open: false, render: <></>});
    useEffect(() => {
        (async () => {
            setDoctors(await getDoctors({param: selectedSpeciality}));
        })();
    }, [selectedSpeciality])

    useEffect(() => {
        (async () => {
            setSpecialities(await getSpecialities());
        })();
    }, [])

    const closeModal = () => {
        setShowModal({open: false, render: <></>});
    }

    const onBookAppointmentClick = (doctor) => {
        setShowModal({
            open: true,
            render:
                <BookAppointment
                    open={showModal.open}
                    close={closeModal}
                    doctor={doctor}
                />
        });
    }

    const onViewDetailsClick = (doctor) => {
        setShowModal({
            open: true,
            render:
                <DoctorDetails
                    open={showModal.open}
                    close={closeModal}
                    doctor={doctor}
                />
        });
    }

    return (
        <>
            {!doctors.length ? <div className={'doctor-list-msg'}>Loading...</div> : (
                <div className={'doctor-list-container'}>
                    <FormControl variant="filled" className={'select-form'}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Speciality
                        </InputLabel>
                        <NativeSelect
                            defaultValue={''}
                            inputProps={{
                                name: 'Speciality',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => setSelectedSpeciality(e.target.value)}
                        >
                            {specialities.length &&
                                ['', ...specialities].map((sp, idx) => {
                                    return <option value={sp} key={idx}>{sp}</option>
                                })
                            }
                        </NativeSelect>
                    </FormControl>
                    {doctors.map((doctor, idx) => {
                        return (
                            <DoctorItem
                                doctor={doctor}
                                key={idx}
                                bookAppointmentClick={onBookAppointmentClick}
                                viewDetailsClick={onViewDetailsClick}
                            />
                        )
                    })}
                </div>
            )}
            {showModal.open && showModal.render}
        </>
    );
}

export default DoctorList;