"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, MapPin, CreditCard, Shield, CheckCircle, Users, Building } from "lucide-react"
import { format, addDays, isSameDay, isAfter, isBefore } from "date-fns"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  talent: {
    id: number
    name: string
    title: string
    avatar: string
    rate: string
    hourlyRate: number
    availability: string
    location: string
    rating: number
    reviews: number
    responseTime: string
    genres: string[]
    equipment: string[]
  }
}

interface TimeSlot {
  time: string
  available: boolean
  price?: number
}

interface BookingDetails {
  date: Date | null
  timeSlot: string
  duration: number
  eventType: string
  location: string
  isRemote: boolean
  description: string
  specialRequirements: string
  equipmentNeeded: string[]
  guestCount: number
  budget: number
}

export function BookingModal({ isOpen, onClose, talent }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: null,
    timeSlot: "",
    duration: 2,
    eventType: "",
    location: "",
    isRemote: false,
    description: "",
    specialRequirements: "",
    equipmentNeeded: [],
    guestCount: 50,
    budget: 0,
  })
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [totalCost, setTotalCost] = useState(0)

  // Mock unavailable dates (would come from API)
  const unavailableDates = [new Date(2024, 1, 15), new Date(2024, 1, 20), new Date(2024, 1, 25)]

  // Mock available time slots for selected date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const basePrice = talent.hourlyRate

    // Morning slots (9 AM - 12 PM)
    for (let hour = 9; hour <= 11; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.3,
        price: basePrice,
      })
    }

    // Afternoon slots (1 PM - 5 PM)
    for (let hour = 13; hour <= 17; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.2,
        price: basePrice,
      })
    }

    // Evening slots (6 PM - 11 PM) - Premium pricing
    for (let hour = 18; hour <= 23; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.4,
        price: Math.round(basePrice * 1.2),
      })
    }

    return slots
  }

  const eventTypes = [
    { value: "wedding", label: "Wedding", icon: "💒" },
    { value: "corporate", label: "Corporate Event", icon: "🏢" },
    { value: "birthday", label: "Birthday Party", icon: "🎂" },
    { value: "club", label: "Club/Nightlife", icon: "🎵" },
    { value: "radio", label: "Radio Show", icon: "📻" },
    { value: "tv", label: "TV/Streaming", icon: "📺" },
    { value: "podcast", label: "Podcast", icon: "🎙️" },
    { value: "festival", label: "Festival", icon: "🎪" },
    { value: "private", label: "Private Party", icon: "🎉" },
    { value: "other", label: "Other", icon: "📝" },
  ]

  const durations = [
    { value: 1, label: "1 hour", multiplier: 1 },
    { value: 2, label: "2 hours", multiplier: 1.8 },
    { value: 3, label: "3 hours", multiplier: 2.5 },
    { value: 4, label: "4 hours", multiplier: 3.2 },
    { value: 6, label: "6 hours", multiplier: 4.5 },
    { value: 8, label: "8+ hours", multiplier: 6 },
  ]

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(generateTimeSlots(selectedDate))
      setBookingDetails((prev) => ({ ...prev, date: selectedDate }))
    }
  }, [selectedDate])

  useEffect(() => {
    // Calculate total cost
    const baseRate = talent.hourlyRate
    const duration = bookingDetails.duration
    const durationMultiplier = durations.find((d) => d.value === duration)?.multiplier || 1
    const selectedSlot = availableSlots.find((slot) => slot.time === bookingDetails.timeSlot)
    const slotPrice = selectedSlot?.price || baseRate

    let cost = slotPrice * durationMultiplier

    // Add premium for certain event types
    if (["wedding", "corporate", "festival"].includes(bookingDetails.eventType)) {
      cost *= 1.15
    }

    // Add travel fee if not remote and outside local area
    if (
      !bookingDetails.isRemote &&
      bookingDetails.location &&
      !bookingDetails.location.includes(talent.location.split(",")[0])
    ) {
      cost += 100 // Travel fee
    }

    setTotalCost(Math.round(cost))
    setBookingDetails((prev) => ({ ...prev, budget: Math.round(cost) }))
  }, [
    bookingDetails.timeSlot,
    bookingDetails.duration,
    bookingDetails.eventType,
    bookingDetails.isRemote,
    bookingDetails.location,
  ])

  const isDateUnavailable = (date: Date) => {
    return (
      unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate)) ||
      isBefore(date, new Date()) ||
      isAfter(date, addDays(new Date(), 90))
    ) // Only allow booking up to 90 days in advance
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBookingSubmit = async () => {
    // Here you would integrate with your booking API
    const bookingData = {
      talentId: talent.id,
      clientInfo,
      bookingDetails,
      totalCost,
      paymentMethod,
      status: "pending",
    }

    console.log("Booking submitted:", bookingData)

    // Show success message and close modal
    alert("Booking request submitted successfully! You will receive a confirmation email shortly.")
    onClose()
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedDate && bookingDetails.timeSlot && bookingDetails.duration && bookingDetails.eventType
      case 2:
        return bookingDetails.description && (bookingDetails.isRemote || bookingDetails.location)
      case 3:
        return clientInfo.name && clientInfo.email && clientInfo.phone
      case 4:
        return paymentMethod
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
              <AvatarFallback>
                {talent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Book {talent.name}</h2>
              <p className="text-gray-600">{talent.title}</p>
            </div>
          </DialogTitle>
          <DialogDescription>Complete the booking process in {4} simple steps</DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-purple-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Date & Time Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Select Date & Time</h3>
                <p className="text-gray-600">Choose your preferred date and time slot</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Available Dates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateUnavailable}
                      className="rounded-md border"
                    />
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span>Unavailable</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Time Slots & Details */}
                <div className="space-y-4">
                  {selectedDate && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Available Times - {format(selectedDate, "MMMM d, yyyy")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot.time}
                              onClick={() => setBookingDetails((prev) => ({ ...prev, timeSlot: slot.time }))}
                              disabled={!slot.available}
                              className={`p-3 rounded-lg border text-sm transition-colors ${
                                bookingDetails.timeSlot === slot.time
                                  ? "border-purple-600 bg-purple-50 text-purple-700"
                                  : slot.available
                                    ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              <div className="font-medium">{slot.time}</div>
                              {slot.available && <div className="text-xs text-gray-500">${slot.price}/hr</div>}
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Duration & Event Type */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <Select
                        value={bookingDetails.duration.toString()}
                        onValueChange={(value) =>
                          setBookingDetails((prev) => ({ ...prev, duration: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map((duration) => (
                            <SelectItem key={duration.value} value={duration.value.toString()}>
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                      <Select
                        value={bookingDetails.eventType}
                        onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, eventType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <span className="flex items-center space-x-2">
                                <span>{type.icon}</span>
                                <span>{type.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                <p className="text-gray-600">Tell us more about your event</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
                    <textarea
                      rows={4}
                      value={bookingDetails.description}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your event, audience, and what you're looking for..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <textarea
                      rows={3}
                      value={bookingDetails.specialRequirements}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, specialRequirements: e.target.value }))}
                      placeholder="Any special requests, song preferences, or specific requirements..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Guest Count</label>
                    <Select
                      value={bookingDetails.guestCount.toString()}
                      onValueChange={(value) =>
                        setBookingDetails((prev) => ({ ...prev, guestCount: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">1-25 guests</SelectItem>
                        <SelectItem value="50">26-50 guests</SelectItem>
                        <SelectItem value="100">51-100 guests</SelectItem>
                        <SelectItem value="200">101-200 guests</SelectItem>
                        <SelectItem value="500">201-500 guests</SelectItem>
                        <SelectItem value="1000">500+ guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        id="isRemote"
                        checked={bookingDetails.isRemote}
                        onChange={(e) => setBookingDetails((prev) => ({ ...prev, isRemote: e.target.checked }))}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="isRemote" className="text-sm font-medium text-gray-700">
                        This is a remote/virtual event
                      </label>
                    </div>
                  </div>

                  {!bookingDetails.isRemote && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Location *</label>
                      <input
                        type="text"
                        value={bookingDetails.location}
                        onChange={(e) => setBookingDetails((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter venue address or location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needed</label>
                    <div className="space-y-2">
                      {talent.equipment.slice(0, 4).map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={item}
                            checked={bookingDetails.equipmentNeeded.includes(item)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBookingDetails((prev) => ({
                                  ...prev,
                                  equipmentNeeded: [...prev.equipmentNeeded, item],
                                }))
                              } else {
                                setBookingDetails((prev) => ({
                                  ...prev,
                                  equipmentNeeded: prev.equipmentNeeded.filter((eq) => eq !== item),
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor={item} className="text-sm text-gray-700">
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p className="text-gray-600">We'll use this to coordinate your booking</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                    <input
                      type="text"
                      value={clientInfo.company}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Company name (optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                    <input
                      type="text"
                      value={clientInfo.role}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, role: e.target.value }))}
                      placeholder="Event planner, bride, manager, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Privacy Protected</h4>
                          <p className="text-sm text-blue-700">
                            Your information is secure and will only be shared with the talent for booking coordination.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Review & Payment</h3>
                <p className="text-gray-600">Review your booking details and complete payment</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                        <AvatarFallback>
                          {talent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{talent.name}</h4>
                        <p className="text-sm text-gray-600">{talent.title}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <span>{selectedDate && format(selectedDate, "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>
                          {bookingDetails.timeSlot} ({bookingDetails.duration} hours)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{bookingDetails.isRemote ? "Remote/Virtual" : bookingDetails.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>
                          {eventTypes.find((t) => t.value === bookingDetails.eventType)?.label} •{" "}
                          {bookingDetails.guestCount} guests
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Cost</span>
                        <span className="text-purple-600">${totalCost}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Includes all fees • 50% due now, 50% after event</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          <span>Credit/Debit Card</span>
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="bank"
                          name="payment"
                          value="bank"
                          checked={paymentMethod === "bank"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="bank" className="flex items-center space-x-2 cursor-pointer">
                          <Building className="w-4 h-4" />
                          <span>Bank Transfer</span>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-3 pt-4 border-t">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Secure Payment</h4>
                            <p className="text-sm text-green-700">
                              Your payment is protected by our secure payment system. Money is held in escrow until the
                              event is completed.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Typical response time: {talent.responseTime}</span>
          </div>

          <div className="flex space-x-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevStep} className="bg-transparent">
                Previous
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleBookingSubmit}
                disabled={!canProceedToNext()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Complete Booking (${Math.round(totalCost / 2)} now)
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

