import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

export function ProductCard({
	icon: Icon,
	title,
	description,
}: ProductCardProps) {
	return (
		<Card className="cursor-pointer border border-gray-200 transition-shadow hover:shadow-md">
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
						<Icon className="h-5 w-5 text-white" />
					</div>
					<div>
						<h3 className="mb-1 font-semibold text-gray-900">{title}</h3>
						<p className="text-gray-600 text-sm">{description}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
