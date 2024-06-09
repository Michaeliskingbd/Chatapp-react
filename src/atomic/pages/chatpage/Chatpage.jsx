import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../organisms/nav/Navbar";
import { FiDelete } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import avatar from "../../../assets/avatar.png";
import "./chatpage.scss";

const Chatpage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [conversations, setConversations] = useState([{ id: 1, title: "Conversation 1" }]);
  const [currentConversationId, setCurrentConversationId] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const fetchMessages = async (conversationId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/conversation/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Fetched messages:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/chat', {
        conversation_id: currentConversationId,
        message: inputMessage
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Sent message response:", response.data);

      // Assuming the response contains the new message object
      const newMessage = response.data[0]; // Adjust according to actual response structure

      // Add the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInputMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteConversation = async (conversationId) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/conversation/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConversations(conversations.filter(convo => convo.id !== conversationId));
      if (currentConversationId === conversationId) {
        setCurrentConversationId(conversations.length > 0 ? conversations[0].id : null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  useEffect(() => {
    if (currentConversationId) {
      fetchMessages(currentConversationId);
    }
  }, [currentConversationId]);

  return (
    <div className="chatwindow_body">
      <aside className="conversations">
        <div className="header">
          <p>Conversations</p>
          <p><IoAddOutline style={{ fontSize: "25px" }} /></p>
        </div>
        <div className="convos">
          {conversations.map((convo) => (
            <div key={convo.id} className="convo" onClick={() => setCurrentConversationId(convo.id)}>
              <p>{convo.title}</p>
              <p><RiDeleteBin6Line style={{ fontSize: "25px" }} onClick={() => deleteConversation(convo.id)} /></p>
            </div>
          ))}
        </div>
      </aside>

      <main className="chatbot">
        <header className="header">
          <div className="chatbot-header">
            <img src={avatar} alt="Chatbot avatar" />
            <p>Chatbot</p>
          </div>
          <MdMenu onClick={toggleMenu} className="burger-menu" style={{ fontSize: "25px" }} />
        </header>

        {openMenu && (
          <div className="mobile-menu_conversations">
            <div className="header">
              <p>Conversations</p>
              <p><IoAddOutline style={{ fontSize: "25px" }} /></p>
            </div>
            <div className="convos">
              {conversations.map((convo) => (
                <div key={convo.id} className="convo" onClick={() => setCurrentConversationId(convo.id)}>
                  <p>{convo.title}</p>
                  <p><RiDeleteBin6Line style={{ fontSize: "25px" }} onClick={() => deleteConversation(convo.id)} /></p>
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="chats">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.user_id === 0 ? "AI-msg" : "user-msg"}>
              <img src={avatar} alt={msg.user_id === 0 ? "Chatbot avatar" : "User avatar"} />
              <p>{msg.content}</p>
            </div>
          ))}
        </section>

        <section className="options">
          <div>Option A</div>
          <div>Option B</div>
          <div>Option C</div>
          <div>Option D</div>
        </section>

        <footer className="inputbox">
          <textarea
            placeholder="Reply to Chatbot"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <div className="send" onClick={sendMessage}>
            <LuSend style={{ fontSize: "20px" }} />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Chatpage;
