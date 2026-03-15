namespace VpnGranskningen.Core.Enums;

/// <summary>
/// Bedömning av landets juridiska risk för en VPN-leverantör.
/// Baseras på 5/9/14-eyes-medlemskap och lokal lagstiftning.
/// </summary>
public enum JurisdictionRisk
{
    /// <summary>Utanför 14-eyes, stark integritetslag (t.ex. Panama, Schweiz, BVI).</summary>
    Low = 1,

    /// <summary>Neutral jurisdiktion men utan stark integritetslag.</summary>
    Medium = 2,

    /// <summary>14-eyes-land eller problematisk lagstiftning (t.ex. USA, UK, Sverige).</summary>
    High = 3,
}
