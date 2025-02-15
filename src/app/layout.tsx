import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib";
import { Providers } from "./providers";

const montserrat = Montserrat({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: "Книжный магазин",
	description: "Книжный магазин",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					montserrat.className,
				)}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
