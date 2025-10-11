import { SignIn, SignUp } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">AI Educational Tools</h1>
          <p className="text-muted-foreground">Access your teaching assistant</p>
        </div>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border-input",
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footerAction: "hidden"
                }
              }}
              routing="hash"
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border-input",
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footerAction: "hidden"
                }
              }}
              routing="hash"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
