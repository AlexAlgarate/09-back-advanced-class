import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // Sirve para validar que hay un solo usuario
      // aunque nuestra validación buena, está en el caso de uso de dominio
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model('User', UserSchema, 'Users');
