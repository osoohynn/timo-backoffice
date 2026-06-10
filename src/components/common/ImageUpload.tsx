import { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { imagesApi } from '../../api/images';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file }: UploadRequestOption) => {
    setLoading(true);
    try {
      const url = await imagesApi.upload(file as File);
      onChange?.(url);
    } catch {
      message.error('이미지 업로드에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload
      accept="image/*"
      showUploadList={false}
      customRequest={handleUpload}
    >
      {value ? (
        <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
          <img src={value} alt="uploaded" style={{ width: 104, height: 104, objectFit: 'cover', borderRadius: 8 }} />
          {loading && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: 8 }}>
              <LoadingOutlined style={{ color: '#fff', fontSize: 20 }} />
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: 104, height: 104, border: '1px dashed #d9d9d9', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 8 }}>
          {loading ? <LoadingOutlined style={{ fontSize: 20 }} /> : <PlusOutlined style={{ fontSize: 20 }} />}
          <span style={{ fontSize: 12, color: '#888' }}>업로드</span>
        </div>
      )}
    </Upload>
  );
}
