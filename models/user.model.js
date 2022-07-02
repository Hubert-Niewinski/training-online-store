const bcrypt = require("bcryptjs");
const db = require("../database/database");

class User {
  constructor(email, password, fullname, street, postalCode, city) {
    this.email = email;
    this.password = password;
    this.fullName = fullname;
    this.address = {
      street: street,
      postalCode: postalCode,
      city: city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.fullName,
      address: this.address,
    });
  }
}

module.exports = User;
