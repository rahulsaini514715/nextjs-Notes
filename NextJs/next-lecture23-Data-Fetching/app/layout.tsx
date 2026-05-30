import {Roboto} from "next/font/google"
import "../app/globals.css"
import { Work_Sans } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
});

const workSans = Work_Sans({ subsets : ["latin"]});

export default function RootLayout({children}){


  return (
    <html lang="en">
      {/* <body className="={roboto.className}" */}
      <body className="={workSans.className}"
      >
        {children}
      </body>
    </html>
  );
}
