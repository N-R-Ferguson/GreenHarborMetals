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
(2, 'Purchase ORder');
 
INSERT INTO GreenHarbor.Company (Name, CompanyTypeID, StreetAddress, City, State, Zipcode) 
VALUES 
('Green Harbor', 3, '5555 Unversity Ave', 'Ann Arbor', 'MI', '48105'),
('Gold Metals', 2, '3245 Fake St', 'Fake Town', 'MA', '23454'),
('notcompany', 1, 'none', 'none', 'none', 'none');

 
INSERT INTO GreenHarbor.Users (CompanyID, UserName, Email, Password, FirstName, LastName)
VALUES 
(1, 'nfergghm', 'nferg@ghm.org', 'GHMStaff', 'Nolan', 'Ferguson'),
(3, 'fakegmail', 'fake@gmail.com', 'fake', 'Joel', 'Terry'),
(2, 'goldmetals', 'goldmetals@aumetals.com', 'auisbest', 'Au', 'Ag');



INSERT INTO Staff (PositionTypeID, UserID, FirstName, LastName)
VALUES (1, 1, 'Nolan', 'Ferguson'); 
 