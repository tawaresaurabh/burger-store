# Burger Store
Shopping cart for burger store using MERN stack


## About

Functionality:

- This project is a basic buger store portal thatserves 2 kinds of users - admin (store owner) and customer.
- Admin can manage the portal menu by adding new burgers or editing existing burgers menu.
- Customers can select from different types of burgers and add them to the cart and then place order. They can view all the past orders as well.
- Once an order is made, the order goes into different stages like ordered, received , inQueue and ready . The customer can monitor the progress of each order using the portal


Technologies:

- The porject is created using MERN stack - Mongo DB, Express , React and Node
- It can run inside docker.
- It uses rabbitMQ to queue the incoming orders and then send updates about the order to the portal
- It uses jwt for authentication



Architecture:

![alt text](https://github.com/tawaresaurabh/burger-store/blob/main/architecture.png?raw=true)

To Run(Docker is pre-requisite) :

- Goto the cloned directory , make sure that its the root folder (which has docker-compose.yaml file)
- Run the following 
-

```bash
docker-compose build --no-cache
```

-

```bash
docker-compose up -d
```

- Presently, adding a new user of any kind is not possible
- There are 3 users in built below are username/passwords for them

- admin/admin (Admin role)
- customer1/customer1 (customer role)
- customer2/customer2 (customer role)








  
  
  
