import React from "react";
import { X, Pencil, Mail, Phone, Briefcase, Star } from "lucide-react";

const statusColors = {
  Applied: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ViewModal({ candidate, onClose, onEdit }) {
  const c = candidate;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Candidate Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
              {c.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{c.fullName}</h3>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[c.status]}`}>
                {c.status}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Mail size={16} className="text-gray-400" />
              <span>{c.email}</span>
            </div>
            {c.phone && (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Phone size={16} className="text-gray-400" />
                <span>{c.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Briefcase size={16} className="text-gray-400" />
              <span>{c.experience} {c.experience === 1 ? "year" : "years"} of experience</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.skills.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          {c.notes && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
              <p className="text-sm text-gray-600">{c.notes}</p>
            </div>
          )}

          <div className="text-xs text-gray-400">
            Added: {new Date(c.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
          </div>
        </div>

        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            Close
          </button>
          <button onClick={onEdit} className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium flex items-center justify-center gap-2">
            <Pencil size={15} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}