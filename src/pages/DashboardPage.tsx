import { Card, Col, Row, Typography } from 'antd';
import {
  FileTextOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const shortcuts = [
  { path: '/tests', icon: <FileTextOutlined style={{ fontSize: 32 }} />, title: '검사 관리' },
  { path: '/test-questions', icon: <OrderedListOutlined style={{ fontSize: 32 }} />, title: '검사 문항 관리' },
  { path: '/reflection-questions', icon: <QuestionCircleOutlined style={{ fontSize: 32 }} />, title: '성찰 질문 관리' },
  { path: '/feedback-prompts', icon: <MessageOutlined style={{ fontSize: 32 }} />, title: '피드백 프롬프트' },
  { path: '/introductions', icon: <ReadOutlined style={{ fontSize: 32 }} />, title: '소개글 관리' },
];

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>대시보드</Title>
      <Row gutter={[16, 16]}>
        {shortcuts.map((item) => (
          <Col key={item.path} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              onClick={() => navigate(item.path)}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ marginBottom: 12 }}>{item.icon}</div>
              <Typography.Text strong>{item.title}</Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
