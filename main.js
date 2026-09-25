const express = require("express");
const mysql2 = require("mysql2/promise");

const app = express();
const port = 2000;
app.use(express.json());

// 1 
let db = mysql2.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "assignment4",
});

// 2 CRUD For Product
app.post("/create_product", async (req, res) => {

    const { ProductName, Price, StockQuantity, SupplierID } = req.body;

    const [result] = await db.query(
        `INSERT INTO Products 
        (ProductName, Price, StockQuantity, SupplierID)
        VALUES (?, ?, ?, ?)`,
        [ProductName, Price, StockQuantity, SupplierID]
    );

    return res.status(201).json({
        message: "Product created successfully",
        productId: result.insertId
    });
});

app.get("/get_all_products", async (req, res) => {

    const [result] = await db.query(
        `SELECT * FROM products`
    );

    return res.status(200).json({
        message: "Get Products Successfully",
        products: result
    });
});


app.get("/get_product/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.query(
        `SELECT * FROM products WHERE ProductID = ?`,
        [id]
    );

    if (result.length === 0) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json({
        message: "Get Product Successfully",
        product: result[0]
    });
});


app.put("/update_product/:id", async (req, res) => {

    const { id } = req.params;

    let updateQuery = "UPDATE products SET ";
    let bindingArr = [];

    const entries = Object.entries(req.body);

    for (const [key, value] of entries) {
        updateQuery += `${key} = ?,`;
        bindingArr.push(value);
    }

    updateQuery = updateQuery.slice(0, -1);

    updateQuery += " WHERE ProductID = ?";
    bindingArr.push(id);

    const [result] = await db.execute(updateQuery, bindingArr);

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json({
        message: "Product updated successfully",
        result
    });
});


app.delete("/delete_product/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.execute(
        `DELETE FROM products WHERE ProductID = ?`,
        [id]
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json({
        message: "Product deleted successfully",
        result
    });
});


// 2 CRUD For Suppliers

app.post("/create_supplier", async (req, res) => {

    const { SupplierName, ContactNumber } = req.body;

    const [result] = await db.execute(
        `INSERT INTO suppliers
        (SupplierName, ContactNumber)
        VALUES (?, ?)`,
        [SupplierName, ContactNumber]
    );

    return res.status(201).json({
        message: "Supplier created successfully",
        supplierId: result.insertId
    });
});


app.get("/get_all_suppliers", async (req, res) => {

    const [result] = await db.execute(
        `SELECT * FROM suppliers`
    );

    return res.status(200).json({
        message: "Get Suppliers Successfully",
        suppliers: result
    });
});



app.get("/get_supplier/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.execute(
        `SELECT * FROM suppliers WHERE SupplierID = ?`,
        [id]
    );

    if (!result.length) {
        return res.status(404).json({
            message: "Supplier not found"
        });
    }

    return res.status(200).json({
        message: "Get Supplier Successfully",
        supplier: result[0]
    });
});




app.put("/update_supplier/:id", async (req, res) => {

    const { id } = req.params;

    let updateQuery = "UPDATE suppliers SET ";
    let bindingArr = [];

    const entries = Object.entries(req.body);

    for (const [key, value] of entries) {
        updateQuery += `${key} = ?,`;
        bindingArr.push(value);
    }

    updateQuery = updateQuery.slice(0, -1);

    updateQuery += " WHERE SupplierID = ?";
    bindingArr.push(id);

    const [result] = await db.execute(
        updateQuery,
        bindingArr
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Supplier not found"
        });
    }

    return res.status(200).json({
        message: "Supplier updated successfully",
        result
    });
});




app.delete("/delete_supplier/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.execute(
        `DELETE FROM suppliers WHERE SupplierID = ?`,
        [id]
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Supplier not found"
        });
    }

    return res.status(200).json({
        message: "Supplier deleted successfully",
        result
    });
});




// 4 CRUD For Sale

app.post("/create_sale", async (req, res) => {

    const { ProductID, QuantitySold, SaleDate } = req.body;

    const [result] = await db.execute(
        `INSERT INTO sales
        (ProductID, QuantitySold, SaleDate)
        VALUES (?, ?, ?)`,
        [ProductID, QuantitySold, SaleDate]
    );

    return res.status(201).json({
        message: "Sale created successfully",
        saleId: result.insertId
    });
});



app.get("/get_all_sales", async (req, res) => {

    const [result] = await db.execute(
        `SELECT * FROM sales`
    );

    return res.status(200).json({
        message: "Get Sales Successfully",
        sales: result
    });
});


app.get("/get_sale/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.execute(
        `SELECT * FROM sales WHERE SaleID = ?`,
        [id]
    );

    if (!result.length) {
        return res.status(404).json({
            message: "Sale not found"
        });
    }

    return res.status(200).json({
        message: "Get Sale Successfully",
        sale: result[0]
    });
});


app.put("/update_sale/:id", async (req, res) => {

    const { id } = req.params;

    let updateQuery = "UPDATE sales SET ";
    let bindingArr = [];

    const entries = Object.entries(req.body);

    for (const [key, value] of entries) {
        updateQuery += `${key} = ?,`;
        bindingArr.push(value);
    }

    updateQuery = updateQuery.slice(0, -1);

    updateQuery += " WHERE SaleID = ?";
    bindingArr.push(id);

    const [result] = await db.execute(
        updateQuery,
        bindingArr
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Sale not found"
        });
    }

    return res.status(200).json({
        message: "Sale updated successfully",
        result
    });
});


