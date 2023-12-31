import { FC } from 'react';
import ReactDOM from 'react-dom';
import classes from './Notification.module.css';

export interface NotificationProps {
  title: string;
  message: string | undefined;
  status: 'pending' | 'success' | 'error';
}

const Notification: FC<NotificationProps> = ({ title, message, status }) => {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications') as HTMLElement
  );
};

export default Notification;
