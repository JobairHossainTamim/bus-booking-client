import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import axios from "axios";
import { ApiUrl } from "../../apis/endpoint";
import { setUser } from "../../redux/userSlice";
import { message } from "antd";
import DefaultLayout from "../DefaultLayout/DefaultLayout";




function ProtectedRoute({ children }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();




    const validateToken = async () => {
        try {

            dispatch(showLoading());
            const response = await axios.post(`${ApiUrl}/users/get-user-by-id`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("bus-auth-token")}`,
                },
            })
            dispatch(hideLoading());

            if (response.data.success) {
                dispatch(setUser(response.data.data));
            }
            else {
                localStorage.removeItem("bus-auth-token");
                message.error(response.data.message);
                navigate("/login");
            }




        } catch (error) {
            dispatch(hideLoading());
            localStorage.removeItem("bus-auth-token");
            message.error(error.message);
            navigate("/login");
        }

    }


    useEffect(() => {
        if (localStorage.getItem("bus-auth-token")) {
            validateToken();
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (window.location.pathname.includes("admin")) {
            if (!user?.isAdmin) {
                message.error("You are not authorized to access this page");
                window.location.href = "/";
            }
        }
    }, [user]);


    return (
        <div>{user !== null && <DefaultLayout>{children}</DefaultLayout>}</div>
    );
}

export default ProtectedRoute;