"use client";

import "@xyflow/react/dist/style.css";

import {
	addEdge,
	Background,
	type Connection,
	Controls,
	type Edge,
	MarkerType,
	MiniMap,
	type Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import {
	BellIcon,
	ChevronDownIcon,
	HelpCircleIcon,
	HomeIcon,
	LayoutGridIcon,
	PlusIcon,
	SettingsIcon,
	Zap,
	ZapIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface NodeData {
	label: string;
	type: "trigger" | "action";
}

interface Option {
	id: string;
	name: string;
	description: string;
}

const initialNodes: Node[] = [
	{
		id: "trigger",
		type: "input",
		data: { label: "Select Trigger", type: "trigger" },
		position: { x: 250, y: 0 },
	},
	{
		id: "action1",
		data: { label: "Select Action", type: "action" },
		position: { x: 250, y: 200 },
	},
];

const initialEdges: Edge[] = [
	{
		id: "trigger-action1",
		source: "trigger",
		target: "action1",
		markerEnd: { type: MarkerType.ArrowClosed },
	},
];

const triggerOptions: Option[] = [
	{
		id: "gmail",
		name: "Gmail",
		description: "Trigger when a new email is received",
	},
	{
		id: "slack",
		name: "Slack",
		description: "Trigger when a new message is posted",
	},
	{
		id: "trello",
		name: "Trello",
		description: "Trigger when a new card is created",
	},
];

const actionOptions: Option[] = [
	{
		id: "sheets",
		name: "Google Sheets",
		description: "Add a row to a Google Sheet",
	},
	{
		id: "notion",
		name: "Notion",
		description: "Create a new page in Notion",
	},
	{ id: "twitter", name: "Twitter", description: "Post a new tweet" },
];

export default function CreateZap() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	const updateNodeData = useCallback(
		(id: string, newData: Partial<NodeData>) => {
			setNodes((nds) =>
				nds.map((node) => {
					if (node.id === id) {
						return { ...node, data: { ...node.data, ...newData } };
					}
					return node;
				}),
			);
		},
		[setNodes],
	);

	const handleNodeClick = useCallback(
		(event: React.MouseEvent, node: { id: string }) => {
			setCurrentNodeId(node.id);
			setDialogOpen(true);
		},
		[],
	);

	const handleOptionSelect = (option: Option) => {
		if (currentNodeId) {
			updateNodeData(currentNodeId, { label: option.name });
		}
		setDialogOpen(false);
	};

	const addNewAction = useCallback(() => {
		const newNodeId = crypto.randomUUID();
		const newNode = {
			id: newNodeId,
			data: { label: "Select Action", type: "action" },
			position: { x: 250, y: (nodes[nodes.length - 1]?.position.y ?? 0) + 150 },
		};
		setNodes((nds) => [...nds, newNode]);
		setEdges((eds) => [
			...eds,
			{
				id: `edge-${edges.length + 1}`,
				source: nodes[nodes.length - 1]?.id ?? "",
				target: newNodeId,
				markerEnd: { type: MarkerType.ArrowClosed },
			},
		]);
	}, [nodes, edges, setNodes, setEdges]);

	const filteredOptions =
		currentNodeId &&
		nodes.find((n) => n.id === currentNodeId)?.data.type === "trigger"
			? triggerOptions.filter((option) =>
					option.name.toLowerCase().includes(searchTerm.toLowerCase()),
				)
			: actionOptions.filter((option) =>
					option.name.toLowerCase().includes(searchTerm.toLowerCase()),
				);

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="flex w-16 flex-col items-center space-y-8 py-4">
				<HomeIcon className="size-5" />
				<LayoutGridIcon className="size-5" />
				<ZapIcon className="size-5 text-orange-500" />
				<BellIcon className="size-5" />
				<SettingsIcon className="size-5" />
			</div>

			{/* Main content */}
			<div className="flex flex-1 flex-col">
				{/* Header */}
				<header className="flex items-center justify-between border-b px-4 py-2">
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm">
							<ChevronDownIcon className="mr-2 size-4" />
							Prakash Raut
						</Button>
						<span>/</span>
						<span className="rounded px-2 py-1 font-medium text-sm">PR</span>
						<span className="font-medium">Untitled Zap</span>
						<span className="rounded px-2 py-1 font-medium text-sm">Draft</span>
					</div>
					<div className="flex items-center space-x-4">
						<span className="font-medium text-sm">124%</span>
						<Button variant="ghost" size="sm">
							<HelpCircleIcon className="mr-2 size-4" />
							Help
						</Button>
					</div>
				</header>

				{/* Content */}
				<main className="flex-1 space-y-6 overflow-hidden p-6">
					<div className="flex items-center justify-between">
						<Switch />
						<Button variant="secondary">Publish</Button>
					</div>

					{/* React Flow */}
					<div className="h-[calc(100vh-250px)] overflow-hidden rounded-lg border">
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							onNodeClick={handleNodeClick}
							fitView
						>
							<Background />
							<Controls />
							<MiniMap />
						</ReactFlow>
					</div>

					<div className="flex justify-center">
						<Button onClick={addNewAction} variant="outline" size="lg">
							<PlusIcon className="mr-2 size-4" />
							Add Action
						</Button>
					</div>
				</main>
			</div>

			{/* Selection Dialog */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{currentNodeId &&
							nodes.find((n) => n.id === currentNodeId)?.data.type === "trigger"
								? "Select a Trigger"
								: "Select an Action"}
						</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<Input
							className="mb-4"
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<div className="space-y-4">
							{filteredOptions.map((option) => (
								<Button
									key={option.id}
									className="flex cursor-pointer items-start p-2 hover:rounded-lg"
									variant="ghost"
									onClick={() => handleOptionSelect(option)}
								>
									<div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full">
										<Zap className="size-4" />
									</div>
									<div>
										<h3 className="font-medium">{option.name}</h3>
										<p className="text-sm">{option.description}</p>
									</div>
								</Button>
							))}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
