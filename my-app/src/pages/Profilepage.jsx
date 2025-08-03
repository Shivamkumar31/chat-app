

import React, { useState } from 'react';

function Profilepage() {
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic can be added here
    alert(`Profile Updated!\nName: ${fullName}\nBio: ${bio}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-800 to-black bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-3xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg shadow-lg overflow-hidden'>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-2xl font-semibold mb-4">Profile Details</h3>

          {/* Avatar Upload */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={handleAvatarChange} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-500 bg-gray-700 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="Avatar" className='w-full h-full object-cover' />
              ) : (
                <span className="text-xs text-gray-400">Upload</span>
              )}
            </div>
            <span className='text-sm text-gray-400'>Change Avatar</span>
          </label>

          {/* Full Name Input */}
          <input
            type="text"
            placeholder='Full Name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="p-2 rounded-md border border-gray-500 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Bio Textarea */}
          <textarea
            placeholder='Write something about yourself...'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
            className="p-2 rounded-md border border-gray-500 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          ></textarea>

          {/* Submit Button */}
          <button
            type='submit'
            className='py-2 px-4 mt-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-md text-white hover:opacity-90 transition-all'
          >
            Save Profile
          </button>
        </form>

        {/* Profile Picture Preview (for larger screens) */}
        <div className='flex-1 flex items-center justify-center p-6 bg-gray-800 max-sm:hidden'>
          {avatar ? (
            <img src={avatar} alt="Profile Preview" className='w-48 h-48 object-cover rounded-full border-4 border-violet-600' />
          ) : (
            <div className='w-48 h-48 rounded-full border border-gray-600 flex items-center justify-center text-gray-400'>
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profilepage;



