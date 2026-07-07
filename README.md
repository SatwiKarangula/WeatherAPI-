# Phase 4 - Kubernetes (k3s) Deployment of Weather API

## 📌 Overview

This project demonstrates how to deploy a Dockerized Node.js Weather API application to a Kubernetes cluster using **k3s**.

The objective of this task is to understand the basic Kubernetes architecture, create deployment and service manifest files, deploy the application, monitor its status, and observe Kubernetes' self-healing capabilities.

---

# Project Architecture

```
Node.js Weather API
        │
        ▼
Docker Image
        │
        ▼
k3s Kubernetes Cluster
        │
        ▼
Deployment
        │
        ▼
Pod
        │
        ▼
Service (NodePort)
        │
        ▼
Client Request
```

---

# Technologies Used

- Kubernetes (k3s)
- Docker
- Node.js
- Express.js
- MongoDB Atlas
- OpenWeather API
- kubectl

---

# Prerequisites

- Docker installed
- Docker image of the Weather API
- k3s installed
- kubectl configured
- MongoDB Atlas account
- OpenWeather API Key

---

# Project Structure

```
Weather-API/
│
├── deployment.yaml
├── service.yaml
├── Dockerfile
├── .env
├── package.json
├── server.js
└── README.md
```

---

# Step 1 - Build Docker Image

```bash
docker build -t weather-api .
```

Verify:

```bash
docker images
```

---

# Step 2 - Import Image into k3s

Since k3s uses **containerd**, import the Docker image.

Export image:

```bash
docker save weather-api:latest -o weather-api.tar
```

Import image:

```bash
sudo k3s ctr images import weather-api.tar
```

Verify:

```bash
sudo k3s ctr images ls
```

---

# Step 3 - Create Kubernetes Secret

Create the secret using the existing `.env` file.

```bash
kubectl create secret generic weather-secret --from-env-file=.env
```

Verify:

```bash
kubectl get secrets
```

---

# Step 4 - Deployment Manifest

The Deployment manifest is responsible for:

- Creating Pods
- Managing replicas
- Restarting failed Pods
- Maintaining desired state

Deploy:

```bash
kubectl apply -f deployment.yaml
```

---

# Step 5 - Service Manifest

The Service exposes the application through a NodePort.

Deploy:

```bash
kubectl apply -f service.yaml
```

---

# Step 6 - Verify Deployment

Check Deployments

```bash
kubectl get deployments
```

Check Pods

```bash
kubectl get pods
```

Check Services

```bash
kubectl get svc
```

Check Nodes

```bash
kubectl get nodes
```

---

# Step 7 - View Logs

```bash
kubectl logs <pod-name>
```

Example:

```bash
kubectl logs weather-api-xxxxxxxxxx
```

---

# Step 8 - Describe Pod

```bash
kubectl describe pod <pod-name>
```

This displays:

- Events
- Restart Count
- Image Details
- Container Status

---

# Step 9 - Test the Application

Since k3s is running inside **WSL**, the recommended approach is to use port forwarding.

```bash
kubectl port-forward service/weather-api-service 3000:3000
```

Open Postman:

```
http://localhost:3000/weather/live/vijayawada
```

---

# Step 10 - Self-Healing Demonstration

Delete the running Pod.

```bash
kubectl delete pod <pod-name>
```

Observe:

```bash
kubectl get pods
```

A new Pod is automatically created by the Deployment.

This demonstrates Kubernetes' **Self-Healing** capability.

---

# Important kubectl Commands

| Command | Description |
|----------|-------------|
| kubectl get nodes | View cluster nodes |
| kubectl get pods | List running Pods |
| kubectl get deployments | View Deployments |
| kubectl get svc | View Services |
| kubectl describe pod | Detailed Pod information |
| kubectl logs | View container logs |
| kubectl delete pod | Delete a Pod |
| kubectl apply -f | Apply manifest file |
| kubectl rollout restart deployment | Restart Deployment |

---

# Kubernetes Resources Used

## Deployment

Responsible for:

- Creating Pods
- Maintaining desired replicas
- Self-Healing
- Rolling Updates

---

## Pod

A Pod is the smallest deployable unit in Kubernetes.

Each Pod contains one Weather API container.

---

## Service

The Service exposes the application and provides stable networking.

NodePort was used in this project.

---

## Secret

Sensitive configuration such as:

- MongoDB URI
- OpenWeather API Key
- PORT

was stored securely using Kubernetes Secrets created from the `.env` file.

---

# Key Learnings

- Understood Kubernetes architecture
- Learned k3s installation and usage
- Created Deployment manifests
- Created Service manifests
- Used Kubernetes Secrets
- Deployed a Dockerized application to Kubernetes
- Monitored Pods and Deployments
- Viewed Pod logs
- Verified Services
- Demonstrated Kubernetes Self-Healing
- Used kubectl commands for cluster management

---

# Outcome

Successfully deployed the Dockerized Weather API application on a k3s Kubernetes cluster.

