import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // SEND MESSAGE
  // ==========================================
  const sendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await emailjs.sendForm(
        "service_wn0164g",
        "template_reo52ht",
        form.current,
        {
          publicKey: "haRn69sETVjK_mls_",
        }
      );

      setSuccess(true);
      form.current.reset();

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Message could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#252525]">

      {/* ==========================================
          HERO
      ========================================== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-10">
        <div className="max-w-3xl">

          <p className="text-[#9A8654] text-sm uppercase tracking-[0.3em] font-semibold">
            Contact ZESTRO
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-tight">
            Let's get in touch.
          </h1>

          <p className="text-[#6F6B62] mt-5 text-base md:text-lg leading-8 max-w-2xl">
            Have a question, feedback, or want to make a reservation?
            Send us a message and our team will get back to you as soon
            as possible.
          </p>

        </div>
      </section>

      {/* ==========================================
          MAIN CONTACT SECTION
      ========================================== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pb-16">

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ==================================
              LEFT SIDE
          ================================== */}
          <div className="lg:col-span-2">

            <div className="bg-[#252525] text-white rounded-[32px] p-7 md:p-9 h-full">

              <p className="text-[#C8B77F] text-xs uppercase tracking-[0.25em] font-semibold">
                Get in touch
              </p>

              <h2 className="text-3xl font-bold mt-3">
                We'd love to hear from you.
              </h2>

              <p className="text-white/60 mt-4 leading-7">
                Whether you have a question about our menu, reservations,
                orders, or anything else, feel free to contact us.
              </p>

              {/* ==================================
                  LOCATION
              ================================== */}
              <div className="flex gap-4 mt-8">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[#C8B77F]
                    shrink-0
                  "
                >
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Location
                  </p>

                  <p className="text-sm text-white/50 mt-1">
                    ZESTRO Restaurant
                  </p>

                  <p className="text-sm text-white/50 mt-1">
                    Your restaurant address
                  </p>
                </div>

              </div>

              {/* ==================================
                  GOOGLE MAP
              ================================== */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4453.153280975096!2d91.86941307604766!3d24.89557324385041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750550058fb4039%3A0x850e0cce596d9428!2sZestro!5e1!3m2!1sen!2sbd!4v1787785147332!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZESTRO Restaurant Location"
                ></iframe>

              </div>

              {/* ==================================
                  EMAIL
              ================================== */}
              <a
                href="mailto:YOUR_EMAIL@gmail.com"
                className="flex gap-4 mt-6 group"
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[#C8B77F]
                    shrink-0
                    group-hover:bg-[#C8B77F]
                    group-hover:text-[#252525]
                    transition
                  "
                >
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Email
                  </p>

                  <p className="text-sm text-white/50 mt-1">
                    YOUR_EMAIL@gmail.com
                  </p>
                </div>

              </a>

              {/* ==================================
                  PHONE
              ================================== */}
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex gap-4 mt-6 group"
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[#C8B77F]
                    shrink-0
                    group-hover:bg-[#C8B77F]
                    group-hover:text-[#252525]
                    transition
                  "
                >
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Phone
                  </p>

                  <p className="text-sm text-white/50 mt-1">
                    +880 1XXXXXXXXX
                  </p>
                </div>

              </a>

              {/* ==================================
                  OPENING HOURS
              ================================== */}
              <div className="flex gap-4 mt-6">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-[#C8B77F]
                    shrink-0
                  "
                >
                  <FaClock />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Opening Hours
                  </p>

                  <p className="text-sm text-white/50 mt-1">
                    Every day · 10:00 AM – 11:00 PM
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* ==================================
              RIGHT SIDE FORM
          ================================== */}
          <div
            className="
              lg:col-span-3
              bg-white
              border
              border-[#E0DDD4]
              rounded-[32px]
              p-7
              md:p-10
              shadow-sm
            "
          >

            <div className="mb-8">

              <p className="text-[#9A8654] text-xs uppercase tracking-[0.25em] font-semibold">
                Send a message
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Get in touch
              </h2>

              <p className="text-[#8C877C] mt-2">
                Fill out the form below and we'll get back to you.
              </p>

            </div>

            {/* ==================================
                SUCCESS MESSAGE
            ================================== */}
            {success && (
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                  bg-green-50
                  border
                  border-green-200
                  text-green-700
                  px-4
                  py-4
                  rounded-2xl
                "
              >
                <FaCheckCircle />

                <p className="text-sm font-medium">
                  Your message has been sent successfully!
                </p>
              </div>
            )}

            {/* ==================================
                ERROR MESSAGE
            ================================== */}
            {error && (
              <div
                className="
                  mb-6
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  px-4
                  py-4
                  rounded-2xl
                "
              >
                <p className="text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* ==================================
                FORM
            ================================== */}
            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label className="block text-sm font-semibold text-[#3A3935] mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  required
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    bg-[#F7F5EF]
                    border
                    border-[#E0DDD4]
                    outline-none
                    text-[#252525]
                    placeholder:text-[#A7A297]
                    focus:border-[#B8A77A]
                    focus:ring-2
                    focus:ring-[#B8A77A]/20
                    transition
                  "
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-[#3A3935] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="user_email"
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    bg-[#F7F5EF]
                    border
                    border-[#E0DDD4]
                    outline-none
                    text-[#252525]
                    placeholder:text-[#A7A297]
                    focus:border-[#B8A77A]
                    focus:ring-2
                    focus:ring-[#B8A77A]/20
                    transition
                  "
                />

              </div>

              {/* SUBJECT */}
              <div>

                <label className="block text-sm font-semibold text-[#3A3935] mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    bg-[#F7F5EF]
                    border
                    border-[#E0DDD4]
                    outline-none
                    text-[#252525]
                    placeholder:text-[#A7A297]
                    focus:border-[#B8A77A]
                    focus:ring-2
                    focus:ring-[#B8A77A]/20
                    transition
                  "
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="block text-sm font-semibold text-[#3A3935] mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  required
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    bg-[#F7F5EF]
                    border
                    border-[#E0DDD4]
                    outline-none
                    resize-none
                    text-[#252525]
                    placeholder:text-[#A7A297]
                    focus:border-[#B8A77A]
                    focus:ring-2
                    focus:ring-[#B8A77A]/20
                    transition
                  "
                ></textarea>

              </div>

              {/* SEND BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#252525]
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-3
                  hover:bg-[#9A8654]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition
                "
              >

                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane />
                  </>
                )}

              </button>

              <p className="text-center text-xs text-[#9A8770] mt-3">
                We'll usually respond as soon as possible.
              </p>

            </form>

          </div>
        </div>

      </section>
    </div>
  );
};

export default Contact;
