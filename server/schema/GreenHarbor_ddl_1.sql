/*==============================================================*/
/* DBMS name:      PostgreSQL Green Harbor                     */
/* Created on:     Joseph Bragg 4/7/2024 5:44:07 PM             */
/*==============================================================*/


drop schema GreenHarbor cascade;

/*
drop table Company;

drop table CompanyType;

drop table Inventory;

drop table Metals;

drop table OrderCart;

drop table OrderType;

drop table Orders;

drop table PositionType;

drop table PurchaseOrder;

drop table SalesOrder;

drop table Siloh;

drop table Staff;

drop table Users;

drop domain City;

drop domain Name;

drop domain State;

drop domain StreetAddress;

drop domain ZipCode;

*/

/*==============================================================*/
/* User: GreenHarbor                                            */
/*==============================================================*/
create schema GreenHarbor;

SET search_path TO GreenHarbor;

/*==============================================================*/
/* Domain: City                                                 */
/*==============================================================*/
create domain City as VARCHAR(50);

/*==============================================================*/
/* Domain: Name                                                 */
/*==============================================================*/
create domain Name as VARCHAR(30);

/*==============================================================*/
/* Domain: State                                                */
/*==============================================================*/
create domain State as CHAR(2);

comment on domain State is
'2 digit state code used by postal service';

/*==============================================================*/
/* Domain: StreetAddress                                        */
/*==============================================================*/
create domain StreetAddress as varchar(50);

/*==============================================================*/
/* Domain: ZipCode                                              */
/*==============================================================*/
create domain ZipCode as VARCHAR(9);

comment on domain ZipCode is
'5 or 9 Digit zip code';

/*==============================================================*/
/* Table: Company                                               */
/*==============================================================*/
create table Company (
   CompanyID            SERIAL not null,
   CompanyTypeID        INT4                 not null,
   Name                 VARCHAR(20)          not null,
   StreetAddress        VARCHAR(20)          not null,
   City                 VARCHAR(30)          not null,
   State                CHAR(2)              not null,
   ZipCode              ZipCode              not null,
   constraint CompanyPK primary key (CompanyID),
   constraint CompanyAK unique (Name)
);

comment on table Company is
'Contains the list of companies which can have the following types:

1).  Customer
2).  Supplier
3).  Green Harbor

';

/*==============================================================*/
/* Table: CompanyType                                           */
/*==============================================================*/
create table CompanyType (
   CompanyTypeID        SERIAL not null,
   Name                 VARCHAR(20)          not null,
   constraint CompanyTypePK primary key (CompanyTypeID)
);

/*==============================================================*/
/* Table: Inventory                                             */
/*==============================================================*/
create table Inventory (
   InventoryID          SERIAL not null,
   MetalsID             INT4                 not null,
   SilohID              INT4                 null,
   Amount               INT4                 not null,
   DateMined            DATE                 not null,
   InventoryDate        DATE                 not null,
   constraint InventoryPK primary key (InventoryID)
);

comment on table Inventory is
'The inventory contains all additions (receipot of metals purchased) and deductions (shipping of metals for metals sold).  ';

comment on column Inventory.Amount is
'Amount of material available in cubic foot';

comment on column Inventory.DateMined is
'Date material received was mined.  ';

comment on column Inventory.InventoryDate is
'Date item was added or shipped out of inventory.  ';

/*==============================================================*/
/* Table: Metals                                                */
/*==============================================================*/
create table Metals (
   MetalsID             SERIAL                 not null,
   CompanyID            INT4                 not null,
   MetalType            VARCHAR(20)          not null,
   Weight               INT4                 not null,
   MetalsDocument       VARCHAR(65334)       null,
   constraint MetalsPK primary key (MetalsID)
);

comment on column Metals.MetalType is
'Describes the type of metal';

comment on column Metals.Weight is
'Weight per cubic foot of material';

comment on column Metals.MetalsDocument is
'Text documentation on the equitable procurement by the given company/supplier of the metal limited to 64K. ';

/*==============================================================*/
/* Table: OrderCart                                             */
/*==============================================================*/
create table OrderCart (
   OrderCartID          SERIAL not null,
   OrderID              INT8                 null,
   MetalsID             INT4                 not null,
   UnitPrice            MONEY                not null,
   Quantity             INT4                 not null,
   constraint OrderCartPK primary key (OrderCartID)
);

comment on column OrderCart.Quantity is
'Quantiy of product ordered in cubic feet.  ';

/*==============================================================*/
/* Table: OrderType                                             */
/*==============================================================*/
create table OrderType (
   OrderTypeID          SERIAL               not null,
   Name                 Name                 null,
   constraint OrderTypePK primary key (OrderTypeID)
);

comment on column OrderType.OrderTypeID is
'Identifies order as a sales or purchase order
1 = Sales Order
2  = Purchase Order
';

/*==============================================================*/
/* Table: Orders                                                */
/*==============================================================*/
create table Orders (
   OrderID              SERIAL not null,
   CompanyID            INT4                 not null,
   OrderTypeID          INT4                 not null,
   DateOrdered          DATE                 not null,
   constraint PK_ORDERS primary key (OrderID),
   constraint AK_ORDERSAK_ORDERS unique (CompanyID, OrderTypeID, DateOrdered)
);

