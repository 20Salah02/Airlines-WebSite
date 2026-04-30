"use client"

import Image from "next/image"
import { useState } from "react"

const currentYear = new Date().getFullYear()

const sections = [
  {
    title: "Company",
    links: ["About us", "Careers"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact"],
  },
  {
    title: "Policies",
    links: ["Baggage", "Refund"],
  },
  {
    title: "Contact",
    links: ["Email", "Phone"],
  },
]

const awards = [
  { alt: "Top Rated Airline", label: "Top Rated Airline", src: "/awardsImg/s-skytrax-2025-aoty-logo.svg" },
  { alt: "Customer Satisfaction", label: "Customer Satisfaction Award", src: "/awardsImg/s-skytrax-2025-logo.svg" },
  { alt: "Best Business Lounge", label: "World's Best Business Class Lounge", src: "/awardsImg/s-skytrax-2025-logo.svg" },
  { alt: "Best Airline Europe", label: "Best Airline in Europe", src: "/awardsImg/s-skytrax-2025-logo.svg" },
]

const socials = [
  {
    href: "https://facebook.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
        <path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
      </svg>
    ),
  },
  {
    href: "https://x.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
        <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.51 8.796v1.697a3.74 3.74 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766c-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483a1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.6 1.6 0 0 1 1.6 1.606" clipRule="evenodd" /><path d="M7.2 8.809H4V19.5h3.2z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
        <path fill="currentColor" fillRule="evenodd" d="M12 4.15c-1.191 0-2.58.028-3.934.066l-.055.002c-1.378.039-2.49.07-3.366.215c-.913.151-1.671.44-2.277 1.063c-.608.625-.873 1.398-.998 2.323c-.12.89-.12 2.018-.12 3.42v1.524c0 1.4 0 2.528.12 3.419c.124.925.39 1.698.998 2.323c.606.624 1.364.912 2.277 1.063c.876.145 1.988.176 3.366.215l.055.002c1.355.038 2.743.066 3.934.066s2.58-.028 3.934-.066l.055-.002c1.378-.039 2.49-.07 3.366-.215c.913-.151 1.671-.44 2.277-1.063c.608-.625.874-1.398.998-2.323c.12-.89.12-2.018.12-3.42v-1.524c0-1.401 0-2.529-.12-3.419c-.124-.925-.39-1.698-.998-2.323c-.606-.624-1.364-.912-2.277-1.063c-.876-.145-1.988-.176-3.367-.215l-.054-.002A145 145 0 0 0 12 4.15m-1.128 10.501A.75.75 0 0 1 9.75 14v-4a.75.75 0 0 1 1.122-.651l3.5 2a.75.75 0 0 1 0 1.302z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
        <path fill="currentColor" d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2m4.6 2.42a7.6 7.6 0 0 0-.46-2.43a4.9 4.9 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.8 4.8 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.8 4.8 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.6 7.6 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12M20.14 16a5.6 5.6 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.2 3.2 0 0 1-1.15.75a5.6 5.6 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.7 5.7 0 0 1-1.94-.3a3.3 3.3 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.5 5.5 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.5 5.5 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.1 3.1 0 0 1 1.1-.8A5.7 5.7 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.6 5.6 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.1 3.1 0 0 1 .75 1.1a5.6 5.6 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4M12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87m0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33" />
      </svg>
    ),
  },
]

function AccordionSection({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-zinc-200">
      <button
        className="w-full flex justify-between items-center py-4 px-5 text-left text-zinc-700 font-medium text-[15px]"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="pb-3 px-5 space-y-2">
          {links.map((link) => (
            <p
              key={link}
              onClick={() => alert("Demo only")}
              className="text-[14px] text-zinc-500 underline cursor-pointer py-1"
            >
              {link}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <div className="bg-white mt-20 rounded-t-3xl text-zinc-600 cursor-default">

      <div className="md:hidden">
        {sections.map((s) => (
          <AccordionSection key={s.title} title={s.title} links={s.links} />
        ))}

        <div className="px-5 pt-6 pb-4 border-b border-zinc-200">
          <p className="text-[13px] text-zinc-500 mb-3">Let&apos;s stay connected</p>
          <div className="flex gap-3">
            {socials.map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-full p-2 transition-all ease-in-out hover:scale-110 duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-b border-zinc-200 space-y-4">
          {awards.map((a) => (
            <div key={a.label} className="flex items-center gap-4">
              <Image src={a.src} width={52} height={52} alt={a.alt} />
              <p className="text-[14px] text-zinc-600">{a.label}</p>
            </div>
          ))}
        </div>

        <div className="px-5 py-5 flex flex-wrap gap-x-4 gap-y-2 border-b border-zinc-200">
          {["Terms & conditions", "Cookies policy", "Privacy", "Accessibility", "Passenger rights", "Service agreement"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[12px] text-zinc-500 hover:underline hover:text-black transition-all"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="px-5 py-4 text-center text-[12px] text-zinc-400">
          © {currentYear} Salah Airlines · All Rights Reserved.
        </div>
      </div>

      <div className="hidden md:block p-10">
        <div className="flex justify-between">
          <div className="grid grid-cols-4 gap-6">
            {sections.map((s) => (
              <div key={s.title} className="space-y-3">
                <h3>{s.title}</h3>
                <div className="font-medium underline text-[14px] space-y-1">
                  {s.links.map((link) => (
                    <h4
                      key={link}
                      onClick={() => alert("Demo only")}
                      className="cursor-pointer"
                    >
                      {link}
                    </h4>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-end px-20 space-y-2">
            <h3 className="text-[13px]">Let&apos;s stay connected</h3>
            <div className="flex gap-3.5">
              {socials.map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-full p-2 cursor-pointer transition-all ease-in-out hover:scale-110 duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8 py-10">
          {awards.map((a) => (
            <div key={a.label} className="flex items-center space-x-4">
              <Image src={a.src} width={60} height={60} alt={a.alt} />
              <h5>{a.label}</h5>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-end py-10 border-t border-t-zinc-300">
          <div className="space-x-7">
            {["Terms & conditions", "Cookies policy", "Privacy", "Accessibility", "Passenger rights", "Service agreement"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[14px] transition-all ease-in-out duration-200 hover:underline hover:text-black"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="text-[14px]">
            <p>© {currentYear} Salah Airlines · All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}