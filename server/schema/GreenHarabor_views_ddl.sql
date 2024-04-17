/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                              */
/* Created on:     Joseph Bragg 4/7/2024 6:50:07 PM            */
/*==============================================================*/

SET search_path TO GreenHarbor;


/*==============================================================*/
/* View: OrderCartView                                          */
/*==============================================================*/
create or replace view OrderCartView as
SELECT 
  oc.OrderCartID,
  oc.OrderID,
  oc.MetalsID,
  m.MetalType,
  m.CompanyID as MetalSuppplierID,
  m.MetalsDocument,
  m.weight,
  oc.quantity,
  oc.UnitPrice,
  oc.Quantity as ComputedWeight,
  oc.quantity*oc.UnitPrice as ComputedCost
 FROM GreenHarbor.OrderCart oc 
 JOIN GreenHarbor.Metals m ON (m.CompanyID = oc.CompanyID);


/*==============================================================*/
/* View: OrderTotalView                                         */
/*==============================================================*/
create or replace view OrderTotalView as
select 
  ocv.OrderID,
  sum(ComputedWeight) as TotalWeight,
  sum(ComputedCost) as TotalCost
FROM GreenHarbor.OrderCartView ocv
group by ocv.OrderID;

/*==============================================================*/
/* View: SalesOrderView                                         */
/*==============================================================*/
create or replace view SalesOrderView as
select 
  o.OrderID,
  o.CompanyID,
  C.Name AS CustomerName,
  O.DateOrdered,
  so.ShipToStreet,
  so.ShipToCity,
  so.ShipToZip,
  so.ShipToState
FROM GreenHarbor.Orders o 
JOIN GreenHarbor.SalesOrder so ON (so.OrderID = o.OrderID)
JOIN GreenHarbor.Company c ON (c.CompanyID = o.CompanyID)
JOIN GreenHarbor.OrderTotalView otv ON (otv.OrderID = o.OrderID);