comment on table Orders is
'Contains orders for metals products.  An order can be of two types, a Sales Order or a Purchase Order.  Sales Orders have a shipping address, etc.
Each order has a "cart".   The "amount" for inventory is a decuction for Sales Orders and an Addition for Purchase Orders..  ';

comment on column Orders.OrderTypeID is
'Identifies order as a sales or purchase order
1 = Sales Order
2  = Purchase Order
';

/*==============================================================*/
/* Table: PositionType                                          */
/*==============================================================*/
create table PositionType (
   PositionTypeID       INT4                 not null,
   Name                 Name                 not null,
   constraint PK_POSITIONTYPE primary key (PositionTypeID)
);

/*==============================================================*/
/* Table: PurchaseOrder                                         */
/*==============================================================*/
create table PurchaseOrder (
   OrderID              INT8                 null,
   CompanyID            INT4                 null
);

/*==============================================================*/
/* Table: SalesOrder                                            */
/*==============================================================*/
create table SalesOrder (
   OrderID              INT8                 not null,
   ShipToStreet         StreetAddress        not null,
   ShipToCity           City                 not null,
   ShipToState          State                not null,
   ShipToZip            ZipCode              not null
);

comment on column SalesOrder.ShipToStreet is
'Shipping street address which defaults to street address of customer in Company table';

comment on column SalesOrder.ShipToCity is
'Defaults to Customer State in Company table';

comment on column SalesOrder.ShipToState is
'Defaults to Customer State in Company table';

/*==============================================================*/
/* Table: Siloh                                                 */
/*==============================================================*/
create table Siloh (
   SilohID              Serial               not null,
   Name                 Name                 not null,
   Capacity             INT8                 not null,
   constraint Siloh_PK primary key (SilohID),
   constraint SIlohAK1 unique (Name)
);

comment on column Siloh.Capacity is
'Total Capcity in cubic feet of material';

/*==============================================================*/
/* Table: Staff                                                 */
/*==============================================================*/
create table Staff (
   StaffID              SERIAL not null,
   PositionTypeID       INT4                 null,
   UserID               INT4                 null,
   FirstName            Name                 not null,
   LastName             Name                 not null,
   constraint StaffPK primary key (StaffID)
);

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users (
   UserID               SERIAL not null,
   CompanyID            INT4                 not null,
   UserName             VARCHAR(20)          null,
   Email                VARCHAR(30)          not null,
   Password             VARCHAR(30)          not null,
   FirstName            Name                 not null,
   LastName             Name                 not null,
   constraint PK_USERS primary key (UserID),
   constraint UsersAK1 unique (Email)
);

alter table Company
   add constraint CompanyCompanyTypeFK foreign key (CompanyTypeID)
      references CompanyType (CompanyTypeID)
      on delete restrict on update restrict;

alter table Inventory
   add constraint InventorySiloSilohFK foreign key (SilohID)
      references Siloh (SilohID)
      on delete restrict on update restrict;

alter table Inventory
   add constraint InventryMetalsIDMetalFK foreign key (MetalsID)
      references Metals (MetalsID)
      on delete restrict on update restrict;

alter table Metals
   add constraint MetalsCompanyFK foreign key (CompanyID)
      references Company (CompanyID)
      on delete restrict on update restrict;

alter table OrderCart
   add constraint OrderCartMetalsFK foreign key (MetalsID)
      references Metals (MetalsID)
      on delete restrict on update restrict;

alter table OrderCart
   add constraint OrderCartOrdersFK foreign key (OrderID)
      references Orders (OrderID)
      on delete restrict on update restrict;

alter table Orders
   add constraint OrderOrderTypeFK foreign key (OrderTypeID)
      references OrderType (OrderTypeID)
      on delete restrict on update restrict;

alter table Orders
   add constraint OrdersCompanyFK foreign key (CompanyID)
      references Company (CompanyID)
      on delete restrict on update restrict deferrable initially deferred;

alter table Orders
   add constraint OrdersStaffFK foreign key (StaffID)
      references Staff (StaffID)
      on delete restrict on update restrict deferrable initially deferred;

alter table PurchaseOrder
   add constraint PurchaseOrderCompanyFK foreign key (CompanyID)
      references Company (CompanyID)
      on delete restrict on update restrict;

alter table PurchaseOrder
   add constraint PurchaseOrderOrderFK foreign key (OrderID)
      references Orders (OrderID)
      on delete restrict on update restrict;

alter table SalesOrder
   add constraint SalesOrderOrderFK foreign key (OrderID)
      references Orders (OrderID)
      on delete restrict on update restrict;

alter table Staff
   add constraint StaffPositionTypeFK foreign key (PositionTypeID)
      references PositionType (PositionTypeID)
      on delete restrict on update restrict deferrable initially deferred;

alter table Staff
   add constraint StaffUserIDFK foreign key (UserID)
      references Users (UserID)
      on delete restrict on update restrict;

alter table Users
   add constraint UsersCompanyFK foreign key (CompanyID)
      references Company (CompanyID)
      on delete restrict on update restrict deferrable initially deferred;

