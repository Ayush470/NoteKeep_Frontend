import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      // }
      const { data } = await axios.post(
        "https://notekeep-application.onrender.com/",
        {},
        { withCredentials: true }
      );
      const { status, user, note } = data;
    //  console.log(user._id,"userid");
      
      // if (user || user._id) {
       // console.log(user._id);
        setUserID(user._id);
        setUsername(user.username);
        setNotes(note);
      // } else {
      //   console.error("User object or user._id is undefined.");
      // }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  async function addNote(newNote) {
    const { title, content } = newNote;
    //console.log(title, content);
    //console.log(userID);
    const { data } = await axios.post(
      "https://notekeep-application.onrender.com/addNote",
      { userID, title, content },
      { withCredentials: true }
    );
    //const { note } = data;
    setNotes(data);
  }
  async function deleteNote(id) {
    //console.log(id);
    try {
      const { data } = await axios.post(
        "https://notekeep-application.onrender.com/deleteNote",
        {
          id,
          userID,
        },
        { withCredentials: true }
      );
      setNotes(data);
    } catch (error) {
      console.error("Error client side deleting note:", error);
    }
  }

  const onLogout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <ToastContainer />
      <Header name={username} onLogout={onLogout} />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        console.log(noteItem);
        if (noteItem._id === undefined) {
          return;
        }
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </>
  );
};

export default Home;
