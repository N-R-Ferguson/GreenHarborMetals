SET search_path TO GreenHarbor;

INSERT INTO greenharbor.PositionType(PositionTypeID, name)
VALUES 
(1, 'Accounting'),
(2, 'Inventory'),
(3, 'Purchasing'),
(4, 'Receiving'),
(5, 'Shipping');
 
INSERT INTO GreenHarbor.CompanyType (CompanyTypeID, Name) 
VALUES
(1, 'Customer'),
(2, 'Supplier'),
(3, 'GreenHarbor');
 
INSERT INTO GreenHarbor.OrderType (OrderTypeID, Name) 
VALUES 
(1, 'Sales Order'),
(2, 'Purchase Order');
 
INSERT INTO GreenHarbor.Company (Name, CompanyTypeID, StreetAddress, City, State, Zipcode) 
VALUES 
('Green Harbor', 3, '5555 Unversity Ave', 'Ann Arbor', 'MI', '48105'),
('Gold Metals', 2, '7979 Gold St', 'Gold Town', 'MA', '19697'),
('notcompany', 1, 'none', 'none', 'none', 'none'),
('Silver Metals', 2, '4747 Silver St', 'Silver Town', 'CA', '10787'),
('Iron Metals', 2, '2626 Iron St', 'Iron City', 'MI', '55845');


 
INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName)
VALUES 
(11, 'nfergghm', 'nferg@ghm.org', 'GHMStaff', 'Nolan', 'Ferguson'),
(13, 'fakegmail', 'fake@gmail.com', 'fake', 'Joel', 'Terry'),
(12, 'goldmetals', 'goldmetals@aumetals.com', 'auisbest', 'Au', 'Ag'),
(11, 'staff', 'staff@ghm.org', 'Staff', 'Staff', 'Members'),
(14, 'silvermetals', 'silvermetals@agmeatls.com', 'agisbest', 'Silver',' Metals'),
(15, 'ironmetals', 'ironmetals@femetals.com', 'feisbest', 'Fe', 'Iron'),
(13, 'billyjean', 'billyjean@billyjean.com', 'billyjeanpsw', 'Billy', 'Jean');



INSERT INTO Staff (PositionTypeID, UserID, FirstName, LastName)
VALUES 
(1, 15, 'Nolan', 'Ferguson'),
(1, 18, 'Staff', 'Members');

INSERT INTO Siloh (Name, Capacity)
VALUES
('Gold', 4),
('Lithium', 4),
('Neodynium', 4),
('Titanium', 4);

INSERT INTO Metals (CompanyID, MetalType, Weight)
VALUES
(12, 'Gold', 0.15),
(14, 'Gold', 0.07),
(15, 'Gold', 0.25),
(12,'Gold', 0.35),
(12, 'Titanium', 0.01),
(14, 'Lithium', 0.3),
(15, 'Neodymium', 0.1);

INSERT INTO Inventory (MetalsID, SilohID, Amount, DateMined, InventoryDate)
Values
(1, 1, 0.15, '01/23/2024', '01/27/2024'),
(2, 1, 0.07, '01/23/2024', '01/28/2024'),
(3, 1, 0.25, '01/24/2024', '01/28/2024'),
(4, 1, 0.35, '01/25/2024', '01/29/2024'),
(5, 1, 0.01, '01/26/2024', '02/1/2024'),
(6, 1, 0.3, '01/28/2024', '02/3/2024'),
(7, 1, 0.1, '01/29/2024', '02/6/2024');

