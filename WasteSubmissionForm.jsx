import React, { useState } from 'react';

const WasteSubmissionForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        wasteType: '',
        quantity: '',
        unit: '',
        location: '',
        imageUrl: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [carbonCredits, setCarbonCredits] = useState(0);
    const [userCreditBalance, setUserCreditBalance] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        setCarbonCredits(0);
        setUserCreditBalance(0);

        
        try {
            const response = await fetch('http://localhost:3000/api/waste/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload waste.');
            }

            const responseData = await response.json();
            console.log('Waste upload successful:', responseData);
            setSuccess(true);
            setCarbonCredits(responseData.carbonCreditsAwarded);
            setUserCreditBalance(responseData.userCreditBalance);

            setFormData({
                userId: '',
                wasteType: '',
                quantity: '',
                unit: '',
                location: '',
                imageUrl: '',
                description: '',
            });
        } catch (err) {
            setError(err.message || 'Failed to upload waste.');
            console.error('Error uploading waste:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-2xl font-bold mb-4">Waste Submission Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="userId">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                        placeholder="Enter User ID"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="wasteType">Waste Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="wasteType"
                        name="wasteType"
                        value={formData.wasteType}
                        onChange={handleChange}
                        required
                        placeholder="Enter Waste Type"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <input
                        type="text"
                        className="form-control"
                        id="unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        placeholder="Enter Unit"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter Location"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter Image URL"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter Description"
                    />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-100">
                    {loading ? 'Uploading...' : 'Upload Waste'}
                </button>
            </form>
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success mt-4" role="alert">
                    Waste uploaded successfully!
                    {carbonCredits > 0 && (
                        <p>
                            You have been awarded <strong>{carbonCredits}</strong> carbon credits.
                        </p>
                    )}
                    {userCreditBalance > 0 && (
                         <p>
                            Your new carbon credit balance is: <strong>{userCreditBalance}</strong>
                        </p>
                    )}

                </div>
            )}
        </div>
    );
};

export default WasteSubmissionForm;
