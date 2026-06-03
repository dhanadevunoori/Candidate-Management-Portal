import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Plus, LogOut, Users, UserCheck, UserX, Clock } from "lucide-react";
import CandidateTable from "../components/CandidateTable";
import CandidateModal from "../components/CandidateModal";
import ViewModal from "../components/ViewModal";
import DeleteModal from "../components/DeleteModal";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/candidates");
      setCandidates(res.data);
    } catch (err) {
      toast.error("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleAdd = () => { setSelected(null); setShowAddEdit(true); };
  const handleEdit = (c) => { setSelected(c); setShowAddEdit(true); };
  const handleView = (c) => { setSelected(c); setShowView(true); };
  const handleDeleteClick = (c) => { setSelected(c); setShowDelete(true); };

  const handleSave = async (formData, id) => {
    try {
      if (id) {
        await API.put(`/candidates/${id}`, formData);
        toast.success("Candidate updated successfully!");
      } else {
        await API.post("/candidates", formData);
        toast.success("Candidate added successfully!");
      }
      fetchCandidates();
      setShowAddEdit(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/candidates/${id}`);
      toast.success("Candidate deleted successfully!");
      fetchCandidates();
      setShowDelete(false);
    } catch (err) {
      toast.error("Failed to delete candidate");
    }
  };

  // Stats
  const stats = {
    total: candidates.length,
    applied: candidates.filter((c) => c.status === "Applied").length,
    shortlisted: candidates.filter((c) => c.status === "Shortlisted").length,
    rejected: candidates.filter((c) => c.status === "Rejected").length,
  };

  // Filtered candidates
  const filtered = candidates.filter((c) => {
    const matchSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">HyreAI Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">{user?.email}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track all candidates</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm"
          >
            <Plus size={18} />
            Add Candidate
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Candidates", value: stats.total, icon: Users, color: "blue" },
            { label: "Applied", value: stats.applied, icon: Clock, color: "yellow" },
            { label: "Shortlisted", value: stats.shortlisted, icon: UserCheck, color: "green" },
            { label: "Rejected", value: stats.rejected, icon: UserX, color: "red" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-50`}>
                  <Icon size={20} className={`text-${color}-500`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              {["All", "Applied", "Shortlisted", "Rejected"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <CandidateTable
          candidates={filtered}
          loading={loading}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Modals */}
      {showAddEdit && (
        <CandidateModal
          candidate={selected}
          onClose={() => setShowAddEdit(false)}
          onSave={handleSave}
        />
      )}
      {showView && selected && (
        <ViewModal
          candidate={selected}
          onClose={() => setShowView(false)}
          onEdit={() => { setShowView(false); setShowAddEdit(true); }}
        />
      )}
      {showDelete && selected && (
        <DeleteModal
          candidate={selected}
          onClose={() => setShowDelete(false)}
          onConfirm={() => handleDelete(selected._id)}
        />
      )}
    </div>
  );
}