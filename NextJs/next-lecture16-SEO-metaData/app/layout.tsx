export const metadata = {
  // 🔹 Browser tab ka main title
  // default → normal pages ke liye
  // template → dynamic pages ke liye ( %s = page title )
  title: {
    default: "Thapa Technical | Learn Web Development",
    template: "%s | Thapa Technical",
  },

  // 🔹 Website ka short description
  // SEO + Google search result me show hota hai
  description:
    "Free tutorials on React, Next.js and full stack web development by Thapa Technical.",

  // 🔹 SEO keywords (Google ignore karta hai mostly, but safe to add)
  keywords: [
    "React",
    "Next.js",
    "Web Development",
    "Full Stack",
    "Thapa Technical",
  ],

  // 🔹 Website author info
  authors: [{ name: "Thapa Technical", url: "https://thapatechnical.com" }],

  // 🔹 Favicon / icon
  // public folder ke andar file honi chahiye
  icons: {
    icon: "/vercel.svg",
  },

  // 🔹 Base URL (SEO + OpenGraph ke liye IMPORTANT)
  metadataBase: new URL("https://yourdomain.com"),

  // 🔹 Open Graph metadata
  // Jab link WhatsApp / Facebook / LinkedIn pe share hota hai
  openGraph: {
    title: "Thapa Technical",
    description: "Join the best web dev tutorials!",
    url: "https://yourdomain.com",
    siteName: "Thapa Technical",
    images: [
      {
        url: "/og-image.png", // public folder me image
        width: 1200,
        height: 630,
        alt: "Thapa Technical OpenGraph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🔹 Twitter card metadata
  // Twitter (X) pe link preview ke liye
  twitter: {
    card: "summary_large_image",
    title: "Thapa Technical",
    description: "Learn modern web development step by step",
    images: ["/og-image.png"],
    creator: "@thapatechnical",
  },

  // 🔹 Search engine ko batata hai page index karna hai ya nahi
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children}){


  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
