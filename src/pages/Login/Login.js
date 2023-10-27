import { Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../../apis/endpoint';


const Login = () => {

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${ApiUrl}/users/login`, values);

            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem('bus-auth-token', response.data.data)
                window.location.href = "/";
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }




    return (
        <div className='h-screen d-flex justify-content-center align-items-center'>
            <div className='w-400 card p-3'>
                <h1>Bus Booking</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Email' name="email">
                        <Input type='email'></Input>
                    </Form.Item>
                    <Form.Item label='Password' name="password">
                        <Input type='text'></Input>
                    </Form.Item>

                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <Link to='/register'> Click Here To Register </Link>
                        <button className='secondary-btn' type='submit'>Login</button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export default Login;