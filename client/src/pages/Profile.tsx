/**
 * Profile Page
 * User profile management with personal information and settings
 */

import Sidebar from "@/components/layout/Sidebar";
import BackgroundComponent from "@/components/ui/background-components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import {
    Briefcase,
    Calendar,
    Camera,
    Mail,
    MapPin,
    Phone,
    Save,
    Shield,
    User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    location: "Guwahati, Assam",
    department: "Operations",
    joinDate: "January 2023",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    // In production, this would call an API to update user profile
    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved.",
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your new passwords match.",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password too short", {
        description: "Password must be at least 8 characters long.",
      });
      return;
    }

    // In production, this would call an API to change password
    toast.success("Password changed successfully!", {
      description: "Your password has been updated.",
    });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <BackgroundComponent>
      <div className="flex min-h-screen" style={{ backgroundColor: "#FFFBEA" }}>
        <Sidebar />

        <main className="flex-1 ml-[280px] p-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-orbitron font-bold text-3xl mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="p-6 bg-white">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#F37021] to-[#003A8F] flex items-center justify-center text-white text-4xl font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#003A8F] text-white flex items-center justify-center hover:bg-[#002B6B] transition-colors shadow-lg">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>

                  {/* User Info */}
                  <h2 className="font-orbitron font-bold text-2xl mb-1">
                    {user?.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F37021]/10 text-[#F37021] text-sm font-medium mb-4">
                    <Shield className="w-4 h-4" />
                    {user?.role}
                  </div>

                  {/* Quick Info */}
                  <div className="w-full space-y-3 text-left mt-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail className="w-4 h-4 text-[#003A8F]" />
                      <span className="truncate">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Phone className="w-4 h-4 text-[#003A8F]" />
                      <span>{formData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-[#003A8F]" />
                      <span>{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Briefcase className="w-4 h-4 text-[#003A8F]" />
                      <span>{formData.department}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-[#003A8F]" />
                      <span>Joined {formData.joinDate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Edit Profile & Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-white">
                  <h3 className="font-orbitron font-bold text-xl mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#F37021]" />
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@iocl.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-slate-700">
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-slate-700">
                        Department
                      </Label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Your department"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="joinDate" className="text-slate-700">
                        Join Date
                      </Label>
                      <Input
                        id="joinDate"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        placeholder="Month Year"
                        className="mt-1"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-[#F37021] hover:bg-[#003A8F] text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Change Password */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 bg-white">
                  <h3 className="font-orbitron font-bold text-xl mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#003A8F]" />
                    Change Password
                  </h3>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword" className="text-slate-700">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword" className="text-slate-700">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-slate-700">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        className="mt-1"
                      />
                    </div>

                    <Button
                      onClick={handleChangePassword}
                      className="bg-[#003A8F] hover:bg-[#002B6B] text-white"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </BackgroundComponent>
  );
};

export default Profile;
