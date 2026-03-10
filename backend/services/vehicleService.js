import pool from "../database/dbConfig.js";

export const deleteVehicleById = async (id) => {
    try {
        const result = await pool.query("DELETE FROM Cars WHERE id = $1", [
            id,
        ]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        throw error;
    }
};

export const updateVehicleById = async (id, updateData) => {
    try {
        await pool.query(
            `UPDATE Cars SET 
                name = $1, brand = $2, series = $3, year = $4, price = $5, 
                mileage = $6, power = $7, transmission = $8, 
                exterior_color = $9, interior_color = $10 
            WHERE id = $11`,
            [
                updateData.name,
                updateData.brand,
                updateData.series,
                updateData.year,
                updateData.price,
                updateData.mileage,
                updateData.power,
                updateData.transmission,
                updateData.exterior_color,
                updateData.interior_color,
                id,
            ]
        );

        const result = await pool.query(
            "SELECT * FROM Cars WHERE id = $1",
            [id]
        );

        const updatedVehicle = result.rows[0];

        return updatedVehicle;
    } catch (error) {
        throw error;
    }
};

export const getVehicleById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM Cars WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        throw error;
    }
};

export const addVehicleToDB = async (vehicleData, imagePaths) => {
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
    } = vehicleData;
    try {
        const query = `
            INSERT INTO Cars (
                name, brand, series, year, price, mileage, power,
                transmission, exterior_color, interior_color, image_links
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        await pool.query(query, [
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
            JSON.stringify(imagePaths),
        ]);
    } catch (error) {
        console.error("Error adding vehicle:", error);
        throw error;
    }
};

export const getAllVehiclesFromDB = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                id, name, brand, series, year, price, 
                mileage, power, transmission, exterior_color, 
                interior_color, image_links 
            FROM Cars 
            ORDER BY created_at DESC
        `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
};
