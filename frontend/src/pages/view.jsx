import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import { useReducer } from "react";


export function View() {
  const [deltitle, setdelTitle] = useState("");
  const [delcontent, setdelContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [del, setDel] = useState(false);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);
  function handleDelete(e, post) {
    setDel(true);
    setdelTitle(post.title);
    setdelContent(post.content);
    setAuth(true);
    const requestData = JSON.stringify({title:"DELETE", content:post.title});
    const headers = {"content-type": "application/json"};
    setAuth(true);
    fetch(`http://localhost:3000/blog/delete`, {
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
        }
      }
    );
    console.log(requestData);
  }


  if (del && !auth) {
    console.log("Delete without auth...")
    return (
      <div>
        <Link to="/auth">Log In To Post!</Link> 
      </div>
    )
  } else if (del) {
      window.location.reload(false);
  }
  return (
    <div>
      <Link to="/"> Home</Link>      <div>
        {posts.map((post) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <button onClick={e => handleDelete(e, post)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
