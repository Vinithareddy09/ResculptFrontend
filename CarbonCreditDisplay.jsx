import React, { useState, useEffect } from 'react';

const CarbonCreditDisplay = () => {
    const [userId, setUserId] = useState('');
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            setError(null);
            fetch(`http://localhost:3000/api/carbon-credits/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch carbon credit balance.');
                    }
                    return response.json();
                })
                .then(data => {
                    setBalance(data.balance);
                })
                .catch((err) => { // Added type annotation here
                    setError(err.message);
                    setBalance(null);
                })
                .finally(() => setLoading(false));
        }
    }, [userId]); // userId is the dependency

    const handleSearch = () => {
        // Trigger useEffect.  The useEffect hook will run whenever userId changes.
    }

    return (
        <div className="container mt-5">
            <h1>Carbon Credit Balance</h1>
            <div className="mb-4">
                <label htmlFor="userId" className="mr-2">Enter User ID:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    className='form-control w-auto d-inline-block'
                />
                <button onClick={handleSearch} disabled={loading} className='btn btn-primary ml-2'>
                    {loading ? 'Loading...' : 'Check Balance'}
                </button>
            </div>

            {loading && <p>Loading carbon credit balance...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {balance !== null && (
                <div className="alert alert-success" role="alert">
                    <p>
                        Carbon Credit Balance for User {userId}: <strong>{balance}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default CarbonCreditDisplay;
