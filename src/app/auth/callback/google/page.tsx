"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  //   useEffect(() => {
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 2000);
  //   }, []);
  async function handler() {
    try {
      const response = await thirdPartySignInAndUp();

      if (response.status === "OK") {
        console.log(response.user);
        if (
          response.createdNewRecipeUser &&
          response.user.loginMethods.length === 1
        ) {
          router.push("/home");
        } else {
          router.push("/home");
        }
      } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
        toast({
          title: "Error",
          description: "Problem due to account linking",
          variant: "destructive",
        });
      } else {
        // SuperTokens requires that the third party provider
        // gives an email for the user. If that's not the case, sign up / in
        // will fail.
        toast({
          title: "Error",
          description: "Problem From the side of google services",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Oops! Something went wrong",
          variant: "destructive",
        });
      }
    }
  }
  handler();
}
