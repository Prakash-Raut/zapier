"use client";

import { useForm } from "@tanstack/react-form";
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

export function SignInForm() {
	const router = useRouter();
	const { isPending } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Sign in successful");
					},
					onError: (error) => {
						toast.error(error.error.message);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
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
				<h2 className="font-bold text-3xl">Automate across your teams</h2>
				<p className="text-sm">
					Zapier Enterprise empowers everyone in your business to securely
					automate their work in minutes, not months—no coding required.
				</p>
				<Button
					variant="default"
					className="cursor-pointer rounded-sm bg-purple-600 p-6 font-bold text-xl hover:bg-purple-700"
				>
					Explore Zapier Enterprise
				</Button>
			</section>

			<section className="w-1/2 space-y-4 rounded-lg border p-4">
				<h4 className="mb-6 text-center font-bold text-2xl">
					Log in to your account
				</h4>

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
							<div className="h-[1px] w-full bg-gray-100" />
							<p className="px-2 text-center text-gray-500 text-sm">OR</p>
							<div className="h-[1px] w-full bg-gray-100" />
						</div>
					</div>

					<div>
						<form.Field name="email">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>
										Email <span className="text-red-500">*</span>
									</Label>
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
									<Label htmlFor={field.name}>
										Password <span className="text-red-500">*</span>
									</Label>
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

					<form.Subscribe>
						{(state) => (
							<Button
								variant="secondary"
								type="submit"
								className="w-full cursor-pointer"
								disabled={!state.canSubmit || state.isSubmitting}
							>
								{state.isSubmitting ? "Submitting..." : "Continue"}
							</Button>
						)}
					</form.Subscribe>
				</form>

				<div className="mt-4 flex items-center justify-center text-center">
					<p>Don't have a Zapier account yet?</p>
					<Link
						href="/signup"
						className="cursor-pointer text-indigo-600 underline hover:text-indigo-800"
					>
						Sign Up
					</Link>
				</div>
			</section>
		</div>
	);
}
