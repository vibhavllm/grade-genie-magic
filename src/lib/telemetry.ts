/**
 * Telemetry Service - Comprehensive user data collection with consent
 */

export interface UserInfo {
  // Device Information
  userAgent: string;
  platform: string;
  vendor: string;
  language: string;
  languages: readonly string[];
  cookieEnabled: boolean;
  doNotTrack: string | null;
  
  // Screen & Display
  screenWidth: number;
  screenHeight: number;
  screenColorDepth: number;
  screenPixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  
  // Browser Information
  browserName: string;
  browserVersion: string;
  engineName: string;
  osName: string;
  osVersion: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  
  // Connection
  connectionType?: string;
  connectionEffectiveType?: string;
  connectionDownlink?: number;
  connectionRtt?: number;
  
  // Hardware
  hardwareConcurrency: number;
  deviceMemory?: number;
  maxTouchPoints: number;
  
  // Time & Location
  timezone: string;
  timezoneOffset: number;
  timestamp: number;
  
  // Performance
  performanceTiming?: PerformanceNavigationTiming;
  
  // Storage
  localStorageAvailable: boolean;
  sessionStorageAvailable: boolean;
  indexedDBAvailable: boolean;
  
  // Battery (if available)
  batteryLevel?: number;
  batteryCharging?: boolean;
}

export interface SessionInfo {
  sessionId: string;
  startTime: number;
  pageViews: number;
  interactions: number;
  lastActivityTime: number;
}

export interface InteractionEvent {
  type: 'click' | 'scroll' | 'keypress' | 'form_submit' | 'navigation' | 'custom';
  target?: string;
  value?: string;
  timestamp: number;
  page: string;
}

class TelemetryService {
  private consentGiven: boolean = false;
  private sessionInfo: SessionInfo | null = null;
  private interactionLog: InteractionEvent[] = [];
  private readonly STORAGE_KEY = 'telemetry_consent';
  private readonly SESSION_KEY = 'telemetry_session';

  constructor() {
    this.loadConsent();
    if (this.consentGiven) {
      this.initSession();
    }
  }

