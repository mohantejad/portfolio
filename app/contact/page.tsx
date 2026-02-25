'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';

const socials = [
  { href: 'https://www.linkedin.com/in/mohantejad/', icon: <FaLinkedin /> },
  { href: 'https://github.com/mohantejad', icon: <FaGithub /> },
  { href: 'https://www.instagram.com/mohantejad/', icon: <FaInstagram /> },
  { href: 'https://www.youtube.com/@fromideatoimplimentation', icon: <FaYoutube /> },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading('Sending email...');

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Email sending failed.');

      toast.success('Email sent successfully!', { id: toastId });
      reset();
    } catch (error) {
      toast.error('Failed to send email. Try again later.', { id: toastId });
      console.log(error);
    }
  };

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center px-6 space-y-12 pt-0 md:pt-4'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className='hidden md:block text-xl md:text-3xl uppercase font-bold text-primary text-center font-display tracking-[0.2em]'
      >
        Contact Me Or Connect Socially
      </motion.h1>

      <div className='w-full max-w-4xl flex flex-col md:flex-row items-center justify-evenly gap-12 md:gap-0'>
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='w-full md:w-1/2 backdrop-blur-md p-8 rounded-2xl border border-border/70 bg-panel/40 shadow-card'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type='text'
            placeholder='Your Name'
            {...register('name', { required: 'Name is required' })}
            className='w-full p-3 mb-4 bg-transparent border-b border-border/70 outline-none text-text focus:border-primary'
          />
          {errors.name?.message && (
            <p className='text-red-500'>{String(errors.name.message)}</p>
          )}

          <input
            type='email'
            placeholder='Your Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
            className='w-full p-3 mb-4 bg-transparent border-b border-border/70 outline-none text-text focus:border-primary'
          />
          {errors.email?.message && (
            <p className='text-red-500'>{String(errors.email.message)}</p>
          )}

          <input
            type='text'
            placeholder='Subject'
            {...register('subject', { required: 'Subject is required' })}
            className='w-full p-3 mb-4 bg-transparent border-b border-border/70 outline-none text-text focus:border-primary'
          />
          {errors.subject?.message && (
            <p className='text-red-500'>{String(errors.subject.message)}</p>
          )}

          <textarea
            placeholder='Your Message'
            rows={4}
            {...register('message', { required: 'Message is required' })}
            className='w-full p-3 mb-4 bg-transparent border-b border-border/70 outline-none text-text focus:border-primary'
          />

          <input
            type='text'
            tabIndex={-1}
            autoComplete='off'
            className='hidden'
            aria-hidden='true'
            {...register('company')}
          />
          {errors.message?.message && (
            <p className='text-red-500'>{String(errors.message.message)}</p>
          )}

          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-ink rounded-full hover:bg-primaryStrong transition duration-300 disabled:opacity-50'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Email'} <FaPaperPlane />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='w-full md:w-1/2 flex flex-col items-center gap-4 text-center'
        >
          <p className='text-lg text-muted'>Or reach me on:</p>

          <div className='flex gap-4 text-3xl text-primary'>
            {socials.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='relative group hover:scale-104 hover:opacity-90'
              >
                {item.icon}
                <span className='absolute left-0 bottom-0 top-9 w-0 h-[4px] bg-primary transition-all duration-500 ease-in-out group-hover:w-full' />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
