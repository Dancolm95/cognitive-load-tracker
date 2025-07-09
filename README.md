# 🧠 Cognitive Load Tracker

> **"Know when your brain is saturated — before you make mistakes."**

Cognitive Load Tracker is a full-stack system that detects mental overload in real-time as you code in your browser. When your cognitive load reaches critical levels, it suggests a break — just in time.

---

## 🚀 MVP Overview

| Layer         | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **Capture**   | Chrome Extension (Manifest V3) sends keyboard/mouse events and active URLs |
| **Backend**   | NestJS microservices with WebSocket + ML model evaluation                   |
| **Feedback**  | React overlay shows load percentage + notifications                         |
| **Storage**   | PostgreSQL via TypeORM (`events`, `sessions`, `scores`)                     |

---

## 📐 Architecture

![Architecture Diagram](docs/assets/mermaid.png)

- `gateway-ms`: receives events via WebSocket
- `load-model-ms`: uses ONNX model to detect overload
- `feedback-ms`: triggers popup overlay if load > 70%

---

## 🧪 Machine Learning

- Real user session data captured and labeled
- Lightweight Logistic Regression model (ONNX)
- Inference latency < 20ms (CPU)

---

## 🧰 Tech Stack

| Area         | Tools                                                                 |
|--------------|-----------------------------------------------------------------------|
| **Frontend** | React 17+, TanStack Query, Recharts                                  |
| **Extension**| TypeScript + Manifest V3 + Webpack                                    |
| **Backend**  | NestJS + WebSocket + CQRS + JWT + gRPC                                |
| **ML**       | Python 3.12 + scikit-learn → exported as ONNX                         |
| **Infra**    | Docker Compose + PostgreSQL + NGINX + GitHub Actions (CI/CD)          |

---

## 📦 Repository Structure
- `backend/` — microservices:
  - `gateway-ms/` – WebSocket event receiver
  - `load-model-ms/` – ONNX model inference service
  - `feedback-ms/` – triggers cognitive load overlay
  - `shared-lib/` – DTOs and shared utilities
- `extension/` — Chrome extension (keyboard + mouse tracking)
- `model/` — ML pipeline:
  - `trained/` – exported ONNX model
  - `data/` – labeled user sessions in CSV
- `src/` — frontend dashboard or utility scripts
- `infra/` — docker-compose, nginx configs, helper scripts
- `docs/assets/` — diagrams and architecture illustrations
- `README.md` — public overview (this file)
## 🧠 Why this project?

To combine machine learning, full-stack microservices and real user behavior in a single project — while solving a real productivity challenge for developers: **mental overload.**
