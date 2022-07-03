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

  async getUserWithSameEmail() {
    return await db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
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

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
