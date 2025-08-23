import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import menu_icon from '../assets/menu_icon.png';
import search_icon from '../assets/search_icon.png';
import avatar_icon from '../assets/avatar_icon.png';
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const navigate = useNavigate();

  // Safely access contexts with error handling
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);

  // Check if contexts are available
  if (!chatContext) {
    throw new Error('Sidebar must be used within a ChatProvider');
  }
  if (!authContext) {
    throw new Error('Sidebar must be used within an AuthProvider');
  }

  const { getAllUser, users, selectedUser, setSelectedUser, unseenMessages } = chatContext;
  const { logout, onlineUsers = [] } = authContext; // Added default value

  const [input, setInput] = useState("");

  // Debug logs - moved to proper location
  console.log("Users data:", users);
  console.log("Online users:", onlineUsers);
  console.log("Unseen messages:", unseenMessages);

  const filteredUsers = input
    ? users.filter(user =>
        user.fullName && user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getAllUser();
  }, [getAllUser, onlineUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = () => {
    logout();
  };

  const handleProfileNavigation = () => {
    navigate('/profile');
  };

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Logo and Menu */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="max-w-4 cursor-pointer" />

          <div className="relative py-2 group">
            <img src={menu_icon} alt="menu" className="max-h-5 cursor-pointer" />

            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={handleProfileNavigation}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={handleLogout} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={search_icon} alt="Search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
            value={input}
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              onClick={() => handleUserSelect(user)}
              key={user._id || index}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
              }`}
            >
              <img
                src={user?.profilePic || avatar_icon}
                alt={user.fullName || 'User'}
                className="w-[35px] aspect-[1/1] rounded-full object-cover"
              />
              <div className="flex flex-col leading-5 flex-1 min-w-0">
                {/* Added safe check for fullName */}
                <p className="truncate max-w-[120px] text-white font-medium">
                  {user.fullName || 'Unknown User'}
                </p>
                {/* Added safe check for onlineUsers */}
                {Array.isArray(onlineUsers) && onlineUsers.includes(user._id) ? (
                  <span className="text-green-400 text-xs">Online</span>
                ) : (
                  <span className="text-neutral-400 text-xs">Offline</span>
                )}
              </div>

              {/* Added safe check for unseenMessages */}
              {unseenMessages && unseenMessages[user._id] > 0 && (
                <div className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500 text-white">
                  {unseenMessages[user._id]}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;