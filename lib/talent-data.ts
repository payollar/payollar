export interface TalentProfile {
  id: number
  name: string
  title: string
  category: string
  image: string
  avatar: string
  coverImage: string
  rating: number
  reviews: number
  location: string
  rate: string
  availability: string
  verified: boolean
  description: string
  achievements: string[]
  genres: string[]
  skills: string[]
  equipment: string[]
  experience: string
  languages: string[]
  socialMedia: {
    instagram?: string
    twitter?: string
    youtube?: string
    website?: string
  }
  portfolio: Array<{
    id: number
    title: string
    type: string
    thumbnail: string
    views: number
    likes: number
    duration?: string
  }>
  reviews_data: Array<{
    id: number
    client: string
    avatar: string
    rating: number
    comment: string
    date: string
    project: string
  }>
  stats: {
    totalBookings: number
    repeatClients: number
    responseTime: string
    completionRate: number
  }
}

export const talentProfiles: Record<string, TalentProfile> = {
  "1": {
    id: 1,
    name: "Odeal",
    title: "British Artist",
    category: "dj",
    image: "/images/about-hero.jpg",
    avatar: "/images/about-hero.jpg",
    coverImage: "/images/about-hero.jpg",
    rating: 4.9,
    reviews: 234,
    location: "Los Angeles, CA",
    rate: "$300/hour",
    availability: "Available",
    verified: true,
    description:
      "Award-winning DJ and producer with over 10 years of experience in electronic music. Specializing in house, techno, and progressive genres with a unique sound that has captivated audiences worldwide. Grammy-nominated for Best Electronic Album 2023.",
    achievements: [
      "Grammy Nomination 2023 - Best Electronic Album",
      "Billboard Top 100 Producer",
      "500M+ Streams Across Platforms",
      "Headlined Coachella 2022",
      "Resident DJ at Omnia Las Vegas",
    ],
    genres: ["Electronic", "House", "Techno", "Progressive", "Deep House"],
    skills: [
      "Live DJ Performance",
      "Music Production",
      "Sound Engineering",
      "Crowd Reading",
      "Equipment Setup",
      "Mixing & Mastering",
    ],
    equipment: [
      "Pioneer CDJ-3000 (x2)",
      "Pioneer DJM-900NXS2 Mixer",
      "Technics SL-1200MK7 Turntables",
      "KRK Rokit 8 Monitors",
      "Shure SM58 Microphones",
      "Full Lighting Rig",
    ],
    experience: "10+ years",
    languages: ["English", "Spanish", "French"],
    socialMedia: {
      instagram: "@djstellar",
      twitter: "@djstellar_music",
      youtube: "DJStellarOfficial",
      website: "djstellar.com",
    },
    portfolio: [
      {
        id: 1,
        title: "Coachella 2022 Main Stage Set",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 2500000,
        likes: 45000,
        duration: "1:32:45",
      },
      {
        id: 2,
        title: "Stellar Nights EP - Preview",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 890000,
        likes: 23000,
        duration: "4:32",
      },
      {
        id: 3,
        title: "Behind the Scenes - Studio Session",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 156000,
        likes: 8900,
        duration: "12:15",
      },
      {
        id: 4,
        title: "Remix Pack Vol. 3",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 445000,
        likes: 15600,
        duration: "6:45",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "StreamTV Network",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "DJ Stellar absolutely killed it at our New Year's Eve broadcast! Professional, punctual, and the crowd went wild. Will definitely book again.",
        date: "2 weeks ago",
        project: "New Year's Eve Special",
      },
      {
        id: 2,
        client: "RadioWave FM",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Incredible talent and so easy to work with. The mix he created for our morning show became our most popular segment ever!",
        date: "1 month ago",
        project: "Morning Show Mix",
      },
      {
        id: 3,
        client: "Digital Media Co",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment:
          "Great energy and fantastic music selection. Only minor issue was setup time, but the performance more than made up for it.",
        date: "2 months ago",
        project: "Brand Launch Event",
      },
    ],
    stats: {
      totalBookings: 156,
      repeatClients: 89,
      responseTime: "< 2 hours",
      completionRate: 98,
    },
  },
  "2": {
    id: 2,
    name: "King promise",
    title: "Award-Winning Ghanaian artist",
    category: "artist",
    image: "/images/kingp.jpg",
    avatar: "/images/kingp.jpg",
    coverImage: "/images/kingp.jpg",
    rating: 4.8,
    reviews: 189,
    location: "New York, NY",
    rate: "$250/hour",
    availability: "Available",
    verified: true,
    description:
      "Dynamic MC and event host with experience in major TV networks and live events. Known for engaging audiences and creating memorable experiences. Emmy Award winner with over 8 years in the entertainment industry.",
    achievements: [
      "Emmy Award Winner 2022",
      "500+ Events Hosted",
      "National TV Appearances",
      "Corporate Event Specialist",
      "Celebrity Interview Expert",
    ],
    genres: ["Live Events", "TV Hosting", "Corporate", "Award Shows", "Interviews"],
    skills: [
      "Live Event Hosting",
      "Crowd Engagement",
      "Improvisation",
      "Public Speaking",
      "Interview Techniques",
      "Script Writing",
    ],
    equipment: [
      "Wireless Microphone System",
      "Portable PA System",
      "Teleprompter",
      "Professional Lighting",
      "Backup Audio Equipment",
      "Stage Monitors",
    ],
    experience: "8+ years",
    languages: ["English", "Spanish"],
    socialMedia: {
      instagram: "@mcphoenix",
      twitter: "@phoenix_mc",
      youtube: "MCPhoenixOfficial",
      website: "mcphoenix.com",
    },
    portfolio: [
      {
        id: 1,
        title: "Emmy Awards 2022 - Opening Monologue",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 1200000,
        likes: 28000,
        duration: "8:45",
      },
      {
        id: 2,
        title: "Corporate Event Highlights Reel",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 450000,
        likes: 12000,
        duration: "5:30",
      },
      {
        id: 3,
        title: "Celebrity Interview - Behind the Scenes",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 890000,
        likes: 19000,
        duration: "15:20",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Fortune 500 Corp",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "MC Phoenix made our annual conference unforgettable. Professional, engaging, and kept the energy high throughout the entire event.",
        date: "1 week ago",
        project: "Annual Conference",
      },
      {
        id: 2,
        client: "Entertainment Tonight",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Fantastic interviewer with great instincts. Made our celebrity guests feel comfortable and delivered great content.",
        date: "3 weeks ago",
        project: "Celebrity Interview Special",
      },
    ],
    stats: {
      totalBookings: 234,
      repeatClients: 156,
      responseTime: "< 1 hour",
      completionRate: 96,
    },
  },
  "3": {
    id: 3,
    name: "Russ",
    title: "Platinum Recording Artist",
    category: "dj",
    image: "/images/russ.jpg",
    avatar: "/images/russ.jpg",
    coverImage: "/images/russ.jpg",
    rating: 5.0,
    reviews: 156,
    location: "Nashville, TN",
    rate: "$400/hour",
    availability: "Busy",
    verified: true,
    description:
      "Multi-platinum recording artist with chart-topping hits and international recognition. Specializes in pop, R&B, and soul music with powerful vocals that have captivated millions worldwide.",
    achievements: [
      "Platinum Album Certification",
      "World Tour 2023",
      "Music Awards Winner",
      "Billboard Hot 100 #1 Hit",
      "Grammy Nominee",
    ],
    genres: ["Pop", "R&B", "Soul", "Gospel", "Jazz"],
    skills: [
      "Lead Vocals",
      "Songwriting",
      "Live Performance",
      "Studio Recording",
      "Vocal Coaching",
      "Music Arrangement",
    ],
    equipment: [
      "Neumann U87 Microphone",
      "Pro Tools Studio Setup",
      "Yamaha Grand Piano",
      "In-Ear Monitor System",
      "Vocal Processing Unit",
      "Backup Vocal Team",
    ],
    experience: "12+ years",
    languages: ["English", "French", "Italian"],
    socialMedia: {
      instagram: "@lunavocals",
      twitter: "@luna_vocals",
      youtube: "LunaVocalsOfficial",
      website: "lunavocals.com",
    },
    portfolio: [
      {
        id: 1,
        title: "World Tour 2023 - Live Performance",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 3200000,
        likes: 67000,
        duration: "45:30",
      },
      {
        id: 2,
        title: "Platinum Album - Studio Sessions",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 1800000,
        likes: 34000,
        duration: "20:15",
      },
      {
        id: 3,
        title: "Acoustic Sessions - Unplugged",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 950000,
        likes: 28000,
        duration: "12:45",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Universal Music Group",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Luna's vocal performance was absolutely stunning. Professional, talented, and delivered beyond our expectations.",
        date: "2 weeks ago",
        project: "Album Recording",
      },
      {
        id: 2,
        client: "Madison Square Garden",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Incredible live performance that had the entire audience on their feet. A true professional and amazing artist.",
        date: "1 month ago",
        project: "Live Concert",
      },
    ],
    stats: {
      totalBookings: 89,
      repeatClients: 67,
      responseTime: "< 4 hours",
      completionRate: 100,
    },
  },
  "4": {
    id: 4,
    name: "Ayra Starr",
    title: "Award winning Nigerian artist",
    category: "influencer",
    image: "/images/ayra.jpg",
    avatar: "/images/ayra.jpg",
    coverImage: "/images/ayra.jpg",
    rating: 4.8,
    reviews: 312,
    location: "Miami, FL",
    rate: "$180/hour",
    availability: "Available",
    verified: true,
    description:
      "Macro influencer with 2M+ followers across platforms, specializing in lifestyle and music content. Expert in brand partnerships and viral content creation with proven track record of engagement.",
    achievements: [
      "2M+ Followers Across Platforms",
      "Brand Partner of the Year 2023",
      "Viral Content Creator",
      "Top 1% Engagement Rate",
      "Celebrity Collaborations",
    ],
    genres: ["Lifestyle", "Music", "Fashion", "Travel", "Tech"],
    skills: [
      "Content Creation",
      "Brand Partnerships",
      "Social Media Strategy",
      "Video Production",
      "Photography",
      "Influencer Marketing",
    ],
    equipment: [
      "Professional Camera Setup",
      "Lighting Equipment",
      "Editing Software Suite",
      "Drone for Aerial Shots",
      "Mobile Studio Setup",
      "Live Streaming Gear",
    ],
    experience: "6+ years",
    languages: ["English", "Spanish", "Portuguese"],
    socialMedia: {
      instagram: "@alexrivera",
      twitter: "@alex_rivera",
      youtube: "AlexRiveraOfficial",
      website: "alexrivera.com",
    },
    portfolio: [
      {
        id: 1,
        title: "Brand Campaign - Lifestyle Collection",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 5600000,
        likes: 89000,
        duration: "2:30",
      },
      {
        id: 2,
        title: "Music Festival Vlog - Behind the Scenes",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 2300000,
        likes: 45000,
        duration: "8:45",
      },
      {
        id: 3,
        title: "Fashion Week Coverage",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 1800000,
        likes: 34000,
        duration: "6:20",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Fashion Brand Co",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Alex delivered exceptional content that exceeded our engagement goals. Professional and creative approach to our campaign.",
        date: "1 week ago",
        project: "Fashion Campaign",
      },
      {
        id: 2,
        client: "Tech Startup",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment: "Great content creator with authentic voice. Helped us reach our target audience effectively.",
        date: "2 weeks ago",
        project: "Product Launch",
      },
    ],
    stats: {
      totalBookings: 278,
      repeatClients: 189,
      responseTime: "< 30 minutes",
      completionRate: 94,
    },
  },
  "5": {
    id: 5,
    name: "Fave",
    title: "Ghanaian Artist",
    category: "radio",
    image: "/images/fave.jpg",
    avatar: "/images/fave.jpg",
    coverImage: "/images/fave.jpg",
    rating: 4.9,
    reviews: 78,
    location: "Seattle, WA",
    rate: "$80/hour",
    availability: "Available",
    verified: true,
    description:
      "Experienced podcast host and radio personality with expertise in tech, business, and interview formats. Known for engaging conversations and professional audio production.",
    achievements: [
      "Top 10 Business Podcast",
      "1M+ Monthly Downloads",
      "Celebrity Interview Specialist",
      "Radio Hall of Fame Nominee",
      "Podcast Awards Winner",
    ],
    genres: ["Interviews", "Tech Talk", "Business", "News", "Entertainment"],
    skills: [
      "Podcast Hosting",
      "Interview Techniques",
      "Audio Production",
      "Live Broadcasting",
      "Content Planning",
      "Guest Coordination",
    ],
    equipment: [
      "Professional Podcast Studio",
      "Shure SM7B Microphones",
      "Audio Interface",
      "Soundproofing",
      "Remote Recording Setup",
      "Live Streaming Equipment",
    ],
    experience: "15+ years",
    languages: ["English", "Korean"],
    socialMedia: {
      instagram: "@davidparkpodcast",
      twitter: "@david_park_host",
      youtube: "DavidParkShow",
      website: "davidparkshow.com",
    },
    portfolio: [
      {
        id: 1,
        title: "CEO Interview Series - Season 3",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 890000,
        likes: 23000,
        duration: "45:30",
      },
      {
        id: 2,
        title: "Tech Trends 2024 - Special Episode",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 567000,
        likes: 18000,
        duration: "32:15",
      },
      {
        id: 3,
        title: "Live Radio Show Highlights",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 345000,
        likes: 12000,
        duration: "25:45",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Tech Conference",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "David's interviewing skills are exceptional. He made our keynote speakers feel comfortable and delivered great content.",
        date: "3 weeks ago",
        project: "Conference Interviews",
      },
      {
        id: 2,
        client: "Business Network",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Professional podcast production and engaging host. Our audience loved the series he created for us.",
        date: "1 month ago",
        project: "Podcast Series",
      },
    ],
    stats: {
      totalBookings: 145,
      repeatClients: 98,
      responseTime: "< 3 hours",
      completionRate: 97,
    },
  },
  "6": {
    id: 6,
    name: "Kaesfr",
    title: "Voice Over Artist & Narrator",
    category: "artist",
    image: "/images/kaesfr.jpg",
    avatar: "/images/kaesfr.jpg",
    coverImage: "/images/kaesfr.jpg",
    rating: 4.8,
    reviews: 134,
    location: "Chicago, IL",
    rate: "$90/hour",
    availability: "Available",
    verified: true,
    description:
      "Professional voice over artist specializing in commercial, narration, and character work. With a versatile voice range and professional home studio setup.",
    achievements: [
      "National Commercial Campaigns",
      "Audiobook Narrator",
      "Animation Voice Work",
      "Corporate Training Videos",
      "Award-Winning Commercials",
    ],
    genres: ["Commercial", "Narration", "Character", "Documentary", "E-Learning"],
    skills: ["Voice Over", "Character Voices", "Narration", "Commercial Reading", "Audio Editing", "Script Analysis"],
    equipment: [
      "Professional Home Studio",
      "Neumann TLM 103 Microphone",
      "Acoustic Treatment",
      "Pro Tools Setup",
      "ISDN/Source Connect",
      "Backup Recording System",
    ],
    experience: "9+ years",
    languages: ["English", "French"],
    socialMedia: {
      instagram: "@mayavoiceover",
      twitter: "@maya_vo",
      youtube: "MayaVoiceOver",
      website: "mayavoiceover.com",
    },
    portfolio: [
      {
        id: 1,
        title: "National TV Commercial - Auto Brand",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 1200000,
        likes: 15000,
        duration: "0:30",
      },
      {
        id: 2,
        title: "Documentary Narration - Nature Series",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 890000,
        likes: 12000,
        duration: "3:45",
      },
      {
        id: 3,
        title: "Character Voice Demo Reel",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 456000,
        likes: 8900,
        duration: "2:15",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Advertising Agency",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Maya's voice perfectly captured our brand's personality. Professional delivery and quick turnaround time.",
        date: "1 week ago",
        project: "Commercial Campaign",
      },
      {
        id: 2,
        client: "Publishing House",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Excellent narration work on our audiobook series. Great character differentiation and engaging delivery.",
        date: "2 weeks ago",
        project: "Audiobook Narration",
      },
    ],
    stats: {
      totalBookings: 189,
      repeatClients: 134,
      responseTime: "< 2 hours",
      completionRate: 99,
    },
  },
  "7": {
    id: 7,
    name: "Beat Master",
    title: "Hip-Hop Producer & DJ",
    category: "dj",
    image: "/placeholder.svg?height=600&width=800",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=1200",
    rating: 4.7,
    reviews: 98,
    location: "Atlanta, GA",
    rate: "$200/hour",
    availability: "Available",
    verified: true,
    description:
      "Hip-hop producer and DJ with deep roots in Atlanta's music scene. Specializing in trap, hip-hop, and R&B production with over 8 years of experience working with major labels and independent artists.",
    achievements: [
      "Platinum Producer Credits",
      "Major Label Collaborations",
      "Atlanta Music Awards Winner",
      "50M+ Streams on Produced Tracks",
      "Celebrity Artist Collaborations",
    ],
    genres: ["Hip-Hop", "Trap", "R&B", "Southern Rap", "Pop-Rap"],
    skills: [
      "Beat Production",
      "Live DJ Sets",
      "Studio Engineering",
      "Artist Development",
      "Sound Design",
      "Mixing & Mastering",
    ],
    equipment: [
      "MPC Live II",
      "Pioneer CDJ-2000NXS2",
      "Allen & Heath Xone:96",
      "KRK Rokit 8 G4 Monitors",
      "Shure SM7B Microphone",
      "Full Studio Setup",
    ],
    experience: "8+ years",
    languages: ["English"],
    socialMedia: {
      instagram: "@beatmaster",
      twitter: "@beatmaster_atl",
      youtube: "BeatMasterOfficial",
      website: "beatmaster.com",
    },
    portfolio: [
      {
        id: 1,
        title: "Trap Anthem - Studio Session",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 1800000,
        likes: 34000,
        duration: "8:45",
      },
      {
        id: 2,
        title: "Hip-Hop Beat Pack Vol. 5",
        type: "audio",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 950000,
        likes: 28000,
        duration: "3:30",
      },
      {
        id: 3,
        title: "Live DJ Set - Atlanta Club",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 670000,
        likes: 19000,
        duration: "45:20",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Atlantic Records",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Beat Master delivered exactly what we needed for our artist's album. Professional, creative, and great to work with.",
        date: "1 week ago",
        project: "Album Production",
      },
      {
        id: 2,
        client: "Club Venue",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment: "Great DJ set that kept the crowd moving all night. Would definitely book again for future events.",
        date: "2 weeks ago",
        project: "Club Performance",
      },
    ],
    stats: {
      totalBookings: 87,
      repeatClients: 56,
      responseTime: "< 3 hours",
      completionRate: 95,
    },
  },
  "8": {
    id: 8,
    name: "Sarah Live",
    title: "Professional Event MC & Host",
    category: "mc",
    image: "/placeholder.svg?height=600&width=800",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=1200",
    rating: 4.9,
    reviews: 167,
    location: "Chicago, IL",
    rate: "$180/hour",
    availability: "Available",
    verified: true,
    description:
      "Professional event MC and host specializing in weddings, corporate events, and private parties. Known for creating memorable experiences with engaging personality and seamless event flow management.",
    achievements: [
      "500+ Events Hosted",
      "Wedding Industry Award Winner",
      "Corporate Event Specialist",
      "Bilingual MC Services",
      "Event Planning Certification",
    ],
    genres: ["Weddings", "Corporate Events", "Private Parties", "Galas", "Award Shows"],
    skills: [
      "Event Hosting",
      "Crowd Engagement",
      "Timeline Management",
      "Public Speaking",
      "Bilingual Hosting",
      "Event Coordination",
    ],
    equipment: [
      "Wireless Microphone System",
      "Portable Sound System",
      "Backup Audio Equipment",
      "Professional Attire",
      "Event Planning Tools",
      "Emergency Kit",
    ],
    experience: "7+ years",
    languages: ["English", "Spanish"],
    socialMedia: {
      instagram: "@sarahlive_mc",
      twitter: "@sarah_live",
      youtube: "SarahLiveEvents",
      website: "sarahlive.com",
    },
    portfolio: [
      {
        id: 1,
        title: "Luxury Wedding - Full Event",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 450000,
        likes: 12000,
        duration: "25:30",
      },
      {
        id: 2,
        title: "Corporate Gala Highlights",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 280000,
        likes: 8900,
        duration: "12:45",
      },
      {
        id: 3,
        title: "MC Skills Demo Reel",
        type: "video",
        thumbnail: "/placeholder.svg?height=200&width=300",
        views: 190000,
        likes: 6700,
        duration: "4:20",
      },
    ],
    reviews_data: [
      {
        id: 1,
        client: "Wedding Couple",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment:
          "Sarah made our wedding day absolutely perfect! She kept everything on schedule and our guests loved her energy.",
        date: "1 week ago",
        project: "Wedding Reception",
      },
      {
        id: 2,
        client: "Corporate Client",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Professional, engaging, and handled our corporate event flawlessly. Highly recommend!",
        date: "3 weeks ago",
        project: "Annual Company Meeting",
      },
    ],
    stats: {
      totalBookings: 203,
      repeatClients: 134,
      responseTime: "< 1 hour",
      completionRate: 99,
    },
  },
}

export function getTalentProfile(id: string): TalentProfile | null {
  return talentProfiles[id] || null
}

export function getAllTalentIds(): string[] {
  return Object.keys(talentProfiles)
}

export function getTalentsByCategory(category: string): TalentProfile[] {
  return Object.values(talentProfiles).filter((talent) => talent.category === category)
}
