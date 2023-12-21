const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;
const TARGET_URL = "http://10.38.127.95:8000";

app.use(express.json());
app.use(cors()); // Questo abilita CORS per tutte le risorse. Per configurazioni più specifiche, consulta la documentazione di cors.

app.all("/*", async (req, res) => {
	try {
		const url = TARGET_URL + req.originalUrl;
		const response = await axios({
			method: req.method,
			url: url,
			data: req.body,
			headers: { ...req.headers, host: null }, // Assicurati di rimuovere l'header 'host'
		});

		res.send(response.data);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.listen(PORT, () => {
	console.log(`Server in ascolto sulla porta ${PORT}`);
});
