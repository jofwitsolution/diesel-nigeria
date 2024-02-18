import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  handleFileData: (data: string | ArrayBuffer | null) => void;
  isDisabled: boolean;
  currentLogo: string;
}

function ImageInput({ handleFileData, isDisabled, currentLogo }: Props) {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxSize: 1024 * 3000,
    maxFiles: 1,
    disabled: isDisabled,
  });

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  return (
    <div className="h-[8rem] w-full rounded-lg border-2 border-dashed">
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
          <Image
            src={preview as string}
            fill
            alt="image"
            className="rounded-lg object-cover"
          />
        ) : currentLogo ? (
          <Image
            src={currentLogo as string}
            fill
            alt="image"
            className="rounded-lg object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}

export default ImageInput;
