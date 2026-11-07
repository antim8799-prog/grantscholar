import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentCategory } from '../types';
import {
  FolderOpen,
  UploadCloud,
  FileText,
  Trash2,
  Download,
  Eye,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const DocumentVault: React.FC = () => {
  const { documents, addDocument, deleteDocument, addToast } = useApp();

  const [category, setCategory] = useState<DocumentCategory>('Academic Marksheet');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories: DocumentCategory[] = [
    'Academic Marksheet',
    'Income Certificate',
    'Identity Proof',
    'Caste Certificate',
    'Bank Details Document',
    'Other Documents'
  ];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      addToast('Please select a file to stage in your vault', 'warning');
      return;
    }

    const fileSizeStr =
      selectedFile.size > 1024 * 1024
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(selectedFile.size / 1024)} KB`;

    addDocument({
      name: selectedFile.name,
      category,
      size: fileSizeStr
    });

    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('vault-file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handlePreview = (name: string) => {
    addToast(`Preview generated for "${name}" (Demo View)`, 'info');
  };

  const handleDownload = (name: string) => {
    addToast(`Downloading "${name}" to local device...`, 'success');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from your document vault?`)) {
      deleteDocument(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Document Management Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Store and categorize verified academic transcripts, revenue certificates, and proofs for 1-click FastTrack application attaching
        </p>
      </div>

      {/* Security and privacy advisory */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Privacy-First Client Processing:</span> Uploaded documents are managed locally within your browser sandbox. No sensitive files or personal identity documents are transmitted over external networks.
        </div>
      </div>

      {/* Upload Staging Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Stage New Verification Document
            </h3>
            <p className="text-[11px] text-slate-400">
              PDF, JPEG, or PNG formats up to 5MB
            </p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
          <div className="sm:col-span-4">
            <label className="block font-semibold text-slate-700 mb-1">
              Document Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DocumentCategory)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-5">
            <label className="block font-semibold text-slate-700 mb-1">
              Select Document File
            </label>
            <input
              id="vault-file-input"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer pt-1"
            />
          </div>

          <div className="sm:col-span-3 flex items-end">
            <button
              type="submit"
              disabled={!selectedFile}
              className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-semibold rounded-xl shadow-sm transition text-xs flex items-center justify-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload to Vault</span>
            </button>
          </div>
        </form>
      </div>

      {/* Documents List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-indigo-600" />
            <span>Vault Documents ({documents.length})</span>
          </h3>
          <span className="text-xs text-slate-400">
            All files ready for scholarship attaching
          </span>
        </div>

        {documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date Staged</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-[240px]">{doc.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {doc.category}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 tabular-nums">
                      {doc.uploadDate}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono tabular-nums">
                      {doc.size}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold border ${
                          doc.status === 'Verified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {doc.status === 'Verified' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{doc.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handlePreview(doc.name)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc.name)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id, doc.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <FolderOpen className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs">Your document vault is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};
