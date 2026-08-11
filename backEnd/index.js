require("dotenv").config();

const express = require('express');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("./Models/user");
const noteModel = require("./Models/Note");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const isLoggedIn = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please Login"
        });
    }

    try {

        const data = jwt.verify(token, process.env.JWT_SECRET);

        req.user = data;

        next();

    } catch (err) {
    return res.status(401).json({
        message: "Invalid Token"
    });
}
};


app.get("/notes", isLoggedIn, async (req, res) => {
    await userModel.find({ _id: req.user.id }).populate("Notes")
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get("/editNote/:id", isLoggedIn, async (req, res) => {

    const note = await noteModel.findById(req.params.id);

    res.json(note);

});

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const createUser = await userModel.create({
                    email,
                    username,
                    password: hash
                })

                const token = jwt.sign({ id: createUser._id, email: email }, process.env.JWT_SECRET);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
                res.json(token);
            });
        })

    } catch (err) {
        res.json(err);
    }
})



app.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ "email": email })
    if (!user) {
        return res.json("invalid email")
    }
    await bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
            return res.json("incorrect password")
        }
        const token = jwt.sign({ id: user._id, email: email }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.json({
            token,
            userid: user._id
        });
    })

})

app.post("/addNote", isLoggedIn, async (req, res) => {
    const { note } = req.body;
    const user = await userModel.findById({ "_id": req.user.id });
    const createNote = await noteModel.create({
        user: user._id,
        content: note
    })
    user.Notes.push(createNote._id);
    await user.save();
    res.json(createNote);
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
    const noteId = req.params.id;
    const { text } = req.body;

    const note = await noteModel.findOneAndUpdate(
        { _id: noteId },          // Filter
        { content: text },        // Update
        { new: true }             // Updated document return karega
    )
        .then(result => res.json(result))
        .catch(err => res.json(err))

})

app.post("/delete/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params
    const Note = await noteModel.findByIdAndDelete({ _id: id });
    const user = await userModel.findById(req.user.id);

    user.Notes.pull(Note._id);

    await user.save();

    res.json("Deleted Successfully");


})

app.post("/Logout", (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
});
    res.json("success logout");
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("server is running");
});