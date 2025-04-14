import React, { useState } from 'react';

const BlockChainDisplay = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [associatedWasteSubmissionIds, setAssociatedWasteSubmissionIds] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [blockchainData, setBlockchainData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMintNFT = async () => {
        setLoading(true);
        setError('');
        setBlockchainData(null);
        try {
            const response = await fetch('http://localhost:3000/api/products/mint-nft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    productDescription,
                    associatedWasteSubmissionIds: associatedWasteSubmissionIds.split(',').map(id => id.trim()),
                    creatorId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to mint NFT.');
            }

            const responseData = await response.json();
            setBlockchainData(responseData.chain);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Blockchain Display</h1>
            <form className="mb-4">
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription">Product Description</label>
                    <textarea
                        className="form-control"
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows={3}
                        placeholder="Enter Product Description"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="associatedWasteSubmissionIds">Associated Waste Submission IDs</label>
                    <input
                        type="text"
                        className="form-control"
                        id="associatedWasteSubmissionIds"
                        value={associatedWasteSubmissionIds}
                        onChange={(e) => setAssociatedWasteSubmissionIds(e.target.value)}
                        placeholder="Enter Waste Submission IDs (comma-separated)"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="creatorId">Creator ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="creatorId"
                        value={creatorId}
                        onChange={(e) => setCreatorId(e.target.value)}
                        placeholder="Enter Creator ID"
                    />
                </div>
                <button type="button" disabled={loading} className="btn btn-primary" onClick={handleMintNFT}>
                    {loading ? 'Minting...' : 'Mint NFT (Simulated)'}
                </button>
            </form>

            {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}

            {blockchainData && (
                <div className="mt-4">
                    <h2>Simulated Blockchain Data:</h2>
                    <pre className="alert alert-secondary overflow-auto" style={{maxHeight: '500px'}}>
                      {JSON.stringify(blockchainData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default BlockChainDisplay;