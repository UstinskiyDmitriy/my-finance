import { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { loadSavingsGoal, saveSavingsGoal } from "../../features/localStorage";

const SavingsGoalCard = () => {
  const savings = useSelector((state: RootState) => state.transactions.savings);
  const [goal, setGoal] = useState(loadSavingsGoal());

  useEffect(() => {
    saveSavingsGoal(goal);
  }, [goal]);

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(Number(e.target.value));
  };

  const fillPercentage = Math.min((savings / goal) * 100, 100);

  const getColorForFill = (percentage: number) => {
    const red = Math.max(255 - percentage * 1.5, 0);
    const green = Math.min(percentage * 1.5, 255);
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        borderRadius: 5,
        boxShadow: "3px 3px 10px #111",
        width: 300,
        textAlign: "center",
        backgroundColor: "#222",
      }}
    >
      <Typography variant="h6">Цель накоплений</Typography>

      <TextField
        label="Введите конечную сумму"
        type="number"
        value={goal}
        onChange={handleGoalChange}
        sx={{
          "& .MuiInputLabel-root": {
            color: "white",
          },
        }}
      />

      <Box
        sx={{
          width: 150,
          height: 200,
          border: "2px solid gray",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: getColorForFill(fillPercentage),
            borderRadius: "0 0 10px 10px",
          }}
        />
      </Box>

      <Typography variant="body1">
        Накоплено: {savings} / {goal}₽
      </Typography>
    </Box>
  );
};

export default SavingsGoalCard;
