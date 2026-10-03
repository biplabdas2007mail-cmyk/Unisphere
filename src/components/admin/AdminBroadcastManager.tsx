import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { Bell, PlusCircle, Trash2, AlertTriangle, Info, Sparkles, Send } from 'lucide-react';

export const AdminBroadcastManager: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement, currentUser } = useCampus();
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'Normal' | 'Urgent' | 'Information'>('Normal');
  const [targetAudience, setTargetAudience] = useState<'All Campus' | 'Students Only' | 'Staff Only'>('Students Only');
  const [category, setCategory] = useState('Academics');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      priority,
      targetAudience,
      author: currentUser?.name || 'Dean of Campus Operations',
      category
    });

    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            University Broadcast & Emergency Dispatch (PS07 Pillar #4)
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Push critical notices, storm warnings, or exam updates across all student dashboards within seconds.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Campus Broadcast</span>
        </button>
      </div>

      {/* Broadcasts List */}
      <div className="space-y-3">
        {announcements.map((ann) => (
          <div key={ann.id} className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500">{ann.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  ann.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                  ann.priority === 'Information' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {ann.priority}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {ann.category}
                </span>
                <span className="text-xs text-indigo-600 font-medium">
                  Audience: {ann.targetAudience}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900">{ann.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{ann.content}</p>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                <span>Published: {ann.date}</span>
                <span>•</span>
                <span>Author: {ann.author}</span>
              </div>
            </div>

            <button
              onClick={() => deleteAnnouncement(ann.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors self-end sm:self-start shrink-0"
              title="Delete announcement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* New Broadcast Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Push Campus Broadcast</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handlePublish} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weather Advisory: Heavy Monsoon Rains Expected"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent Alert</option>
                    <option value="Information">Information Only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={e => setTargetAudience(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Students Only">Students Only</option>
                    <option value="All Campus">All Campus (Students & Staff)</option>
                    <option value="Staff Only">Staff Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Examinations, Hostel Life, Health & Safety"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Broadcast Content</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the full message to be delivered to student dashboards..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
