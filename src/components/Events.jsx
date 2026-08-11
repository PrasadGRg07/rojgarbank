import React, { useEffect, useRef, useState } from "react";
import { getEvents } from "../lib/eventApi";
import Navbar from "./Navbar";
import Footer from "./Footer";

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Building2,
  Award,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  MousePointerClick,
  CheckCircle2,
  X,
} from "lucide-react";

import image1 from "../assets/ac.png";
import image2 from "../assets/re.png";

const stats = [
  {
    label: "Events Hosted",
    value: "100+",
    Icon: CalendarDays,
  },
  {
    label: "Participants",
    value: "5,000+",
    Icon: Users,
  },
  {
    label: "Companies",
    value: "50+",
    Icon: Building2,
  },
  {
    label: "Success Rate",
    value: "98%",
    Icon: Award,
  },
];

const reasons = [
  "Meet industry experts",
  "Build professional network",
  "Discover career opportunities",
  "Attend practical workshops",
];

const whyAttend = [
  {
    title: "Networking Opportunities",
    desc: "Connect with professionals, recruiters and employers from various industries.",
    Icon: Users,
  },
  {
    title: "Career Development",
    desc: "Gain practical insights and learn from experienced professionals.",
    Icon: Target,
  },
];

const highlights = [
  {
    title: "Professional Speakers",
    desc: "Learn from experienced industry leaders.",
    Icon: Rocket,
  },
  {
    title: "Networking Sessions",
    desc: "Expand your professional connections.",
    Icon: Users,
  },
  {
    title: "Career Opportunities",
    desc: "Meet companies looking for talent.",
    Icon: ShieldCheck,
  },
];

const Events = () => {
  const eventSectionRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-sky-600 leading-tight">
          Discover Professional Events Across Nepal
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-cyan-600">
          Connect • Learn • Grow
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-slate-600 leading-relaxed">
          Explore career fairs, seminars, networking sessions, workshops and
          professional events designed to connect talented individuals with
          leading organizations.
        </p>

        <button
          onClick={() =>
            eventSectionRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-10 bg-sky-600 hover:bg-sky-700 transition text-white font-semibold px-8 py-3 rounded-xl"
        >
          Explore Events →
        </button>
      </section>
      {/* Statistics */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ label, value, Icon }, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition"
            >
              <Icon size={24} className="mx-auto text-sky-600" />

              <h3 className="mt-3 text-3xl font-bold text-slate-800">
                {value}
              </h3>

              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Event Gallery */}
      <section ref={eventSectionRef} className="bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-sky-600">
            Upcoming Events
          </h2>

          <p className="mt-3 text-slate-500">
            Explore our latest professional events, seminars and career fairs.
          </p>
        </div>{" "}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-16 text-slate-500">
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-slate-500">
              No events available at the moment.
            </div>
          ) : (
            events.map((event, index) => {
              const title = event.title || "Untitled Event";

              const image = event.image
                ? event.image
                : index % 2 === 0
                  ? image1
                  : image2;

              const venue = event.location || event.venue || "Kathmandu, Nepal";

              const organizer = event.organizer || "RojgarBank";

              const eventDate = event.date
                ? new Date(event.date).toLocaleDateString()
                : event.event_date
                  ? new Date(event.event_date).toLocaleDateString()
                  : "Coming Soon";

              const eventTime = event.time || event.event_time || "10:00 AM";

              const mappedEvent = {
                ...event,
                title,
                image,
                venue,
                organizer,
                eventDate,
                eventTime,
              };

              return (
                <div
                  key={event.id || index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    <span className="absolute top-4 right-4 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Event
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-800">
                      {title}
                    </h3>

                    <div className="mt-5 space-y-3 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-sky-600" />

                        {eventDate}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-sky-600" />

                        {eventTime}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-sky-600" />

                        {venue}
                      </div>

                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-sky-600" />

                        {organizer}
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-slate-500 line-clamp-3">
                      {event.description ||
                        "Join this exciting event and connect with professionals, recruiters and industry experts."}
                    </p>

                    <div className="mt-auto pt-6 flex flex-col gap-3">
                      <button
                        onClick={() => setSelectedEvent(mappedEvent)}
                        className="border border-slate-300 text-sky-600 font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      {/* Why Attend */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-sky-600">
              Why Attend Our Events?
            </h2>

            <p className="mt-3 text-slate-500">
              Learn, connect and unlock new opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyAttend.map(({ title, desc, Icon }, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Icon size={24} className="text-sky-600" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-800">
                  {title}
                </h3>

                <p className="mt-3 text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Ready to Join */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 my-12 mx-4 lg:mx-10">
        <div className="py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
            {/* Left */}

            <div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ label, value, Icon }, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition"
                  >
                    <Icon size={24} className="mx-auto text-sky-600" />

                    <h3 className="mt-3 text-3xl font-bold text-slate-800">
                      {value}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-cyan-50 border border-cyan-100 rounded-xl p-6">
                <h3 className="font-bold text-slate-800">
                  Why People Love Our Events
                </h3>

                <ul className="mt-5 space-y-3">
                  {reasons.map((reason, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-slate-600"
                    >
                      <CheckCircle2 size={18} className="text-sky-600" />

                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}

            <div className="rounded-2xl bg-gradient-to-br from-sky-600 via-sky-600 to-cyan-500 p-8 text-white">
              <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                
                Featured Events
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                Join The Best
                <br />
                Career Events
              </h2>

              <p className="mt-5 text-white/90 leading-relaxed">
                Build meaningful connections with employers, professionals and
                organizations through our networking events, seminars and career
                fairs.
              </p>

              <div className="mt-8 space-y-5">
                {highlights.map(({ title, desc, Icon }, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-white/20 rounded-xl p-3">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h4 className="font-semibold">{title}</h4>

                      <p className="text-sm text-white/80">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-white/80">
                <MousePointerClick size={16} />
                Click "View Details" to learn more.
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/60 flex items-center justify-center px-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 left-4 bg-white rounded-full p-2"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-800">
                {selectedEvent.title}
              </h2>

              <div className="mt-6 space-y-3 text-slate-600">
                <div className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-sky-600" />

                  {selectedEvent.eventDate}
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-sky-600" />

                  {selectedEvent.eventTime}
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-sky-600" />

                  {selectedEvent.venue}
                </div>

                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-sky-600" />

                  {selectedEvent.organizer}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-lg text-slate-800 mb-3">
                  Description
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {selectedEvent.description ||
                    "Join this professional event to connect with employers, recruiters and industry leaders while exploring exciting career opportunities."}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-8 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;