import React, { useState, useEffect } from 'react';

const RewardsDisplay = () => {
    const [userId, setUserId] = useState('');
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            setError(null);
            fetch(`http://localhost:3000/api/rewards/nfts/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch NFTs.');
                    }
                    return response.json();
                })
                .then(data => {
                    setNfts(data.nfts);
                })
                .catch((err) => {
                    setError(err.message);
                    setNfts([]);
                })
                .finally(() => setLoading(false));
        }
    }, [userId]);

      const handleSearch = () => {

    }

    return (
        <div className="container mt-5">
            <h1>Your Rewards (NFTs)</h1>
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
                    {loading ? 'Loading...' : 'Check NFTs'}
                </button>
            </div>

            {loading && <p>Loading NFTs...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {nfts.length > 0 ? (
                <div className="row">
                    {nfts.map((nft) => (
                        <div key={nft.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">NFT ID: {nft.id}</h5>
                                    <p className="card-text">Type: {nft.type}</p>
                                    <p className="card-text">Description: {nft.description}</p>
                                    <p className="card-text">Awarded: {new Date(nft.awardedTimestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>No NFTs awarded to this user.</p>
            )}
        </div>
    );
};

export default RewardsDisplay;
