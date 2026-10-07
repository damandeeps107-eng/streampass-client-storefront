/**
 * StreamPass Centralized OTT & Streaming Catalog & Configuration
 * Standardized 2-Plan Tier: 6 Months (₹199) and 1 Year (₹340)
 */

export const SITE_CONFIG = {
  brandName: "StreamPass",
  tagline: "Your Entertainment. All in One Place.",
  subheading: "Choose your favourite streaming plan and enjoy premium entertainment at an affordable price.",
  whatsappNumber: "919876543210", // Dedicated WhatsApp order helpline
  whatsappDisplay: "+91 98765 43210",
  currency: "₹",
  averageActivationMinutes: "15-30",
  disclaimer: "OTT and streaming services, availability, supported devices and streaming quality are subject to the terms and conditions of the respective service providers. This website does not imply affiliation with any platform unless explicitly stated."
};

export const FEATURED_DEAL = {
  id: "all-ott-1-year",
  title: "ALL OTT — 1 YEAR PREMIUM",
  badge: "MOST POPULAR COMBO",
  price: 1499, originalPrice: 1599,
  duration: "1 Year",
  billingPeriod: "Year",
  description: "Get comprehensive all-in-one entertainment with verified multi-platform access for a complete 365 days.",
  features: [
    "1 Year Access Pass",
    "Premium Plan Access",
    "Full HD / 4K where supported by the supplied subscription",
    "Multiple OTT platforms included",
    "Fast activation within 15-30 minutes",
    "24/7 Interactive Support Bot & instant ticket system",
    "🔒 100% No Logout Guarantee — Dedicated Locked Profile",
    "Full replacement & pro-rated refund guarantee throughout active duration"
  ],
  disclaimer: "Availability, supported quality and device limits depend on the selected subscription/service.",
  image: "/assets/ott_combo_deal.jpg",
  popular: true
};

