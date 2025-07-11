"use client";

import { Home, Search, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 p-6">
			<div className="mx-auto max-w-2xl text-center">
				<div
					className={`mb-8 transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
				>
					<div className="relative">
						<svg
							width="400"
							height="300"
							viewBox="0 0 400 300"
							className="mx-auto"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>404 Not Found</title>
							<circle
								cx="100"
								cy="80"
								r="20"
								fill="#FF4A00"
								opacity="0.1"
								className="animate-pulse"
							/>
							<circle
								cx="320"
								cy="60"
								r="15"
								fill="#6366F1"
								opacity="0.2"
								className="animate-bounce"
								style={{ animationDelay: "0.5s" }}
							/>
							<circle
								cx="350"
								cy="200"
								r="25"
								fill="#FF4A00"
								opacity="0.1"
								className="animate-pulse"
								style={{ animationDelay: "1s" }}
							/>
							<circle
								cx="50"
								cy="220"
								r="18"
								fill="#6366F1"
								opacity="0.15"
								className="animate-bounce"
								style={{ animationDelay: "1.5s" }}
							/>

							<text
								x="200"
								y="150"
								textAnchor="middle"
								className="fill-gray-200 font-bold text-8xl"
								style={{ fontSize: "72px" }}
							>
								404
							</text>

							<g className="animate-float">
								<circle cx="150" cy="120" r="25" fill="#FF4A00" opacity="0.9" />
								<path
									d="M140 110 L155 125 L150 130 L160 140 L145 125 L150 120 Z"
									fill="white"
								/>
							</g>

							<g className="animate-float-delayed">
								<circle cx="280" cy="180" r="20" fill="#6366F1" opacity="0.8" />
								<path
									d="M273 173 L285 185 L282 188 L290 195 L278 185 L281 180 Z"
									fill="white"
								/>
							</g>

							<path
								d="M150 145 Q200 100 280 160"
								stroke="#FF4A00"
								strokeWidth="2"
								fill="none"
								opacity="0.3"
								strokeDasharray="5,5"
								className="animate-dash"
							/>
						</svg>

						<div className="absolute top-10 left-10 animate-float">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
								<Zap className="h-4 w-4 text-[#FF4A00]" />
							</div>
						</div>

						<div className="absolute top-20 right-16 animate-float-delayed">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
								<div className="h-2 w-2 rounded-full bg-[#6366F1]" />
							</div>
						</div>

						<div className="absolute bottom-16 left-20 animate-bounce">
							<div className="h-4 w-4 rounded-full bg-orange-200" />
						</div>

						<div className="absolute right-10 bottom-10 animate-pulse">
							<div className="h-5 w-5 rounded-full bg-purple-200" />
						</div>
					</div>
				</div>

				<div
					className={`transition-all delay-300 duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
				>
					<h1 className="mb-4 font-bold text-4xl text-gray-900">
						Oops! Page not found
					</h1>
					<p className="mx-auto mb-8 max-w-md text-gray-600 text-lg">
						The page you're looking for seems to have wandered off into the
						automation void. Let's get you back on track!
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link href="/home">
							<Button className="rounded-lg bg-[#FF4A00] px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-[#E63E00]">
								<Home className="mr-2 h-4 w-4" />
								Back to Home
							</Button>
						</Link>

						<Link href="/zaps">
							<Button
								variant="outline"
								className="rounded-lg border-gray-300 bg-transparent px-6 py-3 font-medium text-gray-700 transition-all hover:scale-105 hover:bg-gray-50"
							>
								<Zap className="mr-2 h-4 w-4" />
								View Zaps
							</Button>
						</Link>
					</div>

					<div className="mx-auto mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<div className="flex items-center gap-3">
							<Search className="h-5 w-5 text-gray-400" />
							<span className="text-gray-600">
								Try searching for what you need
							</span>
						</div>
					</div>
				</div>

				<div
					className={`mt-12 transition-all delay-500 duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
				>
					<p className="text-gray-500 text-sm">
						Need help? Check out our{" "}
						<a href="/help" className="text-[#FF4A00] hover:underline">
							Help Center
						</a>{" "}
						or{" "}
						<a href="/contact" className="text-[#FF4A00] hover:underline">
							Contact Support
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
