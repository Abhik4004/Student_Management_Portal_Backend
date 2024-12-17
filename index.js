import express from 'express';
import bcrypt from 'bcrypt';

class User {
  name;
  email;
  rollNo;
  password;
  role;
  constructor(name, email, rollNo, password, role) {
    this.name = name;
    this.email = email;
    this.rollNo = rollNo;
    this.role = role;
    this.setPassword(password);
  }

  async setPassword(password) {
    try {
      this.password = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error(err);
    }
  }

  getValue() {
    return `Name: ${this.name} + email: ${this.email} + password: ${this.password}`;
  }
}

const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/data', async (req, res) => {
  const { name, email, rollNo, password, role } = req.body;
  const user = new User(name, email, rollNo, password, role);
  await user.setPassword(password);
  res.send(user.getValue());
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
