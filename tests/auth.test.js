import request from 'supertest';
import app from '../src/app.js';
import dotenv from 'dotenv';
dotenv.config();

describe('Auth Use Cases', () => {
  const uniqueEmail = `test${Date.now()}@example.com`;
  const password = 'Test1234!';
  let token = '';

  test('Debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: uniqueEmail,
        password: password,
        recaptchaToken: 'test', // debe estar bypassed en dev
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('email', uniqueEmail);
  });

  test('Debería hacer login y devolver token + user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: uniqueEmail,
        password: password,
        recaptchaToken: 'test',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(uniqueEmail);
    expect(res.headers['set-cookie']).toBeDefined();

    // Extraer token de cookie
    const cookie = res.headers['set-cookie'].find((c) =>
      c.startsWith('token='),
    );
    token = cookie.split(';')[0];
  });

  test('Debería acceder al endpoint /me con token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('email', uniqueEmail);
  });

  test('Debería cerrar sesión correctamente', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/sesión cerrada/i);
  });

  test('No debería acceder a /me sin token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Unauthorized');
  });
});
