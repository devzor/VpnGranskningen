using VpnGranskningen.Core.Entities;

namespace VpnGranskningen.Core.Interfaces;

public interface IVpnRepository
{
    Task<IReadOnlyList<VpnProvider>> GetAllAsync(CancellationToken ct = default);
    Task<VpnProvider?> GetBySlugAsync(string slug, CancellationToken ct = default);
    Task<VpnProvider?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task UpsertAsync(VpnProvider provider, CancellationToken ct = default);
}
