import { CheckCircle2 } from 'lucide-react';
import { Badge } from './Badge';

export function VerifiedBadge() {
  return (
    <Badge className="bg-success text-success-foreground">
      <CheckCircle2 className="w-3 h-3 mr-1" />
      Verified
    </Badge>
  );
}
