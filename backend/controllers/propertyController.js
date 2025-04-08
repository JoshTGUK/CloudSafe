const Property = require('../models/Property');

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.findAll({
            where: { userId: req.user.id }
        });
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};

exports.createProperty = async (req, res) => {
    try {
        const { name, address, imageUrl } = req.body;
        const property = await Property.create({
            name,
            address,
            imageUrl,
            userId: req.user.id
        });
        res.status(201).json(property);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ error: 'Failed to create property' });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const userId = req.user.id;

        const property = await Property.findOne({
            where: {
                id: propertyId,
                userId: userId
            }
        });

        if (!property) {
            return res.status(404).json({ error: 'Property not found or unauthorized' });
        }

        await property.destroy();
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error in deleteProperty:', error);
        res.status(500).json({ error: 'Failed to delete property' });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};
