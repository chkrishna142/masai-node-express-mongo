import React, { useContext } from "react";
import { useState } from "react";
import { addPost } from "../../api/post";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import AuthContext from "../../contexts/auth";
import { Typography } from "@mui/material";

export default function BlogForm() {
  const [title, setTitle] = useState("Your Awesome Post");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Typography>Login to create a Blog</Typography>;
  }

  const submit = () => {
    addPost(title, content)
      .then((response) => {
        const id = response.data.data._id;
        window.location = `/blog/${id}`;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          id="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          autoFocus
          id="content"
          label="Body"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={submit}>
          Submit
        </Button>
        <Button>Cancel</Button>
      </Stack>
    </Stack>
  );
}
