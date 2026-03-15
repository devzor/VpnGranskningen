export enum UserProfile {
  StreamingAndTravel = 1,
  MaxPrivacy = 2,
  Paranoid = 3,
}

export enum JurisdictionRisk {
  Low = 1,
  Medium = 2,
  High = 3,
}

export enum StreamingSupport {
  None = 0,
  Partial = 1,
  Full = 2,
}

export interface VpnSummaryDto {
  slug: string;
  name: string;
  logoUrl: string | null;
  mainUrl: string | null;
  priceUrl: string | null;
  affiliateUrl: string | null;
  monthlyIntroPrice: number;
  monthlyRegularPrice: number;
  oneYearSubscriptionIntroPricePerMonth: number;
  oneYearSubscriptionRegularPricePerMonth: number;
  oneYearBonusMonths: number | null;
  twoYearSubscriptionIntroPricePerMonth: number | null;
  twoYearSubscriptionRegularPricePerMonth: number | null;
  twoYearBonusMonths: number | null;
  hasNoLogs: boolean;
  isAudited: boolean;
  jurisdiction: string;
  jurisdictionRisk: JurisdictionRisk;
  streamingSupport: StreamingSupport;
  speedScore: number;
  serverCount: number;
  countryCount: number;
  editorSummary: string | null;
}

export interface RecommendResultDto {
  provider: VpnSummaryDto;
  score: number;
  motivation: string;
}

export interface RecommendRequest {
  profile: UserProfile;
}
