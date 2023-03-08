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
        autoLabel: "Traveler",
        autoOptions: [],
        selectedOption: "",
        //optionsQuery: "",
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    useEffect(() => {
        travelerClicked();
        }, []);
    
    const sendSnack = (msg) => {
        props.dataFromList(msg);
        };
        const onChange = async (e, selectedOption) => {

            // let queryString = `query {alertbycountry(name: "${selectedOption}"){text}}`;
            // let response = await fetch(`http://localhost:5000/graphql`, {
            //     method: "POST",
            //     headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     },
            //     body: JSON.stringify({ query: queryString}),
            //     });
            // let json = await response.json();

            // let alertText = json.data.alertbycountry.text;
            // selectedOption
            //     ? setState({selectedCountry: selectedOption, alerttext: alertText})
            //     : setState({selectedCountry: "", alerttext: ""});
         };
         const autoCompleteOptionsQuery = async (queryString) => {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            try {
            let query = JSON.stringify({
            query: queryString,
            });
            console.log(query);
            let response = await fetch("http://localhost:5000/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: query,
            });
            let json = await response.json();
            return json;
            
            } catch (error) {
            sendSnack(`Problem loading server data - ${error.message}`);
            }
         };
const travelerClicked = async () => {
    let query = `query{travelers}`;
setState({
    autoLabel: "Traveler",
});
sendSnack(`Attempting to load travelers from server...`);
try{
    let json = await autoCompleteOptionsQuery(query);
    setState({
        autoOptions: json.data.travelers,
        });
        sendSnack(`${state.autoOptions.length} travelers found`);

} catch (error) {
    sendSnack(`Problem loading server data - ${error.message}`);
    }
    
};
const regionClicked = async () => {
    setState({autoLabel: "Region"});
    };
    const subregionClicked = async () => {
        setState({autoLabel: "Sub-Region"});
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
            <div>
                <Button
                    style={{marginInline: "2vw"}}                      
                    color="secondary"
                    variant="contained"
                    onClick={travelerClicked}
                >
                Traveler
                </Button>
                <Button
                    style={{marginInline: "2vw"}}
                    color="secondary"
                    variant="contained"
                    onClick={regionClicked}
                    >
                    Region
                </Button>
                <Button
                    style={{marginInline: "2vw"}}
                    color="secondary"
                    variant="contained"
                    onClick={subregionClicked}
                    >
                    Sub-Region
                </Button>
            </div>
            <div>
                <Autocomplete
                    options={state.autoOptions}
                    getOptionLabel={(option) => option}
                    style={{ padding: "1vh" }}
                               onChange={onChange}
                               value={state.selectedOption}
                               renderInput={(params) => (
                               <TextField
                                   {...params}
                                   label={state.autoLabel}
                                   variant="outlined"
                                   fullWidth
                                   
                               />
                               )}
                           />
            </div>
        </CardContent>
        </Card>
    </ThemeProvider>
);



};
export default AdvisoryListComponent;