import { Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { axiosInstance } from '../Helper/axiosInstance';
import { ApiUrl } from '../../apis/endpoint';




const BusForm = ({
    showBusForm,
    setShowBusForm,
    type = "add",
    getData,
    selectedBus,
    setSelectedBus,
}) => {

    const dispatch = useDispatch();


    const onFinish = async (values) => {
        try {

            dispatch(showLoading());
            let response = null;




            if (type === "add") {
                response = await axiosInstance.post(`${ApiUrl}/bus/add-bus`, values);
            }
            else {
                response = await axiosInstance.post(`${ApiUrl}/bus/update-bus`, {
                    ...values,
                    _id: selectedBus._id,
                });
            }

            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
            getData();
            setShowBusForm(false);
            setSelectedBus(null);
            dispatch(hideLoading());


        } catch (error) {
            message.error(error.message);
            dispatch(hideLoading());
        }
    }
    return (
        <div>
            <Modal
                width={800}
                title={type === "add" ? "Add Bus" : "Update Bus"}
                open={showBusForm}
                onCancel={() => {
                    setSelectedBus(null);
                    setShowBusForm(false);
                }}
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>


                    <Row gutter={[10, 10]}>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Bus Name" name="name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Bus Number" name="number">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Capacity" name="capacity">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col lg={12} xs={24}>
                            <Form.Item label="From" name="from">
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="To" name="to">
                                <Input></Input>
                            </Form.Item>
                        </Col>

                        {/* date and time */}
                        <Col lg={8} xs={24}>
                            <Form.Item label="Journey Date" name="journeyDate">
                                <Input type='date'></Input>
                            </Form.Item>

                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Departure" name="departure">
                                <Input type='time'></Input>
                            </Form.Item>
                        </Col>

                        <Col lg={8} xs={24}>
                            <Form.Item label="Arrival" name="arrival">
                                <Input type='time'></Input>
                            </Form.Item>
                        </Col>


                        <Col lg={12} xs={24}>
                            <Form.Item label="Type" name="type" initialValue="Non-AC">
                                <Select >
                                    <Select.Option value="AC">AC</Select.Option>
                                    <Select.Option value="Non-AC">Non-AC</Select.Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Fare" name="fare">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col lg={12} xs={24}>
                            <Form.Item label="Status" name="status" initialValue="Yet To Start">
                                <Select>
                                    <Select.Option value="Yet To Start">Yet To Start</Select.Option>
                                    <Select.Option value="Running">Running</Select.Option>
                                    <Select.Option value="Completed">Completed</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end">
                        <button className="primary-btn mt-1" type="submit">
                            Save
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default BusForm;