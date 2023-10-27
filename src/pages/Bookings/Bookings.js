import React, { useEffect, useRef, useState } from 'react';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { axiosInstance } from '../../components/Helper/axiosInstance';
import { ApiUrl } from '../../apis/endpoint';
import { useDispatch } from 'react-redux';
import { Modal, Table, message } from 'antd';
import PageTitle from './../../components/PageTitle/PageTitle';
import moment from "moment";
import { useReactToPrint } from 'react-to-print';

const Bookings = () => {

    const [booking, setBooking] = useState([]);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const dispatch = useDispatch();

    const getBookings = async () => {
        try {

            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/booking/get-booking-by-user-id`,
                {});
            dispatch(hideLoading());

            if (response.data.success) {

                const mappedData = response.data.data.map((booking) => {
                    return {
                        ...booking,
                        ...booking.bus,
                        key: booking._id,
                    };
                });
                setBooking(mappedData)
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }

    }

    useEffect(() => {
        getBookings();
    }, []);
    // PrintTickets

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const columns = [
        {
            title: "Bus Name",
            dataIndex: "name",
            key: "bus",
        },
        {
            title: "Bus Number",
            dataIndex: "number",
            key: "bus",
        },
        {
            title: "Journey Date",
            dataIndex: "journeyDate",
        },
        {
            title: "Journey Time",
            dataIndex: "departure",
        },
        {
            title: "Seats",
            dataIndex: "seats",
            render: (seats) => {
                return seats.join(", ");
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div>
                    <p className="text-md underline"
                        onClick={() => {
                            setSelectedBooking(record);
                            setShowPrintModal(true);
                        }}>
                        Print Ticket
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageTitle title="Bookings" />
            <div className="mt-2">
                <Table dataSource={booking} columns={columns} />
            </div>
            {showPrintModal && (
                <Modal title="Print Ticket"
                    onCancel={() => {
                        setShowPrintModal(false);
                        setSelectedBooking(null);
                    }}
                    open={showPrintModal}
                    okText="Print"
                    onOk={handlePrint}
                >

                    <div className="d-flex flex-column p-5" ref={componentRef}>
                        <p>Bus : {selectedBooking.name}</p>
                        <p>Bus Number: {selectedBooking.number}</p>
                        <p>
                            Journey Place:   {selectedBooking.from} - {selectedBooking.to}
                        </p>
                        <hr />
                        <p>
                            <span>Journey Date:</span>{" "}
                            {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
                        </p>
                        <p>
                            <span>Journey Time:</span> {selectedBooking.departure}
                        </p>
                        <hr />
                        <p>
                            <span>Seat Numbers:</span>
                            <br />
                            {`${selectedBooking.seats}`}
                        </p>
                        <hr />
                        <p>
                            <span>Total Amount:</span>{" "}
                            {selectedBooking.fare * selectedBooking.seats.length} /-
                        </p>
                    </div>
                </Modal>
            )}

        </div>
    );
};

export default Bookings;