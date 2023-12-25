import express from "express";
import AdminV2Controller from "@controller/adminController/admin.cont";

const adminRoute = express.Router();
const newKey = new AdminV2Controller();

export default adminRoute;