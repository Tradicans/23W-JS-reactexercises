import React, { useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Card,
 CardHeader,
 CardContent,
 Typography,
 TextField,
 Button,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import Project1Component from "./project1component";

const AdvisoryListComponent = (props) => {

    const initialState = {

    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    
    const sendSnack = (msg) => {
        props.dataFromList(msg);
        };


return (
    <ThemeProvider theme={theme}>
        <Card className="card">
        <Project1Component  />
<CardHeader
    title="List Advisories"
    style={{ color: theme.palette.primary.main, textAlign: "center" }}
/>
<CardContent>






</CardContent>
        </Card>
    </ThemeProvider>
);



};
export default AdvisoryListComponent;