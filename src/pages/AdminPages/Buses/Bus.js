import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { useDispatch } from 'react-redux';
import BusForm from '../../../components/BusForm/BusForm';
import { Table, message } from 'antd';
import { hideLoading, showLoading } from '../../../redux/alertSlice';
import { ApiUrl } from './../../../apis/endpoint';
import { axiosInstance } from '../../../components/Helper/axiosInstance';


const Bus = () => {
    const dispatch = useDispatch();
    const [showBusForm, setShowBusForm] = useState(false);
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);


    const getBuses = async () => {
        try {

            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/bus/get-all-bus`);
            dispatch(hideLoading());

            if (response.data.success) {
                setBuses(response.data.data)
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    }

    const deleteBus = async (id) => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/bus/delete-bus`, {
                _id: id,
            });
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                getBuses();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getBuses();
    }, []);


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Number",
            dataIndex: "number",
        },
        {
            title: "From",
            dataIndex: "from",
        },
        {
            title: "To",
            dataIndex: "to",
        },
        {
            title: "Journey Date",
            dataIndex: "journeyDate",
            // render: (journeyDate) => moment(journeyDate).format("DD-MM-YYYY")
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <div className="d-flex gap-3">
                    <i
                        className="ri-delete-bin-line"
                        onClick={() => {
                            deleteBus(record._id);
                        }}
                    ></i>
                    <i
                        className="ri-pencil-line"
                        onClick={() => {
                            setSelectedBus(record);
                            setShowBusForm(true);
                        }}
                    ></i>
                </div>
            ),
        },
    ];
    return (
        <div>
            <div>
                <div className="d-flex justify-content-between my-2">
                    <PageTitle title="Buses" />
                    <button className="primary-btn" onClick={() => setShowBusForm(true)} >
                        Add Bus
                    </button>
                </div>

                <Table columns={columns} dataSource={buses.map((bus) => ({ ...bus, key: bus._id }))}
                />

                {showBusForm && (
                    <BusForm
                        showBusForm={showBusForm}
                        setShowBusForm={setShowBusForm}
                        type={selectedBus ? "edit" : "add"}
                        selectedBus={selectedBus}
                        setSelectedBus={setSelectedBus}
                        getData={getBuses}
                    />
                )}


            </div>
        </div>
    );
};

export default Bus;