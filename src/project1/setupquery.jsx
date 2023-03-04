import { useQuery } from "react-query";
import {
 List,
 ListItem,
 ListItemText,
 Divider,
} from "@mui/material";
import "../App.css";
import theme from "./theme";
const SetupQuery = () => {
 const { isLoading, error, data } = useQuery("querykeyname", async () => {
 let response = await fetch("http://localhost:5000/graphql", {
 method: "POST",
 headers: {
 "Content-Type": "application/json; charset=utf-8",
 },
 body: JSON.stringify({ query: "query { project1_setup{results} }" }),
 });
 let json = await response.json();
 let resArr = [];
 resArr = json.data.project1_setup.results
 .replace(/([.])\s*(?=[A-Z])/g, "$1|")
 .split("|");
 return resArr;
 });
 if (isLoading) return "Loading...";
 if (error) return "An error has occurred: " + error.message;
 return (
<List style={{color: theme.palette.error.main}}>
 {
 data.map((result, index) => {
 return <div key={index}><ListItem ><ListItemText primary={result} /></ListItem><Divider /></div>;
 })
 }
 </List>
 );
};
export default SetupQuery