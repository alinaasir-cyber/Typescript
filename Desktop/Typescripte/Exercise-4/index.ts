interface User {
  username: string;
  password: string;
}

const myUser: User = { username: "alinaasir", password: "secretpassword" };
login(myUser);

interface User {
  username: string;
  password: string;
  email?: string; // Optional property
}

function login(user: User): void {
  console.log(`User: ${user.username}, Email: ${user.email ?? "Not provided"}`);
}


login({ username: "ali", password: "123" });

login({ username: "fatima", password: "456", email: "fatima@example.com" });

interface User {
  readonly id?: number;
  username: string;
}

const userObj: User = { id: 1, username: "ahmed", password: "123" };


console.log(userObj.id);

