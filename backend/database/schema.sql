CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) UNIQUE,
    password VARCHAR(60)
);

CREATE TABLE Cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    series VARCHAR(100),
    mileage INT,
    power INT,
    transmission VARCHAR(50),
    year INT,
    exterior_color VARCHAR(50),
    interior_color VARCHAR(50),
    price NUMERIC(15,2),
    image_links JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cars_updated_at
BEFORE UPDATE ON Cars
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE Refresh_Tokens (
    token VARCHAR(500) PRIMARY KEY,
    userId INT REFERENCES Users(id) ON DELETE CASCADE
);