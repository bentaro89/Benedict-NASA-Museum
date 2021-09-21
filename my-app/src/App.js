import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar'
import Post from './components/Post'
import Planet1 from './Assets/planet1.png'
import Planet2 from './Assets/planet2.png'
import Planet3 from './Assets/planet3.png'
import './App.css';
import moment from 'moment';

const API_KEY = 'j5Q7TVEuv5s1CHhD6WC0xO3dS45uTHgskG03Bdoe';

// Given a date, return data from the NASA API
const loadPost = async (date) => {
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());
}

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Called to check if window is scrolling
  window.onscroll = function () {
    scrollRotate();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const postsToLoad = Array(10).fill(0) // Fills the array with the past ten dates
        .map((_, i) => moment().subtract(i, 'days').format('YYYY-MM-DD'));

      // Retrieves all the data from the API in the past ten days
      const data = await Promise.all(postsToLoad.map((postDate) => loadPost(postDate)));
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // rotates the planets as it scrolls
  function scrollRotate() {
      let image1 = document.getElementById("planet1");
      let image2 = document.getElementById("planet2");
      let image3 = document.getElementById("planet3");
      image1.style.transform = "rotate(" + window.pageYOffset/4 + "deg)";
      image2.style.transform = "rotate(" + window.pageYOffset/4 + "deg)";
      image3.style.transform = "rotate(" + window.pageYOffset/4 + "deg)";
  }

  if (isLoading) return (<div>"Loading..."</div>);
  if (error) return (<div>`Something went wrong: ${error.message}`</div>);

  return (
    
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <img className='planet1' src={Planet1} id='planet1' alt='planet1'/>
        <img className='planet2' src={Planet2} id='planet2' alt='planet2'/>
        <img className='planet3' src={Planet3} id='planet3' alt='planet3'/>

          {data.map(({title, date, hdurl, explanation}) => (
            // map the api data to individual post
            // Ensure it is a valid picture
            hdurl?
            <Post
              key = {title}
              title = {title}
              date = {date}
              img = {hdurl}
              explanation = {explanation}
            />
            :
            <p key = {title}></p>
            

          ))}
      </header>
    </div>
  );
}

export default App;