import {useState} from "react";
import {Link} from "react-router-dom";

export function Auth() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [auth, setAuth] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content});
    const headers = {"content-type": "application/json"};

    fetch(`http://localhost:3000/blog/auth`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: requestData
    }).then((response) => response.json()).then(
        (data) => {
            console.log(data);
            if (data.title == "SUCCESS") {
                setAuth(true);
            }
        }
    );


    console.log(requestData);
  }
  if (auth) {
    return (
      <div>
        <Link to="/create">Post!</Link>
        <Link to="/view">View!</Link>

      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          placeholder="password"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <button>Login</button>
    </form>
  );
}
