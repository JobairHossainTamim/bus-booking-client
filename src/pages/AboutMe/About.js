import React from 'react';
import './About.css';
import banner from '../../assets/banner.jpg';
import banner2 from '../../assets/1668912885725.jfif';
import { Link } from 'react-router-dom';
const About = () => {
    return (
        <div className='p-4'>
            <h2><b>Bus Booking Application</b></h2>

            <p>Building a bus booking application from scratch can be a complex and rewarding project. </p>
            <h6 className='mt-3'>Developed a full-stack bus booking web application from inception to deployment, focusing on creating a seamless user experience and robust functionality. Key achievements and responsibilities include:</h6>

            <ul>

                <li>
                    Architecture & Framework: Built the application using Node.js and Express.js, with MongoDB as the database.
                </li>
                <li>
                    Database Management: Designed complex MongoDB schemas and models to efficiently store and retrieve bus schedules, user data, and booking details.
                </li>
                <li>
                    User Interfaces: Created user-friendly interfaces using the Ant Design library, distinguishing between user and admin experiences.
                </li>
                <li>
                    Security: Implemented JWT authentication to safeguard user routes and employed password hashing for enhanced security.
                </li>
                <li>
                    State Management: Utilized Redux Toolkit for efficient state management, with a specific focus on real-time seat availability and booking updates.
                </li>
                <li>
                    Seat Availability: Developed a feature for real-time seat availability checks, preventing overbooking.
                </li>
                <li>
                    Payment Integration: Integrated the Stripe payment gateway for secure online transactions.
                </li>
                <li>
                    Payment Integration: Integrated the Stripe payment gateway for secure online transactions.
                </li>
                <li>Admin Panel: Designed an admin panel to manage buses, schedules, bookings, and user data, including CRUD functionalities.</li>
            </ul>

            <div className=''>

                <div className="container  ">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className="card">
                                <img className="card-img-top" src={banner} alt="Bologna" />
                                <div className="card-body text-center">
                                    <h4 className="card-title">Mohammed Jobair .</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">MERN Stack Developer</h6>
                                    <p className="card-text">Driven by self-motivation and a strong work ethic, I aspire to excel in a career where I can leverage my disciplined approach and positive outlook on life. My proficiency spans across various technologies including <b>JavaScript, ES6, React, Node.js, Express.js, and more,</b>  enabling me to contribute effectively and add value to dynamic projects. </p>

                                    <Link target="_blank" rel="noopener noreferrer" to="https://jobair-hossain.netlify.app/">Get More Info Please Contact ME</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default About;