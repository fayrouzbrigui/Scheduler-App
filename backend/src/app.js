const express = require("express");
const app = express();

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const eventRoutes = require('./routes/event');
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
})

app.use(bodyParser.json());
app.use("/user", signupRoute);
app.use("/user", loginRoute);
app.use("/user/events", eventRoutes);
