import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router';

interface AnalyticsContextType {
  sessionId: string;
  trackEvent: (eventType: string, metadata?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem('qr_secure_sense_session_id');
    if (stored) return stored;
    const newId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('qr_secure_sense_session_id', newId);
    return newId;
  });

  const location = useLocation();

  const trackEvent = async (eventType: string, metadata?: Record<string, any>) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          event_type: eventType,
          page_path: location.pathname,
          metadata: metadata ? JSON.stringify(metadata) : null,
        }),
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  // Track page views
  useEffect(() => {
    trackEvent('page_view');
  }, [location.pathname]);

  return (
    <AnalyticsContext.Provider value={{ sessionId, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
