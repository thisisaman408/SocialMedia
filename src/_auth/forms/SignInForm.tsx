import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useUserContext } from '@/context/AuthContext';
import { SignInValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import styles from './SignUpForm.module.css';
// import { account } from "@/lib/appwrite/config";
import { Input } from '@/components/ui/input';
import { useSignInAccount } from '@/lib/react-query/queries';

const zip = (arr1: string[], arr2: string[]) =>
	arr1.map((val, idx) => [val, arr2[idx]]);

const SignInForm = () => {
	const navigate = useNavigate();
	const { checkAuthUser } = useUserContext();
	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccount();

	const form = useForm<z.infer<typeof SignInValidation>>({
		resolver: zodResolver(SignInValidation),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	async function onSubmit(values: z.infer<typeof SignInValidation>) {
		// const currentSessions = account.listSessions();
		// if ((await currentSessions).total > 0) {
		//   console.log("I am inside the current session.total block");
		//   navigate("/");
		//   return toast.warning("User already signed in.");
		// }
		// console.log("I am outside the current session.total block");
		// const session = await account.deleteSession("all");
		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});
		console.log('session', session);

		if (!session) {
			return toast.warning('User could not be signed in.');
		}
		const isLoggedIn = await checkAuthUser();
		console.log('isLoggedIn', isLoggedIn);
		console.log('Session is not null');
		if (isLoggedIn) {
			form.reset();
			navigate('/');
			return;
		} else {
			return toast.warning('User could not be signed in.');
		}
	}

	const formElementsCap = ['Email', 'Password'];
	const formElementsSmall = ['email', 'password'];

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-col flex-center">
				<img
					src="/assets/images/logo.svg"
					alt="logo"
					width={40}
					height={40}
					className=""
				/>
				<h2 className="h3-bold md: h2-bold pt-5 sm:pt-12">
					Welcome back to SnapGram
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					Log in to your account
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-2 flex flex-col gap-5 w-full mt-4">
					{zip(formElementsCap, formElementsSmall).map(([cap, small]) => (
						<FormField
							key={small}
							control={form.control}
							name={small as 'email' | 'password'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{cap}</FormLabel>
									<FormControl>
										<Input
											className="shad-input"
											type={small === 'password' ? 'password' : 'text'}
											autoComplete={small}
											placeholder={`Enter your ${small}`}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Button type="submit" className={`w-1/2 ${styles.submitButton}`}>
						{isSigningIn ? (
							<div className="flex-center gap-2">
								<Loader /> Loading...
							</div>
						) : (
							'Log in'
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-left">
						Do not have an account?
						<Link
							className=" text-small-semibold ml-2 text-primary-500 hover:text-primary-500-hover"
							to={'/sign-up'}>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignInForm;
