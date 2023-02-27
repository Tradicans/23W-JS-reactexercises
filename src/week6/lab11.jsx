import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 CardContent,
 Typography,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
const lab11 = (props) => {
let [message, sentence] = useState("");
let [word, setInput] = useState(props?.value ?? '');
 return (
    <ThemeProvider theme={theme}>
    <AppBar color="primary" style={{ marginBottom: "5vh" }}>
    <Toolbar>
    <Typography variant="h6" color="inherit">
    INFO3139 - Lab11
    </Typography>
    </Toolbar>
    </AppBar>
    <Card className="card">
    <CardHeader title="Sentence Builder" />
    <CardContent>
        <h3>The Message Is:</h3>
        <h5>{message}</h5> 
        <input type="text" name="word" placeholder= "Add Word" value={word} onInput={e => setInput(e.target.value)}  />
        <input data-testid="addbutton" type="submit" value="Submit" onClick={() => sentence(message += " " + word, setInput(''))}></input>
        <input type="submit" value="Clear" onClick={() => sentence(message = '')}></input>
    </CardContent>
    </Card>
    </ThemeProvider>
 );
};
export default lab11;