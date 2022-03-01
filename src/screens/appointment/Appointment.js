import React from 'react';

const Appointment = () => {
    const isLoggedIn = !!sessionStorage.getItem('access-token');
    return (
        <>
            {isLoggedIn
                ? <div>
                    Appointments list!!!
                </div>
                : <div> Login to see appointments </div>
            }
        </>
    );
}

export default Appointment;