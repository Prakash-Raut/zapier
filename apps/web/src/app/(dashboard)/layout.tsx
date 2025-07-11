import { Grid3X3Icon, HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import { AppSidebar } from "@/components/dash/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<div className="flex items-center justify-between px-6">
							<div className="flex items-center gap-6">
								<Button
									variant="ghost"
									className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
								>
									<Search className="h-4 w-4" />
									<span className="text-sm">Search</span>
								</Button>

								<Button
									variant="ghost"
									className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
								>
									<HelpCircle className="h-4 w-4" />
									<span className="text-sm">Help</span>
								</Button>

								<Button
									variant="ghost"
									className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
								>
									<Grid3X3Icon className="h-4 w-4" />
									<span className="text-sm">Explore apps</span>
								</Button>

								<Button
									variant="ghost"
									className="text-gray-600 text-sm hover:text-gray-900"
								>
									Contact Sales
								</Button>

								<Button className="rounded-lg bg-[#6366F1] px-4 py-2 text-sm text-white hover:bg-[#5B5BD6]">
									Upgrade
								</Button>

								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366F1]">
									<span className="font-medium text-sm text-white">PR</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
						{children}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
