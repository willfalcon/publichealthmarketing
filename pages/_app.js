import Wrapper from '@/components/Wrapper';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}
