import {
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: Error) => void;
}

const Recaptcha = forwardRef<{ reset: () => void }, RecaptchaProps>(
  ({ onVerify, onError }, ref) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const hasExecuted = useRef(false);

    const handleReCaptchaVerify = useCallback(async () => {
      if (!executeRecaptcha || hasExecuted.current) {
        return;
      }

      try {
        hasExecuted.current = true;
        const token = await executeRecaptcha("yourAction");
        onVerify(token);
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
    }));

    useEffect(() => {
      handleReCaptchaVerify();

      return () => {
        hasExecuted.current = false;
      };
    }, [handleReCaptchaVerify]);

    return null;
  },
);

Recaptcha.displayName = "Recaptcha";

export default Recaptcha;
