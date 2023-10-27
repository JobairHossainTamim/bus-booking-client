import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../../components/Helper/axiosInstance';
import { hideLoading, showLoading } from '../../../redux/alertSlice';
import { Modal, Table, message } from 'antd';
import { ApiUrl } from '../../../apis/endpoint';
import { useReactToPrint } from "react-to-print";
import moment from 'moment';
import PageTitle from './../../../components/PageTitle/PageTitle';

const AdminBooking = () => {
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const dispatch = useDispatch();


    const getBookings = async () => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/booking/get-all-bookings`,
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
                setBookings(mappedData);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    };

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
                    <p
                        className="text-md underline"
                        onClick={() => {
                            setSelectedBooking(record);
                            setShowPrintModal(true);
                        }}
                    >
                        Print Ticekt
                    </p>
                </div>
            ),
        },
    ];

    useEffect(() => {
        getBookings();
    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <PageTitle title="Bookings" />
            <div className="mt-2">
                <Table dataSource={bookings} columns={columns} />
            </div>

            {showPrintModal && (
                <Modal
                    title="Print Ticket"
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
                        <p>
                            {selectedBooking.from} - {selectedBooking.to}
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
                            <span>Seat Numbers:</span> <br />
                            {selectedBooking.seats}
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

export default AdminBooking;