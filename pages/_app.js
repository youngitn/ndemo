
import Layout from '../components/Layout'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import '../styles/globals.css';




function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout><Component {...pageProps} /></Layout>
    </RecoilRoot>
  )
}

export default MyApp
