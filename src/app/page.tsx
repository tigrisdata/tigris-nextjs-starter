"use client";

import { useCallback, useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { FileList } from "@/components/file-list";

interface FileItem {
  id: string;
  name: string;
  size: number;
  lastModified: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationToken, setPaginationToken] = useState<string | undefined>();

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/files");
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();
      setFiles(data.items);
      setPaginationToken(data.paginationToken ?? undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch files");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleLoadMore = async () => {
    if (!paginationToken) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/files?paginationToken=${encodeURIComponent(paginationToken)}`
      );
      if (!res.ok) throw new Error("Failed to load more files");
      const data = await res.json();
      setFiles((prev) => [...prev, ...data.items]);
      setPaginationToken(data.paginationToken ?? undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const res = await fetch(`/api/files/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Failed to get download URL");
      const { url } = await res.json();
      window.open(url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    try {
      const res = await fetch(`/api/files/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete file");
    } catch (err) {
      console.error("Delete failed:", err);
      fetchFiles();
    }
  };

  return (
    <div className="space-y-6">
      <FileUpload onUploadComplete={fetchFiles} />
      <FileList
        files={files}
        loading={loading}
        error={error}
        hasMore={!!paginationToken}
        onLoadMore={handleLoadMore}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </div>
  );
}
