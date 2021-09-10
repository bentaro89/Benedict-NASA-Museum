import logo from './logo.svg';
import './App.css';
import Post from './NASA.post'
import { useAsync } from 'react-async';

const loadPosts = async () => {
  const API_KEY = 'OYMjkCxdhskTLbi3dp4jE58JgTJ9mcn32HZs4zOd';
  var today = new Date();
  console.log(today)
  return await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())
}
function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: loadPosts })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`

  return (
    
    <div className="App">
      <header className="App-header">
        {/* {console.log(data)} */}

        <Post
        title = {data.title}
        img = {data.hdurl}
        explanation = {data.explanation}
        />
      </header>
    </div>
  );
}

export default App;