  // Consent Management
  setConsent(granted: boolean): void {
    this.consentGiven = granted;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      granted,
      timestamp: Date.now()
    }));
    
    if (granted) {
      this.initSession();
      this.collectUserInfo();
    } else {
      this.clearAllData();
    }
  }

  getConsent(): boolean {
    return this.consentGiven;
  }

  private loadConsent(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const { granted } = JSON.parse(stored);
        this.consentGiven = granted;
      }
    } catch (e) {
      console.error('Error loading consent:', e);
    }
  }

  // Session Management
  private initSession(): void {
    const stored = sessionStorage.getItem(this.SESSION_KEY);
    
    if (stored) {
      this.sessionInfo = JSON.parse(stored);
      this.sessionInfo!.pageViews++;
    } else {
      this.sessionInfo = {
        sessionId: this.generateSessionId(),
        startTime: Date.now(),
        pageViews: 1,
        interactions: 0,
        lastActivityTime: Date.now()
      };
    }
    
    this.saveSession();
  }

  private saveSession(): void {
    if (this.sessionInfo) {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(this.sessionInfo));
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // User Info Collection
  async collectUserInfo(): Promise<UserInfo | null> {
    if (!this.consentGiven) return null;

    const nav = window.navigator as any;
    const screen = window.screen;
    const connection = (nav.connection || nav.mozConnection || nav.webkitConnection) as any;
    
    const userInfo: UserInfo = {
      // Device Information
      userAgent: nav.userAgent,
      platform: nav.platform,
      vendor: nav.vendor,
      language: nav.language,
      languages: nav.languages || [nav.language],
      cookieEnabled: nav.cookieEnabled,
      doNotTrack: nav.doNotTrack,
      
      // Screen & Display
      screenWidth: screen.width,
      screenHeight: screen.height,
      screenColorDepth: screen.colorDepth,
      screenPixelRatio: window.devicePixelRatio,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      
      // Browser Information
      ...this.parseBrowserInfo(),
      
      // Connection
      connectionType: connection?.type,
      connectionEffectiveType: connection?.effectiveType,
      connectionDownlink: connection?.downlink,
      connectionRtt: connection?.rtt,
      
      // Hardware
      hardwareConcurrency: nav.hardwareConcurrency || 0,
      deviceMemory: nav.deviceMemory,
      maxTouchPoints: nav.maxTouchPoints || 0,
      
      // Time & Location
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      timestamp: Date.now(),
      
      // Performance
      performanceTiming: this.getPerformanceTiming(),
      
      // Storage
      localStorageAvailable: this.checkStorage('localStorage'),
      sessionStorageAvailable: this.checkStorage('sessionStorage'),
      indexedDBAvailable: 'indexedDB' in window,
    };

    // Battery API
    if ('getBattery' in nav) {
      try {
        const battery = await nav.getBattery();
        userInfo.batteryLevel = battery.level;
        userInfo.batteryCharging = battery.charging;
      } catch (e) {
        // Battery API not available
      }
    }

    this.logData('userInfo', userInfo);
    return userInfo;
  }

  private parseBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let engineName = 'Unknown';
    let osName = 'Unknown';
    let osVersion = 'Unknown';
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

    // Browser Detection
    if (ua.includes('Firefox/')) {
      browserName = 'Firefox';
      browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
      engineName = 'Gecko';
    } else if (ua.includes('Edg/')) {
      browserName = 'Edge';
      browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
      engineName = 'Blink';
    } else if (ua.includes('Chrome/')) {
      browserName = 'Chrome';
      browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
      engineName = 'Blink';
    } else if (ua.includes('Safari/')) {
      browserName = 'Safari';
      browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
      engineName = 'WebKit';
    }

    // OS Detection
    if (ua.includes('Windows NT')) {
      osName = 'Windows';
      osVersion = ua.match(/Windows NT (\d+\.\d+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Mac OS X')) {
      osName = 'macOS';
      osVersion = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
    } else if (ua.includes('Linux')) {
      osName = 'Linux';
    } else if (ua.includes('Android')) {
      osName = 'Android';
      osVersion = ua.match(/Android (\d+\.\d+)/)?.[1] || 'Unknown';
      deviceType = 'mobile';
    } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
      osName = 'iOS';
      osVersion = ua.match(/OS (\d+_\d+)/)?.[1]?.replace('_', '.') || 'Unknown';
      deviceType = ua.includes('iPad') ? 'tablet' : 'mobile';
    }

    // Device Type (if not already set)
    if (deviceType === 'desktop' && (ua.includes('Mobile') || ua.includes('Android'))) {
      deviceType = 'mobile';
    }
    if (ua.includes('Tablet') || ua.includes('iPad')) {
      deviceType = 'tablet';
    }

    return { browserName, browserVersion, engineName, osName, osVersion, deviceType };
  }

  private getPerformanceTiming(): PerformanceNavigationTiming | undefined {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return navTiming;
    }
    return undefined;
  }

  private checkStorage(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = window[type];
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Interaction Tracking
  trackInteraction(event: Omit<InteractionEvent, 'timestamp' | 'page'>): void {
    if (!this.consentGiven) return;

    const fullEvent: InteractionEvent = {
      ...event,
      timestamp: Date.now(),
      page: window.location.pathname
    };

    this.interactionLog.push(fullEvent);
    
    if (this.sessionInfo) {
      this.sessionInfo.interactions++;
      this.sessionInfo.lastActivityTime = Date.now();
      this.saveSession();
    }

    this.logData('interaction', fullEvent);
  }

  // Page View Tracking
  trackPageView(path: string): void {
    if (!this.consentGiven) return;

    this.trackInteraction({
      type: 'navigation',
      target: path,
    });

    this.logData('pageView', {
      path,
      referrer: document.referrer,
      timestamp: Date.now()
    });
  }

  // Custom Event Tracking
  trackCustomEvent(eventName: string, data?: any): void {
    if (!this.consentGiven) return;

    this.trackInteraction({
      type: 'custom',
      target: eventName,
      value: JSON.stringify(data)
    });
  }

  // Get Analytics Data
  getSessionInfo(): SessionInfo | null {
    return this.consentGiven ? this.sessionInfo : null;
  }

  getInteractionLog(): InteractionEvent[] {
    return this.consentGiven ? this.interactionLog : [];
  }

  // Data Export
  exportAllData(): object | null {
    if (!this.consentGiven) return null;

    return {
      session: this.sessionInfo,
      interactions: this.interactionLog,
      consent: {
        granted: this.consentGiven,
        timestamp: this.getConsentTimestamp()
      }
    };
  }

  private getConsentTimestamp(): number | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const { timestamp } = JSON.parse(stored);
        return timestamp;
      }
    } catch (e) {
      console.error('Error getting consent timestamp:', e);
    }
    return null;
  }

  // Clear All Data
  private clearAllData(): void {
    this.sessionInfo = null;
    this.interactionLog = [];
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  // Logging (can be sent to analytics service)
  private logData(category: string, data: any): void {
    if (!this.consentGiven) return;
    
    // In production, send this to your analytics backend
    console.log(`[Telemetry - ${category}]`, data);
  }
}

// Export singleton instance
export const telemetry = new TelemetryService();
