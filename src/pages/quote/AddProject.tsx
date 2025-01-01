import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const BASE_URL = import.meta.env.VITE_API_URL;

const specializations = ['électricien', 'plombier', 'peintre'];

const AddProject: React.FC = () => {
  const { token,isAuthenticated } = useAuth();

  console.log(BASE_URL)
  const [formData, setFormData] = useState({
    description: '',
    specialization: specializations[0], // Default to the first specialization
    artisan: '',
    images: [] as File[],
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('description', formData.description);
      formDataToSend.append('specialization', formData.specialization);
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      const response = await axios.post(`${BASE_URL}/api/projects/all`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Project added:', response.data);
      navigate('/'); // Redirect to home or another page after successful submission
    } catch (err: any) {
      console.error('Error adding project:', err);
      setError('Failed to add project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  if(!isAuthenticated){
   return <div>You are not logged in</div>
  }

  return (
    <div className="container">
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="specialization">Specialization</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Add Project'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddProject;