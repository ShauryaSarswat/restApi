import express from "express";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
let users = [
   
]

router.get('/', (req, res) => {
    console.log(users);
    res.send(users);
})
router.post('/', (req, res) => {
    const user = req.body;

    const userId = uuidv4();

    const userwithId = { ...user, id: userId };
    users.push(userwithId);
    res.send(`user with the name - ${user.firstName+" "+user.lastName} is added`)
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`user ${id} deleted`);
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, height } = req.body;
    const user = users.find((user) => user.id === id);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    if (height) user.height = height;

    res.send("updated");
})

export default router;