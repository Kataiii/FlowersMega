import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { Buffer } from "buffer";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface ProductPhotoLoaderProps {
  onUploadSuccess: (file: File) => void; // Пропс для передачи URL родителю
  previewUrl?: string;
  onDeleteSuccess: () => void;
}

const base64ToFile = (base64String: string, fileName: string) => {
  // Удаление символов "data:" и "base64," из строки base64
  const data = base64String.replace(/^data:([a-v]+\/[a-z+]+);base64,/, "");

  // Преобразование base64 в ArrayBuffer
  const arrayBuffer = Buffer.from(data, "base64");

  // Создание Blob из ArrayBuffer
  const blob = new Blob([arrayBuffer]);
  const tmp = base64String.match(/^data:([a-v]+\/[a-z+]+);base64,/);
  // Создание File объекта
  const file = new File([blob], fileName, {
    type: tmp ? tmp[1] : undefined,
    lastModified: Date.now(),
  });

  return file;
};

const ProductPhotoLoader: React.FC<ProductPhotoLoaderProps> = ({
  onUploadSuccess,
  previewUrl,
  onDeleteSuccess
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    console.log("NEW FILE ", newFileList);
    // При выборе файла конвертируем его в base64
    const file = newFileList[0]?.originFileObj as RcFile;
    if (file) {
      const base64 = await getBase64(file);
      console.log(base64);
      onUploadSuccess(base64ToFile(base64, "image.png")); // Передаем base64 строку в родительский компонент
    }
  };

  const handleDelete = () => {
    setPreviewImage('');
    onDeleteSuccess();
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  useEffect(() => {
    if (previewUrl) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: previewUrl,
        },
      ]);
    }
  }, []);
  console.log(previewUrl, "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // onRemove={handleDelete}
        beforeUpload={() => false} // Отключаем автоматическую загрузку на сервер
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          width="200px"
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ProductPhotoLoader;
