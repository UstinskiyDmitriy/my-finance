import { useState, useEffect } from "react";
import { Slider, TextField, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setSavingsPercentage } from "../../features/slices/transactionSlice";

const SavingsPercentagePicker = () => {
  const dispatch = useDispatch();
  const savingsPercentage = useSelector(
    (state: RootState) => state.transactions.savingsPersentage
  );
  const [value, setValue] = useState(savingsPercentage);

  useEffect(() => {
    setValue(savingsPercentage);
  }, [savingsPercentage]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    dispatch(setSavingsPercentage(newValue));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        borderRadius: 5,
        boxShadow: "3px 3px 10px #111",
        backgroundColor: "#222",
      }}
    >
      <Typography variant="h6">Выберите процент накоплений:</Typography>
      <Typography variant="caption">
        Процент будет отниматься от входящих доходов
      </Typography>

      <Slider
        value={value}
        onChange={(_e, newValue) => handleChange(newValue as number)}
        min={0}
        max={100}
        step={1}
        aria-labelledby="input-slider"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.4rem",
        }}
      >
        <TextField
          type="number"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          inputProps={{ min: 0, max: 100 }}
          sx={{
            width: "fit-content",
            textAlign: "center",
            padding: "0",
          }}
        />
        <p>%</p>
      </Box>
    </Box>
  );
};

export default SavingsPercentagePicker;
