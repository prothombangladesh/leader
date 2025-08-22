import { PropsWithChildren } from 'react';
export default function Card({ children }: PropsWithChildren) {
  return <div className="bg-white rounded-2xl shadow-soft p-5">{children}</div>;
}