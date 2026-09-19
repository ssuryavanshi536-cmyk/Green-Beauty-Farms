'use client'
import { useState, useEffect, useRef } from 'react'
import LeadModal from '../components/LeadModal'

/* ── Project imagery ──
   Hero photo is intentionally left as it was. Everything else points at the
   real project photography on Cloudinary. */
const CLOUD = 'https://res.cloudinary.com/ezartvu7/image/upload'

const HERO_IMG = `${CLOUD}/v1789642363/farmhouse_img.png`
const img = () => HERO_IMG

// Master site layout (brochure plan)
const LAYOUT_IMG = `https://res.cloudinary.com/ezartvu7/image/upload/v1789757281/GBF-LAYOUT.webp`

// "Where you'll be" — expressway connectivity map
const EXPRESSWAY_IMG = `${CLOUD}/v1789728165/exprway.png`

// Moving carousel strip that sits under the hero
const marqueeImages = [
  `${CLOUD}/v1789728168/c4.jpg`,
  `${CLOUD}/v1789728168/c3.jpg`,
  `${CLOUD}/v1789728167/c1.jpg`,
  `${CLOUD}/v1789728167/c6.jpg`,
  `${CLOUD}/v1789728166/c2.jpg`,
  `${CLOUD}/v1789728165/c5.jpg`,
]

// Section photography
const PLOT_IMG = `${CLOUD}/v1789728169/img1.jpg`
const FARMHOUSE_IMG = `${CLOUD}/v1789728169/img2.jpg`
const PRICE_BANNER_IMG = `${CLOUD}/v1789728169/img3.jpg`
const FAQ_IMG = `${CLOUD}/v1789728168/img4.jpg`
const SEO_SECTION_BG = `${CLOUD}/v1789728167/img23.jpg`

// Alt text doubles as an on-page SEO signal, so each slide names what it shows
// in the language buyers actually search with.
const gallerySlides = [
  { src: `${CLOUD}/v1789728167/g1.jpg`, label: 'Farmhouse plots for sale in Noida — Green Beauty Farms' },
  { src: `${CLOUD}/v1789728167/g2.jpg`, label: 'Green Beauty Farms farmhouse, Sector 135 Noida' },
  { src: `${CLOUD}/v1789728166/g3.jpg`, label: 'Fenced farm land for sale in Noida' },
  { src: `${CLOUD}/v1789728166/g4.jpg`, label: 'Luxury farmhouse for sale in Noida' },
  { src: `${CLOUD}/v1789728166/g5.jpg`, label: 'Private pool at a Green Beauty farmhouse, Noida' },
  { src: `${CLOUD}/v1789728165/g6.jpg`, label: 'Farmhouse plots in Noida with landscaped greenery' },
  { src: `${CLOUD}/v1789728164/g7.jpg`, label: 'Farm house for sale in Noida — interiors' },
  { src: `${CLOUD}/v1789728164/g8.jpg`, label: 'Green Beauty Farms Noida — community lawn' },
  { src: `${CLOUD}/v1789728165/g9.jpg`, label: 'Farmhouse near Noida Expressway — entrance' },
  { src: `${CLOUD}/v1789728165/g10.jpg`, label: 'Green Beauty farm house, Sector 135 Noida' },
  { src: `${CLOUD}/v1789728164/g11.jpg`, label: 'Farmhouse land in Noida ready for construction' },
  // Remaining project photos, added so none of the supplied images go unused.
  { src: `${CLOUD}/v1789728169/img19.jpg`, label: 'Green Beauty Farms Noida Sector 135 — plot view' },
  { src: `${CLOUD}/v1789728169/img18.jpg`, label: 'Farmland for sale in Noida — internal roads' },
  { src: `${CLOUD}/v1789728168/img21.jpg`, label: 'Farmhouse for sale in Noida — shaded machan' },
  { src: `${CLOUD}/v1789728168/img5.jpg`, label: 'Green Beauty farmhouse Noida — kitchen garden' },
  { src: `${CLOUD}/v1789728168/img7.jpg`, label: 'Farm house plots in Noida — corner plot' },
  { src: `${CLOUD}/v1789728168/img22.jpg`, label: 'Green Beauty Farms — clubhouse and party lawn' },
  { src: `${CLOUD}/v1789728167/img23.jpg`, label: 'Farmhouse near Sector 135 Noida — tree-lined lane' },
  { src: `${CLOUD}/v1789728166/img26.jpg`, label: 'Green Beauty Farms Noida — gated entry' },
]

/* ── Contact + pricing facts ── */
const PHONE_DISPLAY = '+91 83682 07535'
const PHONE_TEL = '+918368207535'
const WHATSAPP_NUMBER = '918368207535'
const EMAIL = 'ssuryavanshi536@gmail.com'

const STARTING_PRICE = '₹8,500 / Sq. Yd.'
const PLOT_PRICE_RANGE = '₹8,500 – ₹9,500 per Gaj'
const FARMHOUSE_PRICE = '₹1.30 Cr'

/* ── Lead capture ── */
const WEB3FORMS_ACCESS_KEY = '8f24ac60-8971-4ce1-bca8-b80ebdc035a3'

/* ── Google Maps embed (Sector 135, Noida Expressway) ── */
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3707.1175646639335!2d77.38441894959486!3d28.48737233940338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI5JzEzLjkiTiA3N8KwMjMnMTQuNiJF!5e0!3m2!1sen!2sin!4v1789731139030!5m2!1sen!2sin'

