"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faBars,
  faXmark,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"

const NAV_H      = 72   
const SCROLL_BG  = 60  
const HIDE_DELTA = 6   
const HIDE_MIN_Y = 100  

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function Nav() {
  const [scrolled, setScrolled]             = useState(false)
  const [hidden,   setHidden]               = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery]       = useState("")
  const [mounted, setMounted]               = useState(false)  

  const lastScrollY = useRef(0)
  const ticking     = useRef(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(() => {
        const y     = window.scrollY
        const delta = y - lastScrollY.current
        setScrolled(y > SCROLL_BG)
        if      (y < 10)                               setHidden(false)
        else if (delta > HIDE_DELTA && y > HIDE_MIN_Y) setHidden(true)
        else if (delta < -HIDE_DELTA)                  setHidden(false)
        lastScrollY.current = y
        ticking.current     = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (mobileMenuOpen) {
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
    } else {
      html.style.overflow = ""
      body.style.overflow = ""
    }
    return () => { html.style.overflow = ""; body.style.overflow = "" }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: "Experience", id: "Experience" },
    { label: "Offers",     id: "Offers"     },
    { label: "Alerts",     id: "Alerts"     },
  ]

  const mobileMenu = (
    <>
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          9999,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity:         mobileMenuOpen ? 1 : 0,
          pointerEvents:   mobileMenuOpen ? "auto" : "none",
          transition:      "opacity 0.3s ease",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position:         "fixed",
          top:              0,
          left:             0,
          width:            "min(100vw, 390px)",
          height:           "100dvh",
          zIndex:           9999,
          backgroundColor:  "#ffffff",
          transform:        mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition:       "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          display:          "flex",
          flexDirection:    "column",
          overflowY:        "auto",
          overscrollBehavior: "contain",
        }}
      >
        <div
          style={{ height: NAV_H, borderBottom: "1px solid #e4e4e7", flexShrink: 0 }}
          className="flex items-center justify-between px-5"
        >
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <div className="relative w-[82px] h-[54px]">
              <Image src="/logo-black.png" alt="Logo" fill style={{ objectFit: "contain" }} />
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full
                       text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        </div>

        <Link
          href="/Login"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center justify-between px-5 py-[15px]"
          style={{ backgroundColor: "#6b0c2b", flexShrink: 0 }}
        >
          <span className="text-white font-semibold text-[15px] tracking-wide">
            Login&nbsp;
            <span className="font-light" style={{ opacity: 0.55 }}>|</span>
            &nbsp;Register
          </span>
          <FontAwesomeIcon icon={faChevronRight} className="text-white w-4 h-4 opacity-60" />
        </Link>


        <div style={{ flex: 1 }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollToSection(link.id); setMobileMenuOpen(false) }}
              className="w-full flex items-center justify-between px-5 py-[18px]
                         hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
              style={{ borderBottom: "1px solid #f4f4f5" }}
            >
              <span className="text-zinc-800 font-medium text-[16px]">{link.label}</span>
              <FontAwesomeIcon icon={faChevronRight} className="text-zinc-300 w-[14px] h-[14px]" />
            </button>
          ))}

          <div style={{ borderTop: "1px solid #f4f4f5", margin: "8px 0" }} />

          <button
            className="w-full flex items-center justify-between px-5 py-[18px] hover:bg-zinc-50 transition-colors"
            style={{ borderBottom: "1px solid #f4f4f5" }}
          >
            <span className="text-zinc-800 font-medium text-[16px]">Help</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-zinc-300 w-[14px] h-[14px]" />
          </button>
        </div>

        <div className="px-5 py-5" style={{ borderTop: "1px solid #f4f4f5", flexShrink: 0 }}>
          <p className="text-zinc-400 text-[13px]">Get more on our app</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      <nav
        style={{
          height:          NAV_H,
          transition:      "transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
          transform:       hidden ? `translateY(-${NAV_H}px)` : "translateY(0)",
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          borderBottom:    scrolled ? "1px solid #d4d4d8" : "1px solid transparent",
        }}
        className="fixed top-0 left-0 w-full z-9999"
      >
        <div className="h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="h-full flex items-center justify-between">

            {/* logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-[120px] h-[60px]">
                <Image
                  src="/Logo-white.png" alt="Logo" fill priority
                  style={{ objectFit: "contain", transition: "opacity 0.3s",
                           opacity: scrolled ? 0 : 1, position: "absolute" }}
                />
                <Image
                  src="/logo-black.png" alt="Logo" fill priority
                  style={{ objectFit: "contain", transition: "opacity 0.3s",
                           opacity: scrolled ? 1 : 0, position: "absolute" }}
                />
              </div>
            </Link>

            <ul className="hidden md:flex items-center gap-10 font-medium text-[17px] tracking-wide">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`cursor-pointer relative group select-none ${scrolled ? "text-zinc-600" : ""}`}
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-1 h-[1.5px] w-0 group-hover:w-full block"
                    style={{ backgroundColor: scrolled ? "#1a1a1a" : "#ffffff", transition: "width 0.25s ease" }}
                  />
                </li>
              ))}
              <li>
                <Link
                  href="/Login"
                  style={{
                    border:     `1.5px solid ${scrolled ? "#1a1a1a" : "#ffffff"}`,
                    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
                  }}
                    className={`${scrolled ? "text-zinc-600" : "text-white"}
                    "flex items-center gap-2 px-5 py-[7px] rounded-full text-[15px] font-semibold
                             hover:bg-red-900 hover:text-white hover:border-red-900"`}
                >
                  <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
                  Login
                </Link>
              </li>
            </ul>

            {/* mobile icons */}
            <div className="flex md:hidden items-center gap-4">
              <Link href="/Login" aria-label="Login">
                <FontAwesomeIcon
                  icon={faUser}
                    className={`${scrolled ? "text-zinc-700" : "text-white"} "w-[19px] h-[19px]"`}
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className={`${scrolled ? "text-zinc-400" : "text-white"}`}
              >
                <FontAwesomeIcon icon={faBars} className="w-[22px] h-[22px]" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {mounted && createPortal(mobileMenu, document.body)}

      <div style={{ height: NAV_H }} />
    </>
  )
}