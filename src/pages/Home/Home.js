import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { axiosInstance } from '../../components/Helper/axiosInstance';
import { ApiUrl } from '../../apis/endpoint';
import { Col, Row, message } from 'antd';
import Buses from '../../components/Buses/Buses';
import axios from "axios";
const Home = () => {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);

    // Initialize the filters state with default values
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        journeyDate: "",
    });

    // Define the onChange handlers for each input field
    const handleFromChange = (e) => {
        setFilters({ ...filters, from: e.target.value });
    };

    const handleToChange = (e) => {
        setFilters({ ...filters, to: e.target.value });
    };

    const handleDateChange = (e) => {
        setFilters({ ...filters, journeyDate: e.target.value });
    };

    const clearFilters = () => {
        setFilters({
            from: "",
            to: "",
            journeyDate: "",
        });
    };

    const getBuses = async () => {
        try {
            const tempFilters = {};
            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    tempFilters[key] = filters[key];
                }
            });

            dispatch(showLoading());
            const response = await axios.post(`${ApiUrl}/bus/get-bus-filter`, { tempFilters }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("bus-auth-token")}`,
                },
            });
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

    useEffect(() => {
        getBuses();
    }, []);

    return (
        <div>

            <div className="my-3 py-1">
                <Row gutter={10} align="center">
                    <Col lg={6} sm={24}>
                        <input
                            type="text"
                            placeholder="From"
                            value={filters.from}
                            onChange={handleFromChange}
                        />
                    </Col>
                    <Col lg={6} sm={24}>
                        <input
                            type="text"
                            placeholder="To"
                            value={filters.to}
                            onChange={handleToChange}
                        />
                    </Col>
                    <Col lg={6} sm={24}>
                        <input
                            type="date"
                            placeholder="Date"
                            value={filters.journeyDate}
                            onChange={handleDateChange}
                        />
                    </Col>
                    <Col lg={6} sm={24}>
                        <div className="d-flex gap-2">
                            <button className="primary-btn" onClick={getBuses}>
                                Filter
                            </button>
                            <button className="outlined px-3" onClick={clearFilters}>
                                Clear
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <Row gutter={[15, 15]}>
                    {
                        buses
                            .filter((bus) => bus.status === "Yet To Start")
                            .map((bus) => {
                                return <Col lg={12} xs={24} sm={24} key={bus._id} >
                                    <Buses bus={bus}></Buses>
                                </Col>
                            })
                    }
                </Row>
            </div>
        </div>
    );
};

export default Home;