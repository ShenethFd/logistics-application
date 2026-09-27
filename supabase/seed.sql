-- Reference data. Create Auth users separately, then insert matching profile IDs.
insert into public.regions(name,code,city,distance_km,estimated_minutes) values
('Tuzla Depot','TZL','Istanbul',0,0),('Kayseri Depot','KYS','Kayseri',770,620),('Ankara Depot','ANK','Ankara',450,330),('Izmir Depot','IZM','Izmir',490,390) on conflict do nothing;
insert into public.suppliers(name,contact_name,phone) values
('Mars','Operations Center','0216 555 10 10'),('Mars2','Operations Center','0216 555 10 11'),('Tezel','Shipping Desk','0216 555 20 20'),('Horoz','Operations Center','0216 555 30 30'),('Mevlana','Shipping Desk','0216 555 40 40') on conflict do nothing;
insert into public.drivers(supplier_id,full_name,phone,license_plate)
select s.id,v.full_name,v.phone,v.plate from (values
('Mars','Ahmet Yilmaz','0532 111 22 33','34 TR 2045'),('Tezel','Mehmet Kaya','0533 222 33 44','38 KYS 128'),('Horoz','Burak Demir','0534 333 44 55','06 ANK 908'),('Mevlana','Eren Sahin','0535 444 55 66','35 IZM 701')) v(supplier,full_name,phone,plate) join public.suppliers s on s.name=v.supplier;
