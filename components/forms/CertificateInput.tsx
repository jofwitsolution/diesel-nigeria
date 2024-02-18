import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  handleFileData: (data: string | ArrayBuffer | null) => void;
  isDisabled: boolean;
  isVerified: boolean;
  currentDoc: string;
}

function CertificateInput({
  handleFileData,
  isDisabled,
  isVerified,
  currentDoc,
}: Props) {
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
    <div className="h-[8rem] w-full rounded-lg border-2 border-dashed">
      {!isVerified ? (
        <div {...getRootProps()} className="relative size-full">
          <div className="flex w-full justify-center px-2 py-4">
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
                <p>
                  Drag and drop file, or{" "}
                  <span className="font-medium text-primary-500 underline">
                    Browse
                  </span>
                </p>
              </div>
            )}
          </div>
          {preview ? (
            <div className="absolute inset-0 flex size-full items-center justify-center rounded-lg bg-dark-100">
              <p className="mb-5 mt-2 text-center text-white">
                {acceptedFiles[0]?.path}
              </p>
            </div>
          ) : currentDoc ? (
            <div className="absolute inset-0 flex size-full items-center justify-center rounded-lg bg-dark-100">
              <p className="mb-5 mt-2 text-center text-white">
                Uploaded-Document.pdf
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex size-full items-center justify-center">
          <span className="text-[1.125rem] font-semibold text-primary-500">
            Verified
          </span>
        </div>
      )}
    </div>
  );
}

export default CertificateInput;
