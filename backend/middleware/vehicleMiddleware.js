export const addVehicleMiddleWare = async (req, res, next) => {
    const {
        name,
        brand,
        series,
        year,
        price,
        mileage,
        power,
        transmission,
        exterior,
        interior,
        mainImageIndex,
    } = req.body;
    if (
        !name ||
        !brand ||
        !series ||
        !year ||
        !price ||
        !mileage ||
        !power ||
        !transmission ||
        !exterior ||
        !interior
    ) {
        return res.status(400).json({
            success: false,
            error: "Please fill out all required fields.",
        });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            success: false,
            error: "No images uploaded",
        });
    }
    next();
};

export const singleVehicleMiddleWare = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            error: "Please enter a card id.",
        });
    }
    next();
};

export const updateVehicleMiddleware = async (req, res, next) => {
    const {
        name,
        brand,
        series,
        year,
        price,
        mileage,
        power,
        transmission,
        exterior_color,
        interior_color,
    } = req.body;
    const { id } = req.params;
    if (
        !name ||
        !brand ||
        !series ||
        !year ||
        price == null ||
        mileage == null ||
        !power ||
        !transmission ||
        !exterior_color ||
        !interior_color ||
        !id
    ) {
        return res.status(400).json({
            success: false,
            error: "Please fill out all required fields.",
        });
    }
    next();
};
