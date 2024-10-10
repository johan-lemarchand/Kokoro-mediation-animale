import { useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import dynamic from 'next/dynamic';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: Error) => void;
}

interface RecaptchaRef {
  reset: () => void;
  execute: () => Promise<void>;
}

const Recaptcha = forwardRef<RecaptchaRef, RecaptchaProps>(
  ({ onVerify, onError }, ref) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const hasExecuted = useRef(false);

    const handleReCaptchaVerify = useCallback(async () => {
      if (!executeRecaptcha || hasExecuted.current) {
        return;
      }

      try {
        hasExecuted.current = true;
        const token = await executeRecaptcha("contact_form_submission");
        onVerify(token);
        return token;
      } catch (error) {
        if (onError && error instanceof Error) {
          onError(error);
        } else {
          console.error("reCAPTCHA execution failed:", error);
        }
      }
    }, [executeRecaptcha, onVerify, onError]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        hasExecuted.current = false;
      },
      execute: async () => {
        await handleReCaptchaVerify();
      },
    }));

    useEffect(() => {
      if (executeRecaptcha) {
        handleReCaptchaVerify();
      }

      return () => {
        hasExecuted.current = false;
      };
    }, [handleReCaptchaVerify, executeRecaptcha]);

    return null;
  }
);

Recaptcha.displayName = "Recaptcha";

export default dynamic<RecaptchaProps>(() => Promise.resolve(Recaptcha), { ssr: false });
