const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Validate fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const checkUser = "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [email], async (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({
                message: "Database error during registration check"
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "This email is already registered"
            });
        }

        try {
            // 3. HASH PASSWORD
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 4. Insert new user
            const sql = `
                INSERT INTO users (username, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [username, email, hashedPassword],
                (err, data) => {
                    if (err) {
                        console.error("Insert Error:", err);

                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(400).json({
                                message: "Email already exists"
                            });
                        }

                        return res.status(500).json({
                            message: "Failed to create account. Try again later."
                        });
                    }

                    return res.status(201).json({
                        status: "Success",
                        message: "User created successfully!"
                    });
                }
            );

        } catch (hashError) {
            console.error("Hashing Error:", hashError);

            return res.status(500).json({
                message: "Error securing password"
            });
        }
    });
});


// --- LOGIN ROUTE ---
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide both email and password"
        });
    }

    // ONLY CHECK EMAIL FIRST
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, data) => {

        if (err) {
            console.error("Login DB Error:", err);

            return res.status(500).json({
                message: "Server database connection error"
            });
        }

        // USER NOT FOUND
        if (data.length === 0) {
            return res.status(401).json({
                status: "Fail",
                message: "Invalid email or password. Please try again."
            });
        }

        const user = data[0];

        try {

            // COMPARE HASHED PASSWORD
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (passwordMatch) {

                return res.status(200).json({
                    status: "Success",
                    message: "Login successful",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });

            } else {

                return res.status(401).json({
                    status: "Fail",
                    message: "Invalid email or password. Please try again."
                });

            }

        } catch (compareError) {

            console.error("Password Compare Error:", compareError);

            return res.status(500).json({
                message: "Authentication error"
            });
        }
    });
});


// --- UPDATE PROFILE ROUTE ---
router.put('/update-profile', (req, res) => {

    const { id, username, email } = req.body;

    if (!id) {
        return res.status(400).json({
            message: "User ID is required for update"
        });
    }

    if (!username || !email) {
        return res.status(400).json({
            message: "Username and Email cannot be empty"
        });
    }

    const sql = `
        UPDATE users
        SET username = ?, email = ?
        WHERE id = ?
    `;

    db.query(sql, [username, email, id], (err, result) => {

        if (err) {
            console.error("Update Error:", err);

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    message: "That email is already in use by another user"
                });
            }

            return res.status(500).json({
                message: "Database error during update"
            });
        }

        if (result.affectedRows > 0) {

            return res.status(200).json({
                status: "Success",
                message: "Profile updated successfully!",
                user: { id, username, email }
            });

        } else {

            return res.status(404).json({
                message: "User not found"
            });

        }
    });
});

module.exports = router;