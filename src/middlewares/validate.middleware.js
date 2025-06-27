// Esta función recibe un esquema de validación (por ejemplo, de Zod)
export function ValidateBody(schema) {
  // Devuelve un middleware para Express
  return (req, res, next) => {
    // Intenta validar req.body usando el esquema proporcionado
    const result = schema.safeParse(req.body);

    // Si la validación falla, responde con error 400 y los detalles del error
    if (!result.success) {
      const formattedErrors = result.error.errors.reduce((acc, err) => {
        const field = err.path[0]
        if (!acc[field]) acc[field] = []
        acc[field].push(err.message)
        return acc
      }, {})

      return res.status(400).json({ errors: formattedErrors })
    }

    // Si la validación es exitosa, agrega los datos validados a la petición
    req.validatedData = result.data;

    // Llama a next() para continuar con el siguiente middleware o ruta
    next();
  };
}
