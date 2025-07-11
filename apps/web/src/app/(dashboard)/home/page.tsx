"use client";

import { MessageSquare, Palette, Send, Square, Table, Zap } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { TemplateCard } from "@/components/template-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
	const productCards = [
		{
			icon: Zap,
			title: "Zap",
			description: "Automated workflows",
		},
		{
			icon: Table,
			title: "Table",
			description: "Automated data",
		},
		{
			icon: Square,
			title: "Interface",
			description: "Apps, forms, and pages",
		},
		{
			icon: MessageSquare,
			title: "Chatbot",
			description: "AI-powered chatbot",
		},
		{
			icon: Palette,
			title: "Canvas",
			description: "Process visualization",
		},
	];

	const templates = [
		{
			title:
				"Capture New Leads from Facebook, Analyze Their Details, and Log Them into Google Sheets",
			description:
				"Automatically capture and analyze new leads from Facebook ads",
			icons: ["📘", "⚡", "📊"],
			badge: "AI-powered",
		},
		{
			title: "Receive automatic updates in Google Sheets with ChatGPT insights",
			description:
				"Get AI-powered insights automatically added to your spreadsheets",
			icons: ["📊", "🔄", "📊"],
			badge: "AI-powered",
		},
		{
			title:
				"Instantly Respond to New Emails with AI-Powered Replies via Gmail and Google Docs",
			description: "Automatically generate and send email responses using AI",
			icons: ["📧", "💎", "📧"],
			badge: "AI-powered",
		},
	];

	return (
		<div className="mx-auto max-w-7xl p-6">
			{/* AI Automation Input */}
			<div className="mb-8">
				<div className="mb-4 flex items-center gap-2">
					<h1 className="font-semibold text-2xl text-gray-900">
						What would you like to automate?
					</h1>
					<Badge variant="secondary" className="bg-blue-50 text-blue-700">
						AI beta
					</Badge>
				</div>
				<div className="relative">
					<div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3">
						<Zap className="h-5 w-5 text-[#FF4A00]" />
						<Input
							placeholder="Example: When I add a reaction to a Slack message, create a card in Trello."
							className="border-0 p-0 text-gray-600 placeholder:text-gray-400 focus-visible:ring-0"
						/>
						<Button
							size="icon"
							className="bg-gray-100 text-gray-400 hover:bg-gray-200"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Start from scratch */}
			<div className="mb-8">
				<h2 className="mb-6 font-semibold text-gray-900 text-xl">
					Start from scratch
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
					{productCards.map((card) => (
						<ProductCard key={card.title} {...card} />
					))}
				</div>
			</div>

			{/* Popular templates */}
			<div className="mb-8">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="font-semibold text-gray-900 text-xl">
						Popular templates
					</h2>
					<Button
						variant="link"
						className="p-0 text-blue-600 hover:text-blue-700"
					>
						Browse all templates
					</Button>
				</div>

				{/* Template filters */}
				<div className="mb-6 flex gap-2">
					<Badge
						variant="outline"
						className="border-blue-200 bg-blue-50 text-blue-700"
					>
						⭐ AI Workflows
					</Badge>
					<Badge variant="outline" className="border-gray-300 text-gray-700">
						⭐ Most popular
					</Badge>
					<Badge variant="outline" className="border-gray-300 text-gray-700">
						📈 Trending this week
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{templates.map((template) => (
						<TemplateCard key={template.title} {...template} />
					))}
				</div>
			</div>

			{/* Footer */}
			<footer className="mt-16 border-gray-200 border-t pt-8 text-center">
				<div className="flex items-center justify-center gap-6 text-gray-600 text-sm">
					<span>© 2025 Zapier Inc.</span>
					<a href="/legal" className="hover:text-gray-900">
						Legal
					</a>
					<a href="/privacy" className="hover:text-gray-900">
						Privacy
					</a>
				</div>
			</footer>
		</div>
	);
}
