     1	import type { Metadata } from "next";
     2	import "./globals.css";
     3	
     4	export const metadata: Metadata = {
     5	  title: "Favily — Shop Everything You Love",
     6	  description: "Favily is your one-stop online marketplace for fashion, accessories, homewares, groceries, books and more. Shop with confidence.",
     7	  openGraph: {
     8	    title: "Favily — Shop Everything You Love",
     9	    description: "Your one-stop online marketplace for fashion, homewares, groceries, books & more.",
    10	    type: "website",
    11	  },
    12	};
    13	
    14	export default function RootLayout({
    15	  children,
    16	}: Readonly<{
    17	  children: React.ReactNode;
    18	}>) {
    19	  return (
    20	    <html lang="en">
    21	      <body className="min-h-screen">
    22	        {children}
    23	      </body>
    24	    </html>
    25	  );
    26	}
    27	
