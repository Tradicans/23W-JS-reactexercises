import React, { useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 CardContent,
 Typography,
 TextField,
} from "@mui/material";
import theme from "./theme";
import "../../App.css";
const lab12 = (props) => {
const initialState = {
    statement: "",
};
const reducer = (state, newState) => ({ ...state, ...newState });
const [state, setState] = useReducer(reducer, initialState);


const onChange = (e, selectedOption) => {
    selectedOption
    ? setState({statement: (state.statement + " " + selectedOption)})
    : setState(initialState);

};
 return (
    <ThemeProvider theme={theme}>
    <AppBar color="primary" style={{ marginBottom: "5vh" }}>
    <Toolbar>
    <Typography variant="h6" color="inherit">
    INFO3139 - Lab12
    </Typography>
    </Toolbar>
    </AppBar>
    <Card className="card">
    <CardHeader title="Sentence Builder Using Autocomplete" />

    <CardContent>
 <Autocomplete
 id="sentence"
 options={sentence}
 getOptionLabel={(option) => option}
 style={{ width: 300 }}
 onChange={onChange}
 renderInput={(params) => (
 <TextField
 {...params}
 label="pick a word"
 variant="outlined"
 fullWidth
 />
 )}
 />
 <p />
 <Typography variant="h6" color="error">
 {state.statement}
 </Typography>
 </CardContent>
 
    </Card>
    </ThemeProvider>
 );
};
const sentence = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];
export default lab12;