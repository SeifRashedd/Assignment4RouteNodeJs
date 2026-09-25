

1- CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(250),
    Price INT,
    StockQuantity INT,
    SupplierID INT,

);


2- CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierName VARCHAR(250),
    ContactNumber INT
);

// after add Suppliers tabel we will make SupplierID FOREIGN KEY in Products table
ALTER TABLE Products
ADD FOREIGN KEY (SupplierID)
REFERENCES Suppliers(SupplierID);


3- CREATE TABLE Sales (
    SaleID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    QuantitySold INT,
    SaleDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);








