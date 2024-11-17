import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface InfoButtonProps {
  info: string; // Text to display in the tooltip
}

const InfoButton: React.FC<InfoButtonProps> = ({ info }) => {
  return (
    <Tooltip title={info} arrow>
      <IconButton>
        <InfoIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;
