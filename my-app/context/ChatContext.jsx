import React, { useContext, useState, useEffect, createContext } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);  // ✅ renamed from `user` to `users`
  const [unseenMessages, setUnseenMessages] = useState(0);

  const { socket, axios } = useContext(AuthContext);

  // function to get all user for sidebar
  const getAllUser = async () => {   // ✅ singular to match Sidebar
    try {
      const { data } = await axios.get('/api/messages/users');
      if (data.success) {
        setUsers(data.users);   // ✅ setUsers not setUser
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to get message for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to send message to selected user
  const sendMessage = async (message) => {
    try {
      const { data } = await axios.post('/api/messages/send', {
        userId: selectedUser._id,
        message,
      });

      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newmessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to subscribe to messages for selected user
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on('newMessage', (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // unsubscribe from messages
  const unsubscribeFromMessages = () => {
    if (!socket) return;
    socket.off('newMessage');
  };

  useEffect(() => {
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [socket, selectedUser]);

  const value = {
    messages,
    setMessages,
    selectedUser,
    setSelectedUser,
    users,                  // ✅ plural now
    setUsers,               // ✅ setter
    unseenMessages,
    setUnseenMessages,
    getAllUser,             // ✅ singular now
    getMessages,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
