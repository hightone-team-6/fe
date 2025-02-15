import { useState } from "react";

const useBufferToFile = () => {
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleFileToUrl = (file: {
    originalName: string;
    encoding: string;
    busBoyMimeType: string;
    buffer: {
      type: string;
      data: number[];
    };
  }) => {
    const { buffer, busBoyMimeType } = file;
    const blob = new Blob([new Uint8Array(buffer.data)], {
      type: busBoyMimeType,
    });
    const url = URL.createObjectURL(blob);
    setFileUrl(url);
    return url;
  };

  return {
    fileUrl,
    handleFileToUrl,
  };
};

export default useBufferToFile;
