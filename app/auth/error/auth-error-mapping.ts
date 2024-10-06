/**
 * Find all errors here : https://authjs.dev/reference/core/errors
 * It's UX friendly message for each error.
 */
const AUTH_ERRORS: Record<string, string> = {
  AccountNotLinked:
    "Votre e-mail est déjà utilisé avec un autre compte. Veuillez vous connecter avec le compte initialement lié à cet e-mail.",
  AdapterError:
    "Un problème technique est survenu lors du traitement de votre demande. Veuillez réessayer plus tard.",
  AuthError:
    "Une erreur d'authentification générale est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
  AuthorizedCallbackError:
    "Nous n'avons pas pu vous connecter. Veuillez vérifier vos identifiants et réessayer.",
  CallbackRouteError:
    "La connexion a échoué en raison d'un problème technique. Veuillez réessayer ou contacter le support pour obtenir de l'aide.",
  CredentialsSignin:
    "Identifiants de connexion non valides. Veuillez vérifier vos informations et réessayer.",
  DuplicateConditionalUI:
    "Une erreur de configuration est survenue. Veuillez contacter le support pour obtenir de l'aide.",
  EmailSignInError:
    "Un problème est survenu lors du démarrage du processus de connexion avec votre e-mail. Veuillez vérifier votre e-mail et réessayer.",
  ErrorPageLoop:
    "Une erreur de configuration a empêché l'affichage correct de la page d'erreur. Veuillez contacter le support.",
  EventError:
    "Un problème technique est survenu lors du traitement de votre demande. Veuillez réessayer plus tard.",
  ExperimentalFeatureNotEnabled:
    "Cette fonctionnalité n'est pas disponible. Veuillez contacter le support pour plus d'informations.",
  InvalidCallbackUrl:
    "L'URL fournie est invalide. Veuillez réessayer avec une URL valide.",
  InvalidCheck:
    "Une vérification de sécurité a échoué. Veuillez réessayer ou contacter le support si le problème persiste.",
  InvalidEndpoints:
    "Une erreur de configuration technique est survenue. Veuillez contacter le support pour obtenir de l'aide.",
  InvalidProvider:
    "La méthode de connexion sélectionnée n'est pas prise en charge. Veuillez choisir une autre méthode ou contacter le support.",
  JWTSessionError:
    "Une erreur de session est survenue. Veuillez vous reconnecter.",
  MissingAdapter:
    "Une configuration technique est manquante. Veuillez contacter le support pour obtenir de l'aide.",
  MissingAdapterMethods:
    "Une partie de la configuration est manquante. Veuillez contacter le support pour obtenir de l'aide.",
  MissingAuthorize:
    "La méthode de connexion est mal configurée. Veuillez contacter le support pour obtenir de l'aide.",
  MissingCSRF:
    "Une erreur de sécurité est survenue. Veuillez rafraîchir la page et réessayer.",
  MissingSecret:
    "Une erreur de configuration du serveur est survenue. Veuillez contacter le support.",
  MissingWebAuthnAutocomplete:
    "Une erreur de configuration est survenue avec WebAuthn. Veuillez contacter le support.",
  OAuthAccountNotLinked:
    "Votre e-mail est lié à un autre compte. Veuillez utiliser le compte initialement lié à cet e-mail.",
  OAuthCallbackError:
    "La connexion avec le service externe a échoué. Veuillez réessayer ou choisir une autre méthode de connexion.",
  OAuthProfileParseError:
    "Nous n'avons pas pu récupérer votre profil depuis le service externe. Veuillez réessayer ou contacter le support.",
  OAuthSignInError:
    "Un problème est survenu lors du démarrage du processus de connexion. Veuillez réessayer ou contacter le support.",
  SessionTokenError:
    "Nous n'avons pas pu récupérer les informations de votre session. Veuillez vous reconnecter.",
  SignOutError:
    "Un problème est survenu lors de la déconnexion. Veuillez réessayer.",
  UnknownAction:
    "Cette action n'est pas prise en charge. Veuillez vérifier votre demande et réessayer.",
  UnsupportedStrategy:
    "Cette méthode de connexion n'est pas prise en charge. Veuillez choisir une autre méthode.",
  UntrustedHost:
    "La tentative de connexion provient d'une source non fiable. Veuillez vous assurer que vous accédez au site depuis un endroit sûr.",
  Verification:
    "La vérification a échoué. Veuillez vérifier votre e-mail et votre jeton, puis réessayer.",
  WebAuthnVerificationError:
    "La vérification avec WebAuthn a échoué. Veuillez réessayer ou utiliser une autre méthode d'authentification.",
};

export const getError = (errorCode: unknown) => {
  if (errorCode === undefined || errorCode === null) {
    return {
      error: undefined,
      errorMessage: undefined,
    };
  }

  const error = typeof errorCode === "string" ? errorCode : "AuthError";

  const errorMessage =
    AUTH_ERRORS[error] || "An unknown error occurred. Please try again later.";

  return {
    error,
    errorMessage,
  };
};
