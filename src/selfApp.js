import { useState } from "react";

const API_URL = "https://api.github.com";
const fetchResult = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search/user?q=${query}`);
    if (response.ok) {
      const json = await response.json();
      return json.items || [];
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const SelfApp = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onSearchChange = (event) => {
    return setQuery(event.target.value);
  };
  const onSearchSubmit = async (event) => {
    event.preventDefault();
    const results = await fetchResult(query);
    setResults(results);
  };
  return (
    <div>
      <h1>Project 5</h1>
      <Form onChange={onSearchChange} onSubmit={onSearchSubmit} value={query} />
      <h3>Results:</h3>

      {results.map((user) => (
        <User
          key={user.login}
          avatar={user.avatar_url}
          url={user.html_url}
          username={user.login}
        />
      ))}
    </div>
  );
};
const Form = ({ onChange, onSubmit, value }) => {
  return (
    <form clasName="search-from" onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
      />
      <button type="submit"></button>
    </form>
  );
};
const User = ({ avatar, url, username }) => {
  return (
    <div>
      <img src={avatar} alt="profile" height="100px" weight="100px" />
      Username: <a href={url}>{username}</a>
    </div>
  );
};
export default SelfApp();
