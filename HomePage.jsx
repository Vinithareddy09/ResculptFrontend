import React from 'react';

const HomePage = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to ReSculpt</h1>
                <p className="lead">A Decentralized Waste Management System</p>
                <hr className="my-4" />
                <p>
                    ReSculpt is a platform that leverages blockchain technology to
                    bring transparency and efficiency to the waste management process.
                </p>
                <a className="btn btn-primary btn-lg" href="#" role="button">
                    Learn More
                </a>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h2>For Waste Contributors</h2>
                    <p>Submit your waste details and get rewards.</p>
                </div>
                <div className="col-md-4">
                    <h2>For Creators</h2>
                    <p>Find waste materials for your creations and contribute to a circular economy.</p>
                </div>
                <div className="col-md-4">
                    <h2>Our Mission</h2>
                    <p>
                        To create a sustainable ecosystem by connecting waste contributors with
                        creators, powered by blockchain.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
