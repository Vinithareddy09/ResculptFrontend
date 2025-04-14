import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import WasteSubmissionForm from './WasteSubmissionForm.jsx';
import CreatorProfile from './CreatorProfile.jsx';
import MatchingDisplay from './MatchingDisplay.jsx';
import CarbonCreditDisplay from './CarbonCreditDisplay.jsx';
import RewardsDisplay from './RewardsDisplay.jsx';
import BlockChainDisplay from './BlockChainDisplay.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">ReSculpt</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/waste-upload" className="nav-link">Waste Upload</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/creator-profile" className="nav-link">Creator Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/matching" className="nav-link">Matching</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/carbon-credits" className="nav-link">Carbon Credits</Link>
                            </li>
                            <li className="nav-item">
                                 <Link to="/rewards" className="nav-link">Rewards</Link>
                            </li>
                            <li className="nav-item">
                                 <Link to="/blockchain" className="nav-link">Blockchain</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="py-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/waste-upload" element={<WasteSubmissionForm />} />
                        <Route path="/creator-profile" element={<CreatorProfile />} />
                        <Route path="/matching" element={<MatchingDisplay />} />
                        <Route path="/carbon-credits" element={<CarbonCreditDisplay />} />
                         <Route path="/rewards" element={<RewardsDisplay />} />
                         <Route path="/blockchain" element={<BlockChainDisplay />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
