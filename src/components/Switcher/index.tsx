import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FormControlLabel, IconButton, Switch, Tooltip, Typography } from "@mui/material";

interface ISwitcherProps {
  checked: boolean;
  title: string;
  desc: string;
  setValue: (value: boolean) => void;
}

export default function Switcher({ checked, title, desc, setValue }: ISwitcherProps) {
  return (
    <FormControlLabel
      sx={{ pl: 0.5 }}
      control={<Switch checked={checked} size="small" />}
      onChange={(e, checked) => setValue(checked)}
      label={
        <Typography color={"textSecondary"} variant="body2">
          {title}
          <Tooltip title={desc}>
            <IconButton aria-label="delete" size="small" sx={{ ml: 0.5 }}>
              <InfoOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Typography>
      }
    />
  );
}
