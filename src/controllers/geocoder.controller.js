import { geocodeAddress } from "../services/geocoder.js";
import { logger } from "../utils/logger.js";

export class GeocoderController{

    find = async (req, res) =>{
        
        try{
            const address = req.query.q;
            console.log(address);
            if(!address){
                res.status(404).json({ error: 'Dirección no existe' });
                return;
            }
            
            const location = await geocodeAddress(address);
            if (location.length === 0) {
                logger.error('No se encontraron resultados');
                return res.status(404).json({ error: 'Error interno' })
            }
            if (location.length > 1) {
                logger.error('Demasiadas posibilidades');
                return res.status(404).json({ error: 'Error interno' })
            }
            res.json(location)

        } catch(error){
            logger.error.apply('No existe direccion', error)
            res.status(500).json({ error: 'Error interno' })
        }
    }

    findAll = async (req, res) =>{
        
        try{
            const address = req.query.q;
            console.log(address);
            if(!address){
                res.status(404).json({ error: 'Dirección no existe' });
                return;
            }
            
            const location = await geocodeAddress(address);
            if (location.length === 0) {
                logger.error('No se encontraron resultados');
                return res.status(404).json({ error: 'Error interno' })
            }
            res.json(location)

        } catch(error){
            logger.error.apply('No existe direccion', error)
            res.status(500).json({ error: 'Error interno' })
        }
    }

}