export const PLATFORMS_DATA = [
  {
    id: "netflix",
    name: "Netflix",
    logoImg: "/assets/logos/netflix.jpg",
    category: "movies-series",
    accentColor: "#E50914",
    accentGlow: "rgba(229, 9, 20, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.398 0v24c1.828-.466 3.655-.933 5.483-1.4V0H5.398zm7.72 0v21.199c1.827-.467 3.654-.934 5.482-1.401V0h-5.482zM5.398 0l13.203 24h-4.32L5.398 4.2V0z"/></svg>`,
    tagline: "4K Ultra HD Movies, Series & Originals",
    description: "Enjoy global blockbusters, award-winning series, documentaries and personalized profiles in Ultra HD & HDR.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "netflix-6m",
        name: "Netflix Premium 4K",
        duration: "6 Months",
        durationDays: 180,
        type: "Premium 4K (2 Devices)",
        price: 199, originalPrice: 299,
        quality: "4K Ultra HD + HDR",
        devices: "2 Devices (Smart TV, Mobile, PC, Tablet)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "4K Ultra HD + HDR + Dolby Atmos",
          "Dedicated PIN-protected profile (🔒 100% No Logout Guarantee)",
          "Stream on 2 devices simultaneously",
          "Smart TV, Firestick, PC & Mobile supported",
          "180 Days full replacement warranty"
        ]
      },
      {
        id: "netflix-1y",
        name: "Netflix Premium 4K",
        duration: "1 Year",
        durationDays: 365,
        type: "Premium 4K (4 Devices)",
        price: 340, originalPrice: 430,
        quality: "4K Ultra HD + HDR + Spatial Audio",
        devices: "4 Devices (Smart TV, Mobile, PC, Tablet)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "4K Ultra HD + HDR + Spatial Audio",
          "Dedicated PIN-protected profiles (🔒 100% No Logout Guarantee)",
          "Stream on up to 4 screens simultaneously",
          "Smart TV, Firestick, PC & Mobile supported",
          "365 Days full replacement warranty"
        ]
      }
    ]
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    logoImg: "/assets/logos/youtube.jpeg",
    category: "music-audio",
    accentColor: "#FF0000",
    accentGlow: "rgba(255, 0, 0, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    tagline: "Ad-Free 4K Video, Background Play & YT Music",
    description: "Watch uninterrupted YouTube with zero ads, background play on lock screen, and full access to YouTube Music Premium.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "youtube-6m",
        name: "YouTube Premium",
        duration: "6 Months",
        durationDays: 180,
        type: "Premium Account",
        price: 199, originalPrice: 299,
        quality: "4K UHD 60fps + 320kbps Audio",
        devices: "2 Devices (Smart TV, Mobile, PC, Tablet)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "Zero ads on all videos across YouTube",
          "Background play with screen locked",
          "YouTube Music Premium app included",
          "Smart TV, PC, Mobile & Tablet supported",
          "180 Days full replacement warranty"
        ]
      },
      {
        id: "youtube-1y",
        name: "YouTube Premium",
        duration: "1 Year",
        durationDays: 365,
        type: "Premium Account",
        price: 340, originalPrice: 430,
        quality: "4K UHD 60fps + 320kbps Audio",
        devices: "2 Devices (Smart TV, Mobile, PC, Tablet)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full 365 days of 100% ad-free viewing",
          "Picture-in-Picture (PiP) & background audio",
          "Offline video & playlist downloads",
          "Includes full YouTube Music catalog",
          "365 Days full replacement warranty"
        ]
      }
    ]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    logoImg: "/assets/logos/spotify.jpeg",
    category: "music-audio",
    accentColor: "#1DB954",
    accentGlow: "rgba(29, 185, 84, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
    tagline: "Lossless 320kbps Music, Podcasts & Offline Play",
    description: "Stream 100M+ songs ad-free with unlimited skips, offline song downloads, and high fidelity 320kbps audio.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "spotify-6m",
        name: "Spotify Premium Individual",
        duration: "6 Months",
        durationDays: 180,
        type: "Personal Account",
        price: 199, originalPrice: 299,
        quality: "Very High 320kbps Hi-Fi Audio",
        devices: "Personal Account (Mobile, PC, TV, Car)",
        deviceLimit: "1 Active Audio Stream at a time",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "Ad-Free uninterrupted music binging",
          "Extreme 320kbps lossless audio quality",
          "Unlimited song skips & on-demand playback",
          "Offline downloads on up to 3 devices",
          "180 Days full replacement warranty"
        ]
      },
      {
        id: "spotify-1y",
        name: "Spotify Premium Individual",
        duration: "1 Year",
        durationDays: 365,
        type: "Personal Account",
        price: 340, originalPrice: 430,
        quality: "Very High 320kbps Hi-Fi Audio",
        devices: "Personal Account (Mobile, PC, TV, Car)",
        deviceLimit: "1 Active Audio Stream at a time",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full 365 Days of ad-free music & podcasts",
          "Extreme 320kbps lossless audio quality",
          "Unlimited song skips & playlist downloads",
          "Mobile, PC, Smart TV, Alexa & Car playback",
          "365 Days full replacement warranty"
        ]
      }
    ]
  },
  {
    id: "prime",
    name: "Amazon Prime Video",
    logoImg: "/assets/logos/prime.png",
    category: "movies-series",
    accentColor: "#00A8E1",
    accentGlow: "rgba(0, 168, 225, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>`,
    tagline: "Prime Video + 4K UHD Movies & Series",
    description: "Watch latest theatrical blockbusters, Amazon Originals, international movies and regional blockbusters.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "prime-6m",
        name: "Prime Video Premium",
        duration: "6 Months",
        durationDays: 180,
        type: "Premium Screen",
        price: 199, originalPrice: 299,
        quality: "4K Ultra HD & HDR",
        devices: "2 Devices (Smart TV, Firestick, Mobile, PC)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "4K Ultra HD & HDR video streaming",
          "Ad-Free Prime Video movies & series",
          "Stream on 2 devices simultaneously",
          "Smart TV, Fire TV, PC, Mobile & Tablet",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "prime-1y",
        name: "Prime Video Premium",
        duration: "1 Year",
        durationDays: 365,
        type: "Premium 4K (4 Devices)",
        price: 340, originalPrice: 430,
        quality: "4K Ultra HD & HDR",
        devices: "4 Devices (Smart TV, Firestick, Mobile, PC, Tablet)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "4K Ultra HD & HDR video streaming",
          "Ad-Free unlimited binging for 365 days",
          "Stream on up to 4 screens simultaneously",
          "Smart TV, Fire TV, PC, Mobile & Tablet",
          "365 Days replacement warranty"
        ]
      }
    ]
  },
  {
    id: "hotstar",
    name: "JioHotstar",
    logoImg: "/assets/logos/hotstar.jpeg",
    category: "sports-live",
    accentColor: "#0C76EB",
    accentGlow: "rgba(12, 118, 235, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
    tagline: "Live Cricket, HBO, Disney+ & Indian Blockbusters",
    description: "Live ICC tournaments, Premier League, IPL, Disney+ movies, HBO series and regional blockbusters.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "hotstar-6m",
        name: "JioHotstar Super",
        duration: "6 Months",
        durationDays: 180,
        type: "Super Plan",
        price: 199, originalPrice: 299,
        quality: "Full HD 1080p + Dolby 5.1",
        devices: "2 Devices (Smart TV, Mobile, Laptop)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "Live Cricket & Live Sports tournaments",
          "Full HD 1080p & Dolby 5.1 surround sound",
          "Disney+, HBO & Hotstar Specials",
          "Stream on 2 devices (TV + Phone/PC)",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "hotstar-1y",
        name: "JioHotstar Premium 4K",
        duration: "1 Year",
        durationDays: 365,
        type: "Premium 4K Plan",
        price: 340, originalPrice: 430,
        quality: "4K Ultra HD + Dolby Vision",
        devices: "4 Devices (Smart TV, Mobile, PC, Tablet)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Stunning 4K Ultra HD + Dolby Vision",
          "Live Cricket + Sports + All Movies",
          "Stream on up to 4 devices simultaneously",
          "Smart TV, Android TV, Firestick, PC & Mobile",
          "365 Days replacement warranty"
        ]
      }
    ]
  },
  {
    id: "sonyliv",
    name: "Sony LIV",
    logoImg: "/assets/logos/sonyliv.jpeg",
    category: "sports-live",
    accentColor: "#FF7700",
    accentGlow: "rgba(255, 119, 0, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zm6 0h4v16h-4zm6 0h4v16h-4z"/></svg>`,
    tagline: "UEFA Champions League, WWE & Sony Originals",
    description: "Exclusive home for UEFA football, WWE Live, Scam series, Shark Tank India, and premium Sony Originals.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "sonyliv-6m",
        name: "Sony LIV Premium",
        duration: "6 Months",
        durationDays: 180,
        type: "LIV Premium",
        price: 199, originalPrice: 299,
        quality: "Full HD 1080p",
        devices: "2 Devices (Smart TV, Mobile, Tablet, PC)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "Live UEFA Champions League & WWE Live",
          "Shark Tank India & Sony LIV Originals",
          "Full HD 1080p video stream",
          "Works on Smart TV, Phone, and Laptop",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "sonyliv-1y",
        name: "Sony LIV Premium",
        duration: "1 Year",
        durationDays: 365,
        type: "LIV Premium",
        price: 340, originalPrice: 430,
        quality: "Full HD & 4K Selected Titles",
        devices: "2 Devices (Smart TV, Mobile, Tablet, PC)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full year UEFA football & WWE Live events",
          "All Sony LIV Originals & Blockbusters",
          "Full HD & 4K selected titles with Dolby Atmos",
          "Stream on 2 devices simultaneously",
          "365 Days replacement warranty"
        ]
      }
    ]
  },
  {
    id: "aha",
    name: "Aha Video",
    logoImg: "/assets/logos/aha.png",
    category: "regional",
    accentColor: "#FF3F00",
    accentGlow: "rgba(255, 63, 0, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
    tagline: "100% Telugu & Tamil Blockbusters",
    description: "The premier home for South Indian cinema, Unstoppable talk shows, Telugu originals and Tamil exclusives.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "aha-6m",
        name: "Aha Gold Pass",
        duration: "6 Months",
        durationDays: 180,
        type: "Gold Pass",
        price: 199, originalPrice: 299,
        quality: "Full HD 1080p + 4K",
        devices: "2 Devices (Smart TV, Mobile, Tablet)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "100% Ad-Free Telugu & Tamil blockbusters",
          "Early access 24h before standard release",
          "Full HD 1080p & 4K streaming",
          "Smart TV, Fire TV, Phone & Tablet",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "aha-1y",
        name: "Aha Gold All-Access",
        duration: "1 Year",
        durationDays: 365,
        type: "Gold Annual",
        price: 340, originalPrice: 430,
        quality: "4K UHD + Dolby Audio",
        devices: "4 Devices (Smart TV, Mobile, Tablet, PC)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full 365 days of Telugu & Tamil cinema",
          "4K UHD + Dolby 5.1 / Atmos audio",
          "Stream on up to 4 devices simultaneously",
          "Smart TV, Fire TV stick, Mobile, PC",
          "365 Days replacement warranty"
        ]
      }
    ]
  },
  {
    id: "zee5",
    name: "ZEE5",
    logoImg: "/assets/logos/zee5.jpeg",
    category: "regional",
    accentColor: "#9C27B0",
    accentGlow: "rgba(156, 39, 176, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11.5v-7l6 3.5-6 3.5z"/></svg>`,
    tagline: "2800+ Movies, 150+ Web Series & Live Channels",
    description: "Binge across 12 languages with blockbusters, daily TV serial episodes before telecast, and exclusive ZEE5 originals.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "zee5-6m",
        name: "ZEE5 Premium",
        duration: "6 Months",
        durationDays: 180,
        type: "Premium HD",
        price: 199, originalPrice: 299,
        quality: "Full HD 1080p",
        devices: "2 Devices (Smart TV, Mobile, Laptop)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "2800+ Movies & 150+ Web Series",
          "TV show episodes before television telecast",
          "Full HD 1080p ad-free streaming",
          "Stream on 2 devices simultaneously",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "zee5-1y",
        name: "ZEE5 All-Access 4K",
        duration: "1 Year",
        durationDays: 365,
        type: "All-Access 4K",
        price: 340, originalPrice: 430,
        quality: "4K UHD & Dolby 5.1",
        devices: "4 Devices (Smart TV, Mobile, PC, Tablet)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full 365 days uninterrupted entertainment",
          "4K Ultra HD & Dolby 5.1 audio",
          "Stream on up to 4 screens simultaneously",
          "12+ Indian languages coverage",
          "365 Days replacement warranty"
        ]
      }
    ]
  },
  {
    id: "appletv",
    name: "Apple TV+",
    logoImg: "/assets/logos/appletv.png",
    category: "movies-series",
    accentColor: "#A2AAAD",
    accentGlow: "rgba(162, 170, 173, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.58-.7.97-1.68.86-2.67-.84.03-1.85.56-2.44 1.25-.52.59-.97 1.55-.85 2.5 0 .02.08.03.11.03.8 0 1.74-.47 2.32-1.11z"/></svg>`,
    tagline: "Apple Originals, Ted Lasso & 4K Dolby Vision",
    description: "Critically acclaimed Apple Original films and series with master-grade 4K Dolby Vision and Spatial Audio.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "appletv-6m",
        name: "Apple TV+ Pass",
        duration: "6 Months",
        durationDays: 180,
        type: "Apple ID Access",
        price: 199, originalPrice: 299,
        quality: "4K Dolby Vision & Atmos",
        devices: "2 Devices (Apple TV, Smart TV, Mac, iPhone, PC)",
        deviceLimit: "Up to 2 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "Pristine 4K Dolby Vision & Spatial Audio",
          "Ted Lasso, Severance, Morning Show, Silo",
          "Stream on 2 devices simultaneously",
          "Works on Apple TV, Smart TVs, Mac, Windows, iOS",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "appletv-1y",
        name: "Apple TV+ Annual Pass",
        duration: "1 Year",
        durationDays: 365,
        type: "Apple ID Access",
        price: 340, originalPrice: 430,
        quality: "4K Dolby Vision & Atmos",
        devices: "3 Devices (Apple TV, Smart TV, Mac, iPhone, PC)",
        deviceLimit: "Up to 3 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full 365 days of Apple Originals & films",
          "Master-grade 4K Dolby Vision & Atmos",
          "Stream on up to 3 devices simultaneously",
          "Apple TV app on Smart TV, Firestick, PC, iPhone",
          "365 Days replacement warranty"
        ]
      }
    ]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    logoImg: "/assets/logos/crunchyroll.jpeg",
    category: "anime",
    accentColor: "#F47521",
    accentGlow: "rgba(244, 117, 33, 0.45)",
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`,
    tagline: "Ad-free Anime Mega Fan & Simulcast Streams",
    description: "World's largest anime library. Stream episodes 1 hour after Japanese broadcast in Full HD with subtitles & dubs.",
    startingPrice: 199,
    startingPeriod: "6 Mos",
    plans: [
      {
        id: "crunchyroll-6m",
        name: "Crunchyroll Mega Fan",
        duration: "6 Months",
        durationDays: 180,
        type: "Mega Fan",
        price: 199, originalPrice: 299,
        quality: "Full HD 1080p Ad-Free",
        devices: "4 Devices (Smart TV, PC, Console, Mobile)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "180 Days Full Replacement Warranty",
        features: [
          "Ad-Free anime streaming in Full HD 1080p",
          "Simulcast 1 hour after Japan broadcast",
          "Stream on up to 4 devices simultaneously",
          "Offline downloads on phone & tablet",
          "180 Days replacement warranty"
        ]
      },
      {
        id: "crunchyroll-1y",
        name: "Crunchyroll Mega Fan",
        duration: "1 Year",
        durationDays: 365,
        type: "Mega Fan Annual",
        price: 340, originalPrice: 430,
        quality: "Full HD 1080p Ad-Free",
        devices: "4 Devices (Smart TV, PC, Console, Mobile)",
        deviceLimit: "Up to 4 Screens simultaneously",
        activation: "15-30 Mins Instant Delivery",
        warranty: "365 Days Full Replacement Warranty",
        popular: true,
        features: [
          "Full 365 days unlimited anime binging",
          "Demon Slayer, Jujutsu Kaisen, One Piece, Solo Leveling",
          "Stream on up to 4 devices simultaneously",
          "Smart TV, PlayStation, Xbox, PC, Mobile",
          "365 Days replacement warranty"
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Platforms" },
  { id: "movies-series", label: "Movies & Series" },
  { id: "music-audio", label: "Music & Streaming" },
  { id: "sports-live", label: "Sports & Live TV" },
  { id: "regional", label: "Regional / South" },
  { id: "anime", label: "Anime" }
];

export const WHY_CHOOSE_US = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    title: "Fast Activation",
    description: "Receive your verified login credentials and setup guidelines within 15–30 minutes after order confirmation."
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    title: "Affordable Plans",
    description: "Flat ₹199 for 6 Months and ₹340 for 1 Year across video and music platforms. Up to 80% cheaper than retail subscriptions."
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    title: "Customer Support",
    description: "Reach our 24/7 interactive Support Bot anytime. We guide you through setup, device linking, and automated refund/swap tickets."
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
    title: "Zero Logout Guarantee",
    description: "Dedicated PIN-locked profiles with 100% account stability. Zero sudden logouts, zero password errors, backed by active warranty."
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
    title: "Secure & Protected",
    description: "100% Replacement warranty on active subscriptions with direct automated dispatch and pro-rated UPI refund protection."
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Plan",
    description: "Select your favorite streaming or music platform and choose between the 6-Month (₹199) or 1-Year (₹340) plan."
  },
  {
    step: "02",
    title: "Place Your Order",
    description: "Fill our quick 30-second checkout with your contact number and preferred devices. No complicated registration needed."
  },
  {
    step: "03",
    title: "Get Activation Details",
    description: "Our automated dispatch system delivers verified login access, device setup instructions, and priority 24/7 bot support."
  }
];

export const FAQS = [
  {
    question: "Will I face any Logout issue or Screen limit error?",
    answer: "No! Absolutely ZERO logout issues. We provide dedicated PIN-protected profile slots and genuine access passes. Unlike unverified resellers where accounts get logged out every 2 days, StreamPass guarantees 100% uninterrupted stable binging for the full validity (180 to 365 days). If any profile issue ever occurs, our technicians swap it in 15–30 minutes or issue a direct UPI refund."
  },

  {
    question: "How quickly will my subscription be activated?",
    answer: "Your subscription credentials and setup instructions are dispatched directly to your registered contact number within 15 to 30 minutes of order confirmation during operational hours (9 AM – 11 PM IST). Orders placed late night are prioritized first thing next morning."
  },
  {
    question: "Which devices are supported for video & music?",
    answer: "All mainstream devices are supported! You can watch and listen on Smart TVs, Amazon Firestick, Apple TV, PC/Mac browsers, iPhones, iPads, Android smartphones, and car audio systems for Spotify."
  },
  {
    question: "Can I use YouTube Premium & Spotify on multiple devices?",
    answer: "Yes! YouTube Premium supports streaming on up to 2 devices simultaneously, and Spotify Premium can be downloaded on up to 3 devices for offline playback with 1 active online audio stream."
  },
  {
    question: "Can I use the subscription on Smart TV?",
    answer: "Yes, absolutely! All our plans (like Netflix 4K, YouTube Premium, JioHotstar, Prime Video, Aha Gold, and Sony LIV) work seamlessly on Smart TVs and streaming boxes like Fire TV sticks and Apple TV."
  },
  {
    question: "What streaming quality is available?",
    answer: "Video streaming quality ranges from Full HD 1080p to 4K Ultra HD 60fps with HDR10+ and Dolby Vision. Music streaming (Spotify & YouTube Music) is delivered in pristine 320kbps High Fidelity audio."
  },
  {
    question: "How do I contact support?",
    answer: "We provide an interactive 24/7 Support Bot on the bottom-right of your screen. Tap the Support Bot anytime for instant order tracking, rapid 15-30m profile replacement, or a pro-rated UPI refund."
  },
  {
    question: "What happens after I place an order?",
    answer: "Once you submit your order, an Order Confirmation summary with your unique Order ID appears on screen. Within 15–30 minutes, verified credentials and setup instructions are dispatched directly to your registered contact."
  },
  {
    question: "What if my subscription stops working mid-period?",
    answer: "Every single plan purchased on StreamPass includes an active duration replacement guarantee (180 days for 6-Month plans, 365 days for 1-Year plans). If you face any login or access issue, simply open our 24/7 Support Bot with your Order ID, and we will swap credentials in 15–30 minutes or process a direct UPI refund."
  }
];
