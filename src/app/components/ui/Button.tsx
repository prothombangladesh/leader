import { ButtonHTMLAttributes } from 'react';
export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props;
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl2 px-4 py-2 text-white bg-gray-900 hover:opacity-90 shadow-soft disabled:opacity-50 ${className}`}
      {...rest}
    />
  );
}