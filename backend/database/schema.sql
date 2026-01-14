CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40) UNIQUE,
    password VARCHAR(60)
);

CREATE TABLE Cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    series VARCHAR(100),
    mileage INT,
    power INT,
    transmission VARCHAR(50),
    year YEAR,
    exterior_color VARCHAR(50),
    interior_color VARCHAR(50),
    price DECIMAL(15, 2),
    image_links JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Refresh_Tokens (
    token VARCHAR(500) PRIMARY KEY,
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);