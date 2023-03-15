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
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import Project1Component from "./project1component";

const AdvisoryListComponent = (props) => {

    const initialState = {
        autoLabel: "Traveler",
        autoOptions: [],
        selectedOption: ``,
        selectedAlerts: [],
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
        let queryString = ``;
        let queryName = ``;
        switch(state.autoLabel) {
            case "Traveler":
                queryName = `advisoriesbytraveler`
                queryString = `query {advisoriesbytraveler(name: "${selectedOption}"){country,text,date}}`;
                break;
            case "Region":
                queryName = `alertsforregion`;
                queryString = `query {alertsforregion(region: "${selectedOption}"){name,text,date}}`;
                break;
            case "Sub-Region":
                queryName = `alertsforsubregion`;
                queryString = `query {alertsforsubregion(subregion: "${selectedOption}"){name,text,date}}`;
                break;
            default:
                return null;
        }
        try {
            let json = await autoCompleteOptionsQuery(queryString);
            selectedOption
                ? setState({selectedOption: selectedOption, selectedAlerts: json.data[queryName]})
                : setState({selectedOption: "", selectedAlerts: []});
                sendSnack(`${json.data[queryName].length} alerts found for ${selectedOption}`);
        }
        catch{
            sendSnack(`Problem loading server data - ${error.message}`);
            setState({selectedOption: "", selectedAlerts: []});
        }
        };
    const autoCompleteOptionsQuery = async (queryString) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {
            let query = JSON.stringify({
                query: queryString,
            });
            console.log(query);
            let response = await fetch("/graphql", {
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
        setState({selectedOption: ``, autoLabel: "Traveler"});
        sendSnack(`Attempting to load travelers from server...`);
        try{
            let json = await autoCompleteOptionsQuery(query);
            setState({autoOptions: json.data.travelers});
            sendSnack(`${json.data.travelers.length} travelers found`);
        } catch (error) {
            sendSnack(`Problem loading server data - ${error.message}`);
        }
    };
    const regionClicked = async () => {
        let query = `query{regions}`;
        setState({selectedOption: ``, autoLabel: "Region"});
        sendSnack(`Attempting to load regions from server...`);
        try{
            let json = await autoCompleteOptionsQuery(query);
            setState({autoOptions: json.data.regions});
            sendSnack(`${json.data.regions.length} regions found`);
        } catch (error) {
            sendSnack(`Problem loading server data - ${error.message}`);
        }
        };
    const subregionClicked = async () => {
        let query = `query{subregions}`;
        setState({selectedOption: ``, autoLabel: "Sub-Region"});
        sendSnack(`Attempting to load regions from server...`);
        try{
            let json = await autoCompleteOptionsQuery(query);
            setState({autoOptions: json.data.subregions});
            sendSnack(`${json.data.subregions.length} subregions found`);
        } catch (error) {
            sendSnack(`Problem loading server data - ${error.message}`);
        }
        };
    const renderContent = React.useCallback(() => {
        if(state.selectedOption) {
            const alerts = state.selectedAlerts;
            return ( 
                <TableContainer>
                    <Table>
                        <TableHead 

                        >
                            <TableRow 
                            >
                                <TableCell
                                                            style={{ color: theme.palette.primary.main, textAlign: "center" }}

                                >Country</TableCell>
                                <TableCell 
                                                            style={{color: theme.palette.primary.main, textAlign: "center" }}

                                >Alert Information</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            alerts.map((alert) => (
                                <TableRow key={alert.index}>
                                    <TableCell>{alert.country || alert.name}</TableCell>
                                    <TableCell>{alert.text} {alert.date}</TableCell>
                                </TableRow>
                            ))}
                           
                        </TableBody>
                    </Table>
                </TableContainer>


            );
            

        }
        else
        {
            return null;
        }
        }, [state.selectedOption]);
    


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
                        style={{marginInline: "1vw"}}                      
                        color="secondary"
                        variant="contained"
                        onClick={travelerClicked}
                    >
                    Traveler
                    </Button>
                    <Button
                        style={{marginInline: "1vw"}}
                        color="secondary"
                        variant="contained"
                        onClick={regionClicked}
                        >
                        Region
                    </Button>
                    <Button
                        style={{marginInline: "1vw"}}
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
                <div>
            {renderContent()}
        </div>
            </CardContent>
            </Card>
        </ThemeProvider>
    );
};
export default AdvisoryListComponent;