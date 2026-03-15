using Npgsql;

namespace VpnGranskningen.Infrastructure.Persistence;

public interface IDbConnectionFactory
{
    NpgsqlConnection Create();
}
