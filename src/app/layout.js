import './globals.css'
import Script from 'next/script'

const SITE_URL = 'https://www.farmhouseinnoida.com'
// This page lives at a fixed path on the parent site, so the canonical is absolute
// rather than '/' — metadataBase only covers relative URLs.
const PAGE_URL = `${SITE_URL}/green-beauty-farm-house-in-sector-135-noida.php`
const HERO_IMAGE = 'https://res.cloudinary.com/ezartvu7/image/upload/v1789642363/farmhouse_img.png'

const TITLE = 'Farmhouse Plots for Sale in Noida | Green Beauty Farms'
const DESCRIPTION =
  'Buy farmhouse plots and farmland in Noida at Green Beauty Farms, Sector 135. Explore premium farm plots, peaceful surroundings and excellent connectivity. Enquire now.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'farmhouse plots for sale in Noida',
    'farm land in Noida',
    'farmland for sale in Noida',
    'farmhouse for sale in Noida',
    'farmhouse plots in Noida',
    'farm plots in Noida',
    'Green Beauty Farms',
    'Green Beauty Farms Noida',
    'farm house in Sector 135 Noida',
  ],
  authors: [{ name: 'Green Beauty Farms' }],
  creator: 'Green Beauty Farms',
  publisher: 'Green Beauty Farms',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Green Beauty Farms',
    images: [HERO_IMAGE],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMAGE],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
}

// The App Router wants the viewport tag as its own export; putting it inside
// `metadata` is deprecated and Next will warn at build time.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

/* Listing schema — coordinates match the Google Maps embed on the page. */
const listingLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: 'Green Beauty Farms — Farmhouse Plots in Noida',
  description:
    'A gated farmhouse plot and villa community in Sector 135 on the Noida Expressway. Farmhouse plots for sale in Noida from ₹8,500 per gaj, ready farm houses from ₹1.30 Cr.',
  url: PAGE_URL,
  image: HERO_IMAGE,
  telephone: '+918368207535',
  email: 'ssuryavanshi536@gmail.com',
  areaServed: ['Noida', 'Greater Noida', 'Delhi NCR'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 135, Noida Expressway',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201304',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4873723,
    longitude: 77.3844189,
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 8500,
    highPrice: 13000000,
    offerCount: 2,
    description: 'Farmhouse plots from ₹8,500 per gaj; ready farmhouses from ₹1.30 Cr.',
  },
}

/* FAQ schema mirrors the questions rendered on the page — keep the two in sync. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      q: 'Where exactly is Green Beauty Farms in Noida located?',
      a: 'Green Beauty Farms sits in Sector 135 on the Noida Expressway, with the FNG Expressway a short drive away and Kalindi Kunj roughly 12 km out. More than 4000 farmhouses have already been built across this belt.',
    },
    {
      q: 'What do farmhouse plots in Noida cost at Green Beauty Farms?',
      a: 'Farmhouse plots for sale in Noida here are priced between ₹8,500 and ₹9,500 per gaj, depending on size, position in the layout and phase. A ready-to-move farmhouse with a private pool, machan and modular kitchen starts at ₹1.30 Cr.',
    },
    {
      q: 'Can I buy farm land in Noida now and build the farmhouse later?',
      a: 'Yes. Every plot is handed over individually fenced with its own gate, pathway, plantation, road access, street lighting and an electricity connection at the boundary, so you can hold the land and build whenever you are ready.',
    },
    {
      q: 'What amenities come with the community?',
      a: 'Every phase shares a clubhouse, swimming pool, cricket ground, party lawn and jogging track, plus landscaped parks, tree-lined sidewalks and a single gated entry with 24×7 security and CCTV coverage.',
    },
    {
      q: 'Is possession immediate after booking?',
      a: 'Yes. Registry and possession follow immediately once booking formalities are complete. Internal roads, boundary fencing, street lighting and electricity connections are already developed across the sold phases.',
    },
    {
      q: 'How transparent is the documentation?',
      a: 'Title documents, layout approvals and current RERA status are shared in full before you book, so you can review everything with your own advocate.',
    },
  ].map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M4D89STZ');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-fraunces: 'Fraunces', Georgia, serif;
                --font-worksans: 'Work Sans', system-ui, sans-serif;
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listingLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />

        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18461296898" strategy="afterInteractive" />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18461296898', { allow_enhanced_conversions: true });
          `}
        </Script>
        <Script id="google-click-to-call-conversion" strategy="afterInteractive">
          {`
            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-18461296898/3hnWCInMrP0cEIKShONE',
                  'value': 1.0,
                  'currency': 'INR',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4D89STZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}