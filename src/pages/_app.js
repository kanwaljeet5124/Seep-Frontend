import { WebSocketProvider } from "@/context/socketContext";
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return <>
    
    <main
      className={`flex w-full flex-wrap items-start justify-center py-10 ${inter.className}`}
    >
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </main>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </>
}
