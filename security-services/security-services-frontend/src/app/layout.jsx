import '../index.css';
import ClientProviders from '../components/providers/ClientProviders';

export const metadata = {
  title: 'Vanguard Defense & Security Solutions | Elite Corporate & Tactical Security',
  description: 'Vanguard Security Services - Tactical operations management, armed guarding, executive protection, K9 security, and surveillance solutions.',
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
