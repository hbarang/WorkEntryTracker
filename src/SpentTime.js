import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import "./styles.css";

export default function PositionedSnackbar({ time, isOpen }) {
  const [state] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });

  const { vertical, horizontal } = state;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={isOpen}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{time}</span>}
      />
    </div>
  );
}
