import ContactForm from '@/components/contact/ContactForm';
import { FC } from 'react';
import Head from 'next/head';

const ContactPage: FC = () => {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name='description' content='Send me your messaages' />
      </Head>
      <ContactForm />;
    </>
  );
};

export default ContactPage;
