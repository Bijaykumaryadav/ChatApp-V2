import { useState } from "react";

const ProfileImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  ); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImageUrl(URL.createObjectURL(file)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    // Logic to upload the profile image goes here
  };

  const handleSkip = () => {
    console.log("Skip button clicked");
    // Logic for skipping the upload process can be added here
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center md:h-[500px] p-6 border border-blue-500 rounded-lg bg-[#d9d9d9] min-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div
        className="relative block mx-auto overflow-hidden rounded-full cursor-pointer w-36 h-36"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <img
          src={imageUrl}
          alt="Profile"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
          <div className="text-lg font-bold text-center text-white break-words">
            Change Profile Picture
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="block px-4 py-2 mx-auto mt-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Upload
        </button>
      </form>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 bottom-8 right-8"
      >
        Skip
      </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
