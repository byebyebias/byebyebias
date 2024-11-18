import { Card, CardContent, CardHeader, Typography } from "@mui/material";

function BiasScore({ score, percentage }) {
  // Calculate background color based on percentage
  const getBackgroundColor = (percentage) => {
    const red = Math.round(255 - (percentage / 100) * 255); // Decrease red as percentage increases
    const green = Math.round((percentage / 100) * 255); // Increase green as percentage increases
    return `rgb(${red}, ${green}, 0)`; // Dynamic color from red to green
  };

  return (
    <Card
      sx={{
        flex: "1",
        backgroundColor: getBackgroundColor(percentage),
        color: percentage > 50 ? "#FFF" : "#FFF", // Adjust text color for better contrast
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardHeader
        title="Your Fairness Score"
        sx={{
          textAlign: "center",
          color: percentage > 50 ? "#FFF" : "#FFF", // Match header contrast
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "3rem" }}>
          {score}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BiasScore;
