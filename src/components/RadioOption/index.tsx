import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Tooltip, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

interface IRadioOption {
  title: string;
  options: Array<string>;
  value: string;
  desc: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function RadioOption({ title, options, value, desc, handleChange }: IRadioOption) {
  return (
    <FormControl>
      <Typography color={"textSecondary"} variant="body2">
        {title}
        <Tooltip title={desc}>
          <IconButton aria-label="delete" size="small" sx={{ ml: 0.5 }}>
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Typography>

      <RadioGroup row aria-labelledby="radio-buttons-group-label" name={title} value={value} onChange={handleChange}>
        {options.map((opt, i) => (
          <FormControlLabel key={i} value={opt} control={<Radio size="small" />} label={opt} slotProps={{ typography: { variant: "body2" } }} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
