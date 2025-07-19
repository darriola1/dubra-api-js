import * as UserModel from '../models/user.model.js';

export class UserController {
    // Obtener un usuario por correo electrónico
    getUserByEmail = async (req, res) => {
        const { email } = req.params;
        try {
            const user = await UserModel.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Obtener un usuario por ID
    getUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserModel.findUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}