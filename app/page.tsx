"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Code,
  Rocket,
  CheckCircle,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  User,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Award,
  Coffee,
  Gift,
  Share2,
  Bell,
  MessageCircle,
  Zap,
  Star,
  TrendingUp,
  Globe,
  Wifi,
  Camera,
  Heart,
  Send,
} from "lucide-react"

interface RegistrationData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    university: string
    year: string
    major: string
  }
  teamInfo: {
    teamName: string
    teamSize: number
    teammates: string[]
  }
  preferences: {
    ticketType: "student" | "professional" | "team"
    dietaryRestrictions: string
    tshirtSize: string
    interests: string[]
  }
}

interface LiveStats {
  totalRegistrations: number
  teamsFormed: number
  countriesRepresented: number
  averageAge: number
}

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  avatar?: string
}

const initialData: RegistrationData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    year: "",
    major: "",
  },
  teamInfo: {
    teamName: "",
    teamSize: 1,
    teammates: [],
  },
  preferences: {
    ticketType: "student",
    dietaryRestrictions: "",
    tshirtSize: "M",
    interests: [],
  },
}

const speakers = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer at Google",
    image: "/placeholder.svg?height=200&width=200",
    bio: "AI/ML expert with 8+ years building scalable systems",
    social: { twitter: "@sarahchen", linkedin: "sarahchen" },
    rating: 4.9,
    talks: 12,
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO at TechStart",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Full-stack developer and startup founder",
    social: { twitter: "@marcusdev", github: "marcusrod" },
    rating: 4.8,
    talks: 8,
  },
  {
    name: "Dr. Priya Patel",
    role: "Research Scientist at Meta",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Computer Vision and Deep Learning researcher",
    social: { linkedin: "priyapatel", twitter: "@drpriya" },
    rating: 4.9,
    talks: 15,
  },
]

const schedule = [
  {
    time: "9:00 AM",
    title: "Registration & Breakfast",
    description: "Check-in, networking, and fuel up for the day",
    icon: Coffee,
    live: false,
  },
  {
    time: "10:00 AM",
    title: "Opening Ceremony",
    description: "Welcome address and hackathon kickoff",
    icon: Rocket,
    live: true,
  },
  {
    time: "11:00 AM",
    title: "Team Formation",
    description: "Find your teammates and start brainstorming",
    icon: Users,
    live: false,
  },
  {
    time: "12:00 PM",
    title: "Hacking Begins!",
    description: "24 hours of coding, building, and creating",
    icon: Code,
    live: false,
  },
  {
    time: "6:00 PM",
    title: "Dinner & Networking",
    description: "Refuel and connect with mentors",
    icon: Coffee,
    live: false,
  },
  {
    time: "12:00 PM +1",
    title: "Project Submissions",
    description: "Submit your amazing projects",
    icon: Target,
    live: false,
  },
  {
    time: "2:00 PM +1",
    title: "Judging & Demos",
    description: "Present your projects to judges",
    icon: Trophy,
    live: false,
  },
  {
    time: "4:00 PM +1",
    title: "Awards Ceremony",
    description: "Celebrate winners and wrap up",
    icon: Award,
    live: false,
  },
]

const faqs = [
  {
    question: "Who can participate in TechFest 2025?",
    answer:
      "Students, professionals, and anyone passionate about technology! We welcome all skill levels from beginners to experts.",
  },
  {
    question: "Do I need a team to participate?",
    answer:
      "Not at all! You can register solo and we'll help you find teammates during our team formation session, or you can come with your own team of up to 4 people.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, any hardware you want to use, and your creativity! We'll provide food, drinks, WiFi, and workspace.",
  },
  {
    question: "Are there any costs involved?",
    answer:
      "The event is completely FREE for students! Professional tickets are $25 and include additional networking opportunities and swag.",
  },
  {
    question: "What can I build?",
    answer:
      "Anything! Web apps, mobile apps, hardware projects, AI/ML solutions, games - if it's tech-related, it's fair game. We have multiple prize categories.",
  },
]

