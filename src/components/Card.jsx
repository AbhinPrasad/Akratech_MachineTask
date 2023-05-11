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
import axios from "axios";
import db from "../db/db";

const Cards = () => {
	const [data, setData] = useState([]);

	//Get user data from the database
	const getUsersFromDb = async () => {
		const users = await db.users.toArray();
		setData(users);
	};

	//adding user data from the response to database
	const handleResponse = async (res) => {
		const userData = res.map((user) => ({
			name: user.name.first + " " + user.name.last,
			image: user.picture.large
		}));
		await db.users.bulkPut(userData);

		getUsersFromDb();
	};

	//API call
	const fetchData = async () => {
		await axios
			.get("https://randomuser.me/api/?results=50")
			.then((res) => {
				handleResponse(res.data.results);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
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
						<Box key={user.id}>
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
										image={user.image}
									/>
									<CardContent
										sx={{
											display: "flex",
											justifyContent: "center"
										}}>
										<Typography variant="h6" component="div">
											{user.name}
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
						</Box>
					);
				})}
			</Box>
		</>
	);
};

export default Cards;
