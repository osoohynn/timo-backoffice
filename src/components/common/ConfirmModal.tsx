import { Modal } from 'antd';

interface ConfirmModalParams {
  title: string;
  content: string;
  onConfirm: () => void;
}

export function showConfirmModal({ title, content, onConfirm }: ConfirmModalParams) {
  Modal.confirm({
    title,
    content,
    okText: '확인',
    cancelText: '취소',
    onOk: onConfirm,
  });
}
