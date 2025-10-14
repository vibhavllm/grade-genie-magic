import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { telemetry } from '@/lib/telemetry';
import { Shield, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const consentStored = localStorage.getItem('telemetry_consent');
    if (!consentStored) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    telemetry.setConsent(true);
    setIsVisible(false);
    
    // Collect initial user info
    await telemetry.collectUserInfo();
  };

  const handleDecline = () => {
    telemetry.setConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <Card className="w-full max-w-2xl pointer-events-auto shadow-glow border-primary/20 glass-card animate-fade-in">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Help us improve your experience
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                We'd like to collect anonymous usage data to improve our application. 
                This helps us understand how you use our features and make them better.
              </p>

              <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth mb-4">
                  <Info className="w-4 h-4" />
                  What data do we collect?
                  {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-3">
                  <div className="p-4 rounded-lg bg-muted/50 text-sm space-y-2">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Device & Browser Information</h4>
                      <p className="text-muted-foreground text-xs">
                        Browser type and version, operating system, screen size, device type, language preferences
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Usage Analytics</h4>
                      <p className="text-muted-foreground text-xs">
                        Pages visited, features used, interaction patterns, session duration, navigation flow
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Performance Metrics</h4>
                      <p className="text-muted-foreground text-xs">
                        Page load times, application performance, network connection type
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Technical Data</h4>
                      <p className="text-muted-foreground text-xs">
                        Timezone, storage capabilities, battery status (if available), hardware specs
                      </p>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground italic">
                        <strong>Note:</strong> We never collect personal information, passwords, or form data. 
                        All data is anonymized and used solely for improving the application.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Accept & Continue
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="flex-1"
                >
                  Decline
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecline}
              className="shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
