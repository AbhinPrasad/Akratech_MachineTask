import React from "react";
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

const Cards = () => {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-evenly"
			}}>
			<Card sx={{ maxWidth: 345 }}>
				<CardActionArea>
					<CardMedia component="img" height="140" image={image} />
					<CardContent sx={{ display: "flex", justifyContent: "center" }}>
						<Typography variant="h6" component="div">
							Lizard
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{ display: "flex", justifyContent: "end" }}>
					<Button size="small">
						<DeleteIcon />
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default Cards;
