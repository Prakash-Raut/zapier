import { BoxIcon, ChevronDownIcon, HelpCircleIcon } from "lucide-react";
import Link from "next/link";
import { ZapierIcon } from "./icon";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-4">
				<Link href="/" aria-label="Go to the Zapier Homepage">
					<ZapierIcon />
				</Link>
				<nav
					className="hidden items-center space-x-6 lg:flex"
					aria-label="Main navigation"
				>
					<div className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-gray-900">
						<span>Products</span>
						<ChevronDownIcon className="h-4 w-4" />
					</div>
					<div className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-gray-900">
						<span>Solutions</span>
						<ChevronDownIcon className="h-4 w-4" />
					</div>
					<div className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-gray-900">
						<span>Resources</span>
						<ChevronDownIcon className="h-4 w-4" />
					</div>
					<Link href="#" className="text-gray-700 hover:text-gray-900">
						Enterprise
					</Link>
					<Link href="#" className="text-gray-700 hover:text-gray-900">
						Pricing
					</Link>
				</nav>
				<div className="flex gap-4 text-lg">
					<Link
						href="/help"
						className="flex items-center justify-center gap-x-2 text-[14px]"
					>
						<HelpCircleIcon className="size-4" />
						Help
					</Link>
					<Link
						href="/apps"
						className="flex items-center justify-center gap-x-2 text-[14px]"
					>
						<BoxIcon className="size-4" />
						Explore Apps
					</Link>
					<Button variant="outline" className="rounded-sm">
						Contact Sales
					</Button>
					<Button variant="ghost" className="rounded-sm">
						Log in
					</Button>
					<Button
						variant="default"
						className="rounded-full bg-orange-600 hover:bg-orange-700"
					>
						Sign up
					</Button>
				</div>
			</div>
			<hr />
		</div>
	);
}
