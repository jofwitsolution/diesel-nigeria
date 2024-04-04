import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  handleFileData: (data: string | ArrayBuffer | null) => void;
  isDisabled: boolean;
}

function FileInput({ handleFileData, isDisabled }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const file = new FileReader();

      file.onload = function () {
        setPreview(file.result);
        handleFileData(file.result);
      };

      file.readAsDataURL(acceptedFiles[0]);
    },
    [handleFileData]
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [],
      },
      maxSize: 1024 * 5000,
      maxFiles: 1,
      disabled: isDisabled,
    });

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  return (
    <div className="w-full border border-dashed border-primary-500 px-2 py-4">
      <div {...getRootProps()} className="flex w-full justify-center">
        <input {...getInputProps()} disabled={isDisabled} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <div className="flex w-full flex-col items-center gap-4">
            <Image
              src="/images/icons/upload.svg"
              width={68}
              height={59}
              alt="upload"
            />
            <p className="text-[0.75rem]">
              Only PDF is accepted{" "}
              <span className="font-medium text-primary-500">(max: 5MB)</span>
            </p>
            <p>
              Drag and drop file, or{" "}
              <span className="font-medium text-primary-500 underline">
                Browse
              </span>
            </p>
          </div>
        )}
      </div>
      {preview && (
        <p className="mb-5 mt-2 text-center text-blue-400">
          {acceptedFiles[0]?.path}
        </p>
      )}
    </div>
  );
}

export default FileInput;
