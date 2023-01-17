import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  children,
  modalTitle,
  dialogOpen,
  setDialogOpen,
}) {
  //modalTitle: texto titulo en el modal del dialog
  //la apertura se maneja desde un useState del padre del dialog con un handleOpen
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        aria-labelledby="fullscreen-dialog-title"
        open={dialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {modalTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </div>
  );
}
