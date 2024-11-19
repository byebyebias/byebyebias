import { Card, CardContent, CardHeader, Typography } from "@mui/material";

// Function to calculate luminance
const getLuminance = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

// Function to determine text color based on luminance
const getTextColor = (r, g, b) => {
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5 ? "#000" : "#FFF"; // Black for light backgrounds, white for dark
};

function BiasScore({ score, percentage }) {
  // Function to calculate background color based on percentage
  const getBackgroundColor = (percentage) => {
    const red = Math.round(255 - (percentage / 100) * 255); // Decrease red as percentage increases
    const green = Math.round((percentage / 100) * 255); // Increase green as percentage increases
    return { red, green, blue: 0 }; // Solid RGB color
  };

  // Get the RGB components and derived styles
  const { red, green, blue } = getBackgroundColor(percentage);
  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  const textColor = getTextColor(red, green, blue);

  return (
    <Card
      sx={{
        flex: "1",
        backgroundColor: backgroundColor,
        color: textColor,
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardHeader
        title="Your Fairness Score"
        sx={{
          textAlign: "center",
          color: textColor,
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
