import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreatorProfile = () => {
    const { creatorId } = useParams();  // Get creatorId from route
    const [formData, setFormData] = useState({
        userId: '',
        expertise: '',
        materialsNeeded: '',
        portfolio: '',
        bio: '',
        contactInformation: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (creatorId) {
            // Fetch creator profile if creatorId is present (for viewing/editing)
            setLoading(true);
            fetch(`http://localhost:3000/api/creators/${creatorId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch creator profile.');
                    }
                    return response.json();
                })
                .then(data => {
                    setFormData(data);
                })
                .catch((err) => { // Changed (err) => to (err: any) =>
                    setError(err.message);
                })
                .finally(() => setLoading(false));
        }
    }, [creatorId]);

    const handleChange = (e) => { // Added type for e
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { // Added type for e
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            let response;
            if (creatorId) {
                //update
                response = await fetch(`http://localhost:3000/api/creators/${creatorId}/needs`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ materialsNeeded: formData.materialsNeeded }),
                });
            }
            else {
                //register
                response = await fetch('http://localhost:3000/api/creators/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to register creator profile.');
            }

            const responseData = await response.json();
            console.log('Creator profile action successful:', responseData);
            setSuccess(true);
            if (!creatorId) {
                setFormData({ //clear
                    userId: '',
                    expertise: '',
                    materialsNeeded: '',
                    portfolio: '',
                    bio: '',
                    contactInformation: '',
                    location: ''
                });
            }


            if (!creatorId) {
                navigate(`/creators/${responseData.data._id}`);
            }

        } catch (err) { // Changed (err) to (err: any)
            setError(err.message || 'Failed to register creator profile.');
            console.error('Error registering creator profile:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-2xl font-bold mb-4">{creatorId ? "Update Creator Profile" : "Creator Profile Registration"}</h1>
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
                        disabled={!!creatorId}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expertise">Expertise</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expertise"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        placeholder="Enter Expertise"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <input
                        type="text"
                        className="form-control"
                        id="materialsNeeded"
                        name="materialsNeeded"
                        value={formData.materialsNeeded}
                        onChange={handleChange}
                        placeholder="Enter Materials Needed (comma-separated)"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="portfolio">Portfolio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="Enter Portfolio URL"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className="form-control"
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter Bio"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactInformation">Contact Information</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactInformation"
                        name="contactInformation"
                        value={formData.contactInformation}
                        onChange={handleChange}
                        placeholder="Enter Contact Information"
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
                <button type="submit" disabled={loading} className="btn btn-primary w-100">
                    {loading ? creatorId ? 'Updating...' : 'Registering...' : creatorId ? 'Update Profile' : 'Register Profile'}
                </button>
            </form>
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success mt-4" role="alert">
                    Creator profile action successful!
                </div>
            )}
        </div>
    );
};

export default CreatorProfile;
