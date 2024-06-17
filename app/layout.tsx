import './globals.css';
import { lazy, Suspense } from 'react';
const Footer = lazy(() => import('@app/components/Layout/Footer'));
import Header from '@app/components/Layout/Header';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import {
  maxWidthClassnames,
  minWidthClassnames,
} from './utils/tailwind-common-classes';

/**
 * Using force dynamic so changes in business assets (e.g. services) are immediately reflected.
 * If you prefer having it reflected only after redeploy (not recommended) please remove it
 * **/
export const revalidate = 0;

export default function RootLayout(layoutProps: any) {
  const { children } = layoutProps;
  const wixSession = useServerAuthSession();
  return (
    <html lang="en">
      <head>
        <title>Straight Path Fitness</title>
        <meta
          name="description"
          content="Straight path fitness booking application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="fitness, gym, personal training, group classes, nutrition, health, wellness, workout, exercise, fitness booking" />
        <meta name="author" content="Straight Path Fitness" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://www.wix.com/favicon.ico" />
        <link rel="canonical" href="https://straightpathfitness.com" />
      </head>
      {wixSession.wixClient ? (
        <body className="parallax-background">
          <Header />
          <main className="w-full bg-transparent min-h-[600px]">
            <div className={`w-full ${maxWidthClassnames} mx-auto`}>
              {children}
            </div>
          </main>
          <Suspense fallback={<h4 className="text-body">Loading...</h4>}>
            <Footer />
          </Suspense>
        </body>
      ) : (
        <body className="">
          <main className="max-w-full-content mx-auto bg-white pt-32">
            <h1>
              {/* Page not available. Please add an environment variable called
              NEXT_PUBLIC_WIX_CLIENT_ID, containing the client ID, to your
              deployment provider. */}
            </h1>
          </main>
        </body>
      )}
    </html>
  );
}
