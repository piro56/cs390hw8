import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [auth, setAuth] = useState(true);
  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content});
    const headers = {"content-type": "application/json"};
    setAuth(true);
    fetch(`http://localhost:3000/blog/create-post`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: requestData
    }).then((response) => response.json())
      .then((data) => {
        if (data.title == 'NOT LOGGED IN') {
          console.log("Not Logged In...")
          setAuth(false);
          return;
        }
      }
    );

    setDone(true);
    console.log(requestData);
  }
  if (!auth) {
    return (
      <div>
        <Link to="/auth">Log In To Post!</Link> 
      </div>
    )

  }
  else if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <button>Post</button>
    </form>
  );
}