/* ── Icons (single-purpose, reused by label) ── */
const Icon = {
  Pin: (p) => (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>),
  Mail: (p) => (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>),
  Check: (p) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
  Phone: (p) => (<svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
  WhatsApp: (p) => (<svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>),
  Download: (p) => (<svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
  Building: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M9 3v18M3 9h6M3 15h6M12 9h9M12 15h9" /></svg>),
  Pool: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 18c2-2 4 0 6 0s4-2 6 0 4 0 6 0M8 6l4-4 4 4M12 2v10" /></svg>),
  Tree: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7M9 15H5l7-7 7 7h-4M7 11H3l9-9 9 9h-4" /></svg>),
  Shield: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  Activity: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
  Users: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  Layers: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>),
  Sun: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>),
  ShoppingBag: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>),
  Camera: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>),
  Door: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="2" width="18" height="20" rx="1" /><circle cx="15" cy="12" r="1" fill={p.color||'#214b0a'} /></svg>),
  Fence: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V7l3-3 3 3v14M14 21V7l3-3 3 3v14M2 12h20" /></svg>),
  Road: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l3-10h12l3 10" /><path d="M12 7v10" /></svg>),
  Bolt: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
  Home: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
  Car: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-4l2-5h14l2 5v4h-2" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" /></svg>),
  Feather: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></svg>),
  Compass: (p) => (<svg width={p.size||28} height={p.size||28} viewBox="0 0 24 24" fill="none" stroke={p.color||'#214b0a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>),
  Spinner: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>),
}

/* ── Content data ── */
const navLinks = ['Overview', 'Amenities', 'Pricing', 'Location']

// Quick facts shown right under the hero
const quickFacts = [
  { icon: 'Pin', label: 'Sector 135, Noida Expressway' },
  { icon: 'Pool', label: 'Swimming Pool' },
  { icon: 'Tree', label: 'Landscaped Greenery' },
  { icon: 'Shield', label: '24×7 Security' },
  { icon: 'Home', label: '4000+ Farmhouses Built' },
]

// 6 amenities shown as a 3-row, 2-column table inside the hero, replacing the old copy paragraph
const heroAmenities = [
  { icon: 'Pin', label: 'Sector 135, Noida Expressway' },
  { icon: 'Pool', label: 'Swimming pool' },
  { icon: 'Tree', label: 'Landscaped greenery' },
  { icon: 'Shield', label: '24×7 security' },
  { icon: 'Home', label: '4000+ farmhouses built' },
  { icon: 'Fence', label: 'Individually fenced plots' },
]

const communityAmenities = [
  { icon: 'Building', label: 'Club House' },
  { icon: 'Tree', label: 'Landscaped Central Park' },
  { icon: 'Pool', label: 'Swimming Pool' },
  { icon: 'Activity', label: 'Cricket Ground' },
  { icon: 'Users', label: 'Party Lawn' },
  { icon: 'Road', label: 'Jogging Track' },
  { icon: 'Shield', label: '24×7 Security' },
  { icon: 'Camera', label: 'CCTV Surveillance' },
  { icon: 'Layers', label: 'Water Harvesting' },
  { icon: 'Door', label: 'Single Gated Entry' },
  { icon: 'ShoppingBag', label: 'Local Shop Lane' },
  { icon: 'Compass', label: 'Cricket Stadium' },
  { icon: 'Feather', label: 'Tree-Lined Sidewalks' },
  { icon: 'Sun', label: 'Uninterrupted Power' },
  { icon: 'Home', label: 'Community Temple' },
  { icon: 'Users', label: 'On-Site Maintenance Staff' },
]

const proximityList = [
  { place: 'Noida Expressway', distance: 'Direct Access' },
  { place: 'FNG Expressway', distance: '3 km' },
  { place: 'Jaypee Kosmos', distance: '5 km' },
  { place: 'Jaypee Hospital', distance: '5 km' },
  { place: 'Amity University', distance: '8 km' },
  { place: 'Mahamaya Flyover', distance: '10 km' },
  { place: 'Kalindi Kunj', distance: '12 km' },
  { place: 'DND Flyover', distance: '12 km' },
]

const highlights = [
  'Individually fenced, ready-to-build farmhouse plots with a private gate and pathway',
  'Choose bare farm land in Noida or a ready farmhouse with a pool and modular kitchen',
  'Registry and possession handed over immediately after booking',
  'Black-topped internal roads, street lighting and buried utilities already in place',
  'Single gated entry with round-the-clock security and CCTV coverage',
  'A landscaped clubhouse, cricket ground and party lawn for the whole community',
  'Sector 135 on the Noida Expressway, where over 4000 farmhouses are already built',
  'A genuine second home for weekends, farming or long-term land investment in Noida',
]

const plotSizes = [
  { size: '1008 Sq. Yd.', tag: 'Most Popular', price: '₹8,500 / Gaj onwards', note: 'Fenced plot, ready to build' },
  { size: '2016 Sq. Yd.', tag: 'Family Estate', price: 'Up to ₹9,500 / Gaj', note: 'Corner and park-facing options' },
  { size: 'Ready Farmhouse', tag: 'Move-In Ready', price: '₹1.30 Cr', note: 'Pool, machan and modular kitchen' },
]

