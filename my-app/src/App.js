import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar'
import Post from './components/Post'
import Planet1 from './Assets/planet1.png'
import Planet2 from './Assets/planet2.png'
import Planet3 from './Assets/planet3.png'
import './App.css';
import { useAsync } from 'react-async';
import moment from 'moment';

const loadPosts = async () => {
  const API_KEY = 'j5Q7TVEuv5s1CHhD6WC0xO3dS45uTHgskG03Bdoe';
  let d = new Date();
  let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()-2}`
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())
}

function App() {
  const [scrolled, setScroll] = useState(false);
  window.onscroll = function () {
    scrollRotate();
    setScroll(true);
  };

  useEffect(() => {
    const dates = Array(10)
      .fill(0)
      .map((_, i) => moment().subtract(i, 'days').format('YYYY-MM-DD'))
      // .map();
  }, [])

  function scrollRotate() {
      let image1 = document.getElementById("planet1");
      let image2 = document.getElementById("planet2");
      let image3 = document.getElementById("planet3");
      image1.style.transform = "rotate(" + window.pageYOffset/4 + "deg)";
      image2.style.transform = "rotate(" + window.pageYOffset/4 + "deg)";
      image3.style.transform = "rotate(" + window.pageYOffset/4 + "deg)";
  }

  const { data, error, isLoading } = useAsync({ promiseFn: loadPosts })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`

  return (
    
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <img className='planet1' src={Planet1} id='planet1' alt='planet1'/>
        <img className='planet2' src={Planet2} id='planet2' alt='planet2'/>
        <img className='planet3' src={Planet3} id='planet3' alt='planet3'/>

          {console.log(data)}
          <Post
          title = {data.title}
          date = {data.date}
          img = {data.hdurl}
          explanation = {data.explanation}
          />
          <Post
          title = {data.title}
          date = {data.date}
          img = {data.hdurl}
          explanation = {data.explanation}
          />        
      </header>
    </div>
  );
}

export default App;
