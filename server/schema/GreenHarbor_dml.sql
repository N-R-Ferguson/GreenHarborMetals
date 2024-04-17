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

INSERT INTO Siloh (Name, Capacity)
VALUES
('Gold', 20000000),
('Lithium', 20000000),
('Neodynium', 20000000),
('Titanium', 20000000);
 
INSERT INTO GreenHarbor.Company (Name, CompanyTypeID, StreetAddress, City, State, Zipcode) 
VALUES 
('Green Harbor', 3, '5555 Unversity Ave', 'Ann Arbor', 'MI', '48105'),
('Gold Metals', 2, '7979 Gold St', 'Gold Town', 'MA', '19697'),
('Silver Metals', 2, '4747 Silver St', 'Silver Town', 'CA', '10787'),
('Iron Metals', 2, '2626 Iron St', 'Iron City', 'MI', '55845');



INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName)
VALUES 
(1, 'nfergghm', 'nferg@ghm.org', 'GHMStaff', 'Nolan', 'Ferguson'),
(2, 'goldmetals', 'goldmetals@aumetals.com', 'auisbest', 'Au', 'Ag'),
(1, 'staff', 'staff@ghm.org', 'Staff', 'Staff', 'Members'),
(3, 'silvermetals', 'silvermetals@agmeatls.com', 'agisbest', 'Silver',' Metals'),
(4, 'ironmetals', 'ironmetals@femetals.com', 'feisbest', 'Fe', 'Iron');



