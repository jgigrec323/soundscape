
import Sidebar from "./components/Sidebar";
import "./globals.css";
import "./styles/index.scss"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false
import { Toaster } from 'sonner'
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";

export const metadata = {
  title: "soundscape",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Toaster position="top-right" richColors />
        <AppProvider>
          <Sidebar></Sidebar>
          <main>
            <Navbar></Navbar>
            {children}
          </main>
          <AudioPlayer></AudioPlayer>
        </AppProvider>
      </body>
    </html>
  );
}
