import React, { useState, useEffect } from "react";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	CardActionArea,
	CardActions,
	CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import db from "../db/db";

const Cards = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	//Get user data from the database
	const getUsersFromDb = async () => {
		const users = await db.users.limit(50).toArray();
		setData(users);
		setLoading(false);
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

	const handleDelete = async (id) => {
		await db.users.delete(id);
		setData((prevData) => prevData.filter((user) => user.id !== id));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh"
					}}>
					<CircularProgress color="inherit" />
				</Box>
			) : (
				<>
					<Box
						sx={{
							margin: "20px 0 0 30px",
							display: "flex",
							flexDirection: "column",
							gap: "10px"
						}}>
						<Button
							variant="outlined"
							sx={{ maxWidth: "120px" }}
							onClick={fetchData}
							startIcon={<RefreshIcon />}>
							Refresh
						</Button>
						<Typography variant="h6">
							Showing {data.length} data
						</Typography>
					</Box>

					<Box
						sx={{
							display: "flex",
							width: "100%",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
							gap: "20px",
							marginTop: "30px"
						}}>
						{data.map((user) => {
							return (
								<Box key={user.id}>
									<Card
										sx={{
											width: "200px",
											height: "300px",
											marginBottom: "20px",
											border: "1px solid #ccc"
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
											sx={{
												display: "flex",
												justifyContent: "end"
											}}>
											<Button
												variant="contained"
												size="small"
												color="error"
												endIcon={<DeleteIcon />}
												onClick={() => handleDelete(user.id)}>
												Delete
											</Button>
										</CardActions>
									</Card>
								</Box>
							);
						})}
					</Box>
				</>
			)}
		</>
	);
};

export default Cards;
