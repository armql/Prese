import React, { useEffect, useState } from 'react';
import '../styles/manager.css';



const ManagerPage = () => {
  const [totalDelivery, setTotalDelivery] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTotalDelivery();
  }, []);

  const fetchTotalDelivery = async () => {
    try {
      const response = await fetch('/api/delivery/total');
      const data = await response.json();
      setTotalDelivery(data.total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching total delivery count:', error);
      setLoading(false);
    }
  };

  return (
        <div className="section-content">
          {loading ? 'Loading...' : totalDelivery}
        </div>
      
      
    
  );
};

export default ManagerPage;
