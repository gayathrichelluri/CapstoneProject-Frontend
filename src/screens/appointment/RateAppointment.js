import React, {useState} from 'react';
import {AppBar, Button, FormControl, FormLabel, TextField, Typography} from "@material-ui/core";
import ReactModal from "react-modal";
import {Rating} from "@material-ui/lab";
import './RateAppointment.css';
import {postRating} from "../../api/ratings";

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

const RateAppointment = ({open, close, appointment}) => {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const onRatingSubmit = async () => {
        if(rating === 0) {
            setMessage("Select a rating!");
            return;
        }

        const response = await postRating({
            data: {
                appointmentId: appointment.appointmentId,
                doctorId: appointment.doctorId,
                rating: rating,
                comments: comments
            },
            accessToken: sessionStorage.getItem('access-token')
        });
        response.data ? setMessage('Submitted Rating successfully!') : alert('Failed in submitting rating!');
    }

    return (
        <ReactModal
            ariaHideApp={open}
            isOpen={true}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <AppBar className={"rating-modal-header"} position={"sticky"}>Rate Appointment</AppBar>
            <div className={'rate-appointment-form'}>
                {/*Comments*/}
                <FormControl className="comments">
                    <FormLabel htmlFor="comments">
                        <Typography variant={'caption'}>Comments</Typography>
                    </FormLabel>
                    <TextField
                        placeholder={''}
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        multiline
                        minRows={2}
                        maxRows={10}
                    />
                </FormControl>

                {/* Rating */}
                <div className={'rating'}>
                    <Typography variant={'caption'}>{`Rating: `}</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        size={'small'}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>

                {setMessage &&  <Typography variant={'caption'} className='message'>{message}</Typography>}
                <Button
                    variant="contained"
                    onClick={onRatingSubmit}
                    color="primary"
                    className={'rating-submit'}
                >
                    <Typography variant={'caption'}>RATE APPOINTMENT</Typography>
                </Button>
            </div>
        </ReactModal>
    );
}

export default RateAppointment;