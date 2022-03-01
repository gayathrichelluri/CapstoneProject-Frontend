import React, {useState} from 'react';
import TabContainer from "../../common/tabContainer/TabContainer";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";

const Home = () => {
    const tabs = ['Doctors', 'Appointments'];
    const tabActions = {
        Doctors: <DoctorList/>,
        Appointments: <Appointment/>
    }

    const [action, setAction] = useState(tabActions[tabs[0]]);
    const setTabAction = (e) => {
        setAction(tabActions[e]);
    }

    return (
        <>
            <TabContainer
                tabs={tabs}
                setAction={setTabAction}
            />
            {action}
        </>
    );
};

export default Home;