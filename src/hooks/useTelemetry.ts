import { useEffect } from 'react';
import { telemetry } from '@/lib/telemetry';
import { useLocation } from 'react-router-dom';

/**
 * Hook to track page views automatically
 */
export const useTelemetry = () => {
  const location = useLocation();

  useEffect(() => {
    if (telemetry.getConsent()) {
      telemetry.trackPageView(location.pathname);
    }
  }, [location.pathname]);

  return {
    trackInteraction: telemetry.trackInteraction.bind(telemetry),
    trackCustomEvent: telemetry.trackCustomEvent.bind(telemetry),
  };
};
