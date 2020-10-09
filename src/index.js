import "./styles/styles.scss";
import "../assets/icomoon/style.css";
import app from "./app.js";
import { state } from "./state";

app.renderSidebar(state);
app.initListeners();
