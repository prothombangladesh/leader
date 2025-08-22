// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import { prisma } from "./lib/prisma";

export default async function Home() {
  // Fetch the upcoming events
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    take: 3,
  });

  type EventType = (typeof events)[number];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-12">
      {/* Hero Section with "Out of the Box" Effect */}
      <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-r from-blue-100 to-indigo-100">
        {/* Frame Element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-xl shadow-2xl transform rotate-3 border-4 border-blue-200 overflow-hidden">
            {/* Frame Content - Could be a pattern or subtle design */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-400 to-purple-400"></div>
            
            {/* Frame "Glass" Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-20"></div>
            
            {/* Frame Border Details */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-white/30 rounded-lg"></div>
          </div>
        </div>

        {/* Main Image - Appearing to Come Out of Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 z-20 transform -rotate-2">
          <Image
  src="https://i.ibb.co/tp4dGSYN/maal.png"
  alt="Mohammad Asgor Ali Lobbi"
  fill
  className="object-contain drop-shadow-2xl scale-200" // ✅ scale up 20%
  priority
/>

            
            {/* Subtle shadow to enhance 3D effect */}
            <div className="absolute -bottom-4 left-1/4 w-1/2 h-4 bg-black/20 blur-md rounded-full z-10"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-400/10 rounded-full"></div>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Get Involved
            </h2>
            <p className="text-gray-600 mb-6">
              Join our movement and help make a difference in our community.
              Your voice matters.
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Upcoming Events
            </h2>
            <ul className="space-y-4">
              {events.length ? (
                events.map((e: EventType) => (
                  <li
                    key={e.id}
                    className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {e.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(e.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 bg-blue-50 rounded-md">
                        Details
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-2">
                  No events scheduled at this time.
                </p>
              )}
            </ul>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Community Focused
            </h3>
            <p className="text-gray-600">
              Working tirelessly for the people and their needs
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Trustworthy Leadership
            </h3>
            <p className="text-gray-600">
              Committed to transparency and accountability
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Progressive Vision
            </h3>
            <p className="text-gray-600">
              Building a better future for generations to come
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}