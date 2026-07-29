import { useEffect, useRef } from "react";

interface TurnstileProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const Turnstile = ({
  siteKey,
  onSuccess,
  onExpire,
  onError,
}: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>();

  useEffect(() => {
    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;

      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        appearance: "interaction-only",
        // appearance: "execute",
        execution: "render",
        callback: onSuccess,
        "expired-callback": onExpire,
        "error-callback": onError,
      } as any);
    };

    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else {
      renderWidget();
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} />;
};

export default Turnstile;
