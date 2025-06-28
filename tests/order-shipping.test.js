import request from 'supertest';
import app from '../src/app.js';
import dotenv from 'dotenv';
dotenv.config();

describe('Order + Shipping Use Cases', () => {
    const credentials = {
        email: 'denis@example.com',
        password: 'nuevaPassword1231',
        recaptchaToken: 'test',
    };

    let cookie = '';
    let orderId = null;
    let shippingId = null;

    beforeAll(async () => {
        const login = await request(app).post('/api/auth/login').send(credentials);
        expect(login.statusCode).toBe(200);
        expect(login.headers['set-cookie']).toBeDefined();
        cookie = login.headers['set-cookie'].find((c) => c.startsWith('token=')).split(';')[0];
    });

    test('Debería crear una orden válida', async () => {
        const res = await request(app)
            .post('/api/order')
            .set('Cookie', cookie)
            .send({
                description: 'Pedido de prueba automatizado',
            });
        expect(res.body).toHaveProperty('order');
        expect(res.body.order).toHaveProperty('id');
        expect(res.body.order).toHaveProperty('createdAt');
        orderId = res.body.order.id;
    });

    test('Debería fallar al crear una orden sin datos requeridos', async () => {
        const res = await request(app).post('/api/order').set('Cookie', cookie).send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('description');
    });

    test('Debería crear un envío asociado a la orden', async () => {
        const res = await request(app)
            .post(`/api/shipping/order/${orderId}/shippings`)
            .set('Cookie', cookie)
            .send({
                fromAddress: 'Origen Test',
                toAddress: 'Destino Test',
                status: 'pendiente',
            });
        expect(res.body).toHaveProperty('shipping');
        expect(res.body.shipping).toHaveProperty('trackingId');
        expect(res.body.shipping.orderId).toBe(orderId);
        shippingId = res.body.shipping.id;
    });

    test('Debería fallar al crear un envío sin datos requeridos', async () => {
        const res = await request(app).post(`/api/shipping/order/${orderId}/shippings`).set('Cookie', cookie).send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });

    test('Debería obtener el envío por su trackingId', async () => {
        const trackingRes = await request(app).get(`/api/shipping/${shippingId}`).set('Cookie', cookie);
        expect(trackingRes.statusCode).toBe(200);
        expect(trackingRes.body.shipping).toHaveProperty('trackingId');
    });

    test('Debería obtener el historial de pedidos del usuario autenticado', async () => {
        const res = await request(app).get('/api/order').set('Cookie', cookie);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.orders)).toBe(true);
        expect(res.body.orders.some((o) => o.id === orderId)).toBe(true);
    });
    test('Debería obtener el historial de pedidos del usuario autenticado por ID', async () => {
        const res = await request(app).get(`/api/order/${orderId}`).set('Cookie', cookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.order).toHaveProperty('id', orderId);
    });
    test('Debería rechazar acceso a historial si no está autenticado', async () => {
        const res = await request(app).get('/api/order');
        expect(res.statusCode).toBe(401);
    });
});
