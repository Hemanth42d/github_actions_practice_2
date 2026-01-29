import React, { useState } from "react";
import Sidebar from "./HomePage/Sidebar";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    bio: "Product manager who loves organizing tasks and staying productive.",
    avatar: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>

          <div className="bg-white rounded-lg shadow-sm">
            {/* Profile Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-semibold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600">{profile.email}</p>
                </div>
                <button
                  onClick={isEditing ? handleCancel : handleEdit}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {profile.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {profile.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {profile.bio || "No bio added yet."}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">42</div>
                  <div className="text-sm text-gray-500">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">12</div>
                  <div className="text-sm text-gray-500">Projects Created</div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-red-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-red-900 mb-2">
                Danger Zone
              </h3>
              <p className="text-sm text-red-600 mb-4">
                These actions are permanent and cannot be undone.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
