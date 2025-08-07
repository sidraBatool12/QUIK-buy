'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    address: '',
    password: '',
    picture: '',
  });
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const sessionUsername = localStorage.getItem('quikbuy_session_user');
    if (role !== 'user' || !sessionUsername) {
      router.push('/login');
      return;
    }
    const raw = localStorage.getItem('quikbuy_users');
    const users = raw ? JSON.parse(raw) : [];
    const found = users.find((u: any) => u.username === sessionUsername);
    if (found) {
      setUser(found);
      setFormData(found);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const raw = localStorage.getItem('quikbuy_users');
    const users = raw ? JSON.parse(raw) : [];
    const updatedUsers = users.map((u: any) =>
      u.username === user.username ? { ...u, ...formData } : u
    );
    localStorage.setItem('quikbuy_users', JSON.stringify(updatedUsers));
    setUser({ ...user, ...formData });
    setEditing(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, picture: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleAddUser = () => {
    const raw = localStorage.getItem('quikbuy_users');
    const users = raw ? JSON.parse(raw) : [];
    const newUser = { ...formData, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('quikbuy_users', JSON.stringify(users));
    alert('User added successfully.');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>Quik-Buy</div>
        <div className="flex gap-4 items-center">
          <div className="text-sm">Hi, {user.fullName || user.username}</div>
          <button
            onClick={() => {
              localStorage.removeItem('role');
              localStorage.removeItem('quikbuy_session_user');
              router.push('/login');
            }}
            className="bg-red-500 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        {/* Profile Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Personal Profile</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-sm px-4 py-1 rounded bg-blue-600 hover:bg-blue-700"
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {!editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email || 'Not set'}</p>
                <p><strong>Address:</strong> {user.address || 'Not set'}</p>
                <p><strong>Password:</strong> ******</p>
                <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                {user.picture ? (
                  <img src={user.picture} alt="User" className="rounded w-32 h-32 object-cover" />
                ) : (
                  <div className="w-32 h-32 bg-gray-700 rounded flex items-center justify-center text-sm">
                    No Picture
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full px-3 py-2 rounded bg-gray-700 text-white" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full px-3 py-2 rounded bg-gray-700 text-white" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 rounded bg-gray-700 text-white" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full px-3 py-2 rounded bg-gray-700 text-white" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 rounded bg-gray-700 text-white" />
              </div>
              <div
                onDrop={handleDrop}
                onDragOver={handleDrag}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                className={`w-full h-32 border-2 ${dragActive ? 'border-blue-400' : 'border-gray-600'} border-dashed rounded flex items-center justify-center text-sm text-gray-400`}
              >
                {formData.picture ? (
                  <img src={formData.picture} alt="Preview" className="rounded w-32 h-32 object-cover" />
                ) : (
                  'Drag & Drop Profile Picture Here'
                )}
              </div>
              <div className="col-span-2 text-right">
                <button onClick={handleSave} className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add User */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <button onClick={handleAddUser} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded">
            Add User
          </button>
        </div>

        {/* Order History Placeholder */}
        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Order History</h2>
          <div className="text-sm text-gray-300">No orders yet.</div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm bg-gray-900 border-t border-gray-700">
        <div>© {new Date().getFullYear()} Quik-Buy. All rights reserved.</div>
      </footer>
    </div>
  );
}
