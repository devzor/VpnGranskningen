using Dapper;
using Microsoft.Extensions.DependencyInjection;
using VpnGranskningen.Core.Interfaces;
using VpnGranskningen.Infrastructure.Persistence;

namespace VpnGranskningen.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // Gör att Dapper mappar snake_case-kolumner till PascalCase-properties automatiskt
        DefaultTypeMap.MatchNamesWithUnderscores = true;

        services.AddSingleton<IDbConnectionFactory, NpgsqlConnectionFactory>();
        services.AddScoped<IVpnRepository, VpnRepository>();
        services.AddSingleton<MigrationRunner>();
        return services;
    }
}
