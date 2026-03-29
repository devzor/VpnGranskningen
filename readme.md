 
  Database                                                                                           ********************************************              
  docker compose up -d                                                                                                         Starts PostgreSQL on port 5432 (via Docker).                                                                               
                                                                                                                             
  Backend (.NET API)                                                       ********************************************
  cd backend/VpnGranskningen.Api
  dotnet run

  Frontend (Next.js)                                                       ********************************************
  cd frontend
  npm run dev