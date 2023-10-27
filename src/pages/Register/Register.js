import React from 'react';
import { Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from './../../apis/endpoint';

const Register = () => {

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${ApiUrl}/users/register`, values)

            if (response.success) {
                message.success(response.data.message)
            }
            else {
                message.success(response.data.message)
            }

        } catch (error) {
            message.error(error.message)
        }
    }


    return (
        <div className='h-screen d-flex justify-content-center align-items-center'>
            <div className='w-400 card p-3'>
                <h1>Bus Booking </h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name="name">
                        <Input type='text'></Input>
                    </Form.Item>
                    <Form.Item label='Email' name="email">
                        <Input type='email'></Input>
                    </Form.Item>
                    <Form.Item label='Password' name="password">
                        <Input type='text'></Input>
                    </Form.Item>

                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <Link to='/login'> Click Here To Login </Link>
                        <button className='secondary-btn' type='submit'>Register</button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export default Register;