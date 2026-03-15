using Microsoft.Extensions.Configuration;
using Npgsql;
namespace VpnGranskningen.Infrastructure.Persistence;

public sealed class NpgsqlConnectionFactory : IDbConnectionFactory
{
    private readonly NpgsqlDataSource _dataSource;

    public NpgsqlConnectionFactory(IConfiguration config)
    {
        var connectionString =
            config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");

        _dataSource = NpgsqlDataSource.Create(connectionString);
    }

    public NpgsqlConnection Create() => _dataSource.CreateConnection();
}
