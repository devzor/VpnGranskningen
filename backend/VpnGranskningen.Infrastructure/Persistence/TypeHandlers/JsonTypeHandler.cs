using System.Data;
using System.Text.Json;
using Dapper;

namespace VpnGranskningen.Infrastructure.Persistence.TypeHandlers;

/// <summary>
/// Generisk Dapper-handler för JSONB-kolumner i PostgreSQL.
/// </summary>
public sealed class JsonTypeHandler<T> : SqlMapper.TypeHandler<T>
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy        = JsonNamingPolicy.SnakeCaseLower,
        PropertyNameCaseInsensitive = true,
    };

    public override T Parse(object value)
    {
        var json = value as string ?? throw new InvalidCastException("Expected string for JSON column.");
        return JsonSerializer.Deserialize<T>(json, Options)
               ?? throw new InvalidOperationException($"Could not deserialize JSON to {typeof(T).Name}.");
    }

    public override void SetValue(IDbDataParameter parameter, T? value)
    {
        parameter.Value = value is null
            ? DBNull.Value
            : JsonSerializer.Serialize(value, Options);

        if (parameter is Npgsql.NpgsqlParameter np)
            np.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Jsonb;
    }
}
