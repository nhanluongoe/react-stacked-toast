import { Toast } from '../core/types';

interface ToastIconProps {
  icon?: Toast['icon'];
  type: Toast['type'];
}

export default function ToastIcon(props: ToastIconProps) {
  const { icon, type } = props;

  if (icon !== undefined) {
    return icon;
  }

  const renderIcon = () => {
    if (type === 'success') {
      return '✅';
    }
    if (type === 'error') {
      return '❌';
    }
    return null;
  };

  return <div>{renderIcon()}</div>;
}
