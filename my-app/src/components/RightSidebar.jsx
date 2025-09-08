import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import assets from '../assets/assets';

const RightSidebar = () => {
  const { selectedUser, messages = [] } = useContext(ChatContext); // ✅ default []
  const { logout, onlineUser } = useContext(AuthContext); // ✅ match AuthContext
  const [msgImages, setMsgImages] = useState([]);

  // ✅ Extract only valid images
  useEffect(() => {
    if (Array.isArray(messages)) {
      const imgs = messages
        .filter(msg => msg && msg.image)
        .map(msg => msg.image);
      setMsgImages(imgs);
    } else {
      setMsgImages([]);
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll">
        <p className="p-4 text-center text-sm">No user selected</p>
      </div>
    );
  }

  return (
    <div className="bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll">
      {/* Profile */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-20 aspect-[1/1] rounded-full"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          {Array.isArray(onlineUser) && onlineUser.includes(selectedUser._id) && (
            <p className="w-2 h-2 rounded-full bg-green-500"></p>
          )}
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media */}
      <div className="px-5 text-xs">
        <p>Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} alt={`media-${index}`} className="h-full rounded-md" />
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-2 text-center">No media found</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;
