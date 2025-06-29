// app/layout.jsx or app/RootLayout.jsx

import ChatbaseWidget from "./ChatbaseWidget";
import "./globals.css";
import LayoutContent from "./LayoutContent";
import ReduxProvider from "./ReduxProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Raasid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <LayoutContent> <ChatbaseWidget />{children}</LayoutContent>
          

          {/* ✅ ToastContainer outside children, but inside ReduxProvider */}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
