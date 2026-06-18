/**
 * Helper utility to manage Meta (Facebook) Pixel track events safely on client-side React.
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Tracks a standard or custom event with the Meta Pixel.
 * Handles checks to ensure window.fbq exists and runs only on the browser.
 */
export function trackPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    if (typeof window.fbq === 'function') {
      try {
        if (params) {
          window.fbq('track', eventName, params);
        } else {
          window.fbq('track', eventName);
        }
        console.log(`[Meta Pixel] Tracked standard event: ${eventName}`, params || '');
      } catch (error) {
        console.error('[Meta Pixel] Error tracking event:', error);
      }
    } else {
      // Fail gracefully or log in non-production environments
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Meta Pixel] fbq function not found. Event ${eventName} was NOT tracked.`);
      }
    }
  }
}

/**
 * Tracks a custom event with the Meta Pixel.
 */
export function trackPixelCustomEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    if (typeof window.fbq === 'function') {
      try {
        window.fbq('trackCustom', eventName, params);
        console.log(`[Meta Pixel] Tracked custom event: ${eventName}`, params || '');
      } catch (error) {
        console.error('[Meta Pixel] Error tracking custom event:', error);
      }
    }
  }
}

/**
 * Track a successful Lead submission
 */
export function trackLead(origen: string, extraData?: Record<string, any>) {
  trackPixelEvent('Lead', {
    content_name: 'Inscripción de Lead de Interés',
    content_category: 'Lotes Terrenos',
    origen: origen,
    value: 0.00,
    currency: 'USD',
    ...extraData
  });
}

/**
 * Track user contact click (primarily WhatsApp)
 */
export function trackContact(channel: string = 'WhatsApp') {
  trackPixelEvent('Contact', {
    content_name: `Contacto por ${channel}`,
    channel: channel
  });
}

/**
 * Track when a user initiates interest by starting the registration step
 */
export function trackInitiateRegistration(step: number, origen: string) {
  trackPixelCustomEvent('InitiateRegistration', {
    step,
    origen
  });
}
