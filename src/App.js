import { useState } from "react";
import "./App.css";

const API_URL = "https://api.github.com";

const fetchResult = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (error) {
    throw new Error(error);
  }
};

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onSearchChange = (event) => {
    return setQuery(event.target.value);
  };

  const onSearchSubmt = async (event) => {
    event.preventDefault();
    const results = await fetchResult(query);
    setResults(results);
  };
  return (
    <div className="app">
      <main className="main">
        <h1>Project 5: Github User Search</h1>
        <Form
          onChange={onSearchChange}
          onSubmit={onSearchSubmt}
          value={query}
        />
        <h3>Results</h3>
        <div id="results">
          {results.map((user) => (
            <User
              key={user.login}
              avatar={user.avatar_url}
              url={user.html_url}
              username={user.login}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const User = ({ avatar, url, username }) => {
  return (
    <div>
      <img src={avatar} alt="profile" width="100px" height="100px" />
      <br />
      Username:
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
};

const Form = ({ onSubmit, onChange, value }) => {
  return (
    <>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter username or email"
          onChange={onChange}
          value={value}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default App;
