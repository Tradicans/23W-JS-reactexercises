import { useQuery } from "react-query";
import {
 List,
 ListItem,
 ListItemText,
 Divider,
} from "@mui/material";
import "../App.css";
import theme from "./theme";
const SetupQuery = (props) => {
    const sendParentSomeData = (msg) => {
        props.dataFromChild(msg);
        };
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
 sendParentSomeData("alerts collection setup completed");
 return resArr;
 });
 if (isLoading) return "Loading...";
 if (error) return sendParentSomeData("An error has occurred: " + error.message);
 //todo: if (data)??
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