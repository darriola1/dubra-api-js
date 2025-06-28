import request from 'supertest';

test('GET / debería responder con el mensaje de estado', async () => {
  const PORT = process.env.PORT || 3001;
  const res = await request(`http://localhost:${PORT}`).get('/');
  expect(res.status).toBe(200);
  expect(res.text).toMatch("🚀 Dubra API funcionando correctamente 3001");
});
