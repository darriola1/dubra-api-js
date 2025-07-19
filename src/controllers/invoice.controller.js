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
    const { search, status, customerId, limit, offset, fromDate, toDate } = req.query;

    // Paginación
    const parsedLimit = !isNaN(Number(limit)) ? parseInt(limit) : 10; // 10 por defecto
    const parsedOffset = !isNaN(Number(offset)) ? parseInt(offset) : 0; // 0 por defecto

    try {
      // Llamada al modelo para obtener las facturas con filtros y paginación
      const result = await InvoiceModel.findAllInvoices({
        search: typeof search === 'string' ? search : undefined,
        status: typeof status === 'string' ? status.toLowerCase() : undefined,
        customerId: customerId ? parseInt(customerId) : undefined,
        fromDate: fromDate ? new Date(fromDate + "T00:00:00") : undefined,
        toDate: toDate ? new Date(toDate + "T23:59:59") : undefined,
        limit: parsedLimit,
        offset: parsedOffset,
      });

      res.status(200).json({
        rows: result.rows,
        total: result.total
      });
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
    const customerId = parseInt(req.params.customerId, 10);
    const { search, status, fromDate, toDate, limit, offset } = req.query;

    if (isNaN(customerId)) {
      return res.status(400).json({ error: 'The customerId parameter must be a valid number.' });
    }

    const parsedLimit = !isNaN(Number(limit)) ? parseInt(limit) : 10;
    const parsedOffset = !isNaN(Number(offset)) ? parseInt(offset) : 0;

    try {
      const invoices = await InvoiceModel.findInvoicesByCustomer({
        customerId,
        search: search || undefined,
        status: status || undefined,
        fromDate: fromDate ? new Date(fromDate + "T00:00:00") : undefined,
        toDate: toDate ? new Date(toDate + "T23:59:59") : undefined,
        limit: parsedLimit,
        offset: parsedOffset,
      });

      return res.status(200).json(invoices || []);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
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

    // Subir archivo de factura
  uploadFile = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No se envió ningún archivo." });
    }

    try {
      const base64 = file.buffer.toString("base64");

      await InvoiceModel.updateInvoice(id, { fileBase64: base64 });

      const updatedInvoice = await InvoiceModel.findInvoiceById(id);

      res.status(200).json(updatedInvoice);
    } catch (error) {
      res.status(500).json({ error: "Error al subir archivo." });
    }
  };
}
