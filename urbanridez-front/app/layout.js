import './globals.css';
import '@/src/css/estilosComponentes.css';
import NavBar from '@/components/NavBar';
import Footer from '../components/Footer';
import { ApolloWrapper } from '@/src/context/dataContext';
export const metadata = {
  title: "URBANRIDEZ"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper >
          <NavBar/>
            {children}
          <Footer/>
        </ApolloWrapper>
      </body>
    </html>
  )
}
