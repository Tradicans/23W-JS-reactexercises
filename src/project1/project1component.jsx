import { React } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Card, CardHeader, CardContent } from "@mui/material";
import theme from "./theme";
import "../App.css";
import globe from "./globe-clipart.jpg";
const Project1Component = () => {
	return (
		<ThemeProvider theme={theme}>
			<Card className="card" style={{ margin: 0, width: "100vw" }}>
				<CardHeader />
				<CardContent style={{ textAlign: "center" }}>
					<img src={globe} alt="Globe" width={"30%"} />

					<h3>Worldwide Travel Alerts</h3>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
};
export default Project1Component;