const teamSuggestions = [
  {
    name: "Alex Kim",
    skills: ["React", "Node.js", "UI/UX"],
    university: "Stanford University",
    lookingFor: "Backend Developer",
    match: 95,
  },
  {
    name: "Jordan Smith",
    skills: ["Python", "AI/ML", "Data Science"],
    university: "MIT",
    lookingFor: "Frontend Developer",
    match: 88,
  },
  {
    name: "Sam Wilson",
    skills: ["Flutter", "Firebase", "Mobile"],
    university: "UC Berkeley",
    lookingFor: "Full Stack Developer",
    match: 92,
  },
]

export default function EventRegistration() {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(initialData)
  const [currentStep, setCurrentStep] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [showTeamMatcher, setShowTeamMatcher] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      user: "Sarah M.",
      message: "Hey everyone! Super excited for TechFest 2025! 🚀",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      user: "Alex K.",
      message: "Looking for a UI/UX designer for my AI project. Anyone interested?",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: "3",
      user: "Jordan P.",
      message: "First time at a hackathon! Any tips for beginners?",
      timestamp: new Date(Date.now() - 120000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalRegistrations: 347,
    teamsFormed: 89,
    countriesRepresented: 23,
    averageAge: 22,
  })
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [notifications, setNotifications] = useState([
    { id: 1, message: "🎉 New speaker added: Dr. Priya Patel!", time: "2 min ago", read: false },
    { id: 2, message: "⚡ Early bird discount ends in 24 hours!", time: "1 hour ago", read: false },
    { id: 3, message: "🤝 3 new team matching requests", time: "3 hours ago", read: true },
  ])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2025-07-15T09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (difference < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Live stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        totalRegistrations: prev.totalRegistrations + Math.floor(Math.random() * 3),
        teamsFormed: prev.teamsFormed + Math.floor(Math.random() * 2),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showNotifications && !target.closest(".notification-container")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showNotifications])

  const addTeammate = () => {
    if (registrationData.teamInfo.teammates.length < 3) {
      setRegistrationData((prev) => ({
        ...prev,
        teamInfo: {
          ...prev.teamInfo,
          teammates: [...prev.teamInfo.teammates, ""],
          teamSize: prev.teamInfo.teammates.length + 2,
        },
      }))
    }
  }

  const removeTeammate = (index: number) => {
    setRegistrationData((prev) => ({
      ...prev,
      teamInfo: {
        ...prev.teamInfo,
        teammates: prev.teamInfo.teammates.filter((_, i) => i !== index),
        teamSize: prev.teamInfo.teammates.length,
      },
    }))
  }

  const toggleInterest = (interest: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests: prev.preferences.interests.includes(interest)
          ? prev.preferences.interests.filter((i) => i !== interest)
          : [...prev.preferences.interests, interest],
      },
    }))
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: "You",
        message: newMessage,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const generateQRCode = () => {
    const registrationUrl = `https://techfest2025.com/register?ref=${registrationData.personalInfo.email}`
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(registrationUrl)}`
  }

  const shareEvent = async () => {
    const shareData = {
      title: "TechFest 2025 - Join me!",
      text: "I'm attending TechFest 2025! Join me for 24 hours of innovation and coding. 🚀",
      url: "https://techfest2025.com",
    }

    try {
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        setNotifications((prev) => [
          {
            id: Date.now(),
            message: "🎉 Event shared successfully!",
            time: "Just now",
            read: false,
          },
          ...prev,
        ])
      } else {
        // Fallback: Copy to clipboard and show success message
        const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`

        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText)
          setNotifications((prev) => [
            {
              id: Date.now(),
              message: "🎉 Event details copied to clipboard! Share with your friends!",
              time: "Just now",
              read: false,
            },
            ...prev,
          ])
        } else {
          // Ultimate fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = shareText
          textArea.style.position = "fixed"
          textArea.style.left = "-999999px"
          textArea.style.top = "-999999px"
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            document.execCommand("copy")
            setNotifications((prev) => [
              {
                id: Date.now(),
                message: "📋 Event details copied! Paste to share with friends!",
                time: "Just now",
                read: false,
              },
              ...prev,
            ])
          } catch (err) {
            setNotifications((prev) => [
              {
                id: Date.now(),
                message: "❌ Copy failed. Please share manually: https://techfest2025.com",
                time: "Just now",
                read: false,
              },
              ...prev,
            ])
          } finally {
            document.body.removeChild(textArea)
          }
        }
      }
    } catch (error) {
      console.log("Share failed:", error)
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "❌ Sharing failed. Link: https://techfest2025.com",
          time: "Just now",
          read: false,
        },
        ...prev,
      ])
    }
  }

  const handleSubmit = () => {
    // Simulate registration success with confetti effect
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"
    document.body.appendChild(canvas)

    // Simple confetti animation
    setTimeout(() => {
      document.body.removeChild(canvas)
      setShowQRCode(true)
    }, 3000)

    alert("🎉 Registration submitted successfully! Check your email for confirmation and your digital ticket!")
    console.log("Registration data:", registrationData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x * 0.005}px`,
            bottom: `${mousePosition.y * 0.005}px`,
            transform: "translate(50%, 50%)",
          }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-50 space-y-3">
        <Button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => setShowTeamMatcher(!showTeamMatcher)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Users className="w-6 h-6" />
        </Button>
        <Button
          onClick={shareEvent}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative group"
        >
          <Share2 className="w-6 h-6" />
          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Share Event
          </div>
        </Button>
      </div>

      {/* Live Chat Panel */}
      {showChat && (
        <div className="fixed right-6 bottom-24 w-80 h-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 z-40 flex flex-col">
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Chat
              </h3>
              <Button
                onClick={() => setShowChat(false)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                ×
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-xs text-white">
                    {msg.user[0]}
                  </div>
                  <span className="text-sm font-medium text-white">{msg.user}</span>
                  <span className="text-xs text-gray-400">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-gray-300 ml-8">{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Team Matcher Panel */}
      {showTeamMatcher && (
        <div className="fixed right-6 bottom-24 w-80 h-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 z-40 flex flex-col">
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                AI Team Matcher
              </h3>
              <Button
                onClick={() => setShowTeamMatcher(false)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                ×
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {teamSuggestions.map((suggestion, index) => (
              <Card key={index} className="bg-white/10 border-white/20 p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white">{suggestion.name}</h4>
                    <p className="text-xs text-gray-400">{suggestion.university}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-yellow-400">{suggestion.match}%</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {suggestion.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs border-blue-400 text-blue-400">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-300 mb-2">Looking for: {suggestion.lookingFor}</p>
                <Button size="sm" className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center max-w-sm">
            <CardContent className="space-y-4">
              <div className="w-48 h-48 bg-white rounded-lg p-4 mx-auto">
                <img
                  src={generateQRCode() || "/placeholder.svg"}
                  alt="Registration QR Code"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-white">Your Digital Ticket</h3>
              <p className="text-gray-300">Show this QR code at the event entrance</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowQRCode(false)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Close
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={async () => {
                    try {
                      // Create a canvas to draw the QR code and ticket info
                      const canvas = document.createElement("canvas")
                      const ctx = canvas.getContext("2d")
                      canvas.width = 400
                      canvas.height = 600

                      if (ctx) {
                        // Background
                        const gradient = ctx.createLinearGradient(0, 0, 400, 600)
                        gradient.addColorStop(0, "#1e293b")
                        gradient.addColorStop(1, "#7c3aed")
                        ctx.fillStyle = gradient
                        ctx.fillRect(0, 0, 400, 600)

                        // Title
                        ctx.fillStyle = "white"
                        ctx.font = "bold 24px Arial"
                        ctx.textAlign = "center"
                        ctx.fillText("TechFest 2025", 200, 50)
                        ctx.fillText("Digital Ticket", 200, 80)

                        // User info
                        ctx.font = "16px Arial"
                        ctx.fillText(
                          `${registrationData.personalInfo.firstName} ${registrationData.personalInfo.lastName}`,
                          200,
                          120,
                        )
                        ctx.fillText(registrationData.personalInfo.email, 200, 145)
                        ctx.fillText("July 15-16, 2025", 200, 170)

                        // QR Code area
                        ctx.fillStyle = "white"
                        ctx.fillRect(100, 200, 200, 200)

                        // Load and draw QR code
                        const qrImg = new Image()
                        qrImg.crossOrigin = "anonymous"
                        qrImg.onload = () => {
                          ctx.drawImage(qrImg, 110, 210, 180, 180)

                          // Instructions
                          ctx.fillStyle = "white"
                          ctx.font = "14px Arial"
                          ctx.fillText("Show this QR code at event entrance", 200, 440)
                          ctx.fillText("Tech Innovation Center", 200, 460)
                          ctx.fillText("123 Innovation Drive, SF", 200, 480)

                          // Download the image
                          canvas.toBlob((blob) => {
                            if (blob) {
                              const url = URL.createObjectURL(blob)
                              const a = document.createElement("a")
                              a.href = url
                              a.download = `TechFest2025-Ticket-${registrationData.personalInfo.firstName}.png`
                              document.body.appendChild(a)
                              a.click()
                              document.body.removeChild(a)
                              URL.revokeObjectURL(url)

                              // Show success notification
                              setNotifications((prev) => [
                                {
                                  id: Date.now(),
                                  message: "🎫 Digital ticket saved successfully!",
                                  time: "Just now",
                                  read: false,
                                },
                                ...prev,
                              ])
                            }
                          }, "image/png")
                        }
                        qrImg.src = generateQRCode()
                      }
                    } catch (error) {
                      console.error("Save failed:", error)
                      // Fallback: just save the QR code
                      const a = document.createElement("a")
                      a.href = generateQRCode()
                      a.download = `TechFest2025-QR-${registrationData.personalInfo.firstName}.png`
                      a.click()

                      setNotifications((prev) => [
                        {
                          id: Date.now(),
                          message: "📱 QR code saved! Create your ticket manually.",
                          time: "Just now",
                          read: false,
                        },
                        ...prev,
                      ])
                    }
                  }}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification Bell */}
      <div className="fixed top-6 right-6 z-40 notification-container">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 bg-white/10 backdrop-blur-sm"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-4 h-4" />
            {notifications.filter((n) => !n.read).length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">{notifications.filter((n) => !n.read).length}</span>
              </div>
            )}
          </Button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-12 right-0 w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Notifications</h3>
                <Button
                  onClick={() => {
                    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-blue-400 hover:bg-white/10 text-xs"
                >
                  Mark all read
                </Button>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    notification.read
                      ? "bg-white/5 border-white/10"
                      : "bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/20"
                  }`}
                  onClick={() => {
                    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
                  }}
                >
                  <p className="text-white text-sm">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">July 15-16, 2025</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-pulse">
              TechFest
              <span className="block text-4xl md:text-6xl mt-2">2025</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              24 hours of innovation, coding, and creativity. Join 500+ developers, designers, and entrepreneurs for the
              biggest tech event of the year.
            </p>

            {/* Live Stats Banner */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400 font-medium">LIVE STATS</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                    {liveStats.totalRegistrations}
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-sm text-gray-400">Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{liveStats.teamsFormed}</div>
                  <div className="text-sm text-gray-400">Teams Formed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{liveStats.countriesRepresented}</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{liveStats.averageAge}</div>
                  <div className="text-sm text-gray-400">Avg Age</div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">{value.toString().padStart(2, "0")}</div>
                  <div className="text-sm text-gray-300">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })}
              >
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Schedule
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { icon: Users, label: "Participants", value: "500+", color: "text-blue-400" },
                { icon: Trophy, label: "Prize Pool", value: "$50K", color: "text-yellow-400" },
                { icon: Code, label: "Projects", value: "100+", color: "text-green-400" },
                { icon: Clock, label: "Hours", value: "24", color: "text-purple-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="text-center group">
                  <Icon
                    className={`w-8 h-8 ${color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Details</h2>
            <p className="text-xl text-gray-300">Everything you need to know about TechFest 2025</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  When
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">July 15-16, 2025</p>
                <p className="text-gray-300">9:00 AM - 4:00 PM (Next Day)</p>
                <p className="text-gray-300">24 hours of non-stop hacking!</p>
                <div className="mt-3 flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Live streaming available</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  Where
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Tech Innovation Center</p>
                <p className="text-gray-300">123 Innovation Drive</p>
                <p className="text-gray-300">San Francisco, CA 94105</p>
                <div className="mt-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Hybrid event - Join remotely too!</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Gift className="w-6 h-6 text-green-400" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Meals & Snacks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Swag & T-shirt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Networking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Digital Certificate</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Schedule</h2>
            <p className="text-xl text-gray-300">Your 24-hour journey to innovation</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {schedule.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  {index < schedule.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-blue-600 to-purple-600 mx-auto mt-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-blue-400 font-semibold">{item.time}</span>
                      <Badge variant="outline" className="border-purple-400 text-purple-400">
                        {index < 4 ? "Day 1" : "Day 2"}
                      </Badge>
                      {item.live && (
                        <Badge className="bg-red-500 text-white animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Speakers */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Speakers</h2>
            <p className="text-xl text-gray-300">Learn from industry leaders and innovators</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
                  <User className="w-24 h-24 text-white/50 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-white">{speaker.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
                  <p className="text-blue-400 mb-2">{speaker.role}</p>
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                    <span>{speaker.talks} talks</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      <span>4.2k</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{speaker.bio}</p>
                  <div className="flex gap-3">
                    {speaker.social.twitter && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-transform duration-300"
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                    )}
                    {speaker.social.linkedin && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-transform duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    )}
                    {speaker.social.github && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-transform duration-300"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Register Now</h2>
            <p className="text-xl text-gray-300">Secure your spot at TechFest 2025</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Registration Form</CardTitle>
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      step <= currentStep ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                  <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={registrationData.personalInfo.firstName}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, firstName: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={registrationData.personalInfo.lastName}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={registrationData.personalInfo.email}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={registrationData.personalInfo.phone}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="university" className="text-white">
                        University/Company
                      </Label>
                      <Input
                        id="university"
                        value={registrationData.personalInfo.university}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, university: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year" className="text-white">
                        Year/Experience
                      </Label>
                      <Input
                        id="year"
                        value={registrationData.personalInfo.year}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, year: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="major" className="text-white">
                        Major/Role
                      </Label>
                      <Input
                        id="major"
                        value={registrationData.personalInfo.major}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, major: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                  <h3 className="text-xl font-semibold text-white">Team Information</h3>
                  <div>
                    <Label htmlFor="teamName" className="text-white">
                      Team Name (Optional)
                    </Label>
                    <Input
                      id="teamName"
                      value={registrationData.teamInfo.teamName}
                      onChange={(e) =>
                        setRegistrationData((prev) => ({
                          ...prev,
                          teamInfo: { ...prev.teamInfo, teamName: e.target.value },
                        }))
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Leave blank if registering solo"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Teammates (Optional)</Label>
                    <p className="text-sm text-gray-400 mb-3">Add your teammates' email addresses</p>
                    {registrationData.teamInfo.teammates.map((teammate, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={teammate}
                          onChange={(e) => {
                            const newTeammates = [...registrationData.teamInfo.teammates]
                            newTeammates[index] = e.target.value
                            setRegistrationData((prev) => ({
                              ...prev,
                              teamInfo: { ...prev.teamInfo, teammates: newTeammates },
                            }))
                          }}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="teammate@email.com"
                        />
                        <Button
                          onClick={() => removeTeammate(index)}
                          size="sm"
                          variant="outline"
                          className="border-red-400 text-red-400 hover:bg-red-400/10 hover:scale-110 transition-all duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {registrationData.teamInfo.teammates.length < 3 && (
                      <Button
                        onClick={addTeammate}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Teammate
                      </Button>
                    )}
                  </div>

                  {/* AI Team Suggestions */}
                  <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-4 border border-blue-400/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-white">AI Team Suggestions</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      Based on your interests, here are some potential teammates:
                    </p>
                    <div className="space-y-2">
                      {teamSuggestions.slice(0, 2).map((suggestion, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                          <div>
                            <span className="text-sm text-white font-medium">{suggestion.name}</span>
                            <div className="flex gap-1 mt-1">
                              {suggestion.skills.slice(0, 2).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs border-blue-400 text-blue-400">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 text-xs">
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                  <h3 className="text-xl font-semibold text-white">Preferences</h3>

                  <div>
                    <Label className="text-white">Ticket Type</Label>
                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                      {[
                        {
                          id: "student",
                          label: "Student",
                          price: "FREE",
                          description: "For current students",
                          popular: true,
                        },
                        {
                          id: "professional",
                          label: "Professional",
                          price: "$25",
                          description: "For working professionals",
                          popular: false,
                        },
                        {
                          id: "team",
                          label: "Team (4 people)",
                          price: "$80",
                          description: "Save with team registration",
                          popular: false,
                        },
                      ].map((ticket) => (
                        <Card
                          key={ticket.id}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                            registrationData.preferences.ticketType === ticket.id
                              ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400 shadow-lg"
                              : "bg-white/10 border-white/20 hover:bg-white/15"
                          }`}
                          onClick={() =>
                            setRegistrationData((prev) => ({
                              ...prev,
                              preferences: { ...prev.preferences, ticketType: ticket.id as any },
                            }))
                          }
                        >
                          {ticket.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                POPULAR
                              </Badge>
                            </div>
                          )}
                          <CardContent className="p-4 text-center">
                            <h4 className="font-semibold text-white">{ticket.label}</h4>
                            <p className="text-2xl font-bold text-blue-400">{ticket.price}</p>
                            <p className="text-sm text-gray-300">{ticket.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tshirtSize" className="text-white">
                        T-shirt Size
                      </Label>
                      <select
                        id="tshirtSize"
                        value={registrationData.preferences.tshirtSize}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, tshirtSize: e.target.value },
                          }))
                        }
                        className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="dietary" className="text-white">
                        Dietary Restrictions
                      </Label>
                      <Input
                        id="dietary"
                        value={registrationData.preferences.dietaryRestrictions}
                        onChange={(e) =>
                          setRegistrationData((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, dietaryRestrictions: e.target.value },
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        placeholder="None, Vegetarian, Vegan, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Interests (Select all that apply)</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        "Web Development",
                        "Mobile Apps",
                        "AI/ML",
                        "Blockchain",
                        "IoT",
                        "Game Development",
                        "Cybersecurity",
                        "Data Science",
                      ].map((interest) => (
                        <Badge
                          key={interest}
                          variant={registrationData.preferences.interests.includes(interest) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            registrationData.preferences.interests.includes(interest)
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "border-white/20 text-white hover:bg-white/10"
                          }`}
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >
                    Previous
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ml-auto hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 ml-auto hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Complete Registration
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Got questions? We've got answers!</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <CardTitle className="flex items-center justify-between text-white">
                    {faq.question}
                    <div className="transform transition-transform duration-300">
                      {expandedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CardTitle>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="animate-in slide-in-from-top duration-300">
                    <p className="text-gray-300">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">TechFest 2025</h3>
              <p className="text-gray-300">The ultimate hackathon experience for innovators and creators.</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Live event updates</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="#schedule"
                  className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 duration-300"
                >
                  Schedule
                </a>
                <a
                  href="#registration"
                  className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 duration-300"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 duration-300"
                >
                  Sponsors
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>hello@techfest2025.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent hover:scale-110 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-white/20" />
          <div className="text-center text-gray-400">
            <p>&copy; 2025 TechFest. All rights reserved. Built with ❤️ for the developer community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
