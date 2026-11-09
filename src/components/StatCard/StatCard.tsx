import type { ReactNode } from "react";
import { Card, CardContent } from "../Card";
import { Typography } from "../Typography";

export interface StatCardProps {
  /** Cifra destacada, por ejemplo "+200" o "6 años". */
  value: ReactNode;
  /** Qué mide la cifra. */
  label: string;
  /** Texto de apoyo opcional. */
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
