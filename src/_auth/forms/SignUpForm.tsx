import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SignUpValidation } from "@/lib/validation";
import styles from "./SignUpForm.module.css";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserContext } from "@/context/AuthContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queries";

const zip = (arr1: string[], arr2: string[]) =>
  arr1.map((val, idx) => [val, arr2[idx]]);

const SignUpForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // const sessions = account.listSessions();
    // if ((await sessions).total > 0) {
    //   await account.deleteSession("current");
    // }
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast.warning("User could not be created");
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast.warning("User could not be signed up.");
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
      return;
    }
  }

  const formElementsCap = ["Name", "Username", "Email", "Password"];
  const formElementsSmall = ["name", "username", "email", "password"];

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
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To start using SnapGram, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex flex-col gap-5 w-full mt-4"
        >
          {zip(formElementsCap, formElementsSmall).map(([cap, small]) => (
            <FormField
              key={small}
              control={form.control}
              name={small as "name" | "username" | "email" | "password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{cap}</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      type={small === "password" ? "password" : "text"}
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
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-left">
            Already have an account?
            <Link
              className=" text-small-semibold ml-2 text-primary-500 hover:text-primary-500-hover"
              to={"/sign-in"}
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
