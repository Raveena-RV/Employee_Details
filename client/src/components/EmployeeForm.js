import axios from 'axios';
import React, { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    city: '',
    dob: '',
    gender: '',
    designation: '',
    salary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if age is above 20
    const age = calculateAge(formData.dob);
    if (age <= 20) {
      alert('Employee must be above 20 years old.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/submit', formData);

      if (response.data) {
        alert('Form submitted successfully!');
        setFormData({
          name: '',
          employeeId: '',
          department: '',
          city:'',
          dob: '',
          gender: '',
          designation: '',
          salary: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
    <label htmlFor="name">Employee Name:</label>
    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} maxLength="30" required /><br /><br />

    <label htmlFor="employeeId">Employee ID:</label>
    <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleInputChange} required /><br /><br />

    <label htmlFor="department">Department:</label>
    <select id="department" name="department" value={formData.department} onChange={handleInputChange} required>
      <option value="HR">HR</option>
      <option value="Finance">Finance</option>
      <option value="IT">IT</option>
      <option value="Marketing">Marketing</option>
      <option value="Operations">Operations</option>
      <option value="Sales">Sales</option>
      <option value="Customer Service">Customer Service</option>

    </select>
    <br /><br />

    <label>City:</label>
    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required /><br /><br />

    <label htmlFor="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required /><br /><br />

    <label>Gender:</label>
    <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} required /> Male
    <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} required /> Female<br /><br />

    <label htmlFor="designation">Designation:</label>
    <select id="designation" name="designation" value={formData.designation} onChange={handleInputChange} required>
      <option value="manager">Manager</option>
      <option value="developer">Developer</option>
      <option value="designer">Designer</option>
      <option value="analyst">Analyst</option>
      <option value="engineer">Engineer</option>
    </select><br /><br />

    <label htmlFor="salary">Salary:</label>
    <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} maxLength="8" required /><br /><br />

    <input type="submit" value="Submit" />
  </form>
  );
};

export default EmployeeForm;