The application was managed through Kubernetes Deployments, exposed using a NodePort Service, configured using Kubernetes Secrets, and monitored using kubectl. Kubernetes automatically recreated Pods when they were deleted, demonstrating its self-healing capability.

# Weather API Backend Application

## Project Overview

This project is a full backend REST API application developed using Node.js, Express.js, MongoDB Atlas, and OpenWeather API.

The application demonstrates real-world backend development concepts including:

* REST API development
* CRUD operations
* External API integration
* MongoDB Atlas database integration
* Request validation
* Error handling
* Logging
* Environment variable management
* Modular backend architecture

The backend fetches real-time weather information from the OpenWeather API, stores weather data inside MongoDB Atlas, and exposes multiple custom API endpoints to perform CRUD operations.

This project was developed as part of backend and DevOps learning to understand how modern backend services communicate with databases and third-party APIs.

---

# Technologies Used

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| Node.js       | JavaScript runtime            |
| Express.js    | Backend framework             |
| MongoDB Atlas | Cloud database                |
| Mongoose      | MongoDB ODM                   |
| Axios         | External API requests         |
| dotenv        | Environment variables         |
| Morgan        | Request logging               |
| CORS          | Cross-origin request handling |

---

# Application Architecture

```text id="89rslf"
Client Request
      ↓
Express Server
      ↓
Routes
      ↓
Controllers
      ↓
OpenWeather API / MongoDB
      ↓
JSON Response
```

---

# Features

* REST API endpoints
* MongoDB Atlas cloud database integration
* Real-time weather fetching from OpenWeather API
* CRUD operations
* Search weather by city
* Store live weather data in MongoDB
* Request logging using Morgan
* Input validation
* Error handling
* Environment variable configuration
* Modular project structure

---

# Project Structure

```text id="7trg9s"
weather-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── weatherController.js
│
├── middleware/
│   └── logger.js
│
├── models/
│   └── Weather.js
│
├── routes/
│   └── weatherRoutes.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# Folder Explanation

## config/

Contains MongoDB database connection setup.

## controllers/

Contains all backend business logic and CRUD operation functions.

## middleware/

Contains middleware functions such as request logging.

## models/

Contains MongoDB schemas and database models.

## routes/

Contains all REST API endpoint routes.

## .env

Stores sensitive configuration values securely.

## server.js

Main backend entry point.

---

# MongoDB Atlas Setup

## Step 1 — Create MongoDB Atlas Account

Visit:
https://www.mongodb.com/atlas

Create a free MongoDB Atlas account and create a free-tier cluster.

---

## Step 2 — Create Database User

Navigate to:

```text id="cxql0n"
Security → Database Access
```

Create a database user.

Example:

```text id="y7y4ng"
Username: satwik_db_user
Password: 123456
```

---

## Step 3 — Configure Network Access

Navigate to:

```text id="1x35e6"
Security → Network Access
```

Add:

```text id="ktw2em"
0.0.0.0/0
```

This allows access from all IP addresses during development.

---

## Step 4 — Get MongoDB Connection String

Navigate to:

```text id="8p6d2z"
Cluster → Connect → Drivers
```

Select:

* Node.js

Copy the generated connection string.
# If any Problem Faced in hosting the server — MongoDB SRV Connection Issue & Solution

While connecting MongoDB Atlas with the Node.js backend application, an SRV DNS connection issue was encountered during the database connection process.

## Error Faced

```text
querySrv ECONNREFUSED _mongodb._tcp.weather-api.vlnf710.mongodb.net
```

---

# Cause of the Issue

The issue occurred because the `mongodb+srv://` connection string uses DNS SRV record resolution internally.

Some networks, DNS configurations, college WiFi networks, antivirus software, or firewall settings may block SRV DNS lookups, which prevents Node.js and MongoDB Atlas from resolving the cluster address properly.

---

# Initial Connection String

```env
MONGO_URI=mongodb+srv://username:password@weather-api.vlnf710.mongodb.net/
```

This resulted in the SRV connection failure.

---

# Solution Implemented

To resolve the issue, the standard MongoDB connection string (`mongodb://`) was used instead of the SRV-based connection string.

## Steps Followed

1. Opened MongoDB Atlas
2. Navigated to:

```text
Cluster → Connect → Drivers
```

3. Selected:

* Node.js Driver

4. Clicked:

```text
Show More Options
```

5. Selected:

```text
Standard Connection String
```

6. Replaced the SRV URI with the standard MongoDB URI.

---

# Updated Working Connection String

```env
MONGO_URI=mongodb://username:password@ac-xxxxx-shard-00-00.mongodb.net:27017,ac-xxxxx-shard-00-01.mongodb.net:27017,ac-xxxxx-shard-00-02.mongodb.net:27017/weatherDB?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

---

# Additional Fixes Applied

* Added IP Address:

```text
0.0.0.0/0
```

inside:

```text
Security → Network Access
```

* Restarted backend server after updating `.env`

* Verified MongoDB connection using:

```bash
node server.js
```

---

# Successful Output

```text
MongoDB Connected Successfully
Server running on port 3000
```

---

# Learning Outcome

This issue helped in understanding:

* MongoDB Atlas connectivity
* DNS SRV resolution
* Difference between `mongodb+srv://` and `mongodb://`
* Network-related backend debugging
* Real-world troubleshooting during backend setup