const faqs = [
  {
    q: 'Where exactly is Green Beauty Farms in Noida located?',
    a: 'Green Beauty Farms sits in Sector 135 on the Noida Expressway, with the FNG Expressway a short drive away and Kalindi Kunj roughly 12 km out — close enough for a weekend drive, far enough to feel like a different world. More than 4000 farmhouses have already been built across this belt.',
  },
  {
    q: 'What do farmhouse plots in Noida cost at Green Beauty Farms?',
    a: `Farmhouse plots for sale in Noida here are priced between ${PLOT_PRICE_RANGE}, depending on size, location within the layout and the phase you pick. A ready-to-move farmhouse with a private pool, machan and modular kitchen starts at ${FARMHOUSE_PRICE}. Call us on ${PHONE_DISPLAY} for the current phase-wise list.`,
  },
  {
    q: 'Can I buy farm land in Noida now and build the farmhouse later?',
    a: 'Yes. Every plot is handed over individually fenced with its own gate, pathway, plantation, road access, street lighting and an electricity connection at the boundary, so you can hold the land as an investment and build whenever you are ready.',
  },
  {
    q: 'What amenities come with the community?',
    a: 'Every phase shares a clubhouse, swimming pool, cricket ground, party lawn and jogging track, plus landscaped parks, tree-lined sidewalks and a single gated entry with 24×7 security and CCTV coverage.',
  },
  {
    q: 'Is possession immediate after booking?',
    a: 'Yes — registry and possession follow immediately once booking formalities are complete. Internal roads, boundary fencing, street lighting and electricity connections are already developed across the sold phases.',
  },
  {
    q: 'How transparent is the documentation?',
    a: `Title documents, layout approvals and current RERA status are shared in full before you book, so you can review everything with your own advocate. Write to ${EMAIL} and we will send the file across.`,
  },
]

/* ── Small UI helpers ── */
// Matches the options in the popup lead modal
const enquiryInterestOptions = ['Plot Only', 'Ready Farmhouse', 'Not Sure Yet']

// heroMobile = the hero's form card. On phones it renders as a white card sitting
// straight on the photo (matching the reference layout); from lg up it goes back
// to the translucent dark card.
function EnquiryForm({ source, dark = true, heroMobile = false }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit number'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSubmitting(true)
    setServerError('')
    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Enquiry – Green Beauty Farms | ${source}`,
        from_name: 'Green Beauty Farms Website',
        name: form.name,
        mobile: form.mobile,
        email: form.email || 'Not provided',
        interested_in: form.interest || 'Not specified',
        source,
      }
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        if (typeof window !== 'undefined' && window.gtag) {
          // TODO: replace with the real Google Ads conversion label
          window.gtag('event', 'conversion', {
            send_to: 'AW-18461296898/CONVERSION_LABEL',
            value: 1.0,
            currency: 'INR',
          })
        }
      } else {
        setServerError(data.message || 'That did not go through. Try again, or call us directly.')
      }
    } catch {
      setServerError('Network error. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const box = heroMobile
    ? 'rounded-2xl border border-sand-200 bg-white p-6 shadow-deep md:p-7 lg:border-white/15 lg:bg-moss-800/70 lg:shadow-none lg:backdrop-blur-md'
    : dark
      ? 'border border-white/15 bg-moss-800/70 p-6 backdrop-blur-md md:p-7 rounded-2xl'
      : 'border border-ink-900/10 bg-white p-6 md:p-7 rounded-2xl shadow-card'

  const headingCls = heroMobile ? 'text-ink-900 lg:text-white' : dark ? 'text-white' : 'text-ink-900'

  if (submitted) {
    return (
      <div className={`${box} text-center`}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ochre-500/25">
          <Icon.Check size={22} color="#a2cd15" />
        </div>
        <h3 className={`mb-1 text-lg font-semibold ${headingCls}`}>Thank you!</h3>
        <p className={`text-sm ${heroMobile ? 'text-ink-400 lg:text-white/70' : dark ? 'text-white/70' : 'text-ink-400'}`}>We&apos;ll call you within two hours.</p>
      </div>
    )
  }

  const inputCls = `w-full rounded-lg border px-4 py-3 text-sm text-ink-900 outline-none focus:border-ochre-500 ${
    heroMobile ? 'border-sand-200 bg-white lg:border-white/15' : dark ? 'border-white/15 bg-white' : 'border-sand-200 bg-sand-100'
  }`

  return (
    <form onSubmit={handleSubmit} noValidate className={box}>
      {/* Web3Forms honeypot: bots fill it, people never see it */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <h3 className={`mb-5 text-center font-display text-xl font-semibold ${headingCls}`}>Plan your site visit</h3>
      <div className="flex flex-col gap-4">
        <div>
          <input type="text" placeholder="Full name" value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })) }} className={inputCls} />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
        </div>
        <div>
          <input type="tel" placeholder="10-digit mobile number" value={form.mobile} onChange={(e) => { setForm((f) => ({ ...f, mobile: e.target.value })); setErrors((er) => ({ ...er, mobile: '' })) }} className={inputCls} />
          {errors.mobile && <p className="mt-1 text-xs text-danger">{errors.mobile}</p>}
        </div>
        <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
        <select
          value={form.interest}
          onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
          className={`${inputCls} cursor-pointer appearance-none ${form.interest ? 'text-ink-900' : 'text-ink-400'}`}
        >
          <option value="" disabled>Looking for</option>
          {enquiryInterestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {serverError && (
          <div className="rounded-lg border border-danger/40 bg-danger/15 px-3.5 py-2.5 text-xs text-danger lg:text-white">
            {serverError}
          </div>
        )}
        <button type="submit" disabled={submitting} className="btn-cta flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-ochre-500 via-ochre-600 to-ochre-500 py-3.5 font-semibold text-night-900 disabled:opacity-60">
          {submitting ? (<><Icon.Spinner /> Submitting…</>) : 'Request a callback'}
        </button>
      </div>
    </form>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`border-b border-sand-200 transition-colors ${isOpen ? 'bg-sand-100' : 'bg-white'}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
        {/* h3 so the FAQ questions are crawlable headings, not anonymous button text */}
        <h3 className="text-sm font-semibold leading-relaxed text-ink-900">{q}</h3>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#4a821e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {isOpen && <p className="px-6 pb-5 text-sm leading-relaxed text-ink-600">{a}</p>}
    </div>
  )
}

