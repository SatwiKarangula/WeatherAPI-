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