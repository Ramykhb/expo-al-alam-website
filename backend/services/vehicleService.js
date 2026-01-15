import pool from "../database/dbConfig.js";

export const deleteVehicleById = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM Cars WHERE id = ?", [
            id,
        ]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        throw error;
    }
};

export const updateVehicleById = async (id, updateData) => {
    try {
        const result = await pool.query(
            `UPDATE Cars SET 
                name = ?, brand = ?, series = ?, year = ?, price = ?, 
                mileage = ?, power = ?, transmission = ?, 
                exterior_color = ?, interior_color = ? 
            WHERE id = ?`,
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

        const [updatedRows] = await pool.query(
            "SELECT * FROM Cars WHERE id = ?",
            [id]
        );

        const updatedVehicle = updatedRows[0];

        return updatedVehicle;
    } catch (error) {
        throw error;
    }
};

export const getVehicleById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Cars WHERE id = ?", [
            id,
        ]);
        return rows[0];
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
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        const [cars] = await pool.query(`
            SELECT 
                id, name, brand, series, year, price, 
                mileage, power, transmission, exterior_color, 
                interior_color, image_links 
            FROM Cars 
            ORDER BY created_at DESC
        `);
        return cars;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
};
