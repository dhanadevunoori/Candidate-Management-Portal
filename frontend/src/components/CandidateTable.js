import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const statusColors = {
  Applied: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function CandidateTable({ candidates, loading, onEdit, onView, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
        <p className="text-gray-500">Loading candidates...</p>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-400 text-lg">No candidates found</p>
        <p className="text-gray-400 text-sm mt-1">Add a candidate or adjust your search filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {["Full Name", "Email", "Skills", "Experience", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {candidates.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-900">{c.fullName}</td>
                <td className="px-5 py-4 text-gray-600 text-sm">{c.email}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {c.skills.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                    {c.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        +{c.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600 text-sm">{c.experience} {c.experience === 1 ? "yr" : "yrs"}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(c)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => onEdit(c)} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(c)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
        Showing {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}