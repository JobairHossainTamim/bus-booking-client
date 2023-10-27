import React, { useState } from 'react';
import "./Layout.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    const [collapsed, setCollapsed] = useState(false);

    const userMenu = [
        {
            name: "Home",
            icon: "ri-home-line",
            path: "/",
        },
        {
            name: "Bookings",
            icon: "ri-file-list-line",
            path: "/bookings",
        },
        {
            name: "Profile",
            icon: "ri-user-line",
            path: "/profile",
        },
        {
            name: "About",
            path: "/about",
            icon: "ri-information-line"
        },
        {
            name: "Logout",
            icon: "ri-logout-box-line",
            path: "/logout",
        },
    ];
    const adminMenu = [

        {
            name: "Home",
            path: "/admin/bus",
            icon: "ri-bus-line"
        },
        {
            name: "Users",
            path: "/admin/user",
            icon: "ri-user-line"
        },
        {
            name: "Bookings",
            path: "/admin/booking",
            icon: "ri-bookmark-line"
        },
        {
            name: "About",
            path: "/about",
            icon: "ri-information-line"
        },
        {
            name: 'Logout',
            path: "/logout",
            icon: "ri-logout-box-line"
        }
    ];

    let activeRoute = window.location.pathname;

    if (window.location.pathname.includes('book-now')) {
        activeRoute = "/";
    }


    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
    return (
        <div>
            <div className='layout-parent'>
                <div className='sidebar'>
                    <div className="sidebar-header">
                        <h3 className="logo">Bus</h3>
                        <h4 className="role"> <br />Role : {user?.isAdmin ? 'Admin' : 'User'}</h4>
                        <p className="role">{user?.name}</p>
                    </div>
                    {/* menu */}
                    <div className="d-flex flex-column gap-3 justify-content-start menu">
                        {menuToBeRendered.map((item, index) => {
                            return (
                                <div key={index}
                                    className={`${activeRoute === item.path && "active-menu-item"
                                        } menu-item`}
                                >
                                    <i onClick={() => {
                                        if (item.path === "/logout") {
                                            localStorage.removeItem("bus-auth-token");
                                            navigate("/login");
                                        } else {
                                            navigate(item.path);
                                        }
                                    }} className={item.icon}></i>
                                    {!collapsed && (
                                        <span
                                            onClick={() => {
                                                if (item.path === "/logout") {
                                                    localStorage.removeItem("bus-auth-token");
                                                    navigate("/login");
                                                } else {
                                                    navigate(item.path);
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='body'>
                    <div className='header'>

                        {collapsed ? (
                            <i
                                className="ri-menu-2-fill"
                                onClick={() => setCollapsed(!collapsed)}
                            ></i>
                        ) : (
                            <i
                                className="ri-close-line"
                                onClick={() => setCollapsed(!collapsed)}
                            ></i>
                        )}





                    </div>
                    <div className='content'>
                        {children}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DefaultLayout;