import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import useStore from "../../store";

export default function Stats() {
  const stats = useStore((store) => store.stats);

  if (!stats) {
    return null;
  }

  const { averageCompressedSize, averageOriginalSize, numberOfFiles, percentageReduction, totalCompressedSize, totalOriginalSize, totalTime } = stats;

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: "auto", marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Статистика сжатия
        </Typography>
        <Divider sx={{ marginY: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Количество файлов:</Typography>
            <Typography variant="body1">{numberOfFiles}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Процентное сокращение:</Typography>
            <Typography variant="body1" color={"green"}>
              {percentageReduction.toFixed(2)}%
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Общий размер сжатых файлов:</Typography>
            <Typography variant="body1" color={"green"}>
              {totalCompressedSize.toLocaleString()} байт
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Общий размер исходных файлов:</Typography>
            <Typography variant="body1" color={"tomato"}>
              {totalOriginalSize.toLocaleString()} байт
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Общее время обработки:</Typography>
            <Typography variant="body1">{totalTime} мс</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
