import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import styles from "./TryPhoto.module.css";
import Button from '../../shared/ui/button/Button';
import SecondaryButton from '../../shared/ui/button/SecondaryButton';
import { ResponseDto } from '../../store/user';
import axios from 'axios';
import { API_URL } from '../../shared/utils/constants';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectToken } from '../../entities/credential/redux/selectors';
import { addCredentialsUser } from '../../entities/credential/redux/slice';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Вы можете загружать только JPG/PNG файлы!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Размер изображения должен быть  2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const TryPhoto: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [ file, setFile ] = useState<File | null>(null);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status)
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj as FileType, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
  };

  //@ts-ignore
  const uploadRequest = async ({ file, onSuccess }) => {
    setFile(file);
    onSuccess("ok");
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузка аватара</div>
    </button>
  );

  const loadPhotoButton = async () => {
    const response = (await axios.postForm<ResponseDto>(`${API_URL}/users/avatar`, {
      file: file
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })).data;
    dispatch(addCredentialsUser(response));
  }

  const deleteButton = async() => {
    const response = (await axios.postForm<ResponseDto>(`${API_URL}/users/avatar`, {
      file: null
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })).data;
    dispatch(addCredentialsUser(response));
  }

  return (
    <>
    <Flex gap="middle" wrap>
      <div className={styles.avatarUploader}>
        <Upload
          name="avatar"
          listType="picture-circle"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          //@ts-ignore
          customRequest={uploadRequest}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      </div>
    </Flex>
    <div style={{display: "flex", gap: 15, paddingTop: 20}}>
      <Button buttonContent="Сохранить аватар" clickHandler={loadPhotoButton}/>
      <SecondaryButton buttonContent="Удалить аватар" clickHandler={deleteButton}/>
    </div>
    </>
  );
};

export default TryPhoto;