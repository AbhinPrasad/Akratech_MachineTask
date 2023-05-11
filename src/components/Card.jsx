import React, { useState, useEffect } from "react";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	CardActionArea,
	CardActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import image from "../assets/1292402.jpg";
import axios from "axios";

const Cards = () => {
	const [data, setData] = useState([]);

	const getUserData = async () => {
		await axios
			.get("https://randomuser.me/api/?results=50")
			.then((res) => setData(res.data.results))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<Typography variant="h6">Showing {data.length} data</Typography>

			<Box
				sx={{
					display: "flex",
					width: "100%",
					alignItems: "center",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "20px",
					marginTop: "50px"
				}}>
				{data.map((user) => {
					return (
						<>
							<Card
								sx={{
									width: "200px",
									height: "300px",
									marginBottom: "20px"
								}}>
								<CardActionArea>
									<CardMedia
										component="img"
										height="140"
										image={user.picture.large}
									/>
									<CardContent
										sx={{
											display: "flex",
											justifyContent: "center"
										}}>
										<Typography variant="h6" component="div">
											{user.name.first} {user.name.last}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions
									sx={{ display: "flex", justifyContent: "end" }}>
									<Button size="medium">
										<DeleteIcon />
									</Button>
								</CardActions>
							</Card>
						</>
					);
				})}
			</Box>
		</>
	);
};

export default Cards;
