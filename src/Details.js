import React, { useState, useEffect } from 'react';
import './App.css';

const userKey = '';
const Details = (props) => {
  const id = window.location.pathname.substr(1, window.location.pathname.length);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`, {
        method: 'POST',
        headers: {
            'user-key': userKey,
        },
    }).then(response => response.json())
    .then(data => {
      console.log('restaurant data', data);
      setData(data);
    });
  }, []);

  if (!data.name) return (<div className="wrapper">...Loading</div>);
  return (
    <div className="wrapper">
      <div key={data.id}>
        <img src={data.featured_image} width="100%" alt="" />
        <div className="restInfo">
          <div className="restName">{data.name}</div>
          <div>Rating: {data.user_rating.aggregate_rating}</div>
          <div>Avg Cost: {data.currency} {data.average_cost_for_two}</div>
          <div>{data.location.address}</div>
          <div>Timings: {data.timings}</div>
          <div>Cuisines: {data.cuisines}</div>
          <div>Table Booking Available: {data.has_table_booking ? 'Yes' : 'No'}</div>
          <div>Online delivery Available: {data.has_online_delivery ? 'Yes' : 'No'}</div>
          <div>Contact No.: {data.phone_numbers}</div>
          <div>Delivering Now: {data.is_delivering_now ? 'Yes' : 'No'}</div>
          <div>Total Reviews: {data.all_reviews_count}</div>
        </div>
      </div>
    </div>
  );
}

export default Details;
