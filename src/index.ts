import express from "express";
import bodyParser from "body-parser";
import notesRoutes from "./routes/notesRoutes";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