---

# OpenWeather API Setup

## Step 1 — Create OpenWeather Account

Visit:
https://openweathermap.org/api

Create a free account.

---

## Step 2 — Generate API Key

Navigate to:

```text id="yzdz5l"
My API Keys
```

Generate an API key.

Example:

```text id="x3w9ot"
abcd1234xyz
```

---

# Environment Variable Setup

Create a `.env` file in the project root directory.

Example:

```env id="3w8g3w"
PORT=3000

MONGO_URI=your_mongodb_connection_string

WEATHER_API_KEY=your_openweather_api_key
```

---

# Installation & Setup

## Clone Repository

```bash id="vq8e3q"
git clone <your-github-repository-url>
```

---

## Navigate Into Project

```bash id="ux5g4g"
cd weather-api
```

---

## Install Dependencies

```bash id="7e7d0g"
npm install
```

---

# Required Dependencies

```bash id="pdv8l0"
npm install express mongoose axios dotenv morgan cors
```

---

# Running The Application

Start backend server:

```bash id="8z5j8s"
node server.js
```

Expected Output:

```text id="q3qclm"
Server running on port 3000
MongoDB Connected Successfully
```

---

# Logging

The application uses Morgan middleware for request logging.

Installed using:

```bash id="mf6k8e"
npm install morgan
```

Example logs:

```text id="cpb4ah"
GET /weather 200 10ms
POST /weather 201 18ms
DELETE /weather/6868xxxx 200 12ms
```

Logging helps:

* Monitor API activity
* Debug issues
* Track backend requests
* Improve observability

---

# CRUD Operations

CRUD stands for:

| Operation | Meaning        |
| --------- | -------------- |
| Create    | Add new record |
| Read      | Fetch records  |
| Update    | Modify record  |
| Delete    | Remove record  |

---

# API Endpoints

---

# 1. Create Weather Record

## Endpoint

```http id="w9n6m4"
POST /weather
```

## Request Body

```json id="ccs7wy"
{
  "city": "Kochi",
  "temperature": 30,
  "weather": "Rainy"
}
```

## Success Response

```json id="v9kwcu"
{
  "_id": "6868xxxx",
  "city": "Kochi",
  "temperature": 30,
  "weather": "Rainy"
}
```

---

# 2. Get All Weather Records

## Endpoint

```http id="ewxodq"
GET /weather
```

Returns all weather records from MongoDB Atlas.

---

# 3. Get Weather Record By ID

## Endpoint

```http id="d4cxq2"
GET /weather/:id
```

Example:

```http id="e5jk32"
GET /weather/6868xxxx
```

---


# 4. Fetch Live Weather From OpenWeather API

## Endpoint

```http id="94o89t"
GET /weather/live/:city
```

Example:

```http id="7hl61m"
GET /weather/live/kochi
```

---

# Internal Flow

```text id="69g6k9"
Client Request
      ↓
Express Backend
      ↓
OpenWeather API
      ↓
Fetch Live Weather
      ↓
MongoDB Save
      ↓
JSON Response
```

---

# 5. Update Weather Record

## Endpoint

```http id="w5y27u"
PUT /weather/:id
```

## Request Body

```json id="noym9v"
{
  "temperature": 35
}
```

---

# 6. Delete Weather Record

## Endpoint

```http id="0t6wl3"
DELETE /weather/:id
```

---

# HTTP Status Codes Used

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 404         | Record Not Found      |
| 500         | Internal Server Error |

---

# Validation

The backend validates incoming request data before database operations.

Example:

```javascript id="g4q8ur"
if (!city || !temperature || !weather) {
   return res.status(400).json({
      error: "All fields are required"
   });
}
```

---

# Error Handling

The application uses try-catch blocks to handle runtime and database errors.

Example:

```javascript id="axr8q3"
try {

   // operation

} catch(error) {

   res.status(500).json({
      error: "Server Error"
   });

}
```

---

# Testing APIs Using Postman

The APIs can be tested using:

* Postman
* Thunder Client
* Hoppscotch

For POST and PUT requests:
Use:

```text id="8tfq53"
Body → raw → JSON
```

---

# Commands Used During Development

## Initialize Node Project

```bash id="d8k6o7"
npm init -y
```

---

## Install Dependencies

```bash id="87p6c6"
npm install express mongoose axios dotenv morgan cors
```

---

## Run Backend Server

```bash id="ptp4k0"
node server.js
```

---

# Concepts Learned Through This Project

* REST API Development
* CRUD Operations
* MongoDB Atlas Integration
* External API Integration
* Express Routing
* Middleware
* Logging
* Error Handling
* Validation
* Environment Variables
* Backend Architecture
* Cloud Database Connectivity


# Author

K. Satwik
B.Tech — Computer Science Engineering (AI & ML),
Andhra Loyola Institute of Engineering and Technology,
Vijayawada, Andhra Pradesh
