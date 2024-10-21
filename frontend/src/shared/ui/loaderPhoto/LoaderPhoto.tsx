import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

type LoaderPhotoProps = {
	handleChange: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
	maxFiles: number;
	fileList: UploadFile[];
}

const LoaderPhoto: React.FC<LoaderPhotoProps> = ({handleChange, maxFiles, fileList}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');

	//@ts-ignore
	const uploadRequest = async ({ file, onSuccess }) => {
		onSuccess('ok');
	};

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Загрузить</div>
		</button>
	);
	return (
		<>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				//@ts-ignore
				customRequest={uploadRequest}
			>
				{fileList.length >= maxFiles ? null : uploadButton}
			</Upload>
			{previewImage && (
				<Image
					wrapperStyle={{ display: 'none' }}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(''),
					}}
					src={previewImage}
				/>
			)}
		</>
	);
};

export default LoaderPhoto;
