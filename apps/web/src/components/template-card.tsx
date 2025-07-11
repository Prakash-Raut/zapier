import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TemplateCardProps {
	title: string;
	description: string;
	icons: string[];
	badge?: string;
}

export function TemplateCard({
	title,
	description,
	icons,
	badge,
}: TemplateCardProps) {
	return (
		<Card className="cursor-pointer border border-gray-200 transition-shadow hover:shadow-md">
			<CardContent className="p-6">
				<div className="mb-4 flex items-start gap-3">
					{icons.map((icon) => (
						<div
							key={icon}
							className="flex h-8 w-8 items-center justify-center rounded bg-gray-100"
						>
							<span className="text-xs">{icon}</span>
						</div>
					))}
				</div>
				<h3 className="mb-2 line-clamp-2 font-medium text-gray-900">{title}</h3>
				<p className="mb-3 line-clamp-2 text-gray-600 text-sm">{description}</p>
				{badge && (
					<Badge
						variant="secondary"
						className="bg-blue-50 text-blue-700 text-xs"
					>
						{badge}
					</Badge>
				)}
			</CardContent>
		</Card>
	);
}
