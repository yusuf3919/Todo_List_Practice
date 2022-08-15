import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function NestedModal({ open, setOpen, editData, onUpdate }) {
  const [editvalue, setEditvalue] = useState("");
  useEffect(() => {
    setEditvalue(editData?.text);
  }, [editData]);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography>Update Modale</Typography>
          <Box sx={style}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e) => setEditvalue(e.target.value)}
                required
                id="outlined-required"
                label="Write your Todo here"
                placeholder="Write your Todo here"
                value={editvalue}
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onUpdate({ id: editData.id, val: editvalue });
                    setOpen(false);
                  }
                }}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button
                sx={{ padding: "15px" }}
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                  onUpdate({ id: editData.id, val: editvalue });
                  setOpen(false);
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
