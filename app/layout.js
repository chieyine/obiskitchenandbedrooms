import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import ExperienceProvider from "./components/ExperienceProvider";
import RouteTransition from "./components/RouteTransition";
import GlobalClientVisuals from "./components/GlobalClientVisuals";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import CookieBanner from "./components/CookieBanner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-serif" });

export const viewport = {
  themeColor: "#f5f1ea",
};

export const metadata = {
  metadataBase: new URL("https://obiskitchenbedrooms.co.uk"),
  title: "Obi's Kitchen & Bedrooms | Fitted Kitchens, Wardrobes & Bedrooms",
  description:
    "Obi's Kitchen & Bedrooms design and install fitted kitchens, wall media units, wardrobes and bedroom furniture across Hertfordshire and the UK. Free consultation and quote.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Obi's Kitchen & Bedrooms | Fitted Kitchens, Wardrobes & Bedrooms",
    description:
      "Fitted kitchens, media walls, wardrobes and bedroom furniture tailored to your home. Serving Hertfordshire and the wider UK.",
    url: "/",
    siteName: "Obi's Kitchen & Bedrooms",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Obi's Kitchen & Bedrooms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obi's Kitchen & Bedrooms | Fitted Kitchens, Wardrobes & Bedrooms",
    description:
      "Fitted kitchens, media walls, wardrobes and bedroom furniture tailored to your home. Serving Hertfordshire and the wider UK.",
    images: ["/og.jpg"],
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const consent = cookieStore.get("obi_cookie_consent")?.value;
  const hasAnalyticsConsent = consent === "accepted";

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        {hasAnalyticsConsent && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // Consent already granted via cookie banner.
                gtag('consent', 'default', {
                  ad_storage: 'denied',
                  analytics_storage: 'granted',
                });
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  anonymize_ip: true,
                });
              `}
            </Script>
          </>
        )}
        <Script id="json-ld-local-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Obi's Kitchen & Bedrooms",
          "description": "Fitted kitchens, media walls, wardrobes and bedroom furniture tailored to homes across Hertfordshire and the UK.",
          "url": "https://obiskitchenbedrooms.co.uk",
          "telephone": "+447733689409",
          "email": "obiskitchenandbedrooms@gmail.com",
          "priceRange": "££",
          "openingHours": "Mo-Fr 08:00-18:00",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Hertfordshire, UK"
          },
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 51.75,
              "longitude": -0.34
            },
            "geoRadius": "80000"
          }
        }) }} />
        <ExperienceProvider>
          <div className="relative isolate min-h-screen flex flex-col">
            <GlobalClientVisuals />
            <div className="grow">
              <RouteTransition>{children}</RouteTransition>
            </div>
            <FloatingActions />
            <CookieBanner />
            <Footer />
          </div>
        </ExperienceProvider>
      </body>
    </html>
  );
}
