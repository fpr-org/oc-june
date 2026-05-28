'use client';

import { FormEvent, useState } from 'react';
import { Mail, Send, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/brand';

const contactFaqs = [
  {
    question: 'How quickly do you respond to messages?',
    answer:
      'Most support emails are answered within 1-2 business days. Complex requests may take longer if technical review is needed.',
  },
  {
    question: 'Can I request a new calculator?',
    answer:
      'Yes. Send your use case, expected inputs, and desired output format. We prioritize requests with strong user demand.',
  },
  {
    question: 'Where should I report a calculation issue?',
    answer:
      'Use this contact form and include the exact units, input value, expected result, and your current result so we can verify quickly.',
  },
];

export default function ContactUsPageClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalSubject = subject.trim() || 'Contact form inquiry';
    const finalBody = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 pb-8">
      <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Contact Us</h1>
        <p className="text-sm text-slate-500 mb-8">
          Questions, feedback, or partnership inquiries? We&apos;d love to hear from you.
        </p>

        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <p className="text-sm font-semibold text-slate-700">
            Email: <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        {submitted && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            Your email draft is ready. Please press send in your email app.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1">
            <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="How can we help?"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
              placeholder="Tell us what you need..."
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </form>
      </div>

      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-500" />
          Contact FAQ
        </h2>
        <div className="space-y-5">
          {contactFaqs.map((item) => (
            <div key={item.question}>
              <h3 className="text-base font-bold text-slate-800 mb-1">{item.question}</h3>
              <p className="text-sm text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">
          Looking for usage guides first? Visit <Link href="/learn" className="text-primary font-semibold hover:underline">Learn</Link>.
        </div>
      </section>
    </div>
  );
}
