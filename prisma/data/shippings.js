const statuses = ["pendiente", "en_camino", "entregado", "cancelado"];

exports.shippings = Array.from({ length: 0 }).map(() => {}); // lo llenamos luego

// Como las órdenes se generan dinámicamente y tienen cantidad variable, la mejor práctica es generar los envíos en el seed, justo después de crear las órdenes, para tener los IDs

// En esta simulación vamos a crear un array vacío aquí, y en el seed generar los envíos con la data real después de crear las órdenes.
