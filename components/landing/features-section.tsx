"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Shield, Zap, Users, TrendingUp, Music, Radio, Star } from "lucide-react"

export function FeaturesSection() {
  const talentFeatures = [
    {
      icon: Calendar,
      title: "Smart Booking",
      description: "AI-powered matching with media opportunities that fit your style and schedule",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: DollarSign,
      title: "Fair Pricing",
      description: "Set your rates, negotiate terms, and get paid securely through our platform",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Build your portfolio, gain reviews, and access premium opportunities",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Verified clients, secure payments, and professional dispute resolution",
      color: "from-orange-500 to-red-500",
    },
  ]

  const mediaFeatures = [
    {
      icon: Users,
      title: "Talent Discovery",
      description: "Access thousands of verified DJs, MCs, artists, and influencers",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Quick Booking",
      description: "Find and book talent in minutes with our streamlined process",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Review system and verified profiles ensure professional standards",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: "Risk-Free",
      description: "Secure payments, contracts, and 24/7 support for peace of mind",
      color: "from-teal-500 to-green-500",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            ✨ Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a talented creator or a media company, PAYOLA provides the tools you need to succeed
          </p>
        </div>

        {/* For Talents */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">For Talents</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {talentFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* For Media Owners */}
        <div>
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">For Media Owners</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
