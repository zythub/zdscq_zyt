export interface SanitizeHit {
  rule: string;
  count: number;
}

export declare function sanitizeMd(text: string): string;
export declare function scanSensitive(text: string): SanitizeHit[];
