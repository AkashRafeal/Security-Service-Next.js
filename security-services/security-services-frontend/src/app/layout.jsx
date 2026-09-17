import '../index.css';
import ClientProviders from '../components/providers/ClientProviders';

export const metadata = {
  metadataBase: new URL('https://security-service-next-js.vercel.app'),
  title: 'ABC Security Services | Tactical & Corporate Security Solutions',
  description: 'ABC Security Services - Professional tactical operations, armed guarding, executive protection, 24/7 command dispatch, and commercial facility security.',
  applicationName: 'ABC Security Services',
  keywords: [
    'ABC Security Services',
    'Tactical Security',
    'Armed Guards',
    'Executive Protection',
    'Corporate Security',
    'Facility Protection'
  ],
  openGraph: {
    title: 'ABC Security Services | Tactical & Corporate Security Solutions',
    description: 'ABC Security Services - Professional tactical operations, armed guarding, executive protection, 24/7 command dispatch, and commercial facility security.',
    url: 'https://security-service-next-js.vercel.app',
    siteName: 'ABC Security Services',
    images: [
      {
        url: '/images/hero_executive_protection.jpg',
        width: 1200,
        height: 630,
        alt: 'ABC Security Services - Tactical & Corporate Security'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABC Security Services | Tactical & Corporate Security Solutions',
    description: 'ABC Security Services - Professional tactical operations, armed guarding, executive protection, and 24/7 command dispatch.',
    images: ['/images/hero_executive_protection.jpg'],
  },
  icons: {
    icon: '/shield.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-950 text-slate-900 font-sans min-h-screen antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
