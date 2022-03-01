import React, {useEffect, useState} from 'react';
import {getDoctors, getSpecialities} from "../../api/doctors";
import {FormControl, InputLabel, NativeSelect} from "@material-ui/core";
import './DoctorList.css';
import DoctorItem from "./DoctorItem";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
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

    return (
        <>
            {!doctors.length ? <div>Loading!</div> : (
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
                            />
                        )
                    })}
                </div>
            )}
        </>
    );
}

export default DoctorList;