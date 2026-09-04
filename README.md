# TypeScript Pipeline

Intended to bring Laravel-like pipelines to TypeScript for both frontend and backend development.

## Installation

Include Pipeline.ts in your typescript project and import it:

```typescript
import { Pipeline } from "./Pipeline"
```

## Usage

### Create a pipeline

```typescript
const pipeline = new Pipeline<AxiosRequestConfig>()
```

### Add middleware & execute

```typescript
pipeline
  .middleware((data: AxiosRequestConfig, next: (data: AxiosRequestConfig) => Promise<AxiosRequestConfig>) => {
    data.method = "GET";
    return next(data);
  })
  .middleware((data: AxiosRequestConfig, next: (data: AxiosRequestConfig) => Promise<AxiosRequestConfig>) => {
    console.log("Axios configuration: " + data);
    return next(data);
  })
  .execute(new AxiosRequestConfig());
```
