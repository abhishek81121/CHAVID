import ThirdPartyEmailPasswordWebJs from "supertokens-web-js/recipe/thirdpartyemailpassword";
import SessionWebJs from "supertokens-web-js/recipe/session";
import { appInfo } from "./appInfo";
import { SuperTokensConfig } from "supertokens-web-js/types";

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [ThirdPartyEmailPasswordWebJs.init(), SessionWebJs.init()],
  };
};
