import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../redux/alertSlice';
import { axiosInstance } from '../../../components/Helper/axiosInstance';
import { Table, message } from 'antd';
import { ApiUrl } from '../../../apis/endpoint';
import PageTitle from './../../../components/PageTitle/PageTitle';

const AdminUser = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post(`${ApiUrl}/users/get-all-users`, {});
            dispatch(hideLoading());
            if (response.data.success) {
                setUsers(response.data.data);
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
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "",
            render: (data) => {
                return data.isBlocked ? "Blocked" : "Active";
            },
        },
        {
            title: "Role",
            dataIndex: "",
            render: (data) => {
                console.log(data);
                if (data?.isAdmin) {
                    return "Admin";
                } else {
                    return "User";
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <div className="d-flex gap-3">
                    {record?.isBlocked && (
                        <p
                            className="underline"
                            onClick={() => updateUserPermissions(record, "unblock")}
                        >
                            UnBlock
                        </p>
                    )}
                    {!record?.isBlocked && (
                        <p
                            className="underline"
                            onClick={() => updateUserPermissions(record, "block")}
                        >
                            Block
                        </p>
                    )}
                    {record?.isAdmin && (
                        <p
                            className="underline"
                            onClick={() => updateUserPermissions(record, "remove-admin")}
                        >
                            Remove Admin
                        </p>
                    )}
                    {!record?.isAdmin && (
                        <p
                            className="underline"
                            onClick={() => updateUserPermissions(record, "make-admin")}
                        >
                            Make Admin
                        </p>
                    )}
                </div>
            ),
        },
    ];
    const updateUserPermissions = async (user, action) => {
        try {
            let payload = null;
            if (action === "make-admin") {
                payload = {
                    ...user,
                    isAdmin: true,
                };
            } else if (action === "remove-admin") {
                payload = {
                    ...user,
                    isAdmin: false,
                };
            } else if (action === "block") {
                payload = {
                    ...user,
                    isBlocked: true,
                };
            } else if (action === "unblock") {
                payload = {
                    ...user,
                    isBlocked: false,
                };
            }

            dispatch(showLoading());
            const response = await axiosInstance.post(
                `${ApiUrl}/users/update-user-permissions`,
                payload
            );
            dispatch(hideLoading());
            if (response.data.success) {
                getUsers();
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div>
            <div>
                <div className="d-flex justify-content-between my-2">
                    <PageTitle title="Users" />
                </div>

                <Table columns={columns} dataSource={users} />
            </div>

        </div>
    );
};

export default AdminUser;