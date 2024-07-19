import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, IconButton, Slider, Tooltip, Typography } from "@mui/material";

interface IValueSliderProps {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
  desc: string;
  setValue: (quality: number) => void;
}

export default function ValueSlider({ setValue, title, min, max, defaultValue, desc }: IValueSliderProps) {
  return (
    <Box sx={{ minWidth: 240, maxWidth: 400, p: 0 }}>
      <Typography variant="body2" color={"textSecondary"}>
        {title}

        <Tooltip title={desc}>
          <IconButton aria-label="delete" size="small" sx={{ ml: 0.5 }}>
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Slider
        min={min}
        max={max}
        size="small"
        defaultValue={defaultValue}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={(e, value) => setValue(parseInt(String(value)))}
        sx={{ pt: 0 }}
      />
    </Box>
  );
}
