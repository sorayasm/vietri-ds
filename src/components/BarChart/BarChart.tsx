import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDatum[];
  /** Título visible del gráfico. */
  title?: string;
  /** Valor que equivale al 100 % de la barra. Por defecto, el mayor de los datos. */
  max?: number;
  /** Cómo se muestra cada valor. Por defecto, el número tal cual. */
  formatValue?: (value: number) => string;
}

export function BarChart({
  data,
  title,
  max,
  formatValue = String,
}: BarChartProps) {
  const upperBound = max ?? Math.max(0, ...data.map((datum) => datum.value));

  return (
    <Box component="figure" sx={{ m: 0 }}>
      {title && (
        <Typography
          component="figcaption"
          variant="overline"
          color="text.secondary"
          sx={{ display: "block", mb: 2 }}
        >
          {title}
        </Typography>
      )}
      <Stack component="ul" spacing={1.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
        {data.map((datum) => {
          const percent =
            upperBound > 0
              ? Math.min(100, Math.max(0, (datum.value / upperBound) * 100))
              : 0;
          const formatted = formatValue(datum.value);
          return (
            <Box
              component="li"
              key={datum.label}
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(80px, 160px) 1fr auto",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              {/* La barra expone la información a lectores de pantalla;
                  el texto visible se oculta para no repetirla. */}
              <Typography variant="body2" aria-hidden="true">
                {datum.label}
              </Typography>
              <Box
                role="meter"
                aria-label={datum.label}
                aria-valuemin={0}
                aria-valuemax={upperBound}
                aria-valuenow={datum.value}
                aria-valuetext={formatted}
                sx={{
                  height: 12,
                  borderRadius: 1,
                  bgcolor: "divider",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{ width: `${percent}%` }}
                  sx={{ height: "100%", bgcolor: "primary.main" }}
                />
              </Box>
              <Typography
                variant="body2"
                aria-hidden="true"
                sx={{ minWidth: 40, textAlign: "right", fontWeight: 600 }}
              >
                {formatted}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
