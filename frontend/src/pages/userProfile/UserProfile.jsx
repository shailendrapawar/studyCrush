import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ConfirmDialog from "../../components/Dialog/Dialog";
import { setAuthUser } from "../../store/slices/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { currentTheme } = useSelector((s) => s.theme);

  const { authUser } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // file upload reference
  const fileUploadRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  //====handling redirect======
  useEffect(() => {
    if (
      location.pathname == "/user/userProfile/" ||
      location.pathname == "/user/userProfile"
    ) {
      navigate("/user/userProfile/uploadedResources");
      return;
    }
  }, [location.pathname]);

  // handle the profile image delete
  const handleDeleteProfileImage = async () => {
    try {
      // call the delete profile image api
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/auth/delete-profile-image`,
        {
          data: {
            // <-- Note the 'data' field
            public_id: authUser?.profilePicture?.public_id,
          },
          withCredentials: true,
        }
      );

      // show toast if profile is deleted successfully
      toast.success(response.data.msg);
      // update the auth user in redux store
      dispatch(setAuthUser(response.data.user));
    } catch (error) {
      console.log("Error deleting profile image:", error);
    }
  };

  const handleProfileUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current?.click();

  }

  const updateImageOnServer = async () => {
    
    const uploadedFile = fileUploadRef.current.files[0];
    if (!uploadedFile) return; // No file selected

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("profileImage", uploadedFile);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/auth/update-profile-image`,
        formData,
        { withCredentials: true }
      );

      // show toast if profile is updated successfully
      toast.success(response.data.msg);
      // update the auth user in redux store
      dispatch(setAuthUser(response.data.user));
    } catch (error) {
      console.log("Error uploading profile image:", error);
    }
  }

  return (
    <div
      className="min-h-screen w-full p-2 sm:p-6 relative max-w-2xl mx-auto"
      style={{ backgroundColor: currentTheme?.background }}
    >
      {/* Header Section */}
      <header className="max-w-6xl mx-auto">
        <h1 className="text-2xl font- mb-8 text-center md:text-3xl">
          <span style={{ color: currentTheme?.accent }}>U</span>ser{" "}
          <span style={{ color: currentTheme?.accent }}>P</span>rofile
        </h1>
      </header>

      {/* Profile Card */}
      <section className="mx-auto">
        <div
          className=" bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg relative overflow-hidden"
          style={{
            backgroundColor: currentTheme?.cardBackground,
            border: `1px solid ${currentTheme?.line}`,
          }}
        >
          {/* Logout Button */}
          <button
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/10 transition-all"
            style={{ color: currentTheme?.textPrimary }}
          >
            <IoMdLogOut className="h-6 w-6" />
          </button>

          {/* Profile Content */}
          <div className="flex flex-col items-center gap-4">
            {/* Avatar with Edit/Delete Icons */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <img
                  src={authUser?.profilePicture?.url}
                  className="cursor-pointer w-32 h-32 object-cover rounded-full border-4"
                  style={{ borderColor: currentTheme?.accent }}
                  alt="Profile"
                />
                <div className="cursor-pointer absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <form id="form" encType="multipart/form-data">
                    <span onClick={handleProfileUpload}  className="text-white text-sm">Change Photo</span>
                    <input onChange={updateImageOnServer} type="file" id="file" hidden ref={fileUploadRef}/>
                  </form>
                </div>
              </div>

              {/* Edit/Delete Icons */}
              <div className="flex gap-4">
                <button
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  style={{ color: currentTheme?.textPrimary }}
                  title="Edit Profile"
                  onClick={()=>navigate("/user/userProfileEdit")}
                >
                  <FiEdit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  style={{ color: currentTheme?.textPrimary }}
                  title="Delete Profile Picture"
                >
                  <FiTrash2 className="h-5 w-5 text-red-500" />
                </button>

                <ConfirmDialog
                  openModal={isModalOpen}
                  closeModal={() => setIsModalOpen(false)}
                  onConfirm={handleDeleteProfileImage}
                  title="Delete Profile"
                >
                  <p>Are you sure you want to delete your profile?</p>
                </ConfirmDialog>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-1">
              <h2
                className="text-2xl font-semibold"
                style={{ color: currentTheme?.textPrimary }}
              >
                {authUser?.name}
              </h2>
              <p
                className="text-sm max-w-md italic"
                style={{ color: currentTheme?.textSecondary }}
              >
                {authUser?.bio || "No bio yet"}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <nav className="max-w-6xl mx-auto mt-8">
        <div
          className="flex justify-center gap-8 border-b"
          style={{ borderColor: currentTheme?.line }}
        >
          <NavLink
          
            to="/user/userProfile/savedResources"
            className={({ isActive }) =>
              `text-sm px-4 py-3 md:text-lg font-medium rounded-t-lg transition-colors ${
                isActive
                  ? "text-white border-b-2"
                  : "text-gray-500 hover:text-white"
              }`
            }
            style={({ isActive }) => ({
              borderBottomColor: isActive
                ? currentTheme?.accent
                : "transparent",
              color: isActive
                ? currentTheme?.textPrimary
                : currentTheme?.textSecondary,
            })}
          >
            Saved Resources
          </NavLink>
          <NavLink
            to="/user/userProfile/uploadedResources"
            className={({ isActive }) =>
              `text-sm px-4 py-3 md:text-lg font-medium rounded-t-lg transition-colors ${
                isActive
                  ? "text-white border-b-2"
                  : "text-gray-500 hover:text-white"
              }`
            }
            style={({ isActive }) => ({
              borderBottomColor: isActive
                ? currentTheme?.accent
                : "transparent",
              color: isActive
                ? currentTheme?.textPrimary
                : currentTheme?.textSecondary,
            })}
          >
            Uploaded Resources
          </NavLink>
        </div>
      </nav>


      {/* Content Section */}
      <section className="max-w-6xl mx-auto mt-6">
        <div
          className="bg-white/10 min-h-10 backdrop-blur-lg rounded-xl p-2 sm:p-6 shadow-lg"
          style={{
            backgroundColor: currentTheme?.cardBackground,
            border: `1px solid ${currentTheme?.line}`,
          }}
        >
          <Outlet />
        </div>
      </section>
      
    </div>
  );
};
export default UserProfile;
