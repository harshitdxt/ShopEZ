import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, BadgeCheck, Pencil, Loader2 } from "lucide-react";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/me", {
          withCredentials: true,
        });
        const user = response.data.user;
        setUserData(user);
        setFormData({
          name: user.name || "",
          contactNumber: user.contactNumber || "",
          profileImage: user.profileImage || "",
          sellerDetails: {
            shopName: user.sellerDetails?.shopName || "",
            gstNumber: user.sellerDetails?.gstNumber || "",
            address: {
              street: user.sellerDetails?.address?.street || "",
              city: user.sellerDetails?.address?.city || "",
              state: user.sellerDetails?.address?.state || "",
              pincode: user.sellerDetails?.address?.pincode || "",
            },
          },
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("sellerDetails.address.")) {
      const key = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        sellerDetails: {
          ...prev.sellerDetails,
          address: {
            ...prev.sellerDetails?.address,
            [key]: value,
          },
        },
      }));
    } else if (name.startsWith("sellerDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        sellerDetails: {
          ...prev.sellerDetails,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/v1/user/update",
        formData,
        { withCredentials: true }
      );
      setUserData(response.data.sanitizedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-black flex items-center justify-center text-3xl font-bold shadow-md">
            {userData.name?.charAt(0).toUpperCase() || <User />}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-green-500" />
              {userData.userType === "customer" ? "Customer Account" : "Seller Account"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              name="contactNumber"
              type="text"
              value={formData.contactNumber}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Image URL</label>
            <input
              name="profileImage"
              type="text"
              value={formData.profileImage}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          {userData.userType === "seller" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Shop Name</label>
                <input
                  name="sellerDetails.shopName"
                  type="text"
                  value={formData.sellerDetails?.shopName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GST Number</label>
                <input
                  name="sellerDetails.gstNumber"
                  type="text"
                  value={formData.sellerDetails?.gstNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Address</label>
                <div className="space-y-4">
                  {["street", "city", "state", "pincode"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium capitalize">
                        {field}
                      </label>
                      <input
                        name={`sellerDetails.address.${field}`}
                        type="text"
                        value={formData.sellerDetails.address?.[field] || ""}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-500 text-black px-4 py-2 rounded hover:bg-indigo-600 transition flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
