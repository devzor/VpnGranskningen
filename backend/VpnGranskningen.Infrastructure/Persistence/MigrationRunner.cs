using Dapper;

namespace VpnGranskningen.Infrastructure.Persistence;

/// <summary>
/// Kör SQL-filer i Schema/-mappen i nummerordning mot databasen.
/// Varje migration körs bara en gång – körda migrationer spåras i schema_migrations.
/// </summary>
public sealed class MigrationRunner(IDbConnectionFactory connectionFactory)
{
    public async Task RunAsync(string schemaDirectory, CancellationToken ct = default)
    {
        var files = Directory
            .GetFiles(schemaDirectory, "*.sql")
            .OrderBy(f => f)
            .ToArray();

        if (files.Length == 0) return;

        using var conn = connectionFactory.Create();
        await conn.OpenAsync(ct);

        // Säkerställ att spårningstabellen finns
        await conn.ExecuteAsync("""
            CREATE TABLE IF NOT EXISTS schema_migrations (
                filename TEXT PRIMARY KEY,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
            """);

        foreach (var file in files)
        {
            var filename = Path.GetFileName(file);

            var alreadyApplied = await conn.ExecuteScalarAsync<bool>(
                "SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE filename = @filename)",
                new { filename });

            if (alreadyApplied)
            {
                Console.WriteLine($"[Migration] Hoppar över: {filename}");
                continue;
            }

            var sql = await File.ReadAllTextAsync(file, ct);
            await conn.ExecuteAsync(sql);
            await conn.ExecuteAsync(
                "INSERT INTO schema_migrations (filename) VALUES (@filename)",
                new { filename });

            Console.WriteLine($"[Migration] Körde: {filename}");
        }
    }
}
