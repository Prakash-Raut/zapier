import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "zapier - auth",
	description: "zapier - auth",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
