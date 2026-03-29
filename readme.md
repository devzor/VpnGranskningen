# VpnGranskningen

## Getting Started

### Database
```bash
docker compose up -d
```
Starts PostgreSQL on port 5432 (via Docker).

### Backend (.NET API)
```bash
cd backend/VpnGranskningen.Api
dotnet run
```

### Frontend (Next.js)
```bash
cd frontend
npm run dev
```