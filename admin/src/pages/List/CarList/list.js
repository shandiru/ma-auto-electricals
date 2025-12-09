import React, { useEffect, useState, useCallback } from 'react';
import './list.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const CarList = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch list of cars
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/cars`);
      // API returns array directly
      setList(response.data);
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error('Error fetching cars');
    }
  }, [url]);

  // Delete a car
  const removeCar = async (carId) => {
    try {
      await axios.delete(`${url}/api/cars/${carId}`);
      toast.success('Car deleted successfully');
      fetchList(); // Refresh list
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Failed to delete car');
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className='list add flex-col'>
      <p>All Cars List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Model</b>
          <b>Year</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className='list-table-format'>
            {/* Show first image from images array */}
            <img
              src={`${url}/images/${item.images[0]}`}
              alt={item.name}
              style={{ width: '80px', height: '60px', objectFit: 'cover' }}
            />
            <p>{item.name}</p>
            <p>{item.model}</p>
            <p>{item.year}</p>
            <p>${item.price}</p>
            <p onClick={() => removeCar(item._id)} className='cursor'>
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
