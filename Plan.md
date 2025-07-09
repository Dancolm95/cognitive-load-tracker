_Plataforma para medir carga mental en tiempo real_

**Visión-en-una-frase:**  
> “Detecta cuándo tu cerebro se satura mientras programas en el navegador y recomiéndate un break antes de que cometas errores”.

---

## 1. Objetivo del MVP

| Aspecto | Alcance (v1) |
|---------|--------------|
| **Captura** | Extensión Chrome (Manifest V3) que envía:<br>• Eventos teclado/ratón globales<br>• Cambios de URL/ventana activa |
| **Procesado** | Microservicio `load-model-ms` (NestJS) con modelo ML ligero (Tree-based o Logistic Reg.) entrenado sobre tus propios logs. |
| **Feedback** | Overlay React (popup) que muestra barómetro `Carga %` + notificación *“💥 Break recomendado”*. |
| **Persistencia** | PostgreSQL vía TypeORM (tabla `events`, `sessions`, `scores`). |
| **Demo** | Docker Compose ➜ `npm run demo` abre navegador con la extensión y dashboard de carga. |

---

## 2. Personas y historias de usuario 🔖

| ID | Como… | Quiero… | Para… |
|----|-------|---------|-------|
| **U1** | _Desarrollador_ | ver mi nivel de carga en tiempo real | tomar descansos antes de saturarme |
| **U2** | _Manager de equipo_ | revisar reportes diarios de carga | prevenir burnout y planificar tareas |
| **U3** | _Yo (full-stack learner)_ | experimentar con un modelo ML propio | demostrar skills IA + microservicios |

---

## 3. Diagrama de Arquitectura

![Architecture Diagram](docs/assets/mermaid.png)

- **Gateway-ms:** WebSocket endpoint `ws://…/events` + simple auth JWT.  
- **Load-Model-ms:** convierte series temporales → probabilidad de sobre-carga.  
- **Feedback-ms:** reglas de negocio (umbral 70 %) y push a Overlay.

---

## 4. Stack Técnico 🛠

| Capa | Herramienta |
|------|-------------|
| **Extensión** | TypeScript + Manifest V3 + Webpack |
| **Backend** | NestJS (monorepo), WebSockets, JWT, CQRS, Jest |
| **ML** | Python 3.12 + scikit-learn, export ONNX, servido vía Nest gRPC |
| **Front** | React (17+) + TanStack Query + Recharts |
| **Infra** | Docker Compose, Nginx reverse-proxy, GitHub Actions CI |

---

## 5. ML Ligero (v1)

1. **Features**  
   - `events_per_min`, `avg_key_interval`, `mouse_distance`, `window_switches/min`, `burst_ratio`.
2. **Dataset**  
   - Graba 5 días de tu uso (extensión → CSV).  
   - Etiqueta manualmente “cansado” (`1`) / “ok” (`0`) cada 30 min vía popup.
3. **Modelo**  
   - Logistic Regression → export ONNX (`skl2onnx`).  
   - Latencia < 20 ms en CPU (apto para tiempo real).

---

## 6. Roadmap 12 semanas (14 h/sem)

| Semana | Entregable clave | Hrs foco |
|--------|------------------|----------|
| **1** | Repo monorepo + plantillas CI | 8 |
| **2** | Extensión captura eventos + WebSocket | 14 |
| **3** | Gateway-ms estable + tests | 12 |
| **4** | DB esquema + ingestión bulk | 10 |
| **5-6** | Modelo heurístico + overlay basic | 24 |
| **7-8** | Recopilar datos + entrenar ML ligero | 20 |
| **9** | Integrar ONNX gRPC → Feedback-ms | 12 |
| **10** | Dashboard histórico (React) | 14 |
| **11** | Seguridad JWT, Docker Compose prod | 12 |
| **12** | Deploy en Fly.io/Vercel + post demo | 12 |

_Total ≈ 150 h (cabes en 14 h/sem)._

---

## 7. **Sprint 1** (Semana 1, 7 días)

| Día | Tarea | Checklist |
|-----|-------|-----------|
| **Lun** | `git init` + README-vision | ☐ |
| **Mar** | Config monorepo (`nx` o `turbo`) | ☐ |
| **Mié** | Crear `gateway-ms` Nest scaffold | ☐ |
| **Jue** | Extensión esqueleto (TS + manifest) | ☐ |
| **Vie** | Implementar canal WS `/events` simple echo | ☐ |
| **Sáb** | PoC popup React muestra “🟢 Conectado” | ☐ |
| **Dom** | Escribir retro en Obsidian + issue backlog | ☐ |

> **Definición de listo Sprint 1**  
> - Extensión envía un `{"type":"ping"}` cada 5 s → Gateway registra en consola.  
> - Popup muestra estado conexión en vivo.

---

## 8. Prompts ChatGPT (plantilla Obsidian)

```python
## Prompt – Debug rápido
Contexto: [describe bug]
Objetivo: encontrar causa raíz Nest.
Pregunta: Explica por qué aparece el error y sugiere 2 soluciones.

## Prompt – Generar tests
Contexto: [describe función]
Objetivo: crear pruebas Jest con casos borde.
Pregunta: Proporciona plantilla de test + mocks.

## Prompt – Feature idea
Contexto: Carga mental altos picos entre 16:00–18:00.
Pregunta: Sugiere 3 intervenciones basadas en CBT.
```

## 9. Métricas de éxito

|Métrica|Meta v1|
|---|---|
|**Falsos positivos**|< 10 % alertas cuando carga < 60 %|
|**Latencia feedback**|< 300 ms del evento al overlay|
|**Uso medio extensión**|≥ 4 h activas/día (auto)|
|**Feedback usuarios**|≥ 70 % dicen “me ayuda” en encuesta de cierre|
