import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateType, updateTemp, updateZipcode, updateCity, updateUrl, updateAll,
} from '../redux/stateSlice';

// send fetch request to get weather from API based upon Zip Code

// on button click --> set location to the value of whatever is in input field

export default function Zipcode() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(10001);

  useEffect(() => {
    // on-load, fetch weather data from the weather API
    async function getWeatherData(input) {
      const body = JSON.stringify({ zip: input });
      console.log('This is the body:', body);
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const newData = await response.json();
      console.log('This is body data', newData);
      return newData;
    }

    // invoke the function
    const data = getWeatherData(location);
  }, []);

  // on button click, fire reducers to update state and re-render page with new location

  }, [])

  //on button click, fire reducers to update state and re-render page with new location

  function getNewWeatherData(input) {
    const body = JSON.stringify({ zip: input });
    console.log('This is the body:', body);
    fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((response) => response.json())
      .then((response) => dispatch(updateAll(response)))
      .then((response) => console.log('This is the reponse after UpdateAll', response));
      .then((response) => response.json())
      .then((response) => dispatch(updateAll(response)))
      .then((response) => console.log('This is the reponse after UpdateAll', response))
  }

  const { temp, city, type } = useSelector((state) => state.updater);

  return (
    <div className="column">
      <div class='box is-align-content-center is-justify-content-center'>
        <div class='card-content'>
          <span>


          </span>
        </div>

        <div class="field has-addons">
          <div class="control has-icons-left has-icons-right is-expanded">
   
            <input class='input has-text-weight-bold is-size-4' type="text" placeholder="ZIPCODE" onChange={(e) => setLocation(e.target.value)} />

          </div>
          <p class="control">
 
            <a class='button is-primary has-text-weight-bold is-size-4 has-text-light' onClick={() => getNewWeatherData(location)}>Location</a>
          </p>
        </div>

        <footer class="card-footer">
          <p class="card-footer-item has-text-weight-bold is-size-4 has-text-grey is-capitalized">{type}</p>
          <p class="card-footer-item has-text-weight-bold is-size-4 has-text-grey has-text-centered">{city}</p>
          <p class="card-footer-item has-text-weight-bold is-size-4 has-text-grey">{temp}</p>
        </footer>

      </div>

    </div>
  );
}
