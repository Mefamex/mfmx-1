/*
* title : NORTHWIND sample 
* author: @mefamex 
* date  : 2025-04-21 
* lesson: Veritabanina giris 
* lead  : Doc.Dr. Bilal Senol 
* assist: Ar.Gor. Nur Kevser Namli 
* subject: sql query using northwind 
*/

use northwind;


/* Coklu JOIN, CONCAT, ORDER BY  */ 
/* Her siparişteki ürünlerin adını, miktarını, 
	siparişi veren müşterinin adını ve siparişi alan çalışanın adını 
    miktara göre sıralıyarak listeleme */

SELECT 	orders.id,
		CONCAT(customers.first_name, ' ', customers.last_name) AS Customer_Name,
		CONCAT(employees.first_name, ' ', employees.last_name) AS Employee_Name,
		products.product_name,
		order_details.quantity
	FROM Orders
		INNER JOIN customers ON orders.customer_id = customers.id
		INNER JOIN employees ON orders.employee_id = employees.id
		INNER JOIN order_details ON orders.id = order_details.order_id
		INNER JOIN products ON order_details.product_id = products.id
	WHERE order_details.Quantity >= 100 and ( customers.first_name LIKE "A%" or   customers.last_name LIKE "%sen" )
	ORDER BY 
		order_details.Quantity DESC, 
		Customer_Name ASC,
		Employee_Name ASC
	LIMIT 5;







        


/* INNER JOIN, GROUP BY, HAVING, MAX, CONCAT
/* en çok sipariş veren müşteriler */


SELECT 
		CONCAT(customers.first_name, ' ', customers.last_name) AS Customer_Name,
		COUNT(orders.id) AS OrderCount
	FROM customers
		INNER JOIN orders ON customers.id = orders.customer_id
	WHERE orders.order_date >= DATE_SUB(CURDATE(), INTERVAL 19 YEAR)
	GROUP BY customers.id
	HAVING OrderCount = (
		SELECT MAX(OrderCounts)
		FROM (
			SELECT COUNT(id) AS OrderCounts
			FROM orders
			WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 19 YEAR)
			GROUP BY customer_id
		) AS Sub
	) -- having
	ORDER BY Customer_Name;




/* INNER JOIN, WHERE in, GROUP BY, HAVING, DATE_SUB*/
/* En cok siparis veren musteri(ler)e ait tum alt siparisler */


SELECT 
		orders.id AS OrderID,
		orders.order_date,
		CONCAT(customers.first_name, ' ', customers.last_name) AS Customer_Name,
		products.product_name,
		order_details.quantity
	FROM orders
		INNER JOIN customers ON orders.customer_id = customers.id
		INNER JOIN order_details ON orders.id = order_details.order_id
		INNER JOIN products ON order_details.product_id = products.id
	WHERE orders.customer_id IN (
		SELECT customers.id
		FROM customers
			INNER JOIN orders ON customers.id = orders.customer_id
		WHERE orders.order_date >= DATE_SUB(CURDATE(), INTERVAL 19 YEAR)
		GROUP BY customers.id
		HAVING COUNT(orders.id) = (
			SELECT MAX(OrderCounts)
			FROM (
				SELECT COUNT(id) AS OrderCounts
				FROM orders
				WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 19 YEAR)
                GROUP BY customer_id
			) AS Sub
		) -- having
	) -- where
	ORDER BY Customer_Name ASC, orders.order_date DESC;




/* test */
SELECT order_date FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 19 YEAR) ORDER BY order_date asc LIMIT 10;   -- 04-22 +
SELECT order_date FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 100 YEAR) ORDER BY order_date asc LIMIT 10;  -- 01-15 +
SELECT order_date FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 19 YEAR) ORDER BY order_date desc LIMIT 10;  -- 06-23 -
SELECT order_date FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 100 YEAR) ORDER BY order_date desc LIMIT 10; -- 06-23 -