using VpnGranskningen.Api.Endpoints;
using VpnGranskningen.Infrastructure;
using VpnGranskningen.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddInfrastructure();
builder.Services.AddCors(opts => opts.AddDefaultPolicy(policy =>
    policy.WithOrigins("http://localhost:3000")
          .AllowAnyHeader()
          .AllowAnyMethod()));

var app = builder.Build();

// Kör SQL-migrationer automatiskt vid uppstart
// I publish/Docker-build kopieras SQL-filerna till Persistence/Schema/ relativt AppContext.BaseDirectory
var schemaDir = Path.Combine(AppContext.BaseDirectory, "Persistence", "Schema");
// Fallback för lokal utveckling (körs från bin/Debug/net10.0/)
if (!Directory.Exists(schemaDir))
    schemaDir = Path.GetFullPath(Path.Combine(
        AppContext.BaseDirectory,
        "..", "..", "..", "..",
        "VpnGranskningen.Infrastructure", "Persistence", "Schema"));

if (Directory.Exists(schemaDir))
{
    try
    {
        var runner = app.Services.GetRequiredService<MigrationRunner>();
        await runner.RunAsync(Path.GetFullPath(schemaDir));
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Migrationer misslyckades – appen startar ändå.");
    }
}

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseHttpsRedirection();
app.UseCors();
app.MapVpnEndpoints();

app.Run();
