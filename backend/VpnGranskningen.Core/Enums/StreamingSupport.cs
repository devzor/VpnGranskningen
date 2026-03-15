namespace VpnGranskningen.Core.Enums;

public enum StreamingSupport
{
    None = 0,

    /// <summary>Fungerar för vissa tjänster eller regioner men inte konsekvent.</summary>
    Partial = 1,

    /// <summary>Konsekvent stöd för Netflix, Disney+, SVT Play m.fl.</summary>
    Full = 2,
}