function Navbar({ onCTAClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled ? 'border-night-900/10 bg-white/95 shadow-sm backdrop-blur' : 'border-transparent bg-white/90 backdrop-blur'}`}>
        <div className="gutter mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-6 md:h-24">
          {/* Logo: larger and nudged in from the left edge */}
          <img
            src="https://res.cloudinary.com/ezartvu7/image/upload/v1789641755/Farmhouse_logo.png"
            alt="Green Beauty Farms — farmhouse plots in Sector 135, Noida"
            className="ml-2 h-14 w-auto object-contain sm:ml-4 sm:h-16 md:ml-6 md:h-[72px]"
          />
          <div className="hidden items-center gap-6 text-sm font-semibold text-ink-600 md:flex">
            {navLinks.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="nav-underline hover:text-moss-800">{l}</a>)}
            <button onClick={() => onCTAClick('Apply Now')} className="rounded-md bg-moss-800 px-4 py-2 text-white transition-transform hover:-translate-y-0.5 hover:shadow-card">Apply now</button>
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 rounded-md bg-ochre-500 px-4 py-2 text-night-900 transition-transform hover:-translate-y-0.5 hover:shadow-card"><Icon.Phone size={14} /> Call us</a>
          </div>
          <button onClick={() => setMenuOpen((o) => !o)} className="p-2 md:hidden" aria-label="Menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#214b0a" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="gutter fixed inset-x-0 top-20 z-40 flex flex-col gap-3 border-b-2 border-moss-800 bg-white p-5 md:hidden">
          {navLinks.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="border-b border-sand-200 py-2 text-sm font-semibold text-moss-800">{l}</a>)}
          <button onClick={() => { onCTAClick('Apply Now'); setMenuOpen(false) }} className="rounded-md bg-moss-800 py-3 font-semibold text-white">Apply now</button>
          <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-2 rounded-md bg-ochre-500 py-3 font-semibold text-night-900"><Icon.Phone size={16} /> Call {PHONE_DISPLAY}</a>
        </div>
      )}
    </>
  )
}

/* ══════════════════════════ MAIN PAGE ══════════════════════════ */
export default function GreenBeautyFarmsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [activeSlide, setActiveSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const touchStartX = useRef(0)

  const openModal = (title = '') => { setModalTitle(title); setModalOpen(true) }

  useEffect(() => {
    const t = setTimeout(() => openModal('Book a Free Site Visit'), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const i = setInterval(() => { if (!modalOpen) openModal('Book a Free Site Visit') }, 30000)
    return () => clearInterval(i)
  }, [modalOpen])

  useEffect(() => {
    const i = setInterval(() => setActiveSlide((s) => (s === gallerySlides.length - 1 ? 0 : s + 1)), 3000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    const el = document.getElementById('siteplan')
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { openModal('Book a Free Site Visit'); obs.disconnect() } })
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const closeLightbox = () => { setLightboxOpen(false); setZoom(1); setPos({ x: 0, y: 0 }) }
  const handleWheel = (e) => { e.preventDefault(); const d = e.deltaY > 0 ? -0.3 : 0.3; setZoom((z) => { const n = Math.min(Math.max(z + d, 1), 5); if (n === 1) setPos({ x: 0, y: 0 }); return n }) }
  const handleMouseDown = (e) => { if (zoom > 1) { setDragging(true); setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y }) } }
  const handleMouseMove = (e) => { if (dragging) setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }) }

  return (
    <div className="font-body text-ink-900 pb-16 md:pb-0">
      <Navbar onCTAClick={openModal} />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} triggerText={modalTitle} />

      {/* ── HERO ──
          Mobile mirrors the reference layout: the photo runs full-bleed, the copy
          block sits on an opaque white panel, and the form card floats on the
          photo below it. From lg up the original dark-overlay hero returns. */}
      <section id="overview" className="relative flex min-h-screen items-center pt-20 sm:pt-24 lg:pt-32">
        <img src={img()} alt="Green Beauty Farms — farmhouse plots for sale in Noida, Sector 135" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-night-900/90 via-moss-900/65 to-moss-900/20 lg:block" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 py-8 lg:gap-10 lg:px-6 lg:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="mx-auto w-full max-w-xl bg-white/90 px-5 py-8 text-center backdrop-blur-sm sm:px-7 lg:mx-0 lg:max-w-xl lg:bg-transparent lg:p-0 lg:text-left lg:backdrop-blur-none">
            <p className="hero-enter mb-3 text-xs font-bold uppercase tracking-[0.3em] text-moss-800 lg:text-ochre-500">Gated farmhouse community · Sector 135, Noida Expressway</p>
            <h1 className="hero-enter hero-enter-delay-1 mb-3 font-display text-4xl font-semibold leading-[1.08] text-ink-900 sm:text-5xl md:text-6xl lg:text-white">
              Green Beauty <em className="italic text-moss-500 lg:text-ochre-500">Farms</em>
            </h1>
            {/* Keyword-bearing subhead: the phrase buyers actually search for,
                sitting directly under the brand H1. */}
            <p className="hero-enter hero-enter-delay-1 mb-4 text-sm font-semibold text-moss-800 sm:text-base lg:text-ochre-500">
              Farmhouse plots for sale in Noida, Sector 135
            </p>
            {/* Mobile only: amenities table replaces the copy paragraph */}
            <div className="hero-enter hero-enter-delay-2 mx-auto mb-5 grid w-fit grid-cols-2 gap-x-8 gap-y-2.5 text-left lg:hidden">
              {heroAmenities.map(({ icon, label }) => {
                const IconComp = Icon[icon]
                return (
                  <div key={label} className="flex items-center gap-2 text-xs text-ink-700 sm:text-sm">
                    <IconComp size={16} color="currentColor" />
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>
            {/* Desktop only: copy paragraph */}
            <p className="hero-enter hero-enter-delay-2 mb-2 hidden text-sm leading-relaxed text-white/85 lg:block lg:text-base">
              Fenced farmhouse plots and ready-to-move farm houses for sale in Noida, set among cricket lawns, a private clubhouse and open sky — in a belt off the Noida Expressway where more than 4000 farmhouses are already built.
            </p>
            {/* Mobile only: highlighted, glowing price pill.
                The fade-in and the glow live on two different elements on purpose: both
                'hero-enter' and 'price-glow' set the CSS 'animation' shorthand, and two
                classes setting the same property on the same element don't combine —
                the one later in the stylesheet simply wins and the other never plays. */}
            <div className="hero-enter hero-enter-delay-2 mb-8 lg:hidden">
              <p className="price-glow inline-block rounded-full bg-moss-800 px-4 py-2 text-xs font-semibold text-ochre-500 sm:text-sm">
                Plots {PLOT_PRICE_RANGE} · Ready farmhouse {FARMHOUSE_PRICE}
              </p>
            </div>
            {/* Desktop only: plain price line */}
            <p className="hero-enter hero-enter-delay-2 mb-8 hidden text-xs text-white/70 lg:block lg:text-sm">Plots {PLOT_PRICE_RANGE} · Ready farmhouse {FARMHOUSE_PRICE}</p>
            <div className="hero-enter hero-enter-delay-3 flex flex-wrap justify-center gap-3 lg:justify-start">
              <button onClick={() => openModal('Book a Free Site Visit')} className="btn-cta btn-glow rounded-lg bg-gradient-to-r from-ochre-500 via-ochre-600 to-ochre-500 px-6 py-3.5 font-semibold text-night-900">Book a free site visit</button>
              <button onClick={() => openModal('Get Pricing & Payment Plan')} className="rounded-lg border-2 border-moss-800 px-6 py-3.5 font-semibold text-moss-800 transition-colors hover:bg-moss-800 hover:text-white lg:border-ochre-500 lg:text-ochre-500 lg:hover:bg-ochre-500 lg:hover:text-night-900">Get pricing details</button>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 rounded-lg border-2 border-ink-900/20 px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:bg-ink-900/5 lg:border-white/40 lg:text-white lg:hover:bg-white/10"><Icon.Phone size={15} /> Call now</a>
            </div>
          </div>
          <div className="hero-enter hero-enter-delay-2 gutter px-5 lg:px-0">
            <EnquiryForm source="Hero Form" heroMobile />
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS STRIP ── */}
      <div className="bg-night-700">
        <div className="gutter mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 py-5 sm:px-6">
          {quickFacts.map(({ icon, label }) => {
            const IconComp = Icon[icon]
            return (
              <div key={label} className="flex items-center gap-2 text-xs font-semibold text-white/90 sm:text-sm">
                <IconComp size={18} color="#a2cd15" />
                {label}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── MOVING IMAGE CAROUSEL ── */}
      <section className="overflow-hidden bg-sand-100 py-10 sm:py-14">
        <div className="gutter mb-6 px-5 text-center sm:mb-8">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-moss-800">Life at Green Beauty Farms</p>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">A glimpse inside the community</h2>
        </div>
        <div className="marquee-row relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-sand-100 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-sand-100 to-transparent sm:w-24" />
          <div className="marquee-track gap-4 px-5">
            {[...marqueeImages, ...marqueeImages].map((src, i) => (
              <div key={i} className="h-36 w-56 shrink-0 overflow-hidden rounded-xl shadow-card sm:h-48 sm:w-80">
                <img src={src} alt="Green Beauty Farms Noida — farmhouse community view" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT: PLOTS & FARMHOUSES ── */}
      <section className="gutter bg-white px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-semibold sm:text-4xl">Farmhouse plots and farm houses for sale in Noida</h2>
            <div className="plot-divider mx-auto" />
          </div>

          <Reveal className="mb-16 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-moss-800">Type A — Plots</p>
              <h3 className="mb-3 text-lg font-semibold sm:text-xl">Farmhouse plots in Noida, fenced and ready the day you buy</h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-600">
                Each farmhouse plot at Green Beauty Farms arrives with its boundary already fenced, its own gate and pathway laid, and 10 to 15 plants already in the ground. Wide black-topped roads, street lighting and utility lines run through every phase, so building your own farmhouse — on your own schedule — starts from farm land in Noida that already feels finished.
              </p>
              <p className="text-sm leading-relaxed text-ink-600">
                Every plot is handed over individually fenced with a private gate and pathway, 10 to 15 plants already planted, wide internal roads on all sides, street lighting through the lane and a solar panels connection at the boundary. Sizes start at 1008 sq. yd. and are priced from {PLOT_PRICE_RANGE}.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="hover-lift hover-zoom w-full max-w-lg overflow-hidden rounded-xl shadow-card">
                <img src={PLOT_IMG} alt="Fenced farmhouse plot for sale in Noida with plantation" loading="lazy" className="h-56 w-full object-cover sm:h-80" />
              </div>
            </div>
          </Reveal>

          <Reveal className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 flex justify-center md:order-1">
              <div className="hover-lift hover-zoom w-full max-w-lg overflow-hidden rounded-xl shadow-card">
                <img src={FARMHOUSE_IMG} alt="Luxury farmhouse for sale in Noida at Green Beauty Farms" loading="lazy" className="h-56 w-full object-cover sm:h-80" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-moss-800">Type B — Farmhouses</p>
              <h3 className="mb-3 text-lg font-semibold sm:text-xl">Or move straight into a ready farmhouse in Noida</h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-600">
                For buyers who would rather skip construction altogether, a set of luxury farm houses for sale in Noida come fully built and finished to a livable standard from the day the keys are handed over. Prices start at {FARMHOUSE_PRICE}.
              </p>
              <p className="text-sm leading-relaxed text-ink-600">
                Each one comes with a private swimming pool, a machan and shaded sit-out, dedicated car parking, a servant quarter, a kitchen garden along the rear boundary and a fully modular kitchen inside — nothing left to add before your first weekend here.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <button onClick={() => openModal('Plot vs Farmhouse — Which Is Right For Me?')} className="hover-lift rounded-lg bg-moss-800 px-6 py-3.5 font-semibold text-white">Help me choose: plot or farmhouse</button>
            <a href={`tel:${PHONE_TEL}`} className="hover-lift flex items-center gap-2 rounded-lg border-2 border-moss-800 px-6 py-3.5 font-semibold text-moss-800"><Icon.Phone size={15} /> Speak to an advisor</a>
          </Reveal>
        </div>
      </section>

      {/* ── PRICE BANNER (blurred photo + enquire CTA) ── */}
      <section className="relative overflow-hidden border-y-[3px] border-ochre-500">
        <img src={PRICE_BANNER_IMG} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover blur-[6px]" />
        <div className="absolute inset-0 bg-night-900/70" />
        <div className="gutter relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 py-14 text-center sm:px-6 sm:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ochre-500">Current launch pricing</p>
          <h2 className="font-display text-2xl font-semibold leading-snug text-white sm:text-4xl">
            Farmhouse plots in Noida at <span className="shimmer-text">{STARTING_PRICE}</span>
          </h2>
          <p className="text-sm text-white/80 sm:text-base">
            Plots {PLOT_PRICE_RANGE} · Ready farmhouse from {FARMHOUSE_PRICE} · Sector 135, Noida Expressway
          </p>
          <button
            onClick={() => openModal('Enquire Now – Launch Pricing')}
            className="btn-cta btn-glow mt-2 rounded-lg bg-gradient-to-r from-ochre-500 via-ochre-600 to-ochre-500 px-8 py-3.5 text-sm font-bold text-night-900 sm:text-base"
          >
            Enquire now
          </button>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="gutter bg-white px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-semibold sm:text-4xl">A farmhouse near the Noida Expressway</h2>
            <div className="plot-divider mx-auto" />
          </div>
          <Reveal className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
            <div className="hover-lift overflow-hidden rounded-xl border border-sand-200 bg-sand-100 shadow-card">
              <img src={EXPRESSWAY_IMG} alt="Green Beauty Farms location map on the Noida Expressway, Sector 135" loading="lazy" className="h-60 w-full object-contain sm:h-80" />
            </div>
            <div>
              <p className="mb-5 text-sm leading-relaxed text-ink-600">
                Green Beauty Farms sits in Sector 135 directly on the Noida Expressway, with the FNG Expressway a few minutes away — putting Kalindi Kunj, the Sector 135 business district and South Delhi within an easy drive. For anyone looking for a farmhouse near Sector 135 Noida, this is as connected as farm land in the belt gets.
              </p>
              <div className="proximity-cols">
                {proximityList.map(({ place, distance }) => (
                  <div key={place} className="flex items-center justify-between border-b border-sand-200 py-2 text-sm" style={{ breakInside: 'avoid' }}>
                    <span className="font-medium text-ink-600">{place}</span>
                    <span className="ml-3 whitespace-nowrap font-bold text-moss-800">{distance}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => openModal('Get Directions & Site Visit')} className="hover-lift btn-cta mt-6 w-full rounded-lg bg-gradient-to-r from-moss-500 via-moss-800 to-moss-500 px-6 py-3.5 text-sm font-semibold text-white sm:w-auto">Get directions and book a visit</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMMUNITY HIGHLIGHTS ── */}
      <section className="gutter bg-sand-100 px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-semibold sm:text-4xl">Why buyers choose Green Beauty Farms, Noida</h2>
            <div className="plot-divider mx-auto" />
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h} delay={i * 60}>
                <div className="hover-lift flex h-full items-start gap-3 rounded-lg bg-white p-4 text-sm leading-relaxed text-ink-600 shadow-card">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-moss-800 text-white"><Icon.Check size={12} color="#fff" /></span>
                  {h}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="gutter bg-night-700 px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-display text-base italic text-ochre-500">Price list</p>
            <h2 className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl">Farmhouse plot prices in Sector 135, Noida</h2>
            <div className="mx-auto h-px w-20 bg-white/30" />
          </div>
          <div className="flex flex-wrap justify-center gap-7">
            {plotSizes.map(({ size, tag, price, note }, i) => (
              <Reveal key={size} delay={i * 100} className="w-full max-w-xs sm:w-72">
                <div className="hover-lift overflow-hidden rounded-2xl shadow-deep">
                  <div className="bg-moss-800 px-6 py-4 text-center">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-ochre-500">{tag}</p>
                  </div>
                  <div className="bg-white px-6 py-8">
                    <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-moss-500">{note}</p>
                    <p className="mb-5 text-2xl font-extrabold text-ink-900">{size}</p>
                    <p className="mb-6 text-lg font-bold text-moss-800">{price}</p>
                    <button onClick={() => openModal('Request A Call – ' + size)} className="w-full rounded-full bg-moss-800 py-3.5 font-semibold text-white transition-colors hover:bg-ochre-500 hover:text-night-900">Request a call</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => openModal('Download E-Brochure & Pricing')} className="btn-cta inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ochre-500 via-ochre-600 to-ochre-500 px-8 py-3.5 font-extrabold text-night-900 shadow-deep">
              <Icon.Download size={20} /> Download brochure and full price list
            </button>
          </div>
        </div>
      </section>

      {/* ── SITE LAYOUT ── */}
      <section id="siteplan" className="gutter bg-white px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-semibold sm:text-4xl">Master site layout</h2>
            <div className="plot-divider mx-auto" />
          </div>
          <div onClick={() => setLightboxOpen(true)} className="relative mx-auto mb-4 max-w-3xl cursor-zoom-in overflow-hidden rounded-xl border border-sand-200 shadow-card">
            <img src={LAYOUT_IMG} alt="Green Beauty Farms master site layout — farmhouse plots in Noida Sector 135" loading="lazy" className="h-80 w-full bg-sand-100 object-contain sm:h-96" />
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-night-900/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
              Click to enlarge
            </div>
          </div>

          {lightboxOpen && (
            <div onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }} onWheel={handleWheel} className="fixed inset-0 z-[100] flex items-center justify-center bg-night-900/95 p-4">
              <button onClick={closeLightbox} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl text-white">×</button>
              <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-night-900/70 px-5 py-2 backdrop-blur">
                <button onClick={() => setZoom((z) => { const n = Math.max(z - 0.5, 1); if (n === 1) setPos({ x: 0, y: 0 }); return n })} disabled={zoom <= 1} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white disabled:opacity-40">−</button>
                <span className="min-w-[44px] text-center text-sm font-semibold text-white">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom((z) => Math.min(z + 0.5, 5))} disabled={zoom >= 5} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white disabled:opacity-40">+</button>
                <span className="ml-1 hidden text-xs text-white/50 sm:inline">Scroll to zoom · drag to pan</span>
              </div>
              <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)} className="flex max-h-[85vh] max-w-[90vw] select-none items-center justify-center overflow-hidden" style={{ cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}>
                <img src={LAYOUT_IMG} alt="Green Beauty Farms site layout enlarged" draggable={false} className="max-h-[85vh] max-w-[90vw] object-contain" style={{ transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`, transition: dragging ? 'none' : 'transform 0.2s ease' }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section id="amenities" className="gutter bg-white px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">Community amenities</h2>
            <p className="mb-3 text-sm text-ink-400">Shared facilities available to every plot and farmhouse owner</p>
            <div className="plot-divider mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {communityAmenities.map(({ icon, label }, i) => {
              const IconComp = Icon[icon]
              return (
                <Reveal key={label} delay={(i % 4) * 70}>
                  <div className="hover-lift flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-sand-200 bg-sand-100 px-3 py-7 text-center transition-colors hover:border-ochre-500 hover:bg-white">
                    <IconComp size={40} />
                    <p className="text-xs font-semibold leading-tight text-ink-600 sm:text-sm">{label}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => openModal('Amenities Enquiry')} className="hover-lift rounded-lg border-2 border-moss-800 px-6 py-3.5 text-sm font-semibold text-moss-800">Ask about any amenity</button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gutter bg-sand-100 px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-moss-800">Project visuals</p>
            <h2 className="mb-3 font-display text-3xl font-semibold sm:text-4xl">Green Beauty Farms photo gallery</h2>
            <div className="plot-divider mx-auto" />
          </div>
          <div
            className="relative mb-3 overflow-hidden rounded-xl shadow-deep"
            onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].screenX }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].screenX - touchStartX.current
              if (dx < -50) setActiveSlide((s) => (s === gallerySlides.length - 1 ? 0 : s + 1))
              else if (dx > 50) setActiveSlide((s) => (s === 0 ? gallerySlides.length - 1 : s - 1))
            }}
          >
            <img key={activeSlide} src={gallerySlides[activeSlide].src} alt={gallerySlides[activeSlide].label} className="hero-enter h-56 w-full select-none object-cover sm:h-[420px]" style={{ animationDuration: '0.6s' }} draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-night-900/60 to-transparent" />
            <button onClick={() => setActiveSlide((s) => (s === 0 ? gallerySlides.length - 1 : s - 1))} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-night-900/50 text-lg text-white transition-transform hover:scale-110 sm:left-3 sm:h-10 sm:w-10 sm:text-xl">‹</button>
            <button onClick={() => setActiveSlide((s) => (s === gallerySlides.length - 1 ? 0 : s + 1))} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-night-900/50 text-lg text-white transition-transform hover:scale-110 sm:right-3 sm:h-10 sm:w-10 sm:text-xl">›</button>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-night-900/50 px-2.5 py-1 text-[10px] font-semibold text-white sm:hidden">Swipe to browse</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {gallerySlides.map((s, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} aria-label={s.label} className={`h-11 w-16 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-12 sm:w-[72px] ${activeSlide === i ? 'border-ochre-500 opacity-100 scale-100' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                <img src={s.src} alt={s.label} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => openModal('Request Full Photo & Video Tour')} className="hover-lift btn-cta rounded-lg bg-gradient-to-r from-ochre-500 via-ochre-600 to-ochre-500 px-6 py-3.5 text-sm font-semibold text-night-900">Request the full photo and video tour</button>
          </div>
        </div>
      </section>

      {/* ── MAP + FORM ── */}
      <section className="gutter bg-moss-800 px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-deep">
            <iframe
              src={MAP_EMBED_SRC}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Green Beauty Farms location — Sector 135, Noida Expressway"
              className="h-[420px] w-full border-0"
            />
          </div>
          <EnquiryForm source="Map Section Form" />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-16 sm:py-24">
        <img src={FAQ_IMG} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-night-900/85" />
        <div className="gutter relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="mb-8 font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">Farmhouse plots in Noida — FAQs</h2>
          <Reveal className="max-w-xl overflow-hidden rounded-lg border border-sand-200 bg-white shadow-deep">
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── SEO CONTENT BLOCK ──
          Written for readers first; it also gives crawlers the long-tail variants
          ("farm land for sale in Noida", "green beauty farmhouse", and so on) in
          real sentences rather than as a keyword list. */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-6 md:py-24">
        <img src={SEO_SECTION_BG} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover blur-md" />
        {/* Dark scrim over the blurred photo keeps white body copy readable while
            still letting the image show through, rather than hiding it entirely. */}
        <div className="absolute inset-0 bg-night-900/80" />
        <div className="gutter relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="mb-5 font-display text-2xl font-semibold text-white sm:text-3xl">Buying farm land in Noida: what to know</h2>
          <div className="mx-auto flex flex-col items-center gap-4 text-sm leading-relaxed text-white/85">
            <p>
              Demand for farm house plots in Noida has followed the Expressway. As Sectors 128 to 150 filled with offices, hospitals and universities, the land just beyond them turned into weekend country for families who work in Noida, Delhi and Gurugram but want open sky within an hour&apos;s drive. Green Beauty Farms sits in that belt, in Sector 135, where more than 4000 farmhouses have already been built.
            </p>
            <p>
              Most buyers arrive with one of two plans. The first is to buy farm land in Noida and hold it — fenced, planted and registered — while the corridor keeps developing, then build at their own pace. The second is to skip construction and buy a ready farm house for sale in Noida, keys in hand, pool filled, kitchen fitted. Green Beauty Farms is set up for both: plots from {PLOT_PRICE_RANGE}, ready farmhouses from {FARMHOUSE_PRICE}.
            </p>
            <p>
              Whichever route you take, check the same three things you would anywhere: that the title is clean and the registry happens at booking, that the layout has approvals you can read yourself, and that the basics — road, boundary, water, electricity — are already on the ground rather than promised for a later phase. We share the full document file before you book, and a site visit takes about half a day including the drive.
            </p>
            <p>
              To see the plots in person, call <a href={`tel:${PHONE_TEL}`} className="font-semibold text-ochre-500 underline">{PHONE_DISPLAY}</a>, message us on <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-ochre-500 underline">WhatsApp</a>, or leave your number in any form on this page and an advisor will call back the same day.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-4 border-ochre-500 bg-white">
        <div className="gutter mx-auto max-w-6xl px-5 py-14 sm:px-6">
          <div className="mb-10 grid gap-10 sm:grid-cols-3">
            <div>
              <img src="https://res.cloudinary.com/ezartvu7/image/upload/v1789641755/Farmhouse_logo.png" alt="Green Beauty Farms Noida logo" className="mb-4 h-16 w-auto object-contain" />
              <p className="mb-5 text-sm leading-relaxed text-ink-400">Green Beauty Farms is a gated farmhouse plot and villa community in Sector 135 on the Noida Expressway, with a pool, landscaped greenery and 24×7 security.</p>
              <div className="flex gap-2.5">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded bg-[#25D366] text-white"><Icon.WhatsApp size={18} /></a>
                <a href={`tel:${PHONE_TEL}`} aria-label="Call" className="flex h-9 w-9 items-center justify-center rounded bg-moss-800 text-white"><Icon.Phone size={16} /></a>
                <a href={`mailto:${EMAIL}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded bg-night-700 text-white"><Icon.Mail size={16} /></a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 border-b-2 border-ochre-500 pb-2.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-moss-800">Contact us</h4>
              <div className="flex flex-col gap-3.5 text-sm text-ink-400">
                <div className="flex items-start gap-2.5"><Icon.Pin size={14} color="#a2cd15" /> Sector 135, Noida Expressway, Noida, UP</div>
                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2.5 font-bold text-moss-800"><Icon.Phone size={15} color="#a2cd15" /> {PHONE_DISPLAY}</a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 break-all font-semibold text-moss-800"><Icon.Mail size={15} color="#a2cd15" /> {EMAIL}</a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-semibold text-[#25D366]"><Icon.WhatsApp size={16} /> Chat on WhatsApp</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 border-b-2 border-ochre-500 pb-2.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-moss-800">Quick links</h4>
              <div className="flex flex-col gap-2.5 text-sm font-medium text-ink-600">
                {[['Book a Free Site Visit', 'Book a site visit'], ['Get Pricing & Payment Plan', 'Pricing and payment plan'], ['Download E-Brochure & Pricing', 'Download the brochure'], ['Apply Now', 'Apply now']].map(([modal, label]) => (
                  <button key={label} onClick={() => openModal(modal)} className="flex items-center gap-2 text-left"><span className="font-extrabold text-ochre-500">›</span> {label}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sand-200 pt-5 text-xs text-ink-400">
            <p>© {new Date().getFullYear()} Green Beauty Farms, Sector 135 Noida. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-sand-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <button onClick={() => openModal('Book a Free Site Visit')} className="btn-cta flex-1 rounded-lg bg-gradient-to-r from-ochre-500 via-ochre-600 to-ochre-500 py-3 text-sm font-semibold text-night-900">Book a site visit</button>
        <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-2 rounded-lg bg-moss-800 px-5 py-3 text-sm font-semibold text-white"><Icon.Phone size={15} /> Call</a>
      </div>

      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20Green%20Beauty%20Farms.`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="float-anim fixed bottom-20 right-4 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-deep md:bottom-6">
        <Icon.WhatsApp size={26} />
      </a>
    </div>
  )
}