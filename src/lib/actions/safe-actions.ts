import { createSafeActionClient } from "next-safe-action";
import { auth, AuthError } from "../auth/helper";
import { logger } from "../logger";
import { User } from "next-auth";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type HandleReturnedServerError = (e: Error) => string;

const handleReturnedServerError: HandleReturnedServerError = (e) => {
  if (e instanceof ActionError) {
    logger.debug("[DEV] - Action Error", e.message);
    return e.message;
  }

  if (e instanceof AuthError) {
    logger.debug("[DEV] - Auth Error", e.message);
    return e.message;
  }

  logger.debug("[DEV] - Unknown Error", e);

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleReturnedServerError,
});

const getUser = async () => {
  const user = await auth();

  if (!user) {
    throw new ActionError("Session not found!");
  }

  // In the real world, you would check if the session is valid by querying a database.
  // We'll keep it very simple here.

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!");
  }

  return user as User;
};

export const authAction = createSafeActionClient({
  handleReturnedServerError,
}).use(async ({ next }) => {
  const user = await getUser();

  return next({
    ctx: {
      user: user as User,
    },
  });
});
