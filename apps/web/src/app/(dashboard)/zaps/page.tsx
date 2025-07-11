import {
	Bookmark,
	Filter,
	Folder,
	Globe,
	Plus,
	RotateCcw,
	Search,
	Trash2,
	Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function ZapsPage() {
	return (
		<div className="mx-auto max-w-7xl p-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="font-semibold text-2xl text-gray-900">Zaps</h1>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						className="border-gray-300 bg-transparent text-gray-600"
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Trash
					</Button>
					<Button className="bg-[#6366F1] text-white hover:bg-[#5B5BD6]">
						<Plus className="mr-2 h-4 w-4" />
						Create
					</Button>
				</div>
			</div>

			{/* Filters */}
			<div className="mb-6 flex items-center gap-4">
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="border-blue-200 bg-blue-50 text-blue-700"
					>
						<Zap className="mr-2 h-4 w-4" />
						Zaps
					</Button>
					<Button
						variant="outline"
						className="border-gray-300 bg-transparent text-gray-600"
					>
						<Folder className="mr-2 h-4 w-4" />
						Folders
					</Button>
				</div>

				<Select defaultValue="all">
					<SelectTrigger className="w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="on">On</SelectItem>
						<SelectItem value="off">Off</SelectItem>
					</SelectContent>
				</Select>

				<Button
					variant="outline"
					className="border-gray-300 bg-transparent text-gray-600"
				>
					<Filter className="mr-2 h-4 w-4" />
					Filters
				</Button>

				<Button
					variant="outline"
					size="icon"
					className="border-gray-300 bg-transparent text-gray-600"
				>
					<Bookmark className="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					className="border-gray-300 bg-transparent text-gray-600"
				>
					<RotateCcw className="h-4 w-4" />
				</Button>

				<div className="relative ml-auto">
					<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
					<Input
						placeholder="Search by name or webhook"
						className="w-80 pl-10"
					/>
				</div>
			</div>

			{/* Empty State */}
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
					<Zap className="h-8 w-8 text-gray-400" />
				</div>

				<h2 className="mb-2 font-semibold text-gray-900 text-xl">
					You haven't created a Zap yet
				</h2>

				<p className="mb-8 max-w-md text-gray-600">
					Build automated workflows by creating your first Zap.
				</p>

				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						className="border-gray-300 bg-transparent text-gray-700"
					>
						<Globe className="mr-2 h-4 w-4" />
						Explore templates
					</Button>
					<Button className="bg-[#6366F1] text-white hover:bg-[#5B5BD6]">
						<Plus className="mr-2 h-4 w-4" />
						Create Zap
					</Button>
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
