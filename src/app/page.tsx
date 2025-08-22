import Link from 'next/link';
import Image from 'next/image';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import { prisma } from './lib/prisma';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-12">
      {/* Hero Section with Large Image */}
      <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-200 h-200 md:w-200 md:h-200">
            <Image
              src="https://i.ibb.co/tp4dGSYN/maal.png"
              alt="Mohammad Asgor Ali Lobbi"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="text-center py-12 px-4 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          মোহাম্মদ আসগর আলী লবী
        </h1>
        <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          শহীদ জিয়ার সৈনিক, জনগণের সেবক
        </p>
        <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
          আমি আপনার মানুষ, আপনার কষ্ট বুঝি, আপনার সাথে চলতে চাই
        </p>      
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Action Card */}
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Involved</h2>
            <p className="text-gray-600 mb-6">
              Join our movement and help make a difference in our community. Your voice matters.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/manifesto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  Read Manifesto
                </Button>
              </Link>
              <Link href="/peoples-voice">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                  Share Your Voice
                </Button>
              </Link>
            </div>
          </Card>

          {/* Events Card */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upcoming Events</h2>
            <EventsPreview />
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Focused</h3>
            <p className="text-gray-600">Working tirelessly for the people and their needs</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Trustworthy Leadership</h3>
            <p className="text-gray-600">Committed to transparency and accountability</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Progressive Vision</h3>
            <p className="text-gray-600">Building a better future for generations to come</p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center mt-12">
        <p>© {new Date().getFullYear()} Mohammad Asgor Ali Lobbi. All rights reserved.</p>
      </footer>
    </div>
  );
}

async function EventsPreview() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    take: 3,
  });

  if (!events.length) {
    return <p className="text-gray-500 text-center mt-2">No events scheduled at this time.</p>;
  }

  return (
    <ul className="space-y-4">
      {events.map((e) => (
        <li key={e.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{e.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(e.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 bg-blue-50 rounded-md">
              Details
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}