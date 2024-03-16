"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Result } from "postcss";
import { useState } from "react";
import { emailPasswordSignUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
export default function Home() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const handlesignup = async function (): Promise<object> {
    console.log("hello");
    let trigger: boolean = false;
    try {
      let response = await emailPasswordSignUp({
        formFields: [
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      });

      if (response.status === "FIELD_ERROR") {
        // one of the input formFields failed validaiton

        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax),
            // or the email is not unique.

            return {
              title: "Error",
              description: formField.error,
            };
          } else if (formField.id === "password") {
            // Password validation failed.
            // Maybe it didn't match the password strength

            return {
              title: "Error",
              description: formField.error,
            };
          }
        });
      } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
        // this can happen during automatic account linking. Tell the user to use another
        // login method, or go through the password reset flow.

        return {
          title: "Error",
          description: "Go through the password reset flow",
        };
      } else {
        // sign up successful. The session tokens are automatically handled by
        // the frontend SDK.
        return {
          title: "Success",
        };
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.

        return {
          title: "Error",
          description: err.message,
        };
      } else {
        return {
          title: "Error",
          description: "Oops! Something went wrong.",
        };
      }
    }
    return {
      title: "Error",
      description: "Oops! Something went wrong.",
    };
  };
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Tabs
        defaultValue="Login"
        className="lg:w-4/12 lg:h-4/6 md:border-2 md:rounded-xl md:border-slate-700 md:w-4/12 md:static md:top-0 w-8/12 fixed top-40"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Log In</TabsTrigger>
          <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          {/* Radial gradient for the container to give a faded look */}

          <div className="my-8     md:p-9">
            <div className="flex flex-col space-y-4">
              <button
                className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
                <BottomGradient />
              </button>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Login &rarr;
              <BottomGradient />
            </button>
          </div>
        </TabsContent>
        <TabsContent value="Sign Up">
          <div className="my-8  md:p-9">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tyler"
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Durden"
                  type="text"
                />
              </LabelInputContainer>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={async () => {
                handlesignup().then((result): any => {
                  if (Object.keys(result).length == 1) {
                    // do the redirection here
                  } else {
                    toast(result);
                  }
                });
              }}
            >
              Sign Up &rarr;
              <BottomGradient />
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
