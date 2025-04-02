USE EVVADB; 
GO
SELECT * FROM suppliers;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'suppliers')
BEGIN
    CREATE TABLE suppliers (
        supplier_id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        available_days NVARCHAR(255),
        region NVARCHAR(50),
        rating INT CHECK (rating BETWEEN 1 AND 5),
        image_url NVARCHAR(255),
        additional_info TEXT,
        contact_info TEXT
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'locations')
BEGIN
    CREATE TABLE locations (
        location_id INT PRIMARY KEY IDENTITY(1,1),
        supplier_id INT,
        address NVARCHAR(255),
        city NVARCHAR(100),
        capacity INT,
        price DECIMAL(10,2),
        parking BIT,  -- 1=TRUE 0=FALSE ביט במקום בוליאן
        place_type NVARCHAR(100),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'catering')
BEGIN
    CREATE TABLE catering (
        catering_id INT PRIMARY KEY IDENTITY(1,1),
        supplier_id INT,
        price_per_person DECIMAL(10, 2),
        menu NVARCHAR(MAX),  -- תומך בטקסט ארוך 
        kosher BIT,
        vegetarian BIT,
        vegan BIT,
        gluten_free BIT,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'photographers')
BEGIN
    CREATE TABLE photographers (
        photographer_id INT PRIMARY KEY IDENTITY(1,1),
        supplier_id INT,
        price_per_hour DECIMAL(10,2),
        has_magnets BIT,
        has_stills BIT,
        has_video BIT,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'speakers')
BEGIN
    CREATE TABLE speakers (
        speaker_id INT PRIMARY KEY IDENTITY(1,1),
        supplier_id INT,
        price_per_lecture DECIMAL(10,2),
        lecture_duration INT,
        lecture_field NVARCHAR(100),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'djs')
BEGIN
    CREATE TABLE djs (
        dj_id INT PRIMARY KEY IDENTITY(1,1),
        supplier_id INT,
        price_per_hour DECIMAL(10,2),
        music_styles NVARCHAR(100),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        user_id INT PRIMARY KEY IDENTITY(1,1),
        full_name NVARCHAR(255) NOT NULL,
        phone NVARCHAR(20),
        email NVARCHAR(255) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) DEFAULT 'user' 
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'events')
BEGIN
    CREATE TABLE events (
        event_id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT,
        event_date DATE,
        budget DECIMAL(10,2),
        guest_count INT,
        location NVARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'event_suppliers')
BEGIN
    CREATE TABLE event_suppliers (
        event_id INT,
        supplier_id INT,
        PRIMARY KEY (event_id, supplier_id),
        FOREIGN KEY (event_id) REFERENCES events(event_id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'guests')
BEGIN
    CREATE TABLE guests (
        guest_id INT PRIMARY KEY IDENTITY(1,1),
        event_id INT,
        full_name NVARCHAR(255),
        phone NVARCHAR(20),
        email NVARCHAR(255),
        rsvp BIT, 
        FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
    );
END
GO