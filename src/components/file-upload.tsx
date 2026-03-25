"use client";

import { Uploader } from "@tigrisdata/react";
import "@tigrisdata/react/styles.css";

interface FileUploadProps {
  onUploadComplete: () => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Files</h2>
      <Uploader
        url="/api/files"
        uploadOptions={{ access: "private" }}
        multiple={true}
        multipart={true}
        concurrency={4}
        onUploadComplete={() => onUploadComplete()}
        onUploadError={(_file, error) => {
          console.error("Upload failed:", error.message);
        }}
      />
    </div>
  );
}
