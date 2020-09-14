import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
const userKey = '';
let val = '';
let apiSuccess = false;

const App = (props) => {
  console.log(props);
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [sortActive, setSortActive] = useState(false);

  useEffect(() => {
    getLocation().then((loc) => {
      fetchZomato(loc.coords);
    }, (err) => {
      fetchZomato({ latitude: '28.582119499999997', longitude: '77.3266991' });
    });
  }, []);

  const fetchZomato = (coords) => {
    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${coords.latitude}&lon=${coords.longitude}`, {
        method: 'POST',
        headers: {
            'user-key': userKey,
        },
    }).then(response => response.json())
    .then(data => {
      console.log('data>>>>>', data);
      apiSuccess = true;
      if (data.nearby_restaurants) {
        setMainData(data.nearby_restaurants);
        setData(data.nearby_restaurants);
      } else {
        setData([]);
      }
    });
  }

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((position) => {
            console.info('gps position resolved', position);
            resolve(position);
          }, (error) => {
            reject({ error: 'GPS failed' });
          }, { enableHighAccuracy: false, timeout: 3000, maximumAge: 27000, });
      } else {
          reject({ error: 'GPS failed' });
      }
    });
  }

  const getFilteredData = () => {
    const newData = [...data];
    if (sortActive) {
      setSortActive(false);
      let dataset = [...mainData];
      console.log('val>>>>', val);
      if (val) {
        dataset = mainData.filter((item) => item.restaurant.name.toLowerCase().indexOf(val) > - 1);
      }
      setData(dataset);
      return;
    }
    setSortActive(true);
    newData.sort((a, b) => b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating);
    setData(newData);
  }

  const inputChange = (e) => {
    val = e.target.value;
    const dataset = mainData.filter((item) => item.restaurant.name.toLowerCase().indexOf(e.target.value) > - 1);
    if (sortActive) {
      dataset.sort((a, b) => b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating);
    }
    setData(dataset);
  }

  if (data.length === 0 && mainData.length === 0) {
    console.log('apiSuccess????', apiSuccess);
    if (!apiSuccess) return (<div className="wrapper">...Loading</div>);
    return (<a className="wrapper" style={{ color: 'blue' }} href="https://developers.zomato.com/api#headline2">Please fetch API key and update same as mentioned in README.md</a>);
  }
  return (
    <div className="wrapper">
      <input type="text" onChange={(e) => inputChange(e)} placeholder="Search for restaurants" />
      {data.length > 0 &&
        <button className={sortActive ? 'act' : ''} onClick={() => getFilteredData()}>Sort By Rating</button>
      }
      {data.length > 0 &&
        <ul>
          {data.map((item) => (
            <Link to={`/${item.restaurant.id}`} key={item.restaurant.id}>
              <li>
                <div className="restImg">
                  <img src={item.restaurant.thumb} alt="" />
                </div>
                <div className="restInfo">
                  <div className="restName">{item.restaurant.name}</div>
                  <div>Rating: {item.restaurant.user_rating.aggregate_rating}</div>
                  <div>Avg Cost: {item.restaurant.currency} {item.restaurant.average_cost_for_two}</div>
                  <div>{item.restaurant.location.address}</div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      }
      {data.length === 0 &&
        <div>No result found for value {val}</div>
      }
    </div>
  );
}

export default App;
