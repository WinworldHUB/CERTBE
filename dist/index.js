"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const pfi_routes_1 = __importDefault(require("./routes/pfi-routes"));
const document_routes_1 = __importDefault(require("./routes/document-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const upload_middleware_1 = __importDefault(require("./middleware/upload-middleware"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    var _a;
    const allowedOrigins = [
        "http://localhost:3002",
        "http://localhost:3001",
        "http://localhost:3000",
    ];
    const origin = (_a = req.headers.origin) !== null && _a !== void 0 ? _a : "";
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Headers");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/users", user_routes_1.default);
app.use("/pfis", pfi_routes_1.default);
app.use("/documents", document_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.post('/test-upload', (req, res, next) => {
    console.log('Headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    next();
}, upload_middleware_1.default.array('files', 4), (req, res) => {
    console.log('Files received:', req.files); // Should log the received files
    console.log('Body received:', req.body); // Should log the request body
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
