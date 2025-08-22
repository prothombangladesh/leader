import { TextareaHTMLAttributes } from 'react';
export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props;
  return (
    <textarea className={`w-full min-h-[120px] border rounded-xl2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand ${className}`} {...rest} />
  );
}