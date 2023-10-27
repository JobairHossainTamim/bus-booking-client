import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { axiosInstance } from '../../components/Helper/axiosInstance';
import { ApiUrl } from '../../apis/endpoint';
import { Button, Col, Row, message } from 'antd';
import { useParams } from 'react-router-dom';
import SeatSelection from '../../components/SeatSelection/SeatSelection';
import StripeCheckout from 'react-stripe-checkout';


const BookNow = () => {
    const dispatch = useDispatch();
    const [bus, setBus] = useState([]);
    const params = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const getBuses = async () => {
        try {

            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/bus/get-bus-by-id`, {
                _id: params.id
            });
            dispatch(hideLoading());

            if (response.data.success) {
                setBus(response.data.data)
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    }

    const bookNow = async (transactionId) => {
        try {
            dispatch(showLoading());

            const response = await axiosInstance.post(`${ApiUrl}/booking/book-seat`, {
                bus: bus._id,
                seats: selectedSeats,
                transactionId,

            });
            dispatch(hideLoading());
            if (response.data.success) {
                message.success('Set Booking Successfully');
            }
            else {
                message.error(response.data.message);
            }


        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    }


    const onToken = async (token) => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/booking/make-payment`, {
                token,
                amount: bus.fare * selectedSeats.length * 100, // Convert to the smallest unit (cents)
                currency: "BDT",
            });

            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                bookNow(response.data.data.transactionId);
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getBuses();
    }, []);

    const seats = bus?.seatsBooked || [];
    const flattenedSeats = seats.flat(Infinity);
    const seatsLeft = bus.capacity - flattenedSeats.length;
    return (
        <div>
            {
                bus && (
                    <Row className='mt-3' gutter={[30, 30]}>
                        <Col lg={12} xs={24} sm={24}>
                            <h1 className='text-lg text-secondary'><b>Bus Name : {bus.name}</b></h1>
                            <h1 className='text-md text-secondary'> 🚌 From : {bus.from}  - {bus.to}</h1>
                            <hr></hr>

                            <div className="flex flex-col gap-2">
                                <p className="text-md">
                                    Journey Date : {bus.journeyDate}
                                </p>
                                <p className="text-md">
                                    Fare : $ {bus.fare} /-
                                </p>
                                <p className="text-md">
                                    Departure Time : {bus.departure}
                                </p>
                                <p className="text-md">
                                    Arrival Time : {bus.arrival}
                                </p>
                                <p className="text-md">
                                    Capacity : {bus.capacity}
                                </p>
                                <p className="text-md">
                                    Seats Left :{seatsLeft}
                                </p>

                            </div>
                            <hr />

                            <hr />

                            <div>
                                <h1 className='text-lg'><b>Selected Seats </b>:{selectedSeats.join(" , ")} </h1>
                                <hr />
                                <h1 className='text-lg'>Total Cost : <b>{bus.fare * selectedSeats.length} $</b></h1>
                                <hr />
                                <StripeCheckout
                                    billingAddress
                                    amount={bus.fare * selectedSeats.length * 100}
                                    currency="BDT"
                                    token={onToken}
                                    stripeKey='pk_test_51Jw1j8CSilcYhWQ0gDnh9NCm6QS7bE8l5wjE7z3vBYEGDOg8trCg4kIH50hAm436BT6N6IismyjFq4P9bKJj7Rc500oKnuXDYw'
                                >
                                    <Button onClick={bookNow} className={`primary-btn ${selectedSeats.length === 0 && "disabled-btn"
                                        }`}
                                        disabled={selectedSeats.length === 0}>Book Now</Button>
                                </StripeCheckout>
                                {/*  */}
                            </div>
                        </Col>
                        {/* Seats  */}
                        <Col lg={12} xs={12} sm={12}>
                            <SeatSelection
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                bus={bus} />
                        </Col>

                    </Row>
                )
            }
        </div>
    );
};

export default BookNow;