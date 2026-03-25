"use client";

import { formatFileSize, formatDate } from "@/lib/format";

interface FileItem {
  id: string;
  name: string;
  size: number;
  lastModified: string;
}

interface FileListProps {
  files: FileItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FileList({
  files,
  loading,
  error,
  hasMore,
  onLoadMore,
  onDownload,
  onDelete,
}: FileListProps) {
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg px-6 py-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (loading && files.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg px-6 py-8 text-center text-gray-500">
        Loading files...
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg px-6 py-8 text-center text-gray-500">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Files ({files.length})
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {files.map((file) => (
          <div
            key={file.id}
            className="px-6 py-4 flex items-center justify-between"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{formatFileSize(file.size)}</span>
                <span>{formatDate(file.lastModified)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onDownload(file.id)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Download
              </button>
              <button
                onClick={() => onDelete(file.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="px-6 py-4 text-center border-t border-gray-200">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
