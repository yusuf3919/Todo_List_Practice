import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { useState } from "react";
import EditeModal from "./EditeModal";
function IconLabelButtons() {
  const [todo, setTodo] = useState([]);
  const [editData, setEditData] = useState(null);
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);
  const submitTodo = () => {
    console.log("submit");

    let id = new Date().valueOf(); //get id
    if (text.trim().length > 0) {
      setTodo((prevState) => [...prevState, { id, text }]);
      setText("");
    } else setText("");
  };
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitTodo();
    }
  };
  const handleDelete = (id) => {
    let copyarray = [...todo];
    copyarray = copyarray.filter((it) => it.id !== id);
    setTodo(copyarray);
  };
  console.log("rerender");
  const handleModal = (item) => {
    setEditData(item);
    setOpen(true);
  };
  const handleUpdate = (obj) => {
    let index = todo.findIndex((i) => i.id === obj.id);
    let copyarray = [...todo];
    copyarray[index].text = obj.val;
    setTodo(copyarray);
  };
  return (
    <>
      <EditeModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        onUpdate={handleUpdate}
      />
      <Stack direction="row" spacing={2}>
        <Box sx={{ display: "flex" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={(e) => setText(e.target.value)}
              required
              id="outlined-required"
              label="Write your Todo here"
              placeholder="Write your Todo here"
              value={text}
              onKeyPress={(e) => handlePress(e)}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button
              sx={{ padding: "15px" }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={submitTodo}
            >
              Add Todo
            </Button>
          </Box>
        </Box>
      </Stack>
      {todo?.map((item) => (
        <div key={item.id} className="display">
          <h5 style={{ textTransform: "capitalize" }}>{item.text}</h5>
          <div>
            <EditIcon
              style={{ marginRight: 10, cursor: "pointer" }}
              onClick={() => handleModal(item)}
            />
            <DeleteIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}
export default IconLabelButtons;
