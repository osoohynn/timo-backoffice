import { useState } from 'react';
import { Card, Typography, message, Input } from 'antd';
import { ImageUpload } from '../../components/common/ImageUpload';

const { Text } = Typography;

export function ImagePage() {
  const [url, setUrl] = useState('');

  const handleChange = (uploadedUrl: string) => {
    setUrl(uploadedUrl);
    message.success('업로드 완료');
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>이미지 업로드</h2>
      <Card style={{ maxWidth: 400 }}>
        <ImageUpload value={url} onChange={handleChange} />
        {url && (
          <div style={{ marginTop: 16 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>URL</Text>
            <Input.TextArea
              value={url}
              readOnly
              autoSize
              style={{ marginTop: 4, fontSize: 12 }}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
