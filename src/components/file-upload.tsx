"use client";

import { useState } from "react";
import { Uploader } from "@tigrisdata/react";
import "@tigrisdata/react/styles.css";

interface FileUploadProps {
  onUploadComplete: () => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploadError, setUploadError] = useState<string | null>(null);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Files</h2>
      {uploadError && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-700">{uploadError}</p>
        </div>
      )}
      <Uploader
        url="/api/files"
        uploadOptions={{ access: "private" }}
        multiple={true}
        multipart={true}
        concurrency={4}
        onUploadComplete={() => {
          setUploadError(null);
          onUploadComplete();
        }}
        onUploadError={(_, error) => {
          setUploadError(error.message ?? "Upload failed");
        }}
      />
    </div>
  );
}
