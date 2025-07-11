"use client";

import { type LucideIcon, PlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<Button
				variant="default"
				className="rounded-lg bg-orange-500 font-semibold text-white hover:bg-orange-600 hover:text-white"
				onClick={() => router.push("/create-zap")}
			>
				<PlusIcon />
				Create
			</Button>
			<SidebarMenu className="mt-4">
				{items.map((item) => {
					const isActive = pathname === item.url;
					return (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								isActive={isActive}
								onClick={() => router.push(item.url)}
							>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
