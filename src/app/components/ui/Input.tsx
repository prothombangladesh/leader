import { InputHTMLAttributes } from 'react';
export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return (
    <input className={`w-full border rounded-xl2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand ${className}`} {...rest} />
  );
}