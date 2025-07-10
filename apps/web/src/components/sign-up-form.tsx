"use client";

import { useForm } from "@tanstack/react-form";
import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod/v4";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "./icon";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function SignUpForm() {
	const router = useRouter();
	const { isPending } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Sign up successful");
					},
					onError: (error) => {
						toast.error(error.error.message);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
				name: z.string().min(2, "Name must be at least 2 characters"),
				email: z.email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="mx-auto mt-10 flex w-full max-w-5xl items-center justify-center gap-x-10 p-6">
			<section className="w-1/2 space-y-4">
				<h2 className="font-bold text-3xl">
					AI Automation starts and scales with Zapier
				</h2>
				<p className="">
					Orchestrate AI across your teams, tools, and processes. Turn ideas
					into automated action today, and power tomorrow’s business growth.
				</p>

				<div className="space-y-2">
					<p className="flex items-center gap-x-2 text-sm">
						<CircleCheckIcon className="size-4 text-green-500" />
						Integrate 8,000+ apps and 300+ AI tools without code
					</p>
					<p className="flex items-center gap-x-2 text-sm">
						<CircleCheckIcon className="size-4 text-green-500" />
						Build AI-powered workflows in minutes, not weeks
					</p>
					<p className="flex items-center gap-x-2 text-sm">
						<CircleCheckIcon className="size-4 text-green-500" />
						14-day trial of all premium features and apps
					</p>
				</div>
			</section>

			<section className="w-1/2 space-y-4 rounded-lg border p-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						void form.handleSubmit();
					}}
					className="space-y-4"
				>
					<div className="py-4">
						<Button variant="outline" className="w-full cursor-pointer">
							<GoogleIcon />
							Continue with Google
						</Button>
					</div>

					<div>
						<div className="flex items-center justify-center">
							<div className="h-[1px] w-full bg-gray-300" />
							<p className="px-2 text-center text-gray-500 text-sm">OR</p>
							<div className="h-[1px] w-full bg-gray-300" />
						</div>
					</div>

					<div>
						<form.Field name="name">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>* Name</Label>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.map((error) => (
										<p key={error?.message} className="text-red-500">
											{error?.message}
										</p>
									))}
								</div>
							)}
						</form.Field>
					</div>

					<div>
						<form.Field name="email">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>* Email</Label>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.map((error) => (
										<p key={error?.message} className="text-red-500">
											{error?.message}
										</p>
									))}
								</div>
							)}
						</form.Field>
					</div>

					<div>
						<form.Field name="password">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>* Password</Label>
									<Input
										id={field.name}
										name={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.errors.map((error) => (
										<p key={error?.message} className="text-red-500">
											{error?.message}
										</p>
									))}
								</div>
							)}
						</form.Field>
					</div>

					<div className="mt-4 text-center">
						<p className="text-gray-500 text-sm">
							By signing up, you agree to our{" "}
							<Link
								href="/terms"
								className="text-blue-700 underline hover:text-blue-800"
							>
								terms of service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="text-blue-700 underline hover:text-blue-800"
							>
								privacy policy
							</Link>
							.
						</p>
					</div>

					<form.Subscribe>
						{(state) => (
							<Button
								type="submit"
								className="w-full cursor-pointer bg-orange-600 font-bold hover:bg-orange-700"
								disabled={!state.canSubmit || state.isSubmitting}
							>
								{state.isSubmitting ? "Submitting..." : "Get started for free"}
							</Button>
						)}
					</form.Subscribe>
				</form>

				<div className="mt-4 flex items-center justify-center text-center">
					<p>Already have an account?</p>
					<Link
						href="/login"
						className="cursor-pointer text-indigo-600 underline hover:text-indigo-800"
					>
						Sign In
					</Link>
				</div>
			</section>
		</div>
	);
}
