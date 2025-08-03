import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSidebar = ({ selectedUser }) => {
  // ✅ Prevent error BEFORE accessing selectedUser properties
  if (!selectedUser) {
    return (
      <div className="bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll">
        <p className="p-4 text-center text-sm">No user selected</p>
      </div>
    );
  }

  return (
    <div className="bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll">
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-20 aspect-[1/1] rounded-full"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          <p className="w-2 h-2 rounded-full bg-green-500"></p>
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      <div className="px-5 text-xs">
        <p>Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
          {imagesDummyData.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url)}
              className="cursor-pointer rounded"
            >
              <img src={url} alt="" className="h-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;