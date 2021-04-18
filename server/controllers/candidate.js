import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Candidate from '../modals/candidate.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Candidate.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "Candidate does not exists"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid Credentails' })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({
            result: existingUser,
            token
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, userType } = req.body;
    console.log(email, password, confirmPassword, firstName, lastName)
    try {
        const existingUser = await Candidate.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "Candidate already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password doest not match' })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Candidate.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, userType });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};
