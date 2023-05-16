const express = require("express");
const chalk = require("chalk");
const router = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);

const PORT = 8080;

async function start() {
    try {
        app.listen(PORT, () =>
            console.log(
                chalk.green(`Server has been started on port ${PORT}...`)
            )
        );
    } catch (e) {
        console.log(chalk.red(e.message));
        process.exit(1);
    }
}

start();
