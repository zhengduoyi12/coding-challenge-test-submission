import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-primary',
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <div className={roboto.variable}>
    <Component {...pageProps} />
  </div>;
}
