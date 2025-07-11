"use client";

import {
	Compass,
	History,
	Home,
	MessageSquare,
	MoreHorizontal,
	Palette,
	Plug,
	Square,
	Table,
	Users,
	Zap,
} from "lucide-react";
import type * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { ZapierIcon } from "../icon";
import { Separator } from "../ui/separator";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
	user: {
		name: "Prakash Raut",
		email: "prakashraut@gmail.com",
		avatar: "/avatars/prakashraut.jpg",
	},
	navMain: [
		{
			title: "Home",
			url: "/home",
			icon: Home,
		},
		{
			title: "Discover",
			url: "/discover",
			icon: Compass,
		},
		{
			title: "Zaps",
			url: "/zaps",
			icon: Zap,
		},
		{
			title: "Tables",
			url: "/tables",
			icon: Table,
		},
		{
			title: "Interfaces",
			url: "/interfaces",
			icon: Square,
		},
		{
			title: "Chatbots",
			url: "/chatbots",
			icon: MessageSquare,
			badge: "Beta",
		},
		{
			title: "Canvas",
			url: "/canvas",
			icon: Palette,
			badge: "Beta",
		},
		{
			title: "Agents",
			url: "/agents",
			icon: Users,
			badge: "Beta",
		},
		{
			title: "App Connections",
			url: "/app-connections",
			icon: Plug,
		},
		{
			title: "Zap History",
			url: "/zap-history",
			icon: History,
		},
		{
			title: "More",
			url: "/more",
			icon: MoreHorizontal,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex items-center justify-start">
					<ZapierIcon />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<Separator />
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
