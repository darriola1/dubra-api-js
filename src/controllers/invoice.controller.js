import * as InvoiceModel from '../models/invoice.model.js';

export class InvoiceController {
  // Crear una nueva factura
  createInvoice = async (req, res) => {
    try {
      const { number, fileBase64, customerId } = req.body;
      const newInvoice = await InvoiceModel.createInvoice({ number, fileBase64, customerId });
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener todas las facturas
  getAllInvoices = async (req, res) => {
    try {
      const invoices = await InvoiceModel.findAllInvoices();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener una factura por ID
  getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
      const invoice = await InvoiceModel.findInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener las facturas de un cliente
  getInvoicesByCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
      const invoices = await InvoiceModel.findInvoicesByCustomer(customerId);
      if (!invoices || invoices.length === 0) {
        return res.status(404).json({ error: 'No invoices found for this customer' });
      }
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualizar una factura
  updateInvoice = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedInvoice = await InvoiceModel.updateInvoice(id, data);
      res.status(200).json(updatedInvoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Eliminar una factura
  deleteInvoice = async (req, res) => {
    const { id } = req.params;
    try {
      await InvoiceModel.deleteInvoice(id);
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
