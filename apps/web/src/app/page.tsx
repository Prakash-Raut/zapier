import {
	BarChart3,
	Bot,
	Facebook,
	Linkedin,
	Shield,
	Twitter,
	Users,
	Workflow,
	Youtube,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { GoogleIcon } from "@/components/icon";

const features = [
	{
		icon: Zap,
		title: "Lightning-fast automation",
		description:
			"Set up workflows in minutes, not hours. Our intuitive interface makes automation accessible to everyone.",
	},
	{
		icon: Users,
		title: "Team collaboration",
		description:
			"Share workflows, collaborate on automations, and manage permissions across your entire organization.",
	},
	{
		icon: Shield,
		title: "Enterprise security",
		description:
			"SOC 2 compliant with enterprise-grade security features to keep your data safe and secure.",
	},
	{
		icon: BarChart3,
		title: "Advanced analytics",
		description:
			"Track performance, monitor usage, and optimize your workflows with detailed insights and reporting.",
	},
	{
		icon: Workflow,
		title: "Multi-step workflows",
		description:
			"Create complex automations with conditional logic, filters, and multi-step processes.",
	},
	{
		icon: Bot,
		title: "AI-powered assistance",
		description:
			"Let AI help you build better workflows with smart suggestions and automated optimizations.",
	},
];

const footerSections = [
	{
		title: "Product",
		links: [
			{ id: 1, name: "AI Workflows", href: "#" },
			{ id: 2, name: "AI Agents", href: "#" },
			{ id: 3, name: "Tables", href: "#" },
			{ id: 4, name: "Interfaces", href: "#" },
			{ id: 5, name: "Canvas", href: "#" },
			{ id: 6, name: "Pricing", href: "#" },
		],
	},
	{
		title: "Solutions",
		links: [
			{ id: 1, name: "By team size", href: "#" },
			{ id: 2, name: "By role", href: "#" },
			{ id: 3, name: "By industry", href: "#" },
			{ id: 4, name: "Enterprise", href: "#" },
			{ id: 5, name: "Startups", href: "#" },
			{ id: 6, name: "Small business", href: "#" },
		],
	},
	{
		title: "Resources",
		links: [
			{ id: 1, name: "Help Center", href: "#" },
			{ id: 2, name: "Community", href: "#" },
			{ id: 3, name: "Blog", href: "#" },
			{ id: 4, name: "Webinars", href: "#" },
			{ id: 5, name: "Templates", href: "#" },
			{ id: 6, name: "API Documentation", href: "#" },
		],
	},
	{
		title: "Company",
		links: [
			{ id: 1, name: "About", href: "#" },
			{ id: 2, name: "Careers", href: "#" },
			{ id: 3, name: "Press", href: "#" },
			{ id: 4, name: "Contact", href: "#" },
			{ id: 5, name: "Security", href: "#" },
			{ id: 6, name: "Privacy", href: "#" },
		],
	},
];

export default function Home() {
	return (
		<>
			<section className="mx-auto flex min-h-screen w-full flex-col items-center justify-center lg:max-w-7xl lg:flex-row lg:gap-10 lg:px-5">
				<div className="flex w-1/2 flex-col justify-center space-y-6">
					<span className="text-sm uppercase">Scale AI agents with Zapier</span>
					<h1 className="scroll-m-20 font-semibold text-5xl tracking-tight">
						The most connected AI orchestration platform
					</h1>
					<p>
						Build and ship AI workflows in minutes—no IT bottlenecks, no
						complexity. Just results.
					</p>
					<div className="flex space-x-4">
						<Link
							href="/signup"
							className="inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-orange-600 px-8 py-3 font-semibold text-lg text-white hover:bg-orange-700"
						>
							Start free with email
						</Link>
						<Link
							href="/api/auth/google"
							className="inline-flex items-center justify-center whitespace-nowrap rounded-sm border-1 border-black px-8 py-3 font-semibold text-lg hover:border-gray-200 dark:hover:border-black"
						>
							<GoogleIcon />
							Start free with Google
						</Link>
					</div>
				</div>
				<div className="w-1/2">
					<img
						src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
						alt="zapier logo"
						loading="lazy"
						className="overflow-hidden rounded-2xl object-contain"
					/>
				</div>
			</section>

			<section
				className="mx-auto max-w-7xl px-4 py-16"
				aria-labelledby="features-heading"
			>
				<div className="mb-16 text-center">
					<h2
						id="features-heading"
						className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl"
					>
						Everything you need to automate your work
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600 text-lg">
						From simple automations to complex workflows, Zapier has the tools
						and integrations you need to connect your apps and automate your
						processes.
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<article
							key={feature.title}
							className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
						>
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
								<feature.icon className="h-6 w-6 text-orange-500" />
							</div>
							<h3 className="mb-2 font-semibold text-gray-900 text-xl">
								{feature.title}
							</h3>
							<p className="text-gray-600">{feature.description}</p>
						</article>
					))}
				</div>
			</section>

			<footer className="bg-gray-900 text-white">
				<div className="mx-auto max-w-7xl px-4 py-16">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
						{/* Logo and description */}
						<div className="lg:col-span-1">
							<Link href="/" className="mb-4 flex items-center">
								<div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 font-bold text-sm text-white">
									Z
								</div>
								<span className="ml-2 font-semibold text-xl">zapier</span>
							</Link>
							<p className="mb-6 text-gray-400">
								The easiest way to automate your work. Connect apps and automate
								workflows.
							</p>
							<div className="flex space-x-4">
								<Link href="#" className="text-gray-400 hover:text-white">
									<Facebook className="h-5 w-5" />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Twitter className="h-5 w-5" />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Linkedin className="h-5 w-5" />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Youtube className="h-5 w-5" />
								</Link>
							</div>
						</div>

						{/* Footer sections */}
						{footerSections.map((section) => (
							<div key={section.title}>
								<h3 className="mb-4 font-semibold">{section.title}</h3>
								<nav>
									<ul className="space-y-2">
										{section.links.map((link) => (
											<li key={link.id}>
												<Link
													href={link.href}
													className="text-gray-400 text-sm hover:text-white"
												>
													{link.name}
												</Link>
											</li>
										))}
									</ul>
								</nav>
							</div>
						))}
					</div>

					<div className="mt-12 flex flex-col items-center justify-between border-gray-800 border-t pt-8 md:flex-row">
						<p className="text-gray-400 text-sm">
							© 2024 Zapier Inc. All rights reserved.
						</p>
						<div className="mt-4 flex space-x-6 md:mt-0">
							<Link href="#" className="text-gray-400 text-sm hover:text-white">
								Terms of Service
							</Link>
							<Link href="#" className="text-gray-400 text-sm hover:text-white">
								Privacy Policy
							</Link>
							<Link href="#" className="text-gray-400 text-sm hover:text-white">
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
