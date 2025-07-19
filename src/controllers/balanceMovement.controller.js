import * as BalanceMovementModel from '../models/balanceMovement.model.js';

export class BalanceMovementController {
    // Crear un nuevo movimiento de saldo
    createBalanceMovement = async (req, res) => {
        try {
            const { description, amount, customerId, invoiceId } = req.body;
            const newBalanceMovement = await BalanceMovementModel.createBalanceMovement({
                description,
                amount,
                customerId,
                invoiceId,
            });
            res.status(201).json(newBalanceMovement);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Obtener todos los movimientos de saldo
    getAllBalanceMovements = async (req, res) => {
        try {
            const balanceMovements = await BalanceMovementModel.findAllBalanceMovements();
            res.status(200).json(balanceMovements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Obtener los movimientos de saldo de un cliente
    getBalanceMovementsByCustomer = async (req, res) => {
        const { customerId } = req.params;
        try {
            const balanceMovements = await BalanceMovementModel.findBalanceMovementsByCustomer(customerId);
            if (!balanceMovements || balanceMovements.length === 0) {
                return res.status(404).json({ error: 'No balance movements found for this customer' });
            }
            res.status(200).json(balanceMovements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Obtener un movimiento de saldo por ID
    getBalanceMovementById = async (req, res) => {
        const { id } = req.params;
        try {
            const balanceMovement = await BalanceMovementModel.findBalanceMovementById(id);
            if (!balanceMovement) {
                return res.status(404).json({ error: 'Balance movement not found' });
            }
            res.status(200).json(balanceMovement);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Actualizar un movimiento de saldo
    updateBalanceMovement = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedBalanceMovement = await BalanceMovementModel.updateBalanceMovement(id, data);
            res.status(200).json(updatedBalanceMovement);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Eliminar un movimiento de saldo
    deleteBalanceMovement = async (req, res) => {
        const { id } = req.params;
        try {
            await BalanceMovementModel.deleteBalanceMovement(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}