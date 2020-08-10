import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await axios.get('/api/test')
    console.log(response)
    setData(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>The Joe Rogan Experience API</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Episode ID</th>
              <th>Title</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map(episode => (
              <tr>
                <td>{episode.episode_id}</td>
                <td>{episode.podcast.title}</td>
                <td>{episode.youtube.link}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;
