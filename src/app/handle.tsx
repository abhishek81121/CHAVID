//This file takes care of all the logic for signup and login
import { emailPasswordSignUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword";
export const handlesignup = async function (
  email: string,
  password: string
): Promise<object> {
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
            variant: "destructive",
          };
        } else if (formField.id === "password") {
          // Password validation failed.
          // Maybe it didn't match the password strength

          return {
            title: "Error",
            description: formField.error,
            variant: "destructive",
          };
        }
      });
    } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
      // this can happen during automatic account linking. Tell the user to use another
      // login method, or go through the password reset flow.

      return {
        title: "Error",
        description: "Go through the password reset flow",
        variant: "destructive",
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
        variant: "destructive",
        description: err.message,
      };
    } else {
      return {
        title: "Error",
        variant: "destructive",
        description: "Oops! Something went wrong.",
      };
    }
  }
  return {
    title: "Error",
    variant: "destructive",
    description: "Oops! Something went wrong.",
  };
};

export const handleLogin = async function name(
  email: string,
  password: string
): Promise<object> {
  try {
    let response = await emailPasswordSignIn({
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
      response.formFields.forEach((formField) => {
        if (formField.id === "email") {
          // Email validation failed (for example incorrect email syntax).
          return {
            title: "Error",
            description: formField.error,
            variant: "destructive",
          };
        }
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      return {
        title: "Error",
        description: "Email password combination is incorrect.",
        variant: "destructive",
      };
    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
      // this can happen due to automatic account linking. Tell the user that their
      // input credentials is wrong (so that they do through the password reset flow)
      return {
        title: "Error",
        description: "Go through the password reset flow",
        variant: "destructive",
      };
    } else {
      // sign in successful. The session tokens are automatically handled by
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
        variant: "destructive",
      };
    } else {
      return {
        title: "Error",
        description: "Oops! Something went wrong.",
        variant: "destructive",
      };
    }
  }
  return {
    tile: "Error",
    desc: "Something went wrong",
  };
};
export const handleGoogleLogin = async function () {};
