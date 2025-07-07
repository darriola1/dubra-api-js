import { geocodeAddress } from "../services/geocoder.js";
import { logger } from "../utils/logger.js";

export class GeocoderController{

    validate = async (location) => {
        const validLocations = ['Montevideo', 'Ciudad de la Costa']

        const place = location[0];
        if (!place.address.house_number){
            return { error: 'Debe de ser una dirección válida' }
        }

        const filteredLocations = location.filter(place =>
            validLocations.includes(place.address.city)
        );

        if (filteredLocations.length === 0){
            return { error: 'Debe de ser una dirección en una ciudad válida' }
        }

        return filteredLocations;
    }

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
                return res.status(404).json({ error: 'No se encontraron resultados'})
            }
            if (location.length > 1) {
                logger.error('Demasiadas posibilidades');
                return res.status(404).json({ error: 'Demasiadas posibilidades' })
            }
            const validated = await this.validate(location);

            if(validated.error){
                console.log(validated.error)
                logger.error(validated.error);
                return res.status(400).json(validated.error)
            }

            res.json(validated)

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
                return res.status(404).json({ error: 'No se encontraron resultados' })
            }
            const validated = await this.validate(location);

            if(validated.error){
                console.log(validated.error)
                logger.error(validated.error);
                return res.status(400).json(validated.error)
            }

            res.json(validated)

        } catch(error){
            logger.error.apply('No existe direccion', error)
            res.status(500).json({ error: 'Error interno' })
        }
    }

}