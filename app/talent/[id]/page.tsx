"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Clock,
  Play,
  Heart,
  Share2,
  Calendar,
  Award,
  Users,
  TrendingUp,
  Music,
  Mic,
  Camera,
  Radio,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Eye,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import { getTalentProfile, type TalentProfile } from "@/lib/talent-data"

export default function TalentProfilePage({ params }: { params: { id: string } }) {
  const [talent, setTalent] = useState<TalentProfile | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLiked, setIsLiked] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const talentData = getTalentProfile(params.id)
    setTalent(talentData)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!talent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Talent Not Found</h1>
          <p className="text-gray-600 mb-6">The talent profile you're looking for doesn't exist.</p>
          <Link href="/landing">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "dj":
        return Music
      case "mc":
        return Mic
      case "artist":
        return Star
      case "influencer":
        return Camera
      case "radio":
        return Radio
      default:
        return Music
    }
  }

  const CategoryIcon = getCategoryIcon(talent.category)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img src={talent.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/landing">
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30">
              ← Back
            </Button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`bg-white/10 backdrop-blur-sm border-white/30 ${isLiked ? "text-red-400" : "text-white"}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm text-white border-white/30">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-lg">
              <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
              <AvatarFallback>
                {talent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl md:text-4xl font-bold">{talent.name}</h1>
                {talent.verified && <CheckCircle className="w-6 h-6 text-blue-400" />}
              </div>
              <p className="text-lg md:text-xl text-gray-200 mb-2">{talent.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{talent.rating}</span>
                  <span className="text-gray-300">({talent.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{talent.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CategoryIcon className="w-4 h-4" />
                  <span className="capitalize">{talent.category}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-white">{talent.rate}</div>
                <Badge
                  className={`${talent.availability === "Available" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {talent.availability}
                </Badge>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold"
                onClick={() => setShowBookingModal(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 h-12 bg-white shadow-sm">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>About</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{talent.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                        <p className="text-gray-600">{talent.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {talent.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Key Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {talent.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Skills & Genres */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {talent.skills.map((skill, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Genres</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {talent.genres.map((genre, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Equipment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {talent.equipment.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {talent.portfolio.map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                          <div className="relative overflow-hidden rounded-lg mb-3">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Play className="w-12 h-12 text-white" />
                            </div>
                            {item.duration && (
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {item.duration}
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{item.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{item.likes.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {talent.reviews_data.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.client} />
                              <AvatarFallback>{review.client[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{review.client}</h4>
                                  <p className="text-sm text-gray-500">{review.project}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center space-x-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Contact Methods</h4>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Call
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Inquiry
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Social Media</h4>
                        <div className="space-y-3">
                          {talent.socialMedia.instagram && (
                            <a
                              href={`https://instagram.com/${talent.socialMedia.instagram}`}
                              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                            >
                              <Instagram className="w-4 h-4" />
                              <span>{talent.socialMedia.instagram}</span>
                            </a>
                          )}
                          {talent.socialMedia.twitter && (
                            <a
                              href={`https://twitter.com/${talent.socialMedia.twitter}`}
                              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                            >
                              <Twitter className="w-4 h-4" />
                              <span>{talent.socialMedia.twitter}</span>
                            </a>
                          )}
                          {talent.socialMedia.youtube && (
                            <a
                              href={`https://youtube.com/${talent.socialMedia.youtube}`}
                              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                            >
                              <Youtube className="w-4 h-4" />
                              <span>{talent.socialMedia.youtube}</span>
                            </a>
                          )}
                          {talent.socialMedia.website && (
                            <a
                              href={`https://${talent.socialMedia.website}`}
                              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              <span>{talent.socialMedia.website}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{talent.stats.totalBookings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Repeat Clients</span>
                  <span className="font-semibold">{talent.stats.repeatClients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{talent.stats.responseTime}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold">{talent.stats.completionRate}%</span>
                  </div>
                  <Progress value={talent.stats.completionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Book This Talent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{talent.rate}</div>
                  <Badge
                    className={`${
                      talent.availability === "Available" ? "bg-green-500" : "bg-yellow-500"
                    } text-white mb-4`}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {talent.availability}
                  </Badge>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => setShowBookingModal(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">or</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">Secure booking with payment protection</p>
                </div>
              </CardContent>
            </Card>

            {/* Similar Talents */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Talents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Link key={i} href={`/talent/${i === 1 ? "2" : i === 2 ? "3" : "4"}`}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={`Talent ${i}`} />
                        <AvatarFallback>T{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {i === 1 ? "MC Phoenix" : i === 2 ? "Luna Vocals" : "Alex Rivera"}
                        </h4>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>4.{8 + i}</span>
                          <span>•</span>
                          <span>${200 + i * 50}/hr</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Book {talent.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                  <AvatarFallback>
                    {talent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{talent.name}</h3>
                <p className="text-gray-600">{talent.title}</p>
                <div className="text-2xl font-bold text-purple-600 mt-2">{talent.rate}</div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                    <option>4+ hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <input
                    type="text"
                    placeholder="e.g., Wedding, Corporate Event, Radio Show"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your event..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowBookingModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Send Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
