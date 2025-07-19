"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Music, Menu, X, ChevronDown, Users, Radio, Mic, Camera, Star, Zap, Crown, Award } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    {
      title: "For Talents",
      icon: Users,
      href: "/talents",
      categories: [
        {
          title: "Creators",
          icon: Camera,
          items: [
            { name: "Nano Influencers", desc: "1K-10K followers", href: "/talents/creators/nano" },
            { name: "Micro Influencers", desc: "10K-100K followers", href: "/talents/creators/micro" },
            { name: "Macro Influencers", desc: "100K-1M followers", href: "/talents/creators/macro" },
            { name: "Mega Influencers", desc: "1M+ followers", href: "/talents/creators/mega" },
          ],
        },
        {
          title: "Artists",
          icon: Star,
          items: [
            { name: "Singers", desc: "Vocal performers", href: "/talents/artists/singers" },
            { name: "Musicians", desc: "Instrumentalists", href: "/talents/artists/musicians" },
            { name: "Producers", desc: "Music producers", href: "/talents/artists/producers" },
            { name: "Songwriters", desc: "Lyricists & composers", href: "/talents/artists/songwriters" },
          ],
        },
        {
          title: "DJs",
          icon: Music,
          items: [
            { name: "Club DJs", desc: "Nightclub specialists", href: "/talents/djs/club" },
            { name: "Radio DJs", desc: "Radio personalities", href: "/talents/djs/radio" },
            { name: "Wedding DJs", desc: "Event specialists", href: "/talents/djs/wedding" },
            { name: "Mobile DJs", desc: "Portable setups", href: "/talents/djs/mobile" },
          ],
        },
        {
          title: "MCs & Hosts",
          icon: Mic,
          items: [
            { name: "Event MCs", desc: "Live event hosts", href: "/talents/mcs/event" },
            { name: "TV Hosts", desc: "Television presenters", href: "/talents/mcs/tv" },
            { name: "Podcast Hosts", desc: "Audio show hosts", href: "/talents/mcs/podcast" },
            { name: "Corporate MCs", desc: "Business event hosts", href: "/talents/mcs/corporate" },
          ],
        },
      ],
    },
    {
      title: "For Media",
      icon: Radio,
      href: "/media",
      categories: [
        {
          title: "Television",
          icon: Camera,
          items: [
            { name: "Broadcast TV", desc: "Traditional networks", href: "/media/tv/broadcast" },
            { name: "Streaming", desc: "Online platforms", href: "/media/tv/streaming" },
            { name: "Cable TV", desc: "Cable networks", href: "/media/tv/cable" },
            { name: "Local TV", desc: "Regional stations", href: "/media/tv/local" },
          ],
        },
        {
          title: "Radio",
          icon: Radio,
          items: [
            { name: "FM Radio", desc: "Traditional radio", href: "/media/radio/fm" },
            { name: "Digital Radio", desc: "Online radio", href: "/media/radio/digital" },
            { name: "Podcast Networks", desc: "Audio platforms", href: "/media/radio/podcast" },
            { name: "Satellite Radio", desc: "Satellite platforms", href: "/media/radio/satellite" },
          ],
        },
        {
          title: "Digital Media",
          icon: Zap,
          items: [
            { name: "Social Platforms", desc: "Social media companies", href: "/media/digital/social" },
            { name: "Content Agencies", desc: "Digital agencies", href: "/media/digital/agencies" },
            { name: "Brand Marketing", desc: "Corporate marketing", href: "/media/digital/brands" },
            { name: "Influencer Networks", desc: "Creator networks", href: "/media/digital/networks" },
          ],
        },
      ],
    },
    {
      title: "Services",
      icon: Award,
      href: "/services",
      categories: [
        {
          title: "Booking",
          // icon: Calendar,
          items: [
            { name: "One-time Gigs", desc: "Single bookings", href: "/services/booking/onetime" },
            { name: "Long-term Contracts", desc: "Extended partnerships", href: "/services/booking/longterm" },
            { name: "Event Packages", desc: "Complete event solutions", href: "/services/booking/packages" },
            { name: "Recurring Shows", desc: "Regular appearances", href: "/services/booking/recurring" },
          ],
        },
        {
          title: "Management",
          icon: Crown,
          items: [
            { name: "Talent Management", desc: "Career development", href: "/services/management/talent" },
            { name: "Project Management", desc: "End-to-end coordination", href: "/services/management/project" },
            { name: "Brand Partnerships", desc: "Strategic collaborations", href: "/services/management/brand" },
            { name: "Content Strategy", desc: "Creative planning", href: "/services/management/content" },
          ],
        },
      ],
    },
  ]

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              {/* <Music className="w-5 h-5 md:w-6 md:h-6 text-white" /> */}
            </div>
            <span
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              PAYOLA
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                <button
                  className={`flex items-center space-x-1 px-4 py-2 font-medium transition-all duration-300 hover:text-purple-600 rounded-lg ${
                    isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/90 hover:bg-white/10"
                  }`}
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Mega Menu Dropdown */}
                {activeDropdown === item.title && (
                  <div
                    className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 z-50"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {item.categories.map((category) => (
                        <div key={category.title} className="space-y-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                              {/* <category.icon className="w-5 h-5 text-purple-600" /> */}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                          </div>
                          <div className="space-y-3">
                            {category.items.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                              >
                                <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                  {subItem.name}
                                </div>
                                <div className="text-sm text-gray-500">{subItem.desc}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <Button
              variant="ghost"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-gray-700 hover:text-purple-600" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 md:px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 ${isScrolled ? "text-gray-700" : "text-white"}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/20 max-h-screen overflow-y-auto">
            <div className="px-2 pt-4 pb-6 space-y-4">
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <button
                    onClick={() => handleDropdownToggle(item.title)}
                    className="flex items-center justify-between w-full px-3 py-3 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${activeDropdown === item.title ? "rotate-180" : ""}`}
                    />
                  </button>

                  {activeDropdown === item.title && (
                    <div className="pl-4 space-y-3">
                      {item.categories.map((category) => (
                        <div key={category.title} className="space-y-2">
                          <div className="flex items-center space-x-2 px-3 py-2">
                            {/* <category.icon className="w-4 h-4 text-purple-600" /> */}
                            <span className="font-semibold text-gray-900">{category.title}</span>
                          </div>
                          <div className="pl-6 space-y-1">
                            {category.items.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <div className="font-medium">{subItem.name}</div>
                                <div className="text-xs text-gray-500">{subItem.desc}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Login
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
