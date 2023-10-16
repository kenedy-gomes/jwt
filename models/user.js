const mongoose = require('mongoose');


const UsuariosSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
});
const User = mongoose.model("Usuarios", UsuariosSchema);
module.exports = User;