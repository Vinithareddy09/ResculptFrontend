import React, { useState, useEffect } from 'react';

const MatchingDisplay = () => {
    const [matches, setMatches] = useState([]); // Use any[] or a more specific type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/api/matches/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch matches.');
                }
                return response.json();
            })
            .then(data => {
                setMatches(data);
            })
            .catch((err) => { // Added type annotation here
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleAccept = async (matchId) => { // Added type annotation here
        try {
            const response = await fetch(`http://localhost:3000/api/matches/accept/${matchId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to accept match');
            }
            const updatedMatch = await response.json();

            setMatches(prevMatches =>
                prevMatches.map(match =>
                    match._id === matchId ? { ...match, status: 'accepted' } : match
                )
            );

        } catch (error) { // Added type annotation here
            setError(error.message);
        }
    };

    const handleReject = async (matchId) => { // Added type annotation here
        try {
            const response = await fetch(`http://localhost:3000/api/matches/reject/${matchId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to reject match');
            }
            const updatedMatch = await response.json();
            setMatches(prevMatches =>
                prevMatches.map(match =>
                    match._id === matchId ? { ...match, status: 'rejected' } : match
                )
            );
        } catch (error) { // Added type annotation here
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading matches...</div>;
    }

    if (error) {
        return <div className="container mt-5 alert alert-danger" role="alert">Error: {error}</div>;
    }

    if (matches.length === 0) {
        return <div className="container mt-5">No matches found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Matching Display</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Waste Submission ID</th>
                        <th>Creator ID</th>
                        <th>Waste Type</th>
                        <th>Quantity</th>
                        <th>Creator Expertise</th>
                        <th>Creator Portfolio</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match._id}>
                            <td>{match.wasteSubmissionId ? match.wasteSubmissionId._id : 'N/A'}</td>
                            <td>{match.creatorId ? match.creatorId._id : 'N/A'}</td>
                            <td>{match.wasteSubmissionId ? match.wasteSubmissionId.wasteType : 'N/A'}</td>
                            <td>{match.wasteSubmissionId ? match.wasteSubmissionId.quantity : 'N/A'}</td>
                            <td>{match.creatorId ? match.creatorId.expertise : 'N/A'}</td>
                            <td>{match.creatorId ? match.creatorId.portfolio : 'N/A'}</td>
                            <td>{match.status || 'Pending'}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleAccept(match._id)}
                                        disabled={match.status === 'accepted' || match.status === 'rejected'}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleReject(match._id)}
                                        disabled={match.status === 'accepted' || match.status === 'rejected'}
                                    >
                                        Reject
                                    </button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchingDisplay;
