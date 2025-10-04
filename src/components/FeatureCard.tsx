import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  gradient?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, path, gradient = "from-primary to-primary-glow" }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden shadow-card transition-smooth hover:shadow-glow hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 transition-smooth group-hover:opacity-10`} />
      
      <div className="relative p-6 space-y-4">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <Link to={path}>
          <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
            Get Started
          </Button>
        </Link>
      </div>
    </Card>
  );
};
