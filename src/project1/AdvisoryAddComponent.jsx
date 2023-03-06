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

const AdvisoryAddComponent = (props) => {

    const initialState = {
        travelername: "",
        selectedCountry: "",
        alerts: [],
        countrynames: [],
        alerttext: "",
        };
        const sendSnack = (msg) => {
            props.dataFromAdd(msg);
            };
        const reducer = (state, newState) => ({ ...state, ...newState });
        const [state, setState] = useReducer(reducer, initialState);
        const onChange = async (e, selectedOption) => {

            let queryString = `query {alertbycountry(name: "${selectedOption}"){text}}`;
            let response = await fetch(`http://localhost:5000/graphql`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: queryString}),
                });
            let json = await response.json();

            let alertText = json.data.alertbycountry.text;
            selectedOption
                ? setState({selectedCountry: selectedOption, alerttext: alertText})
                : setState({selectedCountry: "", alerttext: ""});
         };
        useEffect(() => {
           fetchCountries();
           }, []);
        const fetchCountries = async () => {
            sendSnack("Attempting to load countries from server...");
           try {
               let response = await fetch("http://localhost:5000/graphql", {
                   method: "POST",
                   headers: {
                   "Content-Type": "application/json; charset=utf-8",
                   },
                   body: JSON.stringify({ query: "query { alerts{name} }" }),
                   });
               let json = await response.json();
               setState({
                   countrynames: json.data.alerts.map((a) => a.name),
                   });
                   sendSnack(`loaded ${json.data.alerts.length} countries`);
           } catch (error) {
               console.log(error);
               sendSnack(`Problem loading server data - ${error.message}`);
           }
        };
        
        const onAddClicked = async () => {
            const currDate = new Date();
            let advisory = {
            name: state.travelername,
            country: state.selectedCountry,
            text: state.alerttext,
            date: currDate.toISOString(),
            };
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            try {
            let query = JSON.stringify({
            query: `mutation {addadvisory(name: "${advisory.name}",country: "${advisory.country}", text: "${advisory.text}", date: "${advisory.date}" ) 
           { name, country, text, date }}`,
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
            setState({
            travelername: "",
            selectedCountry: "",
            alerttext: "",
            });
            sendSnack(`added advisory on ${json.data.addadvisory.date}`);
            
            } catch (error) {
            sendSnack(`${error.message} - advisory not added`);
            setState({
                travelername: "",
                selectedCountry: "",
                alerttext: "",
                });
            }
            };
        const handleNameInput = (e) => {
            setState({ travelername: e.target.value });
            };

        
 const emptyorundefined =
 state.travelername === undefined ||
 state.travelername === "" ||
 state.selectedCountry === undefined ||
 state.selectedCountry === "";




        return (
           <ThemeProvider theme={theme}>
               <Card className="card">
               <Project1Component  />
                   <CardHeader
                       title="Add Advisory"
                       style={{ color: theme.palette.primary.main, textAlign: "center" }}
                   />
                   <CardContent>
                    <div>
                        <TextField
                         onChange={handleNameInput}
                         placeholder="Traveler's name"
                         value={state.travelername}
                         />
                    </div>
                    <p></p>
                       <div>
                           <Autocomplete
                               id="countries"
                               options={state.countrynames}
                               getOptionLabel={(option) => option}
                               style={{ width: 300 }}
                               onChange={onChange}
                               value={state.selectedCountry}
                               renderInput={(params) => (
                               <TextField
                                   {...params}
                                   label="countries"
                                   variant="outlined"
                                   fullWidth
                                   
                               />
                               )}
                           />
                           <Typography color="error">{state.msg}</Typography>
                       </div>
                       <p></p>
                       <div>
                       <Button
                       
 color="secondary"
 variant="contained"
onClick={onAddClicked}
 disabled={emptyorundefined}
 >
Add Advisory
 </Button>
 
                       </div>
                   </CardContent>
               </Card>
           </ThemeProvider>
           );
};

export default AdvisoryAddComponent;