// Function to calculate luminance - helps with accessibility and looks better visually, formula from https://www.w3.org/TR/WCAG20/#relativeluminancedef
const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

// Function to determine text color based on luminance
const getTextColor = (r: number, g: number, b: number) => {
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Black for light backgrounds, white for dark
};

type LetterBackgroundColourProps = {
  score: string;
  percentage: number;
};

function LetterBackgroundColour({ score, percentage }: LetterBackgroundColourProps) {
  // Function to calculate background color based on percentage with aesthetic color ranges
  /*
    Algorithm:
    1. Define color ranges with start and end colors and the percentage range they cover.
    2. Find which range the percentage falls into.
    3. Calculate how far into that range the percentage is (between 0 and 1).
    4. Use that value to blend the start and end colors.
    5. Return the final color.
  */
  const getBackgroundColor = (percentage: number) => {
    // Define the color ranges with aesthetic RGB values
    const ranges = [
      {
        start: { r: 255, g: 76, b: 76 },
        end: { r: 255, g: 165, b: 0 },
        rangeStart: 0,
        rangeEnd: 25,
      }, // Red → Orange
      {
        start: { r: 255, g: 165, b: 0 },
        end: { r: 255, g: 255, b: 102 },
        rangeStart: 25,
        rangeEnd: 50,
      }, // Orange → Yellow
      {
        start: { r: 255, g: 255, b: 102 },
        end: { r: 102, g: 255, b: 102 },
        rangeStart: 50,
        rangeEnd: 75,
      }, // Yellow → Green
      {
        start: { r: 102, g: 255, b: 102 },
        end: { r: 51, g: 204, b: 51 },
        rangeStart: 75,
        rangeEnd: 100,
      }, // Green → Dark Green
    ];

    // Find the range where the percentage fits
    const selectedRange = ranges.find(
      (range) => percentage >= range.rangeStart && percentage <= range.rangeEnd
    );

    if (!selectedRange) {
      throw new Error("Percentage out of bounds");
    }

    const { start, end, rangeStart, rangeEnd } = selectedRange;

    // Find how far we are into the range between 0 and 1
    const relativePercentage =
      (percentage - rangeStart) / (rangeEnd - rangeStart);

    // Calculate the RGB values depending on how far into the range we are
    const red = Math.round(start.r + relativePercentage * (end.r - start.r));
    const green = Math.round(start.g + relativePercentage * (end.g - start.g));
    const blue = Math.round(start.b + relativePercentage * (end.b - start.b));

    return { red, green, blue };
  };

  const { red, green, blue } = getBackgroundColor(percentage);
  const backgroundColour = `rgb(${red}, ${green}, ${blue})`;
  const textColour = getTextColor(red, green, blue);

  return {
    backgroundColour, textColour
  };
}

export default LetterBackgroundColour;