app.delete("/delete_sale/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.execute(
        `DELETE FROM sales WHERE SaleID = ?`,
        [id]
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Sale not found"
        });
    }

    return res.status(200).json({
        message: "Sale deleted successfully",
        result
    });
});


// 5
app.put("/add_category", async (req, res) => {

    const [result] = await db.execute(
        `ALTER TABLE products
         ADD COLUMN Category VARCHAR(100)`
    );

    return res.status(200).json({
        message: "Category column added successfully"
    });
});


app.delete("/remove_category", async (req, res) => {

    const [result] = await db.execute(
        `ALTER TABLE products
         DROP COLUMN Category`
    );

    return res.status(200).json({
        message: "Category column removed successfully"
    });
});


app.put("/change_contact_number", async (req, res) => {

    const [result] = await db.execute(
        `ALTER TABLE suppliers
         MODIFY COLUMN ContactNumber VARCHAR(15)`
    );

    return res.status(200).json({
        message: "ContactNumber changed to VARCHAR(15) successfully"
    });
});
 

app.put("/add_product_name_not_null", async (req, res) => {

    const [result] = await db.execute(
        `ALTER TABLE products
         MODIFY COLUMN ProductName VARCHAR(250) NOT NULL`
    );

    return res.status(200).json({
        message: "ProductName is now NOT NULL"
    });
});



// 6

// a: we aready created endpoint for create Supplier so we will use it to add 
// {"SupplierName": "FreshFoods","ContactNumber": "01001234567"}


// b: we will use create product api to add three items in id 5 cuz this is FreshFood supplier id in my tables 
// {"ProductName": "Milk","Price": 15,"StockQuantity": 50,"SupplierID": 5}

// {"ProductName": "Bread","Price": 10,"StockQuantity": 30,"SupplierID": 5}

// {"ProductName": "Eggs","Price": 20,"StockQuantity": 40,"SupplierID": 1}

// c: we will use create_sale to add the record 
 
// {"ProductID": 1,"QuantitySold": 2,"SaleDate": "2025-05-20"}


// 7
app.put("/update_bread_price", async (req, res) => {

    const [result] = await db.execute(
        `UPDATE products
         SET Price = 25
         WHERE ProductName = 'Bread'`
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Bread not found"
        });
    }

    return res.status(200).json({
        message: "Bread price updated successfully"
    });
});

// 8
app.delete("/delete_eggs", async (req, res) => {

    const [result] = await db.execute(
        `DELETE FROM products
         WHERE ProductName = 'Eggs'`
    );

    if (!result.affectedRows) {
        return res.status(404).json({
            message: "Eggs product not found"
        });
    }

    return res.status(200).json({
        message: "Eggs deleted successfully"
    });
})


// 9
app.get("/sales_report", async (req, res) => {

    const [result] = await db.execute(
        `SELECT ProductID, SUM(QuantitySold) AS TotalQuantitySold
         FROM sales
         GROUP BY ProductID`
    );

    return res.status(200).json({
        message: "Sales report generated successfully",
        report: result
    });
});


// 10
app.get("/highest_stock_product", async (req, res) => {

    const [result] = await db.execute(
        `SELECT *
         FROM products
         ORDER BY StockQuantity DESC`
    );

    if (!result.length) {
        return res.status(404).json({
            message: "No products found"
        });
    }

    return res.status(200).json({
        message: "Highest stock product retrieved successfully",
        product: result[0]
    });
});

// 11
app.get("/suppliers_start_with_f", async (req, res) => {

    const [result] = await db.execute(
        `SELECT *
         FROM suppliers
         WHERE SupplierName LIKE 'F%'`
    );

    return res.status(200).json({
        message: "Suppliers retrieved successfully",
        suppliers: result
    });
});


// 12

app.get("/never_sold_products", async (req, res) => {

    const [result] = await db.execute(
        `SELECT p.*
         FROM products AS p
         LEFT JOIN sales AS s
         ON p.ProductID = s.ProductID
         WHERE s.ProductID IS NULL`
    );

    return res.status(200).json({
        message: "Never sold products retrieved successfully",
        products: result
    });
});



// 13
app.get("/retrieve_all_sales", async (req, res) => {

    const [result] = await db.execute(
        `SELECT 
            p.ProductName,
            s.QuantitySold,
            s.SaleDate
         FROM sales AS s
         JOIN products AS p
         ON s.ProductID = p.ProductID`
    );

    return res.status(200).json({
        message: "Sales report retrieved successfully",
        sales: result
    });
});


// 14 
// CREATE USER 'store_manager'@'localhost'
// IDENTIFIED BY 'store_manager123';

// GRANT SELECT, INSERT, UPDATE
// ON assignment4.*
// TO 'store_manager'@'localhost';


// 15 
// REVOKE UPDATE
// ON assignment4.*
//FROM 'store_manager'@'localhost';


// 16 
// GRANT DELETE
// ON assignment4.sales
// TO 'store_manager'@'localhost';



app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});