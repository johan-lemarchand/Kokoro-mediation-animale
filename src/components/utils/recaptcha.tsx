import React, { useEffect, useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: Error) => void;
}

const Recaptcha: React.FC<RecaptchaProps> = ({ onVerify, onError }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    try {
      const token = await executeRecaptcha('yourAction');
      onVerify(token);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      } else {
        console.error('reCAPTCHA execution failed:', error);
      }
    }
  }, [executeRecaptcha, onVerify, onError]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return null;
};

export default Recaptcha;