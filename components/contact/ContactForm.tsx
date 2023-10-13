import { FC, FormEvent, useEffect, useState } from 'react';
import classes from './ContactForm.module.css';
import Notification from '../ui/Notification';
import type { NotificationProps } from '../ui/Notification';

async function sendContactData(email: string, name: string, message: string) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      email,
      name,
      message,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Somethins went wrong');
  }
}

const ContactForm: FC = () => {
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredMessage, setEnteredMessage] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<
    'pending' | 'success' | 'error' | null
  >();
  const [requestError, setRequestError] = useState<string>('');
  async function sendMessageHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestStatus('pending');
    try {
      await sendContactData(enteredEmail, enteredName, enteredMessage);
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification: NotificationProps | undefined = undefined;
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }
  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timeout = setTimeout(() => {
        setRequestStatus(null);
        setRequestError('');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [requestStatus]);
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your email</label>
            <input
              type='email'
              id='email'
              required
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your message</label>
          <textarea
            name='message'
            id='message'
            rows={5}
            required
            onChange={(e) => setEnteredMessage(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button type='submit'>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
