import type { ReactNode } from "react";
import { Card, CardContent } from "../Card";
import { Typography } from "../Typography";

export interface StatCardProps {
  /** Highlighted figure, for example "+200" or "6 years". */
  value: ReactNode;
  /** What the figure measures. */
  label: string;
  /** Optional supporting text. */
  description?: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" component="p">
          {value}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {label}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
