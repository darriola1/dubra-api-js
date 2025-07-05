import * as CustomerModel from '../models/customer.model.js';

export class CustomerController {
  // Crear un nuevo cliente
  createCustomer = async (req, res) => {
    try {
      const { nombre_fantasia, razon_social, RUT } = req.body;
      const newCustomer = await CustomerModel.createCustomer({ nombre_fantasia, razon_social, RUT });
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener todos los clientes
  getAllCustomers = async (req, res) => {
    try {
      const customers = await CustomerModel.findAllCustomers();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener un cliente por RUT
  getCustomerByRUT = async (req, res) => {
    const { RUT } = req.params; // Cambié "RU" a "RUT" para coincidir con el parámetro
    try {
      const customer = await CustomerModel.findCustomerByRUT(RUT); // Cambié "id" a "RUT" para buscar por el RUT
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualizar un cliente
  updateCustomer = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedCustomer = await CustomerModel.updateCustomer(id, data);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Eliminar un cliente
  deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
      await CustomerModel.deleteCustomer(id);
